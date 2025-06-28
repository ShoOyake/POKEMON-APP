import '../style/App.css';
import { Pokemon } from '../types';
import PokemonStatus from '../components/PokemonStatus';
import MoveButtons from '../components/MoveButtons';
import BattleLog from '../components/BattleLog';
import { moves } from '../data/moves';

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

// ポケモンの技を選択したときの処理
// プレイヤーが技を選択したときの処理
const handleMoveClick = (moveName: string) => {
  if (isBattleOver || !isPlayerTurn) return; // バトルが終了しているorプレイヤーターンでない場合は何もしない

  const selectedMove = moves.find(m => m.name === moveName);
  if (!selectedMove) return; //undefinedチェック(undefinedの状態では使用不可)

  if (selectedMove.attribute === 'デバフ') {
    const newAttack = Math.max(enemy.attack - 5, 1);
    setEnemy({ ...enemy, attack: newAttack });
    setLogs(prev => [`${player.name} の ${selectedMove.name}！${enemy.name} の こうげきが さがった！`, ...prev]);
  }

  const damage = Math.floor(Math.random() * (selectedMove.maxDamage - selectedMove.minDamage + 1)) + selectedMove.minDamage;
  if (damage > 0) {
    const newEnemyHp = Math.max(enemy.hp - damage, 0);
    setEnemy({ ...enemy, hp: newEnemyHp });
    setLogs(prev => [`${player.name} の ${selectedMove.name}！ ${enemy.name} に ${damage} ダメージ！`, ...prev]);

    if (newEnemyHp <= 0) {
      setLogs(prev => [`${enemy.name} をたおした！🎉`, ...prev]);
      setIsBattleOver(true);
      return;
    }
  }

  setIsPlayerTurn(false);

  setTimeout(() => {
    const enemyDamage = Math.floor(Math.random() * 15) + enemy.attack;
    const newPlayerHp = Math.max(player.hp - enemyDamage, 0);
    setPlayer({ ...player, hp: newPlayerHp });
    setLogs(prev => [`${enemy.name} の たいあたり！ ${player.name} に ${enemyDamage} ダメージ！`, ...prev]);

    if (newPlayerHp <= 0) {
      setLogs(prev => [`${player.name} は たおれた…😵`, ...prev]);
      setIsBattleOver(true);
    } else {
      setIsPlayerTurn(true);
    }
  }, 1000);
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
          <PokemonStatus pokemon={player} />
          <PokemonStatus pokemon={enemy} />
        </div>

        <div className="move-buttons">
          <MoveButtons moves={moves} onMoveClick={handleMoveClick} />
        </div>

        {/* バトルが終了した場合のメッセージとリセットボタン */}
        {isBattleOver && (
          <button onClick={handleReset}>リセット</button>
        )}

        <BattleLog logs={logs} />

      </div>
    </div>
  );
};
export default BattleScreen;


