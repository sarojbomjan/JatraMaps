// Save event
export const saveBookmark = (eventId) => {
  const bookmarks = getBookmarks();
  if (!bookmarks.includes(eventId)) {
    bookmarks.push(eventId);
    localStorage.setItem("bookmarkedEvents", JSON.stringify(bookmarks));
  }
};

// Remove event
export const removeBookmark = (eventId) => {
  const bookmarks = getBookmarks();
  const updatedBookmarks = bookmarks.filter((id) => id !== eventId);
  localStorage.setItem("bookmarkedEvents", JSON.stringify(updatedBookmarks));
};

// Get all saved events
export const getBookmarks = () => {
  if (typeof window === "undefined") return [];
  const bookmarks = localStorage.getItem("bookmarkedEvents");
  return bookmarks ? JSON.parse(bookmarks) : [];
};

// Check if event is bookmarked
export const isBookmarked = (eventId) => {
  const bookmarks = getBookmarks();
  return bookmarks.includes(eventId);
};

export default {
  saveBookmark,
  removeBookmark,
  getBookmarks,
  isBookmarked,
};
