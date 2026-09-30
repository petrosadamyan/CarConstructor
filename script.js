document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // ДАННЫЕ АВТОМОБИЛЯ
    // ==========================================

    let car = {
        body: "SEDAN",
        fuel: "AI-92",
        drive: "FWD",
        gearbox: "AT"
    };


    // ==========================================
    // ЭЛЕМЕНТЫ СТРАНИЦЫ
    // ==========================================

    const bodyOptions = document.querySelectorAll(".option");
    const fuelOptions = document.querySelectorAll(".fuel");
    const gearboxOptions = document.querySelectorAll(".gearbox");

    const driveOptions = document.querySelectorAll(".drive-option");

    const dashboardPower = document.querySelector(".power-card .big-number");
    const dashboardAcceleration =
        document.querySelector(".dashboard-card:nth-child(2) .big-number");
    const dashboardMass =
        document.querySelector(".dashboard-card:nth-child(3) .big-number");
    const dashboardDrive =
        document.querySelector(".drive-name");

    const selectedData = document.querySelectorAll(".selected-data > div");

    const progressBar = document.querySelector(".progress-bar div");
    const progressNumber = document.querySelector(".progress strong");

    const continueButton = document.querySelector(".continue-button");

    const buildName = document.querySelector(".build-name h3");


    // ==========================================
    // ХАРАКТЕРИСТИКИ КУЗОВОВ
    // ==========================================

    const bodyData = {

        SEDAN: {
            name: "SEDAN",
            mass: 1500,
            acceleration: 8.2
        },

        COUPE: {
            name: "COUPE",
            mass: 1450,
            acceleration: 7.5
        },

        SUV: {
            name: "SUV",
            mass: 1750,
            acceleration: 9.0
        },

        WAGON: {
            name: "WAGON",
            mass: 1600,
            acceleration: 8.7
        }

    };


    // ==========================================
    // ХАРАКТЕРИСТИКИ ТОПЛИВА
    // ==========================================

    const fuelData = {

        "AI-92": {
            power: 150
        },

        "AI-95": {
            power: 160
        },

        "AI-98": {
            power: 175
        },

        "AI-100": {
            power: 185
        },

        "ДТ": {
            power: 155
        }

    };


    // ==========================================
    // ХАРАКТЕРИСТИКИ ПРИВОДА
    // ==========================================

    const driveData = {

        FWD: {
            mass: 0,
            acceleration: 0
        },

        RWD: {
            mass: 30,
            acceleration: -0.2
        },

        AWD: {
            mass: 80,
            acceleration: -0.4
        }

    };


    // ==========================================
    // ХАРАКТЕРИСТИКИ КОРОБОК
    // ==========================================

    const gearboxData = {

        AT: {
            mass: 40,
            acceleration: 0
        },

        MT: {
            mass: 0,
            acceleration: -0.3
        },

        CVT: {
            mass: 20,
            acceleration: 0.2
        }

    };


    // ==========================================
    // ФУНКЦИЯ ОБНОВЛЕНИЯ ХАРАКТЕРИСТИК
    // ==========================================

    function updateCar() {

        const body = bodyData[car.body];
        const fuel = fuelData[car.fuel] || fuelData["AI-92"];
        const drive = driveData[car.drive] || driveData.FWD;
        const gearbox = gearboxData[car.gearbox] || gearboxData.AT;


        // Мощность

        let power = fuel.power;


        // Масса

        let mass =
            body.mass +
            drive.mass +
            gearbox.mass;


        // Разгон

        let acceleration =
            body.acceleration +
            drive.acceleration +
            gearbox.acceleration;
         // Дополнительная поправка от мощности

        acceleration -= (power - 150) * 0.012;


        // Ограничиваем значение

        acceleration = Math.max(4.5, acceleration);


        // ==========================================
        // DASHBOARD
        // ==========================================

        if (dashboardPower) {
            dashboardPower.textContent = power;
        }

        if (dashboardAcceleration) {
            dashboardAcceleration.textContent =
                acceleration.toFixed(1);
        }

        if (dashboardMass) {
            dashboardMass.textContent = mass;
        }

        if (dashboardDrive) {
            dashboardDrive.textContent = car.drive;
        }


        // ==========================================
        // CURRENT BUILD
        // ==========================================

        if (selectedData.length >= 4) {

            selectedData[0].querySelector("strong").textContent =
                car.body;

            selectedData[1].querySelector("strong").textContent =
                car.fuel;

            selectedData[2].querySelector("strong").textContent =
                car.drive;

            selectedData[3].querySelector("strong").textContent =
                car.gearbox;

        }


        // ==========================================
        // НАЗВАНИЕ СБОРКИ
        // ==========================================

        if (buildName) {
            buildName.textContent =
                "PROJECT CC-001";
        }


        // ==========================================
        // СОХРАНЕНИЕ
        // ==========================================

        localStorage.setItem(
            "carConstructor",
            JSON.stringify(car)
        );

    }


    // ==========================================
    // ВЫБОР КУЗОВА
    // ==========================================

    bodyOptions.forEach(function (option) {

        option.addEventListener("click", function () {

            bodyOptions.forEach(function (item) {
                item.classList.remove("selected");
            });

            option.classList.add("selected");


            const strong = option.querySelector("strong");

            if (strong) {

                car.body =
                    strong.textContent.trim().toUpperCase();

            }


            updateCar();

        });

    });


    // ==========================================
    // ВЫБОР ТОПЛИВА
    // ==========================================

    fuelOptions.forEach(function (fuel) {

        fuel.addEventListener("click", function () {

            fuelOptions.forEach(function (item) {
                item.classList.remove("selected");
            });

            fuel.classList.add("selected");


            const strong = fuel.querySelector("strong");

            if (strong) {

                let value =
                    strong.textContent.trim();

                if (value === "92") {
                    car.fuel = "AI-92";
                }

                else if (value === "95") {
                    car.fuel = "AI-95";
                }

                else if (value === "98") {
                    car.fuel = "AI-98";
                }

                else if (value === "100") {
                    car.fuel = "AI-100";
                }

                else if (
                    value.toUpperCase() === "ДТ" ||
                    value.toUpperCase() === "DIESEL"
                ) {
                    car.fuel = "ДТ";
                }

            }


            updateCar();

        });

    });


    // ==========================================
    // ВЫБОР КОРОБКИ
    // ==========================================

    gearboxOptions.forEach(function (gearbox) {

        gearbox.addEventListener("click", function (event) {

            // Если нажали на вопросительный знак,
            // коробку не выбираем

            if (
                 event.target.classList.contains("gear-info")
            ) {
                return;
            }


            gearboxOptions.forEach(function (item) {
                item.classList.remove("selected");
            });

            gearbox.classList.add("selected");


            const strong =
                gearbox.querySelector("strong");


            if (strong) {

                car.gearbox =
                    strong.textContent.trim().toUpperCase();

            }


            updateCar();

        });

    });


    // ==========================================
    // КНОПКИ "?"
    // ==========================================

    const infoButtons =
        document.querySelectorAll(".gear-info");


    infoButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.stopPropagation();


            const oldDescription =
                button.parentElement.querySelector(
                    ".gear-description"
                );


            // Если описание уже открыто —
            // закрываем его

            if (oldDescription) {

                oldDescription.remove();

                return;

            }


            // Закрываем остальные

            document
                .querySelectorAll(".gear-description")
                .forEach(function (description) {

                    description.remove();

                });


            // Создаём описание

            const description =
                document.createElement("div");


            description.className =
                "gear-description";


            description.textContent =
                button.getAttribute("data-info");


            button.parentElement.appendChild(
                description
            );

        });

    });


    // ==========================================
    // КНОПКА "ПРОДОЛЖИТЬ"
    // ==========================================

    if (continueButton) {

        continueButton.addEventListener(
            "click",
            function () {

                const constructor =
                    document.querySelector("#constructor");


                if (constructor) {

                    constructor.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        );

    }


    // ==========================================
    // КНОПКА "НОВЫЙ АВТОМОБИЛЬ"
    // ==========================================

    const newCarButton =
        document.querySelector(".header-button");


    if (newCarButton) {

        newCarButton.addEventListener(
            "click",
            function () {

                car = {
                    body: "SEDAN",
                    fuel: "AI-92",
                    drive: "FWD",
                    gearbox: "AT"
                };


                // Сбрасываем выделение

                bodyOptions.forEach(function (item) {
                    item.classList.remove("selected");
                });

                fuelOptions.forEach(function (item) {
                    item.classList.remove("selected");
                });

                gearboxOptions.forEach(function (item) {
                    item.classList.remove("selected");
                });


                // Возвращаем первый вариант

                if (bodyOptions[0]) {
                    bodyOptions[0].classList.add("selected");
                }

                if (fuelOptions[0]) {
                    fuelOptions[0].classList.add("selected");
                }

                if (gearboxOptions[0]) {
                    gearboxOptions[0].classList.add("selected");
                }


                localStorage.removeItem(
                    "carConstructor"
                );


                updateCar();

            }
        );

    }


    // ==========================================
    // ЗАГРУЗКА СОХРАНЁННОЙ СБОРКИ
     // ==========================================

    const savedCar =
        localStorage.getItem("carConstructor");


    if (savedCar) {

        try {

            const saved =
                JSON.parse(savedCar);


            if (saved.body) {
                car.body = saved.body;
            }

            if (saved.fuel) {
                car.fuel = saved.fuel;
            }

            if (saved.drive) {
                car.drive = saved.drive;
            }

            if (saved.gearbox) {
                car.gearbox = saved.gearbox;
            }

        }

        catch (error) {

            console.log(
                "Не удалось загрузить сохранённую сборку."
            );

        }

    }


    // ==========================================
    // ПЕРВИЧНОЕ ОБНОВЛЕНИЕ
    // ==========================================

    updateCar();


});