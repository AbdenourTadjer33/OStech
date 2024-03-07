<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class PhoneNumber implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $cleanedValue = preg_replace('/\s+/', '', $value);

        // Define the regex pattern
        $pattern = '/^(05|06|07)\d{8}$/';

        // Check if the cleaned value matches the pattern
        if (!preg_match($pattern, $cleanedValue)) {
            $fail('validation.phone')->translate();
        }
    }
}
