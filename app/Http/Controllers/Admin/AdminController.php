<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\RoleService;
use App\Events\Admin\NewAdmin;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\Admin\StoreRequest;
use App\Http\Requests\Admin\UpdateRequest;

class AdminController extends Controller
{

    public function __construct()
    {
        $this->middleware('precognitive')->only(['store', 'update']);
    }

    // FINISHED
    public function index()
    {
        $users = User::admin()->sample()->latest()->with('role:id,name')->paginate(15);

        return Inertia::render('Admin/User/Index', [
            'users' => $users
        ]);
    }

    // FINISHED
    public function create(RoleService $roleService)
    {
        return Inertia::render('Admin/User/Create', [
            'roles' => $roleService->getRoles()->map(fn ($role) => ['id' => $role->id, 'name' => $role->name]),
        ]);
    }

    // FINISHED
    public function store(StoreRequest $request)
    {

        /**
         * @var \App\Models\User
         */
        $user = DB::transaction(
            fn () =>
            User::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'password' => Hash::make($request->password),
                'status' => $request->status,
                'type' => 'admin',
                'role_id' => $request->role,
            ])
        );

        if ($user->status) {
            $user = $user->toArray();
            $user['password'] = $request->password;

            event(new NewAdmin($user));
        }

        return redirect(route('admin.administrateur.index'))->with('alert', [
            'status' => 'success',
            'message' => 'Admin créer avec succés',
        ]);
    }

    // FINISHED
    public function edit(Request $request, RoleService $roleService)
    {
        return Inertia::render('Admin/User/Edit', [
            'roles' => $roleService->getRoles()->map(fn ($role) => ['id' => $role->id, 'name' => $role->name]),
            'user' => User::where('uuid', $request->uuid)->sample()->firstOrFail(),
        ]);
    }

    // FINISHED
    public function update(UpdateRequest $request)
    {
        $user = DB::transaction(
            fn () =>
            User::where('uuid', $request->uuid)->update([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'password' => Hash::make($request->password),
                'status' => $request->status,
                'role_id' => $request->role,
            ])
        );

        if ($user->status) {
            $user = $user->toArray();
            $user['password'] = $request->password;

            event(new NewAdmin($user));
        }

        return redirect(route('admin.administrateur.index'))->with('alert', [
            'status' => 'success',
            'message' => 'Admin editer avec succés',
        ]);

        session()->flash('');
    }

    // FINISHED
    public function destroy(Request $request)
    {
        if ($request->uuid == $request->user()->uuid) {
            return session()->flash('alert', [
                'status' => 'danger',
                'message' => 'Vous pouvez supprimé votre compte.',
            ]);
        }

        User::where('uuid', $request->uuid)->forceDelete();
        return session()->flash('alert', [
            'status' => 'success',
            'message' => 'Admin supprimé avec succés.'
        ]);
    }

    // FINISHED
    public function active(Request $request)
    {
        User::where('uuid', $request->uuid)->update(['status' => true]);
        return redirect(route('admin.administrateur.index'));
    }

    // FINISHED
    public function disable(Request $request)
    {
        if ($request->user()->uuid === $request->uuid) {
            return redirect()->back()->with('alert', [
                'status' => 'danger',
                'message' => 'Vous pouvez pas désactevez le status de ton compte',
            ]);
        }
        User::where('uuid', $request->uuid)->update(['status' => false]);
        return redirect(route('admin.administrateur.index'));
    }
}
