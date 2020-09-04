<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('test', function() {
    return 'SERVICIO TEST';
});

Route::get('rol/index', 'RolController@index');
Route::post('rol/store', 'RolController@store');

Route::get('permiso/index', 'PermisoController@index');
Route::post('permiso/store', 'PermisoController@store');

Route::get('unidad_medida/index', 'UnidadMedidaController@index');
Route::post('unidad_medida/store', 'UnidadMedidaController@store');

Route::get('bitacora/index', 'BitacoraController@index');
Route::get('bitacora/show/{id}', 'BitacoraController@show');

Route::get('insumo/index', 'InsumoController@index');
Route::get('insumo/create', 'InsumoController@create');
Route::post('insumo/store', 'InsumoController@store');

Route::get('usuario/index', 'UsuarioController@index');
Route::get('usuario/create', 'UsuarioController@create');
Route::post('usuario/store', 'UsuarioController@store');

Route::get('producto/index', 'ProductoController@index');
Route::get('producto/create', 'ProductoController@create');
Route::post('producto/store', 'ProductoController@store');

Route::get('combo/index', 'ComboController@index');
Route::get('combo/create', 'ComboController@create');
Route::post('combo/store', 'ComboController@store');

Route::get('cliente/index', 'ClienteController@index');
Route::post('cliente/store', 'ClienteController@store');

Route::get('venta/index', 'VentaController@index');
Route::get('venta/create', 'VentaController@create');
Route::post('venta/store', 'VentaController@store');

Route::post('venta/reporte', 'VentaController@reporte');
Route::post('venta/generar', 'VentaController@generar');
Route::post('venta/detalle', 'VentaController@detalle');

Route::get('getVisitas/{idpagina}', 'PaginaController@getVisitas');
Route::post('setVisitas', 'PaginaController@setVisitas');
Route::get('estadisticas', 'PaginaController@getEstadisticas');

Route::post('user/modulos', 'UsuarioController@getModulos');

Route::post('login', 'UsuarioController@login');

Route::post('user/updateConfig', 'UsuarioController@updateConfig');

Route::resource('pedidocliente', 'PedidoClienteController');
/*
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
*/