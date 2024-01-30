<?php

namespace App\Services;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Media;
use App\Models\Product;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class MediaService
{

    public function storeBrandLogo(UploadedFile $media, Brand $brand): void
    {
        $brand->logo()->create([
            'file_path' => $media->store('brand', 'media'),
            'file_type' => $media->getMimeType(),
            'file_size' => $media->getSize(),
            'file_status' => true,
        ]);
    }

    public function storeCategoryBanner(UploadedFile $media, Category $category): void
    {
        $category->banner()->create([
            'file_path' => $media->store('category', 'media'),
            'file_type' => $media->getMimeType(),
            'file_size' => $media->getSize(),
            'file_status' => true,
        ]);
    }

    public function storeProductsImages(array $images, Product $product): void
    {
        foreach ($images as $image) {
            /**
             * @var UploadedFile $media
             */
            $media = $image['image'];
            $product->assets()->create([
                'file_path' => $media->store('products', 'media'),
                'file_type' => $media->getMimeType(),
                'file_size' => $media->getSize(),
                'file_status' => true,
                'file_sort' => $image['id'],
            ]);
        }
    }

    public function unLinkImage(Media $media): bool
    {
        if (File::exists($media)) {
            return Storage::disk('media')->delete($media->file_path);
        }
        return false;
    }
}
