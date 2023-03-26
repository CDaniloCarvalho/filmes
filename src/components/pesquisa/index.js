

import React from 'react';

function Search({search}){
   
    return(
        <div className='input-group input-group-sm' >
            <input onChange={search} type="text" className="form-control text-center " placeholder="Pesquisar..."/>
        </div>
    )
}

export default Search;