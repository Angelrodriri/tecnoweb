import axios from 'axios';
import ws from '../utils/ws';

const incrementarVisitas = async (idpagina) => {

    try {
        let result = await axios.post(ws.set_visitas, {
            idpagina
        });
        result = result.data;
        if (result.response == 1) {
            console.log('inremento corretamente');
        } else {
            console.log('no inremento corretamente');
        }
    
    } catch (e) {
        console.log('Error ', e);
    }

};

const obtenerVisitas = async (idpagina) => {
    try {
        let result = await axios.get(`${ws.get_visitas}/${idpagina}`);
        result = result.data;
        if (result.response == 1) {
            return result.visitas;
        }
        return 0;
    } catch (e) {
        console.log('Error ', e);
        return 0;
    }
};

const convertDate = (date) => {
    var array = date.split(' ');
    array = array[0].split('-');
    return array[2]+ '/' + array[1] + '/' + array[0];
}

export default {
    incrementarVisitas,
    obtenerVisitas,
    convertDate
}
