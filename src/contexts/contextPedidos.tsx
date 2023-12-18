import {createContext} from 'react';
import PropTypes from 'prop-types';

export const Context = createContext({})

function ContextPedidosProvider({children}){
    return(
        <Context.Provider value={{
        }}>
            {children}
        </Context.Provider>
    )
}

ContextPedidosProvider.propTypes = {
    children:PropTypes.node.isRequired
}


export default ContextPedidosProvider