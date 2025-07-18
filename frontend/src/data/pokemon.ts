// File: src/data/pokemon.ts
import { Pokemon } from '../types'
import pocchamaLogo from '../assets/pocchama.png'
import iwarkLogo from '../assets/iwark.png'


export const pocchama: Pokemon = {
    id: 1, 
    name: 'ポッチャマ',
    hp: 80,
    maxHp: 80,
    attack: 5,
    image: pocchamaLogo,
};

export const iwark: Pokemon = {
    id: 2, 
    name: 'イワーク',
    hp: 100,
    maxHp: 100,
    attack: 10,
    image: iwarkLogo,
};