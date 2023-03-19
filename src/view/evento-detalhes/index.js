import React, { useState, useEffect} from 'react';
import './evento-detalhes.css';
import { Link, Redirect } from 'react-router-dom';
import {useSelector} from 'react-redux';
import Firebase from '../../config/firebase';
import Navbar from '../../components/navbar';


function EventoDetalhes(props){

    const [evento, setEvento] = useState({});
    const [urlImg, setUrlImg] = useState({});
    const usuarioLogado = useSelector(state =>state.usuarioEmail);
    const [carregando, setCarregando] = useState(1);
    const [excluir, setExcluir] = useState(0);

    function remover (){
        Firebase.firestore().collection('Eventos').doc(props.match.params.id).delete().then(() =>{
            setExcluir(1)
        })
    }

    useEffect(() => {
        if(carregando){
            Firebase.firestore().collection('Eventos').doc(props.match.params.id).get().then(resultado =>   {
            setEvento(resultado.data())
            Firebase.firestore().collection('Eventos').doc(props.match.params.id).update('visualizacoes', resultado.data().visualizacoes + 1)
            Firebase.storage().ref(`imagens/${resultado.data().foto}`).getDownloadURL().then(url => {
                setUrlImg(url)
                setCarregando(0);
            });       
        });
        }else{
            Firebase.storage().ref(`imagens/${evento.foto}`).getDownloadURL().then(url => setUrlImg(url))
        }
    },[evento.foto, carregando, props.match.params.id])

    return(
        <>
            <Navbar/>  

            {excluir  ? <Redirect to='/' /> : null}

            <div className="container-fluid main-detalhes rounded">

                {
                carregando ? <div className="row  mt-5 "><div className="spinner-border text-danger mx-auto"></div></div>
                : 
                <div>
                    <div className="row mt-2 p-2" key={evento.id}>
                        <div className="col-4">
                            <img src={urlImg} className="img-banner rounded z-3" alt="banner"/>
                        </div>
                        <div className="col-8">
                            <h3 className='text-center mt-5 text-shadow'><strong>{evento.titulo}</strong></h3>
                        
                            <div className="row  mt-5">
                            <div className="col-12 text-center">
                                <h5>Detalhes</h5>
                            </div>
                            
                            <div className="col-12 text-center overflow-hidden">
                                <p>{evento.detalhes}</p>
                            </div>
                            </div>    
                        </div>
                        <div className="col-12 text-right mt-1 visualizacoes">
                            <i className="fas fa-eye"></i><span>{evento.visualizacoes + 1}</span>
                        </div>
                    </div>


                    {
                        usuarioLogado === evento.usuario  ? 
                        <Link to={`/editarevento/${props.match.params.id}`} className="btn-editar"><i className="fas fa-pen-square fa-3x"></i></Link>    
                        :''   
                    }

                    {
                        usuarioLogado === evento.usuario  ?  <button onClick={remover} type="button" className=""><i className=" btn-exlcuir fas fa-trash-alt fa-3x"></i></button>
                        : ''
                    }
                        
                </div>
                }

            </div>
        </>    )
}


export default EventoDetalhes;
