
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {Link} from 'react-router-dom';

import axios from 'axios';

export default class IndexBitacora extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        axios.get('/api/bitacora/index').then(
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
                            <h1 className="lbls-txts">Lista de Bitacora</h1>
                        </div>

                        <div className="forms-groups">

                            <div className="tabless">

                                <table className="tables-respons">

                                    <thead>
                                        <tr>
                                            <td>Nro</td>
                                            <td>Usuario</td>
                                            <td>Registro</td>
                                            <td>Opcion</td>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.state.data.map(
                                            (data, key) => (
                                                <tr key={key}>
                                                    <td>{key + 1}</td>
                                                    <td>{data.nombre}</td>
                                                    <td>{this.getFecha(data.created_at)}</td>
                                                    <td>
                                                        <Link to={'/bitacora/show/' + data.id} 
                                                            style={{'padding': '3px'}}
                                                            className="btn btn-sm btn-outline-success fa fa-eye">
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

