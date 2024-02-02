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
            'name' => ['required', 'string', 'min:4', 'max:60'],
            'description' => ['nullable', 'string'],
            'details' => ['nullable', 'array'],
            'choices' => ['nullable', 'array'],
            'qte' => ['nullable', 'integer', 'numeric'],
            'promo' => ['nullable', 'numeric'],
            'price' => ['required', 'numeric'],
            'status' => ['required', 'boolean'],
            'catalogue' => ['required', 'boolean'],
            'images' => ['nullable', 'array'],
        ];
    }
}
