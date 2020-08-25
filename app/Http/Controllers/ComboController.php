<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
use App\Combo;
use App\DetalleCombo;
use App\DetalleBitacora;

class ComboController extends Controller
{
    public function index() {
        $data = DB::table('combo')
            ->where('estado', '=', '1')
            ->orderBy('id', 'desc')
            ->get();

        return response()->json([
            'response' => 1,
            'data' => $data,
        ]);
    }

    public function create() {
        $data = DB::table('producto')
            ->where('estado', '=', '1')
            ->get();

        return response()->json([
            'data' => $data,
        ]);
    }
    
    public function store(Request $request) {

        $descripcion = $request->descripcion;
        $codigo = $request->codigo;
        $precio = $request->precio;

        $array = json_decode($request->array);

        $data = new Combo();
        $data->descripcion = $descripcion;
        $data->codigo = $codigo;
        $data->precio = $precio;
        $data->save();

        foreach ($array as $a) {
            $detalle = new DetalleCombo();
            $detalle->idcombo = $data->id;
            $detalle->idproducto = $a->id;
            $detalle->cantidad = $a->cantidad;
            $detalle->costo = $a->costo;
            $detalle->save();
        }

        // session_start();
        // ob_start();

        // $detalleBitacora = new DetalleBitacora();

        // $detalleBitacora->idbitacora = $_SESSION['idbitacora'];
        // $detalleBitacora->accion = 'Se creo un combo de producto';

        // $detalleBitacora->save();

        return response()->json([
            'response' => 1,
        ]);
    }
}
