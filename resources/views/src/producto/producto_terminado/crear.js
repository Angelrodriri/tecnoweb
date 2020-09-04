
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import ws from '../../utils/ws';
import routes from '../../utils/routes';
import { message } from 'antd';
import { conformsTo } from 'lodash';

export default class CrearProductoTerminado extends Component {

    constructor(props) {
        super(props);
        this.state = {
            descripcion: '',
            codigo: '',
            precio: '',
            arrayinsumo: [],
            insumo: [],
            
            idinsumo: '',
            medida: '',
            nombre: '',
            cantidad: '',
            costo: '',
            stock: 0,

            redirect: false,
        }
    }

    componentDidMount() {
        axios.get(ws.producto_create).then(
            response => {
                this.setState({
                    arrayinsumo: response.data.data,
                });
            }
        ).catch(
            error => console.log(error)
        );
    }

    onChangeStock() {
        this.setState({
            stock: event.target.value,
        });
    }

    onChangeDescripcion(event) {
        this.setState({
            descripcion: event.target.value,
        });
    }

    onChangeCodigo(event) {
        this.setState({
            codigo: event.target.value,
        });
    }

    onChangePrecio(event) {
        if (!isNaN(event.target.value)) {
            this.setState({
                precio: event.target.value,
            });
        }
    }

    onChangeIdInsumo(event) {
        this.setState({
            idinsumo: event.target.value,
        });
        this.state.arrayinsumo.map(
            response => {
                if (response.id == event.target.value) {
                    this.setState({
                        medida: response.descripcion,
                        nombre: response.nombre,
                    });
                }
            }
        )
        if (event.target.value == '') {
            this.setState({
                medida: '',
                nombre: '',
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

    onChangeCosto(event) {
        if (!isNaN(event.target.value)) {
            this.setState({
                costo: event.target.value,
            });
        }
    }

    onClickRegresar() {
        this.setState({
            redirect: true,
        });
    }

    addRow() {

        if (this.state.idinsumo.toString().length > 0 && 
            this.state.cantidad.toString().length > 0 &&
            this.state.costo.toString().length > 0) {
            if (this.existeInSelect(this.state.idinsumo)) {
                message.warning('El insumo ya se encuentra seleccionado');
                return;
            }

            var objeto = {
                id: this.state.idinsumo,
                nombre: this.state.nombre,
                medida: this.state.medida,
                cantidad: this.state.cantidad,
                costo: this.state.costo,
            }
            this.state.insumo.push(objeto);
            this.setState({
                insumo: this.state.insumo,
                idinsumo: '',
                nombre: '',
                medida: '',
                cantidad: '',
                costo: '',
            });
        }

    }

    existeInSelect(id) {

        let insumos = this.state.insumo;
        for (let index = 0; index < insumos.length; index++) {
            if (insumos[index].id == id)
                return true;
        }

        return false;

    }

    deleteRow(pos) {
        this.state.insumo.splice(pos, 1);
        this.setState({
            insumo: this.state.insumo,
        });
    }

    onSubmit(event) {
        event.preventDefault();
        // if (this.state.descripcion.toString().trim().length > 0 &&
        //     this.state.codigo.toString().trim().length > 0 && 
        //     this.state.precio.toString().trim().length > 0 &&
        //     this.state.insumo.length > 0) {
        if (!this.validarParametros()) return;

        const formdata = new FormData();
        formdata.append('descripcion', this.state.descripcion);
        formdata.append('codigo', this.state.codigo);
        formdata.append('precio', this.state.precio);
        formdata.append('stock', this.state.stock);
        formdata.append('array', JSON.stringify(this.state.insumo));
        
        axios.post(ws.producto_store, formdata).then(
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
        // }else {
        //     if (this.state.descripcion.toString().trim().length == 0) {
        //         this.setState({
        //             descripcion: '',
        //         });
        //     }
        //     if (this.state.codigo.toString().trim().length == 0) {
        //         this.setState({
        //             codigo: '',
        //         });
        //     }
        //     if (this.state.precio.toString().trim().length == 0) {
        //         this.setState({
        //             precio: '',
        //         });
        //     }
        // }
    }

    validarParametros() {
        
        if (this.state.codigo.trim().length <= 2) {
            message.error('El codigo debe tener mas de 2 caracteres');
            return false;
        }

        if (this.state.descripcion.trim().length === 0) {
            message.error('El campo descripción es requerido');
            return false;
        }

        let isInvalid = isNaN(this.state.precio);
        
        if (isInvalid) {
            message.error('El precio no es válido');
        } else if (parseFloat(this.state.precio) <= 0) {
            message.error('El precio debe ser mayor que 0');
        }

        return true;
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to={routes.producto_terminado_index} />);
        }
        return (
            <div className="rows">
                <div className="cards">
                    <div className="forms-groups">
                        <div className="pulls-left">
                            <h1 className="lbls-txts">Nuevo Producto Terminado</h1>
                        </div>

                        <div className="pulls-right">
                            <Link to={routes.producto_terminado_index} className="btn btn-info">
                                Atras
                            </Link>
                        </div>

                        <div className="forms-groups">

                            <div className="cols-lg-12 cols-md-12 cols-sm-12 cols-xs-12">

                                {/* <div className="cols-lg-1 cols-md-0"></div> */}

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
                                            placeholder=' Ingresar descripcion...'
                                            value={this.state.descripcion}
                                            onChange={this.onChangeDescripcion.bind(this)}
                                            className="forms-control" />
                                        <label className="lbls-input">Descripcion</label>
                                    </div>
                                </div>

                                <div className="cols-lg-3 cols-md-4 cols-sm-6 cols-xs-12">

                                    <div className="inputs-groups">
                                        <input type="text" 
                                            placeholder=' Ingresar precio...'
                                            value={this.state.precio}
                                            onChange={this.onChangePrecio.bind(this)}
                                            className="forms-control" />
                                        <label className="lbls-input">Precio</label>
                                    </div>
                                </div>

                                <div className="cols-lg-3 cols-md-4 cols-sm-6 cols-xs-12">

                                    <div className="inputs-groups">
                                        <input
                                            type='number'
                                            placeholder=' Ingresar stock...'
                                            value={this.state.stock}
                                            onChange={this.onChangeStock.bind(this)}
                                            className="forms-control" />
                                        <label className="lbls-input">Stock</label>
                                    </div>
                                </div>

                            </div>

                            <div className="cols-lg-12 cols-md-12 cols-sm-12 cols-xs-12">
                                <label>Insumos</label>
                            </div>

                            <div className="cols-lg-12 cols-md-12 cols-sm-12 cols-xs-12">

                                <div className="cols-lg-3 cols-md-3 cols-sm-6 cols-xs-12">
                                    <div className="inputs-groups">
                                        <select className="forms-control"
                                            value={this.state.idinsumo}
                                            onChange={this.onChangeIdInsumo.bind(this)}
                                        >
                                            <option value="">Seleccionar</option>
                                            {this.state.arrayinsumo.map(
                                                (data, key) => (
                                                    <option value={data.id} key={key}>{data.nombre}</option>
                                                )
                                            )}
                                        </select>
                                        <label className="lbls-input">Insumo</label>
                                    </div>
                                </div>

                                <div className="cols-lg-2 cols-md-2 cols-sm-6 cols-xs-12">

                                    <div className="inputs-groups">
                                        <input type="text" 
                                            placeholder=' ...'
                                            value={this.state.medida}
                                            readOnly
                                            className="forms-control" />
                                        <label className="lbls-input">Medida</label>
                                    </div>
                                </div>

                                <div className="cols-lg-2 cols-md-2 cols-sm-6 cols-xs-12">

                                    <div className="inputs-groups">
                                        <input type="text" 
                                            placeholder=' cantidad...'
                                            value={this.state.cantidad}
                                            onChange={this.onChangeCantidad.bind(this)}
                                            className="forms-control" />
                                        <label className="lbls-input">Cantidad</label>
                                    </div>
                                </div>

                                <div className="cols-lg-2 cols-md-2 cols-sm-6 cols-xs-12">

                                    <div className="inputs-groups">
                                        <input type="text" 
                                            placeholder=' costo...'
                                            value={this.state.costo}
                                            onChange={this.onChangeCosto.bind(this)}
                                            className="forms-control" />
                                        <label className="lbls-input">Costo</label>
                                    </div>
                                </div>

                                <div className="cols-lg-1 cols-md-1 cols-sm-6 cols-xs-12">
                                    <a className="btn btn-sm btn-primary fa fa-plus" 
                                        onClick={this.addRow.bind(this)}
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
                                                <td>Insumo</td>
                                                <td>U. medida</td>
                                                <td>Cantidad</td>
                                                <td>Precio</td>
                                                <td>Sub Total</td>
                                                <td>Opcion</td>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {this.state.insumo.map(
                                                (data, key) => (
                                                    <tr key={key}>
                                                        <td>{key + 1}</td>
                                                        <td>{data.nombre}</td>
                                                        <td>{data.medida}</td>
                                                        <td>{data.cantidad}</td>
                                                        <td>{data.costo}</td>
                                                        <td>{data.costo*data.cantidad}</td>
                                                        <td>
                                                            <a style={{'padding': '3px'}}
                                                                onClick={this.deleteRow.bind(this, key)}
                                                                className="btn btn-sm btn-outline-danger fa fa-times">
                                                            </a>
                                                        </td>
                                                    </tr>
                                                )
                                            )}
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

