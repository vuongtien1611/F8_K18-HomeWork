import React from 'react';
import { TableRow, TableCell } from '@mui/material';
import Cell from './Cell';

const Row = React.memo(({ rowIndex, rowData, activeCell, isEditing, handlers }) => {
  return (
    <TableRow sx={{ height: 35 }}>
      <TableCell sx={{
        bgcolor: '#f5f5f5', borderRight: '1px solid #ccc', textAlign: 'center',
        position: 'sticky', left: 0, zIndex: 10, p: 0
      }}>
        {rowIndex + 1}
      </TableCell>

      {rowData.map((cellValue, colIndex) => (
        <Cell
          key={colIndex}
          value={cellValue}
          rowIndex={rowIndex}
          colIndex={colIndex}
          isActive={activeCell.r === rowIndex && activeCell.c === colIndex}
          isEditing={activeCell.r === rowIndex && activeCell.c === colIndex && isEditing}
          {...handlers}
        />
      ))}
    </TableRow>
  );
}, (prev, next) => {
  const isTargetRow = next.activeCell.r === next.rowIndex || prev.activeCell.r === prev.rowIndex;
  const isDataChanged = prev.rowData !== next.rowData;
  return !isTargetRow && !isDataChanged;
});

export default Row;