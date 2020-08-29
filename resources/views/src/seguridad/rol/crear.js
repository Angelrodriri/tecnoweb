
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import ws from '../../utils/ws';

export default class CrearRol extends Component {

    constructor(props) {
        super(props);
        this.state = {
            descripcion: '',
            redirect: false,
        }
    }

    onChangeDescripcion(event) {
        this.setState({
            descripcion: event.target.value,
        });
    }

    onClickRegresar() {
        this.setState({
            redirect: true,
        });
    }

    onSubmit(event) {
        event.preventDefault();
        if (this.state.descripcion.toString().trim().length > 0) {

            const formdata = new FormData();
            formdata.append('descripcion', this.state.descripcion);
            
            axios.post(ws.rol_store, formdata).then(
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
            this.setState({
                descripcion: '',
            });
        }
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to='/rol/index' />);
        }
        return (
            <div className="rows">
                <div className="cards">
                    <div className="forms-groups">
                        <div className="pulls-left">
                            <h1 className="lbls-txts">Nuevo Rol</h1>
                        </div>

                        <div className="pulls-right">
                            <Link to="/rol/index" className="btn btn-info">
                                Atras
                            </Link>
                        </div>

                        <div className="forms-groups">

                            <div className="cols-lg-12 cols-md-12 cols-sm-12 cols-xs-12">

                                <div className="cols-lg-4 cols-md-4 cols-sm-3"></div>

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

