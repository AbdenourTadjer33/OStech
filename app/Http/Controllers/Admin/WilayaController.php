<?php

namespace App\Http\Controllers\Admin;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Storage;

class WilayaController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Wilaya/Index', [
            'wilayas' => Storage::json('data/wilaya.json'),
        ]);
    }

    public function update()
    {
        $wilayas = DB::table('wilayas')->get();

        Storage::put('data/wilaya.json', json_encode($wilayas, JSON_UNESCAPED_UNICODE));
        dump($wilayas);
    }
}
