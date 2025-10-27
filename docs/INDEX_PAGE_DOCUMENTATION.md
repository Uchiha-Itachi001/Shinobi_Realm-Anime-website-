# Index Page (Home Page) - Documentation

## Overview
The **index.html** is the main landing page of the ShinobiRealm anime website. It features a full-screen hero slider showcasing featured anime, a carousel of best anime, and a grid of latest anime additions.

---

## Features Used

### 1. **Page Loading Animation**

**Description**: Animated Pokéball loader with progress percentage that shows while the page is loading.

**What it does for beginners**: 
- Shows a fun animated Pokéball while your page loads
- Displays a percentage (0% to 100%) to show loading progress
- Automatically hides when loading is complete

**File Location**: `script.js` (Lines 6-23)

**Implementation Code**:
```javascript
// File: script.js
// Lines: 6-23
// Purpose: Show loading screen with progress percentage

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

**How it Works (Step-by-Step)**:
1. **Wait for page load**: `window.addEventListener("load")` waits for the entire page to load
2. **Get HTML elements**: Finds the loader container and progress text on the page
3. **Start at 0%**: Sets initial progress to 0
4. **Increment progress**: Every 100ms, adds a random amount (5-20%) to progress
5. **Check completion**: When progress reaches 100%, stops the timer
6. **Hide loader**: After 300ms delay, adds "hidden" class to fade out the loader
7. **Update display**: Shows the current percentage on screen

**HTML Element** (in `index.html`, Lines 18-36):
```html
<div class="page-loader">
    <div class="loader-content">
        <svg class="loader-pokeball">...</svg>
        <p class="loader-text">Loading...</p>
    </div>
    <div class="progress-indicator">
        <span class="progress-text">0%</span>
    </div>
</div>
```

**CSS Animation** (in `styles.css`, Lines 42-97):
```css
/* Makes the Pokéball wiggle */
.pokeball_group {
    animation: wiggle 1.25s ease-in-out infinite;
}

/* Hides the loader when done */
.page-loader.hidden {
    opacity: 0;
    visibility: hidden;
}
```

---

### 2. **Hero Slider (Full-Screen)**

**Description**: A full-screen auto-playing carousel that displays anime with beautiful background images, titles, ratings, and action buttons.

**What it does for beginners**: 
- Automatically shows different anime one after another (like a slideshow)
- Users can click arrows to go back/forward
- Click dots at the bottom to jump to a specific anime
- Pauses when you hover your mouse over it

**File Locations**: 
- JavaScript: `script.js` (Lines 149-280)
- HTML: `index.html` (Lines 158-186)
- CSS: `styles.css` (Lines 1200-1400)

**Step 1: Initialize the Slider** (`script.js`, Lines 149-186):
```javascript
// File: script.js | Lines: 149-186
// Purpose: Set up the slider when page loads

function initSlider() {
  const container = document.querySelector(".slider-container");
  const indicatorsContainer = document.querySelector(".slider-indicators");

  if (!container || !animeData.length) return;

  // Loop through each anime and create a slide
  animeData.forEach((anime, index) => {
    const slide = createSlide(anime, index);
    container.appendChild(slide);

    // Create clickable dot for each slide
    const indicator = document.createElement("div");
    indicator.className = "indicator" + (index === 0 ? " active" : "");
    indicator.addEventListener("click", () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
  });

  // Make first slide visible
  container.children[0].classList.add("active");

  // Connect arrow buttons
  document.querySelector(".slider-prev").addEventListener("click", prevSlide);
  document.querySelector(".slider-next").addEventListener("click", nextSlide);

  // Start auto-play
  startAutoPlay();

  // Pause when mouse is over slider
  const heroSlider = document.getElementById("heroSlider");
  heroSlider.addEventListener("mouseenter", stopAutoPlay);
  heroSlider.addEventListener("mouseleave", startAutoPlay);
}
```

**Step 2: Create Each Slide** (`script.js`, Lines 189-224):
```javascript
// File: script.js | Lines: 189-224
// Purpose: Build HTML for one anime slide

function createSlide(anime, index) {
  const slide = document.createElement("div");
  slide.className = "slide";
  slide.dataset.index = index;

  slide.innerHTML = `
    <div class="slide-bg" style="background-image: url('${anime.image}')"></div>
    <div class="slide-overlay"></div>
    <div class="live-badge">LIVE</div>
    <h1 class="anime-title">${anime.title}</h1>
    <div class="anime-meta">
      <strong>Year:</strong> ${anime.year}
      <strong>Rating:</strong> ⭐ ${anime.rating}/10
    </div>
    <p class="anime-description">${anime.synopsis}</p>
    <button class="btn btn-primary">▶ Watch Now</button>
  `;
  return slide;
}
```

**Step 3: Navigation Functions** (`script.js`, Lines 227-268):
```javascript
// File: script.js | Lines: 227-268

// Jump to a specific slide number
function goToSlide(index) {
  const slides = document.querySelectorAll(".slide");
  const indicators = document.querySelectorAll(".indicator");
  
  // Hide current slide
  slides[currentSlide].classList.remove("active");
  indicators[currentSlide].classList.remove("active");
  
  // Show new slide
  currentSlide = index;
  slides[currentSlide].classList.add("active");
  indicators[currentSlide].classList.add("active");
  
  // Restart auto-play timer
  stopAutoPlay();
  startAutoPlay();
}

// Move to next slide
function nextSlide() {
  const nextIndex = (currentSlide + 1) % animeData.length;
  goToSlide(nextIndex);
}

// Move to previous slide
function prevSlide() {
  const prevIndex = (currentSlide - 1 + animeData.length) % animeData.length;
  goToSlide(prevIndex);
}

// Start automatic sliding every 5 seconds
function startAutoPlay() {
  autoPlayInterval = setInterval(nextSlide, 5000);
}

// Stop automatic sliding
function stopAutoPlay() {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
  }
}
```

**Step 4: Keyboard Controls** (`script.js`, Lines 272-280):
```javascript
// File: script.js | Lines: 272-280
// Purpose: Let users control slider with arrow keys

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    prevSlide();  // Press ← to go back
  } else if (e.key === "ArrowRight") {
    nextSlide();  // Press → to go forward
  }
});
```

**HTML Structure** (`index.html`, Lines 158-186):
```html
<!-- File: index.html | Lines: 158-186 -->
<section class="hero-slider" id="heroSlider">
    <div class="slider-container">
        <!-- Slides will be created by JavaScript -->
    </div>

    <!-- Previous/Next Arrow Buttons -->
    <button class="slider-nav slider-prev" aria-label="Previous slide">
        <svg>...</svg>
    </button>
    <button class="slider-nav slider-next" aria-label="Next slide">
        <svg>...</svg>
    </button>

    <!-- Indicator Dots at Bottom -->
    <div class="slider-indicators"></div>
</section>
```

**How It All Works Together**:

1. **Page loads** → `initSlider()` is called
2. **Creates slides** → For each anime in data, creates a slide with `createSlide()`
3. **Adds dots** → Creates clickable indicator dots at bottom
4. **Connects buttons** → Hooks up Previous/Next arrow buttons
5. **Starts auto-play** → Begins changing slides every 5 seconds
6. **User interaction**:
   - Click arrows → Goes to next/previous slide
   - Click dots → Jumps to that specific slide
   - Press keyboard arrows → Navigate with ← →
   - Hover mouse → Pauses auto-play
   - Move mouse away → Resumes auto-play

**Features Summary**:
- ✅ **Auto-play**: Slides change every 5 seconds automatically
- ✅ **Manual Navigation**: Click arrow buttons on left/right sides
- ✅ **Indicator Dots**: Click dots at bottom to jump to any slide
- ✅ **Keyboard Support**: Use ← → arrow keys to navigate
- ✅ **Pause on Hover**: Stops when mouse is over the slider
- ✅ **Live Badge**: Shows animated "LIVE" indicator on slides

---

### 3. **Data Fetching (JSON)**
- **Description**: Loads anime data from external JSON file
- **Implementation**:
  ```javascript
  fetch("data/anime.json")
    .then((r) => r.json())
    .then((data) => {
      animeData = data;
      window.__ANIME_DATA = data;
      initSlider();
      populateFeaturedAnime();
      populateLatestAnime();
    });
  ```
- **Data Structure**:
  ```json
  {
    "id": 1,
    "title": "Naruto",
    "year": 2002,
    "rating": 8.3,
    "image": "image/naruto.jpg",
    "genres": ["Action", "Adventure"],
    "synopsis": "Description...",
    "wiki": "https://wikipedia.org/..."
  }
  ```

---

### 4. **Featured Anime Carousel**
- **Description**: 3D carousel displaying "Best Anime" with center focus
- **Implementation**:
  ```javascript
  function updateFeaturedCarousel() {
    featuredCards.forEach((card, index) => {
      const relativePosition = (index - featuredCurrentIndex + total) % total;
      
      if (relativePosition === 0) {
        card.dataset.position = "center";
      } else if (relativePosition === 1 || relativePosition === total - 1) {
        card.dataset.position = relativePosition === 1 ? "right-1" : "left-1";
      }
      // Additional positioning logic...
    });
  }
  ```
- **CSS Positioning**:
  ```css
  .featured-card[data-position="center"] {
    transform: translateX(0) scale(1.15);
    opacity: 1;
    z-index: 10;
  }
  .featured-card[data-position="left-1"] {
    transform: translateX(-380px) scale(0.9);
    opacity: 0.7;
  }
  ```
- **Features**:
  - 6 visible cards at once (3 left, 1 center, 2 right)
  - Click side cards to bring them to center
  - Auto-advance every 4 seconds
  - Bookmark functionality with localStorage

---

### 5. **Latest Anime Grid**
- **Description**: Grid layout showing recently added anime
- **Implementation**:
  ```javascript
  function populateLatestAnime() {
    animeData.forEach((anime, index) => {
      const card = document.createElement("div");
      card.className = "latest-card";
      
      // Star rating calculation
      const normalizedRating = (anime.rating / 10) * 5;
      const fullStars = Math.floor(normalizedRating);
      const emptyStars = 5 - fullStars;
      const starsHTML = "★".repeat(fullStars) + "☆".repeat(emptyStars);
      
      card.innerHTML = `
        <img src="${anime.image}" alt="${anime.title}">
        <h3>${anime.title}</h3>
        <div class="latest-card-rating">${starsHTML}</div>
        <button class="latest-read-btn">Watch Now</button>
      `;
    });
  }
  ```
- **Features**:
  - Responsive grid (4 columns → 2 → 1 on mobile)
  - Star rating system (5-star scale)
  - HOT badge on every 3rd item
  - Bookmark toggle button

---

### 6. **Bookmark System (LocalStorage)**
- **Description**: Save/remove anime to bookmarks
- **Implementation**:
  ```javascript
  function toggleBookmark(item) {
    let bookmarks = JSON.parse(localStorage.getItem("animeBookmarks") || "[]");
    const existingIndex = bookmarks.findIndex(
      (bookmark) => bookmark.id === item.id && bookmark.type === item.type
    );

    if (existingIndex !== -1) {
      bookmarks.splice(existingIndex, 1); // Remove
      localStorage.setItem("animeBookmarks", JSON.stringify(bookmarks));
      return false;
    } else {
      bookmarks.push(item); // Add
      localStorage.setItem("animeBookmarks", JSON.stringify(bookmarks));
      return true;
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
  if (isAdded) {
    svg.setAttribute("fill", "rgb(117, 103, 210)");
    svg.setAttribute("stroke", "rgb(117, 103, 210)");
  } else {
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
  }
  ```

---

### 7. **Search Functionality**
- **Description**: Search bar with animated toast notification
- **Implementation**:
  ```javascript
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = input.value && input.value.trim();
    if (!q) return flashPlaceholder();
    animateSearchResult(q);
  });

  function animateSearchResult(q) {
    const el = document.createElement("div");
    el.className = "search-toast";
    el.textContent = `Searching for "${q}"`;
    Object.assign(el.style, {
      position: "fixed",
      right: "18px",
      top: "78px",
      background: "#0f1720",
      padding: "10px 14px",
      borderRadius: "10px"
    });
    document.body.appendChild(el);
    setTimeout(() => el.style.opacity = "0", 1400);
    setTimeout(() => el.remove(), 1800);
  }
  ```

---

### 8. **Sidebar Navigation**
- **Description**: Persistent left sidebar with navigation icons
- **Implementation**:
  ```javascript
  function initSidebarNavigation() {
    sidebarIcons.forEach((icon) => {
      icon.addEventListener("click", () => {
        const section = icon.getAttribute("data-section");
        
        if (section === "hero") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (section === "discover") {
          featuredSection.scrollIntoView({ behavior: "smooth" });
        } else if (section === "tvshows") {
          window.location.href = "movies.html";
        }
      });
    });
  }
  ```
- **Features**:
  - Smooth scroll to sections
  - Active state indication
  - Updates on scroll position
  - Mobile hamburger menu overlay

---

### 9. **Page Transitions**
- **Description**: Smooth fade/zoom effect when navigating between pages
- **Implementation**:
  ```javascript
  function setupPageTransitions() {
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        document.body.classList.add("page-transitioning");
        setTimeout(() => {
          window.location.href = href;
        }, 600);
      });
    });
  }
  ```
- **CSS**:
  ```css
  body.page-transitioning {
    transform: perspective(1200px) translateZ(-150px) scale(0.95);
    opacity: 0.5;
  }
  ```

---

### 10. **Responsive Design**
- **Mobile Hamburger Menu**:
  ```javascript
  function initHamburgerMenu() {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      sidebar.classList.toggle("active");
      overlay.classList.toggle("active");
      document.body.style.overflow = sidebar.classList.contains("active") ? "hidden" : "";
    });
  }
  ```
- **Breakpoints**:
  - Desktop: 1200px+
  - Tablet: 768px - 1199px
  - Mobile: < 768px

---

## File Structure
```
index.html          - Main HTML structure
script.js           - All JavaScript functionality
styles.css          - Main styling
data/anime.json     - Anime data source
image/              - Image assets
```

---

## Key CSS Classes
- `.page-loader` - Loading screen container
- `.hero-slider` - Full-screen slider wrapper
- `.slide` - Individual slider item
- `.featured-card` - Carousel anime card
- `.latest-card` - Grid anime card
- `.sidebar` - Left navigation panel
- `.site-header` - Top header with search

---

## Dependencies
- **Google Fonts**: Inter font family
- **LocalStorage API**: For bookmarks
- **Fetch API**: For loading JSON data
- **SVG Graphics**: For icons and animations

---

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript features
- CSS Grid and Flexbox
- CSS Custom Properties (variables)
