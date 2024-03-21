<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Rules\PhoneNumber;
class ContactRequest extends FormRequest
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
            // 'name' => ['required', 'min:4'],
            // 'email' => ['required', 'email'],
            // 'phone' => ['required', new PhoneNumber],
            // 'subject' => ['required', 'string', 'min:2'],
            // 'message' => ['required', 'string', 'min:4'],
        ];
    }
}