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
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager as Image;

class ProductController extends Controller
{
    use HttpResponses;

    public function __construct()
    {
        $this->middleware('precognitive')->only('store');
    }

    public function index(Request $request)
    {
        /**
         * @var \App\Models\Product
         */
        $productQuery = Product::withTrashed()->with(['category:id,name,parent_id', 'category.parentCategory:id,name,parent_id', 'brand:id,name']);

        if ($request->input('count_orders')) {
            $productQuery->loadCount('orders');
        }

        $products = $productQuery->paginate($request->pagination ?? 10)->appends(request()->query());
        return Inertia::render('Admin/Product/Index', [
            'products' => $products
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Product/Create');
    }

    public function store(StoreRequest $request)
    {
        DB::transaction(function () use ($request) {

            $subCategory = $request->category; // this represent the sub-category

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
                'catalogue' => $request->input('catalogue'),
                'features' => $request->input('features'),
                'category_id' => $subCategory['id'],
                'brand_id' => $request?->brand ? $request->brand['id'] : null,
                'images' => $paths,
            ]);
        });

        return session()->flash('alert', [
            'status' => 'success',
            'message' => 'Produit créer avec succés',
        ]);
    }

    public function edit(Request $request)
    {
        /**
         * @var \App\Models\Product
         */
        $product = Product::where('id', $request->id)->with(['category:id,name,parent_id', 'category.parentCategory:id,name,parent_id', 'brand:id,name'])->first();

        return Inertia::render('Admin/Product/Edit', [
            'product' => $product,
        ]);
    }

    public function update(UpdateRequest $request)
    {
        $product = Product::where('id', $request->id)->firstOrFail();

        DB::transaction(function () use ($request, $product) {
            dd($request->all(), $product);

            $parentCategory = $request->parentCategory;
            $subCategory = $request->subCategory;

            $images = $request->images;

            $paths = [];
            foreach ($images as $image) {
            }

            $product->update([
                'name' => $request->name,
                'slug' => Str::slug($parentCategory['name'] . ' ' . $subCategory['name'] . ' ' . $request->input('name')),
                'description' => $request->description,
                'sku' => $request->input('sku'),
                'qte' => $request->input('qte'),
                'price' => $request->input('price'),
                'promo' => $request->input('promo'),
                'status' => $request->input('status'),
                'catalogue' => $request->input('catalogue'),
                'features' => $request->input('features'),
                'category_id' => $subCategory['id'],
                'brand_id' => $request?->brand ? $request->brand['id'] : null,
                'images' => $request->images,
            ]);
        });

        session()->flash('alert', [
            'status' => 'success',
            'message'
        ]);
    }

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

        return redirect(route('admin.products.index'));
    }

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

        return redirect(route('admin.products.index'));
    }

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

        return redirect(route('admin.products.index'));
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























    public function updateInformations(Request $request)
    {
        DB::transaction(function () use ($request) {
            Product::where('id', $request->id)->update([
                'name' => $request->name,
                'ref' => $request->description,
                'details' => $request->details,
                'choices' => $request->choices,
                'qte' => $request->qte,
                'promo' => $request->promo,
                'price' => $request->price,
                'status' => $request->status,
                'catalogue' => $request->catalogue,
                'category_id' => $request->category_id,
                'brand_id' => $request->brand_id,
            ]);
        });
    }

    public function updateDetails(Request $request)
    {
        $request->validate([
            'details' => ['required', 'array'],
        ]);
        DB::transaction(function () use ($request) {
            Product::where('id', $request->id)->update([
                'details' => $request->details,
            ]);
        });
    }

    public function updateChoices()
    {
    }

    public function updateCategory(Request $request)
    {
        DB::transaction(function () use ($request) {
            Product::where('id', $request->id)->update([
                'category_id' => $request->category_id,
            ]);
        });
    }

    public function updateBrand(Request $request)
    {
        DB::transaction(function () use ($request) {
            Product::where('id', $request->id)->update([
                'brand_id' => $request->brand_id,
            ]);
        });
    }

    public function updateImages(Request $request)
    {
        DB::transaction(function () use ($request) {
        });
    }

    public function destroyImage(Request $request)
    {
        if (DB::transaction(fn () => Media::where('file_path', $request->file_path)->delete())) {
            // return success
        }
        // return faillure
    }
}
