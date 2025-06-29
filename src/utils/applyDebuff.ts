import { Pokemon } from '../types';

export const applyAttackDebuff = (target: Pokemon, amount: number = 5): Pokemon => {
  const newAttack = Math.max(target.attack - amount, 1);
  return { ...target, attack: newAttack };
};