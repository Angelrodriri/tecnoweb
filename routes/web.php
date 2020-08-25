<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('layouts.app');
});

Auth::routes();

Route::get('/token', 'HomeController@token');
Route::post('/logout', 'HomeController@logout');

Route::get('/home', 'HomeController@index')->name('home');

Route::get('rol/index', 'HomeController@index');
Route::get('rol/create', 'HomeController@index');

Route::get('permiso/index', 'HomeController@index');
Route::get('permiso/create', 'HomeController@index');

Route::get('unidad_medida/index', 'HomeController@index');
Route::get('unidad_medida/create', 'HomeController@index');

Route::get('insumo/index', 'HomeController@index');
Route::get('insumo/create', 'HomeController@index');

Route::get('usuario/index', 'HomeController@index');
Route::get('usuario/create', 'HomeController@index');

Route::get('bitacora/index', 'HomeController@index');
Route::get('bitacora/show/{id}', 'HomeController@index');

Route::get('producto_terminado/index', 'HomeController@index');
Route::get('producto_terminado/create', 'HomeController@index');

Route::get('combo/index', 'HomeController@index');
Route::get('combo/create', 'HomeController@index');

Route::get('cliente/index', 'HomeController@index');
Route::get('cliente/create', 'HomeController@index');

Route::get('venta/index', 'HomeController@index');
Route::get('venta/create', 'HomeController@index');


Route::get('reporte_venta/index', 'HomeController@index');

Route::post('/login2', ['as' => 'user.login', 'uses' => 'UsuarioController@login']);


