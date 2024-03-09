<?php

namespace App\Http\Controllers\Admin;

use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Requests\Role\StoreRequest;
use App\Http\Requests\Role\UpdateRequest;
use App\Services\RoleService;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class RoleController extends Controller
{
    // FINISHED
    public function index(RoleService $roleService)
    {
        return Inertia::render('Admin/Role/Index', [
            'roles' => $roleService->getRoles(),
        ]);
    }

    // FINISHED
    public function create()
    {
        return Inertia::render('Admin/Role/Create');
    }

    // FINISHED
    public function store(StoreRequest $request)
    {
        DB::transaction(
            fn () =>
            Role::create([
                'name' => $request->name,
                'description' => $request->description,
                'permission' => $request->permission,
                'permissions' => $request->permissions,
            ])
        );

        $this->clearCacheRoles();

        return redirect(route('admin.role.index'))->with('alert', [
            'status' => 'success',
            'message' => 'role créer avec succés',
        ]);
    }

    // FINISHED
    public function edit(Request $request, RoleService $roleService)
    {
        $role = $roleService->getRoles()->firstWhere('id', $request->id);

        if (!$role) {
            return redirect()->back()->with('alert', [
                'status' => 'danger',
                'message' => 'Role non trouvé',
            ]);
        }

        return Inertia::render('Admin/Role/Edit', [
            'role' => $role,
        ]);
    }

    // FINISHED
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

        $this->clearCacheRoles();

        return redirect(route('admin.role.index'))->with('alert', [
            'status' => 'success',
            'message' => 'role editer avec succés',
        ]);
    }

    // FINISHED
    public function destroy(Request $request, RoleService $roleService)
    {
        $role = $roleService->getRoles()->firstWhere('id', $request->id)->loadCount('users');

        if (!$role) {
            return redirect()->back()->with('alert', [
                'status' => 'danger',
                'message' => 'Role non trouvé',
            ]);
        }

        if (!$role->users_count) {
            DB::transaction(fn () => $role->delete());

            $this->clearCacheRoles();

            return redirect()->back()->with('alert', [
                'status' => 'success',
                'message' => 'role supprimé avec succés'
            ]);
        }

        return redirect()->back()->with('alert', [
            'status' => 'danger',
            'message' => 'Impossible de supprimé ce role, plusieurs utilisateur en dépends'
        ]);
    }

    // FINISHED
    private function clearCacheRoles()
    {
        Cache::forget('roles');
    }
}
