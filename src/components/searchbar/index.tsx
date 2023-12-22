import './style.css'
import { useContext } from 'react';
import { Context } from '../../contexts/contextClients';
import { FaSearch } from 'react-icons/fa';

function Searchbar(props) {
    const context = useContext(Context);

    return (
        <div className='searchBarContainer'>
            <div className='searchbar'>
                <FaSearch size={30} />
                <input type='text' placeholder='type to search...' className='inputText' onChange={(txt) => {
                    context.setTextTyped(txt.target.value)
                }
                } />
            </div>
            <div className='searchresult'>

            </div>
        </div>
    );
}

export default Searchbar;