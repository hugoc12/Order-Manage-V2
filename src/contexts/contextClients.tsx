import { createContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from 'prop-types'

type TypeAddress = {
    rua?:string,
    numero?:string,
    bairro?:string,
    cep?:string,
    cidade?:string,
    estado?:string
}

type TypeUserData = {
    nome?:string,
    email?:string,
    phone?:string,
    register?:string,
    address?:TypeAddress
}

type ClientContextType = {
    namesResult: Array<any>
    setNamesResult: React.Dispatch<React.SetStateAction<Array<any>>>

    listNames: Array<any>
    setListNames: React.Dispatch<React.SetStateAction<Array<any>>>

    userSelected: Array<any>
    setUserSelected: React.Dispatch<React.SetStateAction<Array<any>>>

    dataUserSelected:TypeUserData
    setDataUserSelected:React.Dispatch<React.SetStateAction<TypeUserData>>

    ordersClient: Array<any>
    setOrdersClient:React.Dispatch<React.SetStateAction<Array<any>>>

    colPedidos:Boolean
    setColPedidos:React.Dispatch<React.SetStateAction<Boolean>>

    colDadosPessoais:Boolean
    setColDadosPessoais:React.Dispatch<React.SetStateAction<Boolean>>
}

export const ContextClient = createContext<ClientContextType | undefined>(undefined)

function ContextClientsProvider({ children }) {
    const [userSelected, setUserSelected] = useState<Array<any>>([]);
    const [dataUserSelected, setDataUserSelected] = useState({})
    const [ordersClient, setOrdersClient] = useState<Array<any>>([])
    const [namesResult, setNamesResult] = useState<Array<any>>([]);
    const [listNames, setListNames] = useState<Array<any>>([]);
    const [colPedidos, setColPedidos] = useState<Boolean>(false);
    const [colDadosPessoais, setColDadosPessoais] = useState<Boolean>(true);

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

    useEffect(()=>{
        
        async function getUser(user:Array<any>){
            try{
                //Busca dos dados do usuário
                await axios({
                    method:'get',
                    url:`http://localhost:3333/clients/${user[0]}`,
                    responseType:'json'
                }).then(function(response){
                    setDataUserSelected(response.data)
                })

                //Busca de pedidos
                await axios({
                    method:'get',
                    url:`http://localhost:3333/orders/${user[0]}`,
                    responseType:'json'
                }).then(function(response){
                    setOrdersClient(Object.entries(response.data))
                    //console.log(Object.entries(response.data))
                })
            }catch(err:any){
                return `ERR:${err}`
            }
        }
        if(userSelected.length == 2){
            console.log('user selected')
            getUser(userSelected)
        }

    }, [userSelected])

    return (
        <ContextClient.Provider value={{
            namesResult,
            setNamesResult,

            listNames,
            setListNames,

            userSelected,
            setUserSelected,

            dataUserSelected,
            setDataUserSelected,

            colPedidos,
            setColPedidos,

            colDadosPessoais,
            setColDadosPessoais,

            ordersClient,
            setOrdersClient
        }}>
            {children}
        </ContextClient.Provider>
    );
}

ContextClientsProvider.propTypes = {
    children: PropTypes.node.isRequired
}


export default ContextClientsProvider;