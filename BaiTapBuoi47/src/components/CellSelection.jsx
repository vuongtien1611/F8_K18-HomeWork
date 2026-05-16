import React, { useContext, useMemo } from 'react';
import { Box } from '@mui/material';
import { Context } from './Store';

const CellSelection = () => {
  const { selection, tableRef } = useContext(Context);
  const { start, end } = selection;

  const style = useMemo(() => {
    if (start.r === null || !tableRef.current) return { display: 'none' };
    const startEl = document.getElementById(`cell-${start.r}-${start.c}`);
    const endEl = document.getElementById(`cell-${end.r}-${end.c}`);
    if (!startEl || !endEl) return { display: 'none' };

    const tableRect = tableRef.current.getBoundingClientRect();
    const startRect = startEl.getBoundingClientRect();
    const endRect = endEl.getBoundingClientRect();

    return {
      position: 'absolute',
      top: Math.min(startRect.top, endRect.top) - tableRect.top + tableRef.current.scrollTop,
      left: Math.min(startRect.left, endRect.left) - tableRect.left + tableRef.current.scrollLeft,
      width: Math.max(startRect.right, endRect.right) - Math.min(startRect.left, endRect.left),
      height: Math.max(startRect.bottom, endRect.bottom) - Math.min(startRect.top, endRect.top),
      border: '1.5px solid #1a73e8',
      backgroundColor: 'rgba(26, 115, 232, 0.1)',
      pointerEvents: 'none',
      zIndex: 2,
      willChange: 'top, left, width, height'
    };
  }, [selection]);

  return (
    <Box sx={style}>
      <Box sx={{ position: 'absolute', bottom: -4, right: -4, width: 7, height: 7, bgcolor: '#1a73e8', border: '1px solid white' }} />
    </Box>
  );
};

export default CellSelection;