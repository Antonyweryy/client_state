// main.js

const WORKER_URL = "https://clientstate.teunser.workers.dev"; // твой воркер

async function initApp() {
  // Telegram WebApp ready
  const tg = Telegram.WebApp;
  tg.ready();

  // Проверка, что initData есть
  if (!tg.initData) {
    document.getElementById("app").innerHTML = "<h3>Ошибка: нет initData</h3>";
    return;
  }

  try {
    // Отправляем initData воркеру
    const res = await fetch(`${WORKER_URL}/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ initData: tg.initData }),
    });

    // Проверяем статус
    if (!res.ok) {
      const errText = await res.text();
      document.getElementById("app").innerHTML = `<h3>Ошибка сервера: ${errText}</h3>`;
      return;
    }

    // Получаем HTML от воркера
    const html = await res.text();

    // Вставляем в DOM
    document.getElementById("app").innerHTML = html;

  } catch (err) {
    console.error("Ошибка fetch:", err);
    document.getElementById("app").innerHTML = `<h3>Ошибка сети: ${err.message}</h3>`;
  }
}

// Инициализация приложения
initApp();
