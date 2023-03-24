import {createStore} from 'redux';
import usuarioReducer from './usuarioReducer';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'filmes',
    storage
}

const persistdReducer = persistReducer(persistConfig, usuarioReducer);
const store = createStore(persistdReducer);
const persistor = persistStore(store);
export  {store, persistor};