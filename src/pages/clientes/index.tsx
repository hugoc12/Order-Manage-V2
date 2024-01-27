import { useContext, useEffect } from "react";
import { Button, Container, Navbar, Form, Row, Col, InputGroup, Table } from "react-bootstrap";
import { AiOutlineUser, AiOutlineShopping, AiOutlineCloseCircle  } from "react-icons/ai";
import SideMenu from "../../components/side-menu/side-menu";
import Searchbar from "../../components/searchbar";
import { ContextClient } from "../../contexts/contextClients";
import Sidebar from '../../assets/sidebar.png';
import SearchResult from "../../components/searchresult";
import './style.css'
import axios from "axios";

function Clients() {
  const context = useContext(ContextClient);

  useEffect(()=>{
    if(context?.colDadosPessoais == true && context?.userSelected.length == 2){ //USUÁRIO ENCONTRADO

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

      inputName.value = `${context?.dataUserSelected.nome}`
      inputEmail.value = `${context?.dataUserSelected.email}`
      inputPhone.value = `${context?.dataUserSelected.phone}`
      inputRegister.value = `${context?.dataUserSelected.register}`
      inputCep.value = `${context?.dataUserSelected.address?.cep}`
      inputRua.value = `${context?.dataUserSelected.address?.rua}`
      inputNumero.value = `${context?.dataUserSelected.address?.numero}`
      inputBairro.value = `${context?.dataUserSelected.address?.bairro}`
      inputCidade.value = `${context?.dataUserSelected.address?.cidade}`
      inputEstado.value = `${context?.dataUserSelected.address?.estado}`
    }
    
  }, [context?.colDadosPessoais])

  useEffect(() => {
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
      // if == false - fazendo uma alteração -> click btt save

      try {
        await axios.put(`http://localhost:3333/clients/${idUser}`, {
          [property]: input.value
        })

        input.disabled = true // desativando input
        btt.textContent = 'EDIT'
        btt.setAttribute('class', 'btn btn-outline-warning')

        if(property == 'name'){
          await axios.get('http://localhost:3333/clientsnames', {
            responseType:'json'
          }).then(function(response){
            const data = Object.entries(response.data)
            context?.setListNames(data)
          })
        }

      } catch (err) {
        alert(`ERRO:${err}`)
      }
    } else { // se estiver desabilitado devo abilitar -> click edit
      input.disabled = false
      btt.textContent = 'SAVE'
      btt.setAttribute('class', 'btn btn-outline-success')
    }
  }

  function screenCol(btt:React.MouseEvent<HTMLAnchorElement, MouseEvent>){
    //alert(`DADOS PESSOAIS - ${btt.currentTarget.textContent}`)
    const bttsMenu = [...document.querySelectorAll('.itemMenu')];
    bttsMenu.forEach((el)=>{
      el.setAttribute('class', 'itemMenu')
    })
    btt.currentTarget.setAttribute('class', 'itemMenu itemMenuActive')

    if(btt.currentTarget.textContent == 'Dados Pessoais'){
      console.log(btt.currentTarget.textContent)
      context?.setColPedidos(false)
      context?.setColDadosPessoais(true)

    }else if(btt.currentTarget.textContent == 'Pedidos'){
      console.log(btt.currentTarget.textContent)
      context?.setColPedidos(true)
      context?.setColDadosPessoais(false)
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

      <Container className="container_grid" fluid>
        <Row>
          {/*Side Menu*/}
          <Col sm={3} className="col col_menu">
            <div className="menu">
              <a href="#" className="itemMenu itemMenuActive" onClick={(e)=>screenCol(e)}><AiOutlineUser size={40} className="iconItem"/>Dados Pessoais</a>
              <a href="#" className="itemMenu" onClick={(e)=>screenCol(e)}><AiOutlineShopping size={40} className="iconItem"/>Pedidos</a>
              <a href="#" className="itemMenu"><AiOutlineCloseCircle size={40} className="iconItem"/> Remover</a>
            </div>
          </Col>

          {/*Col Dados Pessoais*/}
          {context?.colDadosPessoais ?           
          <Col sm={9} className="col">
            <Form id="formDataUser" className="formDataUser">
                <fieldset>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <InputGroup>
                      <Form.Control type="text" placeholder="Enter name" id="name" disabled />
                      <Button variant="outline-warning" onClick={(e) => editData('name', 'name', e.currentTarget)}>EDIT</Button>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <InputGroup>
                      <Form.Control type="email" placeholder="Email" id="email" disabled />
                      <Button variant="outline-warning" onClick={(e) => editData('email', 'email', e.currentTarget)}>EDIT</Button>
                    </InputGroup>

                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Phone</Form.Label>
                    <InputGroup>
                      <Form.Control type="text" placeholder="Phone" id="phone" disabled />
                      <Button variant="outline-warning" onClick={(e) => editData('phone', 'phone', e.currentTarget)}>EDIT</Button>
                    </InputGroup>
                    
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Register</Form.Label>
                    <InputGroup>
                      <Form.Control type="text" placeholder="Phone" id="register" disabled />
                      <Button variant="outline-warning" onClick={(e) => editData('register', 'register', e.currentTarget)}>EDIT</Button>
                    </InputGroup>
                  </Form.Group>

                  <div className="containerAddress">
                    <Form.Group as={Row} className="mb-3">
                      <Col sm={4}>
                        <Form.Label>Cep</Form.Label>
                        <InputGroup>
                          <Form.Control type="text" placeholder="Cep" id="cep" disabled />
                          <Button variant="outline-warning" onClick={(e) => editData('cep', 'address.cep', e.currentTarget)}>EDIT</Button>
                        </InputGroup>
                      </Col>
                    </Form.Group>

                    <Row>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>Rua</Form.Label>
                          <InputGroup>
                            <Form.Control type="text" placeholder="Rua" id="rua" disabled />
                            <Button variant="outline-warning" onClick={(e)=> editData('rua', 'address.rua', e.currentTarget)}>EDIT</Button>
                          </InputGroup>
                        </Form.Group>
                      </Col>

                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>Número</Form.Label>
                          <InputGroup>
                            <Form.Control type="text" placeholder="Número" id="numero" disabled />
                            <Button variant="outline-warning" onClick={(e)=> editData('numero', 'address.numero', e.currentTarget)}>EDIT</Button>
                          </InputGroup>
                        </Form.Group>
                      </Col>

                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>Bairro</Form.Label>
                          <InputGroup>
                            <Form.Control type="text" placeholder="Bairro" id="bairro" disabled />
                            <Button variant="outline-warning" onClick={(e)=> editData('bairro', 'address.bairro', e.currentTarget)}>EDIT</Button>
                          </InputGroup>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>Cidade</Form.Label>
                          <InputGroup>
                            <Form.Control type="text" placeholder="Cidade" id="cidade" disabled />
                            <Button variant="outline-warning" onClick={(e)=> editData('cidade', 'address.cidade', e.currentTarget)}>EDIT</Button>
                          </InputGroup>
                          
                        </Form.Group>
                      </Col>

                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>Estado</Form.Label>
                          <InputGroup>
                            <Form.Control type="text" placeholder="Estado" id="estado" disabled />
                            <Button variant="outline-warning" onClick={(e)=> editData('estado', 'address.estado', e.currentTarget)}>EDIT</Button>
                          </InputGroup>
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>
                </fieldset>
            </Form>
          </Col>:<></>
          }

          {/*Col Pedidos*/}
          {context?.colPedidos ? 
          <Col sm={9} className="col">
            <Table>
              <thead>
                <tr>  
                  <th>Nº</th>
                  <th>Endereco</th>
                  <th>STATUS</th>
                  <th>EDIT</th>
                </tr>
              </thead>
              <tbody>
                {context.ordersClient.map((order)=>{
                  return(
                    <tr>
                      <td>{order[0]}</td>
                      <td>{`${order[1].client.address.rua} - ${order[1].client.address.numero} - ${order[1].client.address.bairro} - ${order[1].client.address.cidade} - ${order[1].client.address.estado}`}</td>
                      <td>{order[1].status}</td>
                      <td>BTT</td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </Col>:
          <></>
          }
        </Row>
      </Container>

    </div>
  );
}

export default Clients;
