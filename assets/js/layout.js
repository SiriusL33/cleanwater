(() => {
    'use strict';

    async function injectPartial(selector, partialPath) {
        const container = document.querySelector(selector);
        if (!container) return null;

        const response = await fetch(partialPath);
        if (!response.ok) {
            throw new Error(`Partial konnte nicht geladen werden: ${partialPath}`);
        }

        const markup = await response.text();
        container.outerHTML = markup;
        return true;
    }

    function markActivePage() {
        const activePage = document.body.dataset.page;
        if (!activePage) return;

        document.querySelectorAll('[data-page]').forEach((link) => {
            if (link.dataset.page === activePage) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    function applyHeaderVariant() {
        const header = document.getElementById('siteHeader');
        if (!header) return;

        const variant = document.body.dataset.headerVariant;
        if (variant === 'compact') {
            header.classList.add('compact');
        }
    }

    async function initLayout() {
        try {
            await injectPartial('#site-header-container', 'assets/partials/header.html');
            await injectPartial('#site-footer-container', 'assets/partials/footer.html');
            applyHeaderVariant();
            markActivePage();
            document.dispatchEvent(new CustomEvent('layout:ready'));
        } catch (error) {
            console.error(error);
        }
    }

    initLayout();
})();

(() => {
    'use strict';

    async function injectPartial(selector, partialPath) {
        const container = document.querySelector(selector);
        if (!container) return null;

        const response = await fetch(partialPath);
        if (!response.ok) {
            throw new Error(`Partial konnte nicht geladen werden: ${partialPath}`);
        }

        const markup = await response.text();
        container.outerHTML = markup;
        return true;
    }

    function markActivePage() {
        const activePage = document.body.dataset.page;
        if (!activePage) return;

        document.querySelectorAll('[data-page]').forEach((link) => {
            if (link.dataset.page === activePage) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    function applyHeaderVariant() {
        const header = document.getElementById('siteHeader');
        if (!header) return;

        const variant = document.body.dataset.headerVariant;
        if (variant === 'compact') {
            header.classList.add('compact');
        }
    }

    async function initLayout() {
        try {
            await injectPartial('#site-header-container', 'assets/partials/header.html');
            await injectPartial('#site-footer-container', 'assets/partials/footer.html');
            applyHeaderVariant();
            markActivePage();
            document.dispatchEvent(new CustomEvent('layout:ready'));
        } catch (error) {
            console.error(error);
        }
    }

    initLayout();
})();
