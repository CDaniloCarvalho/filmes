import React, { useState } from 'react';
import Firebase from '../../config/firebase';
import 'firebase/auth';
import '../../index.css';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Alertas from '../../components/alerta';


function NovoUsuario() {

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

    const fecharAlerta = () => {
        setAlertas(false)
    }

    function cadastrar() {
        setAlertas(false)
        setMsgTipo(null);
        if (!validate()) return;
            setCarregando(1);
        Firebase.auth().createUserWithEmailAndPassword(email, senha).then(() => {
            setCarregando(0);
            setMsgTipo('sucesso')
            setMsg('Cadastro realizado com sucesso!')
            setAlertas(true)
            setTimeout(() => {<Redirect to='/' />},1000)
        }).catch(erro => {
            setCarregando(0);
            setAlertas(true)
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
                setMsg('Entre em contato com administrador do sistema!');
                break;
            }
            setMsgTipo('erro')
        })
    }

    return (

        <div className='container'>
            { useSelector(state => state.usuarioLogado) > 0 ? <Redirect to='/' /> : null }

            <Alertas msgTipo={msgTipo} msg={msg} alertas={alertas} fecharAlerta={fecharAlerta} />
            
            <div className="login_form border rounded">
                <form>
                    <div className=" mb-4">
                        <h4>Criar conta</h4>
                    </div>

                    <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form3Example3">Email</label>
                        <input type="email" id="form3Example3" className={`form-control ${errors.email ? "is-invalid" : ""}`}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Digite seu email" />
                        {errors.email && (
                            <div className=" invalid-feedback">{errors.email}</div>
                        )}
                    </div>

                    <div className="form-outline mb-3">
                        <label className="form-label" htmlFor="form3Example4">Senha</label>
                        <input type="password" id="form3Example4" className={`form-control ${errors.senha ? "is-invalid" : ""}`} 
                            onChange={(e) => setSenha(e.target.value)}
                            placeholder="Digite sua senha" />
                            {errors.senha && (
                                <div className=" invalid-feedback">{errors.senha}</div>
                            )}
                    </div>

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
        
    )
}

export default NovoUsuario;