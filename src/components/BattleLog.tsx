// File: src/components/BattleLog.tsx
interface BattleLogProps {
  logs: string[];
}

const BattleLog = ({ logs }: BattleLogProps) => (
  <div className="battle-log">
    <h3>バトルログ</h3>
    <ul>
      {logs.map((log, index) => (
        <li key={index}>{log}</li>
      ))}
    </ul>
  </div>
);

export default BattleLog;
