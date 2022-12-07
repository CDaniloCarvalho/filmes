import React, {  useState } from 'react';
import './navbar.css';
import {useSelector, useDispatch} from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Search from '../pesquisa';


function Navbar({search}){
    const dispatch = useDispatch();
    const [nav, setNav] = useState(true)

    return(

        <>  {   useSelector(state=> state.usuarioLogado) > 1 && <Redirect to="/login" />   }
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">            
                    <button onClick={() => setNav(!nav)} className="menu rounded " type="button">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    
                    <div className="navbar-collapse" >
                        <ul className="navbar-nav mx-auto  mb-lg-0">
                        {nav ? <>       
                            <li className="nav-item me-5"><Link className="nav-link " to="/">Início</Link></li>
                            <li className="nav-item me-5"><Link className="nav-link " to="/eventocadastro">Publicar</Link></li>            
                            <li className="nav-item me-5"><Link className="nav-link " to="/eventos/meus">Minhas publicações</Link></li>            
                            <li className="nav-item me-5"><Link className="nav-link " to="/login" onClick={()=>   dispatch({type:'LOG_OUT'})}>Sair</Link></li>  
                            </>: ''}
                        </ul>
                        <span className={`search col-3 ${nav && 'd-block'}`}>
                            <Search search={search}  />
                        </span>
                    </div>
                </div>
            </nav>
        </> 
    )
}

export default Navbar;