
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {Link, Redirect} from 'react-router-dom';
import { DatePicker, message } from 'antd';
import axios from 'axios';
import ws from '../../utils/ws';
import routes from '../../utils/routes';
import TextArea from 'antd/lib/input/TextArea';
import keysStorage from '../../utils/keysStorage';
import moment from 'moment';

export default class EditPedidoCliente extends Component {

    constructor(props) {
        super(props);
        this.state = {
            codigo: '',
            fecha: '',
            montototal: 0,
            nota: '',
            idcliente: 0,
            idproducto: 0,
            costo: 0,
            cantidad: 0,
            tipo: 'M',
            idsproductos: [],
            productosSelect: [],
            clientes: [],
            productos: [],
            redirect: false,
        }
    }

    componentDidMount() {
        this.getData(this.props.match.params.id);
    }

    getData(idpedido) {
        console.log('ID ==> ', idpedido);
        axios.get(`${ws.pedido_cliente_edit}/${idpedido}/edit`)
        .then(resp => {
            resp = resp.data;
            console.log('DATA EDIT ', resp);


            if (resp.response == 1) {
                let data = resp.data;
                let newArr = [];
                for (let index = 0; index < data.length; index++) {
                    const pro = data[index];
                    newArr.push({
                        idproducto: pro.idproducto,
                        producto: pro.descripcion,
                        cantidad: pro.cantidad,
                        costo: pro.precio,
                        tipo: pro.tipo
                    });
                }

                
                const ped = resp.pedido;
                this.setState({
                    codigo: ped.codigo,
                    fecha: ped.fecha,
                    montototal: ped.montototal,
                    idcliente: ped.idcliente,
                    nota: ped.nota == null ? '' : ped.nota,
                    productosSelect: newArr,
                    clientes: resp.clientes,
                    productos: resp.productos,
                }, () => {
                    this.calcularMontoTotal()
                });
                // this.setState({
                //     clientes: resp.clientes,
                //     productos: resp.productos,
                // });
                // 'idproducto': producto.id,
                // 'producto': producto.descripcion,
                // 'cantidad': this.state.cantidad,
                // 'costo': this.state.costo,
                // 'tipo': this.state.tipo
                // let products = resp.detalle;
            } else {
                console.log('Algo salio mal al traer los clientes');
            }
        })
        .catch(error => console.log(error));

    }

    

    onChangeAtributes(e) {
        // console.log(e.target.value);
        if (e.target.name == 'idproducto') {
            let producto = this.getProducto(e.target.value);
            this.setState({
                [e.target.name]: e.target.value,
                cantidad: 1,
                costo: producto.precio
            });
        } else if (e.target.name == 'cantidad') {
            if (this.validarStock(e.target.value)) {
                this.setState({
                    [e.target.name]: e.target.value
                });
            }
        } else {
            this.setState({
                [e.target.name]: e.target.value
            });
        }
    }

    validarStock(cantidad) {
        let producto = this.getProducto(this.state.idproducto);
        if (producto) {
            let cant = parseInt(cantidad);
            let stock = parseInt(producto.stock);
            if (cant > stock) {
                message.warning('El producto no cuenta con el stock suficiente');
                return false;
            }
        }
        return true;
    }

    existeInProductos(idproducto) {

        let prods = this.state.productosSelect;
        for (let i = 0; i < prods.length; i++) {
            if (prods[i].idproducto == idproducto)
                return true;
        }

        return false;

    }

    addProducto() {

        if (this.state.idproducto <= 0) {
            message.error('Debe seleccionar un producto');
            return;
        }
        if (this.existeInProductos(this.state.idproducto)) {
            message.warning('El producto ya se encuentra seleccionado');
            return;
        }
        if (this.state.cantidad <= 0 || isNaN(this.state.cantidad)) {
            message.error('La cantidad del producto debe ser mayor que cero');
            return;
        }
        if (this.state.costo <= 0 || isNaN(this.state.costo)) {
            message.error('El costo del producto debe ser mayor que cero');
            return;
        }
        
        let producto = this.getProducto(this.state.idproducto);

        let row = {
            'idproducto': producto.id,
            'producto': producto.descripcion,
            'cantidad': this.state.cantidad,
            'costo': this.state.costo,
            'tipo': this.state.tipo
        };
        this.state.productosSelect.push(row);
        this.setState({
            productosSelect: this.state.productosSelect,
            idproducto: 0,
            cantidad: 0,
            costo: 0,
            tipo: 'M'
        }, () => {
            this.calcularMontoTotal();
        });
    }

    getProducto(idproducto) {

        let productos = this.state.productos;
        for (let i = 0; i < productos.length; i++) {
            // console.log('PRODUCTO SEARCH ', productos[i]);
            if (productos[i].id == idproducto)
                return productos[i];
        }
        return null;

    }

    calcularMontoTotal() {

        let sum = 0;
        let { productosSelect } = this.state;
        for (let i = 0; i < productosSelect.length; i++) {
            sum += parseFloat(productosSelect[i].cantidad) * parseFloat(productosSelect[i].costo);
        }

        this.setState({
            montototal: sum
        });

    }

    editarPedido() {
        
        if (!this.validarParametros()) return;

        const body = {
            // codigo: this.state.codigo,
            fecha: this.state.fecha,
            montototal: this.state.montototal,
            // idcliente: this.state.idcliente,
            nota: this.state.nota,
            productos: this.state.productosSelect,
            // iduser: localStorage.getItem(keysStorage.USER_ID)
        };  
        axios.put(`${ws.pedido_cliente_update}/${this.props.match.params.id}`, body)
        .then(resp => {
            resp = resp.data;
            console.log('RESPONSE STORE ', resp);
            if (resp.response == 1) {
                this.setState({
                    redirect: true
                });
            }
        })
        .catch(error => console.log(error));
    }

    validarParametros() {

        if (this.state.codigo.trim().length <= 2) {
            message.error('El código debe tener mas de 2 caracteres');
           return false;
        }

        if (this.state.fecha.length <= 0) {
            message.error('El campo de la fecha es requerido');
            return false;
        }

        if (this.state.montototal <= 0) {
            message.error('El monto total debe ser mayor que cero');
            return false;
        }

        if (this.state.idcliente <= 0) {
            message.error('Debe seleccionar un cliente');
            return false;
        }

        if (this.state.productosSelect.length === 0) {
            message.error('El pedido debe tener al menos un producto');
            return false;
        }
        
        return true;
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to={routes.pedido_cliente_index} />);
        }
        return (
            <div className="rows">
                <div className="cards">
                    <div className="forms-groups">
                        <div className="pulls-left">
                            <h1 className="lbls-txts">Nuevo Pedido Cliente</h1>
                        </div>

                        <div className="pulls-right">
                            <Link to={routes.pedido_cliente_index} className="btn btn-info">
                                Atras
                            </Link>
                        </div>

                        <div className="forms-groups">

                            <div className="cols-lg-12 cols-md-12 cols-sm-12 cols-xs-12">

                                <div className="cols-lg-1 cols-md-0"></div>

                                <div className="cols-lg-3 cols-md-4 cols-sm-6 cols-xs-12">

                                    <div className="inputs-groups">
                                        <input type="text"
                                            name='codigo'
                                            placeholder=' Ingresar codigo...'
                                            value={this.state.codigo}
                                            // onChange={this.onChangeAtributes.bind(this)}
                                            readOnly
                                            className="forms-control" />
                                        <label className="lbls-input">Codigo</label>
                                    </div>
                                </div>

                                <div className="cols-lg-3 cols-md-4 cols-sm-6 cols-xs-12">

                                    <div className="inputs-groups">
                                        <DatePicker
                                            disabled={true}
                                            value={moment(this.state.fecha, 'YYYY-MM-DD')}
                                            // onChange={(date, dateString) => {
                                            //     this.setState({
                                            //         fecha: dateString
                                            //     });
                                            // }} 
                                        />
                                        {/* <input type="text" 
                                            placeholder=' Ingresar descripcion...'
                                            name='fecha'
                                            value={this.state.fecha}
                                            onChange={this.onChangeAtributes.bind(this)}
                                            className="forms-control" />
                                        <label className="lbls-input">Fecha</label> */}
                                    </div>
                                </div>

                                <div className="cols-lg-3 cols-md-4 cols-sm-6 cols-xs-12">

                                    <div className="inputs-groups">
                                        <input type="text" 
                                            placeholder=' Ingresar precio...'
                                            name='montototal'
                                            value={this.state.montototal}
                                            type='number'
                                            readOnly
                                            // onChange={this.onChangeAtributes.bind(this)}
                                            className="forms-control" />
                                        <label className="lbls-input">Monto Total</label>
                                    </div>
                                </div>

                                
                                <div className="cols-lg-3 cols-md-0"></div>
                                {/* <div className="cols-lg-1 cols-md-0"></div> */}

                                <div className="cols-lg-3 cols-md-3 cols-sm-6 cols-xs-12">
                                    <div className="inputs-groups">
                                        <select className="forms-control"
                                            name='idcliente'
                                            readOnly
                                            value={this.state.idcliente}
                                            // onChange={this.onChangeAtributes.bind(this)}
                                        >
                                            <option value="">Seleccionar</option>
                                            {this.state.clientes.map(
                                                (data, key) => (
                                                    <option value={data.id} key={key}>{data.nombre + data.apellido}</option>
                                                )
                                            )}
                                        </select>
                                        <label className="lbls-input">Cliente</label>
                                    </div>
                                </div>

                                <div className="cols-lg-4 cols-md-4 cols-sm-6 cols-xs-12">
                                    <div className="inputs-groups">
                                        <TextArea
                                            name='nota'
                                            value={this.state.nota}
                                            onChange={this.onChangeAtributes.bind(this)}
                                        />
                                        <label className="lbls-input">Nota</label>
                                    </div>
                                </div>
                                
                            </div>

                            <div className="cols-lg-12 cols-md-12 cols-sm-12 cols-xs-12">
                                <label>Productos</label>
                            </div>

                            <div className="cols-lg-12 cols-md-12 cols-sm-12 cols-xs-12">

                                <div className="cols-lg-3 cols-md-3 cols-sm-6 cols-xs-12">
                                    <div className="inputs-groups">
                                        <select className="forms-control"
                                            name='idproducto'
                                            value={this.state.idproducto}
                                            onChange={this.onChangeAtributes.bind(this)}
                                        >
                                            <option value={0}>Seleccionar</option>
                                            {this.state.productos.map(
                                                (data, key) => (
                                                    <option value={data.id} key={key}>{data.descripcion}</option>
                                                )
                                            )}
                                        </select>
                                        <label className="lbls-input">Producto</label>
                                    </div>
                                </div>

                                <div className="cols-lg-2 cols-md-3 cols-sm-6 cols-xs-12">

                                    <div className="inputs-groups">
                                        <input type="text" 
                                            placeholder=' cantidad...'
                                            name='cantidad'
                                            type='number'
                                            value={this.state.cantidad}
                                            onChange={this.onChangeAtributes.bind(this)}
                                            className="forms-control" />
                                        <label className="lbls-input">Cantidad</label>
                                    </div>
                                </div>

                                <div className="cols-lg-2 cols-md-3 cols-sm-6 cols-xs-12">
                                    <div className="inputs-groups">
                                        <input type="text" 
                                            placeholder=' costo...'
                                            name='costo'
                                            value={this.state.costo}
                                            onChange={this.onChangeAtributes.bind(this)}
                                            // readOnly
                                            className="forms-control" />
                                        <label className="lbls-input">Costo</label>
                                    </div>
                                </div>

                                <div className="cols-lg-3 cols-md-3 cols-sm-6 cols-xs-12">
                                <div className="inputs-groups">
                                        <select className="forms-control"
                                            name='tipo'
                                            value={this.state.tipo}
                                            onChange={this.onChangeAtributes.bind(this)}
                                        >
                                            <option value='M'>Mesa</option>
                                            <option value='L'>Llevar</option>
                                        </select>
                                        <label className="lbls-input">Producto</label>
                                    </div>
                                </div>

                                <div className="cols-lg-1 cols-md-1 cols-sm-6 cols-xs-12">
                                    <a className="btn btn-sm btn-primary fa fa-plus" 
                                        onClick={this.addProducto.bind(this)}
                                        style={{'marginTop': '7px'}}>
                                        
                                    </a>
                                </div>
                            </div>

                            <div className="cols-lg-12 cols-md-12 cols-sm-12 cols-xs-12">

                                <div className="tabless">

                                    <table className="tables-respons">

                                        <thead>
                                            <tr>
                                                <td>Nro</td>
                                                <td>Producto</td>
                                                <td>Cantidad</td>
                                                <td>Costo</td>
                                                <td>Tipo</td>
                                                <td>Total</td>
                                                <td>Opcion</td>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {this.state.productosSelect.map(
                                                (data, key) => (
                                                    <tr key={key}>
                                                        <td>{key + 1}</td>
                                                        <td>{data.producto}</td>
                                                        <td>{data.cantidad}</td>
                                                        <td>{data.tipo == 'L' ? 'Llevar' : 'Mesa'}</td>
                                                        <td>{data.costo}</td>
                                                        <td>{data.costo * data.cantidad}</td>
                                                        <td>
                                                            <a style={{'padding': '3px'}}
                                                                // onClick={this.deleteRow.bind(this, key)}
                                                                className="btn btn-sm btn-outline-danger fa fa-times">
                                                            </a>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                            <tr>
                                                <td colSpan='4'>Total:</td>
                                                <td>{this.state.total}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="cols-lg-12 cols-md-12 cols-sm-12 cols-xs-12">

                                <div className="txts-center">

                                    <button type='button' 
                                        onClick={() => {
                                            this.setState({
                                                redirect: true
                                            });
                                        }}
                                        className="btn btn-outline-danger mr-4">
                                        Cancelar
                                    </button>

                                    <button 
                                        type='button' 
                                        onClick={this.editarPedido.bind(this)}
                                        className='btn btn-outline-success'>
                                        Aceptar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

