// Starts the site: language, rendering, countdown, menu and scroll animation.
import '@fontsource/manrope/300.css'
import '@fontsource/manrope/400.css'
import '@fontsource/manrope/500.css'
import '@fontsource/manrope/700.css'
import '@fontsource/instrument-serif/400-italic.css'
import '@fontsource/ibm-plex-sans-arabic/300.css'
import '@fontsource/ibm-plex-sans-arabic/400.css'
import '@fontsource/ibm-plex-sans-arabic/500.css'
import '@fontsource/ibm-plex-sans-arabic/700.css'
import './index.css'
import { content, eventStart } from './content.js'
import { renderPage, renderGuidePage } from './render.js'

const root = document.getElementById('root')

// Language: ?lang=ar wins, then the saved choice, then English.
function startLang() {
  try {
    const q = new URLSearchParams(location.search).get('lang')
    if (q === 'ar' || q === 'en') return q
    const s = localStorage.getItem('lang')
    if (s === 'ar' || s === 'en') return s
  } catch { /* storage blocked */ }
  return 'en'
}
let lang = startLang()

// Scroll animation: fade and rise once (CSS removes it for reduced motion).
const io = 'IntersectionObserver' in window
  ? new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) } }), { threshold: 0.12 })
  : null

// Countdown: updates only the numbers, once per second.
function tick() {
  const ms = new Date(eventStart).getTime() - Date.now()
  const box = document.getElementById('countdown')
  if (!box) return
  if (ms <= 0) { box.outerHTML = `<p class="em text-center text-5xl md:text-7xl">${content[lang].countdown.done}</p>`; return }
  const s = Math.floor(ms / 1000)
  const v = { days: Math.floor(s / 86400), hours: Math.floor(s / 3600) % 24, minutes: Math.floor(s / 60) % 60, seconds: s % 60 }
  box.querySelectorAll('[data-unit]').forEach((el) => { el.textContent = String(v[el.dataset.unit]).padStart(2, '0') })
}

// Page: #/guide shows the guide on its own, anything else shows the home page.
const pageNow = () => (location.hash === '#/guide' ? 'guide' : 'home')
let page = pageNow()

// Draws the current page in the current language.
function render() {
  const t = content[lang]
  const html = document.documentElement
  html.lang = lang
  html.dir = lang === 'ar' ? 'rtl' : 'ltr'
  const guideLabel = t.nav.links.find((l) => l.id === 'guide').label
  document.title = page === 'guide' ? `${guideLabel} | ${t.meta.title}` : t.meta.title
  document.querySelector('meta[name="description"]').setAttribute('content', t.meta.description)
  try { localStorage.setItem('lang', lang) } catch { /* ignore */ }
  root.innerHTML = page === 'guide' ? renderGuidePage(t, lang) : renderPage(t, lang)
  tick()
  document.querySelectorAll('.reveal').forEach((el) => (io ? io.observe(el) : el.classList.add('is-in')))
}

// Clicks: language switch and phone menu.
root.addEventListener('click', (e) => {
  const sw = e.target.closest('[data-lang]')
  if (sw) { lang = sw.dataset.lang; render(); return }
  const btn = e.target.closest('#menu-btn')
  const menu = document.getElementById('mobile-menu')
  if (btn) { menu.hidden = !menu.hidden; btn.setAttribute('aria-expanded', String(!menu.hidden)); return }
  if (e.target.closest('#mobile-menu a')) menu.hidden = true
})

// Switching pages: redraw, then go to the top (guide) or to the linked section (home).
window.addEventListener('hashchange', () => {
  if (pageNow() === page) return
  page = pageNow()
  render()
  const target = page === 'home' && location.hash.length > 1 ? document.getElementById(location.hash.slice(1)) : null
  if (target) target.scrollIntoView()
  else window.scrollTo(0, 0)
})

render()
setInterval(tick, 1000)
