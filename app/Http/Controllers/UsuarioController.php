<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\DB;
use App\User;

use App\DetalleBitacora;

class UsuarioController extends Controller
{
    public function index() {
        $data = DB::table('users')
            ->where('estado', '=', '1')
            ->orderBy('id', 'desc')
            ->get();

        return response()->json([
            'response' => 1,
            'data' => $data,
        ]);
    }

    public function create() {
        $data = DB::table('rol')
            ->where('estado', '=', '1')
            ->get();

        return response()->json([
            'data' => $data,
        ]);
    }
    
    public function store(Request $request) {

        $nombre = $request->nombre;
        $apellido = $request->apellido;
        
        $usuario = $request->usuario;

        $array = DB::table('users')
            ->where('usuario', '=', $usuario)
            ->get();

        if (sizeof($array) > 0) {
            return response()->json([
                'response' => 0
            ]);
        }

        $password = $request->password;
        $idrol = $request->idrol;

        $data = new User();
        $data->nombre = $nombre;
        $data->apellido = $apellido;
        $data->usuario = $usuario;
        $data->password = bcrypt($password);
        $data->save();

        session_start();
        ob_start();

        $detalleBitacora = new DetalleBitacora();

        $detalleBitacora->idbitacora = $_SESSION['idbitacora'];
        $detalleBitacora->accion = 'Se ha creado un usuario';

        $detalleBitacora->save();

        return response()->json([
            'response' => 1,
        ]);
    }
}
