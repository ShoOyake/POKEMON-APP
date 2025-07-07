// file: src/hooks/useBattleLogic.ts
import { useCallback } from 'react';
import { Pokemon, Move } from '../types';
import { calculateDamage } from '../utils/calculateDamage';
import { applyAttackDebuff } from '../utils/applyDebuff';

// バトルロジックのパラメータ型定義
// バトルの状態を管理するためのパラメータを定義する
interface BattleLogicParams {
  player: Pokemon;
  enemy: Pokemon;
  setPlayer: React.Dispatch<React.SetStateAction<Pokemon>>;
  setEnemy: React.Dispatch<React.SetStateAction<Pokemon>>;
  setLogs: React.Dispatch<React.SetStateAction<string[]>>;
  setIsBattleOver: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPlayerTurn: React.Dispatch<React.SetStateAction<boolean>>;
}

// バトルロジックフック
// バトルのロジックを管理するフック
export const useBattleLogic = ({
  player,
  enemy,
  setPlayer,
  setEnemy,
  setLogs,
  setIsBattleOver,
  setIsPlayerTurn,
}: BattleLogicParams) => {

  // 敵ターン
  const handleEnemyTurn = useCallback(() => {
    const damage = calculateDamage(0, 15) + enemy.attack;
    const newPlayerHp = Math.max(player.hp - damage, 0); //0またはダメージ後HPのうち、最大値を返す

    setPlayer(prev => ({ ...prev, hp: newPlayerHp }));
    setLogs(prev => [`${enemy.name} の たいあたり！ ${player.name} に ${damage} ダメージ！`, ...prev]);

    if (newPlayerHp <= 0) {
      setLogs(prev => [`${player.name} は たおれた…😵`, ...prev]);
      setIsBattleOver(true);
    } else {
      setIsPlayerTurn(true);
    }
  }, [enemy, player, setPlayer, setLogs, setIsBattleOver, setIsPlayerTurn]);


  // プレイヤーターン
  const handlePlayerMove = useCallback((move: Move) => {
    if (move.attribute === 'デバフ') {
      const updatedEnemy = applyAttackDebuff(enemy);
      setEnemy(updatedEnemy);
      setLogs(prev => [`${player.name} の ${move.name}！${enemy.name} の こうげきが さがった！`, ...prev]);
    }

    const damage = calculateDamage(move.minDamage, move.maxDamage);

    if (damage > 0) {
      const newEnemyHp = Math.max(enemy.hp - damage, 0);
      setEnemy(prev => ({ ...prev, hp: newEnemyHp }));
      setLogs(prev => [`${player.name} の ${move.name}！ ${enemy.name} に ${damage} ダメージ！`, ...prev]);

      if (newEnemyHp <= 0) {
        setLogs(prev => [`${enemy.name} をたおした！🎉`, ...prev]);
        setIsBattleOver(true);
        return;
      }
    }

    setIsPlayerTurn(false);

    setTimeout(() => {
      handleEnemyTurn();
    }, 1000);
  }, [enemy, player, setEnemy, setLogs, setIsBattleOver, setIsPlayerTurn, handleEnemyTurn]);

  // バトルロジックを返す
  // プレイヤーの技を使用するための関数を返す
  return { handlePlayerMove };
};
