<?php

namespace App\Traits;

use Nette\Utils\Random;

trait ReferanceGenerator
{
  public static function generateRef(string $col = 'ref')
  {
    do {
      $ref = str_shuffle(now()->timestamp . Random::generate(4, '0-9'));
    } while (static::where($col, $ref)->first());
    return $ref;
  }
}
