window.addEventListener("load", () => {
        let obj;
        let step;
        let countButtonNavigation;
        let tableWidth;
        let widthTd1;
        let widthTd2;
        let widthTd3;
        let widthTd4;
        let widthTd5;
        let productArray = [];
        let products;
        let addProductsHeader = function (e) {
            if (e.target.id === "item1b" || e.target.id === "backUp") {
                document.getElementById("column1").innerHTML = "";
                let containerWidth = document.getElementById("column1").offsetWidth;
                tableWidth = (containerWidth / 100) * 98;
                let tmpMain = '';
                tmpMain += '<div id="productsDiv1">Пищевая ценность продуктов <button id="newProductButton">Добавить новый продукт</button></div>';
                tmpMain += '<div id="productsDiv2">';
                tmpMain += '<i>На этой владке приведены сведения о пищевой ценности добавленных Вами продуктов. Здесь Вы можите редактировать их названия и пищевую ценность. Нажмите на интерисующий Вас\n' +
                    '                    элемент для правки.<br> Для сохранения изменений нажмите <b>Enter</b> или на другой элемент.</i>';
                tmpMain += '</div>';
                tmpMain += '<div id="search" style="width: ' + tableWidth + 'px">';
                tmpMain += '<b>Отображать</b>';
                tmpMain += '<select id="selectCountProduct">';
                tmpMain += '<option>10</option>';
                tmpMain += '<option>20</option>';
                tmpMain += '<option>50</option>';
                tmpMain += '<option>100</option>';
                tmpMain += '</select>';
                tmpMain += '<b>записей на страницу</b>';
                tmpMain += '</div>';
                tmpMain += '<div id="productsTable"></div>';
                document.getElementById("column1").innerHTML = tmpMain;
                widthTd1 = (containerWidth / 100) * 37;
                widthTd2 = (containerWidth / 100) * 14;
                widthTd3 = (containerWidth / 100) * 16;
                widthTd4 = (containerWidth / 100) * 18;
                widthTd5 = (containerWidth / 100) * 12;

                let tmp = '';
                tmp += '<table id ="table" style="width: ' + tableWidth + 'px">';
                tmp += '<thead>';
                tmp += '<tr>';
                tmp += '<td style="width: ' + widthTd1 + 'px">Наименование продукта</td>';
                tmp += '<td style="width: ' + widthTd2 + 'px">Белки, г/100 гр</td>';
                tmp += '<td style="width: ' + widthTd3 + 'px">Жиры, г/100 гр</td>';
                tmp += '<td style="width: ' + widthTd4 + 'px">Углеводы, г/100 гр</td>';
                tmp += '<td style="width: ' + widthTd5 + 'px">Ккал/100гр</td>';
                tmp += '</tr>';
                tmp += '</thead>';
                tmp += '<tbody id="tbBody">' + '</tbody>';
                tmp += '<tfoot id="tfoot">' + '</tfoot>';
                tmp += '</table>';
                document.getElementById("productsTable").innerHTML = tmp;


                const xhr1 = new XMLHttpRequest();
                xhr1.open('GET', 'http://localhost:8080/api/v1/product', false);
                xhr1.send();
                products = JSON.parse(xhr1.responseText);

                let count = createTableContent(products, 0);
                createTfoot(count, products);
                createNavigationPanel(products, 0);

                document.querySelector("select").addEventListener("change", function (e) {
                    count = createTableContent(products, 0);
                    createTfoot(count, products);
                    createNavigationPanel(products, count);

                })


                document.getElementById("tbBody").addEventListener("click", createInput);
                document.querySelector("tfoot").addEventListener("click", clickNavigationPanel);
                document.querySelector("tfoot").addEventListener("click", clickStepForward);
                document.querySelector("tfoot").addEventListener("click", clickStepBack);
                document.querySelector("tfoot").addEventListener("click", clickButtonFirstPage);
                document.querySelector("tfoot").addEventListener("click", clickButtonLastPage);
                document.getElementById("tbBody").addEventListener("keypress", pressButtonEnter);
            }
        }


        let idTd = null;
        let valueTd;
        let createInput = function (e) {
            if (e.target.localName === "td") {
                if (idTd === null) {
                    idTd = e.target.id;
                    valueTd = e.target.firstChild.nodeValue;
                    e.target.innerHTML = "";
                    let td = e.target;
                    let width = td.offsetWidth;
                    let tmp = '';
                    width -= 15;
                    tmp += '<input id="input" type="text" style="width: ' + width + 'px; height: 17px; border-radius: 5px" value="' + valueTd + '">';
                    td.innerHTML = tmp;
                    let input = document.getElementById("input");
                    input.focus();
                    input.selectionStart = input.value.length;
                } else {
                    let td1 = document.getElementById(idTd);
                    if (td1 === null) {
                        let td = e.target;
                        let width = td.offsetWidth;
                        idTd = td.id;
                        valueTd = td.firstChild.nodeValue;
                        td.innerHTML = "";
                        width -= 15;
                        let tmp = '';
                        tmp += '<input id="input" type="text" style="width: ' + width + 'px; height: 17px; border-radius: 5px" value="' + valueTd + '">';
                        td.innerHTML = tmp;
                        let input = document.getElementById("input");
                        input.focus();
                        input.selectionStart = input.value.length;
                    }

                    td1.innerHTML = "";
                    td1.innerText = valueTd;
                    idTd = e.target.id;
                    valueTd = e.target.firstChild.nodeValue;
                    e.target.innerHTML = "";
                    let td = e.target;
                    let width = td.offsetWidth;
                    let tmp = '';
                    tmp += '';
                    width -= 15;
                    tmp += '<input id="input" type="text" style="width: ' + width + 'px; height: 17px; border-radius: 5px" value="' + valueTd + '">';
                    td.innerHTML = tmp;
                    let input = document.getElementById("input");
                    input.focus();
                    input.selectionStart = input.value.length;
                }


                let input = document.getElementById(idTd);
                input.onchange = function () {
                    const url = 'http://localhost:8080/api/v1/product/edit';
                    let valueInfo = input.id;
                    let value = input.firstChild.value;
                    let td = document.getElementById(idTd);
                    td.innerHTML = "";
                    td.innerText = value;
                    idTd = null;
                    let sendJson = JSON.stringify({newProduct: value, productParameter: valueInfo});
                    const xhr1 = new XMLHttpRequest();
                    xhr1.open('POST', url);
                    xhr1.setRequestHeader('Content-Type', 'application/json')
                    xhr1.send(sendJson);
                }
            }
        }

        let pressButtonEnter = function (e) {
            if (e.keyCode === 13) {
                sendJsonToServer();
            }
        }

        let createNavigationPanel = function (products, count) {
            let startPosition = 0;
            let endPosition = startPosition + 5;
            let select = document.getElementById("selectCountProduct");
            let countSelect = select.options[select.selectedIndex].value;
            let element = document.getElementById("navigationContainer");
            let lastPage = document.getElementById("divAngelRight");
            countButtonNavigation = products.length / countSelect;
            countButtonNavigation = Math.ceil(countButtonNavigation);
            if (countButtonNavigation > 5 && count > (countSelect * 2)) {
                startPosition = (count / countSelect) - 2;
                endPosition = startPosition + 5;
            }
            if (startPosition >= (countButtonNavigation - 5) && (countButtonNavigation - 5) > 0) {
                startPosition = countButtonNavigation - 5;
            }
            if (countButtonNavigation > 0) {
                for (let i = startPosition; i < endPosition; i++) {
                    let div = document.createElement("div");
                    div.innerText = (i + 1);
                    div.className = "navigationWidth" + " " + "pointer";
                    div.id = "navigationNumber";
                    element.insertBefore(div, lastPage);
                    if ((i + 2) > countButtonNavigation) {
                        break;
                    }
                }
            }
        }


        let createTableContent = function (products, step) {
            document.getElementById("tbBody").innerHTML = "";
            let select = document.getElementById("selectCountProduct");
            let count = select.options[select.selectedIndex].value;
            let startPosition = 0;
            let stopPosition = count;
            if (step === 2) {
                startPosition = count;
                stopPosition = count * 2;
            }
            if (step > 2) {
                startPosition = count * (step - 1);
                stopPosition = count * step;
            }

            let tmp = '';
            for (let i = startPosition; i < products.length; i++) {
                let product = products[i];
                let productName = product.productName;
                let proteins = product.proteins;
                let fats = product.fats;
                let carbohydrates = product.carbohydrates;
                let calorieContent = product.calorieContent;
                let productId = product.productId;
                tmp += '<tr id="' + String(i) + '">';
                tmp += '<td id="column1productId' + productId + 'td' + i + '">' + productName + '</td>';
                tmp += '<td id="column2productId' + productId + 'td' + i + '">' + proteins + '</td>';
                tmp += '<td id="column3productId' + productId + 'td' + i + '">' + fats + '</td>';
                tmp += '<td id="column4productId' + productId + 'td' + i + '">' + carbohydrates + '</td>'
                tmp += '<td id="column5productId' + productId + 'td' + i + '">' + calorieContent + '</td>'
                tmp += '</tr>';
                if (i === (products.length - 1)) {
                    document.getElementById("tbBody").innerHTML = tmp;
                    return (i + 1);
                }
                if (i === (stopPosition - 1)) {
                    document.getElementById("tbBody").innerHTML = tmp;
                    return (i + 1);
                }
            }
        }


        let createTfoot = function (count, products) {
            if (count === undefined) {
                count = 0;
            }
            if (products.length === undefined) {
                products.length = 0;
            }
            let tfoot = document.getElementById("tfoot");
            tfoot.innerHTML = "";
            let tmp = '';
            tmp += '<tr>';
            tmp += '<td>Показаны ' + count + ' записей из ' + products.length + ' </td>';
            tmp += '<td colspan="4">';
            tmp += '<div id="navigationContainer" style="display: flex; justify-content: flex-end">';
            tmp += '<div id="firstPage" class="pointer">Первая</div>';
            tmp += '<div>';
            tmp += '<i id="angelLeft" class="fas fa-angle-double-left pointer navigationWidth"></i>';
            tmp += '</div>';
            tmp += '<div id="divAngelRight">';
            tmp += '<i id="angelRight" class="fas fa-angle-double-right pointer navigationWidth"></i>';
            tmp += '</div>';
            tmp += '<div id="lastPage" class="pointer">Последняя</div>';
            tmp += '</div>';
            tmp += '</td>'
            tmp += '</tr>';
            tfoot.innerHTML = tmp;
            let table = document.getElementById("table");
            table.append(tfoot);

        }


        let clickNavigationPanel = function (e) {
            if (e.target.id === "navigationNumber") {
                let stepStr = e.target.firstChild.data;
                step = Number(stepStr);
                let count = createTableContent(products, step)
                createTfoot(count, products);
                createNavigationPanel(products, count);
            }
        }

        let clickStepForward = function (e) {
            if (e.target.id === "angelRight") {
                if (step < countButtonNavigation) {
                    step += 1;
                }
                let count = createTableContent(products, (step));
                createTfoot(count, products);
                createNavigationPanel(products, count);
            }
        }

        let clickStepBack = function (e) {
            if (e.target.id === "angelLeft") {
                if (step > 1) {
                    step -= 1;
                }
                let count = createTableContent(products, step);
                createTfoot(count, products);
                createNavigationPanel(products, count);
            }
        }

        let clickButtonFirstPage = function (e) {
            if (e.target.id === "firstPage") {
                let count = createTableContent(products, 1);
                createTfoot(count, products);
                createNavigationPanel(products, count);
            }
        }

        let clickButtonLastPage = function (e) {
            if (e.target.id === "lastPage") {
                let count = createTableContent(products, countButtonNavigation);
                createTfoot(count, products);
                createNavigationPanel(products, count);
            }
        }

        let createNewProductTab = function (e) {
            if (e.target.id === 'newProductButton') {
                document.getElementById("column1").innerHTML = "";
                let tmp = '';
                tmp += '<div style="display: flex; justify-content:space-between; align-items: center">';
                tmp += '<div id="newProductHead">Довавить новый продукт</div>';
                tmp += '<button id="backUp" style="height: 25px; margin-right: 10px; border-radius: 5px; cursor: pointer">Вернуться назад</button>';
                tmp += '</div>';
                tmp += '<p id="message" style="color: #ff253a; margin-left: 10px"></p>';
                tmp += '<table id ="tableNewProduct" style="width: ' + tableWidth + 'px">';
                tmp += '<thead>';
                tmp += '<tr>';
                tmp += '<td style="width: ' + widthTd1 + 'px">Наименование продукта</td>';
                tmp += '<td style="width: ' + widthTd2 + 'px">Белки, г/100 гр</td>';
                tmp += '<td style="width: ' + widthTd3 + 'px">Жиры, г/100 гр</td>';
                tmp += '<td style="width: ' + widthTd4 + 'px">Углеводы, г/100 гр</td>';
                tmp += '<td style="width: ' + widthTd5 + 'px">Ккал/100гр</td>';
                tmp += '</tr>';
                tmp += '</thead>';
                tmp += '<tbody id="tbBodyNewProduct">';
                tmp += '<tr>';
                tmp += '<td><label><input type="text" style="width: ' + (widthTd1 - 10) + 'px; border-radius: 5px""></label></td>';
                tmp += '<td><label><input type="text" style="width: ' + (widthTd2 - 10) + 'px; border-radius: 5px"></label></td>';
                tmp += '<td><label><input type="text" style="width: ' + (widthTd3 - 10) + 'px; border-radius: 5px"></label></td>';
                tmp += '<td><label><input type="text" style="width: ' + (widthTd4 - 10) + 'px; border-radius: 5px"></label></td>';
                tmp += '<td><label><input type="text" style="width: ' + (widthTd5 - 10) + 'px; border-radius: 5px"></label></td>';
                tmp += '</tr>';
                tmp += '</tbody>';
                tmp += '<tfoot id="newProductTfoot"><tr><td colspan="5"><button id="addNewProductButton">Добавить</button></td></tr></tfoot>';
                tmp += '</table>';
                tmp += '<p></p>'
                tmp += '<div id="addedTable"></div>'
                document.getElementById("column1").innerHTML = tmp;
                document.body.addEventListener("click", pushAddNewProductButton);
                document.body.addEventListener("click", clickButtonBackUp);
            }

        }

        let pushAddNewProductButton = function (e) {

            if (e.target.id === "addNewProductButton") {
                document.getElementById("message").innerHTML = "";
                let nodeInput = document.querySelectorAll("input");
                let productName = nodeInput[0].value;
                let proteins = nodeInput[1].value;
                let fats = nodeInput[2].value;
                let carbohydrates = nodeInput[3].value;
                let calorieContent = nodeInput[4].value;
                let send = true;
                let product = new Array();


                if (productName === "") {
                    document.getElementById("message").innerText = "Значение в поле наименование продукта не должно быть пустым !!!"
                    send = false;
                }

                if (proteins === "") {
                    document.getElementById("message").innerText = "Значение в поле белки не должно быть пустым !!!"
                    send = false;
                }

                if (fats === "") {
                    document.getElementById("message").innerText = "Значение в поле жиры не должно быть пустым !!!"
                    send = false;
                }

                if (carbohydrates === "") {
                    document.getElementById("message").innerText = "Значение в поле углеводы не должно быть пустым !!!"
                    send = false;
                }

                if (calorieContent === "") {
                    document.getElementById("message").innerText = "Значение в поле каллорийность не должно быть пустым !!!"
                    send = false;
                }

                let numProteinsProduct = Number(proteins);
                if (isNaN(numProteinsProduct)) {
                    document.getElementById("message").innerText = "Значение в поле белки должно быть числовым !!!"
                    send = false;
                }
                let numFatsProduct = Number(fats);
                if (isNaN(numFatsProduct)) {
                    document.getElementById("message").innerText = "Значение в поле жиры должно быть числовым !!!"
                    send = false;
                }

                let numCarbohydratesProduct = Number(carbohydrates);
                if (isNaN(numCarbohydratesProduct)) {
                    document.getElementById("message").innerText = "Значение в поле углеводы должно быть числовым !!!"
                    send = false;
                }

                let numCalorieContentProduct = Number(calorieContent);
                if (isNaN(numCalorieContentProduct)) {
                    document.getElementById("message").innerText = "Значение в поле каллорийность должно быть числовым !!!"
                    send = false;
                }
                if(send === true){
                    product.push(productName);
                    product.push(proteins);
                    product.push(fats);
                    product.push(carbohydrates);
                    product.push(calorieContent);
                    productArray.push(product);
                }

                if (send === true) {
                    let sendJson = JSON.stringify({
                        productName: productName,
                        proteins: proteins,
                        fats: fats,
                        carbohydrates: carbohydrates,
                        calorieContent: calorieContent
                    });
                    const xhr1 = new XMLHttpRequest();
                    xhr1.open('POST', 'http://localhost:8080/api/v1/product/create/newProduct');
                    xhr1.setRequestHeader('Content-Type', 'application/json')
                    xhr1.send(sendJson);
                    addedProductsTable();
                    let nodeInput = document.querySelectorAll("input");
                    for (let i = 0; i < nodeInput.length; i++) {
                        nodeInput[i].value = '';
                    }
                }
            }
        }

        let addedProductsTable = function () {
            document.getElementById("addedTable").innerHTML = '';
            let tmp = '';
            tmp += '<p style="margin-left: 10px; font-weight: bold; font-family: cursive">Добавленные Вами продукты</p>';
            tmp += '<p></p>';
            let divAdded = document.getElementById("addedTable");
            tmp += '';
            tmp += '<table style="width: ' + tableWidth + 'px; border-collapse: collapse; border: 1px solid black; text-align: center; margin-left: 10px">';
            tmp += '<thead>';
            tmp += '<tr>';
            tmp += '<td style="width: ' + widthTd1 + 'px; border: 1px solid black">Наименование продукта</td>';
            tmp += '<td style="width: ' + widthTd2 + 'px; border: 1px solid black">Белки, г/100 гр</td>';
            tmp += '<td style="width: ' + widthTd3 + 'px; border: 1px solid black">Жиры, г/100 гр</td>';
            tmp += '<td style="width: ' + widthTd4 + 'px; border: 1px solid black">Углеводы, г/100 гр</td>';
            tmp += '<td style="width: ' + widthTd5 + 'px; border: 1px solid black">Ккал/100гр</td>';
            tmp += '</tr>';
            tmp += '</thead>';
            tmp += '<tbody>';
            for (let i = 0; i < productArray.length; i++) {
                let product = productArray[i];
                tmp += '<tr>';
                tmp += '<td style="width: ' + widthTd1 + 'px; border: 1px solid black">' + product[0] + '</td>';
                tmp += '<td style="width: ' + widthTd2 + 'px; border: 1px solid black">' + product[1] + '</td>';
                tmp += '<td style="width: ' + widthTd3 + 'px; border: 1px solid black">' + product[2] + '</td>';
                tmp += '<td style="width: ' + widthTd4 + 'px; border: 1px solid black">' + product[3] + '</td>';
                tmp += '<td style="width: ' + widthTd5 + 'px; border: 1px solid black">' + product[4] + '</td>';
                tmp += '</tr>';
            }
            tmp += '</tbody';
            tmp += '</table';
            divAdded.innerHTML = tmp;
        }

        let sendJsonToServer = function () {
            let nodeTd = document.getElementById(idTd);
            let nodeInput = document.querySelectorAll("input");
            let input = nodeInput[0];
            let value = input.value;
            let valueInfo = nodeTd.id;
            let td = document.getElementById(idTd);
            td.innerHTML = "";
            td.innerText = value;
            idTd = null;
            let sendJson = JSON.stringify({newProduct: value, productParameter: valueInfo});
            const xhr1 = new XMLHttpRequest();
            xhr1.open('POST', 'http://localhost:8080/api/v1/product/edit');
            xhr1.setRequestHeader('Content-Type', 'application/json');
            xhr1.send(sendJson);
        }

        let clickButtonBackUp = function (e) {
            if (e.target.id === "backUp") {
                addProductsHeader();
            }
        }


        document.body.addEventListener("click", createNewProductTab);

        document.body.addEventListener("click", addProductsHeader);
    }
)