// Movies Page JavaScript
let moviesData = [];
let filteredMovies = [];

// Page Loading & Transitions with Progress
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

// Smooth page transitions for links
function setupPageTransitions() {
  const links = document.querySelectorAll("a[href]");
  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (
      !href ||
      href === "#" ||
      href.includes("#") ||
      (!href.endsWith(".html") &&
        href !== "index.html" &&
        href !== "movies.html" &&
        href !== "bookmarks.html")
    ) {
      return;
    }

    link.addEventListener("click", (e) => {
      e.preventDefault();
      document.body.classList.add("page-transitioning");

      setTimeout(() => {
        window.location.href = href;
      }, 600);
    });
  });
}

// Check if item is already bookmarked
function isBookmarked(item) {
  const bookmarks = JSON.parse(localStorage.getItem("animeBookmarks") || "[]");
  return bookmarks.some(
    (bookmark) => bookmark.id === item.id && bookmark.type === item.type
  );
}

// Save or remove bookmark (toggle)
function toggleBookmark(item) {
  let bookmarks = JSON.parse(localStorage.getItem("animeBookmarks") || "[]");
  const existingIndex = bookmarks.findIndex(
    (bookmark) => bookmark.id === item.id && bookmark.type === item.type
  );

  if (existingIndex !== -1) {
    // Remove bookmark
    bookmarks.splice(existingIndex, 1);
    localStorage.setItem("animeBookmarks", JSON.stringify(bookmarks));
    return false; // Removed
  } else {
    // Add bookmark
    bookmarks.push(item);
    localStorage.setItem("animeBookmarks", JSON.stringify(bookmarks));
    return true; // Added
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Setup page transitions
  setupPageTransitions();

  // Initialize mobile hamburger menu
  initHamburgerMenu();

  // Fetch movies data
  fetch("data/Movie.json")
    .then((r) => r.json())
    .then((data) => {
      moviesData = data;
      filteredMovies = [...data];
      console.log("Loaded Movie.json with", data.length, "movies");
      renderMovies();
      initFilters();
      initSidebarNavigation();
    })
    .catch((err) => {
      console.error("Could not load Movie.json", err);
    });

  // Search form handler
  const form = document.getElementById("searchForm");
  const input = document.getElementById("searchInput");

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
});

// Render movies to the grid
function renderMovies() {
  const grid = document.getElementById("moviesGrid");
  if (!grid) return;

  grid.innerHTML = "";

  if (filteredMovies.length === 0) {
    grid.innerHTML =
      '<p style="color: rgba(255,255,255,0.6); text-align: center; grid-column: 1/-1; padding: 60px 20px; font-size: 1.2rem;">No movies found matching your criteria.</p>';
    return;
  }

  filteredMovies.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "movie-card";

    // Generate star rating - normalize rating from 10-point scale to 5-star scale
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
        <img src="${movie.image}" alt="${
      movie.title
    }" class="movie-card-image" loading="lazy">
        <div class="movie-card-overlay">
          <button class="movie-play-btn" title="Watch ${movie.title}">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="movie-card-content">
        <h3 class="movie-card-title">${movie.title}</h3>
        <div class="movie-card-genres">
          ${movie.genres
            .slice(0, 3)
            .map((g) => `<span class="genre-tag">${g}</span>`)
            .join("")}
        </div>
        <div class="movie-card-stars">
          ${starsHTML
            .split("")
            .map(
              (star) =>
                `<span class="movie-star ${
                  star === "☆" ? "empty" : ""
                }">${star}</span>`
            )
            .join("")}
        </div>
        <p class="movie-card-synopsis">${movie.synopsis}</p>
        <div class="movie-card-meta">
          <div class="meta-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span>${movie.year}</span>
          </div>
          <div class="meta-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span>${movie.rating}/10</span>
          </div>
          <div class="meta-item">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>${movie.genres.length} Genres</span>
          </div>
        </div>
        <div class="movie-card-actions">
        <a href="${movie.trailer}" target="_blank" >
          <button class="movie-watch-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
            Watch Now
          </button>
          </a>
          <button class="movie-bookmark-btn" title="Add to bookmarks">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </div>
      </div>
    `;

    // Event listeners
    const watchButtons = card.querySelectorAll(".movie-watch-btn");
    watchButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        // Start watching movie
      });
    });

    card.querySelector(".movie-play-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      // Start watching movie
    });

    const bookmarkButtons = card.querySelectorAll(".movie-bookmark-btn");
    bookmarkButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const movieWithType = { ...movie, type: "movie" };
        const isAdded = toggleBookmark(movieWithType);
        const svg = btn.querySelector("svg");

        if (isAdded) {
          // Added to bookmarks - fill it
          svg.setAttribute("fill", "rgb(117, 103, 210)");
          svg.setAttribute("stroke", "rgb(117, 103, 210)");
          btn.style.color = "rgb(117, 103, 210)";
          btn.style.borderColor = "rgb(117, 103, 210)";
        } else {
          // Removed from bookmarks - unfill it
          svg.setAttribute("fill", "none");
          svg.setAttribute("stroke", "currentColor");
          btn.style.color = "";
          btn.style.borderColor = "";
        }
      });
    });

    // Check if already bookmarked and update UI
    const movieWithType = { ...movie, type: "movie" };
    if (isBookmarked(movieWithType)) {
      const bookmarkBtns = card.querySelectorAll(".movie-bookmark-btn");
      bookmarkBtns.forEach((btn) => {
        const svg = btn.querySelector("svg");
        svg.setAttribute("fill", "rgb(117, 103, 210)");
        svg.setAttribute("stroke", "rgb(117, 103, 210)");
        btn.style.color = "rgb(117, 103, 210)";
        btn.style.borderColor = "rgb(117, 103, 210)";
      });
    }

    grid.appendChild(card);
  });
}

// Initialize filters
function initFilters() {
  const sortFilter = document.getElementById("sortFilter");
  const genreFilter = document.getElementById("genreFilter");

  // Sort filter
  sortFilter.addEventListener("change", (e) => {
    const sortBy = e.target.value;

    switch (sortBy) {
      case "rating":
        filteredMovies.sort((a, b) => b.rating - a.rating);
        break;
      case "year-desc":
        filteredMovies.sort((a, b) => b.year - a.year);
        break;
      case "year-asc":
        filteredMovies.sort((a, b) => a.year - b.year);
        break;
      case "title":
        filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    renderMovies();
  });

  // Genre filter
  genreFilter.addEventListener("change", (e) => {
    const genre = e.target.value;

    if (genre === "all") {
      filteredMovies = [...moviesData];
    } else {
      filteredMovies = moviesData.filter((movie) =>
        movie.genres.includes(genre)
      );
    }

    // Re-apply current sort
    sortFilter.dispatchEvent(new Event("change"));
  });
}

// Hamburger Menu functionality
function initHamburgerMenu() {
  const hamburger = document.querySelector(".hamburger-menu");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".mobile-overlay");
  const sidebarIcons = document.querySelectorAll(".sidebar-icon");

  if (!hamburger || !sidebar || !overlay) return;

  // Toggle menu
  hamburger.addEventListener("click", () => {
    const isActive = hamburger.classList.toggle("active");
    sidebar.classList.toggle("active", isActive);
    overlay.classList.toggle("active", isActive);

    // Prevent body scroll when menu is open
    document.body.style.overflow = isActive ? "hidden" : "";
  });

  // Close menu when overlay is clicked
  overlay.addEventListener("click", () => {
    hamburger.classList.remove("active");
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  });

  // Close menu when sidebar item is clicked
  sidebarIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      hamburger.classList.remove("active");
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    });
  });
}

// Sidebar navigation
function initSidebarNavigation() {
  const sidebarIcons = document.querySelectorAll(".sidebar-icon");

  sidebarIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      const section = icon.getAttribute("data-section");

      if (section === "hero") {
        window.location.href = "index.html";
      } else if (section === "popular") {
        window.location.href = "index.html#featured";
      } else if (section === "movies") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (section === "bookmarks") {
        window.location.href = "bookmarks.html";
      } else if (section === "about") {
        window.location.href = "about.html";
      } else if (section === "contact") {
        window.location.href = "about.html#contact";
      }
    });
  });
}

// Save bookmark to localStorage
function saveBookmark(item) {
  let bookmarks = JSON.parse(localStorage.getItem("animeBookmarks") || "[]");

  // Check if already bookmarked
  const exists = bookmarks.some(
    (b) => b.id === item.id && b.type === item.type
  );
  if (!exists) {
    bookmarks.push(item);
    localStorage.setItem("animeBookmarks", JSON.stringify(bookmarks));
  }
}
