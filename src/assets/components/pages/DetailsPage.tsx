// PokemonDetails.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface PokemonDetailsProps {
  id: number;
}

interface PokemonDetails {
  name: string;
  height: number;
  weight: number;
  img: string;
  types: string[];
  abilities: string[];
}

const PokemonDetails: React.FC<PokemonDetailsProps> = ({ id }) => {
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(null);

console.log("Pokemon ID: "+ { id });

  useEffect(() => {
    async function fetchPokemonDetails() {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemonData = response.data;

        const pokemonDetailsData: PokemonDetails = {
          name: pokemonData.name,
          height: pokemonData.height,
          weight: pokemonData.weight,
          img: pokemonData.sprites.other.dream_world.front_default,
          types: pokemonData.types.map((type: { type: { name: string } }) => type.type.name),
          abilities: pokemonData.abilities.map((ability: { ability: { name: string } }) => ability.ability.name),
        };

        setPokemonDetails(pokemonDetailsData);
      } catch (error) {
        console.error('Error fetching Pokemon details', error);
      }
    }

    fetchPokemonDetails();
  }, [id]);

  if (!pokemonDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>
      <div className='row mt-5'>
        <div className='col-md-6 offset-md-3'>
          <div className='card'>
            <img src={pokemonDetails.img} className='card-img-top' alt={pokemonDetails.name} />
            <div className='card-body'>
              <h5 className='card-title'>{pokemonDetails.name}</h5>
              <p className='card-text'>
                ID: {id}
                <br />
                Height: {pokemonDetails.height}
                <br />
                Weight: {pokemonDetails.weight}
                <br />
                Types: {pokemonDetails.types.join(', ')}
                <br />
                Abilities: {pokemonDetails.abilities.join(', ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonDetails;
