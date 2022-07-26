import { useState } from 'react';
import { useBetween } from 'use-between';

const useCounter = () => {
  const [isSidebarOpen, setOpen] = useState(true);
  const setSidebarOpen = (open: boolean ) => setOpen(open);
  return {
    isSidebarOpen,
    setSidebarOpen,
  };
};

export const useSidebarOpen = () => useBetween(useCounter);