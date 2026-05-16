import React, { useEffect, useRef, useContext } from 'react';
import { TableCell, InputBase, Box } from '@mui/material';
import { Context } from './Store';

const Cell = React.memo(({ value, rowIndex, colIndex, onChange, onEndEdit }) => {
  const { activeCell, setActiveCell, isEditing, setIsEditing, setSelection, selection } = useContext(Context);
  const cellRef = useRef(null);
  const inputRef = useRef(null);

  const isActive = activeCell?.r === rowIndex && activeCell?.c === colIndex;
  const isEditingThis = isActive && isEditing;

  useEffect(() => {
    if (isActive) {
      if (isEditingThis && inputRef.current) {
        inputRef.current.focus();
      } else if (cellRef.current) {
        cellRef.current.focus();
      }
    }
  }, [isActive, isEditingThis]);

  const handleKeyDown = (e) => {
    const isArrowKey = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key);

    if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault();
      e.stopPropagation();
      onEndEdit('enter');
      return;
    }

    if (isEditing) {
      if (isArrowKey) {
        e.preventDefault();
        e.stopPropagation();
        const direction = e.key.replace('Arrow', '').toLowerCase();
        onEndEdit(direction);
        return;
      }

      if (e.key === 'Escape') {
        setIsEditing(false);
        cellRef.current?.focus();
      }
    }
    else {
      if (isArrowKey) {
        e.preventDefault();
        const direction = e.key.replace('Arrow', '').toLowerCase();
        onEndEdit(direction);
      } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
        setIsEditing(true);
      }
    }
  };


  return (
    <TableCell
      id={`cell-${rowIndex}-${colIndex}`}
      ref={cellRef}
      tabIndex={0}
      onMouseDown={(e) => {
        if (e.button !== 0) return;
        e.preventDefault();
        setIsEditing(false);
        setActiveCell({ r: rowIndex, c: colIndex });
        setSelection({ start: { r: rowIndex, c: colIndex }, end: { r: rowIndex, c: colIndex }, isSelecting: true });
      }}
      onMouseEnter={() => {
        if (selection.isSelecting) setSelection(prev => ({ ...prev, end: { r: rowIndex, c: colIndex } }));
      }}
      onDoubleClick={() => setIsEditing(true)}
      onKeyDown={handleKeyDown}
      sx={{
        p: 0, height: 35, width: 100, border: '1px solid #eee',
        outline: isActive ? '2px solid #1a73e8 !important' : 'none',
        outlineOffset: '-2px', position: 'relative', bgcolor: 'white',
        zIndex: isActive ? 5 : 1, cursor: 'cell', userSelect: 'none'
      }}
    >
      {isEditingThis ? (
        <InputBase
          inputRef={inputRef}
          fullWidth
          value={value || ''}
          onChange={(e) => onChange(e.target.value, rowIndex, colIndex)}
          onKeyDown={handleKeyDown}
          onBlur={() => setIsEditing(false)}
          sx={{ px: 1, fontSize: '0.85rem', height: '100%', '& input': { height: '100%', p: 0 } }}
        />
      ) : (
        <Box sx={{ px: 1, fontSize: '0.85rem', lineHeight: '35px', height: '100%', overflow: 'hidden', pointerEvents: 'none' }}>
          {value}
        </Box>
      )}
    </TableCell>
  );
}, (prev, next) => {
  const wasActive = prev.activeCell?.r === prev.rowIndex && prev.activeCell?.c === prev.colIndex;
  const isNowActive = next.activeCell?.r === next.rowIndex && next.activeCell?.c === next.colIndex;

  return (
    prev.value === next.value &&
    wasActive === isNowActive &&
    prev.isEditing === next.isEditing &&
    prev.selection?.isSelecting === next.selection?.isSelecting
  );
});

export default Cell;