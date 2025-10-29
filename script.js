// ===== Subtle Particle Background =====
class ParticleBackground {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 60;
        this.connectionDistance = 150;

        this.resize();
        this.init();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                radius: Math.random() * 2 + 1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach((particle, i) => {
            // Move particle
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            this.ctx.fill();

            // Draw connections
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[j].x - particle.x;
                const dy = this.particles[j].y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.connectionDistance) {
                    const opacity = (1 - distance / this.connectionDistance) * 0.15;
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

// ===== Navigation =====
class Navigation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');

        this.init();
    }

    init() {
        // Scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        this.hamburger.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.navMenu.classList.toggle('active');
        });

        // Smooth scroll and close mobile menu
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }

                // Close mobile menu
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target)) {
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
            }
        });
    }
}

// ===== Scroll Animations =====
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('[data-aos]');
        this.init();
    }

    init() {
        this.observeElements();
        window.addEventListener('scroll', () => this.checkVisibility());
        this.checkVisibility(); // Check on load
    }

    observeElements() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-delay') || 0;
                    setTimeout(() => {
                        entry.target.style.animationDelay = `${delay}ms`;
                        entry.target.classList.add('aos-animate');
                    }, delay);
                }
            });
        }, options);

        this.elements.forEach(el => observer.observe(el));
    }

    checkVisibility() {
        const windowHeight = window.innerHeight;

        this.elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }
}

// ===== Counter Animation =====
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.stat-number');
        this.animated = false;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.animateCounters());
    }

    animateCounters() {
        if (this.animated) return;

        const heroStats = document.querySelector('.hero-stats');
        if (!heroStats) return;

        const statsTop = heroStats.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (statsTop < windowHeight - 100) {
            this.animated = true;
            this.counters.forEach(counter => {
                const text = counter.innerText;
                if (!isNaN(parseFloat(text))) {
                    this.animateNumber(counter, parseFloat(text));
                }
            });
        }
    }

    animateNumber(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.innerText = Math.round(target) + 'm';
                clearInterval(timer);
            } else {
                element.innerText = Math.round(current) + 'm';
            }
        }, 30);
    }
}

// ===== Smooth Reveal on Scroll =====
class SmoothReveal {
    constructor() {
        this.revealElements = document.querySelectorAll('.problem-card, .feature-card, .tech-category, .impact-area, .team-card');
        this.init();
    }

    init() {
        const options = {
            threshold: 0.15,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-delay') || 0;
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);
                }
            });
        }, options);

        this.revealElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(el);
        });
    }
}

// ===== Parallax Effect =====
class ParallaxEffect {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.hero-content');

            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
}

// ===== Aggressive Card Effects =====
class CardTilt {
    constructor() {
        this.cards = document.querySelectorAll('.problem-card, .feature-card, .team-card');
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', () => this.handleMouseEnter(card));
            card.addEventListener('mouseleave', () => this.handleMouseLeave(card));
        });
    }

    handleMouseEnter(card) {
        card.style.transform = 'translateX(10px) scale(1.02)';
        card.style.transition = 'all 0.1s ease';
    }

    handleMouseLeave(card) {
        card.style.transform = 'translateX(0) scale(1)';
    }
}

// ===== Subtle Text Highlight =====
class SubtleHighlight {
    constructor() {
        // Subtle professional effect - no implementation needed
    }
}

// ===== Gradient Animation =====
class GradientAnimation {
    constructor() {
        this.gradientElements = document.querySelectorAll('.gradient-text');
        this.init();
    }

    init() {
        this.gradientElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.backgroundSize = '200% 200%';
            });
        });
    }
}

// ===== Button Ripple Effect =====
class RippleEffect {
    constructor() {
        this.buttons = document.querySelectorAll('.btn');
        this.init();
    }

    init() {
        this.buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const rect = button.getBoundingClientRect();
                const ripple = document.createElement('span');
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');

                const existingRipple = button.querySelector('.ripple');
                if (existingRipple) {
                    existingRipple.remove();
                }

                button.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        });
    }
}

// ===== Active Section Highlighting =====
class ActiveSectionHighlight {
    constructor() {
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            let current = '';

            this.sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            this.navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }
}

// ===== Loading Animation =====
class LoadingAnimation {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');

            // Trigger initial animations
            setTimeout(() => {
                const heroElements = document.querySelectorAll('.hero-content > *');
                heroElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.style.opacity = '1';
                        el.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }, 100);
        });
    }
}

// ===== Image Lazy Loading =====
class LazyLoadImages {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        this.init();
    }

    init() {
        const options = {
            threshold: 0,
            rootMargin: '0px 0px 200px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        }, options);

        this.images.forEach(img => observer.observe(img));
    }
}

// ===== Performance Optimization =====
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        // Debounce scroll events
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }

            scrollTimeout = window.requestAnimationFrame(() => {
                this.handleScroll();
            });
        });
    }

    handleScroll() {
        // Add any scroll-dependent logic here
    }
}

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle background
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        new ParticleBackground(canvas);
    }

    // Initialize all features
    new Navigation();
    new ScrollAnimations();
    new SmoothReveal();
    new ParallaxEffect();
    new CardTilt();
    new GradientAnimation();
    new RippleEffect();
    new ActiveSectionHighlight();
    new LoadingAnimation();
    new LazyLoadImages();
    new PerformanceOptimizer();

    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Cursor effect disabled for professional appearance
    // createCursorFollower();
});

// ===== Tactical Crosshair Cursor =====
function createCursorFollower() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-follower';
    cursor.style.cssText = `
        position: fixed;
        width: 30px;
        height: 30px;
        border: 2px solid rgba(255, 0, 51, 0.6);
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        display: none;
        mix-blend-mode: difference;
    `;

    // Add crosshair lines
    cursor.innerHTML = `
        <div style="position: absolute; width: 2px; height: 100%; background: rgba(255, 0, 51, 0.6); left: 50%; transform: translateX(-50%);"></div>
        <div style="position: absolute; height: 2px; width: 100%; background: rgba(255, 0, 51, 0.6); top: 50%; transform: translateY(-50%);"></div>
    `;

    document.body.appendChild(cursor);

    // Only show on desktop
    if (window.innerWidth > 768) {
        cursor.style.display = 'block';

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 15 + 'px';
            cursor.style.top = e.clientY - 15 + 'px';
        });

        // Scale up on interactive elements
        document.querySelectorAll('a, button, .btn').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.borderColor = 'rgba(0, 255, 65, 0.8)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.borderColor = 'rgba(255, 0, 51, 0.6)';
            });
        });
    }
}

// ===== Easter Egg: Konami Code =====
(function() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateEasterEgg() {
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
})();

// ===== Print Console Message =====
console.log('%c RAVEN Project ', 'background: #002244; color: white; font-size: 18px; padding: 10px 20px; font-weight: bold;');
console.log('%c GPS-Independent Autonomous Navigation System ', 'color: #0066cc; font-size: 14px; font-weight: bold;');
console.log('%c Developed by TED University Computer Engineering Students ', 'color: #666; font-size: 12px;');
