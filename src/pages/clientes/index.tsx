import { useContext, useEffect } from "react";
import { Button, Container, Navbar, Form } from "react-bootstrap";
import SideMenu from "../../components/side-menu/side-menu";
import Searchbar from "../../components/searchbar"; 
import { ContextClient } from "../../contexts/contextClients";
import Sidebar from '../../assets/sidebar.png';
import SearchResult from "../../components/searchresult";
import './style.css'

function Clients() {
  const context = useContext(ContextClient);

  useEffect(()=>{
    console.log(context?.dataUserSelected)
    if(context?.dataUserSelected.hasOwnProperty('nome')){
      const inputName = (document.getElementById('name') as HTMLInputElement)
      //console.log(inputName)
      //console.log(context?.dataUserSelected.hasOwnProperty('nome'))
      inputName.value = `${context.dataUserSelected.nome}`
    }
  }, [context?.dataUserSelected])

  return (
    <div>
      <Navbar className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">
            <Button
              variant="primary"
              className="bttMenu"
              onClick={() => {
                document.getElementById("mySidenav")!.style.width = "250px";
              }}
            >
              <img className="bttMenuSide" src={Sidebar} alt="bttMenuSide" />
            </Button>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <SideMenu/>
      <Searchbar/>
      {context!.namesResult.length > 0 ? <SearchResult/>:<></>}

      <Form id="formDataUser" className="formDataUser">
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" id="name"/>
      </Form.Group>

      <Form.Group>
        <Form.Label>Register</Form.Label>
        <Form.Control type="text" placeholder="CPF/CNPJ"/>
      </Form.Group>
      </Form>
    </div>
  );
}

export default Clients;
