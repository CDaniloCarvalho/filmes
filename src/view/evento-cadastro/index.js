import React, { useState, useEffect } from 'react';
import './evento-cadastro.css';
import {useSelector} from 'react-redux';
import Firebase from '../../config/firebase';
import Navbar from '../../components/navbar';
import { Redirect } from 'react-router';


function EventoCadastro(props){

    const [carregando, setCarregando] = useState();
    const [msgTipo, setMsgTipo] = useState();
    const [titulo, setTitulo] = useState();
    const [tipo, setTipo] = useState();
    const [detalhes, setDetalhes] = useState();
    const [data, setData] = useState();
    const [hora, setHora] = useState();
    const [fotoAtual, setFotoAtual] = useState();
    const [fotoNova, setFotoNova] = useState();
    const usuarioEmail = useSelector(state => state.usuarioEmail);

    const storage = Firebase.storage();
    const db = Firebase.firestore();
    
    
    useEffect(() => {
        
        if(props.match.params.id){
            Firebase.firestore().collection('Eventos').doc(props.match.params.id).get().then(resultado =>   {
            setTitulo(resultado.data().titulo)
            setTipo(resultado.data().tipo)
            setDetalhes(resultado.data().detalhes)
            setData(resultado.data().data)
            setHora(resultado.data().hora)
            setFotoAtual(resultado.data().foto)
        })
    }
    },[carregando])
    

    function atualizar(){
        setMsgTipo(null);
        setCarregando(1);

        if(fotoNova)
        storage.ref(`imagens/${fotoNova.name}`).put(fotoNova);
            db.collection('Eventos').doc(props.match.params.id).update({
                titulo:titulo,
                tipo:tipo,
                detalhes:detalhes,
                data: data,
                hora: hora,
                foto: fotoNova ?  fotoNova.name : fotoAtual
            }).then(() => {
                setMsgTipo('Sucesso');
                setCarregando(0);
            }).catch(erro =>{
                setMsgTipo('Erro');
                setCarregando(0);
            });
           
    }


    function cadastrar(){
        setMsgTipo(null);
        setCarregando(1);

        storage.ref(`imagens/${fotoNova.name}`).put(fotoNova).then(()=>{
            db.collection('Eventos').add({
                titulo:titulo,
                tipo:tipo,
                detalhes:detalhes,
                data: data,
                hora: hora,
                usuario: usuarioEmail,
                visualizacoes: 0,
                foto: fotoNova.name,
                publico: 1,
                criacao: new  Date()
            }).then(() => {
                setMsgTipo('Sucesso');
                setCarregando(0);
            }).catch(erro =>{
                setMsgTipo('Erro');
                setCarregando(0);
            });
            
        });

    }

    return(

        <>
            <Navbar/>
            
            <div className="aln col mx-auto">
                <div className="row">
                    <h3 className="mx-auto font-weitgh-bold text-center mt-4">{props.match.params.id ? 'Editar Dados' : 'Novo Evento' }</h3>
                </div>

                <form className="form">
                    <div className="form-group">
                        <label className="aln">Titulo:</label>
                        <input onChange={(e) => setTitulo(e.target.value)} type="text" className="form-control" value={titulo && titulo}/>
                    </div>

                    <div className="form-group mt-2 " >
                        <label className=" ">Tipo do Evento:</label>
                        <select onChange={(e) => setTipo(e.target.value)}className="form-control" value={ tipo && tipo } rows="3">
                            <option disabled selected value>-- Selecione um Tipo --</option>
                            <option>Festa</option>
                            <option>Teatro</option>
                            <option>Show</option>
                            <option>Evento</option>
                        </select>
                      
                        <label>Data:</label>
                        <input onChange={(e) => setData(e.target.value)} type="date" className="form-control " value={ data && data }  />
                    
                        <label>Hora:</label>
                        <input onChange={(e) => setHora(e.target.value)} type="time" className="form-control" value={ hora && hora }  />
                    </div>

                    <div className="form-group mt-3">
                        <label>Detalhes:</label>
                        <textarea onChange={(e) => setDetalhes(e.target.value)} className="form-control" value={ detalhes && detalhes } rows="3"/>
                    </div>

                    <div className="form-group mt-3 row">
                       
                    </div>

                    <div className="form-group">
                        <label>Foto</label>
                        <input onChange={(e) => setFotoNova(e.target.files[0])} type="file" className="form-control"/>
                    </div>
                    <div className='row '>
                        {
                            carregando >0 ? <div className="text-center" ><i className="fas fa-spin fa-spinner mt-3 fa-3x "></i></div>
                            : <button onClick={props.match.params.id ? atualizar : cadastrar} type="button" className="btn btn-lg btn-block mt-3 mb-3 btn-cadastro">{props.match.params.id ? 'Atualizar' : 'Cadastrar' }</button>
                        }
                    </div>
                   
                </form>

                <div className="msg-login text-center "> 
                    {msgTipo === 'Sucesso' && <span><strong>Wow!</strong>Eventos cadastrado com sucesso! &#128526;</span>}   
                    {msgTipo === 'Erro' && <span><strong>Ops!</strong> Não foi possivel publicar o eventos! &#128546;</span>}
                </div>

            </div>
        </>
    )
}

export default EventoCadastro;