

import React from 'react';

function Search({search}){
   
    return(
        <div className="input-group barra-pesquisa">
            <input onChange={search} type="text" className="form-control text-center " placeholder="Pesquisar..."/>
        </div>
    )
}

export default Search;