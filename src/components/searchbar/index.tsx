import './style.css'
import { useContext } from 'react';
import { ContextClient } from '../../contexts/contextClients';
import { FaSearch } from 'react-icons/fa';
import { HiOutlineDocumentSearch } from "react-icons/hi";

function Searchbar() {
    const context = useContext(ContextClient);

    return (
        <div className='searchBarContainer'>
            <div className='searchbar'>
                
                <input type='text' placeholder='type to search...' id='inputName' className='inputText' onChange={(txt) => {
                    if(txt.target.value){
                        let regxp = new RegExp(`${txt.target.value}`)
                        const namesFilters:any = context?.listNames.filter((el)=>regxp.exec(el[1]))
                        context?.setNamesResult(namesFilters)
                    }else{
                        context?.setNamesResult([])
                    }

                }
                }
                />
                <HiOutlineDocumentSearch size={45} class='iconSearch'/>
            </div>
        </div>
    );
}

export default Searchbar;