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
    const [errors, setErrors] = useState({});
    

    const validate = () => {
        let newErrors = {};
        if (!email) newErrors.email = "Email é obrigatório";
        if (!senha) newErrors.senha = "Senha é obrigatório";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const dispatch = useDispatch();

    const fecharAlerta = () => {
        setAlertas(false)
    }

    function logar() {
        setAlertas(false)
        setMsgTipo(null);
        if (!validate()) return;
        setCarregando(1);

        Firebase.auth().signInWithEmailAndPassword(email, senha).then(() => {
            setCarregando(0);
            setTimeout(() => {
                dispatch({ type: 'LOG_IN', usuarioEmail: email });
            }, 1000);

        }).catch(error => {
            setCarregando(0);
            setAlertas(true)
            switch (error.message) {
                case 'There is no user record corresponding to this identifier. The user may have been deleted.':
                setMsg('Não há registro de usuário correspondente a este e-mail!')
                break;

                case 'The password is invalid or the user does not have a password.':
                setMsg('A senha é inválida ou o usuário não possui uma senha!')
                break;

                case 'The email address is badly formatted.':
                setMsg('O formato do email é inválido!')
                break;

                default:
                setMsg('Entre em contato com administrador do sistema!');
                break;
            }
            setMsgTipo('erro')
        });
    }

    return (

        <div className="container p-2">
            {
                useSelector(state=> state.usuarioLogado) > 0 ? <Redirect to='/' /> : null
            }  
            <Alertas msgTipo={msgTipo} msg={msg} alertas={alertas} fecharAlerta={fecharAlerta} />
            <div className="login_form border rounded">
               { <form>
                    <div className=" mb-4">
                        <h4>Login</h4>
                    </div>

                    {/* Email input */}
                    <div className="form-group mb-4">
                        <label className="form-label" htmlFor="form3Example3">Email</label>
                        <input type="email" id="form3Example3" className={`form-control ${errors.email ? "is-invalid" : ""}`}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Digite seu email" />
                            {errors.email && (
                                <div className=" invalid-feedback">{errors.email}</div>
                            )}
                    </div>

                    {/* Password input */}
                    <div className="form-group mb-3">
                        <label className="form-label" htmlFor="form3Example4">Senha</label>
                        <input type="password" id="form3Example4" className={`form-control ${errors.senha ? "is-invalid" : ""}`} 
                            onChange={(e) => setSenha(e.target.value)}
                            placeholder="Digite sua senha" />
                            {errors.senha && (
                                <div className=" invalid-feedback">{errors.senha}</div>
                            )}
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
                        <button type="button" className="btn btn-primary "
                            onClick={logar}
                            style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>
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

                        <p className="small fw-bold text-center mt-3 pt-1 mb-0">
                            <Link to="/" className="link fs-4 mx-1">Acessar Sem Logar</Link>
                        </p>
                    </div>
                </form>}
            </div>
        </div>

    );
}

export default Login;
