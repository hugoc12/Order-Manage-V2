import { useEffect, useRef } from "react";

import './style.css'

function SideMenu() {
  
  const divSideMenu = useRef()

  return (
    <div id="mySidenav" className="sidenav" ref={divSideMenu}>
      <a href="javascript:void(0)" className="closebtn" onClick={()=>{
        document.getElementById('mySidenav').style.width = "0px";
      }}>
        X
      </a>
      <a href="/pedidos">Pedidos</a>
      <a href="/produtos">Produtos</a>
      <a href="/clientes">Clientes</a>
    </div>
  );
}

export default SideMenu;
