<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\DB;
use App\User;
use App\Modulo;
use App\ModuloRol;
use Illuminate\Support\Facades\Hash;

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

        // session_start();
        // ob_start();

        // $detalleBitacora = new DetalleBitacora();

        // $detalleBitacora->idbitacora = $_SESSION['idbitacora'];
        // $detalleBitacora->accion = 'Se ha creado un usuario';

        // $detalleBitacora->save();

        return response()->json([
            'response' => 1,
        ]);
    }

    public function getModulos(Request $request) {

        try {
            
            $user = User::find($request->iduser);
            $modulos = ModuloRol::where('idrol', $user->idrol)
                                ->get();
            
            $arr = [];
            foreach ($modulos as $key => $value) {
                if ($value['visible'] == 'S') {
                    array_push($arr, $value['idmodulo']);
                }
            }

            return response()->json([
                'response' => 1,
                'modulos' => $arr
            ]);

        } catch (\Throwable $th) {
          return response()->json([
              'response' => -1,
              'error' => [
                  'file' => $th->getFile(),
                  'line' => $th->getLine(),
                  'message' => $th->getMessage()
              ]
          ]);
        }

    }

    public function login(Request $request) {

        try {
            
            $usuario = $request->usuario;
            $password = $request->password;
            $user = User::where('usuario', $usuario)->get();
            // return response()->json(['ok' => false]);

            if ($user->count() > 0) {
                $user = $user[0];
                if (Hash::check($password, $user->password)) {
                    // dd(['ok' => true]);
                    // return redirect('home');
                    // return view('layouts.app')
                    $user->token = md5($user->usuario);
                    return response()->json([
                        'response' => 1,
                        'user' => $user
                    ]);
                }
                return response()->json([
                    'response' => 0,
                    'message' => 'Usuario incorrecto'
                ]);
            }
            
            return response()->json([
                'response' => 0,
                'message' => 'Usuario incorrecto'
            ]);

        } catch (\Throwable $th) {
            
            return response()->json([
                'response' => -1,
                'error' => [
                    'file' => $th->getFile(),
                    'line' => $th->getLine(),
                    'message' => $th->getMessage()
                ]
            ]);
        }

    }

    function updateConfig(Request $request) {

        try {

            $color = $request->color;
            $letra = $request->letra;
            $iduser = $request->iduser;

            $user = User::find($iduser);
            if ($user) {

                $user->color = $color;
                $user->letra = $letra;
                $user->update();

                return response()->json([
                    'response' => 1,
                    'message' => 'Config actualizado correctamente'
                ]);

            } else {
                return response()->json([
                    'response' => 0,
                    'message' => 'Usuario no existe'
                ]);
            }

        } catch (\Throwable $th) {
            return response()->json([
                'response' => -1,
                'error' => [
                    'file' => $th->getFile(),
                    'line' => $th->getLine(),
                    'message' => $th->getMessage()
                ]
            ]);
        }

    }
}
