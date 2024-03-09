<?php

namespace App\Services;

use App\Models\Category;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;

class CategoryService
{

    /**
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getCategories(): \Illuminate\Database\Eloquent\Collection
    {
        return Cache::remember('categories', now()->addWeek() ,fn () => Category::get());
    }

    public function hierarchicalCategories(Collection $categories)
    {
        return $categories->filter(function ($category) {
            return $category->isMainCategory();
        })->map(function (Category $mainCategory) use ($categories) {
            $subCategories = $categories->where('parent_id', $mainCategory->id)->values()->all();
            $clonedCategory = clone $mainCategory;
            $clonedCategory->subCategories = $subCategories;
            return $clonedCategory;
        })->values();
    }

    public function mainCategories(Collection $categories)
    {
        return $categories->whereNull('parent_id')->values();
    }

    public function subCategories(Collection $categories)
    {
        return $categories->whereNotNull('parent_id')->values();
    }

    public function countMainCategories(Collection $categories)
    {
        return $categories->whereNull('parent_id')->count();
    }

    public function countSubCategories(Collection $categories)
    {
        return $categories->whereNotNull('parent_id')->count();
    }
}
