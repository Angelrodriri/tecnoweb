
<html>

<div style="width: 100%; border-bottom: 1px solid #e8e8e8; height: 30px;">
    <div style="float: right;">
        <label style="font-size: 18px;"><?= $fecha ?></label>
    </div>
</div>

<div style="width: 100%; display: flex; justify-content: center; 
        align-items: center;">
    <h1 style="font-weight: 100; font-size: 30px; text-align: center;">
        Reporte Venta
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

</html>