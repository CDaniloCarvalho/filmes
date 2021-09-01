import React, { useState } from 'react';
import './login.css';
import { Link, Redirect } from 'react-router-dom';
import firebase from '../../config/firebase';
import 'firebase/auth';
import {useSelector, useDispatch} from 'react-redux';

function Login(){
    
    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msgTipo, setMsgTipo] = useState();

    const dispatch =  useDispatch();

    function logar(){

        firebase.auth().signInWithEmailAndPassword(email, senha).then(resultado => {
           setMsgTipo('Sucesso');
           setTimeout(() => {
            dispatch({type:'LOG_IN', usuarioEmail:email});
           },2000);
           
        }).catch(erro => {
            setMsgTipo('Erro');
        });
    }
    
    return(
        
        <div className="login-content  align-items-center">
            {
                useSelector(state=> state.usuarioLogado) > 0 ? <Redirect to='/' /> : null
            }

            <form className="form-signin mx-auto">
                <div className='text-center'>
                    <i class=" logo fas fa-bahai text-white fa-7x mb-3 "></i>
                    <h1 className="h3 mb-3 font-weight-normal text-center text-white font-weight-bold">Login</h1>
                </div>

                <input onChange={(e) => setEmail(e.target.value)} type="email" class="form-control my-3" placeholder="Email" />            
                <input onChange={(e) => setSenha(e.target.value)} type="password" class="form-control my-3" placeholder="Senha" />
            
                <div className="btn-p">
                <button onClick={logar} className="w-100 btn btn-lg btn-login" type="button">Entrar</button>
                </div>
                <div className="msg-login text-white text-center my-5"> 

                    {msgTipo === 'Sucesso' && <span><strong>Wow!</strong> Login realizado com sucesso! &#128526;</span>}   
                    {msgTipo === 'Erro' && <span><strong>Ops!</strong> Verifique se o usuário e senha estão corretos. &#128546;</span>}
                    

                </div>
                
                <div className="opcoes-login text-center mt-5"> 
                    <Link to="recuperarsenha" className="mx-2">Recuperar Senha</Link>
                        <span className="text-white">&#10022;</span>
                    <Link to="novousuario" className="mx-2">Quero Cadastrar</Link>
                </div>
            </form>
        </div>
     
    );
}

export default Login;
