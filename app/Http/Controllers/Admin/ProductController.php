<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use App\Models\Brand;
use App\Models\Media;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Services\MediaService;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Requests\Product\StoreRequest;
use Illuminate\Contracts\Database\Eloquent\Builder;

class ProductController extends Controller
{

    public function __construct()
    {
        $this->middleware('precognitive')->only('store');
    }

    public function index()
    {
        $products = Product::with([
            'category:id,name',
            'assets' => fn (Builder $query) => $query->orderBy('file_sort', 'asc'),
            'brand:id,name'
        ])->paginate(5);

        // dump($products->toArray());

        return Inertia::render('Admin/Product/Index', [
            'products' => $products
        ]);
    }

    public function create()
    {
        $subCategories = DB::table('categories')->whereNotNull('parent_id')->select('id', 'name')->get();

        $brands = DB::table('brands')
            ->join('media', 'brands.id', '=', 'media.mediable_id')
            ->where('media.mediable_type', '=', Brand::class)
            ->select('brands.id', 'brands.name', 'media.file_path')
            ->get();

        return Inertia::render('Admin/Product/Create', [
            'brands' => $brands->toArray(),
            'subCategories' => $subCategories->toArray()
        ]);
    }

    public function store(StoreRequest $request)
    {
        DB::transaction(function () use ($request) {
            $product = Product::create([
                'name' => $request->input('name'),
                'ref' => Product::generateRef(),
                'slug' => Str::slug(now()->timestamp . '-' . $request->input('name')),
                'description' => $request->input('description'),
                'sku' => $request->input('sku'),
                'qte' => $request->input('qte'),
                'price' => $request->input('price'),
                'promo' => $request->input('promo'),
                'status' => $request->input('status'),
                'catalogue' => $request->input('catalogue'),
                'features' => $request->input('features'),
                'category_id' => $request->input('category')['id'],
                'brand_id' => $request?->brand ? $request->brand['id'] : null,
            ]);

            (new MediaService)->storeProductsImages($request->images, $product);
        });

        return session()->flash('alert', [
            'status' => 'success',
            'message' => 'product created successfully',
        ]);
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
