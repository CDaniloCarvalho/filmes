import React, { useState, useEffect } from 'react';
import './evento-cadastro.css';
import {useSelector} from 'react-redux';
import Firebase from '../../config/firebase';
import Navbar from '../../components/navbar';
import { Redirect } from 'react-router';
import Alertas from '../../components/alerta';

function EventoCadastro(props){

    const [carregando, setCarregando] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [msg, setMsg] = useState();
    const [titulo, setTitulo] = useState();
    const [tipo, setTipo] = useState();
    const [detalhes, setDetalhes] = useState();
    const [trailer, setTrailer] = useState();
    const [fotoAtual, setFotoAtual] = useState();
    const [fotoNova, setFotoNova] = useState();
    const [alertas, setAlertas] = useState();
    const [redirectFunc, setRedirectFunc] = useState(false);
    const usuarioEmail = useSelector(state => state.usuarioEmail);

    const storage = Firebase.storage();
    const db = Firebase.firestore();

    const fecharAlerta = () => {
        setAlertas(false)
    }
    
    useEffect(() => {
        
        if(props.match.params.id){
            Firebase.firestore().collection('Eventos').doc(props.match.params.id).get().then(resultado =>   {
            setTitulo(resultado.data().titulo)
            setTipo(resultado.data().tipo)
            setDetalhes(resultado.data().detalhes)
            setTrailer(resultado.data().trailer)
            setFotoAtual(resultado.data().foto)
        })
    }
    },[props.match.params.id])
    
    function atualizar(){
        setMsgTipo(null);
        setCarregando(1);

        if(!titulo || !tipo || !detalhes || !fotoNova ){
            setAlertas(true)
            setMsgTipo('erro');
            setMsg('Você precisa preencher os campos obrigatórios!')
            setCarregando(0);
            
            
        }else if(fotoNova){
            storage.ref(`imagens/${fotoNova.name}`).put(fotoNova);
            db.collection('Eventos').doc(props.match.params.id).update({
                titulo:titulo,
                tipo:tipo,
                detalhes:detalhes,
                trailer:trailer,
                foto: fotoNova ?  fotoNova.name : fotoAtual
            }).then(() => {
                setAlertas(true)
                setMsgTipo('sucesso');
                setMsg('Cadastro realizado com sucesso!')
                setCarregando(0);
                setTimeout(() => {
                    setRedirectFunc(true)
                }, 5000);
            }).catch(erro =>{
                setAlertas(true)
                setMsgTipo('erro');
                setMsg('Verifique os campos digitados')
                setCarregando(0);
            });
        }
           
    }

    function cadastrar(){
        setAlertas(true)
        setMsgTipo(null);
        setCarregando(1);

        if(!titulo || !tipo || !detalhes || !fotoNova ){
            setMsgTipo('erro');
            setMsg('Você precisa preencher os campos obrigatórios!')
            setCarregando(0);

        }else{
                storage.ref(`imagens/${fotoNova.name}`).put(fotoNova).then(()=>{
                    db.collection('Eventos').add({
                    titulo:titulo,
                    tipo:tipo,
                    detalhes:detalhes,
                    trailer:trailer,
                    usuario: usuarioEmail,
                    visualizacoes: 0,
                    foto: fotoNova.name,
                    publico: 1,
                    criacao: new  Date()
                }).then(() => {
                    setMsgTipo('sucesso');
                    setMsg('Cadastrado com Sucesso!')
                    setAlertas(true)
                    setCarregando(0);
                    setTimeout(() => {
                        setRedirectFunc(true)
                    }, 5000);
                }).catch(() =>{
                    setMsgTipo('erro');
                    setMsg('Verifique os dados digitados!')
                    setAlertas(true)
                    setCarregando(0);
                });
                
                
            });
        }   

    }

    return(

        <>
            <Navbar/>
            {redirectFunc ? <Redirect to="/" /> : ''  }
             
            <Alertas msgTipo={msgTipo} msg={msg} alertas={alertas} fecharAlerta={fecharAlerta} />

            <div className="main-cadastrar col mx-auto border border-1 p-4 mt-4 rounded ">

                <div className="row">
                    <h4 className="mx-auto font-weitgh-bold text-center mt-4">{props.match.params.id ? 'Editar Dados' : 'Cadastrar' }</h4>
                </div>

                <form className="form row mt-2">
                    <div className=" col-md-6 mt-4">
                        <label className=" ">Título:</label><span className="text-danger "> *</span>
                        <input onChange={(e) => setTitulo(e.target.value)} type="text" placeholder='Digite um título.' className="form-control" value={titulo}/>
                    </div>

                    <div className="tipo col-md-6 mt-4" >
                        <label>Gêneros:</label><span className="text-danger "> *</span>
                        <select onChange={(e) => setTipo(e.target.value)} className="form-control" value={ tipo } rows="3">
                            <option disabled selected value>-- Selecione um Gênero --</option>
                            <option>Ação</option>
                            <option>Comedia</option>
                            <option>Terror</option>
                            <option>Ficção</option>
                        </select>
                    </div>    

                    <div className=" mt-4 col-md-12">
                        <label>Detalhes:</label><span className="text-danger "> *</span>
                        <textarea onChange={(e) => setDetalhes(e.target.value)} className="form-control" placeholder='Digite informações do filme.'  value={ detalhes } />
                    </div>

                    <div className=" mt-4 col-md-6 mb-2">
                        <label>Foto</label><span className="text-danger "> *</span>
                        <input onChange={(e) => setFotoNova(e.target.files[0])} type="file" className="form-control col-md-4" />
                    </div>

                    <div className=" mt-4 col-md-6">
                        <label>Link trailer:</label><span className="text-danger"> *</span>
                        <input onChange={(e) => setTrailer(e.target.value)} placeholder='Ex: https://www.youtube.com/embed/djwhdjwh' className="form-control" value={ trailer } />
                    </div>

                    <div className=' col-md-12 btn-cadastrar '>
                        {
                            carregando >0 ? <div className="text-center" ><i className="fas fa-spin fa-spinner mt-3 fa-3x "></i></div>
                            : <button onClick={props.match.params.id ? atualizar : cadastrar} type="button" className="btn btn-primary mt-3">{props.match.params.id ? 'Atualizar' : 'Cadastrar' }</button>
                        }
                    </div>
                </form>

            </div>
        </>
    )
}

export default EventoCadastro;