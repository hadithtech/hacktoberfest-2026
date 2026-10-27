// Builds the page HTML from content.js. Each function = one section. No text is written here.
import { links, logos, agenda, judges, projects, leaderboard, stepCommands } from './content.js'

// "Your *first* pull" -> italic-serif word
const rich = (s) => s.split('*').map((p, i) => (i % 2 ? `<span class="em">${p}</span>` : p)).join('')
const pad = (n) => String(n).padStart(2, '0')
const ext = 'target="_blank" rel="noopener noreferrer"'
const rv = (delay = 0) => `style="transition-delay:${delay}ms"`

const btn = (href, text, line = false, extra = '') => {
  const look = line ? 'border border-gold text-charcoal hover:bg-gold/15' : 'bg-charcoal text-cream hover:bg-[#2a2a2a]'
  return `<a href="${href}" ${href.startsWith('http') ? ext : ''} class="inline-flex items-center justify-center px-7 py-3.5 text-[15px] font-medium transition-colors duration-300 rounded-[2px] ${look} ${extra}">${text}</a>`
}
const section = (id, inner) => `<section id="${id}" class="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 md:py-28">${inner}</section>`
const title = (t, sub) => `<div ${rv()} class="reveal mb-12 md:mb-16">
  <h2 class="max-w-3xl text-4xl font-light leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">${rich(t)}</h2>
  <div class="mt-6 h-px w-24 bg-gold"></div>
  ${sub ? `<p class="mt-6 max-w-xl text-lg leading-relaxed opacity-80">${sub}</p>` : ''}</div>`
const callout = (t) => `<p class="reveal mt-14 max-w-2xl border-s border-gold ps-6 text-xl leading-relaxed md:text-2xl md:font-light">${t}</p>`
const empty = (t) => `<p class="reveal border-y border-gold py-14 text-xl font-light md:text-2xl">${t}</p>`
// Nav links scroll to a home section, except the guide, which has its own page (#/guide).
const navHref = (id) => (id === 'guide' ? '#/guide' : `#${id}`)
const ghMark = (c) => `<svg viewBox="0 0 16 16" class="${c}" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>`

function navbar(t, lang) {
  const sw = (code, text) => `<button type="button" data-lang="${code}" aria-pressed="${lang === code}" class="px-1 text-sm transition-opacity ${lang === code ? 'font-bold' : 'opacity-60 hover:opacity-100'}">${text}</button>`
  return `<header class="sticky top-0 z-40 border-b border-gold bg-cream">
  <nav class="mx-auto flex h-16 max-w-6xl items-center gap-4 px-6 sm:px-10" aria-label="Main">
    <a href="#top" class="flex shrink-0 items-center gap-3"><img src="${logos.hadithtech}" alt="" width="21" height="34" class="h-9 w-auto shrink-0 object-contain"><span class="text-base font-medium tracking-tight">${t.ui.brand}</span></a>
    <ul class="ms-auto hidden items-center gap-8 text-[15px] lg:flex">${t.nav.links.map((l) => `<li><a href="${navHref(l.id)}" class="transition-opacity hover:opacity-60">${l.label}</a></li>`).join('')}</ul>
    <div class="ms-auto flex items-center gap-4 lg:ms-0">
      <div dir="ltr" role="group" aria-label="${t.ui.switchTo}" class="flex items-center">${sw('en', 'EN')}<span class="h-3.5 w-px bg-gold"></span><span class="font-arabic">${sw('ar', 'عربي')}</span></div>
      ${btn(links.register, t.nav.register, false, 'hidden !px-5 !py-2.5 lg:inline-flex')}
      <button type="button" id="menu-btn" class="-me-2 p-2 lg:hidden" aria-expanded="false" aria-controls="mobile-menu" aria-label="${t.ui.openMenu}">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 7h18M3 12h18M3 17h18"/></svg></button>
    </div>
  </nav>
  <div id="mobile-menu" hidden class="border-t border-gold bg-cream px-6 pb-8 pt-4 lg:hidden">
    <ul>${t.nav.links.map((l) => `<li class="border-b border-gold/40"><a href="${navHref(l.id)}" class="block py-4 text-xl font-light">${l.label}</a></li>`).join('')}</ul>
    ${btn(links.register, t.nav.register, false, 'mt-6 w-full')}
  </div></header>`
}

const hero = (t) => `<section id="top" class="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pb-16 pt-12 sm:px-10 md:pt-20 lg:grid-cols-[1.3fr_1fr] lg:gap-16 lg:pb-24">
  <div class="reveal">
    <p class="mb-6 text-sm text-charcoal/80 sm:text-base">${t.eyebrow}</p>
    <h1 class="text-[2.75rem] font-light leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl rtl:leading-[1.3]">${rich(t.headline)}</h1>
    <div class="my-8 h-px w-28 bg-gold"></div>
    <p class="max-w-xl text-lg leading-relaxed sm:text-xl">${t.sub}</p>
    <p class="mt-8 max-w-xl text-[15px] font-medium leading-relaxed">${t.facts}</p>
    <div class="mt-10 flex flex-col gap-4 sm:flex-row">${btn(links.register, t.register)}${btn('#about', t.howItWorks, true)}</div>
  </div>
  <div class="relative mx-auto aspect-square w-full max-w-[19rem] sm:max-w-sm lg:max-w-none" role="img" aria-label="HadithTech">
    <!-- soft gold glow behind the emblem -->
    <div class="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(201,178,107,0.38)_0%,rgba(201,178,107,0.14)_45%,rgba(201,178,107,0)_72%)] blur-xl" aria-hidden="true"></div>
    <!-- slowly turning dashed ring + fixed fine rings -->
    <div class="absolute inset-0 animate-[spin_90s_linear_infinite]" aria-hidden="true">
      <svg viewBox="0 0 400 400" class="h-full w-full" fill="none"><circle cx="200" cy="200" r="196" stroke="#C9B26B" stroke-width="1" stroke-dasharray="2 9" stroke-linecap="round"/></svg></div>
    <svg viewBox="0 0 400 400" class="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
      <circle cx="200" cy="200" r="178" stroke="#C9B26B" stroke-width="1" opacity="0.7"/>
      <circle cx="200" cy="200" r="158" stroke="#C9B26B" stroke-width="1" opacity="0.35"/>
      <circle cx="200" cy="38" r="3.5" fill="#C9B26B"/><circle cx="200" cy="362" r="3.5" fill="#C9B26B" opacity="0.6"/></svg>
    <!-- framed emblem: a pale disc with a hairline gold edge -->
    <div class="absolute inset-[16%] flex items-center justify-center rounded-full border border-gold/70 bg-white/70 p-[9%] shadow-[0_0_60px_rgba(201,178,107,0.35)]">
      <img src="${logos.hadithtech}" alt="HadithTech" width="502" height="793" class="max-h-full max-w-full h-auto w-auto object-contain" style="aspect-ratio:502/793"></div>
  </div></section>`

const countdown = (t) => `<section aria-label="${t.label}" class="mx-auto w-full max-w-6xl px-6 py-10 sm:px-10 md:py-16">
  <div class="reveal border-y border-gold py-12 md:py-16"><p class="mb-8 text-center text-lg font-light">${t.label}</p>
  <div id="countdown" class="mx-auto grid max-w-3xl grid-cols-4 gap-2 sm:gap-5" role="timer">
    ${['days', 'hours', 'minutes', 'seconds'].map((u) => `<div class="border border-gold px-1 py-4 text-center sm:py-8"><div data-unit="${u}" class="text-4xl font-light tabular-nums sm:text-6xl md:text-7xl">00</div><div class="mt-2 text-[11px] sm:text-sm">${t.units[u]}</div></div>`).join('')}
  </div></div></section>`

const about = (t) => section('about', `${title(t.title)}
  <p class="reveal max-w-4xl text-2xl font-light leading-snug md:text-3xl md:leading-snug">${t.lead}</p>
  <div id="overview" class="mt-20 scroll-mt-20 md:mt-24">
    <div class="reveal mb-12 md:mb-14">
      <h3 class="max-w-3xl text-3xl font-light leading-[1.15] tracking-tight sm:text-4xl md:text-5xl rtl:leading-[1.35]">${t.overview.title}</h3>
      <div class="mt-5 h-px w-20 bg-gold"></div>
      <p class="mt-5 max-w-2xl text-lg leading-relaxed opacity-80 md:text-xl">${t.overview.sub}</p></div>
  <div class="grid gap-x-20 gap-y-14 sm:grid-cols-2">${t.items.map((it, i) => `
    <div ${rv((i % 2) * 120)} class="reveal grid grid-cols-[4.5rem_1fr] gap-x-5 border-t border-gold pt-6 md:grid-cols-[6rem_1fr]">
      <span class="row-span-2 text-6xl font-light tabular-nums leading-none text-charcoal/25 md:text-7xl" aria-hidden="true">${pad(i + 1)}</span>
      <h3 class="text-2xl font-medium">${it.title}</h3><p class="mt-3 max-w-sm text-lg leading-relaxed opacity-85">${it.text}</p></div>`).join('')}</div>
  </div>
  ${callout(t.callout)}`)

const details = (t) => section('details', `${title(t.title)}
  <div class="reveal max-w-3xl border border-gold bg-white">${t.rows.map((r, i) => `
    <div class="grid grid-cols-[6.5rem_1fr] sm:grid-cols-[10rem_1fr] ${i ? 'border-t border-gold' : ''}">
      <div class="border-e border-gold px-4 py-5 text-sm sm:px-6 sm:text-base sm:font-medium">${r.label}</div>
      <div class="px-4 py-5 text-base leading-relaxed sm:px-6 sm:text-lg">${r.value}</div></div>`).join('')}</div>
  <div class="reveal mt-8">${btn(links.map, t.mapButton)}</div>`)

const agendaSec = (t, lang) => section('agenda', `${title(t.title, t.text)}
  <ol class="relative ps-10"><span class="absolute inset-y-0 start-[5px] w-px bg-gold" aria-hidden="true"></span>${agenda.map((it) => `
    <li class="reveal relative pb-14"><span class="absolute -start-10 top-3 h-[11px] w-[11px] rounded-full border border-gold bg-cream" aria-hidden="true"></span>
      <div class="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-8"><span class="text-4xl font-light tabular-nums md:text-5xl">${it.time}${it.end ? `<span class="ms-2 text-base opacity-60">– ${it.end}</span>` : ''}</span><span class="text-lg">${it[lang]}</span></div></li>`).join('')}</ol>`)

// Judges: one card each. GitHub photo when a username is set, initials otherwise.
const initials = (n) => n.split(/[\s-]+/).filter(Boolean).map((w) => w[0]).slice(0, 2).join('').toUpperCase()
const judgesSec = (t) => section('judges', `${title(t.title, t.sub)}
  <ul class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">${judges.map((j, i) => `
    <li ${rv((i % 4) * 100)} class="reveal flex flex-col items-center border border-gold bg-white px-6 py-10 text-center">
      ${j.github
        ? `<img src="https://github.com/${j.github}.png?size=192" alt="" width="96" height="96" loading="lazy" class="h-24 w-24 rounded-full border border-gold object-cover">`
        : `<span class="flex h-24 w-24 items-center justify-center rounded-full border border-gold bg-gold/10 text-3xl font-light" dir="ltr" aria-hidden="true">${initials(j.name)}</span>`}
      <h3 class="mt-6 text-xl font-medium" dir="ltr">${j.name}</h3>
      ${j.github ? `<a dir="ltr" href="https://github.com/${j.github}" ${ext} class="mt-2 inline-flex items-center gap-2 text-sm opacity-80 transition-opacity hover:opacity-100">${ghMark('h-4 w-4')}<span>@${j.github}</span></a>` : ''}</li>`).join('')}</ul>`)

const guide = (t) => section('guide', `${title(t.title, t.lead)}
  <div class="border-b border-gold">${t.steps.map((s, i) => `
    <div class="reveal grid items-start gap-x-8 gap-y-4 border-t border-gold py-8 md:grid-cols-[5rem_1fr_minmax(0,21rem)] md:items-center">
      <span class="text-5xl font-light tabular-nums md:text-6xl" aria-hidden="true">${i + 1}</span>
      <div><h3 class="text-2xl font-medium">${s.title}</h3><p class="mt-2 max-w-md text-lg leading-relaxed opacity-85">${s.text}</p></div>
      <pre class="code overflow-x-auto border border-gold bg-charcoal/[0.04] px-4 py-3 font-mono text-[13px] leading-relaxed"><code>${stepCommands[i].replace(/</g, '&lt;')}</code></pre></div>`).join('')}</div>
  ${callout(t.callout)}`)

const projectsSec = (t, lang, viewLabel) => section('projects', `${title(t.title, t.sub)}
  ${projects.length === 0 ? empty(t.empty) : `<ul class="border-b border-gold">${projects.map((p) => `
    <li class="reveal grid gap-3 border-t border-gold py-8 md:grid-cols-[1fr_1.6fr_auto] md:items-baseline md:gap-10">
      <div><h3 class="text-2xl font-medium">${p.name}</h3><p class="mt-1 text-sm opacity-70">${p.author}</p></div>
      <p class="text-lg leading-relaxed">${p.description[lang]}</p>
      ${p.link ? `<a href="${p.link}" ${ext} class="w-fit border-b border-gold pb-1 transition-colors hover:bg-gold/15">${viewLabel}</a>` : ''}</li>`).join('')}</ul>`}
  ${links.submission ? `<div class="reveal mt-10">${btn(links.submission, t.submit)}</div>` : ''}`)

const leaderboardSec = (t) => { const c = t.columns; return section('leaderboard', `${title(t.title, t.sub)}
  ${leaderboard.length === 0 ? empty(t.empty) : `<div class="reveal overflow-x-auto"><table class="w-full min-w-[34rem] border-collapse text-start">
    <thead><tr class="border-y border-gold text-sm"><th class="w-20 py-4 pe-4 text-start font-medium">${c.rank}</th><th class="py-4 pe-4 text-start font-medium">${c.name}</th><th class="py-4 pe-4 text-start font-medium">${c.github}</th><th class="py-4 text-end font-medium">${c.prs}</th></tr></thead>
    <tbody>${leaderboard.map((r, i) => `<tr class="border-b border-gold"><td class="py-5 pe-4 text-3xl font-light tabular-nums">${i + 1}</td><td class="py-5 pe-4 text-lg">${r.name}</td>
      <td class="py-5 pe-4"><a dir="ltr" href="https://github.com/${r.github}" ${ext} class="border-b border-gold pb-0.5 hover:bg-gold/15">${r.github}</a></td><td class="py-5 text-end text-2xl font-light tabular-nums">${r.prs}</td></tr>`).join('')}</tbody></table></div>`}`) }

const lastYear = (t) => section('last-year', `${title(t.title)}
  <p class="reveal max-w-2xl text-xl font-light leading-relaxed md:text-2xl">${t.text}</p>
  <div class="reveal mt-14 grid grid-cols-2 border-y border-gold md:grid-cols-4">${t.stats.map((s) => `
    <div class="border-gold px-2 py-9 first:border-s-0 max-md:odd:border-s-0 max-md:even:border-s max-md:[&:nth-child(n+3)]:border-t sm:px-6 md:border-s md:py-12"><div class="text-6xl font-light tabular-nums md:text-7xl">${s.value}</div><div class="mt-3 text-base">${s.label}</div></div>`).join('')}</div>
  <div class="reveal mt-14"><p class="em max-w-3xl text-3xl leading-tight md:text-5xl md:leading-tight">${t.closing}</p>
    <a href="${links.lastYear}" ${ext} class="mt-8 inline-block border-b border-gold pb-1 text-lg transition-colors hover:bg-gold/15">${t.link}</a></div>`)

// Partners: identical cards (same height, padding, border). Each logo sits in a fixed-height
// frame and is scaled with object-contain, so wide and tall logos both stay undistorted.
const partners = (t) => {
  const card = 'flex h-36 items-center justify-center border border-gold bg-white px-8 py-6 transition-shadow duration-500 hover:shadow-[0_8px_30px_rgba(201,178,107,0.28)] sm:h-40'
  const logo = (src, alt, size) => `<img src="${src}" alt="${alt}" class="w-auto max-w-full object-contain ${size}">`
  return section('partners', `${title(t.title)}
  <ul class="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
    <li ${rv(0)} class="reveal ${card} gap-3 text-charcoal">${ghMark('h-10 w-10 shrink-0')}<span class="text-3xl font-semibold tracking-tight" dir="ltr">GitHub</span></li>
    <li ${rv(100)} class="reveal ${card} text-charcoal"><span class="text-3xl font-semibold tracking-tight" dir="ltr">${t.names.hacktoberfest}</span></li>
    <li ${rv(200)} class="reveal"><a href="${links.mlh}" ${ext} class="${card} text-charcoal"><span class="text-4xl font-bold tracking-tight" dir="ltr">${t.names.mlh}</span></a></li>
    <li ${rv(300)} class="reveal ${card}">${logo(logos.replit, t.names.replit, 'h-10')}</li>
    <li ${rv(400)} class="reveal ${card}">${logo(logos.fsmvu, t.names.fsmvu, 'h-[5.5rem]')}</li></ul>`)
}

const footer = (t) => { const o = t.organizers, f = t.footer, a = 'transition-opacity hover:opacity-60'
  return `<footer><div class="mx-auto grid w-full max-w-6xl gap-6 border-t border-gold px-6 py-14 sm:px-10 md:grid-cols-[1fr_2fr] md:gap-16">
    <h2 class="reveal text-2xl font-light">${o.heading}</h2>
    <div class="reveal"><p class="max-w-xl text-lg leading-relaxed">${o.text}</p><p class="mt-4 text-[15px] font-medium">${o.motto}</p>
      <a href="${links.hadithtech}" ${ext} class="mt-6 inline-block border-b border-gold pb-1 transition-colors hover:bg-gold/15">${o.link}</a></div></div>
  <div class="border-t border-gold"><div class="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10 sm:px-10 md:flex-row md:items-center md:justify-between">
    <a href="#top" class="flex items-center gap-3 self-start"><img src="${logos.hadithtech}" alt="" width="30" height="48" class="h-12 w-auto object-contain"><span class="text-lg font-medium tracking-tight">${t.ui.brand}</span></a>
    <ul class="flex flex-wrap items-center gap-x-8 gap-y-3 text-[15px]">
      <li><a class="${a}" href="${links.hadithtech}" ${ext}>${f.links.website}</a></li>
      <li><a class="${a} inline-flex items-center gap-2" href="${links.github}" ${ext}>${ghMark('h-4 w-4')}<span>${f.links.github}</span></a></li>
      <li><a class="${a}" href="${links.linkedin}" ${ext}>${f.links.linkedin}</a></li>
      <li><a class="${a}" href="${links.mlhEvent}" ${ext}>${f.links.mlh}</a></li>
      <li><a class="${a}" href="${links.register}" ${ext}>${f.links.register}</a></li></ul></div>
    <p class="mx-auto max-w-6xl px-6 pb-10 text-sm opacity-70 sm:px-10">${f.copyright}</p></div></footer>`
}

// The whole page, in order.
export const renderPage = (t, lang) => navbar(t, lang) + `<main>${hero(t.hero)}${countdown(t.countdown)}${about(t.about)}${details(t.details)}${agendaSec(t.agenda, lang)}${judgesSec(t.judges)}${projectsSec(t.projects, lang, t.ui.viewProject)}${leaderboardSec(t.leaderboard)}${lastYear(t.lastYear)}${partners(t.partners)}</main>` + footer(t)

// The guide's own page (#/guide).
export const renderGuidePage = (t, lang) => navbar(t, lang) + `<main>${guide(t.guide)}</main>` + footer(t)
