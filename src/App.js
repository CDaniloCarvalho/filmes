import React from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {store, persistor} from '../src/store/';
import {PersistGate} from 'redux-persist/integration/react';
import Home from './view/home';
import Login from './view/login';
import NovoUsuario from './view/usuario-novo';
import recuperarSenha from './view/recuperar-senha';
import Cadastro from './view/cadastro';
import Detalhes from './view/detalhes';
import Pagina404 from './view/pag-404';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/home/:parametro' component={Home} />
            <Route exact path='/novousuario' component={NovoUsuario} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/recuperarsenha' component={recuperarSenha} />
            <Route exact path='/cadastro' component={Cadastro} />
            <Route exact path='/detalhes/:id' component={Detalhes} />
            <Route exact path='/editar/:id' component={Cadastro} />
            <Route component={Pagina404} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>

  );
}

export default App;
