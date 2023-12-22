import { createContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from 'prop-types'

export const Context = createContext({})

function ContextClientsProvider({ children }) {
    const names = [
        ['Bu5bDx4hEYvZKG8sJqid', 'Hugo de Oliveira Pinho'],
        ['zzZ3VL83O6GTjYA7KmoY', 'Murilo de Oliveira Pinho'],
        ['zzZ3VL83O6GTjYA7Ktry', 'Maria de Oliveira Pinho'],
        ['zzZ3VL83O6GTjYA7Ktry', 'Edvaldo Pinho']
    ]

    const [listNames, setListNames] = useState([]);
    const [textTyped, setTextTyped] = useState([]);
    useEffect(() => {
        let regxp = new RegExp(`^${textTyped}`)
        const namesFilters = names.filter((el)=>regxp.exec(el[1]))
        setListNames(namesFilters)
        //Mount Component
/*         async function getClientsNames() {
            try {
                await axios({
                    method: "get",
                    url: "",
                    responseType: "json"
                }).then((resp) => {
                    console.log(resp.data)
                })
            } catch (err: any) {
                return 'ERRO AO BUSCAR OS NOMES!'
            }
        } */
    }, [textTyped])

    return (
        <Context.Provider value={{
            listNames,
            setListNames,

            textTyped,
            setTextTyped,

            names
        }}>
            {children}
        </Context.Provider>
    );
}

ContextClientsProvider.propTypes = {
    children: PropTypes.node.isRequired
}


export default ContextClientsProvider;