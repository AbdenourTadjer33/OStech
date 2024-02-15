<?php

namespace App\Services;

use App\Models\Brand;
use App\Models\Category;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class ApiService
{
	public function getCategoriesBrands()
	{
		$categories = DB::table('categories')
			->select(['id', 'name', 'parent_id'])
			->get();

			$brands = DB::table('brands')
			->select(['id', 'name', 'logo'])
			->get();

			return [
			'categories' => $categories,
			'brands' => $brands
		];
	}
}
