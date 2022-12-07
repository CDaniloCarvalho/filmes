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

    const search = event => {
        setPesquisa(event.target.value);
    }    

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

    },[pesquisa]);

    return(
        <div className='container-fluid main-home'>
            <Navbar search={search} />    

            <div className="row p-3 mx-auto ">
                <h3 className="text-center p-4 ">Publicações</h3>
            </div>

            <div className="row p-3 mx-auto">
                {eventos.map (item => <EventoCard key={item.id} id={item.id} img={item.foto} titulo={item.titulo} detalhes={item.detalhes} visualizacoes={item.visualizacoes}/>) }
            </div>       
        </div>
    )
};

export default Home;