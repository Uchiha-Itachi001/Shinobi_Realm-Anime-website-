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
      }, 500);
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
        href !== "bookmarks.html" &&
        href !== "about.html")
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

// Sidebar navigation
function initSidebarNavigation() {
  const sidebarIcons = document.querySelectorAll(".sidebar-icon");

  sidebarIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      const section = icon.dataset.section;

      if (section === "hero") {
        window.location.href = "index.html";
      } else if (section === "movies") {
        window.location.href = "movies.html";
      } else if (section === "bookmarks") {
        window.location.href = "bookmarks.html";
      } else if (section === "about") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (section === "contact") {
        const contactSection = document.querySelector(".contact-section");
        if (contactSection) {
          contactSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
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

// Counter Animation for Stats
function animateCounter(element) {
  const target = parseInt(element.getAttribute("data-target"));
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Intersection Observer for animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("stat-value")) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
        // Animate expertise bars
        if (entry.target.classList.contains("profile-card")) {
          entry.target.classList.add("animate-bars");
          const expertiseFills =
            entry.target.querySelectorAll(".expertise-fill");
          expertiseFills.forEach((fill, index) => {
            const width = fill.getAttribute("data-width");
            // Stagger the animation for each bar
            setTimeout(() => {
              fill.style.setProperty("width", width + "%", "important");
            }, 300 + index * 100);
          });
          observer.unobserve(entry.target);
        }
      }
    });
  },
  { threshold: 0.2 }
);

// Contact Form Handler
function handleContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector(".submit-btn");
    const originalText = submitBtn.innerHTML;

    // Show loading state
    submitBtn.innerHTML = "<span>Sending...</span>";
    submitBtn.style.pointerEvents = "none";

    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
      submitBtn.innerHTML = "<span>Message Sent! ✓</span>";
      submitBtn.style.background = "linear-gradient(135deg, #00c853, #00e676)";

      // Reset form
      form.reset();

      // Reset button after 3 seconds
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = "";
        submitBtn.style.pointerEvents = "";
      }, 3000);
    }, 1500);
  });
}

// Update sidebar active state on scroll
function updateSidebarActiveState() {
  const sidebarIcons = document.querySelectorAll(".sidebar-icon");
  const contactSection = document.querySelector(".contact-section");

  if (!contactSection) return;

  let scrollTimeout;
  window.addEventListener("scroll", () => {
    if (scrollTimeout) {
      clearTimeout(scrollTimeout);
    }

    scrollTimeout = setTimeout(() => {
      const scrollY = window.scrollY;
      const contactTop = contactSection.offsetTop - 200;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if contact section is visible
      if (
        scrollY >= contactTop ||
        scrollY + windowHeight >= documentHeight - 100
      ) {
        // Remove active from all sidebar icons
        sidebarIcons.forEach((icon) => icon.classList.remove("active"));
        // Add active to contact icon
        const contactIcon = document.querySelector('[data-section="contact"]');
        if (contactIcon) contactIcon.classList.add("active");
      } else {
        // Remove active from all sidebar icons
        sidebarIcons.forEach((icon) => icon.classList.remove("active"));
        // Add active to about icon
        const aboutIcon = document.querySelector('[data-section="about"]');
        if (aboutIcon) aboutIcon.classList.add("active");
      }
    }, 50);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupPageTransitions();
  initSidebarNavigation();
  initHamburgerMenu();
  handleContactForm();
  updateSidebarActiveState();

  // Observe stat values
  document.querySelectorAll(".stat-value").forEach((stat) => {
    observer.observe(stat);
  });

  // Observe profile cards for expertise bar animation
  document.querySelectorAll(".profile-card").forEach((card) => {
    observer.observe(card);
  });

  // Trigger animation for cards already in viewport on page load
  setTimeout(() => {
    document.querySelectorAll(".profile-card").forEach((card) => {
      const rect = card.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible && !card.classList.contains("animate-bars")) {
        card.classList.add("animate-bars");
        const expertiseFills = card.querySelectorAll(".expertise-fill");
        expertiseFills.forEach((fill, index) => {
          const width = fill.getAttribute("data-width");
          setTimeout(() => {
            fill.style.setProperty("width", width + "%", "important");
          }, 300 + index * 100);
        });
      }
    });
  }, 500);
});
