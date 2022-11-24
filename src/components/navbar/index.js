import React, { useState } from 'react';
import './navbar.css';
import {useSelector, useDispatch} from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Search from '../pesquisa';


function Navbar({search}){
    const dispatch = useDispatch();
    const [nav, setNav] = useState(true)
    return(

        <>  {   useSelector(state=> state.usuarioLogado) > 1 && <Redirect to="/login" />   }
            <nav class="navbar navbar-expand-lg">
                <div class="container-fluid">            
                    <button onClick={() => setNav(!nav)} className="navbar-brand rounded" type="button">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class=" navbar-collapse" >
                        {nav ? <>       
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item "><Link className="nav-link " to="/">Início</Link></li>
                            <li className="nav-item"><Link className="nav-link " to="/eventocadastro">Publicar</Link></li>            
                            <li className="nav-item"><Link className="nav-link " to="/eventos/meus">Minhas publicações</Link></li>            
                            <li className="nav-item"><Link className="nav-link " to="/login" onClick={()=>   dispatch({type:'LOG_OUT'})}>Sair</Link></li>  
                            
                        </ul>
                        <span className='col-4'>
                            <Search search={search}  />
                        </span>
                        </>: ''}
                    </div>
                </div>
            </nav>
        </> 
    )
}

export default Navbar;