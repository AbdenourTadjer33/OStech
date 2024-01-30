<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreRequest;
use App\Http\Requests\Admin\UpdateRequest;

class AdminController extends Controller
{

    public function __construct()
    {
        $this->middleware('precognitive')->only(['store', 'update']);
    }

    public function index()
    {
        $users = User::admin()->latest()->with('role:id,name')->paginate(5)->toArray();
        return Inertia::render('Admin/User/Index', [
            'users' => $users
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/User/Create', [
            'roles' => DB::table('roles')->get()->toArray(),
        ]);
    }

    public function show() 
    {

    }

    public function store(StoreRequest $request)
    {
        DB::transaction(
            fn () =>
            User::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'password' => $request->password,
                'status' => $request->status,
                'type' => 'admin',
                'role_id' => $request->role_id,
            ])
        );

        session()->flash('alert', [
            'status' => 'success',
            'message' => 'Admin créer avec succés.',
        ]);

        if ($request->input('redirect')) {
            return redirect(route('admin.settings.users.index'));
        }
    }

    public function edit()
    {
    }

    public function update(UpdateRequest $request)
    {
        User::where('uuid', $request->uuid)->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'status' => $request->status,
            'role_id' => $request->role_id,
        ]);

        session()->flash('');
    }

    public function destroy(Request $request)
    {
        if ($request->uuid == $request->user()->uuid) {
            return session()->flash('alert', [
                'status' => 'danger',
                'message' => 'Vous pouvez supprimé votre compte.',
            ]);
        }

        if ($request->input('trash')) {
            User::where('uuid', $request->uuid)->forceDelete();
            return session()->flash('alert', [
                'status' => 'success',
                'message' => 'Admin supprimé définitivement avec succés.'
            ]);
        }

        User::where('uuid', $request->uuid)->delete();
        return session()->flash('alert', [
            'status' => 'success',
            'message' => 'Admin supprimé avec succés.'
        ]);
    }

    public function generatePassword()
    {
        return User::password();
    }
}
