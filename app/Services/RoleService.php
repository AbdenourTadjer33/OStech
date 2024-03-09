<?php

namespace App\Services;

use App\Models\Role;
use Illuminate\Support\Facades\Cache;

class RoleService
{
    public function getRoles()
    {
        return Cache::remember('roles', now()->addHours(2), fn () => Role::get());
    }
}
