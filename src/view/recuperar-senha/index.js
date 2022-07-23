import React, { useState } from 'react';
import './recuperar-senha.css';
import Firebase from '../../config/firebase';
import 'firebase/auth';
import Footer from '../../components/footer';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';


function RecuperarSenha(){

    const [email, setEmail] = useState();
    const [msg, setMsg] = useState();
    const [carregando, setCarregando] = useState();

    function redefinir(){
        setCarregando(1)

        if (!email) {
            setCarregando(0);
            setMsg('Você precisa informar o email!')
            return;
        }
        Firebase.auth().sendPasswordResetEmail(email).then(resultado => {
            setCarregando(0)
            setMsg('Enviamos um link no seu email para você redefinir a senha!' );
        }).catch(erro => {
            setCarregando(0)
            setMsg('Verifique se o email digitado está correto!');
        })
    }

    return(
        <>

        <div className="container-flex main-login vh-100">
            { useSelector(state=> state.usuarioLogado) > 0 ? <Redirect to='/' /> : null }
            
                <div className="container-fluid h-custom">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="msg-login text-white text-center ">  
                        <span>{msg}</span>
                    </div>
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