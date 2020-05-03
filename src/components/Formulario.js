import React, {useEffect, useState} from 'react';
import Error from './Error'


import styled from '@emotion/styled';
import useMoneda from '../Hooks/useMoneda';
import useCriptoMoneda from '../Hooks/useCriptomoneda';

import axios from 'axios';


const Boton = styled.input`
    margin-top:20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66A2FE;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #FFF;
    transition: background-color .3s ease;

    &:hover{
        background-color: #326AC0;
        cursor: pointer;
    }
`;

const Fomulario = ({guardarMoneda, guardarCriptomoneda}) => {

    //State del estado de criptomonedas
    const [ listaCripto, guardarCriptomonedas] = useState([]);

    const [ error, guardarError ] = useState(false);

    const MONEDAS = [
        { codigo: 'USD', nombre: 'Dolar Estadounidense' },
        { codigo: 'MXN', nombre: 'Peso Mexicano' },
        { codigo: 'EUR', nombre: 'Euro' },
        { codigo: 'GBP', nombre: 'Libra Esterlina' }
    ];

    //Utilizar useMoneda
    const [ moneda, SelectMonedas ] = useMoneda('Elige tu Moneda', '', MONEDAS);
    
    //Utilizar useCriptoMoneda
    const [ criptomoneda, SelectCripto ] = useCriptoMoneda('Elige tu Cripto Moneda', '',listaCripto);

    //Ejecutar llamado a la API con useEffect

    useEffect(() =>{
        // MONEDAS.map(r =>{
        //     console.log(r.codigo);

        // })
        
        const consultarAPI = async() =>{
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const res = await axios.get(url);

            guardarCriptomonedas(res.data.Data);            
        }
        consultarAPI();
    }, [])

    const cotizarMoneda = e =>{
        e.preventDefault();

        //Validar si ambos campos están llenos
        if(moneda === '' || criptomoneda === ''){
            guardarError(true);
            return;
        }

        //Pasar los datos al componente principal
        guardarError(false);

        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);
    }

    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje="Todos los campos son obligatorios"/> : null}
            <SelectMonedas/>

            <SelectCripto/>

            <Boton
                type="submit"
                value="Calcular"
            />
        </form>
     );
}
 
export default Fomulario;