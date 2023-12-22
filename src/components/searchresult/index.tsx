import { useState, useContext } from "react";
import { Context } from "../../contexts/contextClients";
import './style.css';

function SearchResult(props) {

    const context = useContext(Context)
    //console.log(context.listNames)
    return (
        <div className="containerResults">
             <ul className="ulClients">
                {context.listNames.map((el)=>
                    <li className="itemList">{el[1]}</li>
                )}
             </ul>
        </div>
    );
}

export default SearchResult;