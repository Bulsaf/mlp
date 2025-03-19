import { useEffect, useState } from "react";
import httpClient from "../httpClient";

interface Character {
	id: number;
	name: string;
	alias?: string;
	url: string;
	sex: string;
	residence: string;
	occupation: string;
	kind: string[];
	image: string[];
}

interface ApiResponse {
	status: number;
	data: Character[];
}
function Characters() {
	const [characters, setCharacters] = useState<Array<Character>>();
	useEffect(() => {
		httpClient.get<ApiResponse>("/character/all").then((response) => {
			setCharacters(response.data.data);
		});
	}, []);

	return (
		<div className=" grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] w-full h-full gap-4 p-10">
			{/* {characters?.map((character) => (
				<div
					key={character.id}
					className=" flex flex-col items-center border-2 p-[10px] rounded-[10px] border-pony-brown"
				>
					<img
						src={character.image[0]}
						alt={character.name}
						className=" object-cover w-full aspect-square rounded-[10px]"
					/>

					<h2>{character.name}</h2>
				</div>
			))} */}
		</div>
	);
}

export default Characters;
