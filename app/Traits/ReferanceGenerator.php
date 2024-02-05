<?php

namespace App\Traits;

trait ReferanceGenerator
{
  public static function generateRef(string $col = 'ref')
  {
    do {
      $ref = str_shuffle(time() . random_int(100, 999));
    } while (static::where($col, $ref)->first());
    return $ref;
  }
}
