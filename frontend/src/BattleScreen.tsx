import React, { useState } from 'react';
import './App.css';
import './ShakeSlide.css';
import playerLogo from './assets/player.png'
import enemyLogo from './assets/enemy.png'


type Pokemon = {
  name: string;
  hp: number;
  maxHp: number;
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
    image: playerLogo,
  });

  // 敵ポケモンの状態を管理
  // 敵ポケモンの初期状態を設定
  const [enemy, setEnemy] = useState<Pokemon>({
    name: 'イワーク',
    hp: 100,
    maxHp: 100,
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



  // ポケモンの技を使用したときの処理
  // 技を使用したときのダメージ計算とログの更新
const handleMoveClick = (move: string) => {
  if (isBattleOver) return; // 終了後は何もしない 

  const damage = Math.floor(Math.random() * 20) + 5; // 5〜24ダメージ
  const newHp = Math.max(enemy.hp - damage, 0); // 最低0まで
  

  setEnemy({ ...enemy, hp: newHp });

  const log = `${player.name} の ${move}！ ${enemy.name} に ${damage} ダメージ！`;
  setLogs(prev => [log, ...prev]);

  const [isDamaged, setIsDamaged] = useState(false);
  const handleDamage = () => {
    setIsDamaged(true);

    // アニメーションを再発動できるように少ししてから戻す
    setTimeout(() => {
      setIsDamaged(false);
    }, 1000); //

  if (newHp <= 0) {
    setLogs(prev => [`${enemy.name} をたおした！🎉`, ...prev]);
    setIsBattleOver(true); // バトル終了！(ボタン押せなくする)
  }

  setIsPlayerTurn(false); // 敵のターンへ移行

  setTimeout(() => {
    const enemyDamage = Math.floor(Math.random() * 15) + 5;
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
    image: playerLogo,
  });

  setEnemy({
    name: 'イワーク',
    hp: 100,
    maxHp: 100,
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
        <div>
      <img
        src="./assets/player.png"
        alt="player"
        width="200"
        className={isDamaged ? 'shake' : ''}
      />
      <button onClick={handleDamage}>敵にダメージ！</button>
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


