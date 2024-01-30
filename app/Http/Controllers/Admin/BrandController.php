<?php

namespace App\Http\Controllers\Admin;

use App\Models\Brand;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Services\MediaService;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BrandRequest;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class BrandController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Brand/Index');
    }

    public function show(Request $request, Brand $brand)
    {
    }

    public function create()
    {
        return Inertia::render('Admin/Brand/Create');
    }

    public function store(Request $request)
    {
        dd($request);
        /**
         * @var \App\Models\Brand
         */
        $brand = Brand::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
        ]);

        (new MediaService)->storeBrandLogo($request->file('logo'), $brand);

        return session()->flash('');
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
            (new MediaService)->storeBrandLogo($logo, $brand);
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
