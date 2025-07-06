// File: src/components/PokemonStatus.tsx
import { Pokemon } from '../types'; 

interface PokemonStatusProps {
  pokemon: Pokemon;
  isShaking: boolean;
}

const PokemonStatus = ({ pokemon, isShaking }: PokemonStatusProps) => (
  <div className= {`pokemon-status ${isShaking ? 'shake' : ''}`}>
    <img src={pokemon.image} alt={pokemon.name} />
    <div>{pokemon.name} HP {pokemon.hp}/{pokemon.maxHp}</div>
  </div>
);

export default PokemonStatus;
