
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {Link} from 'react-router-dom';
import paginas from '../../utils/nombre_paginas';
import functios from '../../utils/functions';
import ContadorPagina from '../../components/contador_pagina';
import axios from 'axios';

export default class IndexProductoTerminado extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            visitas: ''
        }
    }

    componentDidMount() {
        this.getData();
        this.updateVisitas();
    }

    async updateVisitas () {
        let count = await functios.obtenerVisitas(paginas.producto_terminado);
        functios.incrementarVisitas(paginas.producto_terminadoventa);
        this.setState({
            visitas: count+1
        });
    }

    getData() {
        axios.get('/api/producto/index').then(
            response => {
                if (response.data.response == 1) {
                    this.setState({
                        data: response.data.data,
                    });
                }
            }
        ).catch(
            error => console.log(error)
        );
    }

    getFecha(date) {
        var array = date.split(' ');
        array = array[0].split('-');
        return array[2]+ '/' + array[1] + '/' + array[0];
    }

    render() {
        return (
            <div className="rows">
                <div className="cards">
                    <div className="forms-groups">
                        <div className="pulls-left">
                            <h1 className="lbls-txts">Lista de Producto terminado</h1>
                        </div>

                        <div className="pulls-right">
                            <Link to="/producto_terminado/create" className="btn-shadow-primary btn btn-primary btn-lg">
                                Nuevo
                            </Link>
                        </div>

                        <div className="forms-groups">

                            <div className="tabless">

                                <table className="tables-respons">

                                    <thead>
                                        <tr>
                                            <td>Nro</td>
                                            <td>Codigo</td>
                                            <td>Descripcion</td>
                                            <td>Precio</td>
                                            <td>Registro</td>
                                            <td>Opcion</td>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.state.data.map(
                                            (data, key) => (
                                                <tr key={key}>
                                                    <td>{key + 1}</td>
                                                    <td>{data.codigo}</td>
                                                    <td>{data.descripcion}</td>
                                                    <td>{data.precio}</td>
                                                    <td>{this.getFecha(data.created_at)}</td>
                                                    <td>
                                                        <a style={{'padding': '3px'}}
                                                            className="btn btn-sm btn-outline-primary fa fa-edit mr-2">
                                                        </a>
                                                        <a style={{'padding': '3px'}}
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
                    </div>
                    <ContadorPagina 
                        text={this.state.visitas}
                    />
                </div>
            </div>
        );
    }
}

