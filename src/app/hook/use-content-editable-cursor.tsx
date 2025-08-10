import { useRef, useCallback, useLayoutEffect } from 'react';

export function useContentEditableCursor() {
  const elementRef = useRef(null);
  const cursorPositionRef = useRef(null);
  
  const saveCursorPosition = useCallback(() => {
    if (typeof window === 'undefined' || !elementRef.current) return;
    
    const selection = window.getSelection();
    if (selection.rangeCount === 0) return;
    
    const range = selection.getRangeAt(0);
    const preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(elementRef.current);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    
    cursorPositionRef.current = {
      start: preSelectionRange.toString().length,
      end: preSelectionRange.toString().length + range.toString().length
    };
  }, []);
  
  const restoreCursorPosition = useCallback(() => {
    if (typeof window === 'undefined' || !elementRef.current || !cursorPositionRef.current) return;
    
    const { start, end } = cursorPositionRef.current;
    const range = document.createRange();
    const selection = window.getSelection();
    
    let currentOffset = 0;
    const walker = document.createTreeWalker(
      elementRef.current,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    
    let startNode = null;
    let endNode = null;
    let node;
    
    while (node = walker.nextNode()) {
      const nodeLength = node.textContent.length;
      
      if (!startNode && currentOffset + nodeLength >= start) {
        startNode = node;
        range.setStart(node, start - currentOffset);
      }
      
      if (!endNode && currentOffset + nodeLength >= end) {
        endNode = node;
        range.setEnd(node, end - currentOffset);
        break;
      }
      
      currentOffset += nodeLength;
    }
    
    if (startNode && endNode) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }, []);

  //I remove this since I restoring it manually in my component
  // Restore cursor after render
  // useLayoutEffect(() => {
  //   restoreCursorPosition();
  // });
  
  const clearCursorPosition = useCallback(() => {
    cursorPositionRef.current = null
  }, [])
  
  return { elementRef, saveCursorPosition, restoreCursorPosition, clearCursorPosition };
}
