<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Media;
use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Requests\Product\UpdateRequest;
use App\Http\Requests\Product\StoreRequest;
use App\Services\BrandService;
use App\Services\CategoryService;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager as Image;

class ProductController extends Controller
{
    use HttpResponses;

    public function __construct()
    {
        $this->middleware('precognitive',)->only(['store', 'update']);
    }

    public function index(Request $request, CategoryService $categoryService, BrandService $brandService)
    {
        $categories = $categoryService->getCategories();
        $brands = $brandService->getBrands();
        /**
         * @var \App\Models\Product
         */
        $productQuery = Product::admin();

        if ($request->has('orderby')) {
            $request->input('orderby') ? $productQuery->latest() : $productQuery->oldest();
        } else {
            $productQuery->latest();
        }

        if ($request->has('category') && $request->input('category')) {
            $selectedCategories = explode(',', $request->input('category'));
            $productQuery->whereIn('category_id', $selectedCategories);
        }

        if ($request->has('brand') && $request->input('brand')) {
            $selectedBrands = explode(',', $request->input('brand'));
            $productQuery->whereIn('brand_id', $selectedBrands);
        }

        if ($request->has('status') && $request->input('status') !== 'all') {
            $request->input('status') ? $productQuery->active() : $productQuery->notActive();
        }

        if ($request->has('catalog') && $request->input('catalog') !== 'all') {
            $request->input('catalog') ? $productQuery->activeCatalog() : $productQuery->notActiveCatalog();
        }

        if ($request->has('archive') && $request->input('archive') !== 'all') {
            !$request->input('archive') ?: $productQuery->onlyTrashed();
        } else {
            $productQuery->withTrashed();
        }

        $products = $productQuery->paginate($request->pagination ?? 15)->appends(request()->query());

        $products->map(function (Product $product) use ($categories, $brands) {
            $subCategory = $categories->firstWhere('id', $product->category_id);
            $mainCategory = $categories->firstWhere('id', $subCategory->parent_id);

            $product->brand = $brands->firstWhere('id', $product->brand_id);
            $product->subCategory = $subCategory->only(['id', 'name', 'slug']);
            $product->mainCategory = $mainCategory->only(['id', 'name', 'slug']);
        });

        session()->put('products_url', $request->fullUrl());

        return Inertia::render('Admin/Product/Index', [
            'products' => $products,
            'subCategories' => $categoryService->subCategories($categories),
            'brands' => $brands,
        ]);
    }

    // FINISHED
    public function create(CategoryService $categoryService, BrandService $brandService)
    {
        $categories = $categoryService->getCategories();

        return Inertia::render('Admin/Product/Create', [
            'mainCategories' => $categoryService->mainCategories($categories),
            'subCategories' => $categoryService->subCategories($categories),
            'brands' => $brandService->getBrands(),
        ]);
    }

    // FINISHED
    public function store(StoreRequest $request)
    {
        DB::transaction(function () use ($request) {

            $subCategory = $request->subCategory; // this represent the sub-category

            $images = $request->images;

            $paths = [];
            foreach ($images as $image) {
                $newPath = "product/" . substr($image, strpos($image, '/') + 1);
                Storage::disk('media')->move($image, $newPath);
                $paths[] = $newPath;
            }

            Product::create([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'sku' => $request->input('sku'),
                'qte' => $request->input('qte'),
                'price' => $request->input('price'),
                'promo' => $request->input('promo'),
                'status' => $request->input('status'),
                'catalog' => $request->input('catalog'),
                'features' => $request->input('features'),
                // 'colors' => $request->input('colors'),
                // 'options' => $request->input('options'),
                'category_id' => $subCategory['id'],
                'brand_id' => $request->input('brand') ? $request->brand['id'] : null,
                'images' => $paths,
            ]);
        });

        return session()->flash('alert', [
            'status' => 'success',
            'message' => 'Produit créer avec succés',
        ]);
    }

    // FINISHED
    public function edit(Request $request, CategoryService $categoryService, BrandService $brandService)
    {
        $product = Product::withTrashed()->where('id', $request->id)->firstOrFail();
        $categories = $categoryService->getCategories();

        return Inertia::render('Admin/Product/Edit', [
            'product' => $product,
            'mainCategories' => $categoryService->mainCategories($categories),
            'subCategories' => $categoryService->subCategories($categories),
            'brands' => $brandService->getBrands(),
        ]);
    }

    // FINISHED
    public function update(UpdateRequest $request)
    {
        DB::transaction(function () use ($request) {

            $subCategory = $request->subCategory;

            $images = $request->images;

            $paths = [];
            foreach ($images as $image) {
                $newPath = "product/" . substr($image, strpos($image, '/') + 1);
                Storage::disk('media')->move($image, $newPath);
                $paths[] = $newPath;
            }

            Product::withTrashed()->where('id', $request->id)->update([
                'name' => $request->input('name'),
                'description' => $request->input('description'),
                'sku' => $request->input('sku'),
                'qte' => $request->input('qte'),
                'price' => $request->input('price'),
                'promo' => $request->input('promo'),
                'status' => $request->input('status'),
                'catalog' => $request->input('catalog'),
                'features' => $request->input('features'),
                'category_id' => $subCategory['id'],
                'brand_id' => $request->input('brand') ? $request->brand['id'] : null,
                'images' => $paths,
            ]);
        });

        session()->flash('alert', [
            'status' => 'success',
            'massage' => 'Produit créer avec succés',
        ]);

        if (session()->has('products_url')) {
            return redirect(session()->get('products_url'));
        }

        return redirect(route('admin.product.index'));
    }

    // FINISHED
    public function restore(Request $request)
    {
        $product = Product::withTrashed()->where('id', $request->id)->restore();

        if (!$product) {
            return session()->flash('alert', [
                'status' => 'danger',
                'message' => 'Quelque chose de mal s\'est passé!',
            ]);
        }

        session()->flash('alert', [
            'status' => 'success',
            'message' => 'Produit restoré avec succés',
        ]);

        if (session()->has('products_url')) {
            return redirect(session()->get('products_url'));
        }

        return redirect(route('admin.product.index'));
    }

    // FINISHED
    public function destroy(Request $request)
    {
        $product = Product::where('id', $request->id)->first();

        if (!$product) {
            return session()->flash('alert', [
                'status' => 'danger',
                'message' => 'produit n\'existe pas!',
            ]);
        }

        $product->delete();

        session()->flash('alert', [
            'status' => 'success',
            'message' => 'Produit archivé avec succés',
        ]);

        if (session()->has('products_url')) {
            return redirect(session()->get('products_url'));
        }

        return redirect(route('admin.product.index', $request->query()));
    }

    // FINISHED
    public function forceDestroy(Request $request)
    {
        $product = Product::withTrashed()->where('id', $request->id)->first();

        if (!$product) {
            return session()->flash('alert', [
                'status' => 'danger',
                'message' => 'produit n\'existe pas!',
            ]);
        }

        if (is_array($product->images)) {
            foreach ($product->images as $imagePath) {
                if (Storage::disk('media')->exists($imagePath)) {
                    Storage::disk('media')->delete($imagePath);
                }
            }
        }

        $product->forceDelete();

        session()->flash('alert', [
            'status' => 'success',
            'message' => 'produit supprimé avec succés',
        ]);

        if (session()->has('products_url')) {
            return redirect(session()->get('products_url'));
        }

        return redirect(route('admin.product.index'));
    }

    // FINISHED
    public function activeStatus(Request $request)
    {
        Product::withTrashed()->where('id', $request->id)->update(['status' => true]);

        if (session()->has('products_url')) {
            return redirect(session()->get('products_url'));
        }

        return redirect(route('admin.product.index'));
    }

    // FINISHED
    public function disableStatus(Request $request)
    {
        Product::withTrashed()->where('id', $request->id)->update(['status' => false]);

        if (session()->has('products_url')) {
            return redirect(session()->get('products_url'));
        }

        return redirect(route('admin.product.index'));
    }

    // FINISHED
    public function activeCatalog(Request $request)
    {
        Product::withTrashed()->where('id', $request->id)->update(['catalog' => true]);

        if (session()->has('products_url')) {
            return redirect(session()->get('products_url'));
        }

        return redirect(route('admin.product.index'));
    }

    // FINISHED
    public function disableCatalog(Request $request)
    {
        Product::withTrashed()->where('id', $request->id)->update(['catalog' => false]);

        if (session()->has('products_url')) {
            return redirect(session()->get('products_url'));
        }

        return redirect(route('admin.product.index'));
    }
}
