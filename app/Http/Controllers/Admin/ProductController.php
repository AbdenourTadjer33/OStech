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

    public function index(Request $request)
    {
        /**
         * @var \App\Models\Product
         */
        $productQuery = Product::with(['category:id,name,parent_id', 'category.parentCategory:id,name,parent_id', 'brand:id,name']);
        $productQuery->withTrashed();

        // if ($request->has('status')) {
        //     $request->status ? $productQuery->active() : $productQuery->notActive();
        // } 

        // if ($request->input('count_orders')) {
        //     $productQuery->loadCount('orders');
        // }

        // if ($request->input('only_trash')) {
        //     $productQuery->onlyTrashed();
        // }

        // if (!$request->input('no_trash')) {
        // }

        $products = $productQuery->paginate($request->pagination ?? 10)->appends(request()->query());
        return Inertia::render('Admin/Product/Index', [
            'products' => $products
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
                'brand_id' => $request->has('brand') ? $request->brand['id'] : null,
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

    // handle images change
    public function update(UpdateRequest $request)
    {

        DB::transaction(function () use ($request) {

            $subCategory = $request->subCategory;

            $images = $request->images;

            // $paths = [];
            // foreach ($images as $image) {
            // }

            Product::where('id', $request->id)->update([
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
                'brand_id' => $request->has('brand') ? $request->brand['id'] : null,
                'images' => $request->images,
            ]);
        });

        return redirect(route('admin.product.index'))->with('alert', [
            'status' => 'success',
            'massage' => 'Produit créer avec succés',
        ]);
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

        return redirect(route('admin.product.index'));
    }

    // FINISHED
    public function forceDestroy(Request $request)
    {
        $product = Product::where('id', $request->id)->first();

        if (!$product) {
            return session()->flash('alert', [
                'status' => 'danger',
                'message' => 'produit n\'existe pas!',
            ]);
        }

        foreach ($product->images as $imagePath) {
            if (Storage::disk('media')->exists($imagePath)) {
                Storage::disk('media')->delete($imagePath);
            }
        }

        $product->forceDelete();

        session()->flash('alert', [
            'status' => 'success',
            'message' => 'produit supprimé avec succés',
        ]);

        return redirect(route('admin.product.index'));
    }

    // FINISHED
    public function activeStatus(Request $request)
    {
        Product::where('id', $request->id)->update(['status' => true]);
        return redirect(route('admin.product.index'));
    }

    // FINISHED
    public function disableStatus(Request $request)
    {
        Product::where('id', $request->id)->update(['status' => false]);
        return redirect(route('admin.product.index'));
    }

    // FINISHED
    public function activeCatalog(Request $request)
    {
        Product::where('id', $request->id)->update(['catalog' => true]);
        return redirect(route('admin.product.index'));
    }

    // FINISHED
    public function disableCatalog(Request $request)
    {
        Product::where('id', $request->id)->update(['catalog' => false]);
        return redirect(route('admin.product.index'));
    }




























    public function saveTempImages(Request $request)
    {
        $request->validate([
            'images' => ['required', 'array'],
            'images.*' => ['required', 'image'],
        ]);

        $paths = [];
        /**
         * @var UploadedFile $image
         */
        foreach ($request->images as $image) {
            $paths[] = $image->store('temp', 'media');
        }

        return $paths;
    }

    public function editTempImage(Request $request)
    {
        $request->validate([
            'path' => ['required'],
            'cropInfo' => ['required', 'array'],
        ]);

        if (!Storage::disk('media')->exists($request->path)) {
            return $this->error(null, 'image non trouvé', 404);
        }

        $cropInfo = $request->cropInfo;

        $img = Image::gd()->read(Storage::disk('media')->get($request->path));

        $img->crop($cropInfo['width'], $cropInfo['height'], $cropInfo['x'], $cropInfo['y']);

        $img->toPng();

        $filename = 'media/temp/cropped_' . time() . '_' . uniqid() . '.png';

        $img->save($filename);

        Storage::disk('media')->delete($request->path);

        return $this->success([
            'path' => substr($filename, strpos($filename, '/') + 1),
        ], 'image modifier avec succés');
    }

    public function destroyTempImage(Request $request)
    {
        if (!Storage::disk('media')->exists($request->path)) {
            return $this->error(null, 'image non trouvé', 404);
        }

        if (!Storage::disk('media')->delete($request->path)) {
            return $this->error(null, 'something went wrong.', 500);
        }

        return $this->success(null, 'image supprimé avec succés', 200);
    }
}
