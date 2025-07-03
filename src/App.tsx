import { useState } from 'react';
import BattleScreen from './pages/BattleScreen.tsx';
import { pocchama, iwark } from './data/pokemon.ts';

//親コンポーネントは状態管理とロジックを担当し、子コンポーネントにデータを渡す
// ＜propsの補足＞　親が子をimportする。親が呼び出すときに、propsという"データ"を渡す
// 子は親の存在を知らなくても、propsとして渡されたデータだけを受け取る
function App() {

  const [player, setPlayer] = useState(pocchama);
  const [enemy, setEnemy] = useState(iwark); 

  // バトルログ
  // ログの状態を管理
  const [logs, setLogs] = useState<string[]>([]);

  // バトル終了フラグ
  // バトルが終了したかどうかを管理
  const [isBattleOver, setIsBattleOver] = useState(false);

  // プレイヤーのターンかどうか
  // プレイヤーのターンかどうかを管理
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  return (
    <div>
      <BattleScreen
        player={player}
        setPlayer={setPlayer}
        enemy={enemy}
        setEnemy={setEnemy}
        logs={logs}
        setLogs={setLogs}
        isBattleOver={isBattleOver}
        setIsBattleOver={setIsBattleOver}
        isPlayerTurn={isPlayerTurn}
        setIsPlayerTurn={setIsPlayerTurn}
        initialPlayer={pocchama} // リセット用の初期値
        initialEnemy={iwark}　// リセット用の初期値
      />
    </div>
  );
}

export default App;

