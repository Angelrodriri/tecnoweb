import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Link } from 'react-router-dom';
import axios from 'axios'
import modules from '../utils/modulos';
import ws from '../utils/ws';
import keysStorage from '../utils/keysStorage';
import routes from '../utils/routes';

export default class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modulos: []
        };

        this.initEvents = this.initEvents.bind(this);
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        this.getModules();
        this.initEvents();
    }

    initEvents() {

        // var eventConfig = new Event('config');
        document.addEventListener('config', this.update, false);
        
        // localStorage.setItem('EVENT', JSON.stringify(eventConfig));
    }

    update(event) {
        // console.log(event);
        this.setState({
        });
    }

    getModules() {
        let iduser = localStorage.getItem(keysStorage.USER_ID);
        axios.post(ws.modulos, {
            iduser: iduser
        })
        .then((result) => {
            console.log('RESULT ====> ', result.data);
            if (result.data.response == 1 ) {
                this.setState({
                    modulos: result.data.modulos
                });
            } else  {
                console.log('RESPONSE <> 1 ', result);
            }  
        })
        .catch(error => console.log('ERROR ', error));
    }


    seguridad() {

        if (this.state.modulos.indexOf(modules.seguridad) >= 0) {
            
            return (
                <li>
                    <a href="#">
                        <i className="fa fa-clone pe-7s-rocket"></i>
                                            Seguridad
                                        <i className="metismenu-state-icon pe-7s-angle-down fa fa-angle-double-down"></i>
                    </a>
                    <ul>
                        <li>
                            <Link to={routes.usuario_index} style={{ color: 'black' }}>
                                <i className="metismenu-icon">
                                </i>Usuario
                            </Link>
                        </li>
                        
                        <li>
                            <Link to={routes.rol_index} style={{ color: 'black' }}>
                                <i className="metismenu-icon">
                                </i>Rol
                            </Link>
                        </li>
                        <li>
                            <Link to={routes.permiso_index} style={{ color: 'black' }}>
                                <i className="metismenu-icon">
                                </i>Permiso
                            </Link>
                        </li>
                    </ul>
                </li>
            );

        }

        return null;

    }

    almacen() {

        if (this.state.modulos.indexOf(modules.almacen) >= 0) {
            return (
                <li>
                    <a href="#">
                        <i className="fa fa-clone pe-7s-rocket"></i>
                            Almacen
                        <i className="metismenu-state-icon pe-7s-angle-down fa fa-angle-double-down"></i>
                    </a>
                    <ul>
                        <li>
                            <Link to={routes.unidad_medida_index} style={{ color: 'black' }}>
                                <i className="metismenu-icon">
                                </i>Unidad Medida
                            </Link>
                        </li>
                        <li>
                            <Link to={routes.insumo_index} style={{ color: 'black' }}>
                                <i className="metismenu-icon">
                                </i> Insumo
                            </Link>
                        </li>
                    </ul>
                </li>
            );
        }

        return null;

    }

    ventas() {

        if (this.state.modulos.indexOf(modules.ventas) >= 0) {
            return (
                <li>
                    <a href="#">
                        <i className="fa fa-clone pe-7s-rocket"></i>
                            Venta
                        <i className="metismenu-state-icon pe-7s-angle-down fa fa-angle-double-down"></i>
                    </a>
                    <ul>
                        <li>
                            <Link to={routes.pedido_cliente_index} style={{ color: 'black' }}>
                                <i className="metismenu-icon">
                                </i> Pedido Cliente
                            </Link>
                        </li>
                        <li>
                            <Link to={routes.cliente_index} style={{ color: 'black' }}>
                                <i className="metismenu-icon">
                                </i> Cliente
                            </Link>
                        </li>
                        <li>
                            <Link to={routes.venta_index} style={{ color: 'black' }}>
                                <i className="metismenu-icon">
                                </i> Venta
                            </Link>
                        </li>
                        <li>
                            <Link to={routes.producto_terminado_index} style={{ color: 'black' }}>
                                <i className="metismenu-icon">
                                </i>Producto Terminado
                            </Link>
                        </li>
                        <li>
                            <Link to={routes.combo_index} style={{ color: 'black' }}>
                                <i className="metismenu-icon">
                                </i> Combo
                            </Link>
                        </li>
                    </ul>
                </li>
            );
        }

        return null;

    }

    reportes() {

        if (this.state.modulos.indexOf(modules.almacen) >= 0) {

            return (
                <li>
                    <a href="#">
                        <i className="fa fa-clone pe-7s-rocket"></i>
                            Reporte
                        <i className="metismenu-state-icon pe-7s-angle-down fa fa-angle-double-down"></i>
                    </a>
                    <ul>
                        {/* <li>
                            <Link to={routes.reporte}'/reporte_insumo/index' style={{ color: 'black' }}>
                                <i className="metismenu-icon">
                                </i> Insumo
                            </Link>
                        </li> */}
                        <li>
                            <Link to={routes.reporte_venta_index} style={{ color: 'black' }}>
                                <i className="metismenu-icon">
                                </i> Venta
                            </Link>
                        </li>
                        <li>
                            <Link to={routes.estadistica_cantidad_visitas} style={{ color: 'black' }}>
                                <i className="metismenu-icon">
                                </i> Cantidad de Visitas
                            </Link>
                        </li>
                    </ul>
                </li>
            );

        }

        return null;

    }

    render() {
        var color = localStorage.getItem(keysStorage.COLOR) == null ? '' : localStorage.getItem(keysStorage.COLOR);
        var letra = localStorage.getItem(keysStorage.TYPE_WORD) == null 
                    ? 'arial' : localStorage.getItem(keysStorage.TYPE_WORD);
        return (
            <div className={"app-sidebar sidebar-shadow " + color}
                style={{
                    // backgroundColor: '#F94E3D',
                    fontFamily: letra
                }}>
                <div className="app-header__logo">
                    <div className="logo-src"></div>
                    <div className="header__pane ml-auto">
                        <div>
                            <button type="button" className="hamburger close-sidebar-btn hamburger--elastic" data-class="closed-sidebar">
                                <span className="hamburger-box">
                                    <span className="hamburger-inner"></span>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="app-header__mobile-menu">
                    <div>
                        <button type="button" className="hamburger hamburger--elastic mobile-toggle-nav">
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        </button>
                    </div>
                </div>
                <div className="app-header__menu">
                    <span>
                        <button type="button" className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav">
                            <span className="btn-icon-wrapper">
                                <i className="fa fa-ellipsis-v fa-w-6"></i>
                            </span>
                        </button>
                    </span>
                </div>

                <div className="scrollbar-sidebar">
                    <div className="app-sidebar__inner">
                        <ul className="vertical-nav-menu">
                            <li className="app-sidebar__heading">Menu</li>
                            
                            {this.seguridad()}

                            { this.almacen() }

                            { this.ventas() }

                            { this.reportes() }

                        </ul>
                    </div>
                </div>

            </div>
        );
    }
}

