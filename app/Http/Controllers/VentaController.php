<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;
use App\Venta;
use App\DetalleVenta;
use App\DetalleBitacora;
use App\Cliente;
use App\Combo;
use App\Producto;

use PDF;

class VentaController extends Controller
{
    public function index() {

        $data = Venta::join('cliente as c', 'venta.idcliente', '=', 'c.id')
            ->select('venta.id', 'c.nombre', 'c.apellido', 'venta.codigo', 'venta.tipo', 
                'venta.total', 'venta.cantidadtotal', 'venta.created_at')
            // ->where('venta.estado', '=', '1')
            ->orderBy('venta.id', 'desc')
            ->get();

        return response()->json([
            'response' => 1,
            'data' => $data,
        ]);
    }

    public function create() {

        $data = Cliente::orderBy('id', 'ASC')->get();

        $producto = Producto::orderBy('id', 'ASC')->get();

        $combo = Combo::orderBy('id', 'ASC')->get();

        return response()->json([
            'data' => $data,
            'producto' => $producto,
            'combo' => $combo,
        ]);
    }
    
    public function store(Request $request) {

        $codigo = $request->codigo;
        $tipo = $request->tipo;
        $idcliente = $request->idcliente;

        $array = json_decode($request->array);

        $data = new Venta();
        $data->codigo = $codigo;
        $data->tipo = $tipo;
        $data->idcliente = $idcliente;
        $data->total = $request->total;
        $data->cantidadtotal = $request->cantidadtotal;
        $data->save();

        foreach ($array as $a) {
            $detalle = new DetalleVenta();
            $detalle->idventa = $data->id;
            if ($a->estado == 'P') {
                $detalle->idproducto = $a->id;
            } else {
                $detalle->idcombo = $a->id;
            }
            $detalle->cantidad = $a->cantidad;
            $detalle->precio = $a->precio;
            $detalle->concepto = $a->concepto;
            $detalle->save();
        }

        // session_start();
        // ob_start();

        // $detalleBitacora = new DetalleBitacora();

        // $detalleBitacora->idbitacora = $_SESSION['idbitacora'];
        // $detalleBitacora->accion = 'Se ha creado una venta';

        // $detalleBitacora->save();

        return response()->json([
            'response' => 1,
        ]);
    }

    public function reporte(Request $request){

        $inicio = $request->inicio;
        $fin = $request->fin;

        $data = Venta::join('cliente as c', 'venta.idcliente', '=', 'c.id')
            ->select('venta.id', 'venta.codigo', 'venta.total', 'c.nombre', 'c.apellido', 'venta.created_at')
            ->where('venta.created_at', '>=', $inicio)
            ->where('venta.created_at', '<=', $fin)
            ->get();

        return response()->json([
            'data' => $data
        ]);
    }

    public function generar(Request $request){

        $inicio = $request->inicio;
        $fin = $request->fin;

        $data = Venta::join('cliente as c', 'venta.idcliente', '=', 'c.id')
            ->select('venta.id', 'venta.codigo', 'venta.total', 'c.nombre', 
                'c.apellido', 'venta.created_at', 'venta.cantidadtotal')
            ->where('venta.created_at', '>=', $inicio)
            ->where('venta.created_at', '<=', $fin)
            ->get();

            $year = date('Y');
            $mes = date('m');
            $dia = date('d');
    
            $fecha = $dia.'/'.$mes.'/'.$year;
    
            $pdf = PDF::loadView('reporte.venta', [
                'fecha' => $fecha,
                'data' => $data
            ]);
    
            $pdf->output();
            $dom_pdf = $pdf->getDomPDF();
    
            $canvas = $dom_pdf ->get_canvas();
            $canvas->page_text(480, 750, "Pag. {PAGE_NUM} de {PAGE_COUNT}", null, 10, array(0, 0, 0));
    
            $canvas->page_text(50, 750, "Usuario", null, 10, array(0, 0, 0));

    
            return $pdf->download('reporte.venta');
            
    }

    public function detalle(Request $request){

        $id = $request->id;

        $data = Venta::join('cliente as c', 'venta.idcliente', '=', 'c.id')
            ->select('venta.id', 'venta.codigo', 'venta.total', 'c.nombre', 
                'c.apellido', 'venta.created_at', 'venta.cantidadtotal')
            ->where('venta.id', '=', $id)
            ->get();

        $detalle = DetalleVenta::join('producto as p', 'detalle_venta.idproducto', '=', 'p.id')
            ->select('p.descripcion', 'detalle_venta.cantidad', 'detalle_venta.precio', 'detalle_venta.concepto')
            ->where('detalle_venta.idventa', '=', $id)
            ->get();

            $year = date('Y');
            $mes = date('m');
            $dia = date('d');
    
            $fecha = $dia.'/'.$mes.'/'.$year;
    
            $pdf = PDF::loadView('reporte.detalle', [
                'fecha' => $fecha,
                'data' => $data,
                'detalle' => $detalle,
            ]);
    
            $pdf->output();
            $dom_pdf = $pdf->getDomPDF();
    
            $canvas = $dom_pdf ->get_canvas();
            $canvas->page_text(480, 750, "Pag. {PAGE_NUM} de {PAGE_COUNT}", null, 10, array(0, 0, 0));
    
            $canvas->page_text(50, 750, "Usuario", null, 10, array(0, 0, 0));

    
            return $pdf->download('reporte.detalle.pdf');
            
    }
}
