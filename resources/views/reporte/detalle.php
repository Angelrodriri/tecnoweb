
<html>
        <style>
            * {
                box-sizing: border-box;
            }
            .table-report {
                width: 100%;
                border-collapse: collapse;
                border-spacing: 0;
            }
            .table-report thead {
                width: 100%;
                background: #fff;
            }
            .table-report thead tr th,
            .table-report thead tr td {
                padding: 8px;
                padding-left: 12px;
                font: bold 13px Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
                cursor: pointer;
            }
            .table-report tbody {
                width: 100%;
            }
            .table-report tbody tr th,
            .table-report tbody tr td {
                padding-top: 5px;
                padding-right: 3px;
                padding-bottom: 5px;
                font: 300 12px Roboto,RobotoDraft,Helvetica,Arial,sans-serif;
            }
        </style>

<div style="width: 100%; border-bottom: 1px solid #e8e8e8; height: 30px;">
    <div style="float: right;">
        <label style="font-size: 18px;"><?= $fecha ?></label>
    </div>
</div>

<div style="width: 100%; display: flex; justify-content: center; 
        align-items: center;">
    <h1 style="font-weight: 100; font-size: 30px; text-align: center;">
        Factura
    </h1>
</div>

<div style="width: 100%; padding-bottom: 8px;">
    <table style="width: 100%; border-color: #666666; border-style: dashed; border-width: 1px; padding-top: 5px;">
        
        <thead>
        
            <tr>
                <th > Id</th>

                <th > Codigo</th>

                <th > Cliente</th>

                <th > Cantidad total</th>

                <th > Total </th>

                <th > Registro </th>
                
            </tr>
        </thead>

        <tbody>
            <?php foreach ($data as $p) { ?>
                <tr>

                    <td ><?= $p->id ?></td>

                    <td ><?= $p->codigo ?></td>

                    <td ><?= $p->nombre.' '.$p->apellido ?></td>

                    <td ><?= $p->cantidadtotal ?></td>

                    <td ><?= $p->total ?></td>

                    <td ><?= $p->created_at ?></td>

                </tr>
                
            <?php } ?>
            
        </tbody>
            
    </table>
</div>

<div style="width: 100%; display: flex; justify-content: center; 
        align-items: center;">
    <h1 style="font-weight: 100; font-size: 30px; text-align: center;">
        Productos
    </h1>
</div>

<div style="width: 100%; padding-bottom: 8px;">
    <table style="width: 100%; border-color: #666666; border-style: dashed; border-width: 1px; padding-top: 5px;">
        
        <thead>
        
            <tr>
                <th > Producto</th>

                <th > Combo </th>

                <th> Concepto</th>

                <th > Cantidad</th>

                <th > Precio</th>

                <th > SubTotal</th>
                
            </tr>
        </thead>

        <tbody>
            <?php foreach ($detalle as $p) { ?>
                <tr>

                    <td ><?= $p->producto ?></td>

                    <td ><?= $p->promocion ?></td>

                    <td ><?= $p->concepto ?></td>

                    <td ><?= $p->cantidad ?></td>

                    <td ><?= $p->precio ?></td>

                    <td ><?= $p->cantidad*$p->precio ?></td>

                </tr>
                
            <?php } ?>
            
        </tbody>
            
    </table>
</div>


</html>