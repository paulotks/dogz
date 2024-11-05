import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../../UserContext";
import MinhasFotos from "../../Assets/feed.svg?react";
import Estatisticas from "../../Assets/estatisticas.svg?react";
import AdicionarFoto from "../../Assets/adicionar.svg?react";
import Sair from "../../Assets/sair.svg?react";
import styles from "./UserHeaderNav.module.css";
import useMedia from "../../Hooks/useMedia";

const UserHeaderNav = () => {
	const { userLogOut } = React.useContext(UserContext);
	const mobile = useMedia("(max-width: 40rem)");
	const [mobileMenu, setMobileMenu] = React.useState(false);
	const {pathname} = useLocation();

	React.useEffect(() => {
		setMobileMenu(false);
	}, [pathname])

	function handleLogout() {
		userLogOut();
		Navigate("/login");
	}

	return (
		<>
			{mobile && (
				<button
					aria-label="Menu"
					className={`${styles.mobileButton} ${mobileMenu && styles.mobileButtonActive}`}
					onClick={() => setMobileMenu(!mobileMenu)}
				></button>
			)}

			<nav className={`${mobile ? styles.navMobile : styles.nav} ${mobileMenu && styles.navMobileActive}`}>
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
				<button onClick={handleLogout}>
					<Sair />
					{mobile && "Sair"}
				</button>
			</nav>
		</>
	);
};

export default UserHeaderNav;
