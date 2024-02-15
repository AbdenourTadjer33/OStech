<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Brand;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Services\MediaService;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\Brand\StoreRequest;
use App\Http\Requests\Brand\UpdateRequest;
use App\Traits\HttpResponses;

class BrandController extends Controller
{
    use HttpResponses;

    public function __construct()
    {
        $this->middleware('precognitive')->only(['store', 'update']);
    }

    public function index(Request $request)
    {
        $brandQuery = Brand::withCount('products')->orderBy('id', 'asc');

        $brands = $brandQuery->paginate($request->pagination ?? 10)->appends(request()->query());

        return Inertia::render('Admin/Brand/Index', [
            'brands' => $brands,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Brand/Create');
    }

    public function store(StoreRequest $request)
    {
        DB::transaction(function () use ($request) {
            $image = $request->image;

            $path = "brand/" . substr($image, strpos($image, '/') + 1);
            Storage::disk('media')->move($image, $path);

            Brand::create([
                'name' => $request->name,
                'slug' => Str::slug($request->name),
                'logo' => $path,
            ]);
        });

        session()->flash('alert', [
            'status' => 'success',
            'message' => 'Brand créer avec succés.'
        ]);

        return redirect(route('admin.brands.index'));
    }

    public function edit(Request $request)
    {
        $brand = Brand::where('id', $request->id)->firstOrFail();

        return Inertia::render('Admin/Brand/Edit', [
            'brand' => $brand,
        ]);
    }

    public function update(UpdateRequest $request)
    {
        $brand = Brand::where('id', $request->id)->firstOrFail();

        DB::transaction(function () use ($request, $brand) {
            $path = $request->image;
            if ($brand->logo != $request->image) {
                $image = $request->image;

                $path = 'brand/' . substr($image, strpos($image, '/'));
                Storage::disk('media')->move($image, $path);
            }
            $brand->update([
                'name' => $request->name,
                'slug' => Str::slug($request->name),
                'logo' => $path,
            ]);
        });

        session()->flash('alert', [
            'status' => 'success',
            'message' => 'Brand editer avec succés'
        ]);

        return redirect(route('admin.brand.index'));
    }

    public function destroy(Request $request)
    {
        $brand = Brand::where('id', $request->id)->first();

        Storage::disk('media')->delete($brand->logo); 

        $brand->delete();

        session()->flash('alert', [
            'status' => 'success',
            'message' => 'brand supprimé avec succés',
        ]);

        return redirect(route('admin.brands.index'));
    }
}
