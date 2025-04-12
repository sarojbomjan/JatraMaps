// src/utils/bookmarkEventService.js

// Save event ID to bookmarks
export const saveBookmark = (eventId) => {
    const bookmarks = getBookmarks();
    if (!bookmarks.includes(eventId)) {
      bookmarks.push(eventId);
      localStorage.setItem('bookmarkedEvents', JSON.stringify(bookmarks));
    }
  };
  
  // Remove event ID from bookmarks
  export const removeBookmark = (eventId) => {
    const bookmarks = getBookmarks();
    const updatedBookmarks = bookmarks.filter(id => id !== eventId);
    localStorage.setItem('bookmarkedEvents', JSON.stringify(updatedBookmarks));
  };
  
  // Get all bookmarked event IDs
  export const getBookmarks = () => {
    if (typeof window === 'undefined') return [];
    const bookmarks = localStorage.getItem('bookmarkedEvents');
    return bookmarks ? JSON.parse(bookmarks) : [];
  };
  
  // Check if event is bookmarked
  export const isBookmarked = (eventId) => {
    const bookmarks = getBookmarks();
    return bookmarks.includes(eventId);
  };
  
  // Export all functions as named exports
  export default {
    saveBookmark,
    removeBookmark,
    getBookmarks,
    isBookmarked
  };