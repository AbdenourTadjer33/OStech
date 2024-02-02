<?php

namespace App\Http\Controllers\Admin;

use App\Models\Brand;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Services\MediaService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Brand\StoreRequest;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class BrandController extends Controller
{

    public function __construct()
    {
        $this->middleware('precognitive')->only(['store', 'update']);
    }

    public function index()
    {
        return Inertia::render('Admin/Brand/Index', [
            'brands' => Brand::with('logo:id,file_path,mediable_id,mediable_type')->paginate(5)
        ]);
    }

    public function show(Request $request, Brand $brand)
    {
    }

    public function create()
    {
        return Inertia::render('Admin/Brand/Create');
        // (new MediaService)->test();
    }

    public function store(StoreRequest $request)
    {
        sleep(10);
        /**
         * @var \App\Models\Brand
         */
        $brand = Brand::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
        ]);

        (new MediaService)->storeBrandLogo($request->file('logo'), $brand, $request->logoCropInformation);

        session()->flash('alert', [
            'status' => 'success',
            'message' => 'Brand créer avec succés.'
        ]);

        return redirect(route('admin.brands.index'));
    }

    public function edit(Brand $brand)
    {
    }

    public function update(Request $request, Brand $brand)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:40', Rule::unique('brands', 'name')->ignore($brand)],
        ]);

        $brand->update([
            'name' => $request->name,
        ]);

        $logo = $request->file('logo');
        if ($logo && (new MediaService)->unLinkImage($brand->logo)) {
            $brand->logo->delete();
            (new MediaService)->storeBrandLogo($logo, $brand, null);
        }

        return session()->flash('');
    }

    public function destroy(Brand $brand)
    {
        if ($brand->withCount(['products'])) {
            $brand->delete();
        }
    }
}
