// Enhanced Main JavaScript for As Motorizadas Portuguesas
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all components
  initializeNavigation();
  initializeSmoothScroll();
  initializeFormHandling();
  initializeScrollEffects();
  initializeButtonInteractions();
  initializeMobileMenu();
  initializeScrollToTop();
  initializeTableInteractions();
  initializePerformanceOptimizations();

  console.log("As Motorizadas Portuguesas loaded successfully!");
});

// Enhanced Navigation with Fixed Header
function initializeNavigation() {
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

  // Handle scroll for fixed navbar

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add scrolled class for styling
    if (scrollTop > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }


  });

  // Enhanced smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = navbar.offsetHeight + 20;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });

        // Close mobile menu if open
        closeMobileMenu();

        // Add active state
        navLinks.forEach((l) => l.classList.remove("active"));
        this.classList.add("active");
      }
    });
  });

  // Highlight active section in navigation
  const sections = document.querySelectorAll("section[id]");
  const observerOptions = {
    threshold: 0.3,
    rootMargin: "-100px 0px -50% 0px",
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const activeLink = document.querySelector(
          `.nav-menu a[href="#${entry.target.id}"]`
        );
        if (activeLink) {
          navLinks.forEach((link) => link.classList.remove("active"));
          activeLink.classList.add("active");
        }
      }
    });
  }, observerOptions);

  sections.forEach((section) => sectionObserver.observe(section));
}

// Enhanced smooth scrolling
function initializeSmoothScroll() {
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

  smoothScrollLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");

      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight =
          document.querySelector(".navbar")?.offsetHeight || 80;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        // Smooth scroll with easing
        smoothScrollTo(targetPosition, 800);
      }
    });
  });
}

// Custom smooth scroll function with easing
function smoothScrollTo(endY, duration) {
  const startY = window.scrollY;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1)
      return (distance / 2) * time * time * time * time + from;
    return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newY = easeInOutQuart(time, startY, distanceY, duration);

    if (time >= duration) {
      clearInterval(timer);
      window.scrollTo(0, endY);
    } else {
      window.scrollTo(0, newY);
    }
  }, 1000 / 60);
}

// Enhanced form handling with validation
// function initializeFormHandling() {
//   const testimonialForm = document.querySelector(".testimonial-form-element");

//   if (testimonialForm) {
//     testimonialForm.addEventListener("submit", function (e) {
//       e.preventDefault();

//       const formData = new FormData(this);
//       const nome = formData.get("nome");
//       const email = formData.get("email");
//       const testemunho = formData.get("testemunho");

//       // Enhanced validation
//       const errors = validateForm({ nome, email, testemunho });

//       if (errors.length === 0) {
//         handleFormSubmission({ nome, email, testemunho });
//         this.reset();
//         showSuccessMessage(
//           "Obrigado! O seu testemunho foi enviado com sucesso."
//         );
//       } else {
//         showErrorMessage(errors.join("<br>"));
//       }
//     });
//   }
// }

// Enhanced form validation
function validateForm({ nome, email, testemunho }) {
  const errors = [];

  if (!nome || nome.trim().length < 2) {
    errors.push("Nome deve ter pelo menos 2 caracteres");
  }

  if (!validateEmail(email)) {
    errors.push("Email inválido");
  }

  if (!testemunho || testemunho.trim().length < 10) {
    errors.push("Testemunho deve ter pelo menos 10 caracteres");
  }

  return errors;
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Enhanced form submission with loading state
function handleFormSubmission(data) {
  const submitButton = document.querySelector(
    ".testimonial-form-element button"
  );
  const originalText = submitButton.innerHTML;

  // Show loading state
  submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
  submitButton.disabled = true;

  // Simulate API call
  setTimeout(() => {
    submitButton.innerHTML = originalText;
    submitButton.disabled = false;

    console.log("Form submitted with data:", data);

    // Analytics tracking
    if (typeof gtag !== "undefined") {
      gtag("event", "form_submit", {
        event_category: "engagement",
        event_label: "testimonial_form",
      });
    }
  }, 2000);
}

// Enhanced message display system
function showSuccessMessage(message) {
  showMessage(message, "success");
}

function showErrorMessage(message) {
  showMessage(message, "error");
}

function showMessage(message, type) {
  // Remove existing messages
  const existingMessages = document.querySelectorAll(".message");
  existingMessages.forEach((msg) => msg.remove());

  const messageDiv = document.createElement("div");
  messageDiv.className = `message message-${type}`;
  messageDiv.innerHTML = `
    <div class="message-content">
      <i class="fas fa-${
        type === "success" ? "check-circle" : "exclamation-circle"
      }"></i>
      <div class="message-text">${message}</div>
      <button class="message-close" onclick="this.parentElement.parentElement.remove()">
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;

  const styles = `
    position: fixed;
    top: 100px;
    right: 30px;
    max-width: 400px;
    border-radius: 12px;
    color: white;
    font-weight: 500;
    z-index: 1001;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    background: ${
      type === "success"
        ? "linear-gradient(135deg, #38a169 0%, #2f855a 100%)"
        : "linear-gradient(135deg, #e53e3e 0%, #c53030 100%)"
    };
    box-shadow: 0 8px 32px rgba(0,0,0,0.2);
    backdrop-filter: blur(10px);
  `;

  messageDiv.style.cssText = styles;

  // Add message content styles
  const contentStyles = `
    .message-content {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 20px;
    }
    .message-text {
      flex: 1;
      line-height: 1.4;
    }
    .message-close {
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 4px;
      border-radius: 4px;
      transition: background 0.2s ease;
    }
    .message-close:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  `;

  if (!document.querySelector("#message-styles")) {
    const styleSheet = document.createElement("style");
    styleSheet.id = "message-styles";
    styleSheet.textContent = contentStyles;
    document.head.appendChild(styleSheet);
  }

  document.body.appendChild(messageDiv);

  // Animate in
  setTimeout(() => {
    messageDiv.style.opacity = "1";
    messageDiv.style.transform = "translateX(0)";
  }, 100);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (messageDiv.parentNode) {
      messageDiv.style.opacity = "0";
      messageDiv.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (messageDiv.parentNode) {
          messageDiv.remove();
        }
      }, 400);
    }
  }, 5000);
}

// Enhanced scroll effects
function initializeScrollEffects() {
  // Parallax effects for hero elements
  const parallaxElements = document.querySelectorAll(
    ".book-cover-3d, .floating-book"
  );

  if (window.innerWidth > 768) {
    window.addEventListener(
      "scroll",
      throttle(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.3;

        parallaxElements.forEach((element) => {
          element.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
      }, 10)
    );
  }
}

// Enhanced button interactions
function initializeButtonInteractions() {
  const ctaButtons = document.querySelectorAll(".btn");

  ctaButtons.forEach((button) => {
    // Enhanced click feedback
    button.addEventListener("click", function (e) {
      const buttonText = this.textContent.trim();

      // Create ripple effect
      createRippleEffect(e, this);

      // Analytics tracking
      console.log("Button clicked:", buttonText);

      if (typeof gtag !== "undefined") {
        gtag("event", "click", {
          event_category: "cta",
          event_label: buttonText,
        });
      }
    });

    // Enhanced hover effects
    button.addEventListener("mouseenter", function () {
      if (!this.classList.contains("btn-outline")) {
        this.style.transform = "translateY(-2px) scale(1.02)";
      }
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "";
    });
  });
}

// Create ripple effect for buttons
function createRippleEffect(event, element) {
  const ripple = document.createElement("span");
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    transform: scale(0);
    animation: ripple-effect 0.6s ease-out;
    pointer-events: none;
    z-index: 1;
  `;

  // Add ripple keyframes if not exists
  if (!document.querySelector("#ripple-styles")) {
    const style = document.createElement("style");
    style.id = "ripple-styles";
    style.textContent = `
      @keyframes ripple-effect {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  element.style.position = "relative";
  element.style.overflow = "hidden";
  element.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);
}

// Update the mobile menu JavaScript
function initializeMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");
  const body = document.body;

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      const isActive = navMenu.classList.contains("active");
      
      navMenu.classList.toggle("active");
      this.classList.toggle("active");
      
      // Toggle body scroll lock
      if (!isActive) {
        body.classList.add("menu-open");
      } else {
        body.classList.remove("menu-open");
      }
    });

    // Close menu when clicking on links
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeMobileMenu();
      });
    });

    // Close menu when clicking the close button (::after pseudo-element)
    navMenu.addEventListener("click", function(e) {
      const rect = this.getBoundingClientRect();
      const closeButtonArea = {
        x: rect.right - 60,
        y: rect.top + 20,
        width: 40,
        height: 40
      };
      
      if (e.clientX >= closeButtonArea.x && 
          e.clientX <= closeButtonArea.x + closeButtonArea.width &&
          e.clientY >= closeButtonArea.y && 
          e.clientY <= closeButtonArea.y + closeButtonArea.height) {
        closeMobileMenu();
      }
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        closeMobileMenu();
      }
    });

    // Close menu on escape key
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeMobileMenu();
      }
    });
  }
}

function closeMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const body = document.body;

  if (hamburger && navMenu) {
    navMenu.classList.remove("active");
    hamburger.classList.remove("active");
    body.classList.remove("menu-open");
  }
}

// Enhanced scroll to top functionality
function initializeScrollToTop() {
  const scrollButton = document.createElement("button");
  scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollButton.className = "scroll-to-top";
  scrollButton.setAttribute("aria-label", "Voltar ao topo");

  document.body.appendChild(scrollButton);

  // Show/hide based on scroll position
  window.addEventListener(
    "scroll",
    throttle(() => {
      if (window.pageYOffset > 400) {
        scrollButton.classList.add("show");
      } else {
        scrollButton.classList.remove("show");
      }
    }, 100)
  );

  // Smooth scroll to top
  scrollButton.addEventListener("click", () => {
    smoothScrollTo(0, 800);
  });
}

// Enhanced table interactions
function initializeTableInteractions() {
  const tableRows = document.querySelectorAll(".companies-table tbody tr");

  tableRows.forEach((row, index) => {
    // Enhanced hover effects
    row.addEventListener("mouseenter", function () {
      this.style.transform = "translateX(5px)";
      this.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)";
    });

    row.addEventListener("mouseleave", function () {
      this.style.transform = "translateX(0)";
    });

    // Add staggered animation on load
    row.style.opacity = "0";
    row.style.transform = "translateY(20px)";

    setTimeout(() => {
      row.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
      row.style.opacity = "1";
      row.style.transform = "translateY(0)";
    }, index * 50);
  });
}

// Enhanced load more functionality - REWRITTEN FOR CORRECT TABLE STRUCTURE
function loadMoreGroups() {
  const loadMoreContainer = document.querySelector(".load-more-section");
  const companiesTable = document.querySelector(".companies-table tbody");
  const loadMoreBtn = document.querySelector(".load-more-btn");

  if (!companiesTable || !loadMoreBtn) return;

  // Show loading state
  loadMoreBtn.innerHTML =
    '<i class="fas fa-spinner fa-spin"></i> Carregando...';
  loadMoreBtn.disabled = true;

  // Simulate loading delay
  setTimeout(() => {
    // Hide the load more section
    if (loadMoreContainer) {
      loadMoreContainer.style.display = "none";
    }

    // Get all additional groups data as table rows
    const additionalGroupsHTML = getAllAdditionalGroups();

    // Create a temporary container to parse the HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = additionalGroupsHTML;

    // Get all the tr elements and append them to the existing table
    const newRows = tempDiv.querySelectorAll("tr");

    newRows.forEach((row, index) => {
      row.style.opacity = "0";
      row.style.transform = "translateY(30px)";
      companiesTable.appendChild(row);

      // Add stagger animation
      setTimeout(() => {
        row.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
        row.style.opacity = "1";
        row.style.transform = "translateY(0)";

        // Add hover effects to new rows
        if (!row.classList.contains("group-separator")) {
          row.addEventListener("mouseenter", function () {
            this.style.transform = "translateX(5px)";
          });

          row.addEventListener("mouseleave", function () {
            this.style.transform = "translateY(0) translateX(0)";
          });
        }
      }, index * 100);
    });

    // Analytics tracking
    if (typeof gtag !== "undefined") {
      gtag("event", "load_more", {
        event_category: "engagement",
        event_label: "companies_list",
      });
    }
  }, 1500);
}

// All additional groups data in the exact same table structure
function getAllAdditionalGroups() {
  return `
    <!-- Group 6 -->
    <tr class="group-separator">
      <td colspan="5"><span class="group-title">Grupo 6 (1920 - Activa) - Activa</span></td>
    </tr>
    <tr>
      <td><span class="group-number">6</span></td>
      <td><span class="year-badge">1920</span></td>
      <td>António Peixoto ... António Peixoto, Lda</td>
      <td><span class="year-badge active">Activa</span></td>
      <td><span class="brand-tag">PACHANCHO</span></td>
    </tr>

    <!-- Group 7 -->
    <tr class="group-separator">
      <td colspan="5"><span class="group-title">Grupo 7 (1927 - 1988) - Encerrado</span></td>
    </tr>
    <tr>
      <td><span class="group-number">7</span></td>
      <td><span class="year-badge">1927</span></td>
      <td>Egberto Matos ... Solam - Fábrica de Acessórios Para Bicicletas e Motorizadas, Lda</td>
      <td><span class="year-badge closed">1988</span></td>
      <td><span class="brand-tag">MOURISOTAM</span></td>
    </tr>

    <!-- Group 8 -->
    <tr class="group-separator">
      <td colspan="5"><span class="group-title">Grupo 8 (1928 - Activa) - Activa</span></td>
    </tr>
    <tr>
      <td><span class="group-number">8</span></td>
      <td><span class="year-badge">1928</span></td>
      <td>Alberto Carvalho Araújo & Companhia, Lda</td>
      <td><span class="year-badge closed">2015</span></td>
      <td><span class="brand-tag">CENTRO CICLISTA DO MINHO</span></td>
    </tr>
    <tr class="sub-company">
      <td></td>
      <td><span class="year-badge">1936</span></td>
      <td>Lisboa Garagem, Lda</td>
      <td><span class="year-badge closed">1967</span></td>
      <td><span class="brand-tag">LISBOA GARAGEM</span></td>
    </tr>
    <tr class="sub-company">
      <td></td>
      <td><span class="year-badge">1951</span></td>
      <td>Motores Alma, Lda</td>
      <td><span class="year-badge active">Activa</span></td>
      <td><span class="brand-tag">ALMA</span></td>
    </tr>
    <tr class="sub-company">
      <td></td>
      <td><span class="year-badge">1962</span></td>
      <td>Motali - Motores e Veículos Nacionais, Lda</td>
      <td><span class="year-badge closed">2008</span></td>
      <td><span class="brand-tag">MOTALI</span></td>
    </tr>

    <!-- Group 9 -->
    <tr class="group-separator">
      <td colspan="5"><span class="group-title">Grupo 9 (1936 - 2009) - Encerrado</span></td>
    </tr>
    <tr>
      <td><span class="group-number">9</span></td>
      <td><span class="year-badge">1936</span></td>
      <td>Eurico Ferreira Sucena ... E. F. Sucena & Filhos, Lda</td>
      <td><span class="year-badge closed">1982</span></td>
      <td><span class="brand-tag">EFS</span></td>
    </tr>
    <tr class="sub-company">
      <td></td>
      <td><span class="year-badge">1962</span></td>
      <td>Distribuidora Central de Bicicletas e Acessórios E.F.S., Lda</td>
      <td><span class="year-badge closed">1991</span></td>
      <td><span class="brand-tag">EFS</span></td>
    </tr>
    <tr class="sub-company">
      <td></td>
      <td><span class="year-badge">1970</span></td>
      <td>Motobil - Metalurgia de Veículos, Lda ... EFS-Motobil - Comércio de Ciclomotores, Lda</td>
      <td><span class="year-badge closed">2009</span></td>
      <td><span class="brand-tag">EFS-MOTOBIL</span></td>
    </tr>
    <tr class="sub-company">
      <td></td>
      <td><span class="year-badge">1975</span></td>
      <td>Representações Esail, Lda</td>
      <td><span class="year-badge closed">1982</span></td>
      <td><span class="brand-tag">ESAIL</span></td>
    </tr>
    <tr class="sub-company">
      <td></td>
      <td><span class="year-badge">1977</span></td>
      <td>Andrade & Ramalho, Lda</td>
      <td><span class="year-badge closed">1984</span></td>
      <td><span class="brand-tag">ANDRAL</span></td>
    </tr>
    <tr class="sub-company">
      <td></td>
      <td><span class="year-badge">1978</span></td>
      <td>Veículos e Motores Motoesa, Lda</td>
      <td><span class="year-badge closed">1991</span></td>
      <td><span class="brand-tag">MOTOESA</span></td>
    </tr>
    <tr class="sub-company">
      <td></td>
      <td><span class="year-badge">1978</span></td>
      <td>Monteba - Motorizadas e Acessórios, Lda</td>
      <td><span class="year-badge closed">1986</span></td>
      <td><span class="brand-tag">MONTEBA</span></td>
    </tr>

    <!-- Group 10 -->
    <tr class="group-separator">
      <td colspan="5"><span class="group-title">Grupo 10 (1945 - 2005) - Encerrado</span></td>
    </tr>
    <tr>
      <td><span class="group-number">10</span></td>
      <td><span class="year-badge">1945</span></td>
      <td>Fausto de Carvalho ... Fausto de Carvalho, Lda</td>
      <td><span class="year-badge closed">2005</span></td>
      <td><span class="brand-tag">DIANA</span></td>
    </tr>
    <tr class="sub-company">
      <td></td>
      <td><span class="year-badge">1974</span></td>
      <td>Carvalhos & Andrade, Lda</td>
      <td><span class="year-badge closed">2005</span></td>
      <td><span class="brand-tag">GALOP</span></td>
    </tr>

    <!-- Group 11 -->
    <tr class="group-separator">
      <td colspan="5"><span class="group-title">Grupo 11 (1948 - 1996) - Encerrado</span></td>
    </tr>
    <tr>
      <td><span class="group-number">11</span></td>
      <td><span class="year-badge">1948</span></td>
      <td>J. Simões Costa ... S.I.S. - Veículos Motorizados, S.A.</td>
      <td><span class="year-badge closed">1996</span></td>
      <td><span class="brand-tag">SIS-SACHS</span></td>
    </tr>
    <tr class="sub-company">
      <td></td>
      <td><span class="year-badge">1978</span></td>
      <td>Motozax - Motorizadas e Acessórios, Lda</td>
      <td><span class="year-badge closed">1996</span></td>
      <td><span class="brand-tag">MOTOZAX</span></td>
    </tr>

    <!-- Group 12 -->
    <tr class="group-separator">
      <td colspan="5"><span class="group-title">Grupo 12 (1950 - Activa) - Activa</span></td>
    </tr>
    <tr>
      <td><span class="group-number">12</span></td>
      <td><span class="year-badge">1950</span></td>
      <td>Micromotor, Lda ... Micromotor, S.A.</td>
      <td><span class="year-badge active">Activa</span></td>
      <td><span class="brand-tag">MICROMOTOR</span></td>
    </tr>

    <!-- Group 13 -->
    <tr class="group-separator">
      <td colspan="5"><span class="group-title">Grupo 13 (1950 - 2018) - Encerrado</span></td>
    </tr>
    <tr>
      <td><span class="group-number">13</span></td>
      <td><span class="year-badge">1950</span></td>
      <td>Marcelino dos Santos</td>
      <td><span class="year-badge closed">1982</span></td>
      <td><span class="brand-tag">DURÁLEVE</span></td>
    </tr>
    <tr class="sub-company">
      <td></td>
      <td><span class="year-badge">1957</span></td>
      <td>Marcelino dos Santos & Companhia, Lda... Masac - Comércio e Importação de Veículos, S.A.</td>
      <td><span class="year-badge closed">2018</span></td>
      <td><span class="brand-tag">MASAC</span></td>
    </tr>
    <tr class="sub-company">
      <td></td>
      <td><span class="year-badge">1972</span></td>
      <td>Forvel - Fábrica Portuguesa de Veículos S.A.R.L</td>
      <td><span class="year-badge closed">1982</span></td>
      <td><span class="brand-tag">FORVEL</span></td>
    </tr>
    <tr class="sub-company">
      <td></td>
      <td><span class="year-badge">1973</span></td>
      <td>Renato M. Santos & Companhia, Lda</td>
      <td><span class="year-badge closed">1982</span></td>
      <td><span class="brand-tag">RENSAK</span></td>
    </tr>
    <tr class="sub-company">
      <td></td>
      <td><span class="year-badge">1988</span></td>
      <td>MSC - Sociedade de Equipamentos e Veículos, Lda ... MSC - Sociedade de Equipamentos e Veículos S.A.</td>
      <td><span class="year-badge closed">2012</span></td>
      <td><span class="brand-tag">MSC</span></td>
    </tr>

    <!-- Group 14 -->
    <tr class="group-separator">
      <td colspan="5"><span class="group-title">Grupo 14 (1950 - 2002) - Encerrado</span></td>
    </tr>
    <tr>
      <td><span class="group-number">14</span></td>
      <td><span class="year-badge">1950</span></td>
      <td>Fábrica de Produtos Metálicos, Lda ... Famel - Fábrica de Produtos Metálicos S.A.</td>
      <td><span class="year-badge closed">2002</span></td>
      <td><span class="brand-tag">FAMEL</span></td>
    </tr>
    <tr class="sub-company">
      <td></td>
      <td><span class="year-badge">1960</span></td>
      <td>Moto Famel, Lda</td>
      <td><span class="year-badge closed">1966</span></td>
      <td><span class="brand-tag">FAMEL</span></td>
    </tr>

    <!-- Group 15 -->
    <tr class="group-separator">
      <td colspan="5"><span class="group-title">Grupo 15 (1950 - 1982) - Encerrado</span></td>
    </tr>
    <tr>
      <td><span class="group-number">15</span></td>
      <td><span class="year-badge">1950</span></td>
      <td>Manuel Simões Moreira</td>
      <td><span class="year-badge closed">1978</span></td>
      <td><span class="brand-tag">VANGUARD</span></td>
    </tr>
    <tr class="sub-company">
      <td></td>
      <td><span class="year-badge">1959</span></td>
      <td>Moreira & Letra - Motorizadas, S.A.R.L.</td>
      <td><span class="year-badge closed">1982</span></td>
      <td><span class="brand-tag">VANGUARD</span></td>
    </tr>

    <!-- Group 16 -->
    <tr class="group-separator">
      <td colspan="5"><span class="group-title">Grupo 16 (1952 - 2001) - Encerrado</span></td>
    </tr>
    <tr>
      <td><span class="group-number">16</span></td>
      <td><span class="year-badge">1952</span></td>
      <td>Sociedade Ciclista do Sardão, Lda</td>
      <td><span class="year-badge closed">1954</span></td>
      <td><span class="brand-tag">CONFERSIL</span></td>
    </tr>
    <tr class="sub-company">
      <td></td>
      <td><span class="year-badge">1954</span></td>
      <td>Constantino Ferreira da Silva ... Confersil - Motorizadas e Bicicletas S.A.</td>
      <td><span class="year-badge closed">2001</span></td>
      <td><span class="brand-tag">CONFERSIL</span></td>
    </tr>

    <!-- Group 17 -->
    <tr class="group-separator">
      <td colspan="5"><span class="group-title">Grupo 17 (1954 - Activa) - Activa</span></td>
    </tr>
    <tr>
      <td><span class="group-number">17</span></td>
      <td><span class="year-badge">1954</span></td>
      <td>J. Casal ... Metalurgia Casal, S.A.</td>
      <td><span class="year-badge closed">2000</span></td>
      <td><span class="brand-tag">CASAL</span></td>
    </tr>
    <tr class="sub-company">
      <td></td>
      <td><span class="year-badge">1956</span></td>
      <td>Simões & Casal, Lda</td>
      <td><span class="year-badge closed">2008</span></td>
      <td><span class="brand-tag">TITAN</span></td>
    </tr>
    <tr class="sub-company">
      <td></td>
      <td><span class="year-badge">1960</span></td>
      <td>Casal, Irmãos & Companhia, Lda ... Moteo Portugal, S.A.</td>
      <td><span class="year-badge active">Activa</span></td>
      <td><span class="brand-tag">MOPEDE</span></td>
    </tr>

    <!-- Group 18 -->
    <tr class="group-separator">
      <td colspan="5"><span class="group-title">Grupo 18 (1955 - 1988) - Encerrado</span></td>
    </tr>
    <tr>
      <td><span class="group-number">18</span></td>
      <td><span class="year-badge">1955</span></td>
      <td>Consórcio de Indústrias Metalomecânicas Nacionais - Cinal, Lda</td>
      <td><span class="year-badge closed">1988</span></td>
      <td><span class="brand-tag">CINAL-PACHANCHO</span></td>
    </tr>
    <tr class="sub-company">
      <td></td>
      <td><span class="year-badge">1955</span></td>
      <td>Ciclo-Cinal Coimbra, Lda</td>
      <td><span class="year-badge closed">1960</span></td>
      <td><span class="brand-tag">CINAL-PACHANCHO</span></td>
    </tr>
    <tr class="sub-company">
      <td></td>
      <td><span class="year-badge">1962</span></td>
      <td>Motores Pachancho, Lda</td>
      <td><span class="year-badge closed">1972</span></td>
      <td><span class="brand-tag">PACHANCHO</span></td>
    </tr>

    <!-- Group 19 -->
    <tr class="group-separator">
      <td colspan="5"><span class="group-title">Grupo 19 (1964 - 1977) - Encerrado</span></td>
    </tr>
    <tr>
      <td><span class="group-number">19</span></td>
      <td><span class="year-badge">1964</span></td>
      <td>Sociedade Ciclomotora de Águeda, Impala, Lda</td>
      <td><span class="year-badge closed">1966</span></td>
      <td><span class="brand-tag">IMPALA</span></td>
    </tr>
    <tr class="sub-company">
      <td></td>
      <td><span class="year-badge">1966</span></td>
      <td>A. Claeys Flandria Portuguesa, Sociedade Ciclomotora, S.A.R.L... Stelber - Indústria Portuguesa de Ciclismo, S.A.</td>
      <td><span class="year-badge closed">1977</span></td>
      <td><span class="brand-tag">FLANDRIA</span></td>
    </tr>

    <!-- Group 20 -->
    <tr class="group-separator">
      <td colspan="5"><span class="group-title">Grupo 20 (1965 - 2009) - Encerrado</span></td>
    </tr>
    <tr>
      <td><span class="group-number">20</span></td>
      <td><span class="year-badge">1965</span></td>
      <td>SIRLA - Sociedade Industrial do Randam (Artigos de Ciclismo), Lda</td>
      <td><span class="year-badge closed">2009</span></td>
      <td><span class="brand-tag">SIRLA</span></td>
    </tr>

    <!-- Group 21 -->
    <tr class="group-separator">
      <td colspan="5"><span class="group-title">Grupo 21 (1968 - 2008) - Encerrado</span></td>
    </tr>
    <tr>
      <td><span class="group-number">21</span></td>
      <td><span class="year-badge">1968</span></td>
      <td>António Ferreira dos Santos ... Anfesa - Comércio de Motociclos e Acessórios, Lda</td>
      <td><span class="year-badge closed">2008</span></td>
      <td><span class="brand-tag">ANFESA</span></td>
    </tr>

    <!-- Group 22 -->
    <tr class="group-separator">
      <td colspan="5"><span class="group-title">Grupo 22 (1981 - Activa) - Activa</span></td>
    </tr>
    <tr>
      <td><span class="group-number">22</span></td>
      <td><span class="year-badge">1981</span></td>
      <td>António Joaquim da Rocha Pinto ... A.J.P. Motos S.A.</td>
      <td><span class="year-badge active">Activa</span></td>
      <td><span class="brand-tag">AJP</span></td>
    </tr>
    <tr class="sub-company">
      <td></td>
      <td><span class="year-badge">1998</span></td>
      <td>AJP Comercial - Comércio de Veículos Motorizados, Lda</td>
      <td><span class="year-badge closed">2006</span></td>
      <td><span class="brand-tag">AJP</span></td>
    </tr>

    <!-- Group 23 -->
    <tr class="group-separator">
      <td colspan="5"><span class="group-title">Grupo 23 (1987 - 2000) - Encerrado</span></td>
    </tr>
    <tr>
      <td><span class="group-number">23</span></td>
      <td><span class="year-badge">1987</span></td>
      <td>MVM - Indústria e Design de Veículos, Lda</td>
      <td><span class="year-badge closed">2000</span></td>
      <td><span class="brand-tag">MVM</span></td>
    </tr>
  `;
}

// Performance optimizations
function initializePerformanceOptimizations() {
  // Lazy load images
  if ("IntersectionObserver" in window) {
    const images = document.querySelectorAll("img[data-src]");
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }

  // Preload critical resources
  const criticalResources = ["assets/thumb_moto3.jpg"];

  criticalResources.forEach((resource) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = resource;
    document.head.appendChild(link);
  });
}

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Accessibility enhancements
function initializeAccessibility() {
  // Add focus indicators
  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      document.body.classList.add("keyboard-navigation");
    }
  });

  document.addEventListener("mousedown", () => {
    document.body.classList.remove("keyboard-navigation");
  });

  // Add aria labels where missing
  const buttons = document.querySelectorAll("button:not([aria-label])");
  buttons.forEach((button) => {
    if (!button.getAttribute("aria-label")) {
      const text = button.textContent.trim();
      if (text) {
        button.setAttribute("aria-label", text);
      }
    }
  });
}

// Initialize accessibility on load
document.addEventListener("DOMContentLoaded", initializeAccessibility);

// Error handling
window.addEventListener("error", (e) => {
  console.error("JavaScript error:", e.error);

  // Optional: Send error to analytics
  if (typeof gtag !== "undefined") {
    gtag("event", "exception", {
      description: e.error.toString(),
      fatal: false,
    });
  }
});

// Service worker registration for offline functionality (optional)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

// Enhanced Footer JavaScript
document.addEventListener("DOMContentLoaded", function () {
  initializeFooterAnimations();
  initializeFooterInteractions();
});

// Initialize footer animations
function initializeFooterAnimations() {
  // Animate footer elements on scroll
  const footerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  const footerElements = document.querySelectorAll(
    ".footer-brand, .footer-navigation, .footer-contact"
  );

  footerElements.forEach((element) => {
    footerObserver.observe(element);
  });
}

// Initialize footer interactions
function initializeFooterInteractions() {
  // Enhanced social link interactions
  const socialLinks = document.querySelectorAll(".social-link");

  socialLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      // Add pulse effect
      this.style.animation = "socialPulse 0.6s ease-in-out";
    });

    link.addEventListener("mouseleave", function () {
      this.style.animation = "";
    });

    // Track social media clicks
    link.addEventListener("click", function (e) {
      const platform = this.getAttribute("aria-label");
      console.log(`Social media click: ${platform}`);

      // Analytics tracking
      if (typeof gtag !== "undefined") {
        gtag("event", "social_click", {
          event_category: "social_media",
          event_label: platform,
        });
      }
    });
  });

  // Enhanced navigation link interactions
  const footerNavLinks = document.querySelectorAll(".nav-links-column a");

  footerNavLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const linkText = this.textContent.trim();
      console.log(`Footer navigation click: ${linkText}`);

      // Analytics tracking
      if (typeof gtag !== "undefined") {
        gtag("event", "footer_navigation", {
          event_category: "navigation",
          event_label: linkText,
        });
      }
    });
  });

  // Contact link interactions
  const contactLinks = document.querySelectorAll(".contact-link");

  contactLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const contactType = this.href.includes("mailto") ? "email" : "phone";
      console.log(`Contact link clicked: ${contactType}`);

      // Analytics tracking
      if (typeof gtag !== "undefined") {
        gtag("event", "contact_click", {
          event_category: "contact",
          event_label: contactType,
        });
      }
    });
  });
}

// Add social pulse animation CSS
const socialAnimationCSS = `
  @keyframes socialPulse {
    0% { transform: translateY(-5px) scale(1.05); }
    50% { transform: translateY(-7px) scale(1.1); }
    100% { transform: translateY(-5px) scale(1.05); }
  }
  
  .footer .animate-in {
    animation: fadeInUp 0.8s ease-out forwards;
  }
`;

// Add the animation styles
if (!document.querySelector("#social-animation-styles")) {
  const styleSheet = document.createElement("style");
  styleSheet.id = "social-animation-styles";
  styleSheet.textContent = socialAnimationCSS;
  document.head.appendChild(styleSheet);
}


// Simple Mobile Menu Fix
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", function () {
      // Toggle the active class
      navMenu.classList.toggle("active");
      hamburger.classList.toggle("active");
      
      // Prevent body scroll when menu is open
      if (navMenu.classList.contains("active")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll(".nav-menu a");
    navLinks.forEach(link => {
      link.addEventListener("click", function () {
        navMenu.classList.remove("active");
        hamburger.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  }
});

