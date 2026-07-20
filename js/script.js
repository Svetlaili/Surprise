const TEST_MODE = true;
const FAST_MODE = true;

const unlock = new Date("2026-07-24T12:30:00Z");

const WAIT = FAST_MODE ? 2500 : 7000;
const LETTER = FAST_MODE ? 240 : 180;

const countdown = document.getElementById("countdown");
const status = document.getElementById("status");
const destination = document.getElementById("destination");
const routes = document.getElementById("routes");
const finalScreen = document.getElementById("final");
const flightNumber = document.getElementById("flight-number");

let started = false;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function pad(n) {
    return String(n).padStart(2, "0");
}

function updateCountdown() {

    if (TEST_MODE) {
        start();
        return;
    }

    const diff = unlock - new Date();

    if (diff <= 0) {
        start();
        return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor(diff % 86400000 / 3600000);
    const minutes = Math.floor(diff % 3600000 / 60000);
    const seconds = Math.floor(diff % 60000 / 1000);

    countdown.textContent =
        `${pad(days)}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;

}

async function type(text) {

    status.textContent = "";

    for (const ch of text) {

        status.textContent += ch;

        await sleep(35);

    }

}

async function start() {

    if (started) return;

    started = true;

    countdown.style.display = "none";

    await type("Searching secure destination database...");
    await sleep(WAIT);

    await type("Loading passenger itinerary...");
    await sleep(WAIT);

  // Разкриване на номера на полета

  flightNumber.textContent = " ████";

  await sleep(400);

  const flight = "4323";

  flightNumber.textContent = " ";

  for (const digit of flight) {

      flightNumber.textContent += digit;

      await sleep(120);

  }

    await type("Checking Schengen entry...");
    await sleep(WAIT);

    await type("Multiple valid routes found...");

    routes.style.display = "block";

    const fr = document.getElementById("route-fr");
    const ch = document.getElementById("route-ch");
    const de = document.getElementById("route-de");

    fr.style.fontWeight = "normal";
    ch.style.fontWeight = "normal";
    de.style.fontWeight = "normal";

    const highlight = async (el) => {

        [fr, ch, de].forEach(item => {

            item.style.color = "#777";
            item.style.fontWeight = "normal";

        });

        fr.textContent = "France";
        ch.textContent = "Switzerland";
        de.textContent = "Germany";

        el.style.color = "#f4c542";
        el.style.fontWeight = "700";
        el.textContent = "▶ " + el.textContent;

    };

    await sleep(WAIT / 2);

    await highlight(fr);
    await sleep(1500);

    await highlight(ch);
    await sleep(1500);

    await highlight(de);
    await sleep(1500);

    await highlight(fr);
    await sleep(1500);

    await highlight(ch);
    await sleep(1500);

    await type("Selecting optimal destination...");

    await highlight(fr);

    await sleep(2000);
    const word = "FRANCE";

    destination.textContent = "██████";

    await sleep(500);

    for (let i = 1; i <= word.length; i++) {

        destination.textContent =
            word.substring(0, i) +
            "█".repeat(word.length - i);

        await sleep(LETTER);

    }

    await sleep(600);

    await type("Destination confirmed.");

    // сменяме стрелката с отметка
    fr.textContent = "✓ France";
    fr.style.color = "#8fd14f";   // по желание - зелено
    fr.style.fontWeight = "700";

    await sleep(3000);

    const board = document.querySelector(".board");

    board.style.opacity = "0";

    await sleep(1500);

    board.style.display = "none";

    finalScreen.style.display = "flex";

    requestAnimationFrame(() => {

        finalScreen.classList.add("show");

    });

}

updateCountdown();

setInterval(updateCountdown, 1000);
