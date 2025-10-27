# ShinobiRealm - Complete Website Documentation

## Project Overview

**ShinobiRealm** is a modern, feature-rich anime streaming website that provides users with a comprehensive platform to discover, browse, and bookmark their favorite anime series and movies. The website features a sleek dark theme, smooth animations, and an intuitive user interface.

---

## Technology Stack

### Frontend Technologies
- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with Grid, Flexbox, and Custom Properties
- **JavaScript (ES6+)**: Interactive functionality and data manipulation
- **SVG**: Scalable icons and animations

### Data Storage
- **JSON Files**: Static data storage for anime and movie information
- **LocalStorage API**: Client-side bookmark persistence

### Fonts & Icons
- **Google Fonts**: Inter font family
- **Custom SVG Icons**: Hand-crafted icons for UI elements

---

## Website Structure

```
Anime_website/
│
├── index.html                  # Home page with hero slider
├── movies.html                 # Movies grid page
├── bookmarks.html              # User bookmarks page
├── about.html                  # About & team page
│
├── script.js                   # Main JavaScript for home page
├── movies.js                   # Movies page functionality
├── bookmarks.js                # Bookmarks page functionality
├── About.js / About2.js        # About page functionality
│
├── styles.css                  # Global styles (4287 lines)
├── movies.css                  # Movies-specific styles
│
├── data/
│   ├── anime.json             # Anime series data
│   └── Movie.json             # Movie data
│
├── image/                     # Image assets
│   ├── Icon.png               # Site logo
│   ├── favicon.png            # Browser favicon
│   └── [anime/movie images]   # Content images
│
└── docs/                      # Documentation files
    ├── INDEX_PAGE_DOCUMENTATION.md
    ├── MOVIES_PAGE_DOCUMENTATION.md
    ├── BOOKMARKS_PAGE_DOCUMENTATION.md
    └── ABOUT_PAGE_DOCUMENTATION.md
```

---

## Core Features

### 1. **Universal Features (All Pages)**

#### Loading Screen
- Animated Pokéball with wiggle effect
- Progress percentage indicator (0-100%)
- Smooth fade-out transition

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
      setTimeout(() => loader.classList.add("hidden"), 300);
    }
    progressText.textContent = Math.floor(progress) + "%";
  }, 100);
});
```

#### Sidebar Navigation
- Persistent left sidebar with icons
- Active state indication
- Smooth scroll to sections
- Links to different pages

**Sections**:
- Home (Hero)
- Discover (Featured)
- Latest (Calendar)
- Movies (TV Shows)
- Bookmarks
- About
- Contact

#### Page Transitions
- 3D perspective zoom effect
- 600ms transition duration
- Smooth opacity fade

```css
body.page-transitioning {
  transform: perspective(1200px) translateZ(-150px) scale(0.95);
  opacity: 0.5;
}
```

#### Mobile Responsiveness
- Hamburger menu for mobile devices
- Overlay for mobile menu
- Adaptive layouts for all screen sizes
- Touch-friendly interactive elements

---

### 2. **Home Page (index.html)**

#### Hero Slider
- **Auto-play**: 5-second intervals
- **Manual Control**: Previous/Next buttons
- **Indicators**: Clickable dots for direct navigation
- **Keyboard Support**: Arrow keys
- **Pause on Hover**: Auto-play pauses
- **Live Badge**: Animated indicator

**Features Displayed**:
- Background image
- Anime title
- Year and rating
- Genres (colored badges)
- Synopsis
- Wikipedia link
- Watch Now button
- Add to List button

#### Featured Anime Carousel
- **3D Carousel**: 6 visible cards (3 left, center, 3 right)
- **Center Focus**: Scaled and highlighted
- **Click Navigation**: Click side cards to bring to center
- **Auto-advance**: 4-second intervals
- **Bookmark Integration**: Save directly from carousel

**Positioning System**:
```javascript
card.dataset.position = "center"   // Scale: 1.15, z-index: 10
card.dataset.position = "left-1"   // Scale: 0.9, opacity: 0.7
card.dataset.position = "right-1"  // Scale: 0.9, opacity: 0.7
card.dataset.position = "hidden"   // Display: none
```

#### Latest Anime Grid
- **Responsive Grid**: 4 → 2 → 1 columns
- **Star Ratings**: 5-star visual system
- **HOT Badge**: Appears on every 3rd item
- **Hover Effects**: Scale and shadow
- **Bookmark Button**: Individual toggle

#### Search Functionality
- Search input in header
- Toast notification on search
- Animated feedback

---

### 3. **Movies Page (movies.html)**

#### Movie Grid
- **Responsive Layout**: Auto-fill grid
- **Filter by Genre**: Action, Romance, Comedy, Fantasy, etc.
- **Search**: By title or genre
- **Year Badge**: Top-left corner
- **Rating Display**: Star icon with numeric value
- **Star Rating**: Visual 5-star system

#### Card Information
- Movie poster image
- Title
- Year badge
- Rating (numeric)
- Star rating (visual)
- Genres list
- Watch Now button
- Bookmark toggle button

#### Filter System
```javascript
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
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
```

---

### 4. **Bookmarks Page (bookmarks.html)**

#### Statistics Dashboard
- **Total Bookmarks**: Combined count
- **Anime Count**: Series only
- **Movies Count**: Movies only
- **Animated Cards**: Hover effects

#### Bookmark Management
- **View All**: Display saved items
- **Filter by Type**: All / Anime Only / Movies Only
- **Search**: By title or genre
- **Remove**: Delete from collection
- **Type Badge**: Visual distinction (ANIME/MOVIE)

#### Empty State
- Friendly message when no bookmarks
- Large SVG icon
- Browse button to home page

---

### 5. **About Page (about.html)**

#### Hero Section
- Website introduction
- Statistics display (1000+ titles, etc.)
- Gradient background

#### Mission Section
- Platform purpose
- Feature list with check icons
- Mission image

#### Team Section
- **Grid Layout**: Team member cards
- **Hover Reveal**: Social links on hover
- **Smooth Animations**: Transform and opacity
- **Social Media**: Twitter, GitHub, LinkedIn, Instagram

#### Contact Section
- **Form Fields**: Name, Email, Subject, Message
- **HTML5 Validation**: Required fields
- **Visual Feedback**: Focus states, valid/invalid indicators
- **Submit Button**: Animated with send icon

---

## Data Structure

### Anime Data (anime.json)
```json
{
  "id": 1,
  "title": "Naruto",
  "year": 2002,
  "rating": 8.3,
  "image": "image/naruto.jpg",
  "genres": ["Action", "Adventure", "Supernatural"],
  "synopsis": "A young ninja's journey...",
  "wiki": "https://en.wikipedia.org/wiki/Naruto"
}
```

### Movie Data (Movie.json)
```json
{
  "id": 1,
  "title": "Your Name",
  "year": 2016,
  "rating": 8.4,
  "image": "image/yourname.jpg",
  "genres": ["Romance", "Drama", "Fantasy"],
  "synopsis": "Two teenagers swap bodies...",
  "wiki": "https://en.wikipedia.org/wiki/Your_Name"
}
```

### Bookmark Data (localStorage)
```javascript
// Key: "animeBookmarks"
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
  }
]
```

---

## JavaScript Functions Overview

### Global Functions (script.js)

| Function | Purpose |
|----------|---------|
| `initSlider()` | Initialize hero slider |
| `createSlide()` | Create slide element |
| `goToSlide()` | Navigate to specific slide |
| `nextSlide()` | Go to next slide |
| `prevSlide()` | Go to previous slide |
| `startAutoPlay()` | Begin auto-advance |
| `stopAutoPlay()` | Pause auto-advance |
| `populateFeaturedAnime()` | Create carousel cards |
| `updateFeaturedCarousel()` | Update card positions |
| `featuredNextSlide()` | Carousel next |
| `featuredPrevSlide()` | Carousel previous |
| `populateLatestAnime()` | Create grid cards |
| `toggleBookmark()` | Add/remove bookmark |
| `isBookmarked()` | Check bookmark status |
| `initSidebarNavigation()` | Setup sidebar clicks |
| `initHamburgerMenu()` | Mobile menu functionality |
| `setupPageTransitions()` | Smooth page changes |

### Movies Functions (movies.js)

| Function | Purpose |
|----------|---------|
| `renderMovies()` | Create movie cards |
| `initFilters()` | Setup genre filters |
| `toggleBookmark()` | Bookmark toggle |
| `isBookmarked()` | Check if bookmarked |

### Bookmarks Functions (bookmarks.js)

| Function | Purpose |
|----------|---------|
| `loadBookmarks()` | Load from localStorage |
| `updateStats()` | Update counters |
| `renderBookmarks()` | Display bookmark cards |
| `initFilters()` | Type filters (all/anime/movie) |

### About Functions (About.js)

| Function | Purpose |
|----------|---------|
| `initSidebarNavigation()` | Sidebar + contact scroll |
| `initHamburgerMenu()` | Mobile menu |
| `setupPageTransitions()` | Page navigation |

---

## CSS Architecture

### Color Scheme (CSS Variables)
```css
:root {
  --bg: #06080a;           /* Main background */
  --panel: #0f1720;        /* Card background */
  --muted: #9aa6b2;        /* Muted text */
  --accent1: #ff6b6b;      /* Red accent */
  --accent2: #8e7bff;      /* Purple accent */
  --glass: rgba(255, 255, 255, 0.04);
}
```

### Layout System
- **Desktop**: 1200px+ (Full sidebar visible)
- **Tablet**: 768px - 1199px (Adjusted grid)
- **Mobile**: < 768px (Hamburger menu, single column)

### Animation Patterns
- **Hover Effects**: `transform: translateY(-8px)` + shadow
- **Focus States**: Border color + glow
- **Transitions**: `cubic-bezier(0.4, 0, 0.2, 1)` for smoothness
- **Loading**: Keyframe animations (wiggle, flash)

---

## Key Design Patterns

### 1. **Card Component Pattern**
```css
.card {
  background: var(--panel);
  border-radius: 12px;
  transition: all 0.3s ease;
}
.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.4);
}
```

### 2. **Button Pattern**
```css
.btn {
  padding: 12px 30px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.btn:hover {
  transform: translateY(-2px);
}
```

### 3. **Gradient Text**
```css
.gradient-text {
  background: linear-gradient(135deg, #8e7bff, #ff6b6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

## Performance Optimizations

1. **Image Loading**: `loading="lazy"` attribute
2. **Debounced Scroll**: 50ms timeout on scroll events
3. **Event Delegation**: Minimize event listeners
4. **CSS Transitions**: Hardware-accelerated properties
5. **LocalStorage**: Efficient JSON parsing

---

## Browser Compatibility

### Supported Browsers
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Required Features
- CSS Grid
- CSS Custom Properties
- Fetch API
- LocalStorage API
- ES6+ JavaScript (arrow functions, template literals, destructuring)
- Array methods (filter, map, forEach, some)

---

## Accessibility Features

1. **ARIA Labels**: All interactive elements
2. **Semantic HTML**: Proper heading hierarchy
3. **Alt Text**: All images
4. **Focus Indicators**: Visible outlines
5. **Keyboard Navigation**: Tab order, arrow keys
6. **Screen Reader Support**: Role attributes

---

## Future Enhancements

### Planned Features
- [ ] User authentication system
- [ ] Video player integration
- [ ] Advanced search with filters
- [ ] User ratings and reviews
- [ ] Watchlist with progress tracking
- [ ] Dark/Light theme toggle
- [ ] Multiple language support
- [ ] Social sharing features
- [ ] Recommendation engine
- [ ] Notification system

---

## Development Guidelines

### Code Style
- **Indentation**: 2 spaces
- **Quotes**: Double quotes for HTML, single for JS
- **Naming**: camelCase for JS, kebab-case for CSS
- **Comments**: Descriptive comments for complex logic

### File Organization
- Keep HTML semantic and clean
- Separate concerns (HTML/CSS/JS)
- Modularize JavaScript functions
- Use meaningful variable names

### Best Practices
- Mobile-first responsive design
- Progressive enhancement
- Graceful degradation
- Performance optimization
- Accessibility compliance

---

## Credits

**Developed by**: ShinobiRealm Team  
**Font**: Inter by Rasmus Andersson  
**Icons**: Custom SVG graphics  
**Inspiration**: Modern streaming platforms

---

## License

© 2025 ShinobiRealm. All rights reserved.

---

## Documentation Files

- 📄 [Index Page Documentation](INDEX_PAGE_DOCUMENTATION.md)
- 📄 [Movies Page Documentation](MOVIES_PAGE_DOCUMENTATION.md)
- 📄 [Bookmarks Page Documentation](BOOKMARKS_PAGE_DOCUMENTATION.md)
- 📄 [About Page Documentation](ABOUT_PAGE_DOCUMENTATION.md)
- 📄 **Project Overview** (This file)
