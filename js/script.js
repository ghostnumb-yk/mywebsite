// Set Current Year in Footer
document.getElementById('current-year').innerText = new Date().getFullYear();

// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
const mobileLinks = document.querySelectorAll('.mobile-menu a');
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
  });
});

// Active Navigation Link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');
const mobileNavLinks = document.querySelectorAll('.mobile-menu a');

function setActiveLink() {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.scrollY >= (sectionTop - 300)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
  
  mobileNavLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Animate Skill Bars when in viewport
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-level');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const level = entry.target.getAttribute('data-level');
        entry.target.style.width = `${level}%`;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  skillBars.forEach(bar => {
    observer.observe(bar);
  });
}

// Animate elements when they come into view
function initAnimations() {
  const fadeElements = document.querySelectorAll('.about-content, .skills-grid, .projects-grid, .certifications-container, .contact-content');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  fadeElements.forEach(element => {
    observer.observe(element);
  });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
  animateSkillBars();
  initAnimations();
});

// Add fade-in animation CSS
const style = document.createElement('style');
style.textContent = `
  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeIn 1s forwards;
  }
  
  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .about-content, .skills-grid, .projects-grid, .certifications-container, .contact-content {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 1s, transform 1s;
  }
  
  .about-content.fade-in, .skills-grid.fade-in, .projects-grid.fade-in, .certifications-container.fade-in, .contact-content.fade-in {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);