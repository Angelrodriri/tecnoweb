
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {Link} from 'react-router-dom';
import paginas from '../../utils/nombre_paginas';
import functions from '../../utils/functions';
import ContadorPagina from '../../components/contador_pagina';

import axios from 'axios';

import ws from '../../utils/ws';
import routes from '../../utils/routes';

export default class IndexPedidoCliente extends Component {

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
        let count = await functions.obtenerVisitas(paginas.pedido_cliente);
        functions.incrementarVisitas(paginas.pedido_cliente);
        this.setState({
            visitas: count+1
        });
    }

    getData() {
        axios.get(ws.pedido_cliente_index).then(
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

    deletePedido(idpedido) {
        axios.delete(`${ws.pedido_cliente_delete}/${idpedido}`)
        .then(resp => {
            resp = resp.data;
            if (resp.response == 1) {
                this.setState({
                    data: resp.data
                });
            }
        })
        .catch(error => console.log(error));
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
                            <h1 className="lbls-txts">Pedido Cliente</h1>
                        </div>

                        <div className="pulls-right">
                            <Link to={routes.pedido_cliente_create} className="btn-shadow-primary btn btn-primary btn-lg">
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
                                            <td>Fecha</td>
                                            <td>Monto Total</td>
                                            <td>Cliente</td>
                                            <td>Opcion</td>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.state.data.map(
                                            (data, key) => (
                                                <tr key={key}>
                                                    <td>{key + 1}</td>
                                                    <td>{data.codigo}</td>
                                                    <td>{functions.convertDate(data.fecha)}</td>
                                                    <td>{data.montototal}</td>
                                                    <td>{data.nombre + ' ' + data.apellido}</td>
                                                    <td>
                                                        <Link to={routes.pedido_cliente_edit + '/' + data.id}>
                                                            <a style={{'padding': '3px'}}
                                                                className="btn btn-sm btn-outline-primary fa fa-edit mr-2">
                                                                
                                                            
                                                            </a>
                                                        </Link>
                                                        <a style={{'padding': '3px'}}
                                                            onClick={this.deletePedido.bind(this, data.id)}
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

