<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Cliente;

use App\DetalleBitacora;

class ClienteController extends Controller
{
    public function index() {
        $data = DB::table('cliente')
            ->where('estado', '=', '1')
            ->orderBy('id', 'desc')
            ->get();

        return response()->json([
            'response' => 1,
            'data' => $data,
        ]);
    }
    
    public function store(Request $request) {

        $nit = $request->nit;
        $nombre = $request->nombre;
        $apellido = $request->apellido;
        $telefono = $request->telefono;
        $correo = $request->correo;
        $genero = $request->genero;

        $data = new Cliente();
        $data->nit = $nit;
        $data->nombre = $nombre;
        $data->apellido = $apellido;
        $data->telefono = $telefono;
        $data->correo = $correo;
        $data->genero = $genero;
        $data->save();

        // session_start();
        // ob_start();

        // $detalleBitacora = new DetalleBitacora();

        // $detalleBitacora->idbitacora = $_SESSION['idbitacora'];
        // $detalleBitacora->accion = 'Se creo un cliente';

        // $detalleBitacora->save();

        return response()->json([
            'response' => 1,
        ]);
    }
}
