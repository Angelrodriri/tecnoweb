import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Link } from 'react-router-dom';

export default class Sidebar extends Component {


    seguridad() {
        return (
            <li>
                <a href="#">
                    <i className="fa fa-clone pe-7s-rocket"></i>
                                        Seguridad
                                    <i className="metismenu-state-icon pe-7s-angle-down fa fa-angle-double-down"></i>
                </a>
                <ul>
                    <li>
                        <Link to='/usuario/index'>
                            <i className="metismenu-icon">
                            </i>Usuario
                        </Link>
                    </li>
                    
                    <li>
                        <Link to='/rol/index'>
                            <i className="metismenu-icon">
                            </i>Rol
                        </Link>
                    </li>
                    <li>
                        <Link to='/permiso/index'>
                            <i className="metismenu-icon">
                            </i>Permiso
                        </Link>
                    </li>
                </ul>
            </li>
        );
    }

    almacen() {
        return (
            <li>
                <a href="#">
                    <i className="fa fa-clone pe-7s-rocket"></i>
                        Almacen
                    <i className="metismenu-state-icon pe-7s-angle-down fa fa-angle-double-down"></i>
                </a>
            </li>
        );
    }

    render() {
        return (
            <div className="app-sidebar sidebar-shadow">
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
                            {/*<li>
                                <a href="#">
                                    <i className="fa fa-clone pe-7s-rocket"></i>
                                        Dashboards
                                    <i className="metismenu-state-icon pe-7s-angle-down fa fa-angle-double-down"></i>
                                </a>
                                <ul>
                                    <li>
                                        <Link to='/home' className="mm-active">
                                            <i className="metismenu-icon">
                                            </i>Home
                                        </Link>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i className="metismenu-icon"></i>
                                                Minimal
                                            <i className="metismenu-state-icon pe-7s-angle-down fa fa-angle-double-down"></i>
                                        </a>
                                        <ul>
                                            <li>
                                                <a href="dashboards-minimal-1.html">
                                                    <i className="metismenu-icon">
                                                    </i>Variation 1
                                                </a>
                                            </li>
                                            <li>
                                                <a href="dashboards-minimal-2.html">
                                                    <i className="metismenu-icon">
                                                    </i>Variation 2
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>*/}
                            {this.seguridad()}

                            { this.almacen() }

                            <li>
                                <a href="#">
                                    <i className="fa fa-clone pe-7s-rocket"></i>
                                        Venta
                                    <i className="metismenu-state-icon pe-7s-angle-down fa fa-angle-double-down"></i>
                                </a>
                                <ul>
                                    <li>
                                        <Link to='/cliente/index'>
                                            <i className="metismenu-icon">
                                            </i> Cliente
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/venta/index'>
                                            <i className="metismenu-icon">
                                            </i> Venta
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li>
                                <a href="#">
                                    <i className="fa fa-clone pe-7s-rocket"></i>
                                        Producto
                                    <i className="metismenu-state-icon pe-7s-angle-down fa fa-angle-double-down"></i>
                                </a>
                                <ul>
                                    <li>
                                        <Link to='/producto_terminado/index'>
                                            <i className="metismenu-icon">
                                            </i>Producto Terminado
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/combo/index'>
                                            <i className="metismenu-icon">
                                            </i> Combo
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li>
                                <a href="#">
                                    <i className="fa fa-clone pe-7s-rocket"></i>
                                        Insumo
                                    <i className="metismenu-state-icon pe-7s-angle-down fa fa-angle-double-down"></i>
                                </a>
                                <ul>
                                    <li>
                                        <Link to='/unidad_medida/index'>
                                            <i className="metismenu-icon">
                                            </i>Unidad Medida
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/insumo/index'>
                                            <i className="metismenu-icon">
                                            </i> Insumo
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li>
                                <a href="#">
                                    <i className="fa fa-clone pe-7s-rocket"></i>
                                        Reporte
                                    <i className="metismenu-state-icon pe-7s-angle-down fa fa-angle-double-down"></i>
                                </a>
                                <ul>
                                    <li>
                                        <Link to='/reporte_insumo/index'>
                                            <i className="metismenu-icon">
                                            </i> Insumo
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/reporte_venta/index'>
                                            <i className="metismenu-icon">
                                            </i> Venta
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                        </ul>
                    </div>
                </div>

            </div>
        );
    }
}

