<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\DetalleBitacora;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth');
    }

    public function token() {

        $session = app('session');

        $token = $session->token();

        return response()->json([
            'token' => $token
        ]);
    }

    public function logout(Request $request)
    {

        // session_start();
        // ob_start();

        // $detalleBitacora = new DetalleBitacora();

        // $detalleBitacora->idbitacora = $_SESSION['idbitacora'];
        // $detalleBitacora->accion = 'Cerro Session';

        // $detalleBitacora->save();

        Auth::logout();
        $request->session()->invalidate();
        return redirect('/');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }
}
