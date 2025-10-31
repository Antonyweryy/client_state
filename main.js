const WORKER_URL = "https://clientstate.teunser.workers.dev/";

async function initApp() {
  Telegram.WebApp.ready();
  const user = Telegram.WebApp.initDataUnsafe.user;
  if (!user) return document.getElementById("app").innerHTML = "Ошибка";

  // Проверяем роль
  const res = await fetch(`${WORKER_URL}/getRole?user_id=${user.id}`);
  const html = await res.text();

  // Показываем нужный интерфейс
  document.getElementById("app").innerHTML = html;
}

initApp();
