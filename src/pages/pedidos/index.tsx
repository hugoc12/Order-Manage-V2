import { useContext } from "react";
import { Context } from "../../contexts/contextPedidos";

type objContext= {
    myName?:string
}

function Pedidos() {
    const context:objContext = useContext(Context)

    return (
        <div>
            <h1>PAGE PEDIDOS - {context.myName}</h1>
        </div>
    );
}

export default Pedidos;