
import { useState, useEffect } from "react";

/**
 * Custom hook that returns whether the given media query matches the current viewport
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    // Set initial value
    const media = window.matchMedia(query);
    setMatches(media.matches);
    
    // Create event listener
    const listener = () => {
      setMatches(media.matches);
    };
    
    // Set up listeners for changes
    if (media.addEventListener) {
      media.addEventListener("change", listener);
    } else {
      // Fallback for older browsers
      media.addListener(listener);
    }
    
    // Clean up
    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", listener);
      } else {
        // Fallback for older browsers
        media.removeListener(listener);
      }
    };
  }, [query]);
  
  return matches;
}