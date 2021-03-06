import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Header from './layouts/header';
import Sidebar from './layouts/sidebar';
import Theme from './layouts/theme';
import { Form, Input, Button, Checkbox, Card, Alert, ConfigProvider  } from 'antd';

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
import PedidoClienteIndex from './ventas/pedidocliente/index';
import PedidoClienteCreate from './ventas/pedidocliente/create';
import PedidoClienteEdit from './ventas/pedidocliente/edit';
import CantidadVisitas from './estadistica/cantidad_visitas';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import es_ES from 'antd/es/locale/es_ES';

import axios from 'axios';
import ws from './utils/ws';
import keysStorage from './utils/keysStorage';
import routes from './utils/routes';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: '',
            alert: false,
            messageError: ''
        }
    }

    onChangeUser(e) {
        this.setState({
            user: e.target.value,
            alert: false
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value,
            alert: false
        });
    }

    verify() {

        if (this.state.user.length > 0 && this.state.password.length > 0) {

            axios.post(ws.login, {
                usuario: this.state.user,
                password: this.state.password
            })
            .then((result) => {
                result = result.data;
                console.log(result);
                if (result.response == 1) {
                    localStorage.setItem(keysStorage.TOKEN_SESSION, result.user.token);
                    localStorage.setItem(keysStorage.USER_ID, result.user.id);
                    localStorage.setItem(keysStorage.COLOR, result.user.color);
                    localStorage.setItem(keysStorage.TYPE_WORD, result.user.letra);

                    this.setState({});
                } else {
                    this.setState({
                        alert: true,
                        messageError: 'Usuario o contraseña incorrectos'
                    })
                }
            })
            .catch((error) => console.log(error));

        } else {
            this.setState({
                alert: true,
                messageError: 'Los campos no pueden quedar vacíos'
            })
        }
        

    }

    login() {

        const { alert } = this.state;

        return (
            <div style={{
                // width: '100%',
                // height: '100%',
                height: 700,
                display: 'flex',
                // textAlign: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                background: `url(${routes.image})`
            }}>
                <Card title='Iniciar Sesión'>
                    {(alert) ? <div style={{
                        padding: 5
                    }}>
                        <Alert type='error' message={this.state.messageError}/>
                    </div>
                    : null}
                    <div style={{
                        padding: 20
                    }}>
                        <label>Usuario</label>
                        <Input
                            value={this.state.user}
                            onChange={this.onChangeUser.bind(this)}
                        />
                    </div>
                    
                    <div style={{
                        padding: 20
                    }}>
                        <label>Contraseña</label>
                        <Input.Password
                            value={this.state.password}
                            onChange={this.onChangePassword.bind(this)}
                        />
                    </div>
                    
                    <div style={{
                        textAlign: 'center'
                    }}>

                        <Button
                            type='primary'
                            onClick={this.verify.bind(this)}
                        >
                            Ingresar
                        </Button>
                    </div>
                </Card>
            </div>
        );

    }

    render() {

        if (!localStorage.getItem(keysStorage.TOKEN_SESSION)) {
            return this.login();
        }
        return (
            <ConfigProvider locale={es_ES}>
                <BrowserRouter>
                    <div className="app-container app-theme-white body-tabs-shadow fixed-header fixed-sidebar">

                        <Header />

                        <Theme />

                        <div className="app-main"
                            style={{ 
                                fontFamily: 'cursive'
                            }}>

                            <Sidebar />

                            <div className="app-main__outer">
                                <div className="app-main__inner" style={{
                                    fontFamily: 'cursive'
                                }}>
                                    <div className="app-page-title">
                                            
                                    <Route exact path={routes.home} render={props => <Home { ...props} />} />

                                    <Route exact path={routes.rol_index} render={props => <IndexRol { ...props} />} />
                                    <Route exact path={routes.rol_create} render={props => <CrearRol { ...props} />} />

                                    <Route exact path={routes.permiso_index} render={props => <IndexPermiso { ...props} />} />
                                    <Route exact path={routes.permiso_create} render={props => <CrearPermiso { ...props} />} />

                                    <Route exact path={routes.usuario_index} render={props => <IndexUsuario { ...props} />} />
                                    <Route exact path={routes.usuario_create} render={props => <CrearUsuario { ...props} />} />

                                    <Route exact path={routes.unidad_medida_index} render={props => <IndexUnidadMedida { ...props} />} />
                                    <Route exact path={routes.unidad_medida_create} render={props => <CrearUnidadMedida { ...props} />} />

                                    <Route exact path={routes.insumo_index} render={props => <IndexInsumo { ...props} />} />
                                    <Route exact path={routes.insumo_create} render={props => <CrearInsumo { ...props} />} />

                                    {/* <Route exact path='/bitacora/index' render={props => <IndexBitacora { ...props} />} />
                                    <Route exact path='/bitacora/show/:id' render={props => <ShowBitacora { ...props} />} /> */}

                                    <Route exact path={routes.producto_terminado_index} render={props => <IndexProductoTerminado { ...props} />} />
                                    <Route exact path={routes.producto_terminado_create} render={props => <CrearProductoTerminado { ...props} />} />

                                    <Route exact path={routes.combo_index} render={props => <IndexCombo { ...props} />} />
                                    <Route exact path={routes.combo_create} render={props => <CrearCombo { ...props} />} />

                                    <Route exact path={routes.cliente_index} render={props => <IndexCliente { ...props} />} />
                                    <Route exact path={routes.cliente_create} render={props => <CrearCliente { ...props} />} />

                                    <Route exact path={routes.venta_index} render={props => <IndexVenta { ...props} />} />
                                    <Route exact path={routes.venta_create} render={props => <CrearVenta { ...props} />} />

                                    <Route exact path={routes.reporte_venta_index} render={props => <ReporteVenta { ...props} />} />

                                    <Route exact path={routes.pedido_cliente_index} render={props => <PedidoClienteIndex { ...props} />} />
                                    <Route exact path={routes.pedido_cliente_create} render={props => <PedidoClienteCreate { ...props} />} />
                                    <Route exact path={routes.pedido_cliente_edit + '/:id'} render={props => <PedidoClienteEdit { ...props} />} />

                                    <Route exact path={routes.estadistica_cantidad_visitas} render={props => <CantidadVisitas { ...props} />} />

                                    </div>
                                </div>
                                
                                {/* <div className="app-wrapper-footer">
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
                                </div>     */}
                            </div>
                        </div>
                    </div>
                </BrowserRouter>
            </ConfigProvider>
        );
    }
}

if (document.getElementById('raiz-index')) {
    ReactDOM.render(<Index />, document.getElementById('raiz-index'));
}
