import React, { useEffect, useRef } from 'react';
import { TableCell, InputBase, Box } from '@mui/material';

const Cell = React.memo(({ value, rowIndex, colIndex, isActive, isEditing, onSelect, onStartEdit, onEndEdit, onChange }) => {
  const inputRef = useRef(null);
  const cellRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current)
      inputRef.current.focus();
  }, [isEditing]);

  useEffect(() => {
    if (isActive && !isEditing && cellRef.current)
      cellRef.current.focus();
  }, [isActive, isEditing]);

  const handleKeyDown = (e) => {
    if (!isEditing) {
      if (e.key.length === 1) {
        onStartEdit();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        onEndEdit('right');
      }
    } else {
      if (e.key === 'Enter') {
        e.preventDefault();
        onEndEdit('right');
      }
    }
  };

  return (
    <TableCell
      ref={cellRef}
      tabIndex={0}
      onClick={() => onSelect(rowIndex, colIndex)}
      onDoubleClick={onStartEdit}
      onKeyDown={handleKeyDown}
      sx={{
        p: 0, borderRight: '1px solid #eee', height: 35,
        outline: isActive ? '2px solid #1a73e8' : 'none',
        outlineOffset: '-2px',
        zIndex: isActive ? 2 : 1,
        position: 'relative',
        cursor: 'cell',
        bgcolor: 'white'
      }}
    >
      {isEditing ? (
        <InputBase
          inputRef={inputRef}
          value={value}
          onChange={(e) => onChange(e.target.value, rowIndex, colIndex)}
          onBlur={() => onEndEdit()}
          sx={{ width: '100%', height: '100%', px: 1, fontSize: '0.85rem' }}
        />
      ) : (
        <Box sx={{ px: 1, whiteSpace: 'nowrap', overflow: 'hidden', fontSize: '0.85rem' }}>
          {value}
        </Box>
      )}
    </TableCell>
  );
});

export default Cell;