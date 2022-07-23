import React, {useState} from 'react';
import firebase from '../../config/firebase';
import 'firebase/auth';
import './usuario-novo.css';
import Navbar from '../../components/navbar';


function NovoUsuario(){

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [msg, setMsg] = useState();
    const [carregando, setCarregando] = useState();

    function cadastrar(){

        setCarregando(1);

        setMsgTipo(null);

        if(!email || !senha){
            setMsgTipo('erro')
            setCarregando(0);
            setMsg('Você precisa informar o email e senha para realizar o cadastro!')
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(email, senha).then(resultado=> {
            setCarregando(0);
            setMsgTipo('sucesso')
        }).catch(erro =>{
            setCarregando(0);
            setMsgTipo('erro')

            switch(erro.message)
            {
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

    return(

        <div className='main-login'>

            <Navbar/>   

            <div className="form-cadastro">
                <form className="text-center form-login mx-auto mt-5">
                    <h1 className="h3 mb-3 text-black font-weight-bold">Cadastro</h1>

                    <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control my-2" placeholder="Email"/>
                    <input onChange={(e) => setSenha(e.target.value)} type="password" className="form-control my-2" placeholder="Senha"/>
                    {
                        carregando ? <div ><i className="fas fa-spin fa-spinner mt-3 fa-3x"></i></div>
                        : <button onClick={cadastrar} type="button" className="btn btn-primary btn-lg btn-block mt-3 mb-5 btn-cadastro">Cadastrar</button>
                    }
                    
                    <div className="msg-login text-black text-center my-5"> 
                        {msgTipo === 'sucesso' && <span><strong>Wow!</strong> Cadastro realizado com sucesso! &#128526;</span>}   
                        {msgTipo === 'erro' && <span><strong>Ops!</strong> {msg} &#128546;</span>}
                    </div>

                </form>
            </div>
        </div>    
    )
}

export default NovoUsuario;