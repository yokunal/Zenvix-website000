/**
 * ZENVIX AUTOMATION - Core Interactive Behaviors
 * Header navigation, mobile menu, animation strip runner controls,
 * and progressive WhatsApp link enhancements.
 */

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initTopStrip();
  initWhatsAppLinks();
  highlightActiveNav();
});

/**
 * Mobile Navigation Toggle
 */
function initMobileNav() {
  const toggleBtn = document.querySelector(".mobile-menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  if (!toggleBtn || !mainNav) return;

  function toggleMenu(open) {
    const isOpen = open !== undefined ? open : !mainNav.classList.contains("is-open");
    mainNav.classList.toggle("is-open", isOpen);
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
    toggleBtn.textContent = isOpen ? "✕ Close" : "☰ Menu";
  }

  toggleBtn.addEventListener("click", () => {
    toggleMenu();
  });

  // Close when clicking any nav link
  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      if (mainNav.classList.contains("is-open")) {
        toggleMenu(false);
      }
    });
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mainNav.classList.contains("is-open")) {
      toggleMenu(false);
      toggleBtn.focus();
    }
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (mainNav.classList.contains("is-open") && !mainNav.contains(e.target) && !toggleBtn.contains(e.target)) {
      toggleMenu(false);
    }
  });
}

/**
 * Top Animation Strip Controller
 * Single shared animation timeline keeping obstacle movement and runner jump
 * perfectly synchronized across desktop, mobile, viewport resizing, and pause/resume.
 */
function initTopStrip() {
  const strip = document.querySelector(".top-strip");
  const toggleBtn = document.querySelector(".strip-btn");
  const runner = strip ? strip.querySelector(".strip-runner") : null;
  const obstacle = strip ? strip.querySelector(".strip-obstacle") : null;

  if (!strip || !toggleBtn || !runner || !obstacle) return;

  let isPaused = false;
  let rafId = null;
  let lastTime = null;

  // Check prefers-reduced-motion
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (mediaQuery.matches) {
    isPaused = true;
    updatePauseUI(true);
    return;
  }

  // Dimension & geometry tracking
  let stripWidth = strip.clientWidth || window.innerWidth;
  let runnerLeft = runner.offsetLeft || (window.innerWidth <= 767 ? 20 : 48);
  let runnerWidth = runner.offsetWidth || (window.innerWidth <= 767 ? 22 : 28);
  let runnerHeight = runner.offsetHeight || (window.innerWidth <= 767 ? 22 : 28);
  let obstacleWidth = obstacle.offsetWidth || (window.innerWidth <= 767 ? 12 : 16);
  let obstacleHeight = obstacle.offsetHeight || (window.innerWidth <= 767 ? 16 : 20);

  const EXIT_MARGIN = 80;

  function updateDimensions() {
    stripWidth = strip.clientWidth || window.innerWidth;
    runnerLeft = runner.offsetLeft || (window.innerWidth <= 767 ? 20 : 48);
    runnerWidth = runner.offsetWidth || (window.innerWidth <= 767 ? 22 : 28);
    runnerHeight = runner.offsetHeight || (window.innerWidth <= 767 ? 22 : 28);
    obstacleWidth = obstacle.offsetWidth || (window.innerWidth <= 767 ? 12 : 16);
    obstacleHeight = obstacle.offsetHeight || (window.innerWidth <= 767 ? 16 : 20);

    // If obstacle is further out than current strip width + margin, clamp it inward
    if (obstacleX > stripWidth + EXIT_MARGIN) {
      obstacleX = stripWidth + 10;
    }
  }

  function getSpeed() {
    // Slower by ~25%: traversing the strip + exit margin in ~3.2 seconds (instead of 2.4s)
    const totalTravel = stripWidth + obstacleWidth + EXIT_MARGIN;
    return totalTravel / 3.2;
  }

  // Initial obstacle position starts just off the right edge of the strip
  let obstacleX = stripWidth + 10;

  function tick(now) {
    if (isPaused) return;

    if (!lastTime) {
      lastTime = now;
    }
    const dt = Math.min((now - lastTime) / 1000, 0.1); // in seconds, capped at 100ms
    lastTime = now;

    const speed = getSpeed();

    // 1. Advance obstacle along shared timeline
    obstacleX -= speed * dt;

    // Reset when obstacle has completely passed off the left edge
    if (obstacleX < -obstacleWidth - EXIT_MARGIN) {
      obstacleX = stripWidth + 10;
    }

    // 2. Synchronized Jump Calculation:
    // Alignment center where the obstacle's center coincides with the runner's center
    const center = runnerLeft + (runnerWidth - obstacleWidth) / 2;
    const distFromCenter = obstacleX - center; // positive when approaching, negative when past

    // Clear the obstacle height comfortably (20px desktop / 16px mobile + clearance)
    const maxJumpHeight = obstacleHeight + 8;

    // Jump duration scales smoothly with speed to ensure liftoff precedes contact
    // and touchdown follows full clearance on both desktop and mobile
    const jumpDuration = Math.max(0.48, Math.min(0.70, 0.44 + 32 / speed));
    const jumpHalfDist = speed * (jumpDuration / 2);

    let jumpY = 0;
    if (distFromCenter <= jumpHalfDist && distFromCenter >= -jumpHalfDist) {
      // Progress: 0 at liftoff, 0.5 at apex (center), 1.0 at touchdown
      const progress = 1 - (distFromCenter + jumpHalfDist) / (2 * jumpHalfDist);
      // Parabolic gravity trajectory
      jumpY = 4 * maxJumpHeight * progress * (1 - progress);
    }

    // 3. Apply GPU-accelerated transforms
    obstacle.style.transform = `translateX(${obstacleX}px)`;
    runner.style.transform = `translateY(-${jumpY}px)`;

    rafId = requestAnimationFrame(tick);
  }

  function startLoop() {
    if (!rafId && !isPaused) {
      lastTime = null;
      rafId = requestAnimationFrame(tick);
    }
  }

  function stopLoop() {
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function updatePauseUI(paused) {
    strip.classList.toggle("is-paused", paused);
    toggleBtn.setAttribute("aria-pressed", String(paused));
    toggleBtn.innerHTML = paused
      ? '<svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><polygon points="3,2 14,8 3,14"/></svg> Play'
      : '<svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><rect x="3" y="2" width="3" height="12"/><rect x="10" y="2" width="3" height="12"/></svg> Pause';
  }

  function setPaused(paused) {
    isPaused = paused;
    updatePauseUI(isPaused);
    if (isPaused) {
      stopLoop();
    } else {
      startLoop();
    }
  }

  toggleBtn.addEventListener("click", () => {
    setPaused(!isPaused);
  });

  // Handle window resizing without losing synchronization
  window.addEventListener("resize", () => {
    updateDimensions();
  }, { passive: true });

  // Pause when tab is not visible to prevent desynchronization and conserve CPU
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      strip.classList.add("is-paused");
      stopLoop();
    } else if (!isPaused) {
      strip.classList.remove("is-paused");
      lastTime = null;
      startLoop();
    }
  });

  // Initialize and run shared loop
  updateDimensions();
  startLoop();
}

/**
 * Ensure WhatsApp Links use CONFIG helper if available
 */
function initWhatsAppLinks() {
  if (typeof CONFIG === "undefined") return;

  // Update elements with data-wa-message
  document.querySelectorAll("[data-wa-message]").forEach(el => {
    const customMsg = el.getAttribute("data-wa-message");
    el.setAttribute("href", CONFIG.buildWhatsAppUrl(customMsg));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });

  // Update elements with data-wa-service
  document.querySelectorAll("[data-wa-service]").forEach(el => {
    const service = el.getAttribute("data-wa-service");
    el.setAttribute("href", CONFIG.buildServiceQuoteUrl(service));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });
}

/**
 * Mark the current active navigation item
 */
function highlightActiveNav() {
  const currentPath = window.location.pathname.replace(/\/index\.html$/, "/");
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (!href) return;

    // Direct match or root match
    if (href === currentPath || (href !== "/" && currentPath.startsWith(href))) {
      link.classList.add("active");
    } else if (href === "/" && (currentPath === "/" || currentPath === "")) {
      link.classList.add("active");
    }
  });
}
