
/* ==========================================
   CARCONSTRUCTOR NOVA
   Основная логика автомобильного конструктора
========================================== */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const STORAGE_KEY = "carConstructorGarageV1";

/* ---------- Кузова ---------- */

const bodies = {
  sedan: {
    name: "Седан",
    short: "SEDAN",
    icon: "▰",
    description: "Универсальный автомобиль с классическим силуэтом.",
    weight: 1450,
    drag: 0.29,
    acceleration: 7.2
  },
  coupe: {
    name: "Купе",
    short: "COUPE",
    icon: "◩",
    description: "Спортивный двухдверный силуэт с низкой крышей.",
    weight: 1380,
    drag: 0.27,
    acceleration: 6.8
  },
  hatchback: {
    name: "Хэтчбек",
    short: "HATCHBACK",
    icon: "▱",
    description: "Компактный кузов для города.",
    weight: 1250,
    drag: 0.31,
    acceleration: 7.9
  },
  suv: {
    name: "Кроссовер",
    short: "SUV",
    icon: "▰",
    description: "Высокий кузов с увеличенным дорожным просветом.",
    weight: 1750,
    drag: 0.34,
    acceleration: 8.2
  },
  wagon: {
    name: "Универсал",
    short: "WAGON",
    icon: "▱",
    description: "Практичный кузов с удлинённой задней частью.",
    weight: 1520,
    drag: 0.30,
    acceleration: 7.6
  },
  sport: {
    name: "Суперкар",
    short: "SUPERCAR",
    icon: "◇",
    description: "Низкий спортивный кузов с агрессивными линиями.",
    weight: 1320,
    drag: 0.25,
    acceleration: 4.2
  }
};

/* ---------- Топливо и силовые установки ---------- */

const fuels = {
  petrol: {
    name: "Бензин",
    icon: "ϟ",
    description: "Классический двигатель внутреннего сгорания."
  },
  diesel: {
    name: "Дизель",
    icon: "◈",
    description: "Высокий крутящий момент и экономичность."
  },
  electric: {
    name: "Электро",
    icon: "⚡",
    description: "Электромотор с мгновенной отдачей."
  },
  hybrid: {
    name: "Гибрид",
    icon: "⟲",
    description: "Бензиновый двигатель вместе с электромотором."
  }
};

/* ---------- Двигатели ---------- */

const engines = [
  {
    id: "p16",
    name: "1.6 MPI I4",
    fuel: "petrol",
    power: 110,
    weight: 125,
    price: "Базовый",
    description: "Атмосферный четырёхцилиндровый",
    compatible: ["sedan", "hatchback", "wagon"]
  },
  {
    id: "p20",
    name: "2.0 MPI I4",
    fuel: "petrol",
    power: 150,
    weight: 155,
    price: "Комфорт",
    description: "Атмосферный двигатель",
    compatible: ["sedan", "coupe", "hatchback", "suv", "wagon"]
  },
  {
    id: "p20t",
    name: "2.0 Turbo I4",
    fuel: "petrol",
    power: 250,
    weight: 175,
    price: "Sport",
    description: "Турбированный двигатель",
    compatible: ["sedan", "coupe", "hatchback", "suv", "wagon", "sport"]
  },
  {
    id: "p25t",
    name: "2.5 Turbo I4",
    fuel: "petrol",
    power: 310,
    weight: 195,
    price: "Performance",
    description: "Турбо с увеличенной мощностью",
    compatible: ["sedan", "coupe", "suv", "wagon", "sport"]
  },
  {
    id: "p30v6",
    name: "3.0 V6",
    fuel: "petrol",
    power: 300,
    weight: 205,
    price: "Premium",
    description: "Шестицилиндровый двигатель",
    compatible: ["sedan", "coupe", "suv", "wagon", "sport"]
  },
  {
    id: "p35t",
    name: "3.5 V6 Turbo",
    fuel: "petrol",
    power: 400,
    weight: 225,
    price: "Performance",
    description: "Мощный турбированный V6",
    compatible: ["sedan", "coupe", "suv", "sport"]
  },
  {
    id: "p40v8",
    name: "4.0 V8",
    fuel: "petrol",
    power: 450,
    weight: 255,
    price: "V8",
    description: "Восьмицилиндровый двигатель",
    compatible: ["sedan", "coupe", "suv", "sport"]
  },
  {
    id: "p50v8",
    name: "5.0 V8 Supercharged",
    fuel: "petrol",
    power: 600,
    weight: 285,
    price: "Extreme",
    description: "Компрессорный V8",
    compatible: ["coupe", "sport"]
  },
  {
    id: "p62v12",
       name: "6.2 V12",
    fuel: "petrol",
    power: 700,
    weight: 310,
    price: "Hypercar",
    description: "Двенадцатицилиндровый двигатель",
    compatible: ["coupe", "sport"]
  },

  {
    id: "d16",
    name: "1.6 Diesel I4",
    fuel: "diesel",
    power: 115,
    weight: 155,
    price: "Economy",
    description: "Экономичный дизель",
    compatible: ["sedan", "hatchback", "wagon"]
  },
  {
    id: "d20",
    name: "2.0 Diesel I4",
    fuel: "diesel",
    power: 150,
    weight: 185,
    price: "Comfort",
    description: "Универсальный дизель",
    compatible: ["sedan", "hatchback", "suv", "wagon"]
  },
  {
    id: "d20t",
    name: "2.0 Turbo Diesel",
    fuel: "diesel",
    power: 190,
    weight: 195,
    price: "Touring",
    description: "Турбодизель с высоким моментом",
    compatible: ["sedan", "coupe", "suv", "wagon"]
  },
  {
    id: "d30",
    name: "3.0 Diesel V6",
    fuel: "diesel",
    power: 280,
    weight: 240,
    price: "Premium",
    description: "Мощный дизельный V6",
    compatible: ["sedan", "suv", "wagon"]
  },

  {
    id: "e150",
    name: "Electric 150",
    fuel: "electric",
    power: 150,
    weight: 120,
    price: "City",
    description: "Один электромотор",
    compatible: ["sedan", "hatchback", "wagon"]
  },
  {
    id: "e250",
    name: "Electric 250",
    fuel: "electric",
    power: 250,
    weight: 160,
    price: "Long Range",
    description: "Электропривод увеличенной мощности",
    compatible: ["sedan", "coupe", "hatchback", "suv", "wagon"]
  },
  {
    id: "e400",
    name: "Dual Motor 400",
    fuel: "electric",
    power: 400,
    weight: 210,
    price: "Performance",
    description: "Два электромотора",
    compatible: ["sedan", "coupe", "suv", "wagon", "sport"]
  },
  {
    id: "e600",
    name: "Dual Motor 600",
    fuel: "electric",
    power: 600,
    weight: 250,
    price: "Performance+",
    description: "Высокопроизводительная электрическая установка",
    compatible: ["coupe", "suv", "sport"]
  },
  {
    id: "e900",
    name: "Tri Motor 900",
    fuel: "electric",
    power: 900,
    weight: 300,
    price: "Hyper EV",
    description: "Три электромотора",
    compatible: ["sport"]
  },

  {
    id: "h20",
    name: "2.0 Hybrid",
    fuel: "hybrid",
    power: 180,
    weight: 195,
    price: "Hybrid",
    description: "Бензиновый мотор и электродвигатель",
    compatible: ["sedan", "hatchback", "wagon"]
  },
  {
    id: "h25",
    name: "2.5 Hybrid AWD",
    fuel: "hybrid",
    power: 250,
    weight: 225,
    price: "Hybrid AWD",
    description: "Гибридная установка с полным приводом",
    compatible: ["sedan", "suv", "wagon"]
  },
  {
    id: "h30",
    name: "3.0 Performance Hybrid",
    fuel: "hybrid",
    power: 400,
    weight: 260,
    price: "Sport Hybrid",
    description: "Спортивная гибридная установка",
    compatible: ["coupe", "suv", "sport"]
  }
];

/* ---------- Коробки передач ---------- */

const gearboxes = [
  {
    id: "mt5",
    name: "Механика 5 ст.",
    short: "MT5",
    description: "Пять передач, механическое переключение.",
    compatibleFuel: ["petrol", "diesel"],
    maxPower: 300
  },
  {
    id: "mt6",
    name: "Механика 6 ст.",
    short: "MT6",
    description: "Шесть передач для активной езды.",
    compatibleFuel: ["petrol", "diesel"],
    maxPower: 450
  },
  {
    id: "at6",
    name: "Автомат 6 ст.",
    short: "AT6",
    description: "Классическая автоматическая коробка.",
    compatibleFuel: ["petrol", "diesel", "hybrid"],
    maxPower: 350
  },
  {
    id: "at8",
    name: "Автомат 8 ст.",
    short: "AT8",
    description: "Плавное переключение и широкий диапазон передач.",
    compatibleFuel: ["petrol", "diesel", "hybrid"],
    maxPower: 650
  },
  {
    id: "dct7",
    name: "Робот DCT 7 ст.",
    short: "DCT7",
    description: "Два сцепления для быстрых переключений.",
    compatibleFuel: ["petrol", "hybrid"],
    maxPower: 650
  },
  {
    id: "cvt",
    name: "Вариатор CVT",
    short: "CVT",
       description: "Плавное изменение передаточного отношения.",
    compatibleFuel: ["petrol", "hybrid"],
    maxPower: 250
  },
  {
    id: "ev1",
    name: "Одноступенчатый редуктор",
    short: "EV",
    description: "Редуктор для электрической силовой установки.",
    compatibleFuel: ["electric"],
    maxPower: 700
  },
  {
    id: "ev2",
    name: "Двухступенчатый редуктор",
    short: "EV2",
    description: "Две ступени для высокопроизводительного электропривода.",
    compatibleFuel: ["electric"],
    maxPower: 1000
  }
];

/* ---------- Приводы ---------- */

const drives = [
  {
    id: "fwd",
    name: "Передний",
    short: "FWD",
    description: "Передние колёса ведущие.",
    icon: "↗",
    maxPower: 350
  },
  {
    id: "rwd",
    name: "Задний",
    short: "RWD",
    description: "Задние колёса ведущие.",
    icon: "↘",
    maxPower: 800
  },
  {
    id: "awd",
    name: "Полный",
    short: "AWD",
    description: "Мощность передаётся на обе оси.",
    icon: "⤢",
    maxPower: 1000
  }
];

/* ---------- Цвета ---------- */

const colors = [
  { id: "blue", name: "Obsidian Blue", hex: "#225da1" },
  { id: "cyan", name: "Electric Cyan", hex: "#25b7d9" },
  { id: "purple", name: "Nebula Purple", hex: "#7959c9" },
  { id: "red", name: "Racing Red", hex: "#c73946" },
  { id: "white", name: "Pearl White", hex: "#d9e0e9" },
  { id: "black", name: "Midnight Black", hex: "#303b49" },
  { id: "silver", name: "Titanium Silver", hex: "#8996a4" },
  { id: "green", name: "Emerald Green", hex: "#287b63" },
  { id: "orange", name: "Solar Orange", hex: "#d77b37" },
  { id: "yellow", name: "Volt Yellow", hex: "#d6c542" },
  { id: "gray", name: "Graphite Gray", hex: "#5b6571" },
  { id: "pink", name: "Neon Pink", hex: "#d75f9d" }
];

const wheelOptions = [
  { id: "18", name: "18″", description: "Комфортные колёса" },
  { id: "19", name: "19″", description: "Универсальный размер" },
  { id: "20", name: "20″", description: "Спортивный стиль" },
  { id: "21", name: "21″", description: "Максимальный акцент" }
];

/* ---------- Состояние ---------- */

const defaultConfig = {
  body: "sedan",
  fuel: "petrol",
  engine: "p20t",
  gearbox: "at8",
  drive: "fwd",
  color: "blue",
  wheels: "19",
  boost: false
};

let config = { ...defaultConfig };
let currentStep = 0;
let garage = loadGarage();

/* ---------- Начало ---------- */

document.addEventListener("DOMContentLoaded", init);

function init() {
  $("#currentYear").textContent = new Date().getFullYear();

  repairCompatibility();
  bindEvents();
  renderAll();
  setupScrollEffects();
}

/* ---------- Сохранение ---------- */

function loadGarage() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    console.warn("Не удалось прочитать гараж:", error);
    return [];
  }
}

function saveGarageStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(garage));
  } catch (error) {
    showToast("Не удалось сохранить данные в браузере.");
  }
}

/* ---------- Поиск текущих параметров ---------- */

function getEngine() {
  return engines.find(engine => engine.id === config.engine) || engines[0];
}

function getBody() {
  return bodies[config.body] || bodies.sedan;
}

function getColor() {
  return colors.find(color => color.id === config.color) || colors[0];
}

function getGearbox() {
  return gearboxes.find(box => box.id === config.gearbox) || gearboxes[0];
}

function getDrive() {
  return drives.find(drive => drive.id === config.drive) || drives[0];
}

function getWeight() {
  const engine = getEngine();
  const body = getBody();

  let weight = body.weight + engine.weight;

  if (config.drive === "awd") weight += 65;
  if (config.drive === "rwd") weight += 20;
  if (config.fuel === "electric") weight += 280;
  if (config.fuel === "hybrid") weight += 120;
  if (config.wheels === "20") weight += 8;
  if (config.wheels === "21") weight += 15;

  return Math.round(weight);
}
function getAcceleration() {
  const engine = getEngine();
  const weight = getWeight();

  let result = getBody().acceleration;

  result *= Math.sqrt(weight / 1500);
  result *= Math.sqrt(250 / Math.max(engine.power, 50));

  if (config.drive === "awd") result *= .88;
  if (config.fuel === "electric") result *= .82;
  if (config.fuel === "hybrid") result *= .94;
  if (config.boost) result *= .92;

  return Math.max(2.2, Number(result.toFixed(1)));
}

/* ---------- Совместимость ---------- */

function getCompatibleEngines() {
  return engines.filter(engine => {
    return engine.fuel === config.fuel &&
      engine.compatible.includes(config.body);
  });
}

function getCompatibleGearboxes() {
  const engine = getEngine();

  return gearboxes.filter(box => {
    return box.compatibleFuel.includes(config.fuel) &&
      engine.power <= box.maxPower;
  });
}

function getCompatibleDrives() {
  const engine = getEngine();

  return drives.filter(drive => {
    if (engine.power > drive.maxPower) return false;

    if (config.body === "suv" && drive.id === "fwd" && engine.power > 250) {
      return false;
    }

    if (config.fuel === "electric" && engine.power >= 400 && drive.id === "fwd") {
      return false;
    }

    if (config.body === "sport" && drive.id === "fwd" && engine.power > 250) {
      return false;
    }

    return true;
  });
}

function repairCompatibility() {
  const availableEngines = getCompatibleEngines();

  if (!availableEngines.some(engine => engine.id === config.engine)) {
    config.engine = availableEngines[0]?.id || engines[0].id;
  }

  const availableBoxes = getCompatibleGearboxes();

  if (!availableBoxes.some(box => box.id === config.gearbox)) {
    config.gearbox = availableBoxes[0]?.id || gearboxes[0].id;
  }

  const availableDrives = getCompatibleDrives();

  if (!availableDrives.some(drive => drive.id === config.drive)) {
    config.drive = availableDrives[0]?.id || drives[0].id;
  }
}

/* ---------- События ---------- */

function bindEvents() {
  $("#stepTabs").addEventListener("click", event => {
    const button = event.target.closest("[data-step]");
    if (!button) return;

    currentStep = Number(button.dataset.step);
    renderStep();
  });

  $("#backButton").addEventListener("click", () => {
    if (currentStep > 0) {
      currentStep--;
      renderStep();
    }
  });

  $("#nextButton").addEventListener("click", () => {
    if (currentStep < 3) {
      currentStep++;
      renderStep();
    } else {
      $("#constructor").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      showToast("Проверь характеристики и сохрани свою сборку.");
    }
  });

  $("#optionContent").addEventListener("click", handleOptionClick);

  $("#saveCarButton").addEventListener("click", saveCurrentCar);

  $("#garageGrid").addEventListener("click", handleGarageClick);

  $("#menuToggle").addEventListener("click", () => {
    $("nav").classList.toggle("open");
  });

  $$("nav a").forEach(link => {
    link.addEventListener("click", () => {
      $("nav").classList.remove("open");
    });
  });

  $("#modalCloseButton").addEventListener("click", closeModal);
  $("#modalOkButton").addEventListener("click", closeModal);

  $("#modalBackdrop").addEventListener("click", event => {
    if (event.target === $("#modalBackdrop")) closeModal();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeModal();
  });
}

function handleOptionClick(event) {
  const button = event.target.closest("[data-type][data-value]");
  if (!button || button.disabled) return;

  const type = button.dataset.type;
  const value = button.dataset.value;

  if (type === "body") {
    config.body = value;
    repairCompatibility();
  } else if (type === "fuel") {
    config.fuel = value;
    repairCompatibility();
  } else if (type === "engine") {
    config.engine = value;
    repairCompatibility();
  } else if (type === "gearbox") {
    config.gearbox = value;
       repairCompatibility();
  } else if (type === "drive") {
    config.drive = value;
    repairCompatibility();
  } else if (type === "color") {
    config.color = value;
  } else if (type === "wheels") {
    config.wheels = value;
  } else if (type === "boost") {
    config.boost = !config.boost;
  }

  renderAll();
}

/* ---------- Отрисовка ---------- */

function renderAll() {
  renderStep();
  renderCarPreviews();
  renderSummary();
  renderGarage();
}

function renderStep() {
  $$(".step-tab").forEach(tab => {
    tab.classList.toggle("selected", Number(tab.dataset.step) === currentStep);
  });

  const titles = [
    {
      eyebrow: "STEP 01 / BODY",
      title: "Выбери характер кузова",
      description: "Силуэт автомобиля изменится сразу после выбора."
    },
    {
      eyebrow: "STEP 02 / POWER",
      title: "Сердце автомобиля",
      description: "Выбери топливо и двигатель под свой стиль."
    },
    {
      eyebrow: "STEP 03 / TRANSMISSION",
      title: "Передача мощности",
      description: "Подбери коробку передач и тип привода."
    },
    {
      eyebrow: "STEP 04 / DESIGN",
      title: "Последние штрихи",
      description: "Настрой цвет, колёса и спортивный режим."
    }
  ];

  const step = titles[currentStep];

  $("#stepEyebrow").textContent = step.eyebrow;
  $("#stepTitle").textContent = step.title;
  $("#stepDescription").textContent = step.description;
  $("#stepNumber").textContent = `0${currentStep + 1}`;
  $("#footerStepLabel").textContent = `ШАГ ${currentStep + 1} ИЗ 4`;

  $("#backButton").disabled = currentStep === 0;
  $("#nextButton").textContent = currentStep === 3 ? "Завершить ✓" : "Далее →";

  const content = $("#optionContent");
  content.innerHTML = "";

  if (currentStep === 0) renderBodyOptions(content);
  if (currentStep === 1) renderEngineOptions(content);
  if (currentStep === 2) renderTransmissionOptions(content);
  if (currentStep === 3) renderDesignOptions(content);
}

function renderBodyOptions(container) {
  const bodyOptions = Object.entries(bodies).map(([id, body]) => ({
    id,
    name: body.name,
    description: body.description,
    icon: body.icon,
    meta: body.short
  }));

  container.append(
    createOptionGroup(
      "ТИП КУЗОВА",
      bodyOptions,
      config.body,
      "body"
    )
  );
}

function renderEngineOptions(container) {
  const fuelOptions = Object.entries(fuels).map(([id, fuel]) => ({
    id,
    name: fuel.name,
    description: fuel.description,
    icon: fuel.icon
  }));

  container.append(
    createOptionGroup(
      "СИЛОВАЯ УСТАНОВКА",
      fuelOptions,
      config.fuel,
      "fuel"
    )
  );

  const compatibleEngines = getCompatibleEngines();

  const engineOptions = compatibleEngines.map(engine => ({
    id: engine.id,
    name: engine.name,
    description: engine.description,
    meta: `${engine.power} л.с. · ${engine.price}`,
    icon: "⚙"
  }));

  container.append(
    createOptionGroup(
      `ДОСТУПНЫЕ ДВИГАТЕЛИ · ${engineOptions.length}`,
      engineOptions,
      config.engine,
      "engine"
    )
  );
}

function renderTransmissionOptions(container) {
  const gearboxOptions = getCompatibleGearboxes().map(box => ({
    id: box.id,
    name: box.name,
    description: box.description,
    meta: box.short,
    icon: "⚙"
  }));

  container.append(
    createOptionGroup(
      "КОРОБКА ПЕРЕДАЧ",
      gearboxOptions,
      config.gearbox,
      "gearbox"
    )
  );

  const driveOptions = getCompatibleDrives().map(drive => ({
    id: drive.id,
    name: drive.name,
    description: drive.description,
    meta: drive.short,
    icon: drive.icon
  }));

  container.append(
    createOptionGroup(
      "ТИП ПРИВОДА",
      driveOptions,
      config.drive,
      "drive"
    )
  );
}

function renderDesignOptions(container) {
  const colorGroup = document.createElement("div");
  colorGroup.className = "option-group";

  const colorLabel = document.createElement("span");
  colorLabel.className = "option-label";
     colorLabel.textContent = "ЦВЕТ КУЗОВА";

  const swatchGrid = document.createElement("div");
  swatchGrid.className = "swatch-grid";

  colors.forEach(color => {
    const button = document.createElement("button");
    button.className = "swatch-option";
    button.dataset.type = "color";
    button.dataset.value = color.id;
    button.title = color.name;

    if (color.id === config.color) button.classList.add("selected");

    const swatch = document.createElement("span");
    swatch.className = "swatch";
    swatch.style.background = color.hex;

    const name = document.createElement("span");
    name.textContent = color.name.split(" ")[0];

    button.append(swatch, name);
    swatchGrid.append(button);
  });

  colorGroup.append(colorLabel, swatchGrid);
  container.append(colorGroup);

  const wheelOptionsGroup = wheelOptions.map(wheel => ({
    id: wheel.id,
    name: wheel.name,
    description: wheel.description,
    icon: "◉"
  }));

  container.append(
    createOptionGroup(
      "РАЗМЕР КОЛЁС",
      wheelOptionsGroup,
      config.wheels,
      "wheels"
    )
  );

  const boostGroup = document.createElement("div");
  boostGroup.className = "option-group";

  const boostLabel = document.createElement("span");
  boostLabel.className = "option-label";
  boostLabel.textContent = "РЕЖИМ ДВИГАТЕЛЯ";

  const boostButton = document.createElement("button");
  boostButton.className = `option-card ${config.boost ? "selected" : ""}`;
  boostButton.dataset.type = "boost";
  boostButton.dataset.value = "boost";

  boostButton.innerHTML = `
    <span class="option-icon">ϟ</span>
    <strong>Performance Boost</strong>
    <small>Расчётный спортивный режим с небольшим изменением характеристик.</small>
    <span class="option-meta">${config.boost ? "АКТИВЕН" : "ВЫКЛЮЧЕН"}</span>
  `;

  boostGroup.append(boostLabel, boostButton);
  container.append(boostGroup);
}

function createOptionGroup(title, options, selected, type) {
  const group = document.createElement("div");
  group.className = "option-group";

  const label = document.createElement("span");
  label.className = "option-label";
  label.textContent = title;

  const grid = document.createElement("div");
  grid.className = "option-grid";

  options.forEach(option => {
    const button = document.createElement("button");
    button.className = "option-card";
    button.dataset.type = type;
    button.dataset.value = option.id;

    if (String(option.id) === String(selected)) {
      button.classList.add("selected");
    }

    button.innerHTML = `
      <span class="option-icon">${escapeHTML(option.icon || "◇")}</span>
      <strong>${escapeHTML(option.name)}</strong>
      ${option.description ? `<small>${escapeHTML(option.description)}</small>` : ""}
      ${option.meta ? `<span class="option-meta">${escapeHTML(option.meta)}</span>` : ""}
    `;

    grid.append(button);
  });

  group.append(label, grid);
  return group;
}

/* ---------- Безопасное отображение текста ---------- */

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

/* ---------- SVG-модель автомобиля ---------- */

function carSvg() {
  const body = config.body;
  const color = getColor().hex;
  const engine = getEngine();
  const electric = config.fuel === "electric";
  const sport = body === "sport";

  const silhouettes = {
    sedan: {
      shell: "M85 155 L105 130 Q120 118 150 115 L200 76 Q215 65 245 65 L330 65 Q355 67 375 88 L420 118 L472 128 Q495 135 505 155 L508 178 L78 178 Z",
      windows: "M157 113 L210 76 Q220 70 245 70 L282 70 L282 115 Z M293 70 L329 70 Q347 73 364 91 L387 115 L293 115 Z"
    },
    coupe: {
      shell: "M85 157 L110 132 Q135 115 168 110 L222 70 Q240 61 267 61 L328 66 Q354 71 374 93 L414 120 L474 130 Q497 138 505 157 L508 178 L78 178 Z",
         windows: "M174 108 L225 74 Q240 67 263 67 L280 68 L280 110 Z M291 68 L326 71 Q348 76 365 96 L380 111 L291 111 Z"
    },
    hatchback: {
      shell: "M85 155 L108 130 L143 118 L192 78 Q207 67 232 67 L300 67 Q328 69 345 91 L388 118 L448 124 Q480 132 496 155 L508 178 L78 178 Z",
      windows: "M150 115 L199 80 Q212 72 232 72 L268 72 L268 115 Z M278 72 L299 72 Q320 74 337 94 L354 115 L278 115 Z"
    },
    suv: {
      shell: "M80 145 L102 112 Q116 101 145 98 L158 62 Q164 50 184 50 L316 50 Q341 51 359 75 L385 105 L463 112 Q490 121 505 145 L510 178 L75 178 Z",
      windows: "M151 95 L165 63 Q168 57 184 57 L227 57 L227 95 Z M237 57 L310 57 Q331 59 350 82 L361 95 L237 95 Z"
    },
    wagon: {
      shell: "M80 155 L105 130 Q120 118 150 115 L200 76 Q215 65 245 65 L350 65 Q370 65 386 83 L422 117 L470 128 Q495 135 505 155 L508 178 L75 178 Z",
      windows: "M157 113 L210 76 Q220 70 245 70 L282 70 L282 115 Z M293 70 L347 70 Q363 73 379 91 L395 115 L293 115 Z"
    },
    sport: {
      shell: "M75 158 L112 135 Q143 123 181 120 L220 83 Q239 69 270 68 L324 72 Q352 76 372 100 L416 124 L471 133 Q496 140 505 158 L510 178 L72 178 Z",
      windows: "M187 117 L224 87 Q242 74 268 74 L279 76 L279 116 Z M291 76 L321 78 Q345 82 361 103 L374 116 L291 116 Z"
    }
  };

  const shape = silhouettes[body] || silhouettes.sedan;
  const wheelRadius = config.wheels === "21" ? 24 : config.wheels === "20" ? 22 : config.wheels === "18" ? 19 : 20;

  const wheel = (cx) => `
    <g transform="translate(${cx} 169)">
      <circle r="${wheelRadius + 5}" fill="#080c12" stroke="#3a4654" stroke-width="3"/>
      <circle r="${wheelRadius}" fill="#18222e" stroke="#8796a8" stroke-width="2"/>
      <circle r="${wheelRadius * .66}" fill="#0b1017" stroke="#526174" stroke-width="2"/>
      <circle r="${wheelRadius * .22}" fill="#91a4b8"/>
      ${[0, 45, 90, 135, 180, 225, 270, 315].map(angle => `
        <path d="M0 -${wheelRadius * .23} L-${wheelRadius * .18} -${wheelRadius * .73} L${wheelRadius * .18} -${wheelRadius * .73} Z"
          fill="#91a4b8" transform="rotate(${angle})"/>
      `).join("")}
    </g>
  `;

  const lightColor = config.color === "white" || config.color === "yellow"
    ? "#fff4d4"
    : "#80dfff";

  const gradientId = "paint-" + body + "-" + config.color;

  return `
  <svg viewBox="35 35 500 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Модель автомобиля ${escapeHTML(getBody().name)}">
    <defs>
      <linearGradient id="${gradientId}" x1="0" y1="0" x2="0.2" y2="1">
        <stop offset="0%" stop-color="${color}" stop-opacity="1"/>
        <stop offset="48%" stop-color="${color}" stop-opacity=".88"/>
        <stop offset="100%" stop-color="#101820" stop-opacity="1"/>
      </linearGradient>
      <linearGradient id="glass-${gradientId}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#a8dcf7" stop-opacity=".58"/>
        <stop offset="100%" stop-color="#111c2a" stop-opacity=".96"/>
      </linearGradient>
      <linearGradient id="floor-${gradientId}" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="${color}" stop-opacity="0"/>
        <stop offset="50%" stop-color="${color}" stop-opacity=".24"/>
        <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
      </linearGradient>
    </defs>

    <ellipse cx="292" cy="198" rx="210" ry="10" fill="url(#floor-${gradientId})"/>
    <ellipse cx="292" cy="194" rx="175" ry="9" fill="#000" opacity=".55"/>

    <path d="${shape.shell}" fill="url(#${gradientId})" stroke="${color}" stroke-width="1.3" stroke-linejoin="round"/>

    <path d="${shape.windows}" fill="url(#glass-${gradientId})" stroke="#7892a9" stroke-opacity=".7" stroke-width="1.4"/>

    <path d="M285 70 L285 116" stroke="#111c28" stroke-width="3"/>
    <path d="M113 132 L157 130 L175 137 L131 141 Z" fill="#fff" opacity=".09"/>
    <path d="M282 122 L282 154" stroke="#c8d7e6" stroke-opacity=".23" stroke-width="1.3"/>
<path d="M365 128 L442 135" stroke="#fff" stroke-opacity=".12" stroke-width="2"/>
    <path d="M94 160 L487 160" stroke="#fff" stroke-opacity=".11" stroke-width="1.5"/>

    <path d="M80 157 L105 157 L110 166 L80 166 Z" fill="${lightColor}" opacity=".95"/>
    <path d="M486 155 L503 157 L501 166 L482 166 Z" fill="#ff4f66" opacity=".95"/>

    <path d="M80 177 L510 177" stroke="#060a10" stroke-width="5" stroke-linecap="round"/>
    <path d="M130 181 L155 181 M422 181 L455 181" stroke="#566577" stroke-width="2" stroke-linecap="round"/>

    ${wheel(163)}
    ${wheel(418)}

    <path d="M191 139 L250 139" stroke="#fff" stroke-opacity=".22" stroke-width="1.5"/>
    <path d="M302 139 L354 139" stroke="#fff" stroke-opacity=".22" stroke-width="1.5"/>
    <path d="M262 153 L285 153" stroke="#fff" stroke-opacity=".35" stroke-width="2"/>

    ${electric ? `
      <path d="M295 124 L285 140 L296 140 L288 153 L309 133 L298 133 L306 124 Z"
        fill="#9af5ff" opacity=".9"/>
    ` : ""}

    ${sport ? `
      <path d="M93 150 L119 150 L113 157 L88 157 Z" fill="#0a1017"/>
      <path d="M459 147 L486 149 L478 155 L455 153 Z" fill="#0a1017"/>
      <path d="M232 179 L355 179" stroke="#8f9bad" stroke-width="2"/>
    ` : ""}

    ${config.drive === "awd" ? `
      <path d="M244 189 L335 189" stroke="${color}" stroke-width="2" opacity=".65"/>
    ` : ""}

    ${config.boost ? `
      <path d="M66 144 L41 144 M70 151 L35 151 M70 158 L44 158"
        stroke="#56c8ff" stroke-width="2" stroke-linecap="round" opacity=".8"/>
    ` : ""}
  </svg>`;
}

/* ---------- Отрисовка машин ---------- */

function renderCarPreviews() {
  const svg = carSvg();

  $("#mainCarVisual").innerHTML = svg;
  $("#heroCarVisual").innerHTML = svg;

  const name = `NOVA ${getBody().short}`;

  $("#previewTitle").textContent = name;
  $("#heroCarName").textContent = name;
  $("#bodyTag").textContent = `${getBody().short} / CONCEPT`;

  $("#colorName").textContent = getColor().name;
  $("#colorDot").style.background = getColor().hex;
}

/* ---------- Характеристики ---------- */

function renderSummary() {
  const engine = getEngine();

  $("#powerValue").textContent = engine.power;
  $("#weightValue").textContent = getWeight().toLocaleString("ru-RU");
  $("#accelValue").textContent = getAcceleration().toFixed(1);

  $("#sumBody").textContent = getBody().name;
  $("#sumFuel").textContent = fuels[config.fuel].name;
  $("#sumEngine").textContent = engine.name;
  $("#sumGearbox").textContent = getGearbox().name;
  $("#sumDrive").textContent = getDrive().name;
  $("#sumWheels").textContent = `${config.wheels}″`;

  const notes = {
    sedan: "Сбалансированная конфигурация для повседневной езды.",
    coupe: "Спортивный силуэт и акцент на динамике.",
    hatchback: "Компактность и удобство в городских условиях.",
    suv: "Высокий кузов и увеличенная масса автомобиля.",
    wagon: "Просторный кузов и практичный характер.",
    sport: "Низкий силуэт и ориентация на высокую мощность."
  };

  $("#previewNote").textContent = notes[config.body];

  const color = getColor();
  $("#colorDot").style.background = color.hex;
}

/* ---------- Гараж ---------- */

function saveCurrentCar() {
  const car = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
    name: `NOVA ${getBody().short}`,
    createdAt: new Date().toISOString(),
    config: { ...config },
    power: getEngine().power,
    weight: getWeight(),
    acceleration: getAcceleration()
  };

  garage.unshift(car);
  saveGarageStorage();
  renderGarage();

  showModal(
    "Автомобиль сохранён!",
    `${car.name} добавлен в твой гараж. Ты сможешь загрузить его позже.`
  );
}

function handleGarageClick(event) {
  const button = event.target.closest("[data-garage-action]");
  if (!button) return;

  const id = button.dataset.id;
  const action = button.dataset.garageAction;

  if (action === "load") {
    const car = garage.find(item => item.id === id);
    if (!car) return;
       config = { ...defaultConfig, ...car.config };
    repairCompatibility();
    currentStep = 0;
    renderAll();

    $("#constructor").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    showToast("Сборка загружена в конструктор.");
  }

  if (action === "delete") {
    garage = garage.filter(item => item.id !== id);
    saveGarageStorage();
    renderGarage();
    showToast("Автомобиль удалён из гаража.");
  }
}

function renderGarage() {
  const grid = $("#garageGrid");
  grid.innerHTML = "";

  $("#garageCount").textContent = garage.length;
  $("#navGarageCount").textContent = garage.length;

  $("#garageEmpty").hidden = garage.length > 0;

  garage.forEach(car => {
    const card = document.createElement("article");
    card.className = "garage-card";

    const savedConfig = { ...config };
    config = { ...defaultConfig, ...car.config };
    repairCompatibility();

    const preview = carSvg();

    config = savedConfig;
    repairCompatibility();

    const title = escapeHTML(car.name || "NOVA");
    const engine = engines.find(item => item.id === car.config.engine);
    const engineName = engine ? engine.name : "Двигатель";
    const power = car.power || engine?.power || 0;

    card.innerHTML = `
      <div class="car-visual">${preview}</div>
      <h3>${title}</h3>
      <p>${escapeHTML(getSavedBodyName(car.config.body))} · ${escapeHTML(engineName)}</p>
      <div class="garage-card-stats">
        <span>${power} л.с.</span>
        <span>${Number(car.weight || 0).toLocaleString("ru-RU")} кг</span>
        <span>${Number(car.acceleration || 0).toFixed(1)} с</span>
      </div>
      <div class="garage-card-actions">
        <button class="btn btn-primary" data-garage-action="load" data-id="${escapeHTML(car.id)}">Загрузить</button>
        <button class="btn btn-danger" data-garage-action="delete" data-id="${escapeHTML(car.id)}">Удалить</button>
      </div>
    `;

    grid.append(card);
  });
}

function getSavedBodyName(id) {
  return bodies[id]?.name || "Автомобиль";
}

/* ---------- Окна и уведомления ---------- */

function showToast(message) {
  const container = $("#toastContainer");
  const toast = document.createElement("div");

  toast.className = "toast";
  toast.textContent = message;
  container.append(toast);

  setTimeout(() => {
    toast.classList.add("removing");
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

function showModal(title, message) {
  $("#modalTitle").textContent = title;
  $("#modalMessage").textContent = message;
  $("#modalBackdrop").hidden = false;
  $("#modalOkButton").focus();
}

function closeModal() {
  $("#modalBackdrop").hidden = true;
}

/* ---------- Небольшие визуальные эффекты ---------- */

function setupScrollEffects() {
  const sections = $$("main section[id]");
  const navLinks = $$("nav a[href^='#']");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        navLinks.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`
          );
        });
      });
    }, {
      rootMargin: "-30% 0px -60% 0px"
    });

    sections.forEach(section => observer.observe(section));
  }
}
