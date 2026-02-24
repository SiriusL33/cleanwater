// Sirius Change: Skripte ausgelagert, damit Funktionen modular gepflegt werden können ohne Verhaltensänderung.
        const galleryImages = [
            'https://agi-prod-file-upload-public-main-use1.s3.amazonaws.com/b9272b1e-2318-4501-9ec0-475224e6b43b',
            'https://agi-prod-file-upload-public-main-use1.s3.amazonaws.com/2b74c82c-32e0-47a4-a7ea-4410d0836fef',
            'https://agi-prod-file-upload-public-main-use1.s3.amazonaws.com/e39cfa5b-2c43-4bf5-91b8-db3c38c20fd7'
        ];
        let currentImageIndex = 0;

        function openLightbox(index) {
            currentImageIndex = index;
            const lightbox = document.getElementById('lightbox');
            const lightboxImage = document.getElementById('lightboxImage');
            lightboxImage.src = galleryImages[index];
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            const lightbox = document.getElementById('lightbox');
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        function prevImage() {
            currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
            document.getElementById('lightboxImage').src = galleryImages[currentImageIndex];
        }

        function nextImage() {
            currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
            document.getElementById('lightboxImage').src = galleryImages[currentImageIndex];
        }

        // Keyboard navigation for lightbox
        document.addEventListener('keydown', (e) => {
            if (document.getElementById('lightbox').classList.contains('active')) {
                if (e.key === 'ArrowLeft') prevImage();
                if (e.key === 'ArrowRight') nextImage();
                if (e.key === 'Escape') closeLightbox();
            }
        });

        // Dynamic navbar visibility on scroll
        const header = document.querySelector('header');
        let lastScrollTop = 0;

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 300) {
                header.classList.add('visible');
            } else {
                header.classList.remove('visible');
            }
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    
