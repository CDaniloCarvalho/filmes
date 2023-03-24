import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import firebase from '../../config/firebase'
import './evento-card.css';

function EventoCard({id, img, titulo, detalhes, visualizacoes}){

    const [urlImagem, setUrlImagem] = useState ();

    useEffect(() => {
        firebase.storage().ref(`imagens/${img}`).getDownloadURL().then(url => setUrlImagem(url));
    }, [img]);

    return(
        <div className="col-md-3 col-sm-12 ">
        {
            !img ? <div className="row  mt-3 "><div className="spinner-border text-primary mx-auto"></div></div>
            :
            <Link to={"/eventodetalhes/" + id}><img src={urlImagem} className="card-img-top img-cartao rounded" alt="Imagem"/></Link>
        }
            <div className="card-body">
                <Link to={"/eventodetalhes/" + id} className="tex-home-detalhes" >
                    <h1 className=' overflow-hidden text-nowrap'>{titulo}</h1>
                    <p className=" card-text text-justify overflow-hidden ">
                        {detalhes}
                    </p>
                </Link>
                <div className="row rodape-card d-flex align-items-center mb-3">
                    <div className="col-8 mt-2">
                        <Link to={"/eventodetalhes/" + id} className="btn btn-sn btn-detalhes"> Ver mais </Link>
                    </div>
                    <div className="col-4 text-rigth text-dark">
                        <i className="fas fa-eye"></i> <span>{visualizacoes}</span>
                    </div>                    
                </div>
            </div>
        </div>  
    )
}

export default EventoCard;