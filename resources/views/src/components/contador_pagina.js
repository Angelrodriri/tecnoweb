import React, { Component } from 'react';

export default class ContadorPagina extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: ''
        }
    }

    render() {
        return (
            <div 
                style={{ 
                    textAlign: 'center',
                    marginTop: 20
                }}>
                <lavel
                    style={{ 
                        color: 'blue',
                        fontSize: 24,
                        fontWeight: 'bold'
                    }}
                >
                    {this.props.text}
                </lavel> 
            </div>
        );
    }
}
