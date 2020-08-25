import axios from 'axios';

const incrementarVisitas = async (idpagina) => {

    try {
        let result = await axios.post('/api/setVisitas', {
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
        let result = await axios.get(`/api/getVisitas/${idpagina}`);
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

export default {
    incrementarVisitas,
    obtenerVisitas
}
