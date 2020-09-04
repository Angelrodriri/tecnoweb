<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
use App\Producto;
use App\DetalleProducto;
use App\Insumo;

use function GuzzleHttp\json_decode;

use App\DetalleBitacora;

class ProductoController extends Controller
{
    public function index() {

        $data = Producto::orderBy('id', 'desc')->get();

        return response()->json([
            'response' => 1,
            'data' => $data,
        ]);
    }

    public function create() {
        $data = Insumo::join('unidad_medida as u', 'insumo.idunidadmedida', '=', 'u.id')
            ->select('insumo.id', 'insumo.nombre', 'insumo.tipo', 'u.descripcion')
            // ->where('i.estado', '=', '1')
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

        $data = new Producto();
        $data->descripcion = $descripcion;
        $data->codigo = $codigo;
        $data->precio = $precio;
        $data->save();

        foreach ($array as $a) {
            $detalle = new DetalleProducto();
            $detalle->idproducto = $data->id;
            $detalle->idinsumo = $a->id;
            $detalle->cantidad = $a->cantidad;
            $detalle->costo = $a->costo;
            $detalle->save();
        }

        // session_start();
        // ob_start();

        // $detalleBitacora = new DetalleBitacora();

        // $detalleBitacora->idbitacora = $_SESSION['idbitacora'];
        // $detalleBitacora->accion = 'Se ha creado un producto terminado';

        // $detalleBitacora->save();

        return response()->json([
            'response' => 1,
        ]);
    }
}
