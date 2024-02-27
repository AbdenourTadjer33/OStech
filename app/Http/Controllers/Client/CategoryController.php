<?php

namespace App\Http\Controllers\Client;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\Category;

class CategoryController extends Controller
{

    public function getByCategory(Request $request)
    {

        $parentCategory = $request->categories->firstWhere('slug', $request->slug);
        $ids = $request->categories->where('parent_id', $parentCategory->id)->pluck('id');

        return Product::whereIn('category_id', $ids)
            ->sample()
            ->latest()
            ->limit(10)
            ->get();

    }

    public function getSubcategoryIdsByParentSlug($categories, $parentSlug)
    {
        $subcategoryIds = [];   

        foreach ($categories as $category) {
            if ($category->parent_id === null && $category->slug === $parentSlug) {
                // If the current category is the parent category, find its subcategories
                $subcategoryIds = $this->findSubcategoryIds($categories, $category->id);
                break;
            }
        }

        return $subcategoryIds;
    }

    public function findSubcategoryIds($categories, $parentId)
    {
        $subcategoryIds = [];

        foreach ($categories as $category) {
            if ($category->parent_id === $parentId) {
                // If the current category belongs to the parent category, add its ID
                $subcategoryIds[] = $category->id;
                // Recursively find subcategories of the current category
                $subcategoryIds = array_merge($subcategoryIds, $this->findSubcategoryIds($categories, $category->id));
            }
        }

        return $subcategoryIds;
    }
}
