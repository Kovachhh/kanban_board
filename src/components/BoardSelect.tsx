import { BoardType } from '@/types/types';
import React from 'react';
import Select, { ActionMeta, SingleValue } from 'react-select';

interface BoardSelectProps {
  boards: BoardType[];
  selectedBoardId: string | null;
  onChange: (boardId: string | null) => void;
}

const BoardSelect: React.FC<BoardSelectProps> = ({ boards, selectedBoardId, onChange }) => {
  const options = boards.map(board => ({ value: board.id, label: board.name }));

  const handleChange = (selectedOption: SingleValue<{ value: string; label: string }>, actionMeta: ActionMeta<{ value: string; label: string }>) => {
    if (selectedOption) {
      onChange(selectedOption.value);
    } else {
      onChange(null);
    }
  };

  const selectedOption = options.find(option => option.value === selectedBoardId);

  return (
    <Select
      className="h-[100%] text-m text-black w-4/5 self-center"
      value={selectedOption || null}
      onChange={handleChange}
      options={options}
      placeholder="Select a board"
    />
  );
};

export default BoardSelect;