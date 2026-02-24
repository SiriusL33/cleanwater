#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const vm = require('vm');

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

class ClassList {
  constructor() { this.set = new Set(); }
  add(c) { this.set.add(c); }
  remove(c) { this.set.delete(c); }
  toggle(c, force) {
    if (force === undefined) {
      if (this.set.has(c)) { this.set.delete(c); return false; }
      this.set.add(c); return true;
    }
    if (force) this.set.add(c); else this.set.delete(c);
    return !!force;
  }
  contains(c) { return this.set.has(c); }
}

class Element {
  constructor({ id = '', href = '', dataset = {}, role = '' } = {}) {
    this.id = id;
    this.href = href;
    this.dataset = dataset;
    this.role = role;
    this.attributes = {};
    this.listeners = {};
    this.classList = new ClassList();
    this.style = {};
    this.focused = false;
    this.textContent = '';
  }
  setAttribute(k, v) { this.attributes[k] = String(v); }
  getAttribute(k) {
    if (k === 'href') return this.href;
    return this.attributes[k] ?? null;
  }
  addEventListener(type, cb) { (this.listeners[type] ||= []).push(cb); }
  dispatchEvent(type, event = {}) { (this.listeners[type] || []).forEach((cb) => cb(event)); }
  click() { this.dispatchEvent('click', { target: this, preventDefault() {} }); }
  focus() { this.focused = true; document.activeElement = this; }
  querySelectorAll(selector) {
    if (selector.includes('button') || selector.includes('[href]')) return [lightboxClose, lightboxPrev, lightboxNext];
    return [];
  }
}

const header = new Element({ id: 'siteHeader' });
const lightbox = new Element({ id: 'lightbox', role: 'dialog' });
const lightboxImage = new Element({ id: 'lightboxImage' });
const lightboxTitle = new Element({ id: 'lightboxTitle' });
const lightboxClose = new Element({ id: 'lightboxClose' });
const lightboxPrev = new Element({ id: 'lightboxPrev' });
const lightboxNext = new Element({ id: 'lightboxNext' });
const galleryItems = Array.from({ length: 6 }, (_, i) => new Element({ dataset: { galleryIndex: String(i) } }));
const anchor = new Element({ href: '#vorteile' });
const target = new Element({ id: 'vorteile' });

target.scrollIntoView = () => { target.scrolled = true; };

const documentListeners = {};
const document = {
  body: { style: {} },
  activeElement: null,
  documentElement: { scrollTop: 0 },
  getElementById(id) {
    return { lightbox, lightboxImage, lightboxTitle, lightboxClose, lightboxPrev, lightboxNext, siteHeader: header }[id] || null;
  },
  querySelector(selector) {
    if (selector === '#vorteile') return target;
    return null;
  },
  querySelectorAll(selector) {
    if (selector === '[data-gallery-index]') return galleryItems;
    if (selector === 'a[href^="#"]') return [anchor];
    return [];
  },
  addEventListener(type, cb) { (documentListeners[type] ||= []).push(cb); }
};

const windowObj = {
  pageYOffset: 0,
  addEventListener() {}
};

Object.assign(global, { document, window: windowObj, HTMLElement: Element, console });

const mainJs = fs.readFileSync(path.join(__dirname, '..', 'assets/js/main.js'), 'utf8');
vm.runInThisContext(mainJs);

anchor.click();
assert(target.scrolled === true, 'Anchor-Scroll zu #vorteile fehlgeschlagen.');

galleryItems[0].click();
assert(lightbox.classList.contains('active'), 'Lightbox öffnet nicht.');
assert(lightboxTitle.textContent.length > 0, 'Lightbox-Titel wurde nicht gesetzt.');
const firstSrc = lightboxImage.src;
lightboxNext.click();
assert(lightboxImage.src === firstSrc, 'Placeholder-Src sollte gleich bleiben.');
assert(lightboxTitle.textContent !== '', 'Titel nach Weiter-Navigation fehlt.');
(documentListeners.keydown || []).forEach((cb) => cb({ key: 'Escape' }));
assert(!lightbox.classList.contains('active'), 'Lightbox schließt nicht per Escape.');

for (const page of ['index.html', 'downloads.html']) {
  const html = fs.readFileSync(path.join(__dirname, '..', page), 'utf8');
  const hrefs = [...html.matchAll(/<a[^>]*class="download-btn"[^>]*>/g)]
    .map((m) => (m[0].match(/href="([^"]+)"/) || [])[1])
    .filter(Boolean);
  for (const href of hrefs) {
    const filePath = path.join(__dirname, '..', href);
    assert(fs.existsSync(filePath), `Download-Datei fehlt (${page}): ${href}`);
  }
}

console.log('Regression Check erfolgreich: 0 Fehler.');
