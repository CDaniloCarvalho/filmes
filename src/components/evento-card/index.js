import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import firebase from '../../config/firebase'
import './evento-card.css';

function EventoCard({id, img, titulo, detalhes, visualizacoes}){

    const [urlImagem, setUrlImagem] = useState ();

    useEffect(() => {
        firebase.storage().ref(`imagens/${img}`).getDownloadURL().then(url => setUrlImagem(url));
    }, [urlImagem]);

    return(
        <div className="col-md-3 col-sm-12 ">
        {
            !img ? <div className="row  mt-3 "><div class="spinner-border text-danger mx-auto"></div></div>
            :<img src={urlImagem} className="card-img-top img-cartao" alt="Imagem"/>
        }

            <div className="card-body">
                <h1>{titulo}</h1>
                <p className="card-text text-justify">
                    {detalhes}
                </p>

                <div className="row rodape-card d-flex align-items-center">
                    <div className="col-6">
                        <Link to={"/eventodetalhes/" + id} className="btn btn-sn btn-detalhes"> + Detalhes</Link>
                    </div>
                    <div className="col-6 text-rigth">
                        <i className="fas fa-eye"></i> <span>{visualizacoes}</span>
                    </div>
                    
                </div>
            </div>
        </div>  
    )
}

export default EventoCard;