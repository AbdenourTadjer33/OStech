<?php

namespace App\Http\Requests\Order;

use App\Enums\PaymentMethod;
use App\Enums\ShippingType;
use App\Models\User;
use App\Rules\PhoneNumber;
use Illuminate\Support\Str;
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
            'phone' => ['required', new PhoneNumber],
            'email' => ['sometimes', $this->email ? 'email' : ''],
            'address' => ['required', 'string', 'min:4'],
            'city' => ['required', 'min:2'],
            'wilaya' => ['required'],
            'paymentMethod' => ['required', Rule::enum(PaymentMethod::class)],
            'shipping' => ['required'],
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

            if (!Auth::check() && $this->email) {
                if (User::where('email', $this->input('email'))->select('uuid')->first()) {
                    $validator->errors()->add('email', 'Cet email existe déjà, Si cet addresse e-mail vous appartient, connectez-vous avec et réessayez.');
                }
            }

            if (Auth::check() && $this->user()->email !== $this->input('email')) {
                $validator->errors()->add('email', 'Utiliser votre addresse e-mail, pour continuer votre achat');
            }

            if ($this->shipping) {

            }
        });
    }
}
