window.addEventListener("load", () => {

        let widthTd1;
        let widthTd2;
        let widthTd3;
        let widthTd4;
        let widthTd5;
        let widthTd6;
        let widthTd7;
        let productValue = '';
        let productSearchArray = [];
        let sendTime;
        let products;
        let ration;
        let dailyCalorieContent = 0;
        let userYear;
        let userMonth;
        let userDay;
        let tableWidth;
        let userRationDate = [];
        let calorieCount = 0;
        let pathCount = 2;
        let sendRequest = false;
        let containerWidth;
        let bodyWidth;

        let createDietPageHead = function () {
            document.getElementById("column1").innerHTML = "";
            containerWidth = document.getElementById("column1").offsetWidth;
            bodyWidth = document.querySelector('body').offsetWidth;
            tableWidth = (containerWidth / 100) * 98;
            widthTd1 = (containerWidth / 100) * 8;
            widthTd2 = (containerWidth / 100) * 46;
            widthTd3 = (containerWidth / 100) * 8;
            widthTd4 = (containerWidth / 100) * 8;
            widthTd5 = (containerWidth / 100) * 8;
            widthTd6 = (containerWidth / 100) * 12;
            widthTd7 = (containerWidth / 100) * 8;
            let tmp = '';
            tmp += '<div id="pageDietHead">Дневник питания</div>';
            tmp += '<p class="title">За сегодня</p>';
            tmp += '<table class="pageDietTable" style="width: ' + tableWidth + 'px">';
            tmp += '<thead class="pageDietThead">';
            tmp += '<tr>';
            tmp += '<td style="width: ' + widthTd1 + 'px">Время</td>';
            tmp += '<td style="width: ' + widthTd2 + 'px">Наименование</td>';
            tmp += '<td style="width: ' + widthTd3 + 'px">Вес</td>';
            if (bodyWidth > 900) {
                tmp += '<td style="width: ' + widthTd4 + 'px">Белки</td>';
                tmp += '<td style="width: ' + widthTd5 + 'px">Жиры</td>';
                tmp += '<td style="width: ' + widthTd6 + 'px">Углеводы</td>';
            }
            tmp += '<td style="width: ' + widthTd7 + 'px">Ккалл</td>';
            tmp += '</tr>';
            tmp += '</thead>';
            tmp += '<tbody id="pageDietTBody"></tbody>';
            tmp += '<tfoot id="pageDietTFoot"></tfoot>'
            tmp += '</table>';
            tmp += '<div id="containerProductSearch" style="width: ' + tableWidth + 'px">';
            tmp += '<input type="text" id="time" style="width: ' + (widthTd1 - 10) + 'px; height: 22px"/>';
            tmp += '<div id="productSearch" style="width: ' + widthTd2 + 'px">';
            tmp += '<input type="text" id="inputSearch" style="width: ' + (widthTd2 - 10) + 'px; height: 22px" />';
            tmp += '<div id="containerSelect"></div>';
            tmp += '<p id="description">Введите первые 3-4 буквы названия продукта и выберите его из списка</p>';
            tmp += '</div>';
            tmp += '<input type="text" id="inputWeight" style="width: ' + (widthTd3 - 10) + 'px; height: 22px"/>';
            tmp += '<button id="SubmitSearch">Отправить</button>';
            tmp += '</div>';
            tmp += '<div id="containerDietaryRation"></div>';
            document.getElementById("column1").innerHTML = tmp;
            document.getElementById("inputSearch").focus();
        }


        let createLocalTime = function () {
            let hours = new Date().getHours();
            let minutes = new Date().getMinutes();

            if (hours < 10) {
                hours = "0" + hours;
            }

            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            let time = hours + " " + ":" + " " + minutes;
            sendTime = hours + ":" + minutes;
            let timeContainer = document.getElementById("time");
            timeContainer.value = time;
        }


        let addSearchTableEvent = function (e) {
            if (e.target.id === "item1a") {
                productSearchArray.length = 0;
                dailyCalorieContent = 0;
                userRationDate.length = 0;
                calorieCount = 0;
                createDietPageHead();
                createLocalTime();
                addFullProductList();
                clickButtonOnInputField();
            }
        }


        let addFullProductList = function () {
            const xhr1 = new XMLHttpRequest();
            xhr1.open('GET', 'http://localhost:8080/api/v1/product/productForRicipe', false);
            xhr1.send();
            products = JSON.parse(xhr1.responseText);
        }

        let searchProduct = function () {
            if (productValue.length < 3) {
                let div = document.getElementById("containerSelect");
                div.innerHTML = '';
            }

            if (productValue.length >= 3) {
                productSearchArray.length = 0;
                for (let i = 0; i < products.length; i++) {
                    let charAp = productValue.charAt(0).toLocaleUpperCase();
                    let newProductValue = charAp + productValue.substring(1, productValue.length);
                    let index = products[i].productName.includes(productValue);
                    let index2 = products[i].productName.includes(newProductValue);
                    if (index || index2) {
                        let productPresent = false;
                        for (let j = 0; j < productSearchArray.length; j++) {
                            if (productSearchArray[j].productName === products[i].productName) {
                                productPresent = true;
                            }
                        }
                        if (!productPresent) {
                            productSearchArray.push(products[i]);
                        }
                    }

                    if (i === (products.length - 1)) {
                        if (productSearchArray.length > 0) {
                            let tmp = '';
                            if (productSearchArray.length < 5) {
                                tmp += '<select id="selectProductName" style="width: ' + (widthTd2 - 10) + 'px" size="' + (productSearchArray.length + 1) + '">';
                            } else {
                                tmp += '<select id="selectProductName" style="width: ' + (widthTd2 - 10) + 'px" size="5">';
                            }
                            for (let j = 0; j < productSearchArray.length; j++) {
                                tmp += '<option value="' + productSearchArray[j].categoryProduct + productSearchArray[j].productId + '">' + productSearchArray[j].productName + '</option>';
                            }
                            tmp += '</select>'
                            let div = document.getElementById("containerSelect");
                            div.innerHTML = tmp;

                            let select = document.getElementById("selectProductName");
                            select.onchange = function () {
                                let productCategory;
                                let value = select.value;
                                let index1 = value.indexOf('product');
                                let index2 = value.indexOf('recipe');

                                if (index1 === 0) {
                                    value = value.substring(7, value.length);
                                    productCategory = 'product';
                                }
                                if (index2 === 0) {
                                    value = value.substring(6, value.length);
                                    productCategory = 'recipe';
                                }
                                let valueInt = parseInt(value);
                                for (let j = 0; j < products.length; j++) {
                                    if (valueInt === products[j].productId && productCategory === products[j].categoryProduct) {
                                        let input = document.getElementById("inputSearch");
                                        input.value = products[j].productName;
                                        document.getElementById("containerSelect").innerHTML = '';
                                        document.getElementById("inputWeight").focus();
                                    }
                                }
                            }
                        } else {
                            document.getElementById("containerSelect").innerHTML = '';
                        }
                    }
                }
            }
        }


        let clickButtonOnInputField = function () {
            let input = document.getElementById("inputSearch");
            input.onkeypress = function () {
                let searchValue = input.onkeypress.arguments[0].key;
                productValue += searchValue;
                searchProduct();
            }
        }

        let clickButton = function (e) {
            if (e.keyCode === 8 && e.target.id === "inputSearch") {
                let input = document.getElementById("inputSearch");
                productValue = input.value;
                productSearchArray.length = 0;
                searchProduct();
            }
        }


        let pushButtonSubmitSearchProduct = function (e) {
            if (e.target.id === "SubmitSearch") {
                let weight = document.getElementById("inputWeight").value;
                let weightInt = parseInt(weight);
                if (weightInt > 0) {
                    let productName = document.getElementById("inputSearch").value;
                    let id = document.getElementById("inputSearch").id;
                    if (productName !== '') {
                        for (let i = 0; i < products.length; i++) {
                            if (productName === products[i].productName) {
                                let now = new Date();
                                let year = now.getFullYear();
                                let month = now.getMonth() + 1;
                                let day = now.getDate();
                                let time = document.getElementById("time").value;
                                let timeIndex = time.indexOf(":");
                                let hours = time.substring(0, timeIndex);
                                let minutes = time.substring((timeIndex + 1), time.length);
                                const product = {
                                    productId: products[i].productId,
                                    weight: weightInt,
                                    time: year + "-" + month + "-" + day + "@" + hours.trim() + ":" + minutes.trim(),
                                    productCategory: products[i].categoryProduct
                                };

                                let sendJson = JSON.stringify(product);
                                const xhr1 = new XMLHttpRequest();
                                xhr1.open('POST', 'http://localhost:8080/api/v1/product/create/newProductToTheDailyDiet', false);
                                xhr1.setRequestHeader('Content-Type', 'application/json');
                                xhr1.send(sendJson);
                                productValue = '';
                                productSearchArray.length = 0;
                                dailyCalorieContent = 0;
                                userRationDate.length = 0;
                                calorieCount = 0;
                                createDietPageHead();
                                createLocalTime();
                                loadUserDiet();
                                clickButtonOnInputField();
                            }
                        }
                    }
                }
            }
        }


        let loadUserDiet = function () {
            let tmp = "";
            const xhr1 = new XMLHttpRequest();
            xhr1.open('GET', 'http://localhost:8080/api/v1/product/allRation' + '/' + pathCount, false);
            xhr1.send();
            ration = JSON.parse(xhr1.responseText);
            for (let i = 0; i < ration.length; i++) {
                let now = new Date();
                let dateAdded = new Date(ration[i].dateAdded);
                userYear = dateAdded.getFullYear();
                userMonth = dateAdded.getMonth() + 1;
                userDay = dateAdded.getDate();
                let year = now.getFullYear();
                let month = now.getMonth() + 1;
                let day = now.getDate();
                let hoursDateAdded = dateAdded.getHours();
                let minutesDateAdded = dateAdded.getMinutes();
                if (hoursDateAdded < 10) {
                    hoursDateAdded = "0" + hoursDateAdded;
                }


                if (minutesDateAdded < 10) {
                    minutesDateAdded = "0" + dateAdded.getMinutes();
                }
                let timeDateAdded = hoursDateAdded + " : " + minutesDateAdded;

                if (year === userYear && month === userMonth && day === userDay) {
                    tmp += createDietTableTBody(timeDateAdded, ration[i].productTitle, ration[i].productWeight, ration[i].productProteins, ration[i].productFats, ration[i].productCarbohydrates, ration[i].calorieContent)
                    dailyCalorieContent += Number(ration[i].calorieContent);
                }

            }
            insertProduct(tmp);
            createDietTableTFoot();
            countNumbersOfDates();
            createHistoryTable();
        }


        let createDietTableTBody = function (time, title, weight, proteins, fats, carbohidrates, calorieContent) {
            let tmp = "";
            tmp += "<tr>";
            tmp += "<td>" + time + "</td>";
            tmp += "<td>" + title + "</td>";
            tmp += "<td>" + weight + "</td>";
            if (bodyWidth > 900) {
                tmp += "<td>" + proteins + "</td>";
                tmp += "<td>" + fats + "</td>";
                tmp += "<td>" + carbohidrates + "</td>";
            }
            tmp += "<td>" + calorieContent + "</td>";
            tmp += "</tr>";
            return tmp;
        }

        let createDietTableTFoot = function () {
            let tmp = "";
            tmp += "<tr>";
            tmp += "<td></td>";
            tmp += "<td></td>";
            tmp += "<td></td>";
            if (bodyWidth > 900) {
                tmp += "<td></td>";
                tmp += "<td></td>";
                tmp += "<td></td>";
            }
            tmp += "<td style='font-weight: bold'>Итого :</td>";
            tmp += "</tr>";
            if (dailyCalorieContent !== 0) {
                let newCalorieContent = Math.floor(dailyCalorieContent * 100) / 100;
                tmp += "<tr>";
                tmp += "<td></td>";
                tmp += "<td></td>";
                tmp += "<td></td>";
                if (bodyWidth > 900) {
                    tmp += "<td></td>";
                    tmp += "<td></td>";
                    tmp += "<td></td>";
                }
                tmp += "<td>" + newCalorieContent + "</td>";
                tmp += "</tr>";
            }

            document.getElementById("pageDietTFoot").innerHTML = tmp;
        }


        let insertProduct = function (tmp) {
            let tBody = document.getElementById("pageDietTBody").innerHTML = tmp;
        }


        let clickButtonRation = function (e) {
            if (e.target.id === "item1a") {
                productValue = '';
                productSearchArray = [];
                dailyCalorieContent = 0;
                userRationDate = [];
                calorieCount = 0;
                pathCount = 2;
                sendRequest = false;
                createDietPageHead();
                createLocalTime();
                addFullProductList();
                clickButtonOnInputField();
                loadUserDiet();
            }
        }

        let countNumbersOfDates = function () {
            let now = new Date();
            let year = now.getFullYear();
            let month = now.getMonth() + 1;
            let day = now.getDate();
            for (let i = 0; i < ration.length - 1; i++) {
                let date1 = new Date(ration[i].dateAdded);
                let date2 = new Date(ration[i + 1].dateAdded);
                let userDate1 = date1.getDate();
                let userDate2 = date2.getDate();
                let userYear = date1.getFullYear();
                let userMonth = date1.getMonth() + 1;
                let userDay = date1.getDate();
                if (i === 0) {
                    if (day !== userDay) {
                        userRationDate.push(date1);
                    } else {
                        if (month !== userMonth) {
                            userRationDate.push(date1);
                        } else {
                            if (year !== userYear) {
                                userRationDate.push(date1);
                            }
                        }
                    }
                }

                if (userDate1 !== userDate2) {
                    userRationDate.push(date2);
                }
            }
        }

        let createHistoryTable = function () {
            for (let j = 0; j < userRationDate.length; j++) {
                calorieCount = 0;
                let date = userRationDate[j];
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
                tFoot.style.borderWidth = "1px 0 0 0";
                tFoot.style.borderColor = "black";
                table.appendChild(tFoot);
                container.appendChild(table);
                createDietTableContent(date, userYear, userMonth, userDay);
            }
        }


        let createDietTableContent = function (date, userYearId, userMonthId, userDayId) {
            let userYear = date.getFullYear();
            let userMonth = date.getMonth() + 1;
            let userDay = date.getDate();
            for (let i = 0; i < ration.length; i++) {
                let date1 = new Date(ration[i].dateAdded);
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
                    td2.innerText = ration[i].productTitle;
                    let td3 = document.createElement("td");
                    td3.innerText = ration[i].productWeight;
                    let td4 = document.createElement("td");
                    td4.innerText = ration[i].productProteins;
                    let td5 = document.createElement("td");
                    td5.innerText = ration[i].productFats;
                    let td6 = document.createElement("td");
                    td6.innerText = ration[i].productCarbohydrates;
                    let td7 = document.createElement("td");
                    td7.innerText = ration[i].calorieContent;

                    calorieCount += Number(ration[i].calorieContent);
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


        createDietPageHead();
        createLocalTime();
        addFullProductList();
        clickButtonOnInputField();
        loadUserDiet();

        window.onscroll = function () {
            let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
            if (windowRelativeBottom < document.documentElement.clientHeight + 5) {
                if (sendRequest === false) {
                    const xhr1 = new XMLHttpRequest();
                    xhr1.open('GET', 'http://localhost:8080/api/v1/product/allRation' + '/' + pathCount, false);
                    xhr1.send();
                    ration = JSON.parse(xhr1.responseText);
                    pathCount += 2;
                    sendRequest = true;
                    userRationDate.length = 0;
                    productSearchArray.length = 0;
                    countNumbersOfDates();
                    document.getElementById("containerDietaryRation").innerHTML = "";
                    createHistoryTable();
                    sendRequest = false;
                }
            }
        }

        document.body.addEventListener("click", addSearchTableEvent);
        document.body.addEventListener("keyup", clickButton);
        document.body.addEventListener("click", pushButtonSubmitSearchProduct);
        document.body.addEventListener("click", clickButtonRation);

    }
)