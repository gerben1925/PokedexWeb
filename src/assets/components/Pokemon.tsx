import { Link } from 'react-router-dom';


interface Pokemon {
  name: string;
  height: number;
  id: number;
  img: string;
  types: string[];
}

const PokemonList = ({ pokeList }: { pokeList: Pokemon[] }) => {
  return (
    <>
      <div className='container-fluid'>
        <div className="album py-5 bg-light">
          <div className="container">
            <div className='row justify-content-center'>
              {pokeList.map((pokemon) => (
                <div key={pokemon.id} className='col-md-4 col-lg-4 col-sm-4 mt-5'>
                  <div className='card' id='cb1'>
                    <img src={pokemon.img} className="card-img-top mx-auto d-block" id='img-pok' alt={pokemon.name} />
                    <div className='card-body'>
                      <h5 className='card-title'>{pokemon.name}</h5>
                      <p className='card-text'>
                        ID: {pokemon.id}
                        <br />
                        Height: {pokemon.height}
                        <br />
                        Types: {pokemon.types.join(', ')}
                      </p>

                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <Link to={`/details/${pokemon.id}`} className="btn btn-sm btn-outline-secondary">View</Link>
                        </div>
                        <small className="text-muted">9 mins</small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonList;
