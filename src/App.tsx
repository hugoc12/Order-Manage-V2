import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Pedidos from './pages/pedidos';
import Produtos from './pages/produtos';
import Clients from './pages/clientes';
import ContextPedidosProvider from './contexts/contextPedidos';
import ContextClientsProvider from './contexts/contextClients';

const browser = createBrowserRouter([
  {
    path:'/pedidos',
    element:<ContextPedidosProvider><Pedidos/></ContextPedidosProvider>
  },

  {
    path:'/clientes',
    element:<ContextClientsProvider><Clients/></ContextClientsProvider>
  },

  {
    path:'/produtos',
    element:<Produtos/>
  }
])

function App() {
  return (
    <RouterProvider router={browser}/>
  );
}

export default App;