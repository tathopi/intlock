/* ============================================================
   INTLOCK — страница «Обратная связь»
   Сообщение можно отправить только авторизованному пользователю:
   без входа показывается блок с кнопкой «Войти или зарегистрироваться».

   Куда уходят сообщения:
   - FEEDBACK_ENDPOINT заполнен → сообщение уходит письмом на вашу почту
     (Formspree/FormSubmit — инструкция в README, раздел «Обратная связь на почту»);
   - FEEDBACK_ENDPOINT пуст (текущий демо-режим) → сообщение сохраняется
     только в localStorage этого браузера, письма нет.
   ============================================================ */
(function () {
  "use strict";

  /* ✉️ АДРЕС ДЛЯ ПИСЕМ: вставьте сюда ссылку своего сервиса форм,
     например "https://formspree.io/f/ваш_код" — и сообщения с сайта
     начнут приходить на почту. Пустая строка = демо-режим без писем. */
  const FEEDBACK_ENDPOINT = "";

  const MESSAGES_KEY = "intlock-messages";
  const t = (key) => (window.INTLOCK_I18N ? window.INTLOCK_I18N.t(key) : key);
  const auth = () => window.INTLOCK_AUTH || null;

  const locked = document.getElementById("fbLocked");
  const form = document.getElementById("fbForm");
  const userLine = document.getElementById("fbUser");
  const textarea = document.getElementById("fbText");
  const errorBox = document.getElementById("fbError");
  const success = document.getElementById("fbSuccess");
  const loginBtn = document.getElementById("fbLoginBtn");

  let successTimer = null;

  function saveMessage(msg) {
    try {
      const parsed = JSON.parse(localStorage.getItem(MESSAGES_KEY));
      const list = Array.isArray(parsed) ? parsed : [];
      list.push(msg);
      localStorage.setItem(MESSAGES_KEY, JSON.stringify(list));
    } catch (e) { /* приватный режим */ }
  }

  function showError(text) {
    errorBox.textContent = text;
    errorBox.hidden = false;
  }

  function render() {
    const user = auth() ? auth().current() : null;
    if (user) {
      locked.hidden = true;
      form.hidden = false;
      userLine.textContent = `${t("feedback.as")} @${user.login} · ${user.email}`;
    } else {
      locked.hidden = false;
      form.hidden = true;
      errorBox.hidden = true;
      if (success) success.hidden = true;
    }
  }

  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      if (auth()) auth().open("login");
    });
  }

  async function sendMessage(msg) {
    /* Письмо на почту владельцу (если настроен FEEDBACK_ENDPOINT) */
    if (FEEDBACK_ENDPOINT) {
      const res = await fetch(FEEDBACK_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: "INTLOCK — сообщение с сайта",
          email: msg.email,          /* почта клиента — отвечать прямо на неё */
          login: msg.login,
          phone: msg.phone || "—",
          message: msg.text,
          date: msg.date
        })
      });
      if (!res.ok) throw new Error("send failed");
    }
    saveMessage(msg); /* копия остаётся в браузере для истории демо */
  }

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const api = auth();
      const user = api ? api.current() : null;
      if (!user) { render(); if (api) api.open("login"); return; }

      const text = (textarea.value || "").trim();
      if (text.length < 10) {
        showError(t("feedback.empty"));
        textarea.focus();
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;

      const msg = {
        login: user.login,
        email: user.email,
        phone: user.phone,
        text,
        date: new Date().toISOString()
      };

      try {
        await sendMessage(msg);
        textarea.value = "";
        errorBox.hidden = true;
        success.hidden = false;
        if (successTimer) clearTimeout(successTimer);
        successTimer = setTimeout(() => { success.hidden = true; }, 6000);
      } catch (err) {
        showError(t("feedback.sendError"));
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });

    textarea.addEventListener("input", () => {
      if (!errorBox.hidden) errorBox.hidden = true;
    });
  }

  /* Смена языка: строка «Вы вошли как» и состояние формы
     (заголовок страницы общий — data-title-i18n в i18n.js) */
  document.addEventListener("langchange", render);
  document.addEventListener("authchange", render);

  render();
})();
