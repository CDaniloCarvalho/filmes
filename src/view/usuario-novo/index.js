import React, { useState } from 'react';
import Firebase from '../../config/firebase';
import 'firebase/auth';
import './usuario-novo.css';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Footer from '../../components/footer';


function NovoUsuario() {

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [msg, setMsg] = useState();
    const [alertas, setAlertas] = useState();
    const [carregando, setCarregando] = useState();

    const fecharAlerta = () => {
        setAlertas(false)
    }

    function cadastrar() {
        setAlertas(true)
        setCarregando(1);

        setMsgTipo(null);

        if (!email || !senha) {
            setMsgTipo('erro')
            setCarregando(0);
            
            setMsg('Você precisa informar o email e senha para realizar o cadastro!')
            return;
        }

        Firebase.auth().createUserWithEmailAndPassword(email, senha).then(() => {
            setCarregando(0);
            setMsgTipo('sucesso')
            setTimeout(() => {<Redirect to='/' />},1000)
        }).catch(erro => {
            setCarregando(0);
            
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
                setMsgTipo('erro')
        })
    }

    return (

        <div className='main-novo container-flex vh-100'>
            { useSelector(state => state.usuarioLogado) > 0 ? <Redirect to='/' /> : null }

                <div className="container-fluid h-custom ">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                    
                    {/* Mensagem de erro ou sucesso*/}
                    <div className="msg-login text-white text-center">

                    {   alertas &&
                        <div  className="position-fixed top-0 end-0 p-3 delay">
                            {/* <div  class={`${ "bg-warning rounded p-2" }` }> */}
                            <div  className={`rounded p-2 alert  alert-${ msgTipo === 'erro' ?  'warning' : 'success'}`}>
                                
                                <div class="toast-body">
                                    {msgTipo === 'erro' && <span><i className=" fas fa-exclamation-triangle"></i> {msg} </span>}
                                    {msgTipo === 'sucesso' && <span>Cadastro realizado com sucesso! &#128526;</span>}
                                    <button onClick={fecharAlerta} type="button" class="btn-close"></button>
                                </div>
                            </div>
                        </div>
                    }

                    </div>

                        <div className="login_novo col-md-8 col-lg-6 col-xl-4 border rounded">
                            <form>
                                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start mb-4">
                                    <h4>Criar conta</h4>
                                </div>

                                {/* Email input */}
                                <div className="form-outline mb-4">
                                    <input type="email" id="form3Example3" className="form-control "
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Digite seu email" />
                                    <label className="form-label" htmlFor="form3Example3">Email</label>
                                </div>

                                {/* Password input */}
                                <div className="form-outline mb-3">
                                    <input type="password" id="form3Example4" className="form-control "
                                        onChange={(e) => setSenha(e.target.value)}
                                        placeholder="Digite sua senha" />
                                    <label className="form-label" htmlFor="form3Example4">Senha</label>
                                </div>

                                {/* Checkbox */}
                                <div className="d-flex justify-content-between align-items-center">
                                    <Link to="recuperarsenha" className="text-white">Esqueceu a senha?</Link>
                                </div>
                                <div className="text-center text-lg-start mt-4 pt-2">
                                    
                                    <button onClick={cadastrar} type="button" className="btn btn-primary"
                                        style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>
                                        {carregando ? <span>Carregando <i className="fas fa-spin fa-spinner "></i></span>
                                        :<span>Cadastrar</span>}
                                    </button>
                                    
                                    <p className="small fw-bold mt-2 pt-1 mb-0">Já tem uma conta?
                                        <Link to="login" className="link-danger mx-1">Realizar login</Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            <Footer />
        </div>
        
    )
}

export default NovoUsuario;