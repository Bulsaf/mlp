import { useEffect, useState } from "react";
import httpClient from "../httpClient";
import { useNavigate } from "react-router-dom";

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
	const [searchQuery, setSearchQuery] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		httpClient.get<ApiResponse>("/character/all").then((response) => {
			setCharacters(response.data.data);
		});
	}, []);

	const handleCharacterClick = (character: Character) => {
		navigate(`/character/${character.id}`, { state: { character } });
	};

	const filteredCharacters = characters?.filter(character =>
		character.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
		(character.alias && character.alias.toLowerCase().includes(searchQuery.toLowerCase()))
	);

	return (
		<div className="flex flex-col w-full h-full">
			<div className="p-4">
				<input
					type="text"
					placeholder="Поиск по имени или прозвищу..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="w-full max-w-md px-4 py-2 rounded-lg border-2 border-pony-brown focus:outline-none focus:border-pony-brown-dark"
				/>
			</div>
			<div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] w-full h-full gap-4 p-10">
				{filteredCharacters?.map((character) => (
					<div
						key={character.id}
						onClick={() => handleCharacterClick(character)}
						className="flex flex-col items-center border-2 p-[10px] rounded-[10px] border-pony-brown cursor-pointer hover:bg-pony-brown/10 transition-colors"
					>
						<img
							src={character.image[0]}
							alt={character.name}
							className="object-cover w-full aspect-square rounded-[10px]"
						/>
						<h2 className="mt-2 text-center font-medium">{character.name}</h2>
					</div>
				))}
				{filteredCharacters?.length === 0 && (
					<div className="col-span-full text-center text-gray-500 py-8">
						Персонажи не найдены
					</div>
				)}
			</div>
		</div>
	);
}

export default Characters;
