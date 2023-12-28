import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Spinner, Navbar, Container } from "react-bootstrap";

import "./style.css";
import SideMenu from "../../components/side-menu/side-menu";

import Backspace from "../../assets/backspace.png";
import Edit from "../../assets/edit.png";
import Sidebar from '../../assets/sidebar.png';

function Pedidos() {
  type dataOrder = {
    client: {
      name: string;
      address: {
        rua: string;
        numero: number;
        bairro: string;
        cidade: string;
        estado: string;
        cep: string;
      };
    };
    date: string;
    status: string;
    rastreio: string;
    idClient: string
  };
  type dataArray = [string, dataOrder][];

  const [orders, setOrders] = useState<dataArray>([]);
  const [loadOrders, setLoadOrders] = useState<boolean>(true);

  useEffect(() => {
    async function getOrders() {
      try {
        await axios({
          method: "get",
          url: "http://localhost:3333/orders",
          responseType: "json",
        }).then(function (response) {
          const dataArray: dataArray = Object.entries(response.data);
          setOrders(dataArray.reverse());
          setLoadOrders(false);
        });
      } catch (err) {
        setLoadOrders(true);
        console.log(err);
      }
    }

    getOrders();
  }, [loadOrders]);

  async function removeOrder(idClient, idOrder) {
    try {
      await axios({
        method: "delete",
        url: `http://localhost:3333/orders/delete/${idClient}/${idOrder}`
      }).then(function (response) {
        if (response.status == 200) {
          setLoadOrders(true)
        }
      })
    } catch (err) {
      console.log('Erro na requisição')
    }
  }

  return (
    <div>
      <Navbar className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">
            <Button variant="primary" className="bttMenu" onClick={() => {
              document.getElementById('mySidenav')!.style.width = "250px";
            }}><img className="bttMenuSide" src={Sidebar} alt="bttMenuSide"/></Button>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <SideMenu />

      {loadOrders ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nº PEDIDO</th>
              <th>CLIENT</th>
              <th>ENDEREÇO</th>
              <th>DATE</th>
              <th>RASTREIO</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((el: [string, dataOrder]) => {
              const orderNumber: string = el[0];
              const orderData: dataOrder = el[1];

              return (
                <tr key={orderNumber}>
                  <td>{orderNumber}</td>
                  <td>{orderData.client.name}</td>
                  <td>
                    {orderData.client.address.rua}{' - '}
                    {orderData.client.address.numero}{' - '}
                    {orderData.client.address.bairro}{' - '}
                    {orderData.client.address.cep}{' - '}
                    {orderData.client.address.cidade}{' - '}
                    {orderData.client.address.estado}
                  </td>
                  <td>{orderData.date}</td>
                  <td>{orderData.rastreio}</td>
                  <td>{orderData.status}</td>
                  <td>
                    <Button variant="danger" onClick={() => removeOrder(orderData.idClient, orderNumber)}>
                      <img className="btt" src={Backspace} alt="deleteOrder" />
                      
                    </Button>
                    <Button variant="primary">
                      <img className="btt" src={Edit} alt="deleteOrder" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default Pedidos;
