<?php

namespace App\Http\Requests\Order;

use App\Models\User;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

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
            'paymentMethod' => ['required', Rule::in(['cash_on_delivery', 'bank_transfer'])],
            'shippingCompany' => ['required'],
            'shippingType' => ['required', Rule::in(['cost_home', 'cost_stop_desk'])],
        ];
    }

    /**
     * Configure the validator instance.
     *
     * @param  \Illuminate\Validation\Validator  $validator
     * @return void
     */
    public function withValidator(Validator $validator)
    {
        $validator->after(function ($validator) {

            if (!Auth::check()) {
                $user = User::where('email', $this->input('email'))->select('uuid')->first();
                if ($user) {
                    $validator->errors()->add('email', 'Cet email existe déjà, Si cet email vous appartient, connectez-vous avec lui et réessayez.');
                }
            }

            if (Auth::check() && $this->user()->email !== $this->input('email')) {
                $validator->errors()->add('email', 'Utiliser votre email, pour continuer votre achat');
            }

        });
    }
}
