<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Brand;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Traits\HttpResponses;
use App\Services\BrandService;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\Brand\StoreRequest;
use App\Http\Requests\Brand\UpdateRequest;

class BrandController extends Controller
{
    use HttpResponses;

    // FINISHED
    public function index(BrandService $brandService)
    {
        $brands = $brandService->getBrands();

        return Inertia::render('Admin/Brand/Index', [
            'brands' => $brands->loadCount('products'),
        ]);
    }

    // FINISHED
    public function create()
    {
        return Inertia::render('Admin/Brand/Create');
    }

    // FINISHED
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

        $this->clearCacheBrand();

        return redirect(route('admin.brand.index'))->with('alert', [
            'status' => 'success',
            'message' => 'Brand créer avec succés',
        ]);
    }

    // FINISHED
    public function edit(Request $request)
    {
        $brand = Brand::where('id', $request->id)->first();

        if (!$brand) {
            return redirect()->back()->with('alert', [
                'stauts' => 'danger',
                'message' => 'Brand non trouvé',
            ]);
        }

        return Inertia::render('Admin/Brand/Edit', [
            'brand' => $brand,
        ]);
    }

    // FINISHED
    public function update(UpdateRequest $request)
    {
        DB::transaction(function () use ($request) {
            $img = $request->image;

            $path = "brand/" . substr($img, strpos($img, '/'));
            Storage::disk('media')->move($img, $path);

            Brand::where('id', $request->id)->update([
                'name' => $request->name,
                'slug' => Brand::generateSlug('slug', $request->name),
                'logo' => $path,
            ]);
        });

        $this->clearCacheBrand();

        return redirect(route('admin.brand.index'))->with('alert', [
            'status' => 'success',
            'message' => 'Brand editer avec succés'
        ]);
    }

    // FINISHED
    public function destroy(Request $request)
    {
        $brand = Brand::where('id', $request->id)->first();

        if (!$brand) {
            return redirect()->back()->with('alert', [
                'status' => 'danger',
                'message' => 'Brand non trouvé',
            ]);
        }

        Storage::disk('media')->delete($brand->logo);

        $brand->delete();

        $this->clearCacheBrand();

        return redirect(route('admin.brand.index'))->with('alert', [
            'status' => 'success',
            'message' => 'brand supprimé avec succés',
        ]);;
    }

    private function clearCacheBrand()
    {
        Cache::forget('brands');
    }
}
