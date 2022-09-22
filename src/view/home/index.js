import React, { useState, useEffect} from 'react';
import './home.css';
import Navbar from '../../components/navbar';
import {useSelector} from 'react-redux';
import firebase from '../../config/firebase';
import EventoCard from '../../components/evento-card/';

function Home({match}){

    const [eventos, setEventos] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    let listaeventos = [];
    const usuarioEmail = useSelector(state => state.usuarioEmail);

    useEffect(() => {
    
    if(match.params.parametro){

        firebase.firestore().collection('Eventos').where('usuario','==',usuarioEmail).get().then(async (resultado) => {
            await resultado.docs.forEach(doc =>{
                if(doc.data().titulo.toUpperCase().indexOf(pesquisa.toUpperCase()) >= 0)
                {
                    listaeventos.push({
                        id: doc.id,
                        ...doc.data()
                    })
                }
            })
            
            setEventos(listaeventos);
        });

    }else{

        firebase.firestore().collection('Eventos').get().then(async (resultado) => {
            await resultado.docs.forEach(doc =>{
                if(doc.data().titulo.toUpperCase().indexOf(pesquisa.toUpperCase()) >= 0)
                {
                    listaeventos.push({
                        id: doc.id,
                        ...doc.data()
                    })
                }
            })

            setEventos(listaeventos);
        });
    }

    });

    return(
        <div className='main-home'>
            <Navbar/>    

            <div className="row p-3 ">
                <h3 className="text-center p-5 ">Publicações</h3>
                <div class="input-group mb-3 barra-pesquisa">
                    <input onChange={(e) => setPesquisa(e.target.value)} type="text" className="form-control text-center " placeholder="Pesquisar..."/>
                    <span class="input-group-text"><i class="fa fa-search"></i></span>
                </div>
            </div>

            <div className="row p-3">
                {eventos.map (item => <EventoCard key={item.id} id={item.id} img={item.foto} titulo={item.titulo} detalhes={item.detalhes} visualizacoes={item.visualizacoes}/>) }
            </div>       
        </div>
    )
};

export default Home;