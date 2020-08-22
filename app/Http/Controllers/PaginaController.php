<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Pagina;

class PaginaController extends Controller
{
    public function getVisitas($idpagina) {
        try {
            $pagina = Pagina::find($idpagina);
            return response()->json([
                'response'=> 1,
                'visitas' => $pagina->visitas
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'response'=> -1,
                'error' => [
                    'line' => $th->getLine(),
                    'message' => $th->getMessage(),
                    'file' => $th->getFile()
                ]
            ]);
        }
        
    }

    public function setVisitas(Request $request) {

        try {
            $idpagina = $request->idpagina;
            $pagina = Pagina::find($idpagina);
            $pagina->visitas += 1;
            $pagina->update();
    
            return response()->json([
                'response'=> 1,
                'messsage' => 'Se actualizo'
            ]); 
        } catch (\Throwable $th) {
            return response()->json([
                'response'=> -1,
                'error' => [
                    'line' => $th->getLine(),
                    'message' => $th->getMessage(),
                    'file' => $th->getFile()
                ]
            ]);
        }
    }
}
