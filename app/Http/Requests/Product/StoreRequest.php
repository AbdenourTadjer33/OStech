<?php

namespace App\Http\Requests\Product;

use Illuminate\Database\Query\Builder;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRequest extends FormRequest
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
            'category' => ['required'],
            'brand' => ['nullable'],
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
            'images.*' => ['array'],
            'images.*.file' => ['image', 'max:6000'],
        ];
    }
}
