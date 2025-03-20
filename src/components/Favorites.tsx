import { useEffect, useState } from "react";
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

function Favorites() {
    const [favorites, setFavorites] = useState<Character[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const savedFavorites = localStorage.getItem("favoriteCharacters");
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    const handleCharacterClick = (character: Character) => {
        navigate(`/character/${character.id}`, { state: { character } });
    };

    const removeFromFavorites = (characterId: number) => {
        const updatedFavorites = favorites.filter(char => char.id !== characterId);
        setFavorites(updatedFavorites);
        localStorage.setItem("favoriteCharacters", JSON.stringify(updatedFavorites));
    };

    if (favorites.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <p className="text-xl text-gray-600 mb-4">У вас пока нет избранных персонажей</p>
                <button
                    onClick={() => navigate("/")}
                    className="px-4 py-2 bg-pony-brown text-white rounded-lg hover:bg-pony-brown-dark transition-colors"
                >
                    Перейти к списку персонажей
                </button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] w-full h-full gap-4 p-10">
            {favorites.map((character) => (
                <div
                    key={character.id}
                    className="relative flex flex-col items-center border-2 p-[10px] rounded-[10px] border-pony-brown"
                >
                    <button
                        onClick={() => removeFromFavorites(character.id)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                        ×
                    </button>
                    <div
                        onClick={() => handleCharacterClick(character)}
                        className="w-full cursor-pointer hover:bg-pony-brown/10 transition-colors rounded-lg"
                    >
                        <img
                            src={character.image[0]}
                            alt={character.name}
                            className="object-cover w-full aspect-square rounded-[10px]"
                        />
                        <h2 className="mt-2 text-center font-medium">{character.name}</h2>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Favorites; 