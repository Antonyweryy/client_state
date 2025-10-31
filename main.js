const WORKER_URL = "https://clientstate.teunser.workers.dev";

async function initApp() {
  const tg = Telegram.WebApp;
  tg.ready();
  
  if (!tg.initData) {
    document.getElementById("app").innerHTML = "<h3>Ошибка: нет initData</h3>";
    return;
  }
  
  try {
    // ИСПРАВЛЕНО: было fetch`...`, должно быть fetch(...)
    const res = await fetch(`${WORKER_URL}/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ initData: tg.initData }),
    });
    
    if (!res.ok) {
      const errText = await res.text();
      document.getElementById("app").innerHTML = `<h3>Ошибка сервера: ${errText}</h3>`;
      return;
    }
    
    const html = await res.text();
    document.getElementById("app").innerHTML = html;
  } catch (err) {
    console.error("Ошибка fetch:", err);
    document.getElementById("app").innerHTML = `<h3>Ошибка сети: ${err.message}</h3>`;
  }
}

initApp();
