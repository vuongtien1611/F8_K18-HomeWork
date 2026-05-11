import React, { useState, useCallback } from 'react';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Paper, Box } from '@mui/material';
import Row from './Row';

const Rows = 50;
const Cols = 50;

const Spreadsheet = () => {
  const [grid, setGrid] = useState(() =>
    Array.from({ length: Rows }, () => Array(Cols).fill(''))
  );

  const [activeCell, setActiveCell] = useState({ r: 0, c: 0 });
  const [isEditing, setIsEditing] = useState(false);

  const handleSelect = useCallback((r, c) => {
    setActiveCell({ r, c });
    setIsEditing(false);
  }, []);

  const handleStartEdit = useCallback(() => setIsEditing(true), []);

  const handleChange = useCallback((val, r, c) => {
    setGrid(prev => {
      const newGrid = [...prev];
      newGrid[r] = [...newGrid[r]];
      newGrid[r][c] = val;
      return newGrid;
    });
  }, []);

  const handleEndEdit = useCallback((direction) => {
    setIsEditing(false);
    setActiveCell(prev => {
      if (direction === 'right') {
        return { ...prev, c: prev.c < Cols - 1 ? prev.c + 1 : prev.c };
      } else if (direction === 'down') {
        return { ...prev, r: prev.r < Rows - 1 ? prev.r + 1 : prev.r };
      }
      return prev;
    });
  }, []);

  const handlers = { onSelect: handleSelect, onStartEdit: handleStartEdit, onEndEdit: handleEndEdit, onChange: handleChange };

  return (
    <Box sx={{ p: 2, height: '90vh' }}>
      <TableContainer component={Paper} sx={{ maxHeight: '100%', border: '1px solid #ccc' }}>
        <Table stickyHeader size="small" sx={{ tableLayout: 'fixed', width: Cols * 100 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{
                width: 50, bgcolor: '#f5f5f5',
                zIndex: 101,
                textAlign: 'center', borderRight: '1px solid #ccc'
              }}>
                #
              </TableCell>

              {Array.from({ length: Cols }).map((_, i) => (
                <TableCell
                  key={i}
                  sx={{
                    width: 100, bgcolor: '#f5f5f5', fontWeight: 'bold',
                    textAlign: 'center', borderRight: '1px solid #ccc',
                    zIndex: 100
                  }}
                >
                  {String.fromCharCode(65 + (i % 26))}{i >= 26 ? Math.floor(i / 26) : ''}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {grid.map((rowData, rowIndex) => (
              <Row
                key={rowIndex}
                rowIndex={rowIndex}
                rowData={rowData}
                activeCell={activeCell}
                isEditing={isEditing}
                handlers={handlers}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Spreadsheet;