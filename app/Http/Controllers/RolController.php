<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
use App\Rol;
use App\DetalleBitacora;

class RolController extends Controller
{

    public function index() {
        $data = DB::table('rol')
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
        $array = DB::table('rol')
            ->where('descripcion', '=', $descripcion)
            ->get();

        if (sizeof($array) > 0) {
            return response()->json([
                'response' => 0,
            ]);
        }

        $data = new Rol();
        $data->descripcion = $descripcion;
        $data->save();

        // session_start();
        // ob_start();

        // $detalleBitacora = new DetalleBitacora();

        // $detalleBitacora->idbitacora = $_SESSION['idbitacora'];
        // $detalleBitacora->accion = 'Se he creado un rol';

        // $detalleBitacora->save();

        return response()->json([
            'response' => 1,
        ]);
    }
}
