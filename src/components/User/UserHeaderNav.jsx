import React from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { ReactComponent as MinhasFotos } from "../../Assets/feed.svg";

const UserHeaderNav = () => {
  const { userLogout } = React.useContext(UserContext);

  return (
    <nav>
      <NavLink to="/conta">
        <MinhasFotos />
        Minhas Fotos
      </NavLink>
      <NavLink to="/conta/estatisticas">Estatísticas</NavLink>
      <NavLink to="/conta/postar">Adicionar Foto</NavLink>
      <button onClick={userLogout}>Sair</button>
    </nav>
  );
};

export default UserHeaderNav;
