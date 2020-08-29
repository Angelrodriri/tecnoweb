
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import ws from '../../utils/ws';

export default class CrearCombo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            descripcion: '',
            codigo: '',
            precio: '',
            arrayproducto: [],
            insumo: [],
            
            idinsumo: '',
            nombre: '',
            cantidad: '',
            costo: '',
            total: 0,

            redirect: false,
        }
    }

    componentDidMount() {
        axios.get(ws.combo_create).then(
            response => {
                this.setState({
                    arrayproducto: response.data.data,
                });
            }
        ).catch(
            error => console.log(error)
        );
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
        this.state.arrayproducto.map(
            response => {
                if (response.id == event.target.value) {
                    this.setState({
                        nombre: response.descripcion,
                        costo: response.precio,
                    });
                }
            }
        )
        if (event.target.value == '') {
            this.setState({
                nombre: '',
                costo: '',
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

    onClickRegresar() {
        this.setState({
            redirect: true,
        });
    }

    addRow() {
        if (this.state.idinsumo.toString().length > 0 && 
            this.state.cantidad.toString().length > 0 &&
            this.state.costo.toString().length > 0) {
            var objeto = {
                id: this.state.idinsumo,
                nombre: this.state.nombre,
                cantidad: this.state.cantidad,
                costo: this.state.costo,
            }
            this.state.total = this.state.total + (this.state.cantidad*this.state.costo);
            this.state.insumo.push(objeto);
            this.setState({
                insumo: this.state.insumo,
                idinsumo: '',
                nombre: '',
                cantidad: '',
                costo: '',
                total: this.state.total,
            });
        }
    }

    deleteRow(pos) {
        this.state.total = this.state.total - (this.state.insumo[pos].cantidad*this.state.insumo[pos].costo);
        this.state.insumo.splice(pos, 1);
        this.setState({
            insumo: this.state.insumo,
            total: this.state.total,
        });
    }

    onSubmit(event) {
        event.preventDefault();
        if (this.state.descripcion.toString().trim().length > 0 &&
            this.state.codigo.toString().trim().length > 0 && 
            this.state.precio.toString().trim().length > 0 &&
            this.state.insumo.length > 0) {

            const formdata = new FormData();
            formdata.append('descripcion', this.state.descripcion);
            formdata.append('codigo', this.state.codigo);
            formdata.append('precio', this.state.precio);
            formdata.append('array', JSON.stringify(this.state.insumo));
            
            axios.post(ws.combo_store, formdata).then(
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
            if (this.state.descripcion.toString().trim().length == 0) {
                this.setState({
                    descripcion: '',
                });
            }
            if (this.state.codigo.toString().trim().length == 0) {
                this.setState({
                    codigo: '',
                });
            }
            if (this.state.precio.toString().trim().length == 0) {
                this.setState({
                    precio: '',
                });
            }
        }
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to='/combo/index' />);
        }
        return (
            <div className="rows">
                <div className="cards">
                    <div className="forms-groups">
                        <div className="pulls-left">
                            <h1 className="lbls-txts">Nuevo Combo</h1>
                        </div>

                        <div className="pulls-right">
                            <Link to="/combo/index" className="btn btn-info">
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

                            </div>

                            <div className="cols-lg-12 cols-md-12 cols-sm-12 cols-xs-12">
                                <label>Insumos</label>
                            </div>

                            <div className="cols-lg-12 cols-md-12 cols-sm-12 cols-xs-12">

                                <div className="cols-lg-1 cols-md-1"></div>

                                <div className="cols-lg-3 cols-md-3 cols-sm-6 cols-xs-12">
                                    <div className="inputs-groups">
                                        <select className="forms-control"
                                            value={this.state.idinsumo}
                                            onChange={this.onChangeIdInsumo.bind(this)}
                                        >
                                            <option value="">Seleccionar</option>
                                            {this.state.arrayproducto.map(
                                                (data, key) => (
                                                    <option value={data.id} key={key}>{data.descripcion}</option>
                                                )
                                            )}
                                        </select>
                                        <label className="lbls-input">Producto</label>
                                    </div>
                                </div>

                                <div className="cols-lg-3 cols-md-3 cols-sm-6 cols-xs-12">

                                    <div className="inputs-groups">
                                        <input type="text" 
                                            placeholder=' cantidad...'
                                            value={this.state.cantidad}
                                            onChange={this.onChangeCantidad.bind(this)}
                                            className="forms-control" />
                                        <label className="lbls-input">Cantidad</label>
                                    </div>
                                </div>

                                <div className="cols-lg-3 cols-md-3 cols-sm-6 cols-xs-12">

                                    <div className="inputs-groups">
                                        <input type="text" 
                                            placeholder=' costo...'
                                            value={this.state.costo}
                                            readOnly
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

