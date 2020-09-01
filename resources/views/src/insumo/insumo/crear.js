
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import ws from '../../utils/ws';
import routes from '../../utils/routes';

export default class CrearInsumo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre: '',
            tipo: '',
            idunidadmedida: '',
            arrayunidadmedida: [],
            redirect: false,
        }
    }

    componentDidMount() {
        axios.get( ws.insumo_create).then(
            response => {
                this.setState({
                    arrayunidadmedida: response.data.data,
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

    onChangeTipo(event) {
        this.setState({
            tipo: event.target.value,
        });
    }

    onChangeIdUnidadMedida(event) {
        this.setState({
            idunidadmedida: event.target.value,
        });
    }

    onClickRegresar() {
        this.setState({
            redirect: true,
        });
    }

    onSubmit(event) {
        event.preventDefault();
        if (this.state.nombre.toString().trim().length > 0 && 
            this.state.tipo.toString().trim().length > 0 && 
            this.state.idunidadmedida.toString().length > 0) {

            const formdata = new FormData();
            formdata.append('nombre', this.state.nombre);
            formdata.append('tipo', this.state.tipo);
            formdata.append('idunidadmedida', this.state.idunidadmedida);
            
            axios.post(ws.insumo_store, formdata).then(
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
            if (this.state.nombre.toString().trim().length == 0) {
                this.setState({
                    nombre: '',
                });
            }
            if (this.state.tipo.toString().trim().length == 0) {
                this.setState({
                    tipo: '',
                });
            }
        }
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to={routes.insumo_index} />);
        }
        return (
            <div className="rows">
                <div className="cards">
                    <div className="forms-groups">
                        <div className="pulls-left">
                            <h1 className="lbls-txts">Nuevo Insumo</h1>
                        </div>

                        <div className="pulls-right">
                            <Link to={routes.insumo_index} className="btn btn-info">
                                Atras
                            </Link>
                        </div>

                        <div className="forms-groups">

                            <div className="cols-lg-12 cols-md-12 cols-sm-12 cols-xs-12">

                                <div className="cols-lg-2 cols-md-2"></div>

                                <div className="cols-lg-3 cols-md-3 cols-sm-6 cols-xs-12">

                                    <div className="inputs-groups">
                                        <input type="text" 
                                            placeholder=' Ingresar descripcion...'
                                            value={this.state.nombre}
                                            onChange={this.onChangeNombre.bind(this)}
                                            className="forms-control" />
                                        <label className="lbls-input">Descripcion</label>
                                    </div>
                                </div>

                                <div className="cols-lg-3 cols-md-3 cols-sm-6 cols-xs-12">

                                    <div className="inputs-groups">
                                        <input type="text" 
                                            placeholder=' Ingresar tipo...'
                                            value={this.state.tipo}
                                            onChange={this.onChangeTipo.bind(this)}
                                            className="forms-control" />
                                        <label className="lbls-input">Tipo</label>
                                    </div>
                                </div>

                                <div className="cols-lg-3 cols-md-3 cols-sm-6 cols-xs-12">

                                    <div className="inputs-groups">
                                        <select 
                                            value={this.state.idunidadmedida}
                                            onChange={this.onChangeIdUnidadMedida.bind(this)}
                                            className="forms-control" >
                                            <option value=''>Seleccionar</option>
                                            {this.state.arrayunidadmedida.map(
                                                (data, key) => (
                                                    <option key={key} value={data.id}>{data.descripcion}</option>
                                                )
                                            )}
                                        </select>
                                        <label className="lbls-input">Unidad Medida</label>
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

