<?php

namespace App\Http\Requests\Role;

use App\Models\Role;
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
            'name' => 'role',
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
            'name' => ['required', 'string', Rule::unique('roles', 'name')->ignore($this->id, 'id')],
            'description' => ['nullable', 'string'],
            'permission' => ['required', Rule::in(Role::PERMIISSION)],
            'permissions' => [$this->permission == 'custom' ? 'required' : 'nullable', $this->permission == 'custom' ? 'array' : ''],
            'permissions.*' => [$this->permission == 'custom' ? 'required' : 'nullable', 'string'],
        ];
    }
}
