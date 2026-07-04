/* ============================================
   SUMAN MOOND — PORTFOLIO SCRIPTS
   Typed effect, scroll reveals, navbar, etc.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ─── Typed Text Effect ──────────────────────────────────
    const typedEl = document.getElementById('typed-text');
    const phrases = [
        'M.Tech CSE @ IIIT Delhi',
        'Competitive Programmer',
        'Full-Stack Developer',
        'ML & Cryptography Enthusiast',
        'Teaching Assistant',
    ];
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    const typeSpeed = 60;
    const deleteSpeed = 35;
    const pauseEnd = 1800;
    const pauseStart = 400;

    function typeWriter() {
        const current = phrases[phraseIdx];

        if (!isDeleting) {
            typedEl.textContent = current.substring(0, charIdx + 1);
            charIdx++;
            if (charIdx === current.length) {
                isDeleting = true;
                setTimeout(typeWriter, pauseEnd);
                return;
            }
            setTimeout(typeWriter, typeSpeed);
        } else {
            typedEl.textContent = current.substring(0, charIdx - 1);
            charIdx--;
            if (charIdx === 0) {
                isDeleting = false;
                phraseIdx = (phraseIdx + 1) % phrases.length;
                setTimeout(typeWriter, pauseStart);
                return;
            }
            setTimeout(typeWriter, deleteSpeed);
        }
    }

    setTimeout(typeWriter, 1200);

    // ─── Navbar Scroll Effect ───────────────────────────────
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        lastScroll = scrollY;
    }, { passive: true });

    // ─── Mobile Menu Toggle ─────────────────────────────────
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ─── Active Nav Link on Scroll ──────────────────────────
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function highlightNav() {
        const scrollY = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${id}"]`);
            if (link) {
                if (scrollY >= top && scrollY < top + height) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNav, { passive: true });
    highlightNav();

    // ─── Scroll Reveal (Intersection Observer) ──────────────
    const revealEls = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(el => revealObserver.observe(el));

    // ─── Contact Form (Frontend Only) ───────────────────────
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.form-submit');
            const originalText = btn.textContent;
            btn.textContent = '✓  Message Sent!';
            btn.style.background = 'linear-gradient(135deg, #00e676, #00b0ff)';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                form.reset();
            }, 2500);
        });
    }

    // ─── Smooth Scroll for Anchor Links ─────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ─── Parallax Blobs on Mouse Move ───────────────────────
    const blobs = document.querySelectorAll('.blob');
    let mouseX = 0, mouseY = 0, currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    function animateBlobs() {
        currentX += (mouseX - currentX) * 0.03;
        currentY += (mouseY - currentY) * 0.03;

        blobs.forEach((blob, i) => {
            const factor = (i + 1) * 12;
            blob.style.transform = `translate(${currentX * factor}px, ${currentY * factor}px)`;
        });

        requestAnimationFrame(animateBlobs);
    }

    animateBlobs();
});
