const WORKER_URL = "https://clientstate.teunser.workers.dev";

async function initApp() {
  Telegram.WebApp.ready();
  const tg = Telegram.WebApp;

  const res = await fetch(`${WORKER_URL}/validate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ initData: tg.initData }),
  });

  const html = await res.text();
  document.getElementById("app").innerHTML = html;
}

initApp();
