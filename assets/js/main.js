// Sirius Change: Skript in ein IIFE gekapselt, damit keine unbeabsichtigten Globals entstehen.
(() => {
    'use strict';

    const galleryImages = [
        {
            src: 'https://agi-prod-file-upload-public-main-use1.s3.amazonaws.com/b9272b1e-2318-4501-9ec0-475224e6b43b',
            alt: 'Detailansicht des Saugschlauchanschlusses'
        },
        {
            src: 'https://agi-prod-file-upload-public-main-use1.s3.amazonaws.com/2b74c82c-32e0-47a4-a7ea-4410d0836fef',
            alt: 'Vorlauf-Anschlussstück des Cleanwater-Systems'
        },
        {
            src: 'https://agi-prod-file-upload-public-main-use1.s3.amazonaws.com/e39cfa5b-2c43-4bf5-91b8-db3c38c20fd7',
            alt: 'Filter- und Reaktoreingang des Cleanwater-Systems'
        }
    ];

    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const galleryItems = document.querySelectorAll('[data-gallery-index]');
    const header = document.querySelector('header');

    if (!lightbox || !lightboxImage || !lightboxClose || !lightboxPrev || !lightboxNext || !header || galleryItems.length === 0) {
        console.error('Cleanwater UI konnte nicht initialisiert werden: benötigte DOM-Elemente fehlen.');
        return;
    }

    let currentImageIndex = 0;
    let lastFocusedElement = null;
    let ticking = false;

    const focusableSelector = 'button, [href], [tabindex]:not([tabindex="-1"])';

    function renderLightboxImage(index) {
        const imageData = galleryImages[index];
        if (!imageData) {
            console.error(`Ungültiger Galerieindex: ${index}`);
            return;
        }
        lightboxImage.src = imageData.src;
        lightboxImage.alt = imageData.alt;
    }

    function trapFocus(event) {
        if (event.key !== 'Tab') return;

        const focusableElements = Array.from(lightbox.querySelectorAll(focusableSelector));
        if (focusableElements.length === 0) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }

    function openLightbox(index) {
        currentImageIndex = Number(index);
        renderLightboxImage(currentImageIndex);
        lastFocusedElement = document.activeElement;
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        lightboxClose.focus();
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
        if (lastFocusedElement instanceof HTMLElement) {
            lastFocusedElement.focus();
        }
    }

    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        renderLightboxImage(currentImageIndex);
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        renderLightboxImage(currentImageIndex);
    }

    function onScroll() {
        if (ticking) return;

        ticking = true;
        requestAnimationFrame(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            header.classList.toggle('visible', scrollTop > 300);
            ticking = false;
        });
    }

    galleryItems.forEach((item) => {
        item.addEventListener('click', () => {
            try {
                openLightbox(item.dataset.galleryIndex);
            } catch (error) {
                console.error('Galerie konnte nicht geöffnet werden.', error);
            }
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);

    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (!lightbox.classList.contains('active')) {
            return;
        }

        trapFocus(event);
        if (event.key === 'ArrowLeft') prevImage();
        if (event.key === 'ArrowRight') nextImage();
        if (event.key === 'Escape') closeLightbox();
    });

    window.addEventListener('scroll', onScroll, { passive: true });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const targetSelector = anchor.getAttribute('href');
            if (!targetSelector || targetSelector === '#') {
                return;
            }

            const target = document.querySelector(targetSelector);
            if (!target) {
                console.warn(`Scroll-Ziel nicht gefunden: ${targetSelector}`);
                return;
            }

            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
})();
