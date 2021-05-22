window.addEventListener("load", () => {

    let barElem = document.getElementById("item1");
    barElem.onclick = function (e) {
        let elements = barElem.querySelectorAll("div");
        for (let elem of elements) {
            elem.style.backgroundColor = 'rgb(' + 238 + ',' + 213 + ',' + 71 + ')';
            elem.style.border = "1px solid black";
        }
        let targetElem = e.target;
        targetElem.style.backgroundColor = 'rgb(' + 245 + ',' + 243 + ',' + 229 + ')';
        targetElem.style.borderWidth = "1px 1px 0 1px";
        targetElem.style.borderColor = "black";
        targetElem.style.borderStyle = "solid";
    }
    window.addEventListener("click", barElem);


    let calculateDailyCalorieContent = function (e) {
        if (e.target.id === "item1e") {
            let container = document.getElementById("column1");
            container.innerHTML = "";
            let form = document.createElement("form");
            form.id = "formDC";
            let p1 = document.createElement("p");
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
            span1.innerText = "(лет)";
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
            span2.innerText = "(см)";
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
            span3.innerText = "(кг)";
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
            i.id = "prompt";
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
            form.appendChild(button1);
            document.getElementById("column1").appendChild(form);
            let divResultDC = document.createElement("div");
            divResultDC.id = "resultDC";
            document.getElementById("column1").appendChild(divResultDC);
        }
    }

    window.addEventListener("click", calculateDailyCalorieContent);

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
            let cont = document.getElementById("column1");
            cont.style.textAlign = "center";
            let divResult = document.getElementById("resultDC");
            divResult.style.fontSize = 1.5 + "vw";
            divResult.innerText = "Ваша дневная каллорийность : " + " " + brm + " " + "Ккал";
            let DCResult = document.getElementById("DCResult");
            DCResult.innerText = '  ' + brm;
            const calorieContent = {
                calorieContent: brm
            };


            let sendJson = JSON.stringify(calorieContent);
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost:8080/api/v1/product/calorieContent', false);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(sendJson);
        }
    }
    window.addEventListener("click", pushCalculateButton);


})