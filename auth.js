/* ============================================================
   INTLOCK — вход и регистрация
   Кнопка справа в шапке + модальное окно (вкладки Вход / Регистрация).
   Поля: почта, логин, пароль, номер телефона.

   ⚠️ Демо-режим: без сервера. Аккаунты лежат в localStorage этого
   браузера, пароль хранится простым хешем — для реального продакшена
   нужен бэкенд (регистрация, вход, отправка писем).
   ============================================================ */
(function () {
  "use strict";

  const USERS_KEY = "intlock-users";
  const SESSION_KEY = "intlock-session";

  const RE = {
    email: /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i,
    login: /^[A-Za-z0-9_]{3,20}$/,
    phone: /^\+?[0-9\s\-()]{7,20}$/
  };

  const t = (key) => (window.INTLOCK_I18N ? window.INTLOCK_I18N.t(key) : key);

  /* ---------- Хранилище ---------- */
  function loadUsers() {
    try {
      const list = JSON.parse(localStorage.getItem(USERS_KEY));
      return Array.isArray(list) ? list : [];
    } catch (e) {
      return [];
    }
  }
  function saveUsers(list) {
    try { localStorage.setItem(USERS_KEY, JSON.stringify(list)); } catch (e) { /* приватный режим */ }
  }
  function hash(str) {
    let h = 5381;
    for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) >>> 0;
    return h.toString(16);
  }
  function setSession(login) {
    try {
      if (login) localStorage.setItem(SESSION_KEY, login);
      else localStorage.removeItem(SESSION_KEY);
    } catch (e) { /* ignore */ }
  }
  function getSession() {
    try { return localStorage.getItem(SESSION_KEY); } catch (e) { return null; }
  }

  function current() {
    const login = getSession();
    if (!login) return null;
    return loadUsers().find((u) => u.login === login) || null;
  }

  /* ---------- API ---------- */
  function register(data) {
    const login = (data.login || "").trim();
    const email = (data.email || "").trim().toLowerCase();
    const phone = (data.phone || "").trim();
    const password = data.password || "";

    if (!login || !email || !phone || !password) return { err: "auth.err.empty" };
    if (!RE.login.test(login)) return { err: "auth.err.login" };
    if (!RE.email.test(email)) return { err: "auth.err.email" };
    if (!RE.phone.test(phone)) return { err: "auth.err.phone" };
    if (password.length < 6) return { err: "auth.err.password" };

    const users = loadUsers();
    if (users.some((u) => u.login.toLowerCase() === login.toLowerCase() || u.email === email)) {
      return { err: "auth.err.exists" };
    }

    const user = { login, email, phone, pass: hash(password), created: Date.now() };
    users.push(user);
    saveUsers(users);
    setSession(user.login);
    return { ok: true, user };
  }

  function login(id, password) {
    const key = (id || "").trim().toLowerCase();
    if (!key || !password) return { err: "auth.err.empty" };
    const user = loadUsers().find((u) => u.login.toLowerCase() === key || u.email === key);
    if (!user) return { err: "auth.err.nouser" };
    if (user.pass !== hash(password)) return { err: "auth.err.wrongpass" };
    setSession(user.login);
    return { ok: true, user };
  }

  function logout() {
    setSession(null);
    updateAuthUI();
    closeMenu();
  }

  /* ---------- Разметка модального окна ---------- */
  let modal, form, errorBox, subLine, submitBtn, pwdInput, loginLabel;
  let mode = "login";

  function buildModal() {
    modal = document.createElement("div");
    modal.className = "modal";
    modal.id = "authModal";
    modal.hidden = true;
    modal.innerHTML = [
      '<div class="modal-backdrop" data-close></div>',
      '<div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="authTitle">',
      '  <button type="button" class="modal-close" data-close aria-label="Закрыть">&times;</button>',
      '  <span class="kicker" data-i18n="auth.kicker">Аккаунт</span>',
      '  <h3 id="authTitle" data-i18n="auth.title">Вход и регистрация</h3>',
      '  <div class="tabs" role="tablist">',
      '    <button type="button" class="tab is-active" data-tab="login" role="tab" data-i18n="auth.tab.login">Вход</button>',
      '    <button type="button" class="tab" data-tab="register" role="tab" data-i18n="auth.tab.register">Регистрация</button>',
      "  </div>",
      '  <p class="modal-sub" id="authSub"></p>',
      '  <form class="auth-form" id="authForm" novalidate>',
      '    <label class="field" data-only="register">',
      '      <span data-i18n="auth.field.email">Почта</span>',
      '      <input type="email" name="email" autocomplete="email" placeholder="you@mail.com" data-i18n-placeholder="auth.ph.email" />',
      "    </label>",
      '    <label class="field">',
      '      <span id="authLoginLabel"></span>',
      '      <input type="text" name="login" autocomplete="username" placeholder="ivan_2026" data-i18n-placeholder="auth.ph.login" />',
      "    </label>",
      '    <label class="field" data-only="register">',
      '      <span data-i18n="auth.field.phone">Номер телефона</span>',
      '      <input type="tel" name="phone" autocomplete="tel" placeholder="+34 642 041 237" data-i18n-placeholder="auth.ph.phone" />',
      "    </label>",
      '    <label class="field">',
      '      <span data-i18n="auth.field.password">Пароль</span>',
      '      <input type="password" name="password" autocomplete="current-password" placeholder="Минимум 6 символов" data-i18n-placeholder="auth.ph.password" />',
      "    </label>",
      '    <p class="form-error" id="authError" role="alert" hidden></p>',
      '    <button type="submit" class="btn btn-primary btn-block" id="authSubmit">Войти</button>',
      "  </form>",
      '  <p class="modal-note" data-i18n="auth.note">Демо-режим: аккаунты хранятся только в этом браузере.</p>',
      "</div>"
    ].join("");
    document.body.appendChild(modal);

    form = document.getElementById("authForm");
    errorBox = document.getElementById("authError");
    subLine = document.getElementById("authSub");
    submitBtn = document.getElementById("authSubmit");
    loginLabel = document.getElementById("authLoginLabel");
    pwdInput = form.querySelector('input[name="password"]');

    modal.querySelectorAll("[data-close]").forEach((el) => el.addEventListener("click", closeModal));
    modal.querySelectorAll(".tab").forEach((tab) => {
      tab.addEventListener("click", () => setMode(tab.getAttribute("data-tab")));
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.hidden) closeModal();
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const res = mode === "login" ? login(data.login, data.password) : register(data);
      if (res.err) {
        errorBox.textContent = t(res.err);
        errorBox.hidden = false;
        return;
      }
      form.reset();
      closeModal();
      updateAuthUI();
    });
  }

  function setMode(next) {
    mode = next === "register" ? "register" : "login";
    if (!modal) return;
    modal.querySelectorAll(".tab").forEach((b) => {
      b.classList.toggle("is-active", b.getAttribute("data-tab") === mode);
    });
    modal.querySelectorAll("[data-only]").forEach((f) => {
      f.hidden = f.getAttribute("data-only") !== mode;
    });
    renderModeTexts();
    errorBox.hidden = true;
  }

  /* Тексты, которые зависят от выбранной вкладки (и языка) */
  function renderModeTexts() {
    subLine.textContent = t(mode === "login" ? "auth.sub.login" : "auth.sub.register");
    submitBtn.textContent = t(mode === "login" ? "auth.submit.login" : "auth.submit.register");
    loginLabel.textContent = t(mode === "login" ? "auth.field.id" : "auth.field.login");
    pwdInput.setAttribute("autocomplete", mode === "login" ? "current-password" : "new-password");
    pwdInput.setAttribute("placeholder", mode === "login" ? "••••••" : t("auth.ph.password"));
  }

  function openModal(next) {
    if (!modal) buildModal();
    setMode(next || "login");
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    closeMenu();
    const first = modal.querySelector('.field:not([hidden]) input');
    if (first) setTimeout(() => first.focus(), 60);
  }
  function closeModal() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    document.body.style.overflow = "";
    errorBox.hidden = true;
  }

  /* ---------- Кнопка в шапке ---------- */
  let menu;

  function mountHeaderButton() {
    const actions = document.querySelector(".nav-actions");
    if (!actions || document.getElementById("authBtn")) return;

    const wrap = document.createElement("div");
    wrap.className = "auth";
    wrap.innerHTML = [
      '<button type="button" class="btn btn-ghost btn-sm" id="authBtn" aria-haspopup="true" aria-expanded="false">',
      '  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">',
      '    <circle cx="12" cy="8.5" r="3.5" stroke="currentColor" stroke-width="1.7"/>',
      '    <path d="M4.5 20c1-3.6 4-5.5 7.5-5.5s6.5 1.9 7.5 5.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>',
      "  </svg>",
      '  <span class="auth-label"></span>',
      "</button>",
      '<div class="auth-menu" id="authMenu" role="menu" hidden>',
      '  <small data-i18n="auth.signedAs">Вы вошли как</small>',
      '  <strong id="authMenuName"></strong>',
      '  <button type="button" class="btn btn-ghost btn-sm btn-block" id="authLogout" data-i18n="auth.logout">Выйти</button>',
      "</div>"
    ].join("");

    // Справа: язык · вход · «Написать нам» · бургер
    const cta = actions.querySelector(".btn-primary");
    if (cta) actions.insertBefore(wrap, cta);
    else actions.appendChild(wrap);

    menu = document.getElementById("authMenu");
    document.getElementById("authBtn").addEventListener("click", (e) => {
      e.stopPropagation();
      const user = current();
      if (!user) { openModal("login"); return; }
      const open = menu.hidden;
      menu.hidden = !open;
      document.getElementById("authBtn").setAttribute("aria-expanded", String(open));
    });
    document.getElementById("authLogout").addEventListener("click", logout);
    document.addEventListener("click", (e) => {
      if (menu && !menu.hidden && !wrap.contains(e.target)) closeMenu();
    });

    // Переводим только что вставленную разметку текущим языком
    if (window.INTLOCK_I18N) window.INTLOCK_I18N.apply(window.INTLOCK_I18N.lang());
    updateAuthUI();
  }

  function closeMenu() {
    if (!menu) return;
    menu.hidden = true;
    const btn = document.getElementById("authBtn");
    if (btn) btn.setAttribute("aria-expanded", "false");
  }

  function updateAuthUI() {
    const btn = document.getElementById("authBtn");
    if (!btn) return;
    const user = current();
    const label = btn.querySelector(".auth-label");

    if (user) {
      label.textContent = "@" + user.login;
      btn.setAttribute("aria-label", user.login);
      btn.classList.add("is-user");
      document.getElementById("authMenuName").textContent = user.login;
    } else {
      label.textContent = t("auth.btn");
      btn.setAttribute("aria-label", t("auth.btn"));
      btn.classList.remove("is-user");
      closeMenu();
    }
    document.dispatchEvent(new CustomEvent("authchange", { detail: { user } }));
  }

  /* Смена языка перерисовывает тексты, зависящие от вкладки */
  document.addEventListener("langchange", () => {
    if (modal && !modal.hidden) renderModeTexts();
    updateAuthUI();
  });

  function init() {
    buildModal();
    mountHeaderButton();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  window.INTLOCK_AUTH = {
    current,
    register,
    login,
    logout,
    open: openModal,
    close: closeModal,
    refresh: updateAuthUI
  };
})();
