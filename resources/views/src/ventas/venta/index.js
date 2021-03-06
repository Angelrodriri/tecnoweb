
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {Link} from 'react-router-dom';
import paginas from '../../utils/nombre_paginas';
import functios from '../../utils/functions';
import ContadorPagina from '../../components/contador_pagina';

import axios from 'axios';
import ws from '../../utils/ws';
import routes from '../../utils/routes';

export default class IndexVenta extends Component {

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
        let count = await functios.obtenerVisitas(paginas.venta);
        functios.incrementarVisitas(paginas.venta);
        this.setState({
            visitas: count+1
        });
    }

    getData() {
        axios.get(ws.venta_index).then(
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
                            <h1 className="lbls-txts">Lista de Venta</h1>
                        </div>

                        <div className="pulls-right">
                            <Link to={routes.venta_create} className="btn-shadow-primary btn btn-primary btn-lg">
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
                                            <td>Cliente</td>
                                            <td>Total</td>
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
                                                    <td>{data.nombre + ' ' + data.apellido}</td>
                                                    <td>{data.total}</td>
                                                    <td>{this.getFecha(data.created_at)}</td>
                                                    <td>
                                                        {/* <a style={{'padding': '3px'}}
                                                            className="btn btn-sm btn-outline-primary fa fa-edit mr-2">
                                                        </a>
                                                        <a style={{'padding': '3px'}}
                                                            className="btn btn-sm btn-outline-danger fa fa-times">
                                                        </a> */}
                                                        <form action={routes.reporte_venta_detalle_generar + '/' + data.id} target="_blank" method="post">
                                                            <input type='hidden' name="inicio" value={this.state.fechaInicio} />
                                                            <input type='hidden' name="fin" value={this.state.fechaFinal} />
                                                            <button type='submit' className="btn-shadow-danger btn btn-danger btn-lg">
                                                                Generar Factura
                                                            </button>
                                                        </form>
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

