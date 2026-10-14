import './style.css';
import { profile, links } from './config.js';

const SVG_NS = 'http://www.w3.org/2000/svg';

const ICONS = {
  crown:
    '<path d="M3 8.5l4.2 3.4L12 5l4.8 6.9L21 8.5l-1.7 9.2a1.5 1.5 0 0 1-1.5 1.3H6.2a1.5 1.5 0 0 1-1.5-1.3L3 8.5z" fill="currentColor"/>' +
    '<circle cx="12" cy="14.5" r="1.6" fill="var(--icon-accent, #fff)" opacity=".85"/>',
  lock:
    '<rect x="4.5" y="10.5" width="15" height="10" rx="3" fill="currentColor"/>' +
    '<path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>' +
    '<path d="M12 18.3l-2.3-2.2a1.35 1.35 0 0 1 2.3-1.1 1.35 1.35 0 0 1 2.3 1.1L12 18.3z" fill="var(--icon-accent, #fff)"/>',
  telegram:
    '<path d="M20.7 4.3L2.9 11.2c-1.2.5-1.2 1.2-.2 1.5l4.6 1.4 1.7 5.3c.2.6.4.8.8.8s.6-.2.9-.5l2.3-2.2 4.7 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.3-.5-1.8-1.3-1.5zM8.6 13.7l9.3-5.9c.4-.3.9-.1.5.3l-7.8 7-.3 3.3-1.7-4.7z" fill="currentColor"/>',
  arrow:
    '<path d="M9 5.5l6.5 6.5L9 18.5" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
};

function svg(name, className) {
  const el = document.createElementNS(SVG_NS, 'svg');
  el.setAttribute('viewBox', '0 0 24 24');
  el.setAttribute('aria-hidden', 'true');
  el.setAttribute('focusable', 'false');
  el.setAttribute('class', className);
  el.innerHTML = ICONS[name] || '';
  return el;
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

// ---------- Avatar (foto com fallback para iniciais) ----------
function renderAvatar() {
  const avatar = document.getElementById('avatar');
  const fallback = el('span', 'avatar__initials', profile.initials);
  fallback.setAttribute('aria-hidden', 'true');
  avatar.append(fallback);
  avatar.setAttribute('role', 'img');
  avatar.setAttribute('aria-label', profile.photoAlt);

  if (!profile.photo) return;

  const img = new Image();
  img.className = 'avatar__img';
  img.alt = profile.photoAlt;
  img.decoding = 'async';
  img.width = 220;
  img.height = 220;
  img.addEventListener('load', () => {
    avatar.removeAttribute('role');
    avatar.removeAttribute('aria-label');
    avatar.classList.add('has-photo');
  });
  img.addEventListener('error', () => img.remove());
  img.src = profile.photo;
  avatar.append(img);
}

// ---------- Nome, selo e status ----------
function renderIdentity() {
  document.getElementById('name').textContent = profile.name;

  const badge = document.getElementById('badge');
  if (profile.showBadge) {
    badge.removeAttribute('hidden');
    badge.setAttribute('aria-label', profile.badgeLabel);
    badge.title = profile.badgeLabel;
  } else {
    badge.remove();
  }

  const status = document.getElementById('status');
  status.classList.toggle('is-online', profile.isOnline);
  status.querySelector('.status__text').textContent = profile.isOnline
    ? profile.onlineText
    : profile.offlineText;

  document.getElementById('headline').textContent = profile.headline;
  document.getElementById('subheadline').textContent = profile.subheadline;
}

// ---------- Botões ----------
function renderLinks() {
  const list = document.getElementById('links');
  links.forEach((link, i) => {
    const li = el('li', 'links__item');
    li.style.setProperty('--i', i);

    const a = el('a', `link-btn link-btn--${link.variant}`);
    a.href = link.url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';

    const icon = el('span', 'link-btn__icon');
    icon.append(svg(link.icon, 'link-btn__svg'));

    const text = el('span', 'link-btn__text');
    text.append(el('span', 'link-btn__title', link.title));
    text.append(el('span', 'link-btn__subtitle', link.subtitle));

    const sr = el('span', 'sr-only', ' (abre em nova aba)');
    text.append(sr);

    a.append(icon, text, svg('arrow', 'link-btn__arrow'));
    li.append(a);
    list.append(li);
  });
}

renderAvatar();
renderIdentity();
renderLinks();
document.getElementById('year').textContent = new Date().getFullYear();
document.documentElement.classList.add('is-ready');
