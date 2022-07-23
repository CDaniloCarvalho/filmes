import React, { useState } from 'react';
import firebase from '../../config/firebase';
import 'firebase/auth';
import './usuario-novo.css';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';


function NovoUsuario() {

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [msg, setMsg] = useState();
    const [carregando, setCarregando] = useState();

    function cadastrar() {

        setCarregando(1);

        setMsgTipo(null);

        if (!email || !senha) {
            setMsgTipo('erro')
            setCarregando(0);
            setMsg('Você precisa informar o email e senha para realizar o cadastro!')
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(email, senha).then(resultado => {
            setCarregando(0);
            setMsgTipo('sucesso')
        }).catch(erro => {
            setCarregando(0);
            setMsgTipo('erro')

            switch (erro.message) {
                case 'Password should be at least 6 characters':
                    setMsg('A senha deve ter pelo menos 6 caracteres!')
                    break;
                case 'The email address is already in use by another account.':
                    setMsg('Este email já está sendo utilizado por outro usuário!')
                    break;
                case 'The email address is badly formatted.':
                    setMsg('O formato do email é inválido!')
                    break;
                default:
                    setMsg('Não foi possível cadastrar. Tente mais tarde!');
                    break;
            }
        })
    }

    return (

        <div className='main-novo container-flex'>
                { useSelector(state => state.usuarioLogado) > 0 ? <Redirect to='/' /> : null }


                <section class="vh-100 ">
                    <div class="container-fluid h-custom">
                        <div class="row d-flex justify-content-center align-items-center h-100">
                        <div className=" msg_resposta text-white text-center ">
                            {msgTipo === 'sucesso' && <span>Cadastro realizado com sucesso! &#128526;</span>}
                            {msgTipo === 'erro' && <span>{msg} &#128546;</span>}
                        </div>
                            <div class="login_novo col-md-8 col-lg-6 col-xl-4 border rounded">
                                <form>
                                
                                    <div class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start mb-4">
                                        <h2>Criar conta</h2>
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

                                    {/* Checkbox */}
                                    <div class="d-flex justify-content-between align-items-center">
                                        <Link to="recuperarsenha" className="text-white">Esqueceu a senha?</Link>
                                    </div>
                                    <div class="text-center text-lg-start mt-4 pt-2">
                                            <button onClick={cadastrar} type="button" class="btn btn-primary btn-lg"
                                                style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>
                                                {
                                                    carregando ? <span>Carregando <i className="fas fa-spin fa-spinner "></i></span>
                                                        : <span>Cadastrar</span>
                                                }
                                            </button>
                                        <p class="small fw-bold mt-2 pt-1 mb-0">Já tem uma conta?
                                            <Link to="login" className="link-danger mx-1">Realizar login</Link>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div
                        class="opacity-25 d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 ">
                        {/*  Copyright  */}
                        <div class="text-white mb-3 mb-md-0  ">
                            <strong class="Copyright">Copyright © 2022. Danilo Carvalho.</strong>
                        </div>
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
                    </div>
                </section>
            </div>





        
    )
}

export default NovoUsuario;