window.addEventListener('load', () => {

    let massImg = [];
    massImg[0] = "/image/1.jpg";
    massImg[1] = "/image/2.jpg";
    massImg[2] = "/image/3.jpg";
    massImg[3] = "/image/4.jpg";
    massImg[4] = "/image/5.jpg";
    massImg[5] = "/image/6.jpg";
    massImg[6] = "/image/7.jpg";


    let addItem8 = function () {
        let div1 = document.createElement("div");
        let a1 = document.createElement("a");
        a1.style.cursor = "pointer";
        a1.id = "imt";
        a1.innerText = "Расчитать индекс массы тела";
        div1.append(a1);
        document.getElementById("item8").append(div1);
        let div2 = document.createElement("div");
        let a2 = document.createElement("a");
        a2.style.cursor = "pointer";
        a2.id = "dc";
        a2.innerText = "Расчитать свою дневную каллорийность";
        div2.append(a2);
        document.getElementById("item8").append(div2);
    }

    addItem8();


    let containerImage = function () {
        for (let i = 0; i < massImg.length; i++) {
            let img = document.createElement("img");
            img.src = massImg[i];
            img.alt = "";
            img.style.width = 68.8 + "%";
            img.style.height = 498 + "px";
            img.style.position = "absolute";
            img.style.objectFit = "cover";
            if (i === 0) {
                img.style.opacity = "1";
            } else {
                img.style.opacity = "0";
            }
            let cont = document.getElementById("item7");
            cont.appendChild(img);
        }
    }
    let count = 0;
    let imgElem = document.getElementById("item7").childNodes;
    let switchPictures = function () {
        if (count === 0) {
            imgElem[(massImg.length) - 1].style.opacity = 0;
        }
        if (count > 0) {
            imgElem[count - 1].style.opacity = 0;
        }
        imgElem[count].style.opacity = 1;
        count++;
        if (count === (massImg.length)) {
            count = 0;
        }
    }
    let push1 = document.getElementById("imt");
    push1.onclick = function (e) {
        e.preventDefault();
    }
    let push2 = document.getElementById("dc");
    push2.onclick = function (e) {
        e.preventDefault();
    }

    let pushImt = function (e) {
        if (e.target.id === "imt") {
            let container = document.getElementById("item8").querySelectorAll("div");
            if (container.length > 1) {
                for (let i = 0; i < container.length; i++) {
                    if (i > 0) {
                        container[i].remove();
                    }
                }

                let form = document.createElement("form");
                let p1 = document.createElement("p");
                let p2 = document.createElement("p");
                let p3 = document.createElement("p");
                let p4 = document.createElement("p");
                let label1 = document.createElement("label");
                let input1 = document.createElement("input");
                input1.id = "growth";
                let label2 = document.createElement("label");
                let input2 = document.createElement("input");
                input2.id = "weight";
                let br = document.createElement("br");
                let input3 = document.createElement("input");
                let a = document.createElement("a");
                a.id = "back";
                a.style.cursor = "pointer";
                a.innerText = "Вернуться назад";
                input3.id = "submitImt";
                input3.type = "submit";
                input3.style.cursor = "pointer";
                p1.innerText = "Введите Ваш рост  (см)";
                p2.innerText = "Введите Ваш вес   (кг)";
                label1.appendChild(input1);
                label2.appendChild(input2);
                form.appendChild(p1);
                form.appendChild(label1);
                form.appendChild(br);
                form.appendChild(p2);
                form.appendChild(label2);
                form.appendChild(br);
                form.appendChild(p3);
                form.appendChild(input3);
                let divResult = document.createElement("div");
                divResult.id = "result";

                let insertContainer = document.getElementById("item8");
                insertContainer.appendChild(form);
                insertContainer.appendChild(p4);
                insertContainer.appendChild(a);
                insertContainer.appendChild(divResult);
            }
        }
    }

    let calculateDailyCalorieContent = function (e) {
        if (e.target.id === "dc") {
            let container = document.getElementById("item8").querySelectorAll("div");
            if (container.length > 1) {
                for (let i = 0; i < container.length; i++) {
                    if (i !== 1) {
                        container[i].remove();
                    }
                }
                container[1].style = "text-align: center";

                let form = document.createElement("form");
                form.id = "item11";
                let p1 = document.createElement("p");
                p1.id = "item10";
                p1.innerText = "Ваш пол";
                let p2 = document.createElement("p");
                let label1 = document.createElement("label");
                let input1 = document.createElement("input");
                input1.type = "radio";
                input1.id = "radio1";
                input1.value = "male";
                label1.innerText = "Мужской";
                input1.name = "gender";
                input1.checked = "checked";
                let label2 = document.createElement("label");
                let input2 = document.createElement("input");
                input2.type = "radio";
                input2.id = "radio1";
                label2.innerText = "Женский";
                input2.name = "gender";
                input2.value = "female";
                form.appendChild(p1)
                form.appendChild(input1);
                form.appendChild(label1);
                form.appendChild(input2);
                form.appendChild(label2);
                let p3 = document.createElement("p");
                p3.innerText = "Возраст";
                let span1 = document.createElement("span");
                span1.innerText = "лет";
                p3.appendChild(span1);
                form.appendChild(p3);
                let input3 = document.createElement("input");
                input3.type = "text";
                input3.name = "age";
                input3.id = "age";
                form.appendChild(input3);
                let p4 = document.createElement("p");
                p4.innerText = "Рост";
                let span2 = document.createElement("span");
                span2.innerText = "см";
                p4.appendChild(span2);
                form.appendChild(p4);
                let input4 = document.createElement("input");
                input4.type = "text";
                input4.name = "height";
                input4.id = "height";
                form.appendChild(input4);
                let p5 = document.createElement("p");
                p5.innerText = "Вес";
                let span3 = document.createElement("span");
                span3.innerText = "кг";
                p5.appendChild(span3);
                form.appendChild(p5);
                let input5 = document.createElement("input");
                input5.type = "text";
                input5.name = "weight";
                input5.id = "weight";
                form.appendChild(input5);
                let p6 = document.createElement("p");
                p6.innerText = "Физическая активность";
                let i = document.createElement("i");
                i.className = "far fa-question-circle";
                i.id = "item12";
                p6.appendChild(i);
                form.appendChild(p6);
                let select = document.createElement("select");
                select.id = "select";
                let option1 = document.createElement("option");
                option1.innerText = "Минимальная";
                option1.value = "Минимальная";
                let option2 = document.createElement("option");
                option2.innerText = "Низкая";
                option2.value = "Низкая";
                let option3 = document.createElement("option");
                option3.innerText = "Средняя";
                option3.value = "Средняя";
                let option4 = document.createElement("option");
                option4.innerText = "Высокая";
                option4.value = "Высокая";
                let option5 = document.createElement("option");
                option5.innerText = "Очень высокая";
                option5.value = "Очень высокая";
                select.appendChild(option1);
                select.appendChild(option2);
                select.appendChild(option3);
                select.appendChild(option4);
                select.appendChild(option5);
                form.appendChild(select);
                let p7 = document.createElement("p");
                form.appendChild(p7);
                let button1 = document.createElement("button");
                button1.innerText = "Расчитать";
                button1.id = "calculateButton";
                let button2 = document.createElement("button");
                button2.innerText = "Вернуться назад";
                button2.id = "buttonBack"
                form.appendChild(button1);
                form.appendChild(button2);
                document.getElementById("item8").appendChild(form);
                let divResultDC = document.createElement("div");
                divResultDC.id = "resultDC";
                document.getElementById("item8").appendChild(divResultDC);
            }
        }
    }

    let addDivWeather = function () {
        let divWeather = document.createElement("div");
        divWeather.id = "weatherContainer";
        let weatherContainerItem1 = document.createElement("div");
        let weatherContainerItem2 = document.createElement("div");
        weatherContainerItem1.id = "weatherContainerItem1";
        weatherContainerItem2.id = "weatherContainerItem2";
        divWeather.append(weatherContainerItem1);
        divWeather.append(weatherContainerItem2);
        document.getElementById("item8").append(divWeather);
    }
    addDivWeather();
    let weather;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://api.openweathermap.org/data/2.5/weather?id=709930&units=metric&appid=f4023f64a6c17a8e5e5a33ce85f8f6f3&lang=ru');
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE) {
            weather = JSON.parse(xhr.responseText);
            town(weather);
            icon(weather);
            description(weather);
            parameters(weather);
        }
    }


    let dateTime = function () {
        let currentDataTime = new Date();
        let day = currentDataTime.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        let month = currentDataTime.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        let year = currentDataTime.getFullYear();
        let hours = currentDataTime.getHours();
        if (hours < 10) {
            hours = "0" + hours;
        }
        let minutes = currentDataTime.getMinutes();
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        let seconds = currentDataTime.getSeconds();
        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        return day + "." + month + "." + year + "&nbsp&nbsp&nbsp&nbsp&nbsp" + hours + ":" + minutes + ":" + seconds;
    }

    // document.getElementById("weatherContainer").innerHTML = dateTime();
    let localTime = function () {
        document.getElementById("weatherContainerItem1").innerHTML = dateTime();
    }
    let town = function (weather) {
        let town = weather.name;
        let sys = weather.sys;
        let country = sys.country;
        document.getElementById("weatherContainerItem2").innerHTML = town + "&nbsp&nbsp&nbsp&nbsp" + country;
    }
    let icon = function (weather) {
        let p = document.createElement("p");
        p.id = "weatherContainerItem3";
        let arr = weather.weather;
        let icon = arr[0].icon;
        let img = document.createElement("img");
        img.src = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
        img.alt = ""
        img.width = 50;
        p.append(img);
        let span1 = document.createElement("span");
        span1.id = "weatherContainerItem3a";
        let temp = Number(weather.main.temp);
        temp = Math.round(temp);
        temp = String(temp);
        span1.innerText = temp + "  " + "℃";
        p.append(span1);
        let span2 = document.createElement("span");
        span2.innerText = weather.weather[0].description;
        span2.id = "weatherContainerItem3b"
        p.append(span2);
        document.getElementById('weatherContainer').append(p);
    }

    let description = function (weather) {
        let p = document.createElement("p");
        p.id = "weatherContainerItem5";
        let span1 = document.createElement("span");
        span1.style.fontWeight = "bold";
        let feelsLike = Number(weather.main.feels_like);
        feelsLike = Math.round(feelsLike);
        feelsLike = String(feelsLike);
        span1.innerText = "По ощущениям " + feelsLike + "℃";
        p.append(span1);
        document.getElementById("weatherContainer").append(p);
    }

    let parameters = function (weather) {
        let div = document.createElement('div');
        div.id = "weatherContainerItem4";
        document.getElementById("weatherContainer").append(div);
        let p = document.createElement("p");
        let span = document.createElement("span");
        let directionWind;
        let azimuth = weather.wind.deg;
        if (azimuth === 0 || azimuth === 360) {
            directionWind = "к югу";
        }
        if (azimuth === 180) {
            directionWind = "к северу";
        }
        if (azimuth >= 1 && azimuth <= 89) {
            directionWind = "к юго-западу";
        }
        if (azimuth === 90) {
            directionWind = "к западу";
        }
        if (azimuth >= 91 && azimuth <= 179) {
            directionWind = "к северо-западу";
        }
        if (azimuth >= 181 && azimuth <= 269) {
            directionWind = "к северо-восток";
        }
        if (azimuth === 270) {
            directionWind = "к востоку";
        }
        if (azimuth >= 271 && azimuth <= 359) {
            directionWind = "к юго-востоку";
        }
        span.innerText = "Ветер " + weather.wind.speed + " " + "м/с" + " " + " " + directionWind + "\n";
        span.style.fontSize = 1.4 + "vw";
        div.append(p);
        let span1 = document.createElement("span");
        span1.style.fontSize = 1.4 + "vw";
        let pressure = weather.main.pressure;
        span1.innerText = "Давление :" + " " + pressure + " гПа" + "\n";
        let span2 = document.createElement("span");
        span2.style.fontSize = 1.4 + "vw";
        span2.innerText = "Влажность :" + " " + weather.main.humidity + "%" + "\n";
        let span3 = document.createElement("span");
        span3.style.fontSize = 1.4 + "vw";
        let visibility = weather.visibility;
        visibility = visibility / 1000;
        span3.innerText = "Видимость : " + " " + visibility + " " + "км";
        p.append(span, span1, span2, span3);
    }


    let backItem8 = function (e) {
        if (e.target.id === "back") {
            document.getElementById("item8").innerHTML = "";
            addItem8();
            addDivWeather();
            town(weather);
            icon(weather);
            description(weather);
            parameters(weather);
        }
    }

    let pushButtonBackItem8 = function (e) {
        if (e.target.id === "buttonBack") {
            e.preventDefault();
            document.getElementById("item8").innerHTML = "";
            addItem8();
            addDivWeather();
            town(weather);
            icon(weather);
            description(weather);
            parameters(weather);
        }
    }

    let pushButtonSubmitImt = function (e) {
        if (e.target.id === "submitImt") {
            e.preventDefault();
            document.getElementById("result").innerHTML = "";
            let input1 = document.getElementById("growth");
            let growth = input1.value;
            let input2 = document.getElementById("weight");
            let weight = input2.value;

            if (growth > 100) {
                growth /= 100;
            }
            let imt = weight / (growth * growth);
            imt = imt.toFixed(1);
            let div = document.createElement("div");
            div.style.width = "80%";
            div.style.height = 20 + "px";
            let message;
            if (imt <= 16) {
                message = "Выраженный дефицит массы тела"
            }
            if (imt > 16 && imt <= 18.5) {
                message = "Недостаточная (дефицит) масса тела";
            }
            if (imt > 18.5 && imt <= 25) {
                message = "Норма";
            }
            if (imt > 25 && imt <= 30) {
                message = "Избыточная масса тела (предожирение)";
            }
            if (imt > 30 && imt <= 35) {
                message = "Ожирение";
            }
            if (imt > 35 && imt <= 40) {
                message = "Резкое ожирение";
            }
            if (imt > 40) {
                message = "Очень резкое ожирение";
            }
            div.innerText = `Ваш ИМТ =  ${imt}`;
            let div2 = document.createElement("div");
            div2.innerText = message;
            div2.style.marginTop = 15 + "px";
            document.getElementById("result").appendChild(div);
            document.getElementById("result").appendChild(div2);
        }
    }

    let pushCalculateButton = function (e) {
        if (e.target.id === "calculateButton") {
            e.preventDefault();
            document.getElementById("resultDC").innerHTML = "";
            let radio = document.querySelectorAll('input[name="gender"]')
            let gender;
            for (let i = 0; i < radio.length; i++) {
                if (radio[i].checked) {
                    gender = radio[i].value;
                }
            }
            let input1 = document.getElementById("age");
            let age = input1.value;
            let input2 = document.getElementById("height");
            let height = input2.value;
            let input3 = document.getElementById("weight");
            let weight = input3.value;
            let select = document.getElementById("select");
            let value = select.options[select.selectedIndex].value;
            let brm;
            if (gender === "male") {
                brm = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
                console.log(brm);
            }
            if (gender === "female") {
                brm = 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
            }
            if (value === "Минимальная") {
                brm *= 1.2;
            }
            if (value === "Низкая") {
                brm *= 1.375;
            }
            if (value === "Средняя") {
                brm *= 1.55;
            }
            if (value === "Высокая") {
                brm *= 1.725;
            }
            if (value === "Очень высокая") {
                brm *= 1.9;
            }
            brm = Math.round(brm);
            let divResult = document.getElementById("resultDC");
            divResult.style.fontSize = 1.5 + "vw";
            divResult.innerText = "Ваша дневная каллорийность : " + " " + brm + "  " + " Ккал";
        }
    }


    function myFunction() {
        setInterval(switchPictures, 3000);
    }


    setInterval(localTime, 1000);


    myFunction();
    containerImage();
    document.body.addEventListener("click", pushCalculateButton);
    document.body.addEventListener("click", pushButtonSubmitImt);
    document.body.addEventListener("click", backItem8);
    document.body.addEventListener("click", pushButtonBackItem8);
    document.body.addEventListener("click", pushImt);
    document.body.addEventListener("click", calculateDailyCalorieContent);
    document.body.addEventListener("click", backItem8);


});