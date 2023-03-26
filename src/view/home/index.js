import React, { useState, useEffect} from 'react';
import './home.css';
import Navbar from '../../components/navbar';
import {useSelector} from 'react-redux';
import firebase from '../../config/firebase';
import Card from '../../components/card';
function Home({match}){

    const [data, setData] = useState([]);
    const [pesquisa, setPesquisa] = useState('');
    const [carregando, setCarregando] = useState(true);
    let listData = [];
    const usuarioEmail = useSelector(state => state.usuarioEmail);

    const search = event => {
        setPesquisa(event.target.value);
    }    

    useEffect(() => {
        if(match.params.parametro){

            firebase.firestore().collection('Eventos').where('usuario','==',usuarioEmail).get().then(async (resultado) => {
                await resultado.docs.forEach(doc =>{
                    if(doc.data().titulo.toUpperCase().indexOf(pesquisa.toUpperCase()) >= 0)
                    {
                        listData.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    }
                })
                setData(listData);
                setCarregando(false);
            });

        }else{
            firebase.firestore().collection('Eventos').get().then(async (resultado) => {
                await resultado.docs.forEach(doc =>{
                    if(doc.data().titulo.toUpperCase().indexOf(pesquisa.toUpperCase()) >= 0)
                    {
                        listData.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    }
                })
                setData(listData);
                setCarregando(false);
            });
        }

    },[pesquisa]);

    return(  
        <div className="container-fluid">
            <Navbar search={search} />  
            {carregando ?  
                
                <div className="row  mt-5 "><i className=" text-center text-primary fs-1 fas fa-spin fa-spinner"></i></div>
            :
                <div className="lista-filmes row p-2 mx-auto">
                    <div className="col-lg-12 mx-auto ">
                        <div className="main-home rounded">
                            <div className="row p-3 mx-auto ">
                                <h3 className="text-center p-4 ">Filmes</h3>
                            </div>
                            <div className="row p-3 mx-auto">
                                {data.map (item => <Card key={item.id} id={item.id} img={item.foto} titulo={item.titulo} detalhes={item.detalhes} visualizacoes={item.visualizacoes}/>) }
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>   
    )
};

export default Home;