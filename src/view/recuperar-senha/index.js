import React, { useState } from 'react';
import './recuperar-senha.css';
import Firebase from '../../config/firebase';
import 'firebase/auth';
import Footer from '../../components/footer';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';


function RecuperarSenha(){

    const [email, setEmail] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [msg, setMsg] = useState();
    const [alertas, setAlertas] = useState();
    const [carregando, setCarregando] = useState();

    const fecharAlerta = () => {
        setAlertas(false)
    }

    function redefinir(){
        setCarregando(1)

        if (!email) {
            setCarregando(0);
            setMsgTipo('erro')
            setMsg('Você precisa informar o email!')
            setAlertas(true)
            return;
        }
        Firebase.auth().sendPasswordResetEmail(email).then(resultado => {
            setCarregando(0)
            setMsgTipo('sucesso')
            setMsg('Enviamos um link no seu email para você redefinir a senha!' )
            setAlertas(true)
        }).catch(erro => {
            setCarregando(0)
            setMsgTipo('erro')
            setMsg('Verifique se o email digitado está correto!')
            setAlertas(true)
        })
    }

    return(
        <>

        <div className="container-flex main-login vh-100">
            { useSelector(state=> state.usuarioLogado) > 0 ? <Redirect to='/' /> : null }
            
                <div className="container-fluid h-custom">
                        {/* Mensagem de erro ou sucesso*/}
                        <div className="msg-login text-white text-center ">
                            {   alertas &&
                                <div  className="position-fixed top-0 end-0 p-3 delay">
                                    {/* <div  class={`${ "bg-warning rounded p-2" }` }> */}
                                    <div  className={`rounded p-2 alert  alert-${ msgTipo === 'erro' ?  'warning' : 'success'}`}>
                                        
                                        <div class="toast-body">
                                            {msgTipo === 'erro' && <span><i className="fas fa-exclamation-triangle"></i> {msg} </span>}
                                            {msgTipo === 'sucesso' && <span>{msg} &#128526;</span>}
                                            <button onClick={fecharAlerta} type="button" class="btn-close"></button>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="login_form col-md-8 col-lg-6 col-xl-4  border rounded">
                            <form>
                                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start mb-4">
                                    <h4>Recuperar Senha</h4>
                                </div>

                                {/* Email input */}
                                <div className="form-outline mb-4">
                                    <input type="email" id="form3Example3" className="form-control"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Digite seu email" />
                                    <label className="form-label" htmlFor="form3Example3">Email</label>
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    <Link to="login" className="text-white">Realizar login</Link>
                                </div>
                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <button type="button" className="btn btn-primary"
                                        onClick={redefinir}
                                        style={{paddingLeft: "2.5rem", paddingRight: "2.5rem"}}>
                                        {
                                            carregando ? <span>
                                                <i className="fas fa-spin fa-spinner "></i> Carregando
                                            </span>
                                            : <span>Recuperar Senha</span>
                                        }
                                    </button>
                                    <p className="small fw-bold mt-2 pt-1 mb-0">Não tem uma conta?  
                                        <Link to="novousuario" className="link-danger mx-1">Criar Conta</Link>
                                    </p>
                                </div>
                            </form>
                        </div> 
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}

export default RecuperarSenha;