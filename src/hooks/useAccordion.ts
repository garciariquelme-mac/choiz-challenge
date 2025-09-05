import { useState, useCallback } from 'react';
import { UseAccordionReturn } from '../types';

export function useAccordion(): UseAccordionReturn {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = useCallback((id: string) => {
    setOpenItems(prevOpenItems => {
      const newOpenItems = new Set(prevOpenItems);
      if (newOpenItems.has(id)) {
        newOpenItems.delete(id);
      } else {
        newOpenItems.add(id);
      }
      return newOpenItems;
    });
  }, []);

  const isOpen = useCallback((id: string) => {
    return openItems.has(id);
  }, [openItems]);

  const openItem = useCallback((id: string) => {
    setOpenItems(prevOpenItems => {
      const newOpenItems = new Set(prevOpenItems);
      newOpenItems.add(id);
      return newOpenItems;
    });
  }, []);

  const closeItem = useCallback((id: string) => {
    setOpenItems(prevOpenItems => {
      const newOpenItems = new Set(prevOpenItems);
      newOpenItems.delete(id);
      return newOpenItems;
    });
  }, []);

  const closeAll = useCallback(() => {
    setOpenItems(new Set());
  }, []);

  return {
    openItems,
    toggleItem,
    isOpen,
    openItem,
    closeItem,
    closeAll,
  };
}
