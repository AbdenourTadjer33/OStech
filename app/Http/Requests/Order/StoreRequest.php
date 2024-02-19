<?php

namespace App\Http\Requests\Order;

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
            'name' => ['required', 'string', 'min:2'],
            'phone' => ['required', 'regex:/^(05|06|07)[0-9]{8}$/'],
            'email' => ['required', 'email'],
            'address' => ['required', 'string', 'min:4'],
            'city' => ['required', 'min:2'],
            'wilaya' => ['required'],
        ];
    }
}
