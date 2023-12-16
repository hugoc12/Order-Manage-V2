import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Pedidos from './pages/pedidos';
import Produtos from './pages/produtos';
import ContextPedidosProvider from './contexts/contextPedidos';

const browser = createBrowserRouter([
  {
    path:'/pedidos',
    element:<ContextPedidosProvider><Pedidos/></ContextPedidosProvider>
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