import React, { useContext, useMemo } from 'react';
import { TableRow, TableCell } from '@mui/material';
import Cell from './Cell';
import { Context } from './Store';

const Row = React.memo(({ rowIndex, rowData, onChange, onEndEdit }) => {
  const { selection } = useContext(Context);

  const isRowSel = useMemo(() => {
    const startR = selection?.start?.r;
    const endR = selection?.end?.r;

    if (startR === undefined || startR === null || endR === undefined || endR === null) {
      return false;
    }

    const minR = Math.min(startR, endR);
    const maxR = Math.max(startR, endR);

    return rowIndex >= minR && rowIndex <= maxR;
  }, [selection?.start?.r, selection?.end?.r, rowIndex]);

  return (
    <TableRow sx={{ height: 35 }}>
      <TableCell
        sx={{
          width: 50,
          position: 'sticky',
          left: 0,
          zIndex: 10,
          textAlign: 'center',
          p: 0,
          bgcolor: isRowSel ? '#e8f0fe' : '#f5f5f5',
          color: isRowSel ? '#1a73e8' : '#666',
          fontWeight: isRowSel ? 'bold' : 'normal',
          borderRight: '1px solid #ccc',
          borderBottom: '1px solid #eee',
          userSelect: 'none'
        }}
      >
        {rowIndex + 1}
      </TableCell>

      {rowData.map((val, cIdx) => (
        <Cell
          key={cIdx}
          rowIndex={rowIndex}
          colIndex={cIdx}
          value={val}
          onChange={onChange}
          onEndEdit={onEndEdit}
        />
      ))}
    </TableRow>
  );
});

export default Row;