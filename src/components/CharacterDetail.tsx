import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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

function CharacterDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const character = location.state?.character as Character | undefined;
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (character) {
            const favorites = JSON.parse(localStorage.getItem("favoriteCharacters") || "[]");
            setIsFavorite(favorites.some((char: Character) => char.id === character.id));
        }
    }, [character]);

    const toggleFavorite = () => {
        if (!character) return;

        const favorites = JSON.parse(localStorage.getItem("favoriteCharacters") || "[]");
        let updatedFavorites;

        if (isFavorite) {
            updatedFavorites = favorites.filter((char: Character) => char.id !== character.id);
        } else {
            updatedFavorites = [...favorites, character];
        }

        localStorage.setItem("favoriteCharacters", JSON.stringify(updatedFavorites));
        setIsFavorite(!isFavorite);
    };

    if (!character) {
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <p className="text-red-500 mb-4">Персонаж не найден</p>
                <button
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 bg-pony-brown text-white rounded-lg hover:bg-pony-brown-dark transition-colors"
                >
                    Назад
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center p-8 max-w-4xl mx-auto">
            <div className="w-full flex justify-between items-center mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 bg-pony-brown text-white rounded-lg hover:bg-pony-brown-dark transition-colors"
                >
                    Назад
                </button>
                <button
                    onClick={toggleFavorite}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                        isFavorite
                            ? "bg-red-500 hover:bg-red-600 text-white"
                            : "bg-pony-brown hover:bg-pony-brown-dark text-white"
                    }`}
                >
                    {isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
                </button>
            </div>
            
            <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                    <div className="space-y-4">
                        {character.image && character.image.length > 0 ? (
                            <>
                                <img
                                    src={character.image[0]}
                                    alt={character.name}
                                    className="w-full rounded-lg shadow-md"
                                />
                                {character.image.slice(1).map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`${character.name} ${index + 1}`}
                                        className="w-full rounded-lg shadow-md"
                                    />
                                ))}
                            </>
                        ) : (
                            <div className="w-full aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                                <span className="text-gray-500">Нет изображения</span>
                            </div>
                        )}
                    </div>
                    
                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold text-pony-brown">{character.name}</h1>
                        {character.alias && (
                            <p className="text-xl text-gray-600">Прозвище: {character.alias}</p>
                        )}
                        <div className="space-y-2">
                            <p><span className="font-semibold">Пол:</span> {character.sex}</p>
                            <p><span className="font-semibold">Место жительства:</span> {character.residence}</p>
                            <p><span className="font-semibold">Род занятий:</span> {character.occupation}</p>
                            <p><span className="font-semibold">Раса:</span> {character.kind.join(", ")}</p>
                        </div>
                        <a
                            href={character.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block px-4 py-2 bg-pony-brown text-white rounded-lg hover:bg-pony-brown-dark transition-colors"
                        >
                            Подробнее на Wiki
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CharacterDetail; 