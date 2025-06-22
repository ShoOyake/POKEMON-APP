import React, { useState } from 'react';
import './App.css';
import playerLogo from './assets/player.png'
import enemyLogo from './assets/enemy.png'


type Pokemon = {
  name: string;
  hp: number;
  maxHp: number;
  attack: number;
  image: string;
};

// バトル画面コンポーネント
// バトル画面の状態を管理し、ポケモンのバトルをシミュレートするコンポーネント
const BattleScreen: React.FC = () => {
  // プレイヤーポケモンの状態を管理
  // プレイヤーポケモンの初期状態を設定
  const [player, setPlayer] = useState<Pokemon>({
    name: 'ポッチャマ',
    hp: 80,
    maxHp: 80,
    attack: 5,
    image: playerLogo,
  });

  // 敵ポケモンの状態を管理
  // 敵ポケモンの初期状態を設定
  const [enemy, setEnemy] = useState<Pokemon>({
    name: 'イワーク',
    hp: 100,
    maxHp: 100,
    attack: 10,
    image: enemyLogo,
  });

  // バトルログ
  // ログの状態を管理
  const [logs, setLogs] = useState<string[]>([]);

  // バトル終了フラグ
  // バトルが終了したかどうかを管理
  const [isBattleOver, setIsBattleOver] = useState(false);

  // プレイヤーのターンかどうかを管理
  // プレイヤーのターンを管理するための状態
  const [isPlayerTurn, setIsPlayerTurn] = useState(true); // 最初はプレイヤーのターン

  //技ごとのダメージ乱数
const moveDamageMap: { [key: string]: [number, number] } = {
  'みずでっぽう': [10, 20],
  'なきごえ': [0, 5],
  'たいあたり': [5, 15],
  'アクアジェット': [15, 25],
};


  // ポケモンの技を使用したときの処理
  // 技を使用したときのダメージ計算とログの更新
const handleMoveClick = (move: string) => {
  if (isBattleOver) return; // 終了後は何もしない 

  if (move === 'なきごえ') {
    const newAttack = Math.max(enemy.attack - 5, 1); // 最低1まで
    setEnemy({ ...enemy, attack: newAttack });
    setLogs(prev => [`${player.name} の ${move}！ ${enemy.name} の こうげきが さがった！`, ...prev]);
    setIsPlayerTurn(false);

    // 敵の反撃
    setTimeout(() => {
      const enemyDamage = Math.floor(Math.random() * 5) + enemy.attack;
      const newPlayerHp = Math.max(player.hp - enemyDamage, 0);
      setPlayer({ ...player, hp: newPlayerHp });

      const enemyLog = `${enemy.name} の たいあたり！ ${player.name} に ${enemyDamage} ダメージ！`;
      setLogs((prev) => [enemyLog, ...prev]);

      if (newPlayerHp <= 0) {
        setLogs((prev) => [`${player.name} は たおれた…😵`, ...prev]);
        setIsBattleOver(true);
      } else {
        setIsPlayerTurn(true);
      }
    }, 1000);

    return;
  }


  
  const [min, max] = moveDamageMap[move] ||[5, 15]; // 万が一未定義でも動くように
  const damage = Math.floor(Math.random() * (max - min + 1)) + min;
  const newHp = Math.max(enemy.hp - damage, 0); // 最低0まで

  setEnemy({ ...enemy, hp: newHp });
  const log = `${player.name} の ${move}！ ${enemy.name} に ${damage} ダメージ！`;
  setLogs(prev => [log, ...prev]);

  if (newHp <= 0) {
    setLogs(prev => [`${enemy.name} をたおした！🎉`, ...prev]);
    setIsBattleOver(true); // バトル終了！(ボタン押せなくする)
  }

  setIsPlayerTurn(false); // 敵のターンへ移行

  setTimeout(() => {
     
     if (newHp <= 0) return; // バトル終了後なら処理スキップ 
    const enemyDamage = Math.floor(Math.random() * 15) + enemy.attack;
    const newPlayerHp = Math.max(player.hp - enemyDamage, 0);
    setPlayer({ ...player, hp: newPlayerHp });

    const enemyLog = `${enemy.name} の たいあたり！ ${player.name} に ${enemyDamage} ダメージ！`;
    setLogs((prev) => [enemyLog, ...prev]);

    if (newPlayerHp <= 0) {
      setLogs((prev) => [`${player.name} は たおれた…😵`, ...prev]);
      setIsBattleOver(true);
    } else {
      setIsPlayerTurn(true); // プレイヤーのターンに戻す
    }
  }, 1000); // 敵の反撃に少し演出時間を与える
};


// バトルをリセットする処理
const handleReset = () => {
  setPlayer({
    name: 'ポッチャマ',
    hp: 80,
    maxHp: 80,
    attack:20,
    image: playerLogo,
  });

  setEnemy({
    name: 'イワーク',
    hp: 100,
    maxHp: 100,
    attack:15,
    image: enemyLogo,
  });

  setLogs([]);
  setIsBattleOver(false);
};

  return (
    <div>
      <h2>バトル開始！</h2>
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

        {/* バトルが終了した場合のメッセージとリセットボタン */}
        {isBattleOver && (
          <button onClick={handleReset}>リセット</button>
        )}

        <div className="battle-log">
          <h3>バトルログ</h3>
          <ul>
            {logs.map((log, index) => (
              <li key={index}>{log}</li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
};
export default BattleScreen;


