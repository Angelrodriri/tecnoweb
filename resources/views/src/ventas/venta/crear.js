
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';

export default class CrearVenta extends Component {

    constructor(props) {
        super(props);
        this.state = {

            codigo: '',
            tipo: '',
            idcliente: '',

            idproducto: '',
            idcombo: '',

            descripcion: '',
            cod: '',
            precio: '',
            cantidad: '',
            concepto: '',

            array: [],
            total: 0,
            cantidadtotal: 0,

            arraycliente: [],
            arrayproducto: [],
            arraycombo: [],

            redirect: false,
        }
    }

    componentDidMount() {
        axios.get('/api/venta/create').then(
            response => {
                this.setState({
                    arraycliente: response.data.data,
                    arrayproducto: response.data.producto,
                    arraycombo: response.data.combo,
                });
            }
        ).catch(
            error => console.log(error)
        );
    }

    onChangeCodigo(event) {
        this.setState({
            codigo: event.target.value,
        });
    }

    onChangeTipo(event) {
        this.setState({
            tipo: event.target.value,
        });
    }

    onChangeIdCliente(event) {
        this.setState({
            idcliente: event.target.value,
        });
    }

    onChangeIdProducto(event) {
        this.setState({
            idproducto: event.target.value,
        });
        this.state.arrayproducto.map(
            data => {
                if (data.id == event.target.value) {
                    this.setState({
                        cod: data.codigo,
                        descripcion: data.descripcion,
                        precio: data.precio,
                    });
                }
            }
        )
        if (event.target.value == '') {
            this.setState({
                cod: '',
                descripcion: '',
                precio: '',
            });
        }
    }

    onChangeIdCombo(event) {
        this.setState({
            idcombo: event.target.value,
        });
        this.state.arraycombo.map(
            data => {
                if (data.id == event.target.value) {
                    this.setState({
                        cod: data.codigo,
                        descripcion: data.descripcion,
                        precio: data.precio,
                    });
                }
            }
        )
        if (event.target.value == '') {
            this.setState({
                cod: '',
                descripcion: '',
                precio: '',
            });
        }
    }

    onChangeCantidad(event) {
        if (!isNaN(event.target.value)) {
            this.setState({
                cantidad: event.target.value,
            });
        }
    }

    onChangeIdConcepto(event) {
        this.setState({
            concepto: event.target.value,
        });
    }

    onClickRegresar() {
        this.setState({
            redirect: true,
        });
    }

    onSubmit(event) {
        event.preventDefault();
        if (this.state.codigo.toString().trim().length > 0 && 
            this.state.idcliente.toString().trim().length > 0) {

            const formdata = new FormData();
            formdata.append('codigo', this.state.codigo);
            formdata.append('tipo', this.state.tipo);
            formdata.append('idcliente', this.state.idcliente);
            formdata.append('total', this.state.total);
            formdata.append('cantidadtotal', this.state.cantidadtotal);

            formdata.append('array', JSON.stringify(this.state.array));
            
            axios.post('/api/venta/store', formdata).then(
                response => {
                    if (response.data.response == 1) {
                        this.setState({
                            redirect: true,
                        });
                    }
                }
            ).catch(
                error => console.log(error)
            );
        }else {
            if (this.state.codigo.toString().trim().length == 0) {
                this.setState({
                    codigo: '',
                });
            }
        }
    }

    addRow() {
        if (this.state.cantidad.toString().length > 0 &&
            (this.state.idcombo.toString().length > 0 || 
            this.state.idproducto.toString().length > 0)) {
            var objeto = {
                id: (this.state.idcombo == '')?this.state.idproducto:this.state.idcombo,
                descripcion: this.state.descripcion,
                precio: this.state.precio,
                cantidad: this.state.cantidad,
                concepto: this.state.concepto,
                estado: (this.state.idcombo == '')?'P':'C',
            }
            this.state.array.push(objeto);
            this.state.total = this.state.total + (this.state.cantidad*this.state.precio);
            this.state.cantidadtotal = this.state.cantidadtotal + this.state.cantidad*1;
            this.setState({
                array: this.state.array,
                idcombo: '',
                idproducto: '',
                precio: '',
                cantidad: '',
                concepto: '',
                cod: '',
                descripcion: '',
                total: this.state.total,
                cantidadtotal: this.state.cantidadtotal,
            });
        }
    }

    deleteRow(pos) {
        this.state.total = this.state.total - (this.state.array[pos].cantidad*this.state.array[pos].precio);
        this.state.cantidadtotal = this.state.cantidadtotal - this.state.array[pos].cantidad*1;
        this.state.array.splice(pos, 1);
        this.setState({
            array: this.state.array,
            total: this.state.total,
            cantidadtotal: this.state.cantidadtotal,
        });
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to='/venta/index' />);
        }
        return (
            <div className="rows">
                <div className="cards">
                    <div className="forms-groups">
                        <div className="pulls-left">
                            <h1 className="lbls-txts">Nueva Venta</h1>
                        </div>

                        <div className="pulls-right">
                            <Link to="/venta/index" className="btn btn-info">
                                Atras
                            </Link>
                        </div>

                        <div className="forms-groups">

                            <div className="cols-lg-12 cols-md-12 cols-sm-12 cols-xs-12">

                                <div className="cols-lg-1 cols-md-0"></div>

                                <div className="cols-lg-3 cols-md-4 cols-sm-6 cols-xs-12">

                                    <div className="inputs-groups">
                                        <input type="text" 
                                            placeholder=' Ingresar codigo...'
                                            value={this.state.codigo}
                                            onChange={this.onChangeCodigo.bind(this)}
                                            className="forms-control" />
                                        <label className="lbls-input">Codigo</label>
                                    </div>
                                </div>

                                <div className="cols-lg-3 cols-md-4 cols-sm-6 cols-xs-12">

                                    <div className="inputs-groups">
                                        <input type="text" 
                                            placeholder=' Ingresar tipo...'
                                            value={this.state.tipo}
                                            onChange={this.onChangeTipo.bind(this)}
                                            className="forms-control" />
                                        <label className="lbls-input">Tipo</label>
                                    </div>
                                </div>

                                <div className="cols-lg-3 cols-md-4 cols-sm-6 cols-xs-12">

                                    <div className="inputs-groups">
                                        <select 
                                            value={this.state.idcliente}
                                            onChange={this.onChangeIdCliente.bind(this)}
                                            className="forms-control" >
                                            <option value="">Seleccionar</option>
                                            {this.state.arraycliente.map(
                                                (data, key) => (
                                                    <option value={data.id} key={key}>{data.nombre + ' ' + data.apellido}</option>
                                                )
                                            )}
                                        </select>
                                        <label className="lbls-input">Cliente</label>
                                    </div>
                                </div>

                            </div>

                            <div className="cols-lg-12 cols-md-12 cols-sm-12 cols-xs-12">
                                <label>Productos Ofertados</label>
                            </div>

                            <div className="cols-lg-12 cols-md-12 cols-sm-12 cols-xs-12">

                                <div className="cols-lg-6 cols-md-6 cols-sm-12 cols-xs-12">
                                    <div className="cols-lg-3 cols-md-3"></div>
                                    <div className="cols-lg-8 cols-md-8 cols-sm-12 cols-xs-12">
                                        <div className="inputs-groups">
                                            <select className="forms-control"
                                                value={this.state.idproducto}
                                                onChange={this.onChangeIdProducto.bind(this)}
                                            >
                                                <option value=''>Seleccionar</option>
                                                {this.state.arrayproducto.map(
                                                    (data, key) => (
                                                        <option key={key} value={data.id}>{data.descripcion}</option>
                                                    )
                                                )}
                                            </select>
                                            <label className="lbls-input">Producto Normal</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="cols-lg-6 cols-md-6 cols-sm-12 cols-xs-12">
                                    <div className="cols-lg-8 cols-md-8 cols-sm-12 cols-xs-12">
                                        <div className="inputs-groups">
                                            <select className="forms-control"
                                                value={this.state.idcombo}
                                                onChange={this.onChangeIdCombo.bind(this)}
                                            >
                                                <option value=''>Seleccionar</option>
                                                {this.state.arraycombo.map(
                                                    (data, key) => (
                                                        <option key={key} value={data.id}>{data.descripcion}</option>
                                                    )
                                                )}
                                            </select>
                                            <label className="lbls-input">Producto Combo</label>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="cols-lg-12 cols-md-12 cols-sm-12 cols-xs-12">
                                <label>Detalle del producto</label>
                            </div>

                            <div className="cols-lg-12 cols-md-12 cols-sm-12 cols-xs-12" style={{'position': 'relative'}}>

                                <div className="cols-lg-2 cols-md-2 cols-sm-12 cols-xs-12">
                                    <div className="inputs-groups">
                                        <input className="forms-control"
                                            type='text' readOnly
                                            value={this.state.cod}
                                        />
                                        <label className="lbls-input">Codigo</label>
                                    </div>
                                </div>
                                <div className="cols-lg-3 cols-md-3 cols-sm-12 cols-xs-12">
                                    <div className="inputs-groups">
                                        <input className="forms-control"
                                            type='text' readOnly
                                            value={this.state.descripcion}
                                            placeholder='producto...'
                                        />
                                        <label className="lbls-input">Producto</label>
                                    </div>
                                </div>
                                <div className="cols-lg-2 cols-md-2 cols-sm-12 cols-xs-12">
                                    <div className="inputs-groups">
                                        <input className="forms-control"
                                            type='text' readOnly placeholder='precio...'
                                            value={this.state.precio}
                                        />
                                        <label className="lbls-input">Precio</label>
                                    </div>
                                </div>

                                <div className="cols-lg-2 cols-md-2 cols-sm-12 cols-xs-12">
                                    <div className="inputs-groups">
                                        <input className="forms-control"
                                            type='text' placeholder='cantidad...'
                                            value={this.state.cantidad}
                                            onChange={this.onChangeCantidad.bind(this)}
                                        />
                                        <label className="lbls-input">Cantidad</label>
                                    </div>
                                </div>

                                <div className="cols-lg-3 cols-md-3 cols-sm-12 cols-xs-12">
                                    <div className="inputs-groups">
                                        <input className="forms-control"
                                            type='text' 
                                            value={this.state.concepto}
                                            placeholder='concepto...'
                                            onChange={this.onChangeIdConcepto.bind(this)}
                                        />
                                        <label className="lbls-input">Concepto</label>
                                    </div>
                                </div>

                                <a className='btn btn-sm btn-primary fa fa-plus'
                                    onClick={this.addRow.bind(this)}
                                    style={{'position': 'absolute', 'top': '15px', 'right': '5px'}}></a>

                            </div>

                            <div className="cols-lg-12 cols-md-12 cols-sm-12 cols-xs-12">
                                <div className="tabless">
                                    <table className="tables-respons">
                                        <thead>
                                            <tr>
                                                <td>Nro</td>
                                                <td>Producto</td>
                                                <td>Concepto</td>
                                                <td>Precio</td>
                                                <td>Cantidad</td>
                                                <td>Sub Total</td>
                                                <td>Opcion</td>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {this.state.array.map(
                                                (data, key) => (
                                                    <tr key={key}>
                                                        <td>{key + 1}</td>
                                                        <td>{data.descripcion}</td>
                                                        <td>{data.concepto}</td>
                                                        <td>{data.precio}</td>
                                                        <td>{data.cantidad}</td>
                                                        <td>{data.precio*data.cantidad}</td>
                                                        <td>
                                                            <a style={{'padding': '3px'}}
                                                                onClick={this.deleteRow.bind(this, key)}
                                                                className="btn btn-sm btn-outline-danger fa fa-times">
                                                            </a>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
                                            <tr>
                                                <td colSpan='5'>Total:</td>
                                                <td>{this.state.total}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="cols-lg-12 cols-md-12 cols-sm-12 cols-xs-12">

                                <div className="txts-center">

                                    <button type='button' 
                                        onClick={this.onClickRegresar.bind(this)}
                                        className="btn btn-outline-danger mr-4">
                                        Cancelar
                                    </button>

                                    <button type='button' onClick={this.onSubmit.bind(this)}
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

