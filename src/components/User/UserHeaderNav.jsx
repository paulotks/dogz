import React from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../UserContext";
import MinhasFotos from "../../Assets/feed.svg?react";
import Estatisticas from "../../Assets/estatisticas.svg?react";
import AdicionarFoto from "../../Assets/adicionar.svg?react";
import Sair from "../../Assets/sair.svg?react";
import styles from "./UserHeaderNav.module.css";

const UserHeaderNav = () => {
	const [mobile, setMobile] = React.useState(null);
	const { userLogOut } = React.useContext(UserContext);

	return (
		<nav className={styles.nav}>
			<NavLink to="/conta" end>
				<MinhasFotos />
				{mobile && "Minhas Fotos"}
			</NavLink>
			<NavLink to="/conta/estatisticas">
				<Estatisticas />
				{mobile && "Estatísticas"}
			</NavLink>
			<NavLink to="/conta/postar">
				<AdicionarFoto />
				{mobile && "Adicionar Foto"}
			</NavLink>
			<button onClick={userLogOut}>
				<Sair />
				{mobile && "Sair"}
			</button>
		</nav>
	);
};

export default UserHeaderNav;
