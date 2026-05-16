import React, { useState, useCallback, useContext, useEffect, useRef } from 'react';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Paper } from '@mui/material';
import { Context } from './Store';
import Row from './Row';
import CellSelection from './CellSelection';

const ROWS = 50;
const COLS = 50;

const Spreadsheet = () => {
  const [grid, setGrid] = useState(() => Array.from({length: ROWS}, () => Array(COLS).fill('')));
  const {setActiveCell, setIsEditing, setSelection, tableRef, selection} = useContext(Context);
  const scrollRequestRef = useRef(null);

  // Auto-scroll: Tự động cuộn khi kéo chuột sát mép
  const startAutoScroll = useCallback((e) => {
    if (!selection.isSelecting || !tableRef.current) return;
    const container = tableRef.current;
    const rect = container.getBoundingClientRect();
    const threshold = 40;
    let scrollX = 0;
    let scrollY = 0;

    if (e.clientX > rect.right - threshold) scrollX = 20;
    else if (e.clientX < rect.left + threshold) scrollX = -20;
    if (e.clientY > rect.bottom - threshold) scrollY = 20;
    else if (e.clientY < rect.top + threshold) scrollY = -20;

    if (scrollX !== 0 || scrollY !== 0) {
      container.scrollBy(scrollX, scrollY);
      scrollRequestRef.current = requestAnimationFrame(() => startAutoScroll(e));
    }
  }, [selection.isSelecting, tableRef]);

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (selection.isSelecting) {
        cancelAnimationFrame(scrollRequestRef.current);
        startAutoScroll(e);
      }
    };
    const handleGlobalMouseUp = () => {
      setSelection(p => ({...p, isSelecting: false}));
      cancelAnimationFrame(scrollRequestRef.current);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      cancelAnimationFrame(scrollRequestRef.current);
    };
  }, [selection.isSelecting, setSelection, startAutoScroll]);

  // Spreadsheet.jsx
  const handleEndEdit = useCallback((dir) => {
    setActiveCell(prev => {
      const currR = prev?.r ?? 0;
      const currC = prev?.c ?? 0;

      let nextR = currR;
      let nextC = currC;

      switch (dir) {
        case 'up':
          nextR = Math.max(0, currR - 1);
          setIsEditing(false); // Di chuyển bằng mũi tên thì tắt Edit
          break;
        case 'down':
          nextR = Math.min(ROWS - 1, currR + 1);
          setIsEditing(false);
          break;
        case 'left':
          if (currC === 0) {
            if (currR > 0) { nextR = currR - 1; nextC = COLS - 1; }
          } else {
            nextC = currC - 1;
          }
          setIsEditing(false);
          break;
        case 'right':
          // Phím mũi tên phải
          if (currC === COLS - 1) {
            if (currR < ROWS - 1) { nextR = currR + 1; nextC = 0; }
          } else {
            nextC = currC + 1;
          }
          setIsEditing(false);
          break;
        case 'enter':
          if (currC === COLS - 1) {
            if (currR < ROWS - 1) { nextR = currR + 1; nextC = 0; }
            else return prev;
          } else {
            nextC = currC + 1;
          }
          setIsEditing(true);
          break;
        default:
          break;
      }

      const newPos = { r: nextR, c: nextC };
      setSelection({ start: newPos, end: newPos, isSelecting: false });
      return newPos;
    });
  }, [COLS, ROWS, setIsEditing, setSelection, setActiveCell]);

  const handleChange = useCallback((val, r, c) => {
    setGrid(p => {
      if (p[r][c] === val) return p;
      const newGrid = [...p];
      newGrid[r] = [...newGrid[r]];
      newGrid[r][c] = val;
      return newGrid;
    });
  }, []);

  const {start, end} = selection;
  const minC = start.c !== null ? Math.min(start.c, end.c) : -1;
  const maxC = start.c !== null ? Math.max(start.c, end.c) : -1;
  const hasSelection = start.r !== null;

  return (
    <TableContainer
      ref={tableRef}
      component={Paper}
      sx={{
        width: '100%',
        height: 'calc(100vh - 60px)',
        position: 'relative',
        overflow: 'auto',
        borderRadius: 0,
        boxShadow: 'none',
        border: '1px solid #ccc',
        userSelect: 'none'
      }}
    >
      <CellSelection/>

      <Table stickyHeader size="small" sx={{tableLayout: 'fixed', width: COLS * 100}}>
        <TableHead>
          <TableRow>
            <TableCell sx={{
              width: 50,
              bgcolor: '#f5f5f5',
              zIndex: 105,
              borderRight: '1px solid #ccc',
              borderBottom: '1px solid #ccc',
              textAlign: 'center',
              fontWeight: 'bold',
              left: 0,
              position: 'sticky'
            }}>
              #
            </TableCell>

            {Array.from({length: COLS}).map((_, i) => {
              const isColSel = hasSelection && i >= minC && i <= maxC;

              return (
                <TableCell key={i} sx={{
                  width: 100,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  borderRight: '1px solid #ccc',
                  borderBottom: '1px solid #ccc',
                  bgcolor: isColSel ? '#e8f0fe' : '#f5f5f5',
                  color: isColSel ? '#1a73e8' : '#666',
                  zIndex: 101,
                  transition: 'background-color 0.1s ease'
                }}>
                  {i < 26
                    ? String.fromCharCode(65 + i)
                    : String.fromCharCode(64 + Math.floor(i / 26)) + String.fromCharCode(65 + (i % 26))}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>

        <TableBody>
          {grid.map((row, rIdx) => (
            <Row
              key={rIdx}
              rowIndex={rIdx}
              rowData={row}
              onChange={handleChange}
              onEndEdit={handleEndEdit}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default Spreadsheet;