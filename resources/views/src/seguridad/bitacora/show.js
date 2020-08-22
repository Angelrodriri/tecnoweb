
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {Link} from 'react-router-dom';

import axios from 'axios';

export default class ShowBitacora extends Component {

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
        axios.get('/api/bitacora/show/' + this.props.match.params.id + '').then(
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
                            <h1 className="lbls-txts">Detalle de Bitacora</h1>
                        </div>

                        <div className="pulls-right">
                            <Link to="/bitacora/index" className="btn-shadow-primary btn btn-primary btn-lg">
                                Atras
                            </Link>
                        </div>

                        <div className="forms-groups">

                            <div className="tabless">

                                <table className="tables-respons">

                                    <thead>
                                        <tr>
                                            <td>Nro</td>
                                            <td>Accion</td>
                                            <td>Registro</td>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {this.state.data.map(
                                            (data, key) => (
                                                <tr key={key}>
                                                    <td>{key + 1}</td>
                                                    <td>{data.accion}</td>
                                                    <td>{this.getFecha(data.created_at)}</td>
                                                    
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

