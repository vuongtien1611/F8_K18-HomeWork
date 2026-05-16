import React, { createContext, useState, useRef } from 'react';

export const Context = createContext();

export const StoreProvider = ({ children }) => {
  const [selection, setSelection] = useState({
    start: { r: 0, c: 0 },
    end: { r: 0, c: 0 },
    isSelecting: false
  });
  const [activeCell, setActiveCell] = useState({ r: 0, c: 0 });
  const [isEditing, setIsEditing] = useState(false);
  const tableRef = useRef(null);

  return (
    <Context.Provider value={{ selection, setSelection, activeCell, setActiveCell, isEditing, setIsEditing, tableRef }}>
      {children}
    </Context.Provider>
  );
};