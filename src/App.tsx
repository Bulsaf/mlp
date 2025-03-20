import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Characters from "./components/Characters";
import Header from "./components/Header";
import CharacterDetail from "./components/CharacterDetail";
import Favorites from "./components/Favorites";

function App() {
	return (
		<Router>
			<div className="bg-pony-beige-light w-full h-full">
				<Header />
				<Routes>
					<Route path="/" element={<Characters />} />
					<Route path="/character/:id" element={<CharacterDetail />} />
					<Route path="/favorites" element={<Favorites />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
