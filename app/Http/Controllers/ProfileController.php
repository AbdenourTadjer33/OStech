<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function index(Request $request): Response
    {
        return Inertia::render('Profile/Index', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
        ]);
    }


    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        DB::transaction(function () use ($request) {
            $request->user()->update([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'data' => [
                    'address' => $request->address,
                    'city' => $request->city,
                    'wilaya' => $request->wilaya
                ],
            ]);
        });

        if ($request->user()->wasChanged('email')) {
            $request->user()->email_verified_at = null;
            $request->user()->save();
        }

        return Redirect::route('profile.index')->with("alert", [
            'status' => 'success',
            'message' => 'Profile information sont mis à jour avec succés'
        ]);
    }
}
