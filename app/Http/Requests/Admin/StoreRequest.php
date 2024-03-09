<?php

namespace App\Http\Requests\Admin;

use App\Rules\PhoneNumber;
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
            'email' => ['required', 'email', 'unique:users'],
            'phone' => ['nullable', new PhoneNumber, 'unique:users'],
            'password' => ['required', 'min:8'],
            'status' => ['required', 'boolean'],
            'role' => ['required'],
        ];
    }
}
