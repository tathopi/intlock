/* ============================================================
   INTLOCK — двуязычность RU / EN
   Тексты лежат в объекте I18N: ключ → { ru: "...", en: "..." }
   В index.html у элементов стоит data-i18n="ключ".
   Как менять: правьте строку нужного языка, ничего больше трогать не надо.
   ============================================================ */
(function () {
  "use strict";
  const I18N = {
    /* ---------- Шапка ---------- */
    "nav.access": { ru: "Контроль доступа", en: "Access Control" },
    "nav.wifi": { ru: "Wi-Fi сети", en: "Wi-Fi Networks" },
    "nav.video": { ru: "Видеонаблюдение", en: "Video Surveillance" },
    "nav.audit": { ru: "Аудит", en: "Audit" },
    "nav.feedback": { ru: "Обратная связь", en: "Feedback" },
    "nav.contacts": { ru: "Контакты", en: "Contacts" },
    "nav.cta": { ru: "Написать нам", en: "Contact us" },
    /* ---------- Вход и регистрация (окно в шапке) ---------- */
    "auth.btn": { ru: "Войти", en: "Sign in" },
    "auth.logout": { ru: "Выйти", en: "Sign out" },
    "auth.signedAs": { ru: "Вы вошли как", en: "Signed in as" },
    "auth.kicker": { ru: "Аккаунт", en: "Account" },
    "auth.title": { ru: "Вход и регистрация", en: "Sign in and sign up" },
    "auth.tab.login": { ru: "Вход", en: "Sign in" },
    "auth.tab.register": { ru: "Регистрация", en: "Sign up" },
    "auth.sub.login": { ru: "Войдите, чтобы отправлять сообщения и видеть свои данные.", en: "Sign in to send messages and see your data." },
    "auth.sub.register": { ru: "Создайте аккаунт — это займёт меньше минуты.", en: "Create an account — it takes less than a minute." },
    "auth.field.id": { ru: "Логин или почта", en: "Username or email" },
    "auth.field.login": { ru: "Логин", en: "Username" },
    "auth.field.email": { ru: "Почта", en: "Email" },
    "auth.field.phone": { ru: "Номер телефона", en: "Phone number" },
    "auth.field.password": { ru: "Пароль", en: "Password" },
    "auth.ph.login": { ru: "ivan_2026", en: "john_2026" },
    "auth.ph.email": { ru: "you@mail.com", en: "you@mail.com" },
    "auth.ph.phone": { ru: "+34 642 041 237", en: "+34 642 041 237" },
    "auth.ph.password": { ru: "Минимум 6 символов", en: "At least 6 characters" },
    "auth.submit.login": { ru: "Войти", en: "Sign in" },
    "auth.submit.register": { ru: "Создать аккаунт", en: "Create account" },
    "auth.note": {
      ru: "Демо-режим: аккаунты хранятся только в этом браузере.",
      en: "Demo mode: accounts are stored in this browser only."
    },
    "auth.err.empty": { ru: "Заполните все поля", en: "Fill in all fields" },
    "auth.err.email": { ru: "Введите корректную почту", en: "Enter a valid email" },
    "auth.err.login": { ru: "Логин: 3–20 символов — буквы, цифры и «_»", en: "Username: 3–20 chars — letters, digits and “_”" },
    "auth.err.phone": { ru: "Введите номер телефона", en: "Enter a phone number" },
    "auth.err.password": { ru: "Пароль — минимум 6 символов", en: "Password must be at least 6 characters" },
    "auth.err.exists": { ru: "Такой логин или почта уже заняты", en: "That username or email is already taken" },
    "auth.err.nouser": { ru: "Пользователь не найден", en: "User not found" },
    "auth.err.wrongpass": { ru: "Неверный пароль", en: "Wrong password" },
    /* ---------- Первый экран ---------- */
    "hero.title1": { ru: "Интеллектуальные системы контроля", en: "Smart Access Control" },
    "hero.title2": { ru: "и управления доступом", en: "Systems" },
    "hero.cta1": { ru: "Написать в WhatsApp", en: "Chat on WhatsApp" },
    "hero.cta2": { ru: "Обсудить задачу", en: "Discuss your project" },
    /* Подписи к фото в слайдере шапки (hero-1.jpg … hero-5.jpg) */
    "hero.s1": { ru: "Умный замок — под любую дверь", en: "A smart lock for any door" },
    "hero.s2": { ru: "Код, карта, отпечаток, телефон", en: "Code, card, fingerprint, phone" },
    "hero.s3": { ru: "Для дома, отеля и яхты", en: "For home, hotel and yacht" },
    "hero.s4": { ru: "Управление из приложения", en: "Control from the app" },
    "hero.s5": { ru: "Журнал доступа всегда под рукой", en: "Access history always at hand" },
    /* ---------- Слайдеры фото в разделах главной ---------- */
    "slider.label": { ru: "Фотографии раздела", en: "Section photos" },
    "slider.photo": { ru: "Фото", en: "Photo" },
    "slider.prev": { ru: "Предыдущее фото", en: "Previous photo" },
    "slider.next": { ru: "Следующее фото", en: "Next photo" },
    "video.ph": { ru: "Видео", en: "Video" },
    "video.aria": { ru: "Видео INTLOCK", en: "INTLOCK video" },
    /* ---------- Полезные ссылки ---------- */
    "products.pdf": { ru: "Скачать каталог (PDF)", en: "Download catalog (PDF)" },
    "cta.partner": { ru: "Стать партнёром", en: "Become a partner" },
    /* ---------- Обратная связь ---------- */
    "feedback.pageTitle": { ru: "Обратная связь — INTLOCK", en: "Feedback — INTLOCK" },
    "feedback.kicker": { ru: "Обратная связь", en: "Feedback" },
    "feedback.title": { ru: "Напишите", en: "Drop us" },
    "feedback.titleAccent": { ru: "нам", en: "a line" },
    "feedback.sub": {
      ru: "Вопрос о замках, аренде или партнёрстве — пишите, отвечаем в течение рабочего дня.",
      en: "A question about locks, rentals or partnership — write to us, we reply within one business day."
    },
    "feedback.as": { ru: "Вы вошли как", en: "Signed in as" },
    "feedback.needAuth": { ru: "Чтобы отправить сообщение, сначала войдите в аккаунт.", en: "Sign in to your account to send a message." },
    "feedback.login": { ru: "Войти или зарегистрироваться", en: "Sign in or sign up" },
    "feedback.label": { ru: "Сообщение", en: "Message" },
    "feedback.ph": {
      ru: "Расскажите, что вам нужно: модель замка, объект, сроки…",
      en: "Tell us what you need: lock model, property, timeline…"
    },
    "feedback.submit": { ru: "Отправить сообщение", en: "Send message" },
    "feedback.hint": {
      ru: "Минимум 10 символов · сообщение сохраняется в браузере (демо-режим)",
      en: "At least 10 characters · the message is stored in the browser (demo mode)"
    },
    "feedback.empty": { ru: "Напишите сообщение длиннее 10 символов", en: "Please write a message of at least 10 characters" },
    "feedback.success": { ru: "Сообщение отправлено! Мы ответим на вашу почту.", en: "Message sent! We will reply to your email." },
    "feedback.sendError": {
      ru: "Не удалось отправить сообщение. Попробуйте позже или напишите на info@intlock.es.",
      en: "Could not send the message. Try again later or email info@intlock.es."
    },
    /* ---------- Направления (4 каталога на главной + их страницы) ---------- */
    "dir.kicker": { ru: "Направления", en: "Directions" },
    "dir.num1": { ru: "Направление 01", en: "Direction 01" },
    "dir.num2": { ru: "Направление 02", en: "Direction 02" },
    "dir.num3": { ru: "Направление 03", en: "Direction 03" },
    "dir.num4": { ru: "Направление 04", en: "Direction 04" },
    "dir.sub": {
      ru: "От умных замков до сетей, видеонаблюдения и аудита — закрываем технические задачи объекта целиком.",
      en: "From smart locks to networks, video surveillance and audits — we cover the technical side of your facility end to end."
    },
    "dir.more": { ru: "Подробнее", en: "Learn more" },
    "dir.back": { ru: "Все направления", en: "All directions" },
    "dir.includes": { ru: "Что входит", en: "What's included" },
    "dir.benefits": { ru: "Что вы получите", en: "What you get" },
    "dir.pdfTitle": { ru: "Каталог продукции INTLOCK", en: "INTLOCK product catalog" },
    "dir.pdfSub": {
      ru: "Замки, контроллеры и оборудование — в одном файле PDF.",
      en: "Locks, controllers and equipment — in a single PDF."
    },
    /* 1. Smart Access Control Systems */
    "dir.access.pageTitle": { ru: "Интеллектуальные системы контроля доступа — INTLOCK", en: "Smart Access Control Systems — INTLOCK" },
    "dir.access.t": { ru: "Интеллектуальные системы контроля и управления доступом", en: "Smart Access Control Systems" },
    "dir.access.d": {
      ru: "Проектируем и внедряем электронные замки, биометрию, RFID-идентификацию и мобильные ключи: от одной двери до сети объектов с единым управлением.",
      en: "We design and deploy electronic locks, biometrics, RFID identification and mobile keys — from a single door to a network of facilities under one management."
    },
    "dir.access.img": { ru: "Умный замок и электронный контроль доступа", en: "Smart lock and electronic access control" },
    "dir.access.b1": { ru: "Электронные замки и цилиндры для дверей, шкафов и сейфов", en: "Electronic locks and cylinders for doors, cabinets and safes" },
    "dir.access.b2": { ru: "Биометрия: отпечаток, лицо, код-пароль", en: "Biometrics: fingerprint, face ID and PIN codes" },
    "dir.access.b3": { ru: "RFID-карты, брелоки и браслеты", en: "RFID cards, key fobs and wristbands" },
    "dir.access.b4": { ru: "Мобильные ключи по Bluetooth и Wi-Fi + журнал событий", en: "Mobile keys over Bluetooth and Wi-Fi with an activity log" },
    "dir.access.c1.t": { ru: "Единый контур", en: "One system" },
    "dir.access.c1.d": { ru: "Выдача и отзыв доступа в один клик по всем точкам — прямо из приложения.", en: "Issue and revoke access in one click across all points, right from the app." },
    "dir.access.c2.t": { ru: "Вход без ключей", en: "Keyless entry" },
    "dir.access.c2.d": { ru: "Гостям и подрядчикам доступ выдаётся на время и заканчивается автоматически.", en: "Guests and contractors get time-limited access that expires automatically." },
    "dir.access.c3.t": { ru: "Полный журнал", en: "Full activity log" },
    "dir.access.c3.d": { ru: "Видно, кто и когда открывал дверь — удобно для аренды, отелей и офисов.", en: "You see who opened each door and when — ideal for rentals, hotels and offices." },
    /* 2. Enterprise Wi-Fi Infrastructure */
    "dir.wifi.pageTitle": { ru: "Enterprise Wi-Fi сети — INTLOCK", en: "Enterprise Wi-Fi Infrastructure — INTLOCK" },
    "dir.wifi.t": { ru: "Профессиональные Wi-Fi сети высокой плотности", en: "Enterprise Wi-Fi Infrastructure" },
    "dir.wifi.d": {
      ru: "Проектируем, разворачиваем и обслуживаем корпоративные Wi-Fi сети: стабильный сигнал при сотнях одновременных клиентов, изолированные сегменты и удалённый мониторинг.",
      en: "We design, deploy and maintain enterprise Wi-Fi: stable coverage with hundreds of concurrent clients, isolated segments and remote monitoring."
    },
    "dir.wifi.img": { ru: "Точки доступа корпоративной Wi-Fi сети", en: "Enterprise Wi-Fi access points" },
    "dir.wifi.b1": { ru: "Обследование объекта и радиопланирование", en: "Site survey and radio planning" },
    "dir.wifi.b2": { ru: "Точки доступа Enterprise-класса и контроллеры", en: "Enterprise-grade access points and controllers" },
    "dir.wifi.b3": { ru: "Гостевой портал, VLAN и изоляция трафика", en: "Guest portal, VLANs and traffic isolation" },
    "dir.wifi.b4": { ru: "Мониторинг, обновления и выезд инженера", en: "Monitoring, updates and on-site engineer support" },
    "dir.wifi.c1.t": { ru: "Инженерный расчёт", en: "Engineering" },
    "dir.wifi.c1.d": { ru: "Считаем покрытие по планам объекта и подбираем оборудование под задачи, а не наоборот.", en: "We calculate coverage from your floor plans and pick hardware around your tasks." },
    "dir.wifi.c2.t": { ru: "Масштабируемость", en: "Scalability" },
    "dir.wifi.c2.d": { ru: "Добавили этаж, зал или точку продаж — сеть расширяется без переделки.", en: "Add a floor, hall or POS terminal — the network grows without rework." },
    "dir.wifi.c3.t": { ru: "Стабильность", en: "Reliability" },
    "dir.wifi.c3.d": { ru: "Резервирование, регулярные обновления и поддержка при инцидентах.", en: "Redundancy, regular updates and support when an incident happens." },
    /* 3. Professional Video Surveillance (CCTV) */
    "dir.video.pageTitle": { ru: "Профессиональное видеонаблюдение (CCTV) — INTLOCK", en: "Professional Video Surveillance (CCTV) — INTLOCK" },
    "dir.video.t": { ru: "Профессиональные системы видеонаблюдения (CCTV)", en: "Professional Video Surveillance (CCTV)" },
    "dir.video.d": {
      ru: "Строим системы видеонаблюдения под задачи объекта: чёткое изображение день и ночь, видеоаналитика, запись и удалённый доступ к архиву с телефона или из диспетчерской.",
      en: "We build CCTV around your facility's needs: sharp image day and night, video analytics, recording and remote access to the archive from your phone or a control room."
    },
    "dir.video.img": { ru: "Камера видеонаблюдения на объекте", en: "Security camera on site" },
    "dir.video.b1": { ru: "IP-камеры 4K, тепловизоры и подсветка периметра", en: "4K IP cameras, thermal imaging and perimeter lighting" },
    "dir.video.b2": { ru: "Видеоаналитика: периметр, лица, потоки, присутствие", en: "Video analytics: perimeter, faces, queues and loitering" },
    "dir.video.b3": { ru: "Регистраторы NVR/VMS и архив до 90 дней", en: "NVR/VMS recorders and up to 90 days of archive" },
    "dir.video.b4": { ru: "Интеграция с сигнализацией, домофонией и системами доступа", en: "Integration with alarms, intercoms and access control systems" },
    "dir.video.c1.t": { ru: "Ясно в любую погоду", en: "Clear in any weather" },
    "dir.video.c1.d": { ru: "Подбираем объективы и подсветку, чтобы лица и номера читались ночью и под дождём.", en: "We pick lenses and lighting so faces and plates stay readable at night and in the rain." },
    "dir.video.c2.t": { ru: "Видеоаналитика", en: "Video analytics" },
    "dir.video.c2.d": { ru: "Система сама находит нужные кадры: движение, лица, нарушение периметра.", en: "The system finds the right frames itself: motion, faces, perimeter breaches." },
    "dir.video.c3.t": { ru: "Мониторинг 24/7", en: "Monitoring 24/7" },
    "dir.video.c3.d": { ru: "Уведомления о событиях приходят на телефон, архив доступен из любой точки мира.", en: "Event alerts go to your phone and the archive is available from anywhere." },
    /* 4. Hospitality Technical Audit & Consulting */
    "dir.audit.pageTitle": { ru: "Аудит и технический консалтинг для гостеприимства — INTLOCK", en: "Hospitality Technical Audit & Consulting — INTLOCK" },
    "dir.audit.t": { ru: "Технический аудит и консалтинг для гостеприимства", en: "Hospitality Technical Audit & Consulting" },
    "dir.audit.d": {
      ru: "Проверяем техническую инфраструктуру отелей и ресторанов, оцениваем защищённость и проходим объект как гость: Mystery Guest и Technical Readiness тесты с отчётом и планом исправлений.",
      en: "We audit the technical infrastructure of hotels and restaurants, assess security and walk the property as a guest: Mystery Guest and Technical Readiness tests with a report and a remediation plan."
    },
    "dir.audit.img": { ru: "Технический аудит отеля", en: "Technical audit of a hotel" },
    "dir.audit.b1": { ru: "Аудит инфраструктуры: сеть, доступ, видеонаблюдение, связь", en: "Infrastructure audit: network, access, video surveillance, communication" },
    "dir.audit.b2": { ru: "Оценка защищённости и уязвимостей", en: "Security and vulnerability assessment" },
    "dir.audit.b3": { ru: "Mystery Guest — тестирование сервиса и доступов", en: "Mystery Guest — service and access testing" },
    "dir.audit.b4": { ru: "Technical Readiness — готовность объекта к открытию", en: "Technical Readiness — pre-opening readiness check" },
    "dir.audit.c1.t": { ru: "Независимая оценка", en: "Independent review" },
    "dir.audit.c1.d": { ru: "Смотрим на объект глазами и гостя, и инженера — без самообмана.", en: "We look at the property as both a guest and an engineer — no self-deception." },
    "dir.audit.c2.t": { ru: "Приоритеты", en: "Priorities" },
    "dir.audit.c2.d": { ru: "Сначала то, что реально рискует деньгам, гостям и репутации.", en: "First fix what actually risks money, guests and reputation." },
    "dir.audit.c3.t": { ru: "План исправлений", en: "Action plan" },
    "dir.audit.c3.d": { ru: "Конкретные шаги, сроки и бюджет — без общих слов.", en: "Concrete steps, deadlines and budget — no vague advice." },
    /* ---------- Подвал ---------- */
    "footer.brand": { ru: "Интеллектуальные системы контроля доступа, Wi-Fi сети, видеонаблюдение и технический аудит. Intelligent Technology Changes Your Life.", en: "Smart access control, enterprise Wi-Fi, video surveillance and technical audits. Intelligent Technology Changes Your Life." },
    "footer.sections": { ru: "Разделы", en: "Sections" },
    "footer.contacts": { ru: "Контакты", en: "Contacts" },
    "footer.city": { ru: "Espana", en: "Espana" },
    "footer.rights": { ru: "Интеллектуальные системы контроля и управления доступом", en: "Smart Access Control Systems" }
  };
  const META = {
    ru: {
      title: "Интеллектуальные системы контроля и управления доступом — INTLOCK",
      description: "INTLOCK: контроль и управление доступом, Wi-Fi сети высокой плотности, видеонаблюдение с видеоаналитикой и технический аудит для гостеприимства. Испания."
    },
    en: {
      title: "Smart Access Control Systems — INTLOCK",
      description: "INTLOCK: access control systems, high-density enterprise Wi-Fi, video surveillance with analytics and technical audits for hospitality. Spain."
    }
  };
  const STORAGE_KEY = "intlock-lang";
  const buttons = Array.from(document.querySelectorAll(".lang-btn"));
  function applyLang(lang) {
    if (!I18N["nav.access"][lang]) lang = "ru";
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const entry = I18N[el.getAttribute("data-i18n")];
      if (entry && entry[lang] !== undefined) el.textContent = entry[lang];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const entry = I18N[el.getAttribute("data-i18n-placeholder")];
      if (entry && entry[lang] !== undefined) el.setAttribute("placeholder", entry[lang]);
    });
    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      const entry = I18N[el.getAttribute("data-i18n-alt")];
      if (entry && entry[lang] !== undefined) el.setAttribute("alt", entry[lang]);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const entry = I18N[el.getAttribute("data-i18n-aria")];
      if (entry && entry[lang] !== undefined) el.setAttribute("aria-label", entry[lang]);
    });
    /* Свои страницы (feedback.html, direction-*.html) задают заголовок через
       data-title-i18n на <body>, остальные берут общий из META */
    const customKey = document.body ? document.body.getAttribute("data-title-i18n") : null;
    const custom = customKey ? I18N[customKey] : null;
    if (custom && custom[lang] !== undefined) {
      document.title = custom[lang];
    } else if (META[lang]) {
      document.title = META[lang].title;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute("content", META[lang].description);
    }
    buttons.forEach((b) => {
      const active = b.getAttribute("data-lang") === lang;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-pressed", String(active));
    });
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* приватный режим */ }
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
  }
  buttons.forEach((b) => b.addEventListener("click", () => applyLang(b.getAttribute("data-lang"))));
  /* Доступ к переводам для других файлов (auth.js, feedback.js) */
  window.INTLOCK_I18N = {
    apply: applyLang,
    get: (key) => I18N[key] || null,
    lang: () => document.documentElement.lang || "ru",
    t(key) {
      const lang = this.lang();
      const entry = I18N[key];
      if (!entry) return key;
      return entry[lang] !== undefined ? entry[lang] : entry.ru;
    }
  };
  let saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* ignore */ }
  const browser = (navigator.language || "ru").toLowerCase();
  applyLang(saved || (browser.indexOf("en") === 0 ? "en" : "ru"));
})();