<?php

namespace App\Http\Controllers\Admin;

use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Requests\Role\StoreRequest;
use App\Http\Requests\Role\UpdateRequest;
use Inertia\Inertia;

class RoleController extends Controller
{
    public function __construct()
    {
        $this->middleware('precognitive')->only(['store', 'update']);
    }

    public function index()
    {
        $roles = Role::latest()->paginate(10)->toArray();
        return Inertia::render('Admin/Role/Index', [
            'roles' => $roles,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Role/Create');
    }

    public function store(StoreRequest $request)
    {
        $role = DB::transaction(
            fn () =>
            Role::create([
                'name' => $request->name,
                'description' => $request->description,
                'permission' => $request->permission,
                'permissions' => $request->permissions,
            ])
        );
        if (!$role) return session()->flash('alert', [
            'status' => 'danger',
            'message' => 'quelque chose s\'est mal passé, veuillez signaler ce bug',
        ]);

        session()->flash('alert', [
            'status' => 'success',
            'message' => 'role créer avec succés',
        ]);

        if ($request->input('redirect')) {
            return redirect(route('admin.settings.roles.index'));
        }
    }

    public function edit()
    {
    }

    public function update(UpdateRequest $request)
    {
        DB::transaction(
            fn () =>
            Role::where('id', $request->id)->update([
                'name' => $request->name,
                'description' => $request->description,
                'permission' => $request->permission,
                'permissions' => $request->permissions,
            ])
        );

        return session()->flash('');
    }

    public function destroy(Request $request)
    {
        $role = Role::where('id', $request->id)->withCount('users')->firstOrFail();

        if (!$role->users_count) {

            $deleted = DB::transaction(fn () => $role->delete());

            if (!$deleted) {
                return session()->flash('alert', [
                    'status' => 'danger',
                    'message' => 'something went wrong, please retry later.',
                ]);
            }

            return session()->flash('alert', [
                'status' => 'success',
                'message' => 'role supprimé avec succés',
            ]);
        }

        return session()->flash('alert', [
            'status' => 'danger',
            'message' => 'Impossible de supprimé ce role, plusieurs utilisateur dépends de ce role',
        ]);
    }
}
