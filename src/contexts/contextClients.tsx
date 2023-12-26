import { createContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from 'prop-types'

type ClientContextType = {
    namesResult: Array<any>,
    setNamesResult: React.Dispatch<React.SetStateAction<Array<Array<any>>>>,
    listNames: Array<any>,
    setListNames: React.Dispatch<React.SetStateAction<Array<any>>>
}

export const ContextClient = createContext<ClientContextType | undefined>(undefined)

function ContextClientsProvider({ children }) {

    const [namesResult, setNamesResult] = useState<Array<any>>([]);
    const [listNames, setListNames] = useState<Array<any>>([]);

    useEffect(() => {
        async function getNames() {
            try {
                await axios({
                    method: 'get',
                    url: 'http://localhost:3333/clientsnames',
                    responseType: 'json',
                }).then(function (response) {
                    const data = Object.entries(response.data);
                    setListNames(data)
                })
            } catch (err) {
                console.log(`HOUVE UM ERRO AO CARREGAR OS NOMES: ${err}`)
            }
        }

        getNames()
    }, [])

    return (
        <ContextClient.Provider value={{
            namesResult,
            setNamesResult,

            listNames,
            setListNames
        }}>
            {children}
        </ContextClient.Provider>
    );
}

ContextClientsProvider.propTypes = {
    children: PropTypes.node.isRequired
}


export default ContextClientsProvider;