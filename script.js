// Anime Hero Slider with Cool Animations
let animeData = [];
let currentSlide = 0;
let autoPlayInterval;

// Page Loading & Transitions
window.addEventListener("load", () => {
  const loader = document.querySelector(".page-loader");
  const progressText = document.querySelector(".progress-text");
  let progress = 0;

  const progressInterval = setInterval(() => {
    progress += Math.random() * 15 + 5; // Random increment between 5-20
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
    // Skip if it's the same page, has a hash, or is not an HTML file
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

  // Fetch anime data and initialize slider
  fetch("data/anime.json")
    .then((r) => r.json())
    .then((data) => {
      animeData = data;
      window.__ANIME_DATA = data;
      console.log("Loaded anime.json with", data.length, "entries");
      initSlider();

      // Populate sections after data is loaded
      populateFeaturedAnime();
      populateLatestAnime();
    })
    .catch((err) => {
      console.error("Could not load anime.json", err);
    });

  // Search form handler
  const form = document.getElementById("searchForm");
  const input = document.getElementById("searchInput");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = input.value && input.value.trim();
    if (!q) return flashPlaceholder();
    console.log("Search for:", q);
    animateSearchResult(q);
  });

  function flashPlaceholder() {
    const orig = input.placeholder;
    input.placeholder = "Type something to search...";
    setTimeout(() => (input.placeholder = orig), 1400);
  }

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
      borderRadius: "10px",
      boxShadow: "0 10px 30px rgba(2,6,10,0.6)",
      color: "#cfe7ff",
      zIndex: 9999,
    });
    document.body.appendChild(el);
    setTimeout(() => (el.style.opacity = "0"), 1400);
    setTimeout(() => el.remove(), 1800);
  }

  // Initialize sidebar navigation
  initSidebarNavigation();
});

// Initialize the Hero Slider
function initSlider() {
  const container = document.querySelector(".slider-container");
  const indicatorsContainer = document.querySelector(".slider-indicators");

  if (!container || !animeData.length) return;

  // Create slides
  animeData.forEach((anime, index) => {
    const slide = createSlide(anime, index);
    container.appendChild(slide);

    // Create indicator
    const indicator = document.createElement("div");
    indicator.className = "indicator" + (index === 0 ? " active" : "");
    indicator.addEventListener("click", () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
  });

  // Set first slide as active
  container.children[0].classList.add("active");

  // Navigation buttons
  document.querySelector(".slider-prev").addEventListener("click", prevSlide);
  document.querySelector(".slider-next").addEventListener("click", nextSlide);

  // Auto-play
  startAutoPlay();

  // Pause on hover
  const heroSlider = document.getElementById("heroSlider");
  heroSlider.addEventListener("mouseenter", stopAutoPlay);
  heroSlider.addEventListener("mouseleave", startAutoPlay);
}

// Create a slide element
function createSlide(anime, index) {
  const slide = document.createElement("div");
  slide.className = "slide";
  slide.dataset.index = index;

  slide.innerHTML = `
        <div class="slide-bg" style="background-image: url('${
          anime.image
        }')"></div>
        <div class="slide-overlay"></div>
        <div class="live-badge">
            LIVE
        </div>
        <div class="slide-content">
            <div class="content-left"></div>
            <div class="content-right">
                <h1 class="anime-title">${anime.title}</h1>
                <div class="anime-meta">
                    <div class="meta-item">
                        <strong>Year:</strong> ${anime.year}
                    </div>
                    <div class="meta-item">
                        <strong>Rating:</strong> ⭐ ${anime.rating}/10
                    </div>
                </div>
                <div class="anime-meta">
                    <div class="meta-item">
                        ${anime.genres
                          .map(
                            (g) =>
                              `<span style="background: rgba(255, 107, 107, 0.2); padding: 4px 10px; border-radius: 4px;  border: 1px solid rgba(255, 107, 107, 0.3); color: #ff8c6b;">${g}</span>`
                          )
                          .join(" ")}
                    </div>
                </div>
                <p class="anime-description">${anime.synopsis}</p>
                <div class="anime-link">
                    <a href="${anime.wiki}" target="_blank" rel="noopener">
                        Read on Wikipedia 
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                    </a>
                </div>
                <div class="anime-actions">
                 <a href="${anime.trailer}" target="_blank" >
                    <button class="btn btn-primary">
                        ▶ Watch Now
                    </button>
                    </a>
                    <button class="add-to-list-btn" title="Add to list">
                        +
                    </button>
                </div>
            </div>
        </div>
    `;

  return slide;
}

// Slider Navigation Functions
function goToSlide(index) {
  const slides = document.querySelectorAll(".slide");
  const indicators = document.querySelectorAll(".indicator");

  // Remove active class from current slide
  slides[currentSlide].classList.remove("active");
  indicators[currentSlide].classList.remove("active");

  // Add active class to new slide
  currentSlide = index;
  slides[currentSlide].classList.add("active");
  indicators[currentSlide].classList.add("active");

  // Reset auto-play
  stopAutoPlay();
  startAutoPlay();
}

function nextSlide() {
  const nextIndex = (currentSlide + 1) % animeData.length;
  goToSlide(nextIndex);
}

function prevSlide() {
  const prevIndex = (currentSlide - 1 + animeData.length) % animeData.length;
  goToSlide(prevIndex);
}

// Auto-play functions
function startAutoPlay() {
  autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

function stopAutoPlay() {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
  }
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    prevSlide();
  } else if (e.key === "ArrowRight") {
    nextSlide();
  }
});

// Featured Carousel State
let featuredCurrentIndex = 0;
let featuredCards = [];
let featuredAutoPlayInterval;

// Populate Featured Anime Section (Best New Anime) - Carousel
function populateFeaturedAnime() {
  const grid = document.getElementById("featuredGrid");
  if (!grid || !animeData.length) return;

  // Prevent duplicate population
  if (grid.children.length > 0) return;

  // Use all anime for carousel
  featuredCards = [];

  animeData.forEach((anime, index) => {
    const card = document.createElement("div");
    card.className = "featured-card";
    card.dataset.index = index;
    card.innerHTML = `
      <img src="${anime.image}" alt="${anime.title}" class="featured-card-image" loading="lazy">
      <div class="featured-card-content">
        <h3 class="featured-card-title">${anime.title}</h3>
        <p class="featured-card-desc">${anime.synopsis}</p>
        <div class="featured-card-actions">
        <a href="${anime.trailer}" target="_blank" >
          <button class="read-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
            Watch Now
          </button>
          </a>
          <button class="bookmark-btn" title="Add to bookmarks">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </div>
      </div>
    `;
    card.querySelector(".read-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      // Start watching anime
    });
    card.querySelector(".bookmark-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      const animeWithType = { ...anime, type: "anime" };
      const isAdded = toggleBookmark(animeWithType);
      const btn = e.currentTarget;
      const svg = btn.querySelector("svg");

      if (isAdded) {
        // Added to bookmarks - fill it
        svg.setAttribute("fill", "rgb(117, 103, 210)");
        svg.setAttribute("stroke", "rgb(117, 103, 210)");
        btn.style.color = "rgb(117, 103, 210)";
      } else {
        // Removed from bookmarks - unfill it
        svg.setAttribute("fill", "none");
        svg.setAttribute("stroke", "currentColor");
        btn.style.color = "";
      }
    });

    // Check if already bookmarked and update UI
    const animeWithType = { ...anime, type: "anime" };
    if (isBookmarked(animeWithType)) {
      const btn = card.querySelector(".bookmark-btn");
      const svg = btn.querySelector("svg");
      svg.setAttribute("fill", "rgb(117, 103, 210)");
      svg.setAttribute("stroke", "rgb(117, 103, 210)");
      btn.style.color = "rgb(117, 103, 210)";
    }

    // Click side cards to make them center
    card.addEventListener("click", () => {
      const position = card.dataset.position;
      if (position === "left-1") {
        featuredPrevSlide();
      } else if (position === "right-1") {
        featuredNextSlide();
      }
    });

    grid.appendChild(card);
    featuredCards.push(card);
  });

  // Initialize carousel positions
  updateFeaturedCarousel();

  // Wire up navigation buttons
  document.querySelector(".featured-prev").addEventListener("click", () => {
    featuredPrevSlide();
    stopFeaturedAutoPlay();
    startFeaturedAutoPlay();
  });
  document.querySelector(".featured-next").addEventListener("click", () => {
    featuredNextSlide();
    stopFeaturedAutoPlay();
    startFeaturedAutoPlay();
  });

  // Start auto-play
  startFeaturedAutoPlay();

  // Pause on hover
  const featuredSlider = document.querySelector(".featured-slider");
  featuredSlider.addEventListener("mouseenter", stopFeaturedAutoPlay);
  featuredSlider.addEventListener("mouseleave", startFeaturedAutoPlay);
}

// Update Featured Carousel Positions - 6 cards visible
function updateFeaturedCarousel() {
  const total = featuredCards.length;

  featuredCards.forEach((card, index) => {
    const relativePosition = (index - featuredCurrentIndex + total) % total;

    if (relativePosition === 0) {
      card.dataset.position = "center";
    } else if (relativePosition === 1 || relativePosition === total - 1) {
      card.dataset.position = relativePosition === 1 ? "right-1" : "left-1";
    } else if (relativePosition === 2 || relativePosition === total - 2) {
      card.dataset.position = relativePosition === 2 ? "right-2" : "left-2";
    } else if (relativePosition === 3 || relativePosition === total - 3) {
      card.dataset.position = relativePosition === 3 ? "right-3" : "left-3";
    } else {
      card.dataset.position = "hidden";
    }
  });
}

// Featured Carousel Navigation
function featuredNextSlide() {
  featuredCurrentIndex = (featuredCurrentIndex + 1) % featuredCards.length;
  updateFeaturedCarousel();
}

function featuredPrevSlide() {
  featuredCurrentIndex =
    (featuredCurrentIndex - 1 + featuredCards.length) % featuredCards.length;
  updateFeaturedCarousel();
}

// Featured Carousel Auto-play functions
function startFeaturedAutoPlay() {
  stopFeaturedAutoPlay(); // Clear any existing interval
  featuredAutoPlayInterval = setInterval(featuredNextSlide, 4000); // Auto-advance every 4 seconds
}

function stopFeaturedAutoPlay() {
  if (featuredAutoPlayInterval) {
    clearInterval(featuredAutoPlayInterval);
  }
}

// Populate Latest Anime Section
function populateLatestAnime() {
  console.log("=== populateLatestAnime called ===");
  const grid = document.getElementById("latestGrid");
  console.log("Grid element found:", grid);
  console.log("animeData:", animeData);

  if (!grid) {
    console.error("ERROR: Grid element not found!");
    return;
  }

  if (!animeData || !animeData.length) {
    console.error("ERROR: No anime data!");
    return;
  }

  // Prevent duplicate population
  if (grid.children.length > 0) {
    console.log("Grid already has children, skipping");
    return;
  }

  console.log("Creating cards for", animeData.length, "anime...");

  animeData.forEach((anime, index) => {
    const card = document.createElement("div");
    card.className = "latest-card";

    // Generate star rating - normalize rating from 10-point scale to 5-star scale
    const normalizedRating = (anime.rating / 10) * 5; // Convert 8.3/10 to 4.15/5
    const fullStars = Math.floor(normalizedRating);
    const emptyStars = 5 - fullStars;
    const starsHTML = "★".repeat(fullStars) + "☆".repeat(emptyStars);

    // Add HOT badge to some random cards
    const isHot = index % 3 === 0;

    card.innerHTML = `
      <div class="latest-card-image-wrapper">
        ${isHot ? '<div class="hot-badge">HOT</div>' : ""}
        <img src="${anime.image}" alt="${
      anime.title
    }" class="latest-card-image" loading="lazy">
      </div>
      <div class="latest-card-content">
        <h3 class="latest-card-title">${anime.title}</h3>
        <div class="latest-card-rating">
          ${starsHTML
            .split("")
            .map(
              (star) =>
                `<span class="star ${
                  star === "☆" ? "empty" : ""
                }">${star}</span>`
            )
            .join("")}
          <span class="rating-number">${anime.rating}</span>
        </div>
        <a href="${anime.trailer}" target="_blank" >
        <button class="latest-read-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z"/>
          </svg>
          Watch Now
        </button>
        </a>
      </div>
      <button class="latest-bookmark-btn" title="Add to bookmarks">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>
    `;

    card.querySelector(".latest-read-btn").addEventListener("click", (e) => {
      e.stopPropagation();
      // Start watching anime
    });

    card
      .querySelector(".latest-bookmark-btn")
      .addEventListener("click", (e) => {
        e.stopPropagation();
        const animeWithType = { ...anime, type: "anime" };
        const isAdded = toggleBookmark(animeWithType);
        const btn = e.currentTarget;
        const svg = btn.querySelector("svg");

        if (isAdded) {
          // Added to bookmarks - fill it
          svg.setAttribute("fill", "rgb(117, 103, 210)");
          svg.setAttribute("stroke", "rgb(117, 103, 210)");
          btn.style.color = "rgb(117, 103, 210)";
        } else {
          // Removed from bookmarks - unfill it
          svg.setAttribute("fill", "none");
          svg.setAttribute("stroke", "currentColor");
          btn.style.color = "";
        }
      });

    // Check if already bookmarked and update UI
    const animeWithType = { ...anime, type: "anime" };
    if (isBookmarked(animeWithType)) {
      const btn = card.querySelector(".latest-bookmark-btn");
      const svg = btn.querySelector("svg");
      svg.setAttribute("fill", "rgb(117, 103, 210)");
      svg.setAttribute("stroke", "rgb(117, 103, 210)");
      btn.style.color = "rgb(117, 103, 210)";
    }

    card.addEventListener("click", () => {
      // Card clicked
    });

    grid.appendChild(card);
    console.log(`Added card for ${anime.title}`);
  });

  console.log(`=== COMPLETE: ${grid.children.length} cards in grid ===`);
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

// Hamburger Menu functionality
function initHamburgerMenu() {
  const hamburger = document.querySelector(".hamburger-menu");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".mobile-overlay");
  const sidebarIcons = document.querySelectorAll(".sidebar-icon");

  if (!hamburger || !sidebar || !overlay) return;

  // Toggle menu
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.style.overflow = sidebar.classList.contains("active")
      ? "hidden"
      : "";
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

// Sidebar navigation functionality
function initSidebarNavigation() {
  const sidebarIcons = document.querySelectorAll(".sidebar-icon");

  sidebarIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      const section = icon.getAttribute("data-section");

      // Remove active from all
      sidebarIcons.forEach((i) => i.classList.remove("active"));
      // Add active to clicked
      icon.classList.add("active");

      // Scroll to section
      if (section === "hero") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (section === "discover") {
        const featuredSection = document.querySelector(".featured-section");
        if (featuredSection) {
          featuredSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      } else if (section === "popular") {
        const featuredSection = document.querySelector(".featured-section");
        if (featuredSection) {
          featuredSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      } else if (section === "calendar") {
        const latestSection = document.querySelector(".latest-section");
        if (latestSection) {
          latestSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      } else if (section === "tvshows") {
        window.location.href = "movies.html";
      } else if (section === "bookmarks") {
        window.location.href = "bookmarks.html";
      } else if (section === "about") {
        window.location.href = "about.html";
      } else if (section === "contact") {
        window.location.href = "about.html#contact";
      }
    });
  });

  // Header nav buttons functionality
  const headerNavButtons = document.querySelectorAll(".nav-btn");
  headerNavButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      // Remove active from all
      headerNavButtons.forEach((b) => b.classList.remove("active"));
      // Add active to clicked
      btn.classList.add("active");

      // Handle navigation
      if (index === 3) {
        // Recent button (4th button)
        const latestSection = document.querySelector(".latest-section");
        if (latestSection) {
          latestSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      } else if (index === 0) {
        // Anime button
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  });

  // Update active state on scroll and header tabs
  let scrollTimeout;
  window.addEventListener("scroll", () => {
    // Debounce scroll events to prevent glitching
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    scrollTimeout = setTimeout(() => {
      const scrollY = window.scrollY;
      const featuredSection = document.querySelector(".featured-section");
      const latestSection = document.querySelector(".latest-section");
      const headerNavButtons = document.querySelectorAll(".nav-btn");

      if (featuredSection && latestSection) {
        const featuredTop = featuredSection.offsetTop - 100;
        const latestTop = latestSection.offsetTop - 100;

        // Update header navigation
        headerNavButtons.forEach((btn) => btn.classList.remove("active"));

        if (scrollY >= latestTop) {
          // Keep "Anime" tab active for latest section (still on home page)
          headerNavButtons[0]?.classList.add("active");

          // Activate calendar icon in sidebar (for recent)
          sidebarIcons.forEach((i) => i.classList.remove("active"));
          const calendarIcon = document.querySelector(
            '[data-section="calendar"]'
          );
          if (calendarIcon) calendarIcon.classList.add("active");
        } else if (scrollY >= featuredTop) {
          // Activate "Anime" tab in header
          headerNavButtons[0]?.classList.add("active");

          // Activate discover/compass icon for featured section
          sidebarIcons.forEach((i) => i.classList.remove("active"));
          const discoverIcon = document.querySelector(
            '[data-section="discover"]'
          );
          if (discoverIcon) discoverIcon.classList.add("active");
        } else {
          // Activate "Anime" tab by default
          headerNavButtons[0]?.classList.add("active");

          // Activate home icon
          sidebarIcons.forEach((i) => i.classList.remove("active"));
          const homeIcon = document.querySelector('[data-section="hero"]');
          if (homeIcon) homeIcon.classList.add("active");
        }
      }
    }, 50); // 50ms debounce
  });
}
