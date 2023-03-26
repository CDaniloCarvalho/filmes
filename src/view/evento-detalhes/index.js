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
    const [visualizarTrailer, setVisualizarTrailer] = useState(false)

    const abrirFecharVideo = () => {
        setVisualizarTrailer(!visualizarTrailer)
    }

    const videoEmbedCode = "https://www.youtube.com/embed/rR52uvkU4JE";


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

            <div className="container-fluid p-3">


                {
                carregando ? <div className="row  mt-5 "><div className="spinner-border text-primary mx-auto"></div></div>
                : 
                <div className=" main-detalhes rounded ">

                    <div className="row mt-2 " key={evento.id}>
                        <div className="col-lg-6">
                            <img src={urlImg} className="img-banner  rounded d-flex justify-content-center" alt="banner"/>
                            <div className='text-center mt-2'>
                                <i className="fas fa-eye mx-1"></i><span>{evento.visualizacoes + 1}</span>
                            </div>
                        </div>
                        
                        <div className="col-lg-6">
                            <h3 className='text-center mt-5 '><strong>{evento.titulo}</strong></h3>
                        
                            <div className="mt-5">
                                <div className=" text-center">
                                    <h5><strong>Gênero:</strong> {evento.tipo}</h5>
                                </div>
                                
                                <div className=" text-center overflow-hidden mt-4">
                                    <p>{evento.detalhes}</p>
                                </div>

                                <div className=" text-center overflow-hidden mt-4">
                                    <button className='btn-trailer btn btn-secondary btn-sm ' onClick={abrirFecharVideo}>Ver trailer</button>
                                </div>
                            </div>    
                        </div>
                        
                        {visualizarTrailer && 
                            <><div className='modal-container row' onClick={abrirFecharVideo}>
                            <label className='btn-fechar' title='Fechar' onClick={abrirFecharVideo}>&#10006;</label>


                            <div className="trailer">
                                <div className="trailer">
                                    <iframe
                                        src={evento.trailer + "?autoplay=1&"}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                                        allowFullScreen
                                    />
                                </div>
                            </div>

                            </div> 
                        </>}

                        <div className='botoes-editar col-lg-12 d-flex justify-content-between'>

                            {
                            usuarioLogado === evento.usuario  ? 
                            <Link to={`/editarevento/${props.match.params.id}`} className="btn-editar btn-primary ma-0"><i className="fas fa-pen-square fa-2x"></i></Link>    
                                :''   
                            }

                            {
                                usuarioLogado === evento.usuario  ?  <label onClick={remover} type="button" className=" ma-0 hover text-danger mb-1"><i className=" align-content-end btn-exlcuir fas fa-trash-alt fa-2x"></i></label>
                                : ''
                            }
                        </div>
                    </div>
                        
                </div>
                }

            </div>
        </>    )
}


export default EventoDetalhes;
