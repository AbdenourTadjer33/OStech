<?php

namespace App\Http\Requests\Product;

use Illuminate\Database\Query\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateRequest extends FormRequest
{
  /**
   * Determine if the user is authorized to make this request.
   */
  public function authorize(): bool
  {
    return true;
  }

  /**
   * Get the validation rules that apply to the request.
   *
   * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
   */
  public function rules(): array
  {
    return [
      'parentCategory' => ['required', 'array'],
      'parentCategory.id' => ['required', Rule::exists('categories', 'id')],
      'category' => ['required', 'array'], // the sub category
      'category.id' => ['required', Rule::exists('categories', 'id')],
      'brand' => ['nullable', 'array'],
      'brand.id' => ['nullable', Rule::exists('brands', 'id')],
      'name' => ['required', 'string', 'min:2'],
      'description' => ['nullable', 'string'],
      'features' => ['nullable', 'array'],
      'features.*' => ['nullable', 'array'],
      'features.*.title' => ['string'],
      'features.*.description' => ['string'],
      'qte' => ['nullable', 'integer', 'numeric'],
      'promo' => ['nullable', 'numeric'],
      'price' => ['required', 'numeric'],
      'status' => ['required', 'boolean'],
      'catalogue' => ['required', 'boolean'],
      'images' => ['nullable', 'array'],
    ];
  }
}
