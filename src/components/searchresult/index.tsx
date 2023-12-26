import { useContext } from "react";
import { ContextClient } from "../../contexts/contextClients";
import './style.css';

function SearchResult() {

    const context = useContext(ContextClient)
    //console.log(context.listNames)
    return (
        <div className="containerResults">
             <ul className="ulClients">
                {context?.namesResult.map((el)=>
                    <li className="itemList" key={el[0]}>{el[1]}</li>
                )}
             </ul>
        </div>
    );
}

export default SearchResult;