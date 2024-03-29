import React, {  useState } from 'react';
import './navbar.css';
import { useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import Search from '../pesquisa';

function Navbar({search}){
    const dispatch = useDispatch();
    const [nav, setNav] = useState(false)
    const usuario = JSON.parse(localStorage.getItem('persist:filmes'));
    console.log(usuario.usuarioLogado);

    return(

        <>  
            { usuario.usuarioLogado === '1' ? <div className="menu">
                         
                <button onClick={() => setNav(!nav)} className="menu-btn rounded mb-2 " type="button">
                    <span className="fs-2">&#9776;</span>
                </button>

                <ul class="menu-superior">
                    <li className='links'><Link className="menu-link" to="/">Início</Link></li>
                    <li className='links'><Link className="menu-link" to="/cadastro">Publicar</Link></li>
                    <li className='links'><Link className="menu-link" to="/home/meus">Minhas publicações</Link></li>
                    <li className={`search`}> <Search search={search} /></li>
                    <li className='sair'><Link to="/login" onClick={()=>   dispatch({type:'LOG_OUT'})}>&#10095; Sair</Link></li> 
                </ul>
            
                <ul className="menu-responsivo">    
                    <li className={`search`}> <Search search={search} /></li>  
                    <li className='sair'><Link to="/login" onClick={()=>   dispatch({type:'LOG_OUT'})}>&#10095; Sair</Link></li>
                    <li className={`menu-link2 ${ nav ? 'd-block' : 'd-none'} `}><Link className="n-link " to="/">Início</Link></li>
                    <li className={`menu-link2 ${ nav ? 'd-block' : 'd-none'}`}><Link className="n-link " to="/cadastro">Publicar</Link></li>            
                    <li className={`menu-link2 ${ nav ? 'd-block' : 'd-none'}`}><Link className="n-link " to="/home/meus">Minhas publicações</Link></li>            
                </ul> 
                                         
            </div> :
            <div className="menu">
                         
                <button onClick={() => setNav(!nav)} className="menu-btn rounded mb-2 " type="button">
                    <span className="fs-2">&#9776;</span>
                </button>
                <ul class="menu-superior">
                    <li className='links'><Link className="menu-link" to="/">Início</Link></li>
                    <li className='links'><Link className="menu-link" to="/login" onClick={()=>   dispatch({type:'LOG_OUT'})}> Logar</Link></li> 
                </ul>
            
                <ul className="menu-responsivo">    
                    <li className={`menu-link2 ${ nav ? 'd-block' : 'd-none'} `}><Link className="n-link" to="/">Início</Link></li>            
                    <li className={`menu-link2 ${ nav ? 'd-block' : 'd-none'} `}><Link  className="n-link" to="/login" onClick={()=>   dispatch({type:'LOG_OUT'})}>Logar</Link></li>
                </ul> 
                                         
            </div>
            }
        </> 
    )
}

export default Navbar;