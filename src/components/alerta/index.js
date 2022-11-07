import React from "react";

function Alertas({msgTipo, msg, alertas, fecharAlerta}){
    
    return (
      
        //* Mensagem de erro ou sucesso *//
        <div className=" text-white text-center">
            {   alertas &&
                <div  className="position-fixed top-0 end-0 p-3 delay">
                    {/* <div  class={`${ "bg-warning rounded p-2" }` }> */}
                    <div  className={`rounded p-2 alert  alert-${ msgTipo === 'erro' ?  'warning' : 'success'}`}>
                        
                        <div class="toast-body">
                            {msgTipo === 'erro' && <span><i className="fas fa-exclamation-triangle"></i> {msg} </span>}
                            {msgTipo === 'sucesso' && <span>{msg} &#128526;</span>}
                            <button onClick={fecharAlerta} type="button" class="btn-close"></button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Alertas; 