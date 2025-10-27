// Bookmarks Page JavaScript
let allBookmarks = [];
let filteredBookmarks = [];

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

document.addEventListener("DOMContentLoaded", () => {
  // Setup page transitions
  setupPageTransitions();

  // Initialize mobile hamburger menu
  initHamburgerMenu();

  loadBookmarks();
  initFilters();
  initSidebarNavigation();

  // Search functionality
  const form = document.getElementById("searchForm");
  const input = document.getElementById("searchInput");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = input.value && input.value.trim().toLowerCase();
    if (!query) {
      filteredBookmarks = [...allBookmarks];
    } else {
      filteredBookmarks = allBookmarks.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          (item.genres &&
            item.genres.some((g) => g.toLowerCase().includes(query)))
      );
    }
    renderBookmarks();
  });
});

// Load bookmarks from localStorage
function loadBookmarks() {
  allBookmarks = JSON.parse(localStorage.getItem("animeBookmarks") || "[]");
  filteredBookmarks = [...allBookmarks];
  updateStats();
  renderBookmarks();
}

// Update statistics
function updateStats() {
  const animeCount = allBookmarks.filter((b) => b.type === "anime").length;
  const movieCount = allBookmarks.filter((b) => b.type === "movie").length;

  document.getElementById("totalBookmarks").textContent = allBookmarks.length;
  document.getElementById("animeCount").textContent = animeCount;
  document.getElementById("moviesCount").textContent = movieCount;
}

// Render bookmarks to the grid
function renderBookmarks() {
  const grid = document.getElementById("bookmarksGrid");
  if (!grid) return;

  grid.innerHTML = "";

  if (filteredBookmarks.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 80px 20px;">
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="rgba(117, 103, 210, 0.3)" stroke-width="1" style="margin: 0 auto 24px;">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
        <h2 style="color: #fff; font-size: 1.8rem; margin-bottom: 12px;">No Bookmarks Yet</h2>
        <p style="color: rgba(255,255,255,0.6); font-size: 1.1rem; margin-bottom: 30px;">Start adding your favorite anime and movies to your collection!</p>
        <a href="index.html" style="display: inline-flex; align-items: center; gap: 8px; background: rgb(117, 103, 210); color: #fff; padding: 14px 28px; border-radius: 10px; text-decoration: none; font-weight: 700; transition: all 0.3s;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          </svg>
          Browse Anime
        </a>
      </div>
    `;
    return;
  }

  filteredBookmarks.forEach((item) => {
    const card = document.createElement("div");
    card.className = "movie-card";

    // Generate star rating - normalize rating from 10-point scale to 5-star scale
    const normalizedRating = (item.rating / 10) * 5;
    const fullStars = Math.floor(normalizedRating);
    const emptyStars = 5 - fullStars;
    const starsHTML = "★".repeat(fullStars) + "☆".repeat(emptyStars);

    const typeBadge = item.type === "movie" ? "MOVIE" : "ANIME";
    const typeBadgeColor =
      item.type === "movie" ? "rgb(117, 103, 210)" : "var(--accent1)";

    card.innerHTML = `
      <div class="movie-card-image-wrapper">
        <div class="movie-year-badge" style="background: ${typeBadgeColor}">${typeBadge}</div>
        <div class="movie-card-rating">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
          <span class="rating-text">${item.rating}</span>
        </div>
        <img src="${item.image}" alt="${
      item.title
    }" class="movie-card-image" loading="lazy">
        <div class="movie-card-overlay">
          <button class="movie-play-btn" title="Watch ${item.title}">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="movie-card-content">
        <h3 class="movie-card-title">${item.title}</h3>
        <div class="movie-card-genres">
          ${
            item.genres
              ? item.genres
                  .slice(0, 3)
                  .map((g) => `<span class="genre-tag">${g}</span>`)
                  .join("")
              : ""
          }
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
        <div class="movie-card-actions">
          <button class="movie-watch-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
            Watch Now
          </button>
          <button class="remove-bookmark-btn" title="Remove from bookmarks" data-id="${
            item.id
          }" data-type="${item.type}">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    `;

    // Event listeners
    card.querySelector(".movie-watch-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      // Start watching
    });

    card.querySelector(".movie-play-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      // Start watching
    });

    card
      .querySelector(".remove-bookmark-btn")
      .addEventListener("click", (e) => {
        e.stopPropagation();
        const id = parseInt(e.currentTarget.getAttribute("data-id"));
        const type = e.currentTarget.getAttribute("data-type");
        removeBookmark(id, type);
      });

    grid.appendChild(card);
  });
}

// Remove bookmark
function removeBookmark(id, type) {
  if (confirm("Remove this item from bookmarks?")) {
    let bookmarks = JSON.parse(localStorage.getItem("animeBookmarks") || "[]");
    bookmarks = bookmarks.filter((b) => !(b.id === id && b.type === type));
    localStorage.setItem("animeBookmarks", JSON.stringify(bookmarks));
    loadBookmarks();
  }
}

// Initialize filters
function initFilters() {
  const typeFilter = document.getElementById("typeFilter");
  const clearAllBtn = document.getElementById("clearAllBtn");

  // Type filter
  typeFilter.addEventListener("change", (e) => {
    const filterType = e.target.value;

    if (filterType === "all") {
      filteredBookmarks = [...allBookmarks];
    } else {
      filteredBookmarks = allBookmarks.filter(
        (item) => item.type === filterType
      );
    }

    renderBookmarks();
  });

  // Clear all bookmarks
  clearAllBtn.addEventListener("click", () => {
    if (
      confirm(
        "Are you sure you want to clear all bookmarks? This action cannot be undone."
      )
    ) {
      localStorage.removeItem("animeBookmarks");
      loadBookmarks();
    }
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
        window.location.href = "movies.html";
      } else if (section === "bookmarks") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (section === "about") {
        window.location.href = "about.html";
      } else if (section === "contact") {
        window.location.href = "about.html#contact";
      }
    });
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
