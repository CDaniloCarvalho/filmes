import React from 'react';
import './navbar.css';
import {useSelector, useDispatch} from 'react-redux';
import { Redirect, Link } from 'react-router-dom';


function Navbar(){
    const dispatch = useDispatch();
    return(
            <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid ">
                    
                <i class="fas fa-bahai text-white fa-2x "></i>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <i className="fas fa-bars text-white"></i>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item "><Link className="nav-link " aria-current="page" to="/">Início</Link></li>
                            
                            { 
                                    useSelector(state=> state.usuarioLogado) > 0 ?
                                <>
                                    <li className="nav-item"><Link className="nav-link " aria-current="page" to="/eventocadastro">Publicar</Link></li>            
                                    <li className="nav-item"><Link className="nav-link " aria-current="page" to="/eventos/meus">Minhas publicações</Link></li>            
                                    <li className="nav-item"><Link className="nav-link " aria-current="page" to="/login" onClick={()=>   dispatch({type:'LOG_OUT'})}>Sair</Link></li>  
                                </>
                                    :
                                    <Redirect to="/login" />     
                            }

                        </ul>
                    </div>
                </div>
        </nav>
    )
}

export default Navbar;