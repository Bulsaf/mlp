import { useEffect, useState } from "react";
import Characters from "./components/Characters";
import Header from "./components/Header";
import httpClient from "./httpClient";

function App() {
	return (
		<div className=" bg-pony-beige-light w-full h-full">
			<Header />
			<Characters />
		</div>
	);
}

export default App;
