
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {Link} from 'react-router-dom';
import paginas from '../utils/nombre_paginas';
import functios from '../utils/functions';
import ContadorPagina from '../components/contador_pagina';
import axios from 'axios';
import ws from '../utils/ws';

export default class ReporteVenta extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            fechaInicio: '',
            fechaFinal: '',
            visitas: ''
        }
    }

    componentDidMount() {
        this.updateVisitas();
    }

    async updateVisitas () {
        let count = await functios.obtenerVisitas(paginas.reporte_venta);
        functios.incrementarVisitas(paginas.reporte_venta);
        this.setState({
            visitas: count+1
        });
    }

    getFecha(date) {
        var array = date.split(' ');
        array = array[0].split('-');
        return array[2]+ '/' + array[1] + '/' + array[0];
    }

    onChangeFechaInicio(event) {
        this.setState({
            fechaInicio: event.target.value,
        });
        if (event.target.value == '') {
            this.setState({
                fechaFinal: '',
            });
        }
    }

    onChangeFechaFinal(event) {
        if (event.target.value == '') {
            this.setState({
                fechaFinal: '',
            });
        }else {
            if (event.target.value >= this.state.fechaInicio) {
                this.setState({
                    fechaFinal: event.target.value,
                });
            }
        }
    }

    onGenerarReporte() {
        if (this.state.fechaInicio.toString().length > 0 && 
            this.state.fechaFinal.toString().length > 0) {
            const formdata = new FormData();
            formdata.append('inicio', this.state.fechaInicio);
            formdata.append('fin', this.state.fechaFinal);
            axios.post(ws.reporte_venta, formdata).then(
                response => {
                    this.setState({
                        data: response.data.data,
                    });
                }
            ).catch(
                error => console.log(error)
            )
        }
    }

    render() {
        return (
            <div className="rows">
                <div className="cards">
                    <div className="forms-groups">
                        <div className="pulls-left">
                            <h1 className="lbls-txts">Reporte de Venta</h1>
                        </div>

                        <div className="pulls-right">
                            <form action="/api/venta/generar" target="_blank" method="post">
                                <input type='hidden' name="inicio" value={this.state.fechaInicio} />
                                <input type='hidden' name="fin" value={this.state.fechaFinal} />
                                <button type='submit' className="btn-shadow-primary btn btn-primary btn-lg">
                                    Generar
                                </button>
                            </form>
                        </div>

                        <div className="forms-groups">
                            <div className="cols-lg-12 cols-md-12 cols-sm-12 cols-xs-12">
                                <div className="cols-lg-2 cols-md-2"></div>
                                <div className="cols-lg-3 cols-md-3 cols-sm-6 cols-xs-12">
                                    <div className="inputs-groups">
                                        <input type='date'className="forms-control" 
                                            value={this.state.fechaInicio}
                                            onChange={this.onChangeFechaInicio.bind(this)}
                                        />
                                        <label className="lbls-input">Fecha Inicio</label>
                                    </div>
                                </div>
                                <div className="cols-lg-3 cols-md-3 cols-sm-6 cols-xs-12">
                                    <div className="inputs-groups">
                                        <input type='date'className="forms-control" 
                                            value={this.state.fechaFinal}
                                            onChange={this.onChangeFechaFinal.bind(this)}
                                        />
                                        <label className="lbls-input">Fecha Final</label>
                                    </div>
                                </div>
                                <div className="cols-lg-1 cols-md-1 cols-sm-6 cols-xs-12"
                                    onClick={this.onGenerarReporte.bind(this)}>
                                    <a className="btn btn-primary">Aceptar</a>
                                </div>
                            </div>
                        </div>

                        <div className="cols-lg-12 cols-md-12 cols-sm-12 cols-xs-12">
                            <label>Lista de Venta Generada</label>
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
                                                        <form action="/api/venta/detalle" target="_blank" method="post">
                                                            <input type='hidden' name="id" value={data.id} />
                                                            <button type="submit"
                                                                style={{'padding': '3px'}}
                                                                className="btn btn-sm btn-outline-success fa fa-eye">
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

