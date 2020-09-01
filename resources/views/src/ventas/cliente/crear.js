
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';

import ws from '../../utils/ws';
import routes from '../../utils/routes';

export default class CrearCliente extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nit: '',
            nombre: '',
            apellido: '',

            genero: '',
            telefono: '',
            correo: '',

            redirect: false,
        }
    }

    onChangeNit(event) {
        this.setState({
            nit: event.target.value,
        });
    }

    onChangeNombre(event) {
        this.setState({
            nombre: event.target.value,
        });
    }

    onChangeApellido(event) {
        this.setState({
            apellido: event.target.value,
        });
    }

    onChangeGenero(event) {
        this.setState({
            genero: event.target.value,
        });
    }

    onChangeCorreo(event) {
        this.setState({
            correo: event.target.value,
        });
    }

    onChangeTelefono(event) {
        if (!isNaN(event.target.value)) {
            this.setState({
                telefono: event.target.value,
            });
        }
    }

    onClickRegresar() {
        this.setState({
            redirect: true,
        });
    }

    onSubmit(event) {
        event.preventDefault();
        if (this.state.nit.toString().trim().length > 0 && 
            this.state.nombre.toString().trim().length > 0 && 
            this.state.apellido.toString().trim().length > 0 &&
            this.state.genero.toString().trim().length > 0) {

            const formdata = new FormData();
            formdata.append('nit', this.state.nit);
            formdata.append('nombre', this.state.nombre);
            formdata.append('apellido', this.state.apellido);
            formdata.append('telefono', this.state.telefono);
            formdata.append('correo', this.state.correo);
            formdata.append('genero', this.state.genero);
            
            axios.post(ws.cliente_store, formdata).then(
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
            if (this.state.nit.toString().trim().length == 0) {
                this.setState({
                    nit: '',
                });
            }
            if (this.state.nombre.toString().trim().length == 0) {
                this.setState({
                    nombre: '',
                });
            }
            if (this.state.apellido.toString().trim().length == 0) {
                this.setState({
                    apellido: '',
                });
            }
        }
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to={routes.cliente_index} />);
        }
        return (
            <div className="rows">
                <div className="cards">
                    <div className="forms-groups">
                        <div className="pulls-left">
                            <h1 className="lbls-txts">Nuevo Cliente</h1>
                        </div>

                        <div className="pulls-right">
                            <Link to={routes.cliente_index} className="btn btn-info">
                                Atras
                            </Link>
                        </div>

                        <div className="forms-groups">

                            <div className="cols-lg-12 cols-md-12 cols-sm-12 cols-xs-12">

                                <div className="cols-lg-1 cols-md-1"></div>

                                <div className="cols-lg-3 cols-md-3 cols-sm-6 cols-xs-12">

                                    <div className="inputs-groups">
                                        <input type="text" 
                                            placeholder=' Ingresar nombre...'
                                            value={this.state.nombre}
                                            onChange={this.onChangeNombre.bind(this)}
                                            className="forms-control" />
                                        <label className="lbls-input">Nombre</label>
                                    </div>
                                </div>

                                <div className="cols-lg-3 cols-md-3 cols-sm-6 cols-xs-12">

                                    <div className="inputs-groups">
                                        <input type="text" 
                                            placeholder=' Ingresar apellido...'
                                            value={this.state.apellido}
                                            onChange={this.onChangeApellido.bind(this)}
                                            className="forms-control" />
                                        <label className="lbls-input">Apellido</label>
                                    </div>
                                </div>

                                <div className="cols-lg-3 cols-md-3 cols-sm-6 cols-xs-12">

                                    <div className="inputs-groups">
                                        <input type="text" 
                                            placeholder=' Ingresar nit...'
                                            value={this.state.nit}
                                            onChange={this.onChangeNit.bind(this)}
                                            className="forms-control" />
                                        <label className="lbls-input">Nit</label>
                                    </div>
                                </div>

                            </div>

                            <div className="cols-lg-12 cols-md-12 cols-sm-12 cols-xs-12">

                                <div className="cols-lg-1 cols-md-1"></div>

                                <div className="cols-lg-3 cols-md-3 cols-sm-6 cols-xs-12">

                                    <div className="inputs-groups">
                                        <input type="text" 
                                            placeholder=' Ingresar telefono...'
                                            value={this.state.telefono}
                                            onChange={this.onChangeTelefono.bind(this)}
                                            className="forms-control" />
                                        <label className="lbls-input">Telefono</label>
                                    </div>
                                </div>

                                <div className="cols-lg-3 cols-md-3 cols-sm-6 cols-xs-12">

                                    <div className="inputs-groups">
                                        <input type="text" 
                                            placeholder=' Ingresar correo...'
                                            value={this.state.correo}
                                            onChange={this.onChangeCorreo.bind(this)}
                                            className="forms-control" />
                                        <label className="lbls-input">Correo</label>
                                    </div>
                                </div>

                                <div className="cols-lg-3 cols-md-3 cols-sm-6 cols-xs-12">

                                    <div className="inputs-groups">
                                        <select 
                                            value={this.state.genero}
                                            onChange={this.onChangeGenero.bind(this)}
                                            className="forms-control">
                                            <option value=''>Seleccionar</option>
                                            <option value='M'>Masculino</option>
                                            <option value='F'>Femenino</option>
                                        </select>
                                        <label className="lbls-input">Genero</label>
                                    </div>
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

