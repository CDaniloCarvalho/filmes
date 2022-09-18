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
    const [alertas, setAlertas] = useState();

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
            setData(resultado.data().data)
            setHora(resultado.data().hora)
            setFotoAtual(resultado.data().foto)
        })
    }
    },[carregando])
    
    function atualizar(){
        setMsgTipo(null);
        setCarregando(1);

        if(!titulo, !tipo, !data, !hora, !detalhes, !fotoNova ){
            setAlertas(true)
            setMsgTipo('erro');
            setCarregando(0);

        }else if(fotoNova){
            storage.ref(`imagens/${fotoNova.name}`).put(fotoNova);
            db.collection('Eventos').doc(props.match.params.id).update({
                titulo:titulo,
                tipo:tipo,
                detalhes:detalhes,
                data: data,
                hora: hora,
                foto: fotoNova ?  fotoNova.name : fotoAtual
            }).then(() => {
                setAlertas(true)
                setMsgTipo('sucesso');
                setCarregando(0);
            }).catch(() =>{
                setAlertas(true)
                setMsgTipo('erro');
                setCarregando(0);
            });
        }
           
    }

    function cadastrar(){
        setAlertas(true)
        setMsgTipo(null);
        setCarregando(1);

        if(!titulo, !tipo, !data, !hora, !detalhes, !fotoNova ){
            setMsgTipo('erro');
            setCarregando(0);

        }else{
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
                    setMsgTipo('sucesso');
                    setAlertas(true)
                    setCarregando(0);
                }).catch(() =>{
                    setMsgTipo('erro');
                    setAlertas(true)
                    setCarregando(0);
                });
                
            });
        }   

    }

    return(

        <div>
            <Navbar/>
             {/* Mensagem de erro ou sucesso*/}
             <div className=" text-white text-center ">
                    {   alertas &&
                        <div  className="position-fixed top-0 end-0 p-3 delay">
                            <div  className={`rounded p-2 alert  alert-${ msgTipo === 'erro' ?  'warning' : 'success'}`}>                                
                                <div class="toast-body">
                                    {msgTipo === 'sucesso' && <span><strong>Wow!</strong>Eventos cadastrado com sucesso! &#128526;</span>}
                                    {msgTipo === 'erro' && <span> Não foi possivel realizar a publicação! &#128546;</span>}
                                    <button onClick={fecharAlerta} type="button" class="btn-close"></button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            <div className="aln col mx-auto border border-1 p-5 mt-4 rounded bg-white ">

                <div className="row">
                    <h3 className="mx-auto font-weitgh-bold text-center mt-4">{props.match.params.id ? 'Editar Dados' : 'Novo Evento' }</h3>
                </div>

                <form className="form row">
                    <div className=" col-md-6">
                        <label className="aln ">Titulo:</label><span className="text-danger "> *</span>
                        <input onChange={(e) => setTitulo(e.target.value)} type="text" className="form-control" value={titulo && titulo}/>
                    </div>

                    <div className=" col-md-6" >
                        <label className=" ">Tipo do Evento:</label><span className="text-danger "> *</span>
                        <select onChange={(e) => setTipo(e.target.value)}className="form-control" value={ tipo && tipo } rows="3">
                            <option disabled selected value>-- Selecione um Tipo --</option>
                            <option>Festa</option>
                            <option>Teatro</option>
                            <option>Show</option>
                            <option>Evento</option>
                        </select>
                    </div>    

                    <div className=" mt-3 col-md-6">
                        <label>Data:</label><span className="text-danger "> *</span>
                        <input onChange={(e) => setData(e.target.value)} type="date" className="form-control " value={ data && data }  />
                    </div>

                    <div className=" mt-3 col-md-6">
                        <label>Hora:</label><span className="text-danger "> *</span>
                        <input onChange={(e) => setHora(e.target.value)} type="time" className="form-control" value={ hora && hora }  />
                    </div>

                    <div className=" mt-3 col-md-12">
                        <label>Detalhes:</label><span className="text-danger "> *</span>
                        <textarea onChange={(e) => setDetalhes(e.target.value)} className="form-control" value={ detalhes && detalhes } rows="3"/>
                    </div>

                    <div className=" col-md-12">
                        <label>Foto</label><span className="text-danger "> *</span>
                        <input onChange={(e) => setFotoNova(e.target.files[0])} type="file" className="form-control col-md-4"/>
                    </div>

                    <div className=' col-md-4'>
                        {
                            carregando >0 ? <div className="text-center" ><i className="fas fa-spin fa-spinner mt-3 fa-3x "></i></div>
                            : <button onClick={props.match.params.id ? atualizar : cadastrar} type="button" className="btn btn-primary btn-lg btn-block mt-3 mb-3 ">{props.match.params.id ? 'Atualizar' : 'Cadastrar' }</button>
                        }
                    </div>
                </form>

            </div>
        </div>
    )
}

export default EventoCadastro;