// Sirius Change: UI-Skript modularisiert und auf Lightbox-Titel + dynamischen Header erweitert.
(() => {
    'use strict';

    const galleryImages = [
        { src: 'assets/img/Platzhalter.png', alt: 'Cleanwater Gerät – Frontansicht', title: 'Frontansicht · Systemkörper' },
        { src: 'assets/img/Platzhalter.png', alt: 'Cleanwater Gerät – Seitenansicht', title: 'Seitenansicht · Anschlusszone' },
        { src: 'assets/img/Platzhalter.png', alt: 'Cleanwater Gerät – Detailpanel', title: 'Detailpanel · Bedienbereich' },
        { src: 'assets/img/Platzhalter.png', alt: 'Installationsumgebung – Technikbereich', title: 'Installationsumgebung · Technikbereich' },
        { src: 'assets/img/Platzhalter.png', alt: 'Rohrleitungsanschluss – Nahaufnahme', title: 'Anschlussdetail · Leitungsführung' },
        { src: 'assets/img/Platzhalter.png', alt: 'Systemansicht im Praxisbetrieb', title: 'Praxisbetrieb · Systemintegration' }
    ];

    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const galleryItems = document.querySelectorAll('[data-gallery-index]');
    const header = document.getElementById('siteHeader');

    let currentImageIndex = 0;
    let lastFocusedElement = null;

    const focusableSelector = 'button, [href], [tabindex]:not([tabindex="-1"])';

    function renderLightboxImage(index) {
        const imageData = galleryImages[index];
        if (!imageData || !lightboxImage || !lightboxTitle) {
            return;
        }

        lightboxImage.src = imageData.src;
        lightboxImage.alt = imageData.alt;
        lightboxTitle.textContent = imageData.title;
    }

    function trapFocus(event) {
        if (!lightbox || event.key !== 'Tab') return;

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
        if (!lightbox || !lightboxClose) return;
        currentImageIndex = Number(index);
        renderLightboxImage(currentImageIndex);
        lastFocusedElement = document.activeElement;
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        lightboxClose.focus();
    }

    function closeLightbox() {
        if (!lightbox) return;
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
        if (!header) return;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        header.classList.toggle('is-scrolled', scrollTop > 60);
    }

    if (lightbox && lightboxImage && lightboxTitle && lightboxClose && lightboxPrev && lightboxNext && galleryItems.length > 0) {
        galleryItems.forEach((item) => {
            item.addEventListener('click', () => openLightbox(item.dataset.galleryIndex));
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
            if (!lightbox.classList.contains('active')) return;
            trapFocus(event);
            if (event.key === 'ArrowLeft') prevImage();
            if (event.key === 'ArrowRight') nextImage();
            if (event.key === 'Escape') closeLightbox();
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            const targetSelector = anchor.getAttribute('href');
            if (!targetSelector || targetSelector === '#') return;

            const target = document.querySelector(targetSelector);
            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
})();
