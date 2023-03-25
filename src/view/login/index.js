import React, { useState } from 'react';
import '../../index.css';
import { Link, Redirect } from 'react-router-dom';
import Firebase from '../../config/firebase';
import 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import Alertas from '../../components/alerta';
function Login() {

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [msg, setMsg] = useState();
    const [alertas, setAlertas] = useState();
    const [carregando, setCarregando] = useState();

    const dispatch = useDispatch();

    const fecharAlerta = () => {
        setAlertas(false)
    }

    function logar() {

        setCarregando(1);
        setMsgTipo(null);

        if (!email || !senha) {
            setCarregando(0);

            setMsgTipo('erro')
            setMsg('Você precisa informar o email e senha para realizar o login!')
            setAlertas(true)
            console.log('teste')
            return;
        }

        Firebase.auth().signInWithEmailAndPassword(email, senha).then(() => {
            setCarregando(0);
            setTimeout(() => {
                dispatch({ type: 'LOG_IN', usuarioEmail: email });
            }, 1000);

        }).catch(() => {
            setCarregando(0);
            setMsgTipo('erro');
            setMsg('Verifique o email e senha digitados')
            setAlertas(true)
        });
    }

    return (

        <div className="container p-2">
            {
                useSelector(state=> state.usuarioLogado) > 0 ? <Redirect to='/' /> : null
            }  
            <Alertas msgTipo={msgTipo} msg={msg} alertas={alertas} fecharAlerta={fecharAlerta} />
            <div className="login_form border rounded">
                <form>
                    <div className=" mb-4">
                        <h4>Login</h4>
                    </div>

                    {/* Email input */}
                    <div className="form-group mb-4">
                        <label className="form-label" htmlFor="form3Example3">Email</label>
                        <input type="email" id="form3Example3" className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Digite seu email" />
                    </div>

                    {/* Password input */}
                    <div className="form-group mb-3">
                        <label className="form-label" htmlFor="form3Example4">Senha</label>
                        <input type="password" id="form3Example4" className="form-control"
                            onChange={(e) => setSenha(e.target.value)}
                            placeholder="Digite sua senha" />
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-3">
                        {/* Checkbox */}
                        <div className="form-check">
                            <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                            <label className="form-check-label" htmlFor="form2Example3">
                                Lembrar
                            </label>
                        </div>
                        <Link to="recuperarsenha" className="text-white">Esqueceu a senha?</Link>
                    </div>
                    <div className="text-center text-lg-start">
                        <button type="button" className="btn btn-primary btn-block"
                            onClick={logar}>
                            {
                                carregando ? <span>
                                    <i className="fas fa-spin fa-spinner"></i> Carregando
                                </span>
                                    : <span>Logar</span>
                            }
                        </button>
                        <p className="small fw-bold mt-2 pt-1 mb-0">Não tem uma conta?
                            <Link to="novousuario" className="link-danger mx-1">Criar Conta</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>

    );
}

export default Login;
