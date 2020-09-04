<?php

use Illuminate\Database\Seeder;

use App\Pagina;

class PaginaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $paginas = $this->getPaginas();
        foreach ($paginas as $key => $pagina) {
            Pagina::create($pagina);
        }
    }

    public function getPaginas() {
        return [
            [
                'nombre' => 'usuario',
                'visitas' => 0
            ],
            [
                'nombre' => 'rol',
                'visitas' => 0
            ],
            [
                'nombre' => 'permiso',
                'visitas' => 0
            ],
            [
                'nombre' => 'almacen',
                'visitas' => 0
            ],
            [
                'nombre' => 'cliente',
                'visitas' => 0
            ],
            [
                'nombre' => 'venta',
                'visitas' => 0
            ],
            [
                'nombre' => 'producto_terminado',
                'visitas' => 0
            ],
            [
                'nombre' => 'combo',
                'visitas' => 0
            ],
            [
                'nombre' => 'unidad_medida',
                'visitas' => 0
            ],
            [
                'nombre' => 'insumo',
                'visitas' => 0
            ],
            [
                'nombre' => 'reporte_insumo',
                'visitas' => 0
            ],
            [
                'nombre' => 'reporte_venta',
                'visitas' => 0
            ],
            [
                'nombre' => 'pedido_cliente',
                'visitas' => 0
            ],
        ];
    }
}
