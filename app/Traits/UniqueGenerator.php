<?php

namespace App\Traits;

use Nette\Utils\Random;
use Illuminate\Support\Str;

trait UniqueGenerator
{
    protected static function generateRef(string $col = 'ref')
    {
        do {
            $ref = str_shuffle(now()->timestamp . Random::generate(4, '0-9'));
        } while (static::where($col, $ref)->first());
        return $ref;
    }

    /**
     * this method take a column name & string and generate a unique slug
     * @param string $col column name
     * @param string $name
     * @return string
     */
    protected static function generateSlug(string $col = 'slug', string $name): string
    {
        $slug = Str::slug($name);
        if (!static::where($col, $slug)->select($col)->first()) {
            return $slug;
        }

        do {
            $slug = Str::slug(Random::generate(4, '0-9') . ' ' . $name);
        } while (static::where($col, $slug)->first());
        return $slug;
    }

    protected function generateCode(string $col = 'code', $len = 6)
    {
        do {
            $code = Random::generate($len, '0-9');
        } while (static::where($col, $code)->first());
        return $code;
    }
}
