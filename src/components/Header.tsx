import { Link } from "react-router-dom";

function Header() {
	return (
		<header className="bg-pony-brown text-white p-4">
			<nav className="container mx-auto flex gap-4">
				<Link to="/" className="hover:text-pony-beige-light transition-colors">
					Все персонажи
				</Link>
				<Link to="/favorites" className="hover:text-pony-beige-light transition-colors">
					Избранное
				</Link>
			</nav>
		</header>
	);
}

export default Header;
