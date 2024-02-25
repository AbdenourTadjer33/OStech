<?php

namespace App\Http\Requests\Coupon;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Validator;

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
            'type' => ['required', Rule::in(['pourcentage', 'fix'])],
            'value' => ['required', 'numeric'],
            'maxUse' => ['required', 'numeric', 'min:1'],
            'maxAmount' => ['nullable', 'numeric'],
            'status' => ['required', 'boolean'],
            'startAt' => ['required', 'date'],
            'expireAt' => ['required', 'date'],
        ];
    }

    public function withValidator(Validator $validator)
    {
        $validator->sometimes('value', 'between:1,100', fn ($input) => $input->type === 'percentage');

        $validator->sometimes('value', 'gte:1', fn ($input) => $input->type === 'fixed');

        $validator->sometimes('maxAmount', 'required', fn ($input) => $input->type === 'percentage');
    }
}
