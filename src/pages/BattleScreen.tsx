import '../style/App.css';
import { Pokemon } from '../types';
import PokemonStatus from '../components/PokemonStatus';
import MoveButtons from '../components/MoveButtons';
import BattleLog from '../components/BattleLog';
import { moves } from '../data/moves';
import { useBattleLogic } from '../hooks/useBattleLogic';

// Propsの型定義
// バトル画面に渡すプロパティの型を定義する
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
function BattleScreen({
  player, setPlayer,
  enemy, setEnemy,
  logs, setLogs,
  isBattleOver, setIsBattleOver,
  isPlayerTurn, setIsPlayerTurn,
  initialPlayer,
  initialEnemy,
}: Props){

  // バトルロジックをフックから取得
  // useBattleLogicフックを使用して、バトルのロジックを取得する
  // このフックは、プレイヤーと敵のポケモン、状態管理用の関数を引数に取り、バトルのロジックを提供する
  // handlePlayerMove関数を取得し、プレイヤーの技を使用する 
  const { handlePlayerMove } = useBattleLogic({
    player, enemy, setPlayer, setEnemy, setLogs, setIsBattleOver, setIsPlayerTurn,
  });

// プレイヤーの技を選択したときの処理
// プレイヤーが技を選択したときに呼び出される関数
// 技の名前を引数に取り、バトルのロジックを実行する
// バトルが終了している場合や、プレイヤーのターンでない場合は何もしない
// 技が存在しない場合も何もしない 
const handleMoveClick = (moveName: string) => {
  if (isBattleOver || !isPlayerTurn) return;
  
  const selectedMove = moves.find(m => m.name === moveName);
  if (!selectedMove) return;

  handlePlayerMove(selectedMove);
};


// バトルをリセットする処理
const handleReset = () => {
  setPlayer(initialPlayer);
  setEnemy(initialEnemy);
  setLogs([]);
  setIsBattleOver(false);
  setIsPlayerTurn(true);
};


 // バトル画面のレンダリング
 // バトル画面のコンポーネントを返す  
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


