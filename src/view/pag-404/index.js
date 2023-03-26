import React from "react";
import { Link, Redirect } from 'react-router-dom';
import '../../index.css'

function Pagina404() {
    return(
        <div className="container text-center p-5">
            <h1 className="erro404 mt-5 mb-3 ">Erro 404</h1>
            <p className="erro404 fs-2">Desculpe, a página que você está procurando não foi encontrada.</p>
            <div className="mt-5 p-4">
                <li className="inicio btn btn-secondary btn-lg"><Link to="/">Voltar ao Início</Link></li>
            </div>
        </div>
    )
}

export default Pagina404;