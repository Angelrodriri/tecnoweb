<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
use App\Permiso;

use App\DetalleBitacora;

class PermisoController extends Controller
{
    public function index() {
        $data = DB::table('permiso')
            ->where('estado', '=', '1')
            ->orderBy('id', 'desc')
            ->get();

        return response()->json([
            'response' => 1,
            'data' => $data,
        ]);
    }
    
    public function store(Request $request) {

        $descripcion = $request->descripcion;
        $array = DB::table('permiso')
            ->where('descripcion', '=', $descripcion)
            ->get();

        if (sizeof($array) > 0) {
            return response()->json([
                'response' => 0,
            ]);
        }

        $data = new Permiso();
        $data->descripcion = $descripcion;
        $data->save();

        session_start();
        ob_start();

        $detalleBitacora = new DetalleBitacora();

        $detalleBitacora->idbitacora = $_SESSION['idbitacora'];
        $detalleBitacora->accion = 'Se ha creado un permiso';

        $detalleBitacora->save();

        return response()->json([
            'response' => 1,
        ]);
    }
}
