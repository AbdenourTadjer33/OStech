<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function create(Request $request)
    {
        return Inertia::render('Admin/Auth/Login');
    }

    public function store(Request $request)
    {
        $user = User::admin()
            ->active()
            ->where('email', $request->username)
            ->orWhere('phone', $request->username)
            ->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'username' => trans('auth.failed'),
            ]);
        }

        Auth::login($user, $request->remember);

        $request->session()->regenerate();

        return redirect(route('admin.dashboard'));
    }
}
