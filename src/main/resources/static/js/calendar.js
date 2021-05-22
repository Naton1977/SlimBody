window.addEventListener("load", () => {
    let prod;

    calendar = {};

    // Названия месяцев
    calendar.monthName = [
        'Январь', 'Февраль', 'Март', 'Апрель',
        'Май', 'Июнь', 'Июль', 'Август',
        'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];

    // Названия дней недели
    calendar.dayName = [
        'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'
    ];

    // Выбранная дата
    calendar.selectedDate = {
        'Day': null,
        'Month': null,
        'Year': null
    };

    // ID элемента для размещения календарика
    calendar.element_id = null;

    // Выбор даты
    calendar.selectDate = function (day, month, year) {
        calendar.selectedDate = {
            'Day': day,
            'Month': month,
            'Year': year
        };
        calendar.drawCalendar(month, year);
    }

    // Отрисовка календарика на выбранный месяц и год
    calendar.drawCalendar = function (month, year) {
        var tmp = '';
        tmp += '<table class="calendar" cellspacing="0" cellpadding="0">';

        // Месяц и навигация
        tmp += '<tr>';
        tmp += '<td class="navigation" ' +
            'onclick="calendar.drawCalendar(' + (month > 1 ? (month - 1) : 12) +
            ',' + (month > 1 ? year : (year - 1)) + ');">&#9668;<\/td>';
        tmp += '<td colspan="5" class="navigation" ' +
            'onclick="calendar.drawCalendar(' +
            calendar.selectedDate.Month + ',' +
            calendar.selectedDate.Year + ');">' +
            calendar.monthName[(month - 1)] + '&nbsp;-&nbsp;' + year + '<\/td>';
        tmp += '<td class="navigation" ' +
            'onclick="calendar.drawCalendar(' + (month < 12 ? (month + 1) : 1) +
            ',' + (month < 12 ? year : (year + 1)) + ');">&#9658;<\/td>';
        tmp += '<\/tr>';

        // Шапка таблицы с днями недели
        tmp += '<tr>';
        tmp += '<th>' + calendar.dayName[0] + '<\/th>';
        tmp += '<th>' + calendar.dayName[1] + '<\/th>';
        tmp += '<th>' + calendar.dayName[2] + '<\/th>';
        tmp += '<th>' + calendar.dayName[3] + '<\/th>';
        tmp += '<th>' + calendar.dayName[4] + '<\/th>';
        tmp += '<th class="holiday">' + calendar.dayName[5] + '<\/th>';
        tmp += '<th class="holiday">' + calendar.dayName[6] + '<\/th>';
        tmp += '<\/tr>';

        // Количество дней в месяце
        var total_days = 32 - new Date(year, (month - 1), 32).getDate();
        // Начальный день месяца
        var start_day = new Date(year, (month - 1), 1).getDay();
        if (start_day === 0) {
            start_day = 7;
        }
        start_day--;
        // Количество ячеек в таблице
        var final_index = Math.ceil((total_days + start_day) / 7) * 7;

        var day = 1;
        var index = 0;
        do {
            // Начало строки таблицы
            if (index % 7 === 0) {
                tmp += '<tr>';
            }
            // Пустые ячейки до начала месяца или после окончания
            if ((index < start_day) || (index >= (total_days + start_day))) {
                tmp += '<td class="grayed">&nbsp;<\/td>';
            } else {
                var class_name = '';
                // Выбранный день
                if (calendar.selectedDate.Day === day &&
                    calendar.selectedDate.Month === month &&
                    calendar.selectedDate.Year === year) {
                    class_name = 'selected';
                }
                // Праздничный день
                else if (index % 7 === 6 || index % 7 === 5) {
                    class_name = 'holiday';
                }
                // Ячейка с датой
                tmp += '<td class="' + class_name + '" ' +
                    'onclick="calendar.selectDate(' +
                    day + ',' + month + ',' + year + ');">' + day + '<\/td>';
                day++;
            }
            // Конец строки таблицы
            if (index % 7 === 6) {
                tmp += '<\/tr>';
            }
            index++;
        }
        while (index < final_index);

        tmp += '<\/table>';

        // Вставить таблицу календарика на страницу
        var el = document.getElementById(calendar.element_id);
        if (el) {
            el.innerHTML = tmp;
        }
    }

    // ID элемента для размещения календарика
    calendar.element_id = 'calendar_table';

    // По умолчанию используется текущая дата
    calendar.selectedDate = {
        'Day': new Date().getDate(),
        'Month': parseInt(new Date().getMonth()) + 1,
        'Year': new Date().getFullYear()
    };

    // Нарисовать календарик
    calendar.drawCalendar(
        calendar.selectedDate.Month,
        calendar.selectedDate.Year
    );


    document.getElementById("calendar_table").addEventListener("click", function (e) {
        let value = e.target.attributes[1].nodeValue;
        let index1 = value.indexOf("(");
        let index2 = value.indexOf(")");
        let date = value.substring(index1 + 1, index2);
        let re = /,/gi;
        let newSt = date.replace(re, "-");
        const xhr1 = new XMLHttpRequest();
        xhr1.open('GET', 'http://localhost:8080/api/v1/product/specified' + '/' + newSt, false);
        xhr1.send();
        prod = JSON.parse(xhr1.responseText);
        if (prod.length > 0) {
            document.getElementById("containerDietaryRation").innerHTML = "";
            let containerWidth = document.getElementById("column1").offsetWidth;
            tableWidth = (containerWidth / 100) * 98;
            widthTd1 = (containerWidth / 100) * 8;
            widthTd2 = (containerWidth / 100) * 46;
            widthTd3 = (containerWidth / 100) * 8;
            widthTd4 = (containerWidth / 100) * 8;
            widthTd5 = (containerWidth / 100) * 8;
            widthTd6 = (containerWidth / 100) * 12;
            widthTd7 = (containerWidth / 100) * 8;
            calorieCount = 0;
            let date = new Date(prod[0].dateAdded);
            let userYear = date.getFullYear();
            let userMonth = date.getMonth() + 1;
            let userDay = date.getDate();

            if (userMonth === 1) {
                userMonth = "Января"
            }
            if (userMonth === 2) {
                userMonth = "Февраля"
            }
            if (userMonth === 3) {
                userMonth = "Марта"
            }
            if (userMonth === 4) {
                userMonth = "Апреля"
            }
            if (userMonth === 5) {
                userMonth = "Мая"
            }
            if (userMonth === 6) {
                userMonth = "Июня"
            }
            if (userMonth === 7) {
                userMonth = "Июля"
            }
            if (userMonth === 8) {
                userMonth = "Августа"
            }
            if (userMonth === 9) {
                userMonth = "Сентября"
            }
            if (userMonth === 10) {
                userMonth = "Октября"
            }
            if (userMonth === 11) {
                userMonth = "Ноября"
            }
            if (userMonth === 12) {
                userMonth = "Декабря"
            }
            let container = document.getElementById("containerDietaryRation");
            let p = document.createElement("p");
            p.className = "title";
            p.innerText = userDay + " " + userMonth + " " + userYear;
            p.style.borderWidth = "0 0 2px 0";
            p.style.borderColor = "black";
            p.style.borderStyle = "solid";
            p.style.paddingBottom = "15px";
            p.style.width = tableWidth + "px";
            container.appendChild(p);
            let table = document.createElement("table");
            table.className = "pageDietTable";
            table.style.width = tableWidth + "px";
            let tHead = document.createElement("thead");
            tHead.className = "pageDietThead";
            let trThead = document.createElement("tr");
            let tdThead1 = document.createElement("td");
            tdThead1.innerText = "Время";
            tdThead1.style.width = widthTd1 + "px";

            let tdThead2 = document.createElement("td");
            tdThead2.innerText = "Наименование";
            tdThead2.style.width = widthTd2 + "px";

            let tdThead3 = document.createElement("td");
            tdThead3.innerText = "Вес";
            tdThead3.style.width = widthTd3 + "px";

            let tdThead4 = document.createElement("td");
            tdThead4.innerText = "Белки";
            tdThead4.style.width = widthTd4 + "px";

            let tdThead5 = document.createElement("td");
            tdThead5.innerText = "Жиры";
            tdThead5.style.width = widthTd5 + "px";

            let tdThead6 = document.createElement("td");
            tdThead6.innerText = "Углеводы";
            tdThead6.style.width = widthTd6 + "px";
            let tdThead7 = document.createElement("td");
            tdThead7.innerText = "Ккалл";
            tdThead7.style.width = widthTd7 + "px";
            trThead.appendChild(tdThead1);
            trThead.appendChild(tdThead2);
            trThead.appendChild(tdThead3);
            trThead.appendChild(tdThead4);
            trThead.appendChild(tdThead5);
            trThead.appendChild(tdThead6);
            trThead.appendChild(tdThead7);
            tHead.appendChild(trThead);
            table.appendChild(tHead);
            let tBody = document.createElement("tBody");
            tBody.id = "tbodyDietTable" + userYear + userMonth + userDay;
            table.appendChild(tBody);
            let tFoot = document.createElement("tFoot");
            tFoot.id = "tfootDietTable" + userYear + userMonth + userDay;
            tFoot.style.borderStyle = "solid";
            tFoot.style.borderWidth = "1px 0 1px 0";
            tFoot.style.borderColor = "black";
            table.appendChild(tFoot);
            container.appendChild(table);
            createDietTableContent(date, userYear, userMonth, userDay);
        }
    })


    let createDietTableContent = function (date, userYearId, userMonthId, userDayId) {
        let userYear = date.getFullYear();
        let userMonth = date.getMonth() + 1;
        let userDay = date.getDate();
        for (let i = 0; i < prod.length; i++) {
            let date1 = new Date(prod[i].dateAdded);
            let productYear = date1.getFullYear();
            let productMonth = date1.getMonth() + 1;
            let productDay = date1.getDate();
            if (userYear === productYear && userMonth === productMonth && userDay === productDay) {
                let hoursDateAdded = date1.getHours();
                let minutesDateAdded = date1.getMinutes();
                if (hoursDateAdded < 10) {
                    hoursDateAdded = "0" + hoursDateAdded;
                }


                if (minutesDateAdded < 10) {
                    minutesDateAdded = "0" + date1.getMinutes();
                }
                let timeDateAdded = hoursDateAdded + " : " + minutesDateAdded;

                let tr = document.createElement("tr");
                let td1 = document.createElement("td");
                td1.innerText = timeDateAdded;
                let td2 = document.createElement("td");
                td2.innerText = prod[i].productTitle;
                let td3 = document.createElement("td");
                td3.innerText = prod[i].productWeight;
                let td4 = document.createElement("td");
                td4.innerText = prod[i].productProteins;
                let td5 = document.createElement("td");
                td5.innerText = prod[i].productFats;
                let td6 = document.createElement("td");
                td6.innerText = prod[i].productCarbohydrates;
                let td7 = document.createElement("td");
                td7.innerText = prod[i].calorieContent;

                calorieCount += Number(prod[i].calorieContent);
                calorieCount = Math.floor(calorieCount * 100) / 100;
                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);
                tr.appendChild(td6);
                tr.appendChild(td7);
                let id = "tbodyDietTable" + userYearId + userMonthId + userDayId;
                let tBody = document.getElementById(id);
                tBody.appendChild(tr);
            }
        }
        let id = "tfootDietTable" + userYearId + userMonthId + userDayId;
        let tfoot = document.getElementById(id);
        let tr1 = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");
        let td6 = document.createElement("td");
        let td7 = document.createElement("td");
        td7.innerText = "Итого :";
        td7.style.fontWeight = "bold";
        tr1.appendChild(td1);
        tr1.appendChild(td2);
        tr1.appendChild(td3);
        tr1.appendChild(td4);
        tr1.appendChild(td5);
        tr1.appendChild(td6);
        tr1.appendChild(td7);
        tfoot.appendChild(tr1);


        let tr2 = document.createElement("tr");
        let td8 = document.createElement("td");
        let td9 = document.createElement("td");
        let td10 = document.createElement("td");
        let td11 = document.createElement("td");
        let td12 = document.createElement("td");
        let td13 = document.createElement("td");
        let td14 = document.createElement("td");
        td14.innerText = calorieCount;
        tr2.appendChild(td8);
        tr2.appendChild(td9);
        tr2.appendChild(td10);
        tr2.appendChild(td11);
        tr2.appendChild(td12);
        tr2.appendChild(td13);
        tr2.appendChild(td14);
        tfoot.appendChild(tr2);
    }


})

