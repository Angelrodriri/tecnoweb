<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
use App\UnidadMedida;

use App\DetalleBitacora;

class UnidadMedidaController extends Controller
{
    public function index() {
        
        $data = UnidadMedida::orderBy('id', 'desc')->get();

        return response()->json([
            'response' => 1,
            'data' => $data,
        ]);
    }
    
    public function store(Request $request) {

        $descripcion = $request->descripcion;
        $abreviatura = $request->abreviatura;

        $data = new UnidadMedida();
        $data->descripcion = $descripcion;
        $data->abreviatura = $abreviatura;
        $data->save();

        // session_start();
        // ob_start();

        // $detalleBitacora = new DetalleBitacora();

        // $detalleBitacora->idbitacora = $_SESSION['idbitacora'];
        // $detalleBitacora->accion = 'Se ha creado una unidad de medida';

        // $detalleBitacora->save();

        return response()->json([
            'response' => 1,
        ]);
    }
    
}
