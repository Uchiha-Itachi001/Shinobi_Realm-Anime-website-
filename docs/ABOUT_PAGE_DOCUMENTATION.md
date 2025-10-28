# About Page - Documentation

## Overview

The **about.html** page showcases the developer behind ShinobiRealm, highlighting their skills, experience, and contact information. It features an animated profile card with hover effects, social media integration, and a contact form. The page uses a modern design with gradients, animations, and responsive layouts.

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

### 2. **Profile Hero Section**

- **Description**: Hero section introducing the developer with avatar, name, role, and social links
- **HTML Structure**:

```html
<section class="profile-hero">
  <div class="profile-container">
    <div class="team-heading">
      <h2 class="team-title">About Me</h2>
      <p class="team-subtitle">The faces behind the ideas and hard work.</p>
    </div>
    <div class="profile-card">
      <div class="profile-header">
        <div class="profile-avatar">
          <div class="avatar-ring"></div>
          <div class="avatar-ring-2"></div>
          <img src="./image/profile.jpg" alt="Pankoj Roy" class="avatar-img">
        </div>
        <div class="profile-info">
          <h1 class="profile-name">Pankoj Roy</h1>
          <p class="profile-role">Full Stack Developer • Flutter Expert • AI Enthusiast</p>
          <div class="profile-socials">
            <a href="Facebook Link" target="_blank" class="social-icon facebook" aria-label="Facebook">
              <svg><!-- facebook Icon --></svg>
            </a>
            <a href="Instagram Link" target="_blank" class="social-icon instagram" aria-label="Instagram">
                <svg><!--InstaGram Icon --></svg>
            </a>
            <a href="Github Link" target="_blank" class="social-icon git-hub" aria-label="GitHub">
              <svg><!--Github Icon --></svg>
            </a>
          </div>
        </div>
      </div>
      <div class="profile-bio">
        <p>Passionate developer who transforms ideas into reality through clean, efficient code. Specializing in full-stack web development and cross-platform mobile applications.</p>
      </div>
      <div class="profile-stats">
        <div class="stat-item">
          <div class="stat-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-value" data-target="2">0</div>
            <div class="stat-label">Years Experience</div>
          </div>
        </div>
        <div class="stat-item">
          <div class="stat-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <div class="stat-content">
            <div class="stat-value" data-target="20">0</div>
            <div class="stat-label">Projects Completed</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

### 3. **Skills Showcase Section**

- **Description**: Grid of skill cards highlighting expertise areas
- **HTML Structure**:

```html
<section class="skills-showcase">
  <div class="profile-container">
    <h2 class="section-heading">Expertise</h2>
    <div class="skills-grid">
      <div class="skill-card">
        <div class="skill-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        </div>
        <h3>Full Stack Development</h3>
        <p>Building end-to-end web applications with modern frameworks and best practices</p>
        <div class="tech-tags">
          <span>HTML/CSS</span>
          <span>JavaScript</span>
          <span>React</span>
          <span>Node.js</span>
        </div>
      </div>
      <!-- More skill cards... -->
    </div>
  </div>
</section>
```

---

### 4. **Contact Section**

- **Description**: Contact form with validation and info cards
- **HTML Structure**:

```html
<section class="contact-section">
  <div class="profile-container">
    <h2 class="section-heading">Get In Touch</h2>
    <p class="contact-subtitle">Have a project in mind or just want to say hi? Feel free to reach out!</p>

    <div class="contact-wrapper">
      <form class="contact-form" id="contactForm">
        <div class="form-row">
          <div class="form-group">
            <label for="name">Your Name</label>
            <input type="text" id="name" name="name" placeholder="John Doe" required>
          </div>
          <div class="form-group">
            <label for="email">Your Email</label>
            <input type="email" id="email" name="email" placeholder="john@example.com" required>
          </div>
        </div>

        <div class="form-group">
          <label for="subject">Subject</label>
          <input type="text" id="subject" name="subject" placeholder="Project Inquiry" required>
        </div>

        <div class="form-group">
          <label for="message">Message</label>
          <textarea id="message" name="message" rows="6" placeholder="Tell me about your project..." required></textarea>
        </div>

        <button type="submit" class="submit-btn">
          <span>Send Message</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>

      <div class="contact-info">
        <div class="info-card">
          <div class="info-icon">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
          <h3>Email</h3>
          <p>rpankoj32@gmail.com , hroy82826@gmail.com</p>
        </div>

        <div class="info-card">
          <div class="info-icon">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
          </div>
          <h3>Location</h3>
          <p>Available Worldwide</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

---

### 5. **Sidebar Navigation**

- **Description**: Navigation sidebar with smooth scroll and page redirects
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

### 6. **Animated Statistics**

- **Description**: Counter animation for experience and projects
- **Implementation**:

```javascript
function animateStats() {
  const statValues = document.querySelectorAll('.stat-value');

  statValues.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        stat.textContent = target;
        clearInterval(timer);
      } else {
        stat.textContent = Math.floor(current);
      }
    }, 30);
  });
}
```

---

### 7. **Form Validation and Submission**

- **Description**: HTML5 validation with custom JavaScript handling
- **Implementation**:

```javascript
function initContactForm() {
  const form = document.getElementById('contactForm');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Basic validation
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !subject || !message) {
      alert('Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Submit form (you can integrate with a backend service here)
    alert('Thank you for your message! I will get back to you soon.');
    form.reset();
  });
}
```

---

## File Structure

```
about.html          - About page HTML
About.js            - About page JavaScript (sidebar nav, form handling, animations)
styles.css          - Global styles including about-page-new, profile-hero, etc.
image/profile.jpg   - Profile image
```

---

## Key Sections

1. **Profile Hero**: Developer introduction with avatar and stats
2. **Skills Showcase**: Expertise areas with tech tags
3. **Contact Section**: Contact form and info cards

---

## Social Media Integration

```html
<div class="profile-socials">
  <a href="https://www.facebook.com/share/19voPLTj8J/" target="_blank" class="social-icon facebook" aria-label="Facebook">
    <svg><!-- Facebook Icon --></svg>
  </a>
  <a href="https://www.instagram.com/rpankoj32?igsh=cHp5Ymx5MGNkdjFz&utm_source=ig_contact_invite" target="_blank" class="social-icon instagram" aria-label="Instagram">
    <svg><!-- Instagram Icon --></svg>
  </a>
  <a href="https://github.com/Uchiha-Itachi001" target="_blank" class="social-icon git-hub" aria-label="GitHub">
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
2. **Hero Entrance**: 2s - Fade in profile content
3. **Stats Animation**: On scroll - Counter animations
4. **Card Hover**: Instant - Smooth transform and shadow
5. **Form Focus**: Instant - Border color and glow effect

---

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox
- CSS Custom Properties
- Smooth scrolling API
- ES6+ JavaScript
