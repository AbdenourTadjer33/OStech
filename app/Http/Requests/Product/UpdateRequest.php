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

    public function attributes()
    {
        return [
            'mainCategory' => 'catégorie',
            'subCategory' => 'sous-catégorie',
            'brand' => 'brand',
            'name' => 'nom de produit',
            'sku' => 'sku',
            'qte' => 'quantité',
            'price' => 'prix',
            'promo' => 'pourcentage de promotion',
            'description' => 'description',

            'features' => 'caractéristique',
            'features.*.title' => 'titre',
            'features.*.features.*.label' => 'label',
            'features.*.features.*.description' => 'description',

            'colors' => 'couleur',
            'colors.*.label' => 'label',
            'colors.*.code' => 'code',
            'colors.*.amount' => 'extra',

            'options' => 'option',
            'options.*.title' => 'titre',
            'options.*.options.*.label' => 'label',
            'options.*.options.*.amount' => 'extra',

            'status' => 'status',
            'catalog' => 'catalogue',
            'images' => 'image',
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'mainCategory' => ['required', 'array'],
            'mainCategory.id' => ['required'],

            'subCategory' => ['required', 'array'],
            'subCategory.id' => ['required'],

            'brand' => ['nullable', 'array'],
            'brand.id' => [Rule::requiredIf(fn () => $this->brand)],

            'name' => ['required', 'string', 'min:2'],
            'sku' => ['nullable', 'string', 'max:100'],
            'qte' => ['nullable', 'integer', 'numeric'],
            'price' => ['required', 'numeric'],
            'promo' => ['nullable', 'numeric', 'max:100', 'min:1'],
            'description' => ['nullable', 'string', 'max:550'],

            'colors' => ['nullable', 'array'],
            'colors.*' => ['array'],
            'colors.*.label' => ['required', 'string'],
            'colors.*.code' => ['required', 'hex_color'],
            'colors.*.amount' => ['required', 'numeric'],

            'features' => ['nullable', 'array'],
            'features.*' => ['nullable', 'array'],
            'features.*.title' => ['required', 'string'],

            'features.*.features.*' => ['array'],
            'features.*.features.*.label' => ['nullable', 'string'],
            'features.*.features.*.description' => ['required', 'string'],

            'options' => ['nullable', 'array'],
            'options.*' => ['nullable', 'array'],
            'options.*.title' => ['required', 'string'],

            'options.*.options' => ['array'],
            'options.*.options.*.label' => ['required', 'string'],
            'options.*.options.*.amount' => ['required', 'numeric'],

            'status' => ['required', 'boolean'],
            'catalog' => ['required', 'boolean'],
            'images' => ['nullable', 'array'],
        ];
    }
}
