// Sirius Change: Skript in ein IIFE gekapselt, damit keine unbeabsichtigten Globals entstehen.
(() => {
    const galleryImages = [
        'https://agi-prod-file-upload-public-main-use1.s3.amazonaws.com/b9272b1e-2318-4501-9ec0-475224e6b43b',
        'https://agi-prod-file-upload-public-main-use1.s3.amazonaws.com/2b74c82c-32e0-47a4-a7ea-4410d0836fef',
        'https://agi-prod-file-upload-public-main-use1.s3.amazonaws.com/e39cfa5b-2c43-4bf5-91b8-db3c38c20fd7'
    ];

    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const galleryItems = document.querySelectorAll('[data-gallery-index]');
    const header = document.querySelector('header');
    let currentImageIndex = 0;

    function openLightbox(index) {
        currentImageIndex = index;
        lightboxImage.src = galleryImages[index];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        lightboxImage.src = galleryImages[currentImageIndex];
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        lightboxImage.src = galleryImages[currentImageIndex];
    }

    galleryItems.forEach((item) => {
        item.addEventListener('click', () => {
            openLightbox(Number(item.dataset.galleryIndex));
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);

    document.addEventListener('keydown', (event) => {
        if (!lightbox.classList.contains('active')) {
            return;
        }

        if (event.key === 'ArrowLeft') prevImage();
        if (event.key === 'ArrowRight') nextImage();
        if (event.key === 'Escape') closeLightbox();
    });

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 300) {
            header.classList.add('visible');
        } else {
            header.classList.remove('visible');
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            event.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
})();
