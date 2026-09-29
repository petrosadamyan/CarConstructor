// ==========================================
// CAR CONSTRUCTOR — JAVASCRIPT ENGINE
// ==========================================

// Текущая конфигурация автомобиля
const car = {
    body: null,
    fuel: null,
    engine: null,
    drive: null,
    gearbox: null
};


// ==========================================
// ДАННЫЕ АВТОМОБИЛЯ
// ==========================================

const bodies = {
    sedan: {
        name: "Седан",
        mass: 1450
    },

    coupe: {
        name: "Купе",
        mass: 1380
    },

    suv: {
        name: "Кроссовер",
        mass: 1700
    },

    wagon: {
        name: "Универсал",
        mass: 1550
    }
};


const engines = {
    v6: {
        name: "V6",
        power: 300,
        mass: 190
    },

    v8: {
        name: "V8",
        power: 450,
        mass: 240
    },

    v12: {
        name: "V12",
        power: 650,
        mass: 310
    },

    electric: {
        name: "Электромотор",
        power: 500,
        mass: 280
    }
};


const fuels = {
    "92": "АИ-92",
    "95": "АИ-95",
    "98": "АИ-98",
    "100": "АИ-100",
    diesel: "ДТ"
};


const drives = {
    fwd: "Передний",
    rwd: "Задний",
    awd: "Полный"
};


const gearboxes = {
    manual: "Механика",
    automatic: "Автомат",
    robot: "Робот",
    cvt: "Вариатор"
};


// ==========================================
// ВЫБОР ПАРАМЕТРОВ
// ==========================================

function selectBody(type) {

    if (!bodies[type]) return;

    car.body = type;

    showSelected("body", bodies[type].name);

    updateCar();
}


function selectFuel(type) {

    if (!fuels[type]) return;

    car.fuel = type;

    showSelected("fuel", fuels[type]);

    updateCar();
}


function selectEngine(type) {

    if (!engines[type]) return;

    car.engine = type;

    showSelected("engine", engines[type].name);

    updateCar();
}


function selectDrive(type) {

    if (!drives[type]) return;

    car.drive = type;

    showSelected("drive", drives[type]);

    updateCar();
}


function selectGearbox(type) {

    if (!gearboxes[type]) return;

    car.gearbox = type;

    showSelected("gearbox", gearboxes[type]);

    updateCar();
}


// ==========================================
// ОБНОВЛЕНИЕ ХАРАКТЕРИСТИК
// ==========================================

function updateCar() {

    updateProgress();

    // Пока не выбраны кузов или двигатель
    if (!car.body || !car.engine) {
        updateStats({
            power: 0,
            mass: 0,
            acceleration: "—"
        });

        return;
    }

    const body = bodies[car.body];
    const engine = engines[car.engine];

    let mass = body.mass + engine.mass;
    let power = engine.power;


    // ======================================
    // ВЛИЯНИЕ ПРИВОДА
    // ======================================

    if (car.drive === "awd") {
        mass += 80;
    }

    if (car.drive === "fwd") {
        mass += 20;
    }


    // ======================================
    // ВЛИЯНИЕ КОРОБКИ
    // ======================================

    if (car.gearbox === "automatic") {
        mass += 40;
    }

    if (car.gearbox === "robot") {
        mass += 30;
    }

    if (car.gearbox === "cvt") {
        mass += 25;
    }


    // ======================================
    // ВЛИЯНИЕ ТОПЛИВА
    // ======================================

    if (car.fuel === "100") {
        power += 15;
    }

    if (car.fuel === "98") {
        power += 8;
    }

    if (car.fuel === "92") {
        power -= 10;
    }


    // Электромотор не использует бензин/дизель
    if (car.engine === "electric") {
        power = engine.power;
    }


    // ======================================
    // РАСЧЁТ 0–100
    // ======================================

    let acceleration = 14 - (power / mass) * 10;

    if (car.drive === "awd") {
        acceleration -= 0.8;
    }

    if (car.drive === "rwd") {
        acceleration -= 0.3;
    }

    if (car.gearbox === "robot") {
         acceleration -= 0.4;
    }

    if (car.gearbox === "automatic") {
        acceleration -= 0.2;
    }

    acceleration = Math.max(2.5, acceleration);

    acceleration = acceleration.toFixed(1);


    // ======================================
    // ПОКАЗЫВАЕМ РЕЗУЛЬТАТ
    // ======================================

    updateStats({
        power: Math.round(power),
        mass: Math.round(mass),
        acceleration: acceleration
    });


    updateFinalBuild();
}


// ==========================================
// ПРОГРЕСС СБОРКИ
// ==========================================

function updateProgress() {

    const steps = [
        car.body,
        car.fuel,
        car.engine,
        car.drive,
        car.gearbox
    ];

    const completed = steps.filter(Boolean).length;

    const percent = (completed / steps.length) * 100;


    const progress = document.querySelector(".progress-fill");

    if (progress) {
        progress.style.width = percent + "%";
    }


    const progressText = document.querySelector(".progress-text");

    if (progressText) {
        progressText.textContent =
            completed + " / " + steps.length;
    }
}


// ==========================================
// ОБНОВЛЕНИЕ ХАРАКТЕРИСТИК
// ==========================================

function updateStats(stats) {

    const power = document.querySelector("#powerValue");
    const mass = document.querySelector("#massValue");
    const acceleration = document.querySelector("#accelerationValue");


    if (power) {
        power.textContent =
            stats.power + " HP";
    }


    if (mass) {
        mass.textContent =
            stats.mass + " KG";
    }


    if (acceleration) {
        acceleration.textContent =
            stats.acceleration + " SEC";
    }
}


// ==========================================
// ПОКАЗ ВЫБРАННОГО ПАРАМЕТРА
// ==========================================

function showSelected(type, value) {

    const element =
        document.querySelector(`[data-selected="${type}"]`);

    if (element) {
        element.textContent = value;
    }
}


// ==========================================
// ИТОГОВАЯ КОНФИГУРАЦИЯ
// ==========================================

function updateFinalBuild() {

    const result =
        document.querySelector("#finalBuild");

    if (!result) return;


    if (!car.body || !car.engine) {

        result.textContent =
            "Конфигурация ещё не завершена";

        return;
    }


    const bodyName =
        bodies[car.body].name;

    const engineName =
        engines[car.engine].name;

    const driveName =
        car.drive
            ? drives[car.drive]
            : "Не выбран";

    const gearboxName =
        car.gearbox
            ? gearboxes[car.gearbox]
            : "Не выбрана";


    result.innerHTML = `
        <strong>Ваша конфигурация</strong><br><br>

        Кузов: ${bodyName}<br>
        Двигатель: ${engineName}<br>
        Привод: ${driveName}<br>
        КПП: ${gearboxName}
    `;
}


// ==========================================
// ПРОВЕРКА СОВМЕСТИМОСТИ
// ==========================================

function checkCompatibility() {

    const message =
        document.querySelector("#compatibility");

    if (!message) return;


    // Электромотор
    if (car.engine === "electric") {

        if (car.fuel === "diesel" ||
            car.fuel === "92" ||
            car.fuel === "95" ||
            car.fuel === "98" ||
            car.fuel === "100") {

            message.textContent =
                "⚠ Электромотор работает без топлива.";

            message.className =
                "warning";

            return;
        }
    }


    // Обычный двигатель
    if (car.engine !== "electric" && !car.fuel) {

        message.textContent =
            "Выберите тип топлива.";

        message.className =
            "warning";

        return;
    }


    message.textContent =
        "✓ Конфигурация совместима";

    message.className =
         "success";
}


// ==========================================
// КНОПКА "СОБРАТЬ АВТОМОБИЛЬ"
// ==========================================

function buildCar() {

    if (!car.body ||
        !car.engine ||
        !car.fuel ||
        !car.drive ||
        !car.gearbox) {

        alert(
            "Заполните все параметры автомобиля."
        );

        return;
    }


    updateCar();
    checkCompatibility();


    const final =
        document.querySelector("#finalBuild");


    if (final) {

        final.classList.add("build-complete");

        final.innerHTML = `
            <div class="final-title">
                🚗 АВТОМОБИЛЬ СОБРАН
            </div>

            <br>

            Кузов: ${bodies[car.body].name}<br>
            Двигатель: ${engines[car.engine].name}<br>
            Топливо: ${fuels[car.fuel]}<br>
            Привод: ${drives[car.drive]}<br>
            КПП: ${gearboxes[car.gearbox]}
        `;
    }
}


// ==========================================
// СБРОС КОНФИГУРАЦИИ
// ==========================================

function resetCar() {

    car.body = null;
    car.fuel = null;
    car.engine = null;
    car.drive = null;
    car.gearbox = null;


    updateCar();


    document
        .querySelectorAll("[data-selected]")
        .forEach(element => {

            element.textContent =
                "Не выбрано";

        });


    const final =
        document.querySelector("#finalBuild");


    if (final) {

        final.classList.remove(
            "build-complete"
        );

        final.textContent =
            "Конфигурация ещё не завершена";
    }
}


// ==========================================
// ЗАПУСК
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateProgress();
        updateCar();

    }
);"success";
}


// ==========================================
// КНОПКА "СОБРАТЬ АВТОМОБИЛЬ"
// ==========================================

function buildCar() {

    if (!car.body ||
        !car.engine ||
        !car.fuel ||
        !car.drive ||
        !car.gearbox) {

        alert(
            "Заполните все параметры автомобиля."
        );

        return;
    }


    updateCar();
    checkCompatibility();


    const final =
        document.querySelector("#finalBuild");


    if (final) {

        final.classList.add("build-complete");

        final.innerHTML = `
            <div class="final-title">
                🚗 АВТОМОБИЛЬ СОБРАН
            </div>

            <br>

            Кузов: ${bodies[car.body].name}<br>
            Двигатель: ${engines[car.engine].name}<br>
            Топливо: ${fuels[car.fuel]}<br>
            Привод: ${drives[car.drive]}<br>
            КПП: ${gearboxes[car.gearbox]}
        `;
    }
}


// ==========================================
// СБРОС КОНФИГУРАЦИИ
// ==========================================

function resetCar() {

    car.body = null;
    car.fuel = null;
    car.engine = null;
    car.drive = null;
    car.gearbox = null;


    updateCar();


    document
        .querySelectorAll("[data-selected]")
        .forEach(element => {

            element.textContent =
                "Не выбрано";

        });


    const final =
        document.querySelector("#finalBuild");


    if (final) {

        final.classList.remove(
            "build-complete"
        );

        final.textContent =
            "Конфигурация ещё не завершена";
    }
}


// ==========================================
// ЗАПУСК
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateProgress();
        updateCar();

    }
);
