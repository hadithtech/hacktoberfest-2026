/* =====================================================================
   content.js — EVERYTHING visible on the site lives in this file.
   ---------------------------------------------------------------------
   HOW TO EDIT (beginner guide)
   1. Find the text you want to change. Every item has a comment above it.
   2. Change only the words between the quotation marks ' '.
   3. English text is in `content.en`, Arabic text is in `content.ar`.
      Both have the SAME structure, so change both when you change a fact.
   4. To make a word italic-serif in a headline, put *stars* around it.
   5. Save the file. The browser updates by itself.
   6. Lists (agenda, projects, leaderboard) are in the SHARED part below,
      right after the links. Add a row by copying an existing one.
   ===================================================================== */


/* =====================================================================
   SHARED — things that are the same in English and Arabic
   ===================================================================== */

// All links on the site. Change a link here and it updates everywhere.
export const links = {
  // Google Form where people sign up
  register: 'https://forms.gle/YrLNs8rposUNJ3Np8',
  // Google Maps pin for the venue
  map: 'https://maps.app.goo.gl/kT5nXqHSuhcSWj7P7',
  // HadithTech main website
  hadithtech: 'https://hadithtech.com',
  // HadithTech on GitHub
  github: 'https://github.com/hadithtech',
  // HadithTech on LinkedIn
  linkedin: 'https://www.linkedin.com/company/hadith-tech/',
  // Website of the past edition's event
  lastYear: 'https://hackathon.hadithtech.com',
  // Where participants send their project. LEAVE EMPTY ('') to hide the
  // "Submit your project" button. Paste a link between the quotes to show it.
  submission: '',
}

// Exact start time of the event, used by the countdown.
// Format: YYYY-MM-DDTHH:MM:SS+03:00  (+03:00 = Istanbul time). Keep the format.
export const eventStart = '2026-10-24T10:00:00+03:00'

// Logo image files (they sit in public/images). They are imported, so the build
// embeds them inside dist/index.html and they never show up as broken images.
import hadithtechLogo from '../public/images/logo-hadithtech.png'
import fsmvuLogo from '../public/images/logo-fsmvu.png'
import replitLogo from '../public/images/logo-replit.png'
export const logos = { hadithtech: hadithtechLogo, fsmvu: fsmvuLogo, replit: replitLogo }

// AGENDA — the timeline shows every item in this list, in this order.
// To add a session, copy one line, paste it below, and change the three values:
//   time = the time shown, en = English title, ar = Arabic title.
export const agenda = [
  { time: '10:00', en: 'Event begins', ar: 'يبدأ الحدث' },
  // { time: '11:00', en: 'Your session name', ar: 'اسم الجلسة' },
]

// PROJECTS WALL — projects built on the day. Starts empty.
// To add one, copy the example below (remove the // at the start of each line),
// fill it in, and keep the commas. description needs both languages.
export const projects = [
  // {
  //   name: 'Project name',
  //   author: 'Author name',
  //   description: { en: 'One short sentence.', ar: 'جملة قصيرة واحدة.' },
  //   link: 'https://github.com/username/project',
  // },
]

// LEADERBOARD — contributors ranked on the day. Starts empty.
// Put them in order, best first. The rank number is added automatically.
// github = the username only (no link). prs = number of pull requests.
export const leaderboard = [
  // { name: 'Full Name', github: 'username', prs: 3 },
]

// Command shown in the grey code box next to each of the five steps.
// Same order as the steps. Use '\n' to start a new line inside one box.
// These stay in English and left-to-right in both languages.
export const stepCommands = [
  '# click "Fork" on GitHub',
  'git clone <url>',
  'git checkout -b my-change',
  'git add .\ngit commit -m "Fix typo"\ngit push origin my-change',
  '# click "Compare & pull request"',
]


/* =====================================================================
   ENGLISH
   ===================================================================== */
export const content = {
  en: {
    // Browser tab title and search-result description
    meta: {
      title: 'Hacktoberfest Mini Hackathon 2026 | HadithTech Istanbul',
      description:
        'A one-day open-source coding competition in Istanbul. Saturday, 24 October 2026, 10:00. Organized by HadithTech.',
    },

    // Small texts used by the interface itself
    ui: {
      // Name next to the logo in the top bar
      brand: 'HadithTech',
      // Label of the language switch button (shows the OTHER language)
      switchTo: 'Switch language',
      // Screen-reader labels for the phone menu button
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      // Text on the "view project" link in the Projects Wall
      viewProject: 'View project',
    },

    // Top bar links (id = the section it scrolls to; do not change ids)
    nav: {
      links: [
        { id: 'overview', label: 'Overview' },
        { id: 'details', label: 'Details' },
        { id: 'agenda', label: 'Agenda' },
        { id: 'guide', label: 'Guide' },
        { id: 'last-year', label: 'Past Edition' },
        { id: 'partners', label: 'Partners' },
      ],
      // Register button in the top bar
      register: 'Register',
    },

    // 1. HERO (the first screen)
    hero: {
      // Small line above the headline
      eyebrow: 'Tech Competition · Second Edition',
      // Big headline. *Stars* make the words italic serif.
      headline: 'Your first *pull request* starts here.',
      // Paragraph under the headline
      sub: 'One day in Istanbul. Real open-source projects, hands-on guidance, and a room full of people learning alongside you.',
      // Date, time and place line
      facts: 'Saturday, 24 October 2026 · 10:00 · FSMVÜ Topkapı Campus',
      // Main button (opens the Google Form)
      register: 'Register now',
      // Second button (scrolls to the "What is Hacktoberfest?" section)
      howItWorks: 'See how the day works',
    },

    // 2. COUNTDOWN
    countdown: {
      // Label above the numbers
      label: 'Until we begin',
      // Names under each number
      units: { days: 'Days', hours: 'Hours', minutes: 'Minutes', seconds: 'Seconds' },
      // Shown instead of the numbers once the event time has passed
      done: 'The day is here.',
    },

    // 3. WHAT IS HACKTOBERFEST?
    about: {
      title: 'What is Hacktoberfest?',
      // Big opening paragraph
      lead: 'Every October, developers around the world contribute to open-source projects, the shared code behind much of the software we use every day. Hacktoberfest turns that habit into a month-long celebration. This is our way of joining in.',
      // Heading + subtitle shown right above the four numbered items (top-bar link: "Overview")
      overview: {
        title: 'Hacktoberfest Mini Hackathon 2026',
        sub: 'Your gateway to open-source: an introductory and hands-on coding workshop where we will explore, build, and compete together.',
      },
      // The four numbered items (the numbers 01–04 are added automatically)
      items: [
        { title: 'Understand', text: 'We explain what Hacktoberfest is and why open source matters.' },
        { title: 'Learn by doing', text: 'A practical, step-by-step walkthrough of making your first contribution.' },
        { title: 'Compete', text: 'Put it to work in a coding competition during the day.' },
        { title: 'Keep going', text: 'We send you home ready to continue the journey on your own.' },
      ],
      // Highlighted note at the bottom of the section
      callout: 'No open-source experience needed. Bring your laptop and your enthusiasm. We will handle the rest.',
    },

    // 4. EVENT DETAILS (the white ruled card)
    details: {
      title: 'Event details',
      // Each row: label on one side, value on the other. Add or remove rows freely.
      rows: [
        { label: 'Title', value: 'Hacktoberfest Mini Hackathon 2026' },
        { label: 'Date', value: 'Saturday, 24 October 2026' },
        { label: 'Time', value: '10:00 AM' },
        { label: 'Place', value: 'FSMVÜ Topkapı Campus, Fatih Sultan Mehmet University, Istanbul' },
        { label: 'Notes', value: 'Breakfast for attendees and prizes on the day.' },
      ],
      // Button under the card (opens Google Maps)
      mapButton: 'Open in Google Maps',
    },

    // 5. AGENDA (the timeline items come from `agenda` near the top of this file)
    agenda: {
      title: 'Agenda',
      text: 'The event begins at 10:00. The full schedule will be announced here soon.',
    },

    // 6. FIRST PULL REQUEST IN FIVE STEPS
    guide: {
      title: 'Your first pull request in five steps',
      lead: 'Never done it? This is the whole process, start to finish.',
      // The five steps (numbers are added automatically). Commands come from `stepCommands`.
      steps: [
        { title: 'Fork', text: 'Make your own copy of the project on GitHub.' },
        { title: 'Clone', text: 'Download that copy to your laptop.' },
        { title: 'Branch and change', text: 'Create a branch and make one small improvement.' },
        { title: 'Commit and push', text: 'Save your change and send it back to your copy on GitHub.' },
        { title: 'Open a pull request', text: 'Ask the project to accept your work. That is a contribution.' },
      ],
      callout: 'Before Saturday, create your free GitHub account at github.com.',
    },

    // 7. PROJECTS WALL (entries come from `projects` near the top of this file)
    projects: {
      title: 'Built *on the day*.',
      sub: 'Projects from our participants, added as they ship.',
      // Shown while the projects list is empty
      empty: 'The wall is empty, for now. Come back on the 24th.',
      // Button shown only when links.submission is filled in
      submit: 'Submit your project',
    },

    // 8. LEADERBOARD (rows come from `leaderboard` near the top of this file)
    leaderboard: {
      title: 'Leaderboard of contributors',
      sub: 'Celebrating the people who contribute on the day.',
      empty: 'Rankings will appear here once the day begins.',
      // Table column names
      columns: { rank: 'Rank', name: 'Name', github: 'GitHub username', prs: 'Pull requests' },
    },

    // 9. PAST EDITION
    lastYear: {
      title: 'Past Edition',
      text: 'On 18 October 2025, we spent nine hours at Fatih Sultan Mehmet University learning, building and opening pull requests together. It set the foundation for this year.',
      // The four big figures
      stats: [
        { value: '115', label: 'Applicants' },
        { value: '70', label: 'Participants' },
        { value: '4', label: 'Repositories' },
        { value: '22', label: 'Pull requests' },
      ],
      // Closing line in italic serif
      closing: 'Every pull request starts with a single line. Keep building, keep exploring, and keep giving back.',
      // Link to the past edition's site
      link: 'See the 2025 event',
    },

    // 10. PARTNERS
    partners: {
      title: 'Our partners',
      // Names used as accessible text for each logo
      names: { github: 'GitHub', replit: 'Replit', fsmvu: 'FSMVU Syrian Students Community' },
    },

    // 11. ABOUT THE ORGANIZERS + FOOTER
    organizers: {
      heading: 'Organized by HadithTech.',
      text: 'A tech community in Istanbul where developers, designers, students and innovators come together to share ideas, learn and build.',
      // Short motto
      motto: 'Connect · Learn · Build',
      link: 'Visit hadithtech.com',
    },
    footer: {
      // Footer links (the URLs come from `links` at the top of this file)
      links: { website: 'hadithtech.com', github: 'GitHub', linkedin: 'LinkedIn', register: 'Register' },
      copyright: '© 2026 HadithTech. An independent community event celebrating Hacktoberfest.',
    },
  },


  /* =====================================================================
     ARABIC (عربي) — same structure as English above
     Keep technical words (GitHub, Pull Request, Fork...) in English letters.
     Keep Western digits (24.10.2026).
     ===================================================================== */
  ar: {
    // عنوان التبويب ووصف محركات البحث
    meta: {
      title: 'هاكتوبرفيست ميني هاكاثون 2026 | حديث تقني إسطنبول',
      description:
        'مسابقة برمجية مفتوحة المصدر لمدة يوم واحد في إسطنبول. السبت 24 أكتوبر 2026، الساعة 10:00. تنظيم حديث تقني.',
    },

    // نصوص الواجهة
    ui: {
      brand: 'حديث تقني',
      switchTo: 'تغيير اللغة',
      openMenu: 'فتح القائمة',
      closeMenu: 'إغلاق القائمة',
      viewProject: 'عرض المشروع',
    },

    // روابط الشريط العلوي (لا تغيّر id)
    nav: {
      links: [
        { id: 'overview', label: 'نظرة عامة' },
        { id: 'details', label: 'التفاصيل' },
        { id: 'agenda', label: 'الجدول' },
        { id: 'guide', label: 'الدليل' },
        { id: 'last-year', label: 'النسخة السابقة' },
        { id: 'partners', label: 'الشركاء' },
      ],
      register: 'سجّل',
    },

    // 1. الواجهة الرئيسية
    hero: {
      eyebrow: 'مسابقة تقنية · النسخة الثانية',
      headline: 'أول *Pull Request* لك يبدأ من هنا.',
      sub: 'يوم واحد في إسطنبول. مشاريع حقيقية مفتوحة المصدر، وإرشاد عملي، وقاعة مليئة بأشخاص يتعلمون معك.',
      facts: 'السبت 24.10.2026 · الساعة العاشرة صباحاً · جامعة السلطان محمد الفاتح، حرم توبكابي',
      register: 'سجّل الآن',
      howItWorks: 'كيف سيسير اليوم',
    },

    // 2. العدّاد التنازلي
    countdown: {
      label: 'حتى لحظة الانطلاق',
      units: { days: 'أيام', hours: 'ساعات', minutes: 'دقائق', seconds: 'ثوانٍ' },
      done: 'اليوم هو اليوم.',
    },

    // 3. ما هو هاكتوبرفيست؟
    about: {
      title: 'ما هو هاكتوبرفيست؟',
      lead: 'في كل أكتوبر، يساهم مطوّرون حول العالم في مشاريع مفتوحة المصدر، وهي الأكواد المشتركة التي تقوم عليها برامج نستخدمها كل يوم. وهاكتوبرفيست يحوّل هذه العادة إلى احتفال يمتد شهراً كاملاً. وهذه طريقتنا في المشاركة فيه.',
      overview: {
        title: 'هاكتوبرفيست ميني هاكاثون 2026',
        sub: 'بوابتك إلى عالم المصادر المفتوحة: ورشة برمجية تمهيدية وعملية نستكشف فيها ونبني وننافس معًا.',
      },
      items: [
        { title: 'افهم', text: 'نشرح ما هو هاكتوبرفيست ولماذا تهم المصادر المفتوحة.' },
        { title: 'تعلّم بالتطبيق', text: 'شرح عملي خطوة بخطوة لأول مساهمة لك.' },
        { title: 'نافس', text: 'طبّق ما تعلمته في مسابقة برمجية خلال اليوم.' },
        { title: 'أكمل الطريق', text: 'نجهّزك لتتابع رحلتك بنفسك بنجاح.' },
      ],
      callout: 'لا تحتاج أي خبرة سابقة بالمصادر المفتوحة. أحضر جهاز الحاسب وحماسك، والباقي علينا.',
    },

    // 4. تفاصيل الحدث
    details: {
      title: 'تفاصيل الحدث',
      rows: [
        { label: 'العنوان', value: 'Hacktoberfest Mini Hackathon 2026' },
        { label: 'التاريخ', value: 'السبت 24.10.2026' },
        { label: 'الوقت', value: 'الساعة العاشرة صباحاً' },
        { label: 'المكان', value: 'جامعة السلطان محمد الفاتح (FSMVÜ) — حرم توبكابي' },
        { label: 'ملاحظات', value: 'إفطار للحضور ومجموعة من الجوائز' },
      ],
      mapButton: 'افتح في خرائط Google',
    },

    // 5. الجدول
    agenda: {
      title: 'الجدول',
      text: 'يبدأ الحدث في الساعة العاشرة صباحاً. سيُعلن الجدول الكامل هنا قريباً.',
    },

    // 6. أول Pull Request في خمس خطوات
    guide: {
      title: 'أول *Pull Request* لك في خمس خطوات',
      lead: 'لم تجرّبها من قبل؟ هذه العملية كاملة من البداية إلى النهاية.',
      steps: [
        { title: 'انسخ المشروع (Fork)', text: 'أنشئ نسختك الخاصة من المشروع على GitHub.' },
        { title: 'حمّله (Clone)', text: 'نزّل هذه النسخة إلى جهازك.' },
        { title: 'غيّر (Branch)', text: 'أنشئ فرعاً جديداً وأجرِ تحسيناً صغيراً واحداً.' },
        { title: 'ثبّت وأرسل (Commit & Push)', text: 'احفظ تعديلك وأرسله إلى نسختك على GitHub.' },
        { title: 'افتح Pull Request', text: 'اطلب من المشروع قبول عملك. وهنا تصبح مساهماً.' },
      ],
      callout: 'قبل السبت: أنشئ حسابك المجاني على github.com.',
    },

    // 7. جدار المشاريع
    projects: {
      title: 'بُني في *يوم الحدث*.',
      sub: 'مشاريع المشاركين تُضاف هنا فور إنجازها.',
      empty: 'الجدار فارغ حالياً. عُد في 24.10.',
      submit: 'أرسل مشروعك',
    },

    // 8. لوحة المساهمين
    leaderboard: {
      title: 'لوحة المساهمين',
      sub: 'نحتفي بمن يساهمون في يوم الحدث.',
      empty: 'ستظهر الترتيبات هنا بعد انطلاق اليوم.',
      columns: { rank: 'الترتيب', name: 'الاسم', github: 'اسم المستخدم على GitHub', prs: 'Pull Requests' },
    },

    // 9. النسخة السابقة
    lastYear: {
      title: 'النسخة السابقة',
      text: 'في 18 أكتوبر 2025 قضينا تسع ساعات في جامعة السلطان محمد الفاتح نتعلّم ونبني ونفتح Pull Requests معاً. كان ذلك الأساس لهذا العام.',
      stats: [
        { value: '115', label: 'متقدّم' },
        { value: '70', label: 'مشارك' },
        { value: '4', label: 'مستودعات' },
        { value: '22', label: 'Pull Requests' },
      ],
      closing: 'كل Pull Request يبدأ بخطوة صغيرة. استمر في البناء، اكتشف الجديد، وكن دائماً معطاءً لمجتمعك.',
      link: 'شاهد فعالية 2025',
    },

    // 10. الشركاء
    partners: {
      title: 'شركاؤنا',
      names: { github: 'GitHub', replit: 'Replit', fsmvu: 'مجتمع الطلاب السوريين في جامعة السلطان محمد الفاتح' },
    },

    // 11. المنظّمون والتذييل
    organizers: {
      heading: 'نظّمها فريق حديث تقني.',
      text: 'مجتمع تقني في إسطنبول يجتمع فيه المطوّرون والمصمّمون والطلاب والمبتكرون لتبادل الأفكار والتعلّم والبناء.',
      motto: 'تواصل · تعلّم · ابنِ',
      link: 'زُر hadithtech.com',
    },
    footer: {
      links: { website: 'hadithtech.com', github: 'GitHub', linkedin: 'LinkedIn', register: 'سجّل' },
      copyright: '© 2026 حديث تقني. فعالية مجتمعية مستقلة احتفاءً بهاكتوبرفيست.',
    },
  },
}
