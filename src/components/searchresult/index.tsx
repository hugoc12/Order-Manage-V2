import { useContext } from "react";
import { ContextClient } from "../../contexts/contextClients";
import './style.css';

function SearchResult() {
    const context = useContext(ContextClient)

    function autoCompleteInputName(user){
        const inputName = (document.getElementById('inputName') as HTMLInputElement)
        inputName.value = `${user[1]}`
        context?.setNamesResult([]) //CLEAR BOX RESULTS
        context?.setUserSelected(user) // DEFINE USER SELECT IN INPUT TEXT
    }
    return (
        <div className="containerResults">
             <ul className="ulClients">
                {context?.namesResult.map((el)=>
                    <li className="itemList" key={el[0]} onClick={(e)=>autoCompleteInputName(el)}>{el[1]}</li>
                )}
             </ul>
        </div>
    );
}

export default SearchResult;