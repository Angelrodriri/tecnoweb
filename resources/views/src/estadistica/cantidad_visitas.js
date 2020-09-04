

import React, { Component } from 'react';
import { Column  } from '@ant-design/charts';
import ws from '../utils/ws';
import axios from 'axios';

//   var config = {
//     title: {
//       visible: true,
//       text: 'Cantidad de visitas por Páginas',
//     },
//     // description: {
//     //   visible: true,
//     //   text: '基础柱状图的图形之间添加转化率标签图形\uFF0C用户希望关注从左到右的数据变化比例',
//     // },
//     forceFit: true,
//     data,
//     padding: 'auto',
//     xField: 'action',
//     yField: 'pv',
//     conversionTag: { visible: true },
//   };
export default class CantidadVisitas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            config: {
                title: {
                    visible: true,
                    text: 'Cantidad de visitas por Páginas',
                },
                // description: {
                //   visible: true,
                //   text: '基础柱状图的图形之间添加转化率标签图形\uFF0C用户希望关注从左到右的数据变化比例',
                // },
                forceFit: true,
                data: [],
                padding: 'auto',
                xField: 'action',
                yField: 'pv',
                // conversionTag: { visible: true },
                label: {
                    visible: true,
                    position: 'middle',
                    adjustColor: true,
                },
            }
        };
    }

    componentDidMount() {
        this.getEstadisticas();
    }

    getEstadisticas() {
        axios.get(ws.estadistica)
        .then(resp => {
            resp = resp.data;
            console.log(resp);
            if (resp.response == 1) {
                this.state.config.data = resp.data;
                this.setState({
                    config: this.state.config
                });
            }
        })
        .catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                <Column {...this.state.config} />
            </div>
        )
    }

}
