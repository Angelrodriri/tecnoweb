<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\PedidoCliente;
use App\Cliente;
use App\Producto;
use App\DetallePedidoCliente;

class PedidoClienteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
        try {
            
            $pedidos = PedidoCliente::join('cliente', 'pedido_cliente.idcliente', 'cliente.id')
                                    ->select('cliente.nombre as nombre', 'cliente.apellido as apellido', 'pedido_cliente.*')
                                    ->get();

            return response()->json([
                'response' => 1,
                'data' => $pedidos
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

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        try {
            
            $clientes = Cliente::orderBy('id', 'ASC')->get();
            $productos = Producto::orderBy('id', 'ASC')->get();

            return response()->json([
                'response' => 1,
                'clientes' => $clientes,
                'productos' => $productos
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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            
            $pedidoCliente = new PedidoCliente();
            $pedidoCliente->codigo = $request->codigo;
            $pedidoCliente->fecha = $request->fecha;
            $pedidoCliente->montototal = $request->montototal;
            $pedidoCliente->nota = $request->nota;
            $pedidoCliente->idcliente = $request->idcliente;
            $pedidoCliente->iduser = $request->iduser;
            $pedidoCliente->save();

            $productos = $request->productos;
            foreach ($productos as $key => $producto) {
                $detallePedido = new DetallePedidoCliente();
                $detallePedido->cantidad = $producto['cantidad'];
                $detallePedido->precio = $producto['costo'];
                $detallePedido->tipo = $producto['tipo'];
                $detallePedido->idproducto = $producto['idproducto'];
                $detallePedido->idpedido_cliente = $pedidoCliente['id'];
                $detallePedido->save();

                $productoSearched = Producto::find($producto['idproducto']);
                $cant = intval($producto['cantidad']);
                $productoSearched->stock = $productoSearched->stock - $cant;
                $productoSearched->update();

            }

            return response()->json([
                'response' => 1,
                'message' => 'Guardado correctamente'
                // 'data' => $request->all()
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

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {   
        try {
            
            $pedido = PedidoCliente::find($id);

            $detalle = DetallePedidoCliente::join('producto as p', 'detalle_pedido_cliente.idproducto', 'p.id')
                                            ->where('detalle_pedido_cliente.idpedido_cliente', $id)
                                            ->select('detalle_pedido_cliente.*', 'p.descripcion')
                                            ->get();
            $clientes = Cliente::orderBy('id', 'ASC')->get();
            $productos = Producto::orderBy('id', 'ASC')->get();
            return response()->json([
                'response' => 1,
                'data' => $detalle,
                'pedido' => $pedido,
                'clientes' => $clientes,
                'productos' => $productos
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

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            
            $pedidoCliente = PedidoCliente::find($id);

            $detalles = DetallePedidoCliente::join('producto as p', 'detalle_pedido_cliente.idproducto', 'p.id')
                                            ->where('detalle_pedido_cliente.idpedido_cliente', $id)
                                            ->select('detalle_pedido_cliente.*', 'p.descripcion')
                                            ->get();
            foreach ($detalles as $key => $detalle) {

                $productoSearched = Producto::find($detalle->idproducto);
                $cant = intval($detalle->cantidad);
                $productoSearched->stock = $productoSearched->stock + $cant;
                $productoSearched->update();

                $detalle->delete();
            }

            $pedidoCliente->montototal = $request->montototal;
            $pedidoCliente->nota = $request->nota;
            $pedidoCliente->update();

            $productos = $request->productos;
            foreach ($productos as $key => $producto) {
                $detallePedido = new DetallePedidoCliente();
                $detallePedido->cantidad = $producto['cantidad'];
                $detallePedido->precio = $producto['costo'];
                $detallePedido->tipo = $producto['tipo'];
                $detallePedido->idproducto = $producto['idproducto'];
                $detallePedido->idpedido_cliente = $pedidoCliente->id;
                $detallePedido->save();

                $productoSearched = Producto::find($producto['idproducto']);
                $cant = intval($producto['cantidad']);
                $productoSearched->stock = $productoSearched->stock - $cant;
                $productoSearched->update();
                
            }

            return response()->json([
                'response' => 1,
                'message' => 'Se actualizó corecctamente'
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

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            
            $pedidoCliente = PedidoCliente::find($id);
            

            $detallePedidos = PedidoCliente::join('detalle_pedido_cliente as dp', 'pedido_cliente.id', 'dp.idpedido_cliente')
                                            ->select('dp.*')
                                            ->where('pedido_cliente.id', $id)
                                            ->get();
            foreach ($detallePedidos as $key => $detalle) {
                
                $det = DetallePedidoCliente::find($detalle->id);
                $det->delete();

            }

            $pedidoCliente->delete();

            $pedidos = PedidoCliente::join('cliente', 'pedido_cliente.idcliente', 'cliente.id')
                                    ->select('cliente.nombre as nombre', 'cliente.nombre as apellido', 'pedido_cliente.*')
                                    ->get();

            return response()->json([
                'response' => 1,
                'message' => 'Se eliminó correctamente',
                'data' => $pedidos
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
}
