import { Move } from '../types'; 

interface MoveButtonsProps {
  moves: Move[];
  onMoveClick: (moveName: string) => void;
}

const MoveButtons = ({ moves, onMoveClick }: MoveButtonsProps) => (
  <div className="move-buttons">
    {moves.map(move => (
      <button key={move.name} onClick={() => onMoveClick(move.name)}>
        {move.name}
      </button>
    ))}
  </div>
);

export default MoveButtons;
