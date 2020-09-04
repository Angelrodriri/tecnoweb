<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
use App\Insumo;
use App\UnidadMedida;

use App\DetalleBitacora;
use Illuminate\Support\Facades\Auth;

class InsumoController extends Controller
{
    public function index() {
        // $data = DB::table('insumo as i')
        $data = Insumo::join('unidad_medida as u', 'insumo.idunidadmedida', '=', 'u.id')
            ->select('insumo.id', 'insumo.nombre', 'insumo.tipo', 'u.descripcion', 'u.abreviatura',    
                'insumo.created_at')
            // ->where('i.estado', '=', '1')
            ->orderBy('insumo.id', 'desc')
            ->get();
        $user = Auth::user();
        return response()->json([
            'response' => 1,
            'user' => $user,
            'data' => $data,
            
        ]);
    }

    public function create() {
        $unidad = UnidadMedida::all();

        return response()->json([
            'data' => $unidad,
        ]);
    }
    
    public function store(Request $request) {

        $nombre = $request->nombre;
        $tipo = $request->tipo;
        $idunidadmedida = $request->idunidadmedida;

        $data = new Insumo();
        $data->nombre = $nombre;
        $data->tipo = $tipo;
        $data->idunidadmedida = $idunidadmedida;
        $data->save();

        // session_start();
        // ob_start();

        // $detalleBitacora = new DetalleBitacora();

        // $detalleBitacora->idbitacora = $_SESSION['idbitacora'];
        // $detalleBitacora->accion = 'Se ha creado un insumo';

        // $detalleBitacora->save();

        return response()->json([
            'response' => 1,
        ]);
    }
}
