import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Pokemon {
  name: string;
  height: number;
  id: number;
  img: string;
  types: string[];
}

const Home = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);


  useEffect(() => {
    async function fetchPokemonData() {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon/?offset=60&limit=90');
        const results = response.data.results;
        const fetchPokemonList: Pokemon[] = await Promise.all(
          results.map(async (pokemon: { url: string }) => {
            const pokemonDataResponse = await axios.get(pokemon.url);
            return {
              name: pokemonDataResponse.data.name,
              height: pokemonDataResponse.data.height,
              id: pokemonDataResponse.data.id,
              img: pokemonDataResponse.data.sprites.other.dream_world.front_default,
              types: pokemonDataResponse.data.types.map((type: { type: { name: string } }) => type.type.name),
            };
          })
        );
        setPokemonList(fetchPokemonList);
      } catch (error) {
        console.error('Error fetching Pokemon data', error);
      }
    }
    fetchPokemonData();
  }, []);

  return (
    <div>Home</div>
  )
}

export default Home;