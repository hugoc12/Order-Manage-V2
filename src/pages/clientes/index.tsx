import { useContext, useEffect } from "react";
import { Button, Container, Navbar, Form, Row, Col, InputGroup } from "react-bootstrap";
import SideMenu from "../../components/side-menu/side-menu";
import Searchbar from "../../components/searchbar";
import { ContextClient } from "../../contexts/contextClients";
import Sidebar from '../../assets/sidebar.png';
import SearchResult from "../../components/searchresult";
import './style.css'
import axios from "axios";

function Clients() {
  const context = useContext(ContextClient);

  useEffect(() => {
    console.log(context?.dataUserSelected)
    if (context?.dataUserSelected.hasOwnProperty('nome')) {
      const inputName = (document.getElementById('name') as HTMLInputElement)
      const inputEmail = (document.getElementById('email') as HTMLInputElement)
      const inputPhone = (document.getElementById('phone') as HTMLInputElement)
      const inputRegister = (document.getElementById('register') as HTMLInputElement)
      const inputCep = (document.getElementById('cep') as HTMLInputElement)
      const inputRua = (document.getElementById('rua') as HTMLInputElement)
      const inputNumero = (document.getElementById('numero') as HTMLInputElement)
      const inputBairro = (document.getElementById('bairro') as HTMLInputElement)
      const inputCidade = (document.getElementById('cidade') as HTMLInputElement)
      const inputEstado = (document.getElementById('estado') as HTMLInputElement)

      inputName.value = `${context.dataUserSelected.nome}`
      inputEmail.value = `${context.dataUserSelected.email}`
      inputPhone.value = `${context.dataUserSelected.phone}`
      inputRegister.value = `${context.dataUserSelected.register}`
      inputCep.value = `${context.dataUserSelected.address?.cep}`
      inputRua.value = `${context.dataUserSelected.address?.rua}`
      inputNumero.value = `${context.dataUserSelected.address?.numero}`
      inputBairro.value = `${context.dataUserSelected.address?.bairro}`
      inputCidade.value = `${context.dataUserSelected.address?.cidade}`
      inputEstado.value = `${context.dataUserSelected.address?.estado}`
    }
  }, [context?.dataUserSelected])

  async function editData(idInput: string, property: string, btt: HTMLElement) {
    const input = (document.getElementById(idInput) as HTMLInputElement)
    const idUser = context?.userSelected[0]

    if (!input.disabled) {
      // if == false - ou seja estou fazendo uma alteração btt save

      try {
        await axios.put(`http://localhost:3333/clients/${idUser}`, {
          [property]: input.value
        })

        input.disabled = true // desativando input
        btt.textContent = 'EDIT'
        btt.setAttribute('class', 'btn btn-outline-warning')
      } catch (err) {
        alert(`ERRO:${err}`)
      }
    } else { // se estiver desabilitado devo abilitar
      input.disabled = false
      btt.textContent = 'SAVE'
      btt.setAttribute('class', 'btn btn-outline-success')
    }
  }

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
      <SideMenu />
      <Searchbar />
      {context!.namesResult.length > 0 ? <SearchResult /> : <></>}

      <Form id="formDataUser" className="formDataUser">
        <fieldset>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <InputGroup>
              <Form.Control type="text" placeholder="Enter name" id="name" disabled />
              <Button variant="outline-warning" onClick={(e) => { editData('name', 'name', e.currentTarget) }}>EDIT</Button>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email" id="email" disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="text" placeholder="Phone" id="phone" disabled />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Register</Form.Label>
            <Form.Control type="text" placeholder="CPF/CNPJ" id="register" disabled />
          </Form.Group>

          <div className="containerAddress">
            <Form.Group as={Row} className="mb-3">
              <Col sm={4}>
                <Form.Label>Cep</Form.Label>
                <Form.Control type="text" placeholder="Cep" id="cep" disabled />
              </Col>
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Rua</Form.Label>
                  <Form.Control type="text" placeholder="Rua" id="rua" disabled />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Número</Form.Label>
                  <Form.Control type="text" placeholder="Número" id="numero" disabled />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Bairro</Form.Label>
                  <Form.Control type="text" placeholder="Bairro" id="bairro" disabled />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Cidade</Form.Label>
                  <Form.Control type="text" placeholder="Rua" id="cidade" disabled />
                </Form.Group>
              </Col>

              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Estado</Form.Label>
                  <Form.Control type="text" placeholder="Número" id="estado" disabled />
                </Form.Group>
              </Col>
            </Row>
          </div>
        </fieldset>
      </Form>
    </div>
  );
}

export default Clients;
