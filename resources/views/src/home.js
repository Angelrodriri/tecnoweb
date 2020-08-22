
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Home extends Component {

    render() {

        return (
            <div style={{'width': '100%'}}>
                <ul className="body-tabs body-tabs-layout tabs-animated body-tabs-animated nav">
                    <li className="nav-item">
                        <a role="tab" className="nav-link active" href="index-2.html">
                            <span>Variation 1</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a role="tab" className="nav-link" href="analytics-variation.html">
                            <span>Variation 2</span>
                        </a>
                    </li>
                </ul>
                
                <div className="tabs-animation">
                    
                    <div className="card mb-3">
                        <div className="card-header-tab card-header">
                            <div className="card-header-title font-size-lg text-capitalize font-weight-normal">
                                <i className="header-icon lnr-laptop-phone mr-3 text-muted opacity-6"> </i>
                                Easy Dynamic Tables
                            </div>
                            <div className="btn-actions-pane-right actions-icon-btn">
                                <div className="btn-group dropdown">
                                    <button type="button" data-toggle="dropdown" 
                                        aria-haspopup="true" aria-expanded="false" 
                                        className="btn-icon btn-icon-only btn btn-link">
                                            <i className="pe-7s-menu btn-icon-wrapper"></i></button>
                                    <div tabindex="-1" role="menu" aria-hidden="true" 
                                        className="dropdown-menu-right rm-pointers dropdown-menu-shadow dropdown-menu-hover-link dropdown-menu">
                                        <h6 tabindex="-1" className="dropdown-header">Header</h6>
                                        <button type="button" tabindex="0" className="dropdown-item">
                                            <i className="dropdown-icon lnr-inbox"> </i><span>Menus</span>
                                        </button>
                                        <button type="button" tabindex="0" className="dropdown-item">
                                            <i className="dropdown-icon lnr-file-empty"> </i><span>Settings</span>
                                        </button>
                                        <button type="button" tabindex="0" className="dropdown-item">
                                            <i className="dropdown-icon lnr-book"> </i><span>Actions</span>
                                        </button>
                                        <div tabindex="-1" className="dropdown-divider"></div>
                                        <div className="p-3 text-right">
                                            <button className="mr-2 btn-shadow btn-sm btn btn-link">
                                                View Details
                                            </button>
                                            <button className="mr-2 btn-shadow btn-sm btn btn-primary">
                                                Action
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}