import { useContext } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import SideMenu from "../../components/side-menu/side-menu";
import Searchbar from "../../components/searchbar";
//import Backspace from "../../assets/backspace.png";
//import Edit from "../../assets/edit.png";
import { Context } from "../../contexts/contextClients";
import Sidebar from '../../assets/sidebar.png';
import SearchResult from "../../components/searchresult";

type contextType = {
  textTyped:string
}

function Clients() {
  const context : contextType = useContext(Context);
  //console.log(context.listNames)
  return (
    <div>
      <Navbar className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">
            <Button
              variant="primary"
              className="bttMenu"
              onClick={() => {
                document.getElementById("mySidenav").style.width = "250px";
              }}
            >
              <img className="bttMenuSide" src={Sidebar} alt="bttMenuSide" />
            </Button>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <SideMenu />
      <Searchbar/>
      <SearchResult/>
    </div>
  );
}

export default Clients;
