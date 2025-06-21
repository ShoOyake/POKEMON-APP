import React, { useState } from 'react';
import './App.css';
// import playerLogo from './assets/player.png'
// import enemyLogo from './assets/enemy.png'

type Pokemon = {
  name: string;
  hp: number;
  maxHp: number;
  image: string;
};

const BattleScreen: React.FC = () => {
  const [player, setPlayer] = useState<Pokemon>({
    name: 'ポッチャマ',
    hp: 65,
    maxHp: 80,
    image: 'C:\Users\potat\source\repos\POKEMON-APP\src\assets\player.png',
  });

  const [enemy, setEnemy] = useState<Pokemon>({
    name: 'イワーク',
    hp: 100,
    maxHp: 100,
    image: 'C:\Users\potat\source\repos\POKEMON-APP\src\assets\enemy.png',
  });

  const handleMoveClick = (move: string) => {
    alert(`${player.name} の ${move}！`);
  };

  return (
    <div>
      <h2>バトル開始！</h2>
      <h1>テスト中</h1>
      <div className="battle-screen">
        <div className="pokemon-area">
          <div>
            <img src={player.image} alt={player.name} />
            <div>{player.name} HP {player.hp}/{player.maxHp}</div>
          </div>
          <div>
            <img src={enemy.image} alt={enemy.name} />
            <div>{enemy.name} HP {enemy.hp}/{enemy.maxHp}</div>
          </div>
        </div>
        <div className="move-buttons">
          {['みずでっぽう', 'なきごえ', 'たいあたり', 'アクアジェット'].map((move) => (
            <button key={move} onClick={() => handleMoveClick(move)}>{move}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BattleScreen;


