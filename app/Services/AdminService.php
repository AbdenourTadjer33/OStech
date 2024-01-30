<?php

namespace App\Services;

use App\Models\User;

class AdminService {
    public function generatePassword() {
        User::generatePassword();
    }
}