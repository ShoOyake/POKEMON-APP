//file: src/utils/applyDebuff.ts
import { Pokemon } from '../types';

// 攻撃力デバフを適用する関数
// ポケモンの攻撃力を減少させるデバフを
// 適用する関数を定義する
// デバフの量はデフォルトで5とする
export const applyAttackDebuff = (target: Pokemon, amount: number = 5): Pokemon => {
  const newAttack = Math.max(target.attack - amount, 1);
  return { ...target, attack: newAttack };
};