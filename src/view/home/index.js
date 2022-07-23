import React, { useState, useEffect} from 'react';
import './home.css';
import Navbar from '../../components/navbar';
import {useSelector} from 'react-redux';
import Firebase from '../../config/firebase';
import EventoCard from '../../components/evento-card/';

function Home({match}){

    const [eventos, setEventos] = useState(['']);
    const [pesquisa, setPesquisa] = useState('');
    const [img, setImg] = useState('');
    let listaeventos = [];
    const usuarioEmail = useSelector(state => state.usuarioEmail);

    useEffect(() => {
     
        if(match.params.parametro){
            Firebase.firestore().collection('Eventos').where('usuario','==',usuarioEmail).get().then(async (resultado) => {
            await resultado.docs.forEach(doc =>{
                if(doc.data().titulo.indexOf(pesquisa) >= 0)
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
            Firebase.firestore().collection('Eventos').get().then(async (resultado) => {
                await resultado.docs.forEach(doc =>{
                    if(doc.data().titulo.indexOf(pesquisa) >= 0)
                    {
                        listaeventos.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    }
                })
                console.log(eventos.map(item => item.id))
                setEventos(listaeventos);
            });
        }
 
    },[]);

    return(
        <di>
            <Navbar/>    
            <div className="row p-3">
                <h3 className="text-center p-5">Publicações</h3>
                <input onChange={(e) => setPesquisa(e.target.value)} type="text" className="form-control text-center" placeholder="Pesquisar evento..."/>
            </div>

            {
                img ? <div className="row  mt-3 "><div class="spinner-border text-danger mx-auto"></div></div>
                : 
                <div className="row p-3">
                    {eventos.map (item => <EventoCard key={item.id} id={item.id} img={item.foto} titulo={item.titulo} detalhes={item.detalhes} visualizacoes={item.visualizacoes}/>) }
                </div>   
            }    
        </di>
    )
};

export default Home;