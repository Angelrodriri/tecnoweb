import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Header from './layouts/header';
import Sidebar from './layouts/sidebar';
import Theme from './layouts/theme';

import {BrowserRouter, Route} from 'react-router-dom';
import Home from './home';
import IndexRol from './seguridad/rol';
import CrearRol from './seguridad/rol/crear';
import IndexPermiso from './seguridad/permiso';
import CrearPermiso from './seguridad/permiso/crear';
import IndexUnidadMedida from './insumo/medida';
import CrearUnidadMedida from './insumo/medida/crear';
import IndexInsumo from './insumo/insumo';
import CrearInsumo from './insumo/insumo/crear';
import IndexUsuario from './seguridad/usuario';
import CrearUsuario from './seguridad/usuario/crear';
import IndexBitacora from './seguridad/bitacora';
import IndexProductoTerminado from './producto/producto_terminado';
import CrearProductoTerminado from './producto/producto_terminado/crear';
import IndexCombo from './producto/combo';
import CrearCombo from './producto/combo/crear';
import IndexCliente from './ventas/cliente';
import CrearCliente from './ventas/cliente/crear';
import IndexVenta from './ventas/venta';
import CrearVenta from './ventas/venta/crear';
import ShowBitacora from './seguridad/bitacora/show';
import ReporteVenta from './reporte/venta';

export default class Index extends Component {
    render() {
        return (
            
            <BrowserRouter>
                <div className="app-container app-theme-white body-tabs-shadow fixed-header fixed-sidebar">

                    <Header />

                    <Theme />

                    <div className="app-main">

                        <Sidebar />

                        <div className="app-main__outer">
                            <div className="app-main__inner">
                                <div className="app-page-title">
                                         
                                <Route exact path='/home' render={props => <Home { ...props} />} />

                                <Route exact path='/rol/index' render={props => <IndexRol { ...props} />} />
                                <Route exact path='/rol/create' render={props => <CrearRol { ...props} />} />

                                <Route exact path='/permiso/index' render={props => <IndexPermiso { ...props} />} />
                                <Route exact path='/permiso/create' render={props => <CrearPermiso { ...props} />} />

                                <Route exact path='/usuario/index' render={props => <IndexUsuario { ...props} />} />
                                <Route exact path='/usuario/create' render={props => <CrearUsuario { ...props} />} />

                                <Route exact path='/unidad_medida/index' render={props => <IndexUnidadMedida { ...props} />} />
                                <Route exact path='/unidad_medida/create' render={props => <CrearUnidadMedida { ...props} />} />

                                <Route exact path='/insumo/index' render={props => <IndexInsumo { ...props} />} />
                                <Route exact path='/insumo/create' render={props => <CrearInsumo { ...props} />} />

                                <Route exact path='/bitacora/index' render={props => <IndexBitacora { ...props} />} />
                                <Route exact path='/bitacora/show/:id' render={props => <ShowBitacora { ...props} />} />

                                <Route exact path='/producto_terminado/index' render={props => <IndexProductoTerminado { ...props} />} />
                                <Route exact path='/producto_terminado/create' render={props => <CrearProductoTerminado { ...props} />} />

                                <Route exact path='/combo/index' render={props => <IndexCombo { ...props} />} />
                                <Route exact path='/combo/create' render={props => <CrearCombo { ...props} />} />

                                <Route exact path='/cliente/index' render={props => <IndexCliente { ...props} />} />
                                <Route exact path='/cliente/create' render={props => <CrearCliente { ...props} />} />

                                <Route exact path='/venta/index' render={props => <IndexVenta { ...props} />} />
                                <Route exact path='/venta/create' render={props => <CrearVenta { ...props} />} />

                                <Route exact path='/reporte_venta/index' render={props => <ReporteVenta { ...props} />} />



                                </div>
                            </div>
                            
                            <div className="app-wrapper-footer">
                                <div className="app-footer">
                                    <div className="app-footer__inner">
                                        
                                        <div className="app-footer-right">
                                            <ul className="header-megamenu nav">
                                                <li className="nav-item">
                                                    <a data-placement="top" rel="popover-focus" data-offset="300" 
                                                        data-toggle="popover-custom" className="nav-link">
                                                        Footer Menu
                                                        <i className="fa fa-angle-up ml-2 opacity-8"></i>
                                                    </a>
                                                    <div className="rm-max-width rm-pointers">
                                                        <div className="d-none popover-custom-content">
                                                            <div className="dropdown-mega-menu dropdown-mega-menu-sm">
                                                                <div className="grid-menu grid-menu-2col">
                                                                    <div className="no-gutters row">
                                                                        <div className="col-sm-6 col-xl-6">
                                                                            <ul className="nav flex-column">
                                                                                <li className="nav-item-header nav-item">Overview</li>
                                                                                <li className="nav-item">
                                                                                    <a className="nav-link">
                                                                                        <i className="nav-link-icon lnr-inbox"> </i>
                                                                                        <span>Contacts</span></a>
                                                                                </li>
                                                                                <li className="nav-item">
                                                                                    <a className="nav-link">
                                                                                        <i className="nav-link-icon lnr-book"> </i>
                                                                                        <span>Incidents</span>
                                                                                        <div className="ml-auto badge badge-pill badge-danger">5</div>
                                                                                    </a>
                                                                                </li>
                                                                                <li className="nav-item">
                                                                                    <a className="nav-link">
                                                                                        <i className="nav-link-icon lnr-picture"> </i>
                                                                                        <span>Companies</span></a>
                                                                                </li>
                                                                                <li className="nav-item">
                                                                                    <a disabled="" className="nav-link disabled">
                                                                                        <i className="nav-link-icon lnr-file-empty"> </i>
                                                                                        <span>Dashboards</span></a>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                        <div className="col-sm-6 col-xl-6">
                                                                            <ul className="nav flex-column">
                                                                                <li className="nav-item-header nav-item">Sales &amp; Marketing</li>
                                                                                <li className="nav-item"><a className="nav-link">Queues</a></li>
                                                                                <li className="nav-item"><a className="nav-link">Resource Groups</a></li>
                                                                                <li className="nav-item"><a className="nav-link">Goal Metrics
                                                                                    <div className="ml-auto badge badge-warning">3</div>
                                                                                </a></li>
                                                                                <li className="nav-item"><a className="nav-link">Campaigns</a></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>    
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

if (document.getElementById('raiz-index')) {
    ReactDOM.render(<Index />, document.getElementById('raiz-index'));
}
