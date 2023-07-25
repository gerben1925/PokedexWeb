import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

interface PokemonDetails {
  name: string;
  height: number;
  weight: number;
  img: string;
  types: string[];
  abilities: string[];
}

interface PokemonSpecies{
    color:string;
    habitat:string;
    egg_group:string[];
    text_entries:string[];
    growth_rate:string;
}


export default function Details() {
    const { id } = useParams();
    const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails | null>(null);
    const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies | null>(null);
  
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
          console.error("Error fetching Pokemon details", error);
        }
      }
  
      async function fetchPokemonSpecies() {
        try {
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
          const pokemonData = response.data;
  
          const pokemonSpeciesData: PokemonSpecies = {
            color: pokemonData.color.name,
            habitat: pokemonData.habitat.name,
            egg_group: pokemonData.egg_groups.map((group: { name: string }) => group.name),
            text_entries: pokemonData.flavor_text_entries.map((entry: { flavor_text: string }) => entry.flavor_text),
            growth_rate: pokemonData.growth_rate.name,
          };
  
          setPokemonSpecies(pokemonSpeciesData);
        } catch (error) {
          console.error("Error fetching Pokemon Species", error);
        }
      }
  
      fetchPokemonDetails();
      fetchPokemonSpecies();
    }, [id]);
  
    if (!pokemonDetails || !pokemonSpecies) {
      return <div>Loading...</div>;
    }
  
    return (
      <div className="container">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">{pokemonDetails.name}</h3>
            <div className="row">
              <div className="col-lg-5 col-md-5 col-sm-6">
                <div className="white-box text-center">
                  <img src={pokemonDetails.img} className="img-responsive" alt={pokemonDetails.name} />
                </div>
              </div>
              <div className="col-lg-7 col-md-7 col-sm-6">
                <h4 className="box-title mt-5">General Info</h4>
                <div className="table-responsive mt-4" id="pokedetails">
                  <table className="table table-striped table-product">
                    <tbody>
                      <tr>
                        <td width="390">ID</td>
                        <td>{id}</td>
                      </tr>
                      <tr>
                        <td>Height</td>
                        <td>{pokemonDetails.height}</td>
                      </tr>
                      <tr>
                        <td>Weight</td>
                        <td>{pokemonDetails.weight}</td>
                      </tr>
                      <tr>
                        <td>Types</td>
                        <td>{pokemonDetails.types.join(", ")}</td>
                      </tr>
                      <tr>
                        <td>Abilities</td>
                        <td>{pokemonDetails.abilities.join(", ")}</td>
                      </tr>
                      <tr>
                        <td>Color</td>
                        <td>{pokemonSpecies.color}</td>
                      </tr>
                      <tr>
                        <td>Habitat</td>
                        <td>{pokemonSpecies.habitat}</td>
                      </tr>
                      <tr>
                        <td>Egg Groups</td>
                        <td>{pokemonSpecies.egg_group.join(", ")}</td>
                      </tr>
                      <tr>
                        <td>Text Entries</td>
                        <td>{pokemonSpecies.text_entries[0]}</td>
                      </tr>
                      <tr>
                        <td>Growth Rate</td>
                        <td>{pokemonSpecies.growth_rate}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
