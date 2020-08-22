
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';

export default class CrearUnidadMedida extends Component {

    constructor(props) {
        super(props);
        this.state = {
            descripcion: '',
            abreviatura: '',
            redirect: false,
        }
    }

    onChangeDescripcion(event) {
        this.setState({
            descripcion: event.target.value,
        });
    }

    onChangeAbreviatura(event) {
        this.setState({
            abreviatura: event.target.value,
        });
    }

    onClickRegresar() {
        this.setState({
            redirect: true,
        });
    }

    onSubmit(event) {
        event.preventDefault();
        if (this.state.descripcion.toString().trim().length > 0 && 
            this.state.abreviatura.toString().trim().length > 0) {

            const formdata = new FormData();
            formdata.append('descripcion', this.state.descripcion);
            formdata.append('abreviatura', this.state.abreviatura);
            
            axios.post('/api/unidad_medida/store', formdata).then(
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
            if (this.state.abreviatura.toString().trim().length == 0) {
                this.setState({
                    abreviatura: '',
                });
            }
        }
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to='/unidad_medida/index' />);
        }
        return (
            <div className="rows">
                <div className="cards">
                    <div className="forms-groups">
                        <div className="pulls-left">
                            <h1 className="lbls-txts">Nueva Unidad medida</h1>
                        </div>

                        <div className="pulls-right">
                            <Link to="/unidad_medida/index" className="btn btn-info">
                                Atras
                            </Link>
                        </div>

                        <div className="forms-groups">

                            <div className="cols-lg-12 cols-md-12 cols-sm-12 cols-xs-12">

                                <div className="cols-lg-3 cols-md-2"></div>

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
                                            placeholder=' Ingresar abreviatura...'
                                            value={this.state.abreviatura}
                                            onChange={this.onChangeAbreviatura.bind(this)}
                                            className="forms-control" />
                                        <label className="lbls-input">Abreviatura</label>
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

