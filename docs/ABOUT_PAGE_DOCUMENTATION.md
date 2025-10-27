# About Page - Documentation

## Overview

The **about.html** page showcases the team behind ShinobiRealm, provides information about the website, and includes a contact section. It features animated team member cards with hover effects and social media integration.

---

## Features Used

### 1. **Page Loading Animation**

- **Description**: Consistent loading experience across all pages
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
      }, 500);
    }
    progressText.textContent = Math.floor(progress) + "%";
  }, 100);
});
```

---

### 2. **Hero Section**

- **Description**: Large banner introducing the ShinobiRealm platform
- **HTML Structure**:

```html
<section class="about-hero">
  <div class="about-hero-content">
    <h1 class="about-hero-title">About ShinobiRealm</h1>
    <p class="about-hero-subtitle">
      Your ultimate destination for anime streaming and discovery
    </p>
    <div class="about-hero-stats">
      <div class="stat-item">
        <div class="stat-number">1000+</div>
        <div class="stat-label">Anime Titles</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">500+</div>
        <div class="stat-label">Movies</div>
      </div>
      <div class="stat-item">
        <div class="stat-number">24/7</div>
        <div class="stat-label">Streaming</div>
      </div>
    </div>
  </div>
</section>
```

---

### 3. **Team Section**

- **Description**: Grid of team member cards with photos and social links
- **HTML Structure**:

```html
<section class="team-section">
  <div class="section-header">
    <h2 class="section-title">Meet Our Team</h2>
    <p class="section-subtitle">The passionate people behind ShinobiRealm</p>
  </div>
  
  <div class="team-grid">
    <div class="team-card">
      <div class="team-card-image">
        <img src="image/team/member1.jpg" alt="Team Member">
        <div class="team-card-overlay">
          <div class="social-links">
            <a href="#" class="social-link">
              <svg><!-- Twitter Icon --></svg>
            </a>
            <a href="#" class="social-link">
              <svg><!-- GitHub Icon --></svg>
            </a>
            <a href="#" class="social-link">
              <svg><!-- LinkedIn Icon --></svg>
            </a>
          </div>
        </div>
      </div>
      <div class="team-card-content">
        <h3 class="team-card-name">John Doe</h3>
        <p class="team-card-role">Founder & CEO</p>
        <p class="team-card-bio">
          Passionate about anime and technology, bringing fans together.
        </p>
      </div>
    </div>
    <!-- More team cards... -->
  </div>
</section>
```

---

### 4. **Team Card Hover Effects**

- **Description**: Smooth animations revealing social links on hover
- **CSS Implementation**:

```css
.team-card {
  background: var(--panel);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.team-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 50px rgba(142, 123, 255, 0.2);
  border-color: rgba(142, 123, 255, 0.3);
}

.team-card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(14, 23, 38, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.team-card:hover .team-card-overlay {
  opacity: 1;
}

.social-links {
  display: flex;
  gap: 15px;
  transform: translateY(20px);
  transition: transform 0.4s ease 0.1s;
}

.team-card:hover .social-links {
  transform: translateY(0);
}
```

---

### 5. **Mission Statement Section**

- **Description**: Information about the website's purpose
- **HTML**:

```html
<section class="mission-section">
  <div class="mission-container">
    <div class="mission-content">
      <h2 class="mission-title">Our Mission</h2>
      <p class="mission-text">
        At ShinobiRealm, we're dedicated to providing anime fans with the 
        best streaming experience. Our platform offers a vast collection of 
        anime series and movies, all in high quality with subtitles.
      </p>
      <div class="mission-features">
        <div class="feature-item">
          <svg><!-- Check Icon --></svg>
          <span>High-quality streaming</span>
        </div>
        <div class="feature-item">
          <svg><!-- Check Icon --></svg>
          <span>Regular updates</span>
        </div>
        <div class="feature-item">
          <svg><!-- Check Icon --></svg>
          <span>User-friendly interface</span>
        </div>
      </div>
    </div>
    <div class="mission-image">
      <img src="image/mission.jpg" alt="Our Mission">
    </div>
  </div>
</section>
```

---

### 6. **Contact Section**

- **Description**: Contact form with smooth scroll navigation
- **HTML Structure**:

```html
<section class="contact-section" id="contact">
  <div class="contact-container">
    <h2 class="section-title">Get In Touch</h2>
    <p class="section-subtitle">Have questions? We'd love to hear from you</p>
    
    <form class="contact-form">
      <div class="form-row">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" id="name" placeholder="Your name" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="your@email.com" required>
        </div>
      </div>
      
      <div class="form-group">
        <label for="subject">Subject</label>
        <input type="text" id="subject" placeholder="What's this about?" required>
      </div>
      
      <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" rows="6" placeholder="Your message..." required></textarea>
      </div>
      
      <button type="submit" class="submit-btn">
        Send Message
        <svg><!-- Send Icon --></svg>
      </button>
    </form>
  </div>
</section>
```

---

### 7. **Sidebar Navigation**

- **Description**: Smooth scroll to contact section from sidebar
- **Implementation**:

```javascript
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
```

---

### 8. **Form Validation**

- **Description**: HTML5 validation with custom styling
- **CSS**:

```css
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 14px 18px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: rgb(142, 123, 255);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 0 3px rgba(142, 123, 255, 0.1);
}

.form-group input:invalid:not(:placeholder-shown),
.form-group textarea:invalid:not(:placeholder-shown) {
  border-color: rgba(255, 107, 107, 0.5);
}

.form-group input:valid:not(:placeholder-shown),
.form-group textarea:valid:not(:placeholder-shown) {
  border-color: rgba(76, 175, 80, 0.5);
}
```

---

### 9. **Submit Button Animation**

- **Description**: Animated send button with icon
- **CSS**:

```css
.submit-btn {
  background: linear-gradient(135deg, rgb(142, 123, 255), rgb(117, 103, 210));
  color: #fff;
  border: none;
  padding: 16px 40px;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 10px 30px rgba(142, 123, 255, 0.3);
}

.submit-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(142, 123, 255, 0.5);
}

.submit-btn svg {
  transition: transform 0.3s ease;
}

.submit-btn:hover svg {
  transform: translateX(5px);
}
```

---

### 10. **Responsive Grid Layout**

- **Description**: Team cards adapt to screen size
- **CSS**:

```css
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
  padding: 40px 20px;
  max-width: 1400px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .team-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
    padding: 30px 15px;
  }
}

@media (max-width: 480px) {
  .team-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
```

---

### 11. **Hamburger Menu Integration**

- **Description**: Mobile menu functionality
- **Implementation**:

```javascript
function initHamburgerMenu() {
  const hamburger = document.querySelector(".hamburger-menu");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".mobile-overlay");
  const sidebarIcons = document.querySelectorAll(".sidebar-icon");

  if (!hamburger || !sidebar || !overlay) return;

  hamburger.addEventListener("click", () => {
    const isActive = hamburger.classList.toggle("active");
    sidebar.classList.toggle("active", isActive);
    overlay.classList.toggle("active", isActive);
    document.body.style.overflow = isActive ? "hidden" : "";
  });

  overlay.addEventListener("click", () => {
    hamburger.classList.remove("active");
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  });

  sidebarIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      hamburger.classList.remove("active");
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    });
  });
}
```

---

## File Structure

```
about.html          - About page HTML
About.js            - About page JavaScript
styles.css          - Global styles
image/team/         - Team member photos
```

---

## Key Sections

1. **Hero Section**: Introduction and statistics
2. **Mission Section**: Purpose and features
3. **Team Section**: Team member cards with social links
4. **Contact Section**: Contact form

---

## Social Media Integration

```html
<div class="social-links">
  <a href="https://www.facebook.com/..." class="social-link" aria-label="Facebook">
    <svg><!-- Facebook Icon --></svg>
  </a>
  <a href="https://www.instagram.com/..." class="social-link" aria-label="Instagram">
    <svg><!-- Instagram Icon --></svg>
  </a>
  <a href="https://twitter.com/..." class="social-link" aria-label="Twitter">
    <svg><!-- Twitter Icon --></svg>
  </a>
  <a href="https://github.com/..." class="social-link" aria-label="GitHub">
    <svg><!-- GitHub Icon --></svg>
  </a>
</div>
```

---

## Accessibility Features

- **ARIA Labels**: All interactive elements have aria-label attributes
- **Semantic HTML**: Proper use of section, article, nav elements
- **Focus Styles**: Visible focus indicators on form inputs
- **Alt Text**: All images have descriptive alt attributes
- **Keyboard Navigation**: All features accessible via keyboard

---

## Animation Timeline

1. **Page Load**: 0-2s - Loading screen with progress
2. **Hero Entrance**: 2s - Fade in hero content
3. **Section Reveal**: On scroll - Fade in as sections come into view
4. **Card Hover**: Instant - Smooth transform and shadow
5. **Form Focus**: Instant - Border color and glow effect

---

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox
- CSS Custom Properties
- Smooth scrolling API
- ES6+ JavaScript
