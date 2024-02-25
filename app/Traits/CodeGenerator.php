<?php

namespace App\Traits;

use Nette\Utils\Random;

trait CodeGenerator {
    protected function generate($len = 8, $col = 'code') {
        do {
            $code = Random::generate($len, '0-9');
        } while (static::where($col, $code)->first());
        return $code;
    }
}