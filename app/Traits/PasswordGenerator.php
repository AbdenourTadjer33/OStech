<?php

namespace App\Traits;

trait PasswordGenerator
{
  private static $letters = 'abcdefghijklmnopqrstuvwxyz';
  private static $digits = '0123456789';
  private static $specialChars = '!@#$%^&*()_+-={}[]|:;"<>,.?/';
  private static $MAX_SIMILARITY_PERC = 20;

  public static function password($minLength = 8, $maxLength = 16, $diffStrings = []): string
  {
    // List of usable characters
    $chars = static::$letters . mb_strtoupper(static::$letters) . static::$digits . static::$specialChars;

    // Set to true when a valid password is generated
    $passwordReady = false;

    while (!$passwordReady) {
      // The password
      $password = '';

      // Password requirements
      $hasLowercase = false;
      $hasUppercase = false;
      $hasDigit = false;
      $hasSpecialChar = false;

      // A random password length
      $length = random_int($minLength, $maxLength);

      while ($length > 0) {
        $length--;

        $index = random_int(0, mb_strlen($chars) - 1);
        $char = $chars[$index];
        $password .= $char;

        $hasLowercase = $hasLowercase || (mb_strpos(static::$letters, $char) !== false);
        $hasUppercase = $hasUppercase || (mb_strpos(mb_strtoupper(static::$letters), $char) !== false);
        $hasDigit = $hasDigit || (mb_strpos(static::$digits, $char) !== false);
        $hasSpecialChar = $hasSpecialChar || (mb_strpos(static::$specialChars, $char) !== false);
      }

      $passwordReady = ($hasLowercase && $hasUppercase && $hasDigit && $hasSpecialChar);

      if ($passwordReady) {
        foreach ($diffStrings as $string) {
          similar_text($password, $string, $similarityPerc);
          $passwordReady = $passwordReady && ($similarityPerc < static::$MAX_SIMILARITY_PERC);
        }
      }
    }

    return $password;
  }
}
