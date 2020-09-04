
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import ws from '../../utils/ws';
import routes from '../../utils/routes';
import { message } from 'antd';

export default class CrearUsuario extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            apellido: '',

            idrol: '',
            usuario: '',
            password: '',
            arraygrupo: [],
            redirect: false,
        }
    }

    componentDidMount() {
        axios.get(ws.usuario_create).then(
            response => {
                this.setState({
                    arraygrupo: response.data.data,
                });
            }
        ).catch(
            error => console.log(error)
        );
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

    onChangeUsuario(event) {
        this.setState({
            usuario: event.target.value,
        });
    }
    
    onChangePassword(event) {
        this.setState({
            password: event.target.value,
        });
    }

    onChangeIdRol(event) {
        this.setState({
            idrol: event.target.value,
        });
    }

    onClickRegresar() {
        this.setState({
            redirect: true,
        });
    }

    validarParams() {

        if (this.state.nombre.trim().length === 0) {
            message.error('El nombre es requerido');
            return false;
        }

        if (this.state.apellido.trim().length === 0) {
            message.error('El apellido es requerido');
            return false;
        }

        if (this.state.usuario.trim().length === 0 || this.state.usuario.length < 3) {
            message.error('El usuario es requerido y debe tener como mínimo 3 caracteres distinto de espacio');
            return false;
        }

        if (this.state.password.length < 4 || this.state.password.length > 16) {
            message.error('La contraseña debe tener como mínimo 4 caracteres y como máximo 16 caracteres');
            return false;
        }

        if (this.state.idrol == '') {
            message.error('Debe seleccionar un rol para el usuario');
            return false;
        }

        return true;

    }

    onSubmit(event) {
        event.preventDefault();

        if (!this.validarParams()) return;
        // if (this.state.nombre.toString().trim().length > 0 && 
        //     this.state.apellido.toString().trim().length > 0 &&
        //     this.state.usuario.toString().trim().length > 0 && 
        //     this.state.password.toString().trim().length> 0) {

        let body = {
            nombre: this.state.nombre,
            apellido: this.state.apellido,
            usuario: this.state.usuario,
            password: this.state.password,
            idrol: this.state.idrol,
        };
        console.log('BODY => ', body);
            // const formdata = new FormData();
            // formdata.append('nombre', this.state.nombre);
            // formdata.append('apellido', this.state.apellido);
            // formdata.append('usuario', this.state.usuario);
            // formdata.append('password', this.state.password);
            // formdata.append('idrol', this.state.idrol);
            // return;
        axios.post(ws.usuario_store, body).then(
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
        //     if (this.state.nombre.toString().trim().length == 0) {
        //         this.setState({
        //             nombre: '',
        //         });
        //     }
        //     if (this.state.apellido.toString().trim().length == 0) {
        //         this.setState({
        //             apellido: '',
        //         });
        //     }
        //     if (this.state.usuario.toString().trim().length == 0) {
        //         this.setState({
        //             usuario: '',
        //         });
        //     }
        //     if (this.state.password.toString().trim().length == 0) {
        //         this.setState({
        //             password: '',
        //         });
        //     }
        // }
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to={routes.usuario_index} />);
        }
        return (
            <div className="rows">
                <div className="cards">
                    <div className="forms-groups">
                        <div className="pulls-left">
                            <h1 className="lbls-txts">Nuevo Usuario</h1>
                        </div>

                        <div className="pulls-right">
                            <Link to={routes.usuario_index} className="btn btn-info">
                                Atras
                            </Link>
                        </div>

                        <div className="forms-groups">

                            <div className="cols-lg-12 cols-md-12 cols-sm-12 cols-xs-12">

                                <div className="cols-lg-3 cols-md-2"></div>

                                <div className="cols-lg-3 cols-md-4 cols-sm-6 cols-xs-12">

                                    <div className="inputs-groups">
                                        <input type="text" 
                                            placeholder=' Ingresar nombre...'
                                            value={this.state.nombre}
                                            onChange={this.onChangeNombre.bind(this)}
                                            className="forms-control" />
                                        <label className="lbls-input">Nombre</label>
                                    </div>
                                </div>

                                <div className="cols-lg-3 cols-md-4 cols-sm-6 cols-xs-12">

                                    <div className="inputs-groups">
                                        <input type="text" 
                                            placeholder=' Ingresar apellido...'
                                            value={this.state.apellido}
                                            onChange={this.onChangeApellido.bind(this)}
                                            className="forms-control" />
                                        <label className="lbls-input">Apellido</label>
                                    </div>
                                </div>

                            </div>

                            <div className="cols-lg-12 cols-md-12 cols-sm-12 cols-xs-12">

                                <div className="cols-lg-1 cols-md-1"></div>

                                <div className="cols-lg-3 cols-md-3 cols-sm-6 cols-xs-12">

                                    <div className="inputs-groups">
                                        <input type="text" 
                                            placeholder=' Ingresar usuario...'
                                            value={this.state.usuario}
                                            onChange={this.onChangeUsuario.bind(this)}
                                            className="forms-control" />
                                        <label className="lbls-input">Usuario</label>
                                    </div>
                                </div>

                                <div className="cols-lg-3 cols-md-3 cols-sm-6 cols-xs-12">

                                    <div className="inputs-groups">
                                        <input type="password" 
                                            placeholder=' Ingresar password...'
                                            value={this.state.password}
                                            onChange={this.onChangePassword.bind(this)}
                                            className="forms-control" />
                                        <label className="lbls-input">Password</label>
                                    </div>
                                </div>

                                <div className="cols-lg-3 cols-md-3 cols-sm-6 cols-xs-12">

                                    <div className="inputs-groups">
                                        <select 
                                            value={this.state.idrol}
                                            onChange={this.onChangeIdRol.bind(this)}
                                            className="forms-control">
                                            <option value=''>Seleccionar</option>
                                            {this.state.arraygrupo.map(
                                                (data, key) => (
                                                    <option value={data.id} key={key}>{data.descripcion}</option>
                                                )
                                            )}
                                        </select>
                                        <label className="lbls-input">Rol</label>
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

