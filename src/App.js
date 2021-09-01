import React from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {store, persistor} from '../src/store/';
import {persistGate} from 'redux-persist/integration/react';
import Home from './view/home';
import Login from './view/login';
import NovoUsuario from './view/usuario-novo';
import recuperarSenha from './view/recuperar-senha';
import EventoCadastro from './view/evento-cadastro';
import EventoDetalhes from './view/evento-detalhes';



function App() {
  return (
    <Provider store={store}>
      <persistGate loading={null} persistor={persistor}>
      <Router>
        <Route exact path='/' component={Home} />
        <Route path='/eventos/:parametro' component={Home} />
        <Route exact path='/novousuario' component={NovoUsuario} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/recuperarsenha' component={recuperarSenha} />
        <Route exact path='/eventocadastro' component={EventoCadastro} />
        <Route exact path='/eventodetalhes/:id' component={EventoDetalhes} />
        <Route exact path='/editarevento/:id' component={EventoCadastro} />
      </Router>
      </persistGate>
   </Provider>
  );
}

export default App;
