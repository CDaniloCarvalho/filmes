import React, { useState } from 'react';
import './recuperar-senha.css';
import Firebase from '../../config/firebase';
import 'firebase/auth';
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Alertas from '../../components/alerta';


function RecuperarSenha() {

    const [email, setEmail] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [msg, setMsg] = useState();
    const [alertas, setAlertas] = useState();
    const [carregando, setCarregando] = useState();

    const fecharAlerta = () => {
        setAlertas(false)
    }

    function redefinir() {
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
            setMsg('Enviamos um link no seu email para você redefinir a senha!')
            setAlertas(true)
        }).catch(erro => {
            setCarregando(0)
            setMsgTipo('erro')
            setMsg('Verifique se o email digitado está correto!')
            setAlertas(true)
        })
    }

    return (
        <>


            <div className="container">
                {useSelector(state => state.usuarioLogado) > 0 ? <Redirect to='/' /> : null}
                    <Alertas msgTipo={msgTipo} msg={msg} alertas={alertas} fecharAlerta={fecharAlerta} />
                <div className="login_form  border rounded">
                    <form className="py-3">
                        <div className="mb-4">
                            <h4>Recuperar Senha</h4>
                        </div>

                        {/* Email input */}
                        <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="form3Example3">Email</label>
                            <input type="email" id="form3Example3" className="form-control"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Digite seu email" />
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                            <Link to="login" className="text-white">Realizar login</Link>
                        </div>
                        <div className="text-center text-lg-start mt-4 pt-2">
                            <button type="button" className="btn btn-primary"
                                onClick={redefinir}
                                style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>
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
        </>
    )
}

export default RecuperarSenha;