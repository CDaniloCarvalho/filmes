import React, { useState } from 'react';
import './login.css';
import { Link, Redirect } from 'react-router-dom';
import firebase from '../../config/firebase';
import 'firebase/auth';
import {useSelector, useDispatch} from 'react-redux';
import logo from '../../img/logo.png'
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
        
        <div className="container-flex main-login">
            {
                useSelector(state=> state.usuarioLogado) > 0 ? <Redirect to='/' /> : null
            }
            {/* 
            
                <div className="msg-login text-white text-center my-5"> 
                    {msgTipo === 'Sucesso' && <span><strong>Wow!</strong> Login realizado com sucesso! &#128526;</span>}   
                    {msgTipo === 'Erro' && <span><strong>Ops!</strong> Verifique se o usuário e senha estão corretos. &#128546;</span>}
                </div>
                
            </form> 
            */}
    <section class="vh-100">
        <div class="container-fluid h-custom">
            <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-md-9 col-lg-6 col-xl-3">
                <img src={logo}
                class="img-fluid" alt="image" />
            </div>
            <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <form>
                <div class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start mb-4">
                    <h2>Login</h2>
                </div>

                {/* Email input */}
                <div class="form-outline mb-4">
                    <input type="email" id="form3Example3" class="form-control form-control-lg"
                     onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite seu email" />
                    <label class="form-label" for="form3Example3">Email</label>
                </div>

                {/* Password input */}
                <div class="form-outline mb-3">
                    <input type="password" id="form3Example4" class="form-control form-control-lg"
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Digite sua senha" />
                    <label class="form-label" for="form3Example4">Senha</label>
                </div>

                <div class="d-flex justify-content-between align-items-center">
                {/* Checkbox */}
                    <div class="form-check mb-0">
                    <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                    <label class="form-check-label" for="form2Example3">
                        Lembrar
                    </label>
                    </div>
                    <Link to="recuperarsenha" className="text-white">Esqueceu a senha?</Link>

                </div>

                <div class="text-center text-lg-start mt-4 pt-2">
                    <button type="button" class="btn btn-primary btn-lg"
                    onClick={logar}
                    style={{paddingLeft: "2.5rem", paddingRight: "2.5rem"}}>Logar</button>
                    <p class="small fw-bold mt-2 pt-1 mb-0">Não tem uma conta?  
                        <Link to="novousuario" className="link-danger mx-1">Criar Conta</Link>
                    </p>
                </div>

                </form>
            </div>
            </div>
        </div>
        <div
            class="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
            {/*  Copyright  */}
            <div class="text-white mb-3 mb-md-0">
            Copyright © 2022. Danilo Carvalho.
            </div>
        

            {/* Right  */}
            <div>
            <a href="#!" class="text-white me-4">
                <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#!" class="text-white me-4">
                <i class="fab fa-twitter"></i>
            </a>
            <a href="#!" class="text-white me-4">
                <i class="fab fa-google"></i>
            </a>
            <a href="#!" class="text-white">
                <i class="fab fa-linkedin-in"></i>
            </a>
            </div>
            {/* Right */}
        </div>
    </section>
</div>
     
    );
}

export default Login;
