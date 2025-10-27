# 📍 Code Location Reference Guide - For Beginners

## Introduction

**Welcome!** 👋 This guide shows you exactly where to find every piece of code in the ShinobiRealm project. Each feature lists:
- **File name** (which file to open)
- **Line numbers** (where to look in that file)
- **What it does** (simple explanation)

Use this as your map to navigate the codebase!

---

## 📁 Project File Structure

```
Anime_website/
│
├── index.html              # Home page (339 lines)
├── movies.html             # Movies page (300 lines)
├── bookmarks.html          # Bookmarks page (293 lines)
├── about.html              # About/Team page (553 lines)
│
├── script.js               # Home page JavaScript (756 lines)
├── movies.js               # Movies page JavaScript (400 lines)
├── bookmarks.js            # Bookmarks page JavaScript (333 lines)
├── About.js                # About page JavaScript (270 lines)
│
├── styles.css              # Main styles (4,287 lines!)
├── movies.css              # Movies-specific styles
│
└── data/
    ├── anime.json          # Anime data
    └── Movie.json          # Movie data
```

---

## 🏠 HOME PAGE (index.html + script.js)

### 1. Loading Screen Animation

**What it does**: Shows animated Pokéball while page loads with percentage

**Files & Lines**:
- **HTML**: `index.html` (Lines 18-36)
- **JavaScript**: `script.js` (Lines 6-23)
- **CSS**: `styles.css` (Lines 42-97)

**How to find it**:
1. Open `script.js`
2. Go to Line 6
3. Look for `window.addEventListener("load")`

---

### 2. Hero Slider (Full-Screen Carousel)

**What it does**: Auto-playing slideshow of anime with arrows and dots to navigate

**Files & Lines**:
- **HTML**: `index.html` (Lines 158-186)
- **JavaScript Functions**:
  - `initSlider()` - Lines 149-186 in `script.js`
  - `createSlide()` - Lines 189-224 in `script.js`
  - `goToSlide()` - Lines 227-238 in `script.js`
  - `nextSlide()` - Lines 240-243 in `script.js`
  - `prevSlide()` - Lines 245-248 in `script.js`
  - `startAutoPlay()` - Lines 251-253 in `script.js`
  - `stopAutoPlay()` - Lines 255-259 in `script.js`
  - Keyboard controls - Lines 272-280 in `script.js`
- **CSS**: `styles.css` (Lines 1200-1600)

**How to find it**:
1. Open `script.js`
2. Search for "initSlider" (Ctrl+F or Cmd+F)
3. You'll see all the slider code from Line 149 onwards

---

### 3. Data Loading from JSON

**What it does**: Fetches anime information from anime.json file

**Files & Lines**:
- **JavaScript**: `script.js` (Lines 90-106)
- **Data File**: `data/anime.json`

**Key Code**:
```javascript
// File: script.js | Lines: 90-106
fetch("data/anime.json")
  .then((r) => r.json())
  .then((data) => {
    animeData = data;
    initSlider();
    populateFeaturedAnime();
    populateLatestAnime();
  });
```

---

### 4. Featured Anime Carousel (3D Carousel)

**What it does**: Rotating carousel showing "Best Anime" with 6 visible cards

**Files & Lines**:
- **HTML**: `index.html` (Lines 206-239)
- **JavaScript Functions**:
  - `populateFeaturedAnime()` - Lines 283-398 in `script.js`
  - `updateFeaturedCarousel()` - Lines 401-426 in `script.js`
  - `featuredNextSlide()` - Lines 429-432 in `script.js`
  - `featuredPrevSlide()` - Lines 434-437 in `script.js`
  - `startFeaturedAutoPlay()` - Lines 440-443 in `script.js`
  - `stopFeaturedAutoPlay()` - Lines 445-449 in `script.js`
- **CSS**: `styles.css` (Lines 1800-2200)

**How to find it**:
1. Open `script.js`
2. Search for "populateFeaturedAnime"
3. You'll find it around Line 283

---

### 5. Latest Anime Grid

**What it does**: Grid of recently added anime with star ratings

**Files & Lines**:
- **HTML**: `index.html` (Lines 266-282)
- **JavaScript**: `script.js` (Lines 452-574)
  - Main function: `populateLatestAnime()` - Lines 452-574
- **CSS**: `styles.css` (Lines 2400-2800)

**How to find it**:
1. Open `script.js`
2. Search for "populateLatestAnime"
3. Start reading from Line 452

---

### 6. Bookmark System (Save/Remove)

**What it does**: Let users save anime to bookmarks using browser storage

**Files & Lines**:
- **JavaScript Functions** in `script.js`:
  - `toggleBookmark()` - Lines 60-77
  - `isBookmarked()` - Lines 53-57
  - `saveBookmark()` - Lines 577-585
- **Used in multiple places**:
  - Featured carousel bookmark button (Line 366-387)
  - Latest grid bookmark button (Line 545-560)

**How to find it**:
1. Open `script.js`
2. Search for "toggleBookmark"
3. You'll find it at Line 60

**localStorage Format**:
```javascript
// Stored in browser under key: "animeBookmarks"
localStorage.getItem("animeBookmarks") // Returns JSON string
```

---

### 7. Search Functionality

**What it does**: Search bar at top with animated notification

**Files & Lines**:
- **HTML**: `index.html` (Lines 124-139)
- **JavaScript**: `script.js` (Lines 108-130)
  - Form submit handler - Lines 108-114
  - `flashPlaceholder()` - Lines 116-120
  - `animateSearchResult()` - Lines 122-130

**How to find it**:
1. Open `script.js`
2. Search for "searchForm"
3. You'll find it around Line 108

---

### 8. Sidebar Navigation

**What it does**: Left sidebar with icons to navigate between sections

**Files & Lines**:
- **HTML**: `index.html` (Lines 38-93)
- **JavaScript**: `script.js` (Lines 650-756)
  - `initSidebarNavigation()` - Lines 650-756
- **CSS**: `styles.css` (Lines 250-450)

**How to find it**:
1. Open `script.js`
2. Scroll down to Line 650
3. Look for "initSidebarNavigation"

---

### 9. Mobile Hamburger Menu

**What it does**: Three-line menu button that opens sidebar on mobile

**Files & Lines**:
- **HTML**: `index.html` (Line 101-105)
- **JavaScript**: `script.js` (Lines 588-618)
  - `initHamburgerMenu()` - Lines 588-618
- **CSS**: `styles.css` (Lines 3800-3950)

**How to find it**:
1. Open `script.js`
2. Search for "initHamburgerMenu"
3. You'll find it at Line 588

---

### 10. Page Transitions

**What it does**: Smooth zoom effect when clicking links to other pages

**Files & Lines**:
- **JavaScript**: `script.js` (Lines 26-50)
  - `setupPageTransitions()` - Lines 26-50
- **CSS**: `styles.css` (Lines 28-31)

**How to find it**:
1. Open `script.js`
2. Search for "setupPageTransitions"
3. You'll find it at Line 26

---

## 🎬 MOVIES PAGE (movies.html + movies.js)

### 1. Movie Data Loading

**What it does**: Loads movie information from Movie.json

**Files & Lines**:
- **JavaScript**: `movies.js` (Lines 92-106)

**Key Code**:
```javascript
// File: movies.js | Lines: 92-106
fetch("data/Movie.json")
  .then((r) => r.json())
  .then((data) => {
    moviesData = data;
    filteredMovies = [...data];
    renderMovies();
    initFilters();
  });
```

---

### 2. Movie Grid Rendering

**What it does**: Creates movie cards and displays them in a grid

**Files & Lines**:
- **HTML**: `movies.html` (Lines 180-185) - empty grid container
- **JavaScript**: `movies.js` (Lines 119-190)
  - `renderMovies()` - Lines 119-190
- **CSS**: `movies.css` (Lines 50-250)

**How to find it**:
1. Open `movies.js`
2. Search for "renderMovies"
3. You'll find it at Line 119

---

### 3. Star Rating System

**What it does**: Converts 10-point ratings to 5-star display

**Files & Lines**:
- **JavaScript**: `movies.js` (Lines 134-137)

**Key Code**:
```javascript
// File: movies.js | Lines: 134-137
const normalizedRating = (movie.rating / 10) * 5;  // 8.4/10 → 4.2/5
const fullStars = Math.floor(normalizedRating);     // 4 stars
const emptyStars = 5 - fullStars;                   // 1 empty star
const starsHTML = "★".repeat(fullStars) + "☆".repeat(emptyStars);
```

---

### 4. Genre Filter System

**What it does**: Filter buttons to show only specific genres

**Files & Lines**:
- **HTML**: `movies.html` (Lines 155-165)
- **JavaScript**: `movies.js` (Lines 193-218)
  - `initFilters()` - Lines 193-218

**How to find it**:
1. Open `movies.js`
2. Search for "initFilters"
3. You'll find it at Line 193

---

### 5. Movie Search

**What it does**: Search movies by title or genre

**Files & Lines**:
- **HTML**: `movies.html` (Lines 124-139)
- **JavaScript**: `movies.js` (Lines 108-119)

**How to find it**:
1. Open `movies.js`
2. Search for "searchForm"
3. You'll find it around Line 108

---

### 6. Bookmark Toggle (Movies)

**What it does**: Save/remove movies from bookmarks

**Files & Lines**:
- **JavaScript Functions** in `movies.js`:
  - `toggleBookmark()` - Lines 60-77
  - `isBookmarked()` - Lines 53-57
- **Implementation**: Lines 165-185 (inside renderMovies)

**How to find it**:
1. Open `movies.js`
2. Search for "toggleBookmark"
3. You'll find it at Line 60

---

## 📚 BOOKMARKS PAGE (bookmarks.html + bookmarks.js)

### 1. Load Bookmarks from Browser

**What it does**: Gets saved bookmarks from browser storage

**Files & Lines**:
- **JavaScript**: `bookmarks.js` (Lines 74-78)
  - `loadBookmarks()` - Lines 74-78

**Key Code**:
```javascript
// File: bookmarks.js | Lines: 74-78
function loadBookmarks() {
  allBookmarks = JSON.parse(localStorage.getItem("animeBookmarks") || "[]");
  filteredBookmarks = [...allBookmarks];
  updateStats();
  renderBookmarks();
}
```

---

### 2. Statistics Dashboard

**What it does**: Shows total count, anime count, movie count

**Files & Lines**:
- **HTML**: `bookmarks.html` (Lines 130-152)
- **JavaScript**: `bookmarks.js` (Lines 81-90)
  - `updateStats()` - Lines 81-90

**How to find it**:
1. Open `bookmarks.js`
2. Search for "updateStats"
3. You'll find it at Line 81

---

### 3. Render Bookmarks Grid

**What it does**: Creates cards for each bookmarked item

**Files & Lines**:
- **HTML**: `bookmarks.html` (Lines 200-205) - empty container
- **JavaScript**: `bookmarks.js` (Lines 93-195)
  - `renderBookmarks()` - Lines 93-195

**How to find it**:
1. Open `bookmarks.js`
2. Search for "renderBookmarks"
3. You'll find it at Line 93

---

### 4. Remove Bookmark

**What it does**: Delete item from bookmarks collection

**Files & Lines**:
- **JavaScript**: Inside `renderBookmarks()` function
- **Specific location**: `bookmarks.js` (Lines 175-185)

**Key Code**:
```javascript
// File: bookmarks.js | Lines: 175-185
card.querySelector(".remove-bookmark-btn").addEventListener("click", (e) => {
  e.stopPropagation();
  
  let bookmarks = JSON.parse(localStorage.getItem("animeBookmarks") || "[]");
  bookmarks = bookmarks.filter(
    (b) => !(b.id === item.id && b.type === item.type)
  );
  localStorage.setItem("animeBookmarks", JSON.stringify(bookmarks));
  
  loadBookmarks(); // Reload the page
});
```

---

### 5. Filter by Type (Anime/Movie)

**What it does**: Show only anime or only movies

**Files & Lines**:
- **JavaScript**: `bookmarks.js` (Lines 198-224)
  - `initFilters()` - Lines 198-224

**How to find it**:
1. Open `bookmarks.js`
2. Search for "initFilters"
3. You'll find it at Line 198

---

### 6. Search Bookmarks

**What it does**: Search through saved bookmarks

**Files & Lines**:
- **JavaScript**: `bookmarks.js` (Lines 61-79)

**How to find it**:
1. Open `bookmarks.js`
2. Search for "searchForm"
3. You'll find it around Line 61

---

## 👥 ABOUT PAGE (about.html + About.js)

### 1. Hero Section

**What it does**: Large banner with site statistics

**Files & Lines**:
- **HTML**: `about.html` (Lines 126-165)
- **CSS**: `styles.css` (Lines 3100-3250)

**Location**:
1. Open `about.html`
2. Search for "about-hero"
3. You'll find it around Line 126

---

### 2. Team Member Cards

**What it does**: Cards showing team members with social links

**Files & Lines**:
- **HTML**: `about.html` (Lines 195-350)
- **CSS**: `styles.css` (Lines 3300-3550)

**Features**:
- Hover effect reveals social links
- Each card has photo, name, role, bio

**Location**:
1. Open `about.html`
2. Search for "team-section"
3. You'll find it around Line 195

---

### 3. Mission Statement Section

**What it does**: Explains website's purpose and features

**Files & Lines**:
- **HTML**: `about.html` (Lines 370-410)
- **CSS**: `styles.css` (Lines 3600-3720)

**Location**:
1. Open `about.html`
2. Search for "mission-section"
3. You'll find it around Line 370

---

### 4. Contact Form

**What it does**: Form for users to send messages

**Files & Lines**:
- **HTML**: `about.html` (Lines 430-505)
- **CSS**: `styles.css` (Lines 3750-3920)

**Form Fields**:
- Name input
- Email input
- Subject input
- Message textarea
- Submit button

**Location**:
1. Open `about.html`
2. Search for "contact-section"
3. You'll find it around Line 430

---

### 5. Smooth Scroll to Contact

**What it does**: Clicking "Contact" in sidebar scrolls to contact form

**Files & Lines**:
- **JavaScript**: `About.js` (Lines 49-84)
  - `initSidebarNavigation()` - Lines 49-84
  - Contact section scroll - Lines 72-79

**Key Code**:
```javascript
// File: About.js | Lines: 72-79
else if (section === "contact") {
  const contactSection = document.querySelector(".contact-section");
  if (contactSection) {
    contactSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}
```

---

## 🎨 CSS STYLING (styles.css)

### Main CSS Sections by Line Numbers:

```
Lines 1-40     : CSS Variables (colors, fonts)
Lines 42-97    : Loading screen & Pokéball animation
Lines 100-250  : Sidebar navigation
Lines 250-450  : Header & navigation
Lines 450-700  : Search bar
Lines 700-1200 : Hero slider base styles
Lines 1200-1600: Hero slider animations & transitions
Lines 1800-2200: Featured carousel (3D effect)
Lines 2400-2800: Latest anime grid
Lines 2800-3000: Footer
Lines 3100-3250: About hero section
Lines 3300-3550: Team cards
Lines 3600-3720: Mission section
Lines 3750-3920: Contact form
Lines 3800-3950: Mobile hamburger menu
Lines 3950-4287: Responsive media queries
```

**How to navigate**:
1. Open `styles.css`
2. Use Ctrl+G (or Cmd+G on Mac) to "Go to Line"
3. Enter the line number you want to see

---

## 📊 DATA FILES

### anime.json

**Location**: `data/anime.json`

**Structure**:
```json
{
  "id": 1,
  "title": "Naruto",
  "year": 2002,
  "rating": 8.3,
  "image": "image/naruto.jpg",
  "genres": ["Action", "Adventure", "Supernatural"],
  "synopsis": "Description here...",
  "wiki": "https://en.wikipedia.org/wiki/Naruto"
}
```

**Used by**:
- Home page slider
- Featured carousel
- Latest grid

---

### Movie.json

**Location**: `data/Movie.json`

**Structure**: Same as anime.json

**Used by**:
- Movies page grid
- Movie filters
- Movie search

---

## 🔍 How to Find Code Quickly

### Method 1: Search by Function Name
1. Open the file (e.g., `script.js`)
2. Press `Ctrl+F` (Windows) or `Cmd+F` (Mac)
3. Type function name (e.g., "initSlider")
4. Press Enter to jump to it

### Method 2: Go to Line Number
1. Open the file
2. Press `Ctrl+G` (Windows) or `Cmd+G` (Mac)
3. Type line number (e.g., "149")
4. Press Enter to jump to that line

### Method 3: Use File Explorer
1. Look at file name in this guide
2. Find file in VS Code file explorer
3. Look for the line numbers mentioned

---

## 💡 Tips for Beginners

### Understanding Line Numbers

**Example**: "script.js (Lines 149-186)"
- **Means**: Open `script.js` file
- **Look at**: Start at line 149, read until line 186
- **Contains**: One complete function or feature

### Reading Code Sections

```javascript
// File: script.js | Lines: 149-186
// Purpose: Set up the slider

function initSlider() {
  // Code here...
}
```

**This tells you**:
- 📄 **File**: Which file to open
- 📏 **Lines**: Where to look
- 💭 **Purpose**: What this code does

### Common Code Locations

| Feature Type | Usually Found In |
|--------------|------------------|
| Page behavior | `.js` files |
| Page structure | `.html` files |
| Visual styling | `.css` files |
| Data storage | `.json` files |

---

## 📝 Quick Reference Tables

### JavaScript Files Overview

| File | Lines | Main Purpose |
|------|-------|--------------|
| `script.js` | 756 | Home page functionality |
| `movies.js` | 400 | Movies page functionality |
| `bookmarks.js` | 333 | Bookmarks page functionality |
| `About.js` | 270 | About page functionality |

### HTML Files Overview

| File | Lines | Main Content |
|------|-------|--------------|
| `index.html` | 339 | Home page structure |
| `movies.html` | 300 | Movies page structure |
| `bookmarks.html` | 293 | Bookmarks page structure |
| `about.html` | 553 | About/team page structure |

### Key Functions Quick Reference

| Function Name | File | Lines | What It Does |
|---------------|------|-------|--------------|
| `initSlider()` | script.js | 149-186 | Creates hero slider |
| `populateFeaturedAnime()` | script.js | 283-398 | Creates carousel |
| `populateLatestAnime()` | script.js | 452-574 | Creates anime grid |
| `toggleBookmark()` | script.js/movies.js | 60-77 | Save/remove bookmarks |
| `renderMovies()` | movies.js | 119-190 | Show movie grid |
| `renderBookmarks()` | bookmarks.js | 93-195 | Show bookmarks |
| `initSidebarNavigation()` | All .js files | Varies | Setup sidebar clicks |
| `initHamburgerMenu()` | All .js files | Varies | Setup mobile menu |

---

## 🎯 Common Tasks & Where to Look

### "I want to change the loading animation"
- **File**: `script.js`
- **Lines**: 6-23
- **Also check CSS**: `styles.css` Lines 42-97

### "I want to modify the slider timing"
- **File**: `script.js`
- **Line**: 253 (look for `setInterval(nextSlide, 5000)`)
- **Change**: `5000` to different milliseconds (5000 = 5 seconds)

### "I want to add a new anime"
- **File**: `data/anime.json`
- **Action**: Add new object at end of array

### "I want to change colors"
- **File**: `styles.css`
- **Lines**: 1-10 (CSS variables)
- **Look for**: `--bg`, `--accent1`, `--accent2`, etc.

### "I want to modify the bookmark system"
- **Files**: All `.js` files
- **Search for**: "toggleBookmark" or "localStorage"
- **Key lines**: 
  - `script.js` Lines 60-77
  - `movies.js` Lines 60-77
  - `bookmarks.js` Lines 74-78

### "I want to style the movie cards"
- **File**: `movies.css`
- **Lines**: 50-250
- **Also**: `styles.css` Lines 2400-2800 for general card styles

---

## 📖 Related Documentation

For detailed explanations of how features work, see:
- `INDEX_PAGE_DOCUMENTATION.md` - Home page features
- `MOVIES_PAGE_DOCUMENTATION.md` - Movies page features
- `BOOKMARKS_PAGE_DOCUMENTATION.md` - Bookmarks features
- `ABOUT_PAGE_DOCUMENTATION.md` - About page features
- `PROJECT_OVERVIEW.md` - Complete technical overview

---

## ✅ Summary

**This guide gives you**:
- ✅ Exact file names for every feature
- ✅ Specific line numbers where code lives
- ✅ Quick search methods to find code
- ✅ Tips for navigating the codebase
- ✅ Reference tables for fast lookup

**Now you can**:
- 🎯 Find any code instantly
- 🔍 Navigate files with confidence
- 📚 Understand code organization
- 🛠️ Make changes in the right places

---

**Happy Coding! 🚀**

*Last Updated: October 24, 2025*
