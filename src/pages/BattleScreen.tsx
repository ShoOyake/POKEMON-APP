import '../style/App.css';
import { Pokemon } from '../types'; 

interface Props {
  player: Pokemon;
  setPlayer: React.Dispatch<React.SetStateAction<Pokemon>>;
  enemy: Pokemon;
  setEnemy: React.Dispatch<React.SetStateAction<Pokemon>>;
  logs: string[];
  setLogs: React.Dispatch<React.SetStateAction<string[]>>;
  isBattleOver: boolean;
  setIsBattleOver: React.Dispatch<React.SetStateAction<boolean>>;
  isPlayerTurn: boolean;
  setIsPlayerTurn: React.Dispatch<React.SetStateAction<boolean>>;
  initialPlayer: Pokemon; // 初期ポケモン
  initialEnemy: Pokemon; // 初期敵ポケモン
}

// バトル画面コンポーネント
// バトル画面の状態を管理し、ポケモンのバトルをシミュレートするコンポーネント
function BattleScreen({
  player, setPlayer,
  enemy, setEnemy,
  logs, setLogs,
  isBattleOver, setIsBattleOver,
  isPlayerTurn, setIsPlayerTurn,
  initialPlayer,
  initialEnemy,
}: Props){

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


  
  const [min, max] = moveDamageMap[move];
  const damage = Math.floor(Math.random() * (max - min + 1)) + min;
  const newEnemyHp = Math.max(enemy.hp - damage, 0); // 最低0まで

  setEnemy({ ...enemy, hp: newEnemyHp });
  const log = `${player.name} の ${move}！ ${enemy.name} に ${damage} ダメージ！`;
  setLogs(prev => [log, ...prev]);

  if (newEnemyHp <= 0) {
    setLogs(prev => [`${enemy.name} をたおした！🎉`, ...prev]);
    setIsBattleOver(true); // バトル終了！(ボタン押せなくする)
  }

  setIsPlayerTurn(false); // 敵のターンへ移行

  setTimeout(() => {
     if (newEnemyHp <= 0) return; // バトル終了後なら処理スキップ 
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
  setPlayer(initialPlayer);
  setEnemy(initialEnemy);
  setLogs([]);
  setIsBattleOver(false);
  setIsPlayerTurn(true);
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


