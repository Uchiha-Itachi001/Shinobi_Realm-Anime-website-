# Bookmarks Page - Documentation

## Overview

The **bookmarks.html** page displays all anime and movies that users have saved to their bookmarks. It provides statistics, filtering, and management capabilities for the user's collection.

---

## Features Used

### 1. **Bookmark Data Loading**

- **Description**: Loads bookmarks from browser's localStorage
- **Implementation**:

```javascript
function loadBookmarks() {
  allBookmarks = JSON.parse(localStorage.getItem("animeBookmarks") || "[]");
  filteredBookmarks = [...allBookmarks];
  updateStats();
  renderBookmarks();
}
```

---

### 2. **Statistics Dashboard**

- **Description**: Displays count of total bookmarks, anime, and movies
- **Implementation**:

```javascript
function updateStats() {
  const animeCount = allBookmarks.filter((b) => b.type === "anime").length;
  const movieCount = allBookmarks.filter((b) => b.type === "movie").length;

  document.getElementById("totalBookmarks").textContent = allBookmarks.length;
  document.getElementById("animeCount").textContent = animeCount;
  document.getElementById("moviesCount").textContent = movieCount;
}
```

- **HTML Structure**:

```html
<div class="stats-section">
  <div class="stat-card">
    <div class="stat-number" id="totalBookmarks">0</div>
    <div class="stat-label">Total Bookmarks</div>
  </div>
  <div class="stat-card">
    <div class="stat-number" id="animeCount">0</div>
    <div class="stat-label">Anime Series</div>
  </div>
  <div class="stat-card">
    <div class="stat-number" id="moviesCount">0</div>
    <div class="stat-label">Movies</div>
  </div>
</div>
```

---

### 3. **Bookmarks Rendering**

- **Description**: Dynamically creates bookmark cards
- **Implementation**:

```javascript
function renderBookmarks() {
  const grid = document.getElementById("bookmarksGrid");
  grid.innerHTML = "";

  if (filteredBookmarks.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center;">
        <svg width="120" height="120">...</svg>
        <h2>No Bookmarks Yet</h2>
        <p>Start adding your favorite anime and movies!</p>
        <a href="index.html" class="browse-btn">Browse Anime</a>
      </div>
    `;
    return;
  }

  filteredBookmarks.forEach((item) => {
    const card = document.createElement("div");
    card.className = "movie-card";

    const normalizedRating = (item.rating / 10) * 5;
    const fullStars = Math.floor(normalizedRating);
    const emptyStars = 5 - fullStars;
    const starsHTML = "★".repeat(fullStars) + "☆".repeat(emptyStars);

    const typeBadge = item.type === "movie" ? "MOVIE" : "ANIME";
    const typeBadgeColor = item.type === "movie" ? "rgb(117, 103, 210)" : "var(--accent1)";

    card.innerHTML = `
      <div class="movie-card-image-wrapper">
        <div class="movie-year-badge" style="background: ${typeBadgeColor}">${typeBadge}</div>
        <div class="movie-card-rating">
          <svg>...</svg>
          <span>${item.rating}</span>
        </div>
        <img src="${item.image}" alt="${item.title}">
      </div>
      <div class="movie-card-content">
        <h3>${item.title}</h3>
        <div class="movie-card-stars">${starsHTML}</div>
        <p>${item.genres.join(" • ")}</p>
        <button class="remove-bookmark-btn">Remove</button>
      </div>
    `;

    grid.appendChild(card);
  });
}
```

---

### 4. **Type Badge Differentiation**

- **Description**: Visual distinction between anime and movies
- **Implementation**:

```javascript
const typeBadge = item.type === "movie" ? "MOVIE" : "ANIME";
const typeBadgeColor = item.type === "movie" 
  ? "rgb(117, 103, 210)"  // Purple for movies
  : "var(--accent1)";      // Red/orange for anime
```

- **CSS**:

```css
.movie-year-badge {
  background: rgb(117, 103, 210);
  color: #fff;
  padding: 6px 12px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.85rem;
}
```

---

### 5. **Remove Bookmark Functionality**

- **Description**: Remove items from bookmarks collection
- **Implementation**:

```javascript
card.querySelector(".remove-bookmark-btn").addEventListener("click", (e) => {
  e.stopPropagation();
  
  // Remove from localStorage
  let bookmarks = JSON.parse(localStorage.getItem("animeBookmarks") || "[]");
  bookmarks = bookmarks.filter(
    (b) => !(b.id === item.id && b.type === item.type)
  );
  localStorage.setItem("animeBookmarks", JSON.stringify(bookmarks));

  // Reload bookmarks
  loadBookmarks();
});
```

---

### 6. **Search in Bookmarks**

- **Description**: Search through bookmarked items by title or genre
- **Implementation**:

```javascript
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = input.value && input.value.trim().toLowerCase();
  
  if (!query) {
    filteredBookmarks = [...allBookmarks];
  } else {
    filteredBookmarks = allBookmarks.filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        (item.genres && item.genres.some((g) => g.toLowerCase().includes(query)))
    );
  }
  
  renderBookmarks();
});
```

---

### 7. **Filter by Type**

- **Description**: Filter bookmarks to show only anime or only movies
- **Implementation**:

```javascript
function initFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterType = btn.dataset.filter;

      if (filterType === "all") {
        filteredBookmarks = [...allBookmarks];
      } else if (filterType === "anime") {
        filteredBookmarks = allBookmarks.filter((item) => item.type === "anime");
      } else if (filterType === "movie") {
        filteredBookmarks = allBookmarks.filter((item) => item.type === "movie");
      }

      renderBookmarks();
    });
  });
}
```

- **HTML**:

```html
<div class="filters-section">
  <button class="filter-btn active" data-filter="all">All</button>
  <button class="filter-btn" data-filter="anime">Anime Only</button>
  <button class="filter-btn" data-filter="movie">Movies Only</button>
</div>
```

---

### 8. **Empty State Design**

- **Description**: User-friendly empty state when no bookmarks exist
- **Implementation**:

```javascript
if (filteredBookmarks.length === 0) {
  grid.innerHTML = `
    <div style="grid-column: 1/-1; text-align: center; padding: 80px 20px;">
      <svg width="120" height="120" viewBox="0 0 24 24" fill="none" 
           stroke="rgba(117, 103, 210, 0.3)" stroke-width="1">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
      </svg>
      <h2 style="color: #fff; font-size: 1.8rem; margin-bottom: 12px;">
        No Bookmarks Yet
      </h2>
      <p style="color: rgba(255,255,255,0.6); font-size: 1.1rem;">
        Start adding your favorite anime and movies to your collection!
      </p>
      <a href="index.html" class="browse-btn">
        <svg>...</svg>
        Browse Anime
      </a>
    </div>
  `;
  return;
}
```

---

### 9. **Stat Cards Animation**

- **Description**: Animated statistics cards with hover effects
- **CSS**:

```css
.stat-card {
  background: var(--panel);
  padding: 30px;
  border-radius: 16px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(117, 103, 210, 0.2);
  border-color: rgba(117, 103, 210, 0.3);
}

.stat-number {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #8e7bff, #ff6b6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stat-label {
  color: rgba(255, 255, 255, 0.6);
  font-size: 1rem;
  margin-top: 10px;
  font-weight: 500;
}
```

---

### 10. **Grid Layout**

- **Description**: Responsive grid for bookmark cards
- **CSS**:

```css
.bookmarks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  padding: 30px;
}

@media (max-width: 768px) {
  .bookmarks-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }
}

@media (max-width: 480px) {
  .bookmarks-grid {
    grid-template-columns: 1fr;
  }
}
```

---

### 11. **Remove Button with Confirmation**

- **Description**: Visual feedback when removing bookmarks
- **CSS**:

```css
.remove-bookmark-btn {
  background: rgba(255, 107, 107, 0.1);
  color: #ff6b6b;
  border: 1px solid rgba(255, 107, 107, 0.3);
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.remove-bookmark-btn:hover {
  background: rgba(255, 107, 107, 0.2);
  border-color: rgba(255, 107, 107, 0.5);
  transform: scale(1.05);
}
```

---

## Data Structure

### LocalStorage Format

```javascript
// Key: "animeBookmarks"
// Value: JSON array
[
  {
    "id": 1,
    "title": "Naruto",
    "type": "anime",
    "year": 2002,
    "rating": 8.3,
    "image": "image/naruto.jpg",
    "genres": ["Action", "Adventure"],
    "synopsis": "...",
    "wiki": "..."
  },
  {
    "id": 15,
    "title": "Your Name",
    "type": "movie",
    "year": 2016,
    "rating": 8.4,
    "image": "image/yourname.jpg",
    "genres": ["Romance", "Drama"],
    "synopsis": "...",
    "wiki": "..."
  }
]
```

---

## File Structure

```
bookmarks.html      - Bookmarks page HTML
bookmarks.js        - Bookmarks functionality
movies.css          - Shared card styles
styles.css          - Global styles
```

---

## Key Functions

| Function | Purpose |
|----------|---------|
| `loadBookmarks()` | Load bookmarks from localStorage |
| `updateStats()` | Update statistics counters |
| `renderBookmarks()` | Create bookmark cards |
| `initFilters()` | Setup filter buttons |
| `removeBookmark()` | Remove item from bookmarks |

---

## User Workflow

1. **View Bookmarks**: Page loads → displays all saved items
2. **See Stats**: Dashboard shows total/anime/movie counts
3. **Filter**: Click filter buttons to show specific types
4. **Search**: Type query to find specific bookmarks
5. **Remove**: Click remove button to delete bookmark
6. **Navigate**: Click card to view details (future feature)

---

## Edge Cases Handled

1. **Empty Bookmarks**: Shows friendly empty state with browse button
2. **No Search Results**: Displays message when search yields nothing
3. **Type Safety**: Checks for `item.type` before filtering
4. **Null Checks**: Uses `|| "[]"` when parsing localStorage
5. **Genre Array**: Checks if `item.genres` exists before using `.some()`

---

## Browser Compatibility

- Modern browsers with localStorage support
- ES6+ JavaScript features (arrow functions, template literals)
- CSS Grid and Flexbox
- Array methods (filter, some, forEach)
