
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {Link} from 'react-router-dom';
import paginas from '../../utils/nombre_paginas';
import functios from '../../utils/functions';
import ContadorPagina from '../../components/contador_pagina';
import axios from 'axios';
import ws from '../../utils/ws';
import keysStorage from '../../utils/keysStorage';
import routes from '../../utils/routes';

export default class IndexCombo extends Component {

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
        let count = await functios.obtenerVisitas(paginas.insumo);
        functios.incrementarVisitas(paginas.insumo);
        this.setState({
            visitas: count+1
        });
    }

    getData() {
        axios.get(ws.combo_index).then(
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

        var letra = localStorage.getItem(keysStorage.TYPE_WORD) == null 
                    ? 'arial' : localStorage.getItem(keysStorage.TYPE_WORD);
        return (
            <div className="rows">
                <div className="cards" style={{
                    fontFamily: letra
                }}>
                    <div className="forms-groups">
                        <div className="pulls-left">
                            <h1 className="lbls-txts">Lista de Combo</h1>
                        </div>

                        <div className="pulls-right">
                            <Link to={routes.combo_create} className="btn-shadow-primary btn btn-primary btn-lg">
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
                        <ContadorPagina 
                            text={this.state.visitas}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

