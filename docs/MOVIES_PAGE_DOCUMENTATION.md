# Movies Page - Documentation

## Overview

The **movies.html** page displays a comprehensive collection of anime movies in a grid layout. Users can browse, filter by genre, search, and bookmark their favorite movies.

---

## Features Used

### 1. **Page Loading Animation**

- **Description**: Consistent Pokéball loader across all pages
- **Implementation**:

```javascript
window.addEventListener("load", () => {
  const loader = document.querySelector(".page-loader");
  const progressText = document.querySelector(".progress-text");
  let progress = 0;

  const progressInterval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(progressInterval);
      setTimeout(() => {
        loader.classList.add("hidden");
      }, 300);
    }
    progressText.textContent = Math.floor(progress) + "%";
  }, 100);
});
```

---

### 2. **Movie Data Loading**

- **Description**: Fetches movie data from JSON file
- **Implementation**:

```javascript
fetch("data/Movie.json")
  .then((r) => r.json())
  .then((data) => {
    moviesData = data;
    filteredMovies = [...data];
    renderMovies();
    initFilters();
  })
  .catch((err) => {
    console.error("Could not load Movie.json", err);
  });
```

- **Data Structure**:

```json
{
  "id": 1,
  "title": "Your Name",
  "year": 2016,
  "rating": 8.4,
  "image": "image/yourname.jpg",
  "genres": ["Romance", "Drama", "Fantasy"],
  "synopsis": "Description...",
  "wiki": "https://wikipedia.org/..."
}
```

---

### 3. **Movie Grid Rendering**

- **Description**: Dynamically creates movie cards in a responsive grid
- **Implementation**:

```javascript
function renderMovies() {
  const grid = document.getElementById("moviesGrid");
  grid.innerHTML = "";

  if (filteredMovies.length === 0) {
    grid.innerHTML = '<p>No movies found matching your criteria.</p>';
    return;
  }

  filteredMovies.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "movie-card";

    // Star rating calculation
    const normalizedRating = (movie.rating / 10) * 5;
    const fullStars = Math.floor(normalizedRating);
    const emptyStars = 5 - fullStars;
    const starsHTML = "★".repeat(fullStars) + "☆".repeat(emptyStars);

    card.innerHTML = `
      <div class="movie-card-image-wrapper">
        <div class="movie-year-badge">${movie.year}</div>
        <div class="movie-card-rating">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <span class="rating-text">${movie.rating}</span>
        </div>
        <img src="${movie.image}" alt="${movie.title}">
      </div>
      <div class="movie-card-content">
        <h3 class="movie-card-title">${movie.title}</h3>
        <div class="movie-card-stars">${starsHTML}</div>
        <p class="movie-card-genres">${movie.genres.join(" • ")}</p>
        <button class="movie-watch-btn">Watch Now</button>
      </div>
      <button class="movie-bookmark-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
        </svg>
      </button>
    `;

    grid.appendChild(card);
  });
}
```

---

### 4. **Star Rating System**

- **Description**: Converts 10-point scale to 5-star visual rating
- **Implementation**:

```javascript
// Normalize rating from 10-point scale to 5-star scale
const normalizedRating = (movie.rating / 10) * 5; // 8.4/10 → 4.2/5
const fullStars = Math.floor(normalizedRating);   // 4
const emptyStars = 5 - fullStars;                 // 1
const starsHTML = "★".repeat(fullStars) + "☆".repeat(emptyStars); // ★★★★☆
```

- **CSS Styling**:

```css
.movie-card-stars {
  color: #ffd700;
  font-size: 1rem;
  letter-spacing: 2px;
}
```

---

### 5. **Filter System**

- **Description**: Filter movies by genre with active state management
- **Implementation**:

```javascript
function initFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active state
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const genre = btn.dataset.genre;

      if (genre === "All") {
        filteredMovies = [...moviesData];
      } else {
        filteredMovies = moviesData.filter((movie) =>
          movie.genres.includes(genre)
        );
      }

      renderMovies();
    });
  });
}
```

- **HTML Structure**:

```html
<div class="filters-section">
  <button class="filter-btn active" data-genre="All">All</button>
  <button class="filter-btn" data-genre="Action">Action</button>
  <button class="filter-btn" data-genre="Romance">Romance</button>
  <button class="filter-btn" data-genre="Comedy">Comedy</button>
  <button class="filter-btn" data-genre="Fantasy">Fantasy</button>
</div>
```

---

### 6. **Search Functionality**

- **Description**: Real-time search across movie titles and genres
- **Implementation**:

```javascript
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = input.value && input.value.trim().toLowerCase();
  
  if (!query) {
    filteredMovies = [...moviesData];
  } else {
    filteredMovies = moviesData.filter(
      (movie) =>
        movie.title.toLowerCase().includes(query) ||
        movie.genres.some((g) => g.toLowerCase().includes(query))
    );
  }
  
  renderMovies();
});
```

---

### 7. **Bookmark Toggle System**

- **Description**: Save/remove movies from bookmarks with visual feedback
- **Implementation**:

```javascript
function toggleBookmark(item) {
  let bookmarks = JSON.parse(localStorage.getItem("animeBookmarks") || "[]");
  const existingIndex = bookmarks.findIndex(
    (bookmark) => bookmark.id === item.id && bookmark.type === item.type
  );

  if (existingIndex !== -1) {
    bookmarks.splice(existingIndex, 1);
    localStorage.setItem("animeBookmarks", JSON.stringify(bookmarks));
    return false; // Removed
  } else {
    bookmarks.push(item);
    localStorage.setItem("animeBookmarks", JSON.stringify(bookmarks));
    return true; // Added
  }
}

function isBookmarked(item) {
  const bookmarks = JSON.parse(localStorage.getItem("animeBookmarks") || "[]");
  return bookmarks.some(
    (bookmark) => bookmark.id === item.id && bookmark.type === item.type
  );
}
```

- **Visual Feedback**:

```javascript
card.querySelector(".movie-bookmark-btn").addEventListener("click", (e) => {
  e.stopPropagation();
  const movieWithType = { ...movie, type: "movie" };
  const isAdded = toggleBookmark(movieWithType);
  const btn = e.currentTarget;
  const svg = btn.querySelector("svg");

  if (isAdded) {
    svg.setAttribute("fill", "rgb(117, 103, 210)");
    svg.setAttribute("stroke", "rgb(117, 103, 210)");
  } else {
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
  }
});
```

---

### 8. **Movie Card Hover Effects**

- **Description**: Smooth animations on hover with scale and shadow
- **CSS Implementation**:

```css
.movie-card {
  background: var(--panel);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.movie-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.movie-card:hover .movie-card-image-wrapper img {
  transform: scale(1.1);
}
```

---

### 9. **Responsive Grid Layout**

- **Description**: Adaptive grid that adjusts to screen size
- **CSS Implementation**:

```css
.movies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  padding: 30px;
}

@media (max-width: 768px) {
  .movies-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .movies-grid {
    grid-template-columns: 1fr;
  }
}
```

---

### 10. **Year Badge**

- **Description**: Displays release year in top-left corner
- **Implementation**:

```html
<div class="movie-year-badge">2016</div>
```

```css
.movie-year-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgb(117, 103, 210);
  color: #fff;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 700;
  z-index: 2;
}
```

---

### 11. **Empty State Handling**

- **Description**: Shows message when no movies match filters
- **Implementation**:

```javascript
if (filteredMovies.length === 0) {
  grid.innerHTML = `
    <p style="color: rgba(255,255,255,0.6); text-align: center;">
      No movies found matching your criteria.
    </p>
  `;
  return;
}
```

---

## File Structure

```
movies.html         - Movies page HTML
movies.js           - Movies page JavaScript
movies.css          - Movies-specific styles
styles.css          - Shared global styles
data/Movie.json     - Movies data source
```

---

## Key CSS Classes

- `.movie-card` - Individual movie card container
- `.movie-card-image-wrapper` - Image container with badges
- `.movie-card-rating` - Star rating display
- `.movie-year-badge` - Release year badge
- `.movie-bookmark-btn` - Bookmark toggle button
- `.filter-btn` - Genre filter button
- `.movies-grid` - Main grid container

---

## Data Flow

1. **Load**: Fetch Movie.json on page load
2. **Store**: Save to `moviesData` array
3. **Filter**: User clicks genre → update `filteredMovies`
4. **Search**: User types query → filter by title/genre
5. **Render**: Generate cards from `filteredMovies`
6. **Bookmark**: Click bookmark → save to localStorage

---

## LocalStorage Structure

```javascript
// Stored under key: "animeBookmarks"
[
  {
    "id": 1,
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

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid support required
- LocalStorage API required
- ES6+ JavaScript features
