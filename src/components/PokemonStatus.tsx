// File: src/components/PokemonStatus.tsx
import { Pokemon } from '../types'; 

interface PokemonStatusProps {
  pokemon: Pokemon;
}

const PokemonStatus = ({ pokemon }: PokemonStatusProps) => (
  <div>
    <img src={pokemon.image} alt={pokemon.name} />
    <div>{pokemon.name} HP {pokemon.hp}/{pokemon.maxHp}</div>
  </div>
);

export default PokemonStatus;
