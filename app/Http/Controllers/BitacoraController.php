<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;

class BitacoraController extends Controller
{
    public function index() {
        $data = DB::table('bitacora')
            ->where('estado', '=', '1')
            ->orderBy('id', 'desc')
            ->get();

        return response()->json([
            'response' => 1,
            'data' => $data,
        ]);
    }

    public function show($id) {
        $data = DB::table('detalle_bitacora')
            ->where('idbitacora', '=', $id)
            ->orderBy('id', 'desc')
            ->get();

        return response()->json([
            'response' => 1,
            'data' => $data,
        ]);
    }
}
