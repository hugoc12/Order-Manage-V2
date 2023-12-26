import './style.css'
import { useContext } from 'react';
import { ContextClient } from '../../contexts/contextClients';
import { FaSearch } from 'react-icons/fa';

function Searchbar() {
    const context = useContext(ContextClient);

    return (
        <div className='searchBarContainer'>
            <div className='searchbar'>
                <FaSearch size={30} />
                <input type='text' placeholder='type to search...' className='inputText' onChange={(txt) => {
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
            </div>
        </div>
    );
}

export default Searchbar;