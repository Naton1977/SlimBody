window.addEventListener("load", () => {


    document.addEventListener("click", function (e) {
        if (e.target.id === "item1c") {

            let products;
            let productValue = '';
            let productSearchArray = [];
            let widthInput;
            let productId;
            let weight;
            let correctWeight = 0;
            let containerWidth;
            let containerWeight;
            let allRecipe;


            let addRecipeTable = function () {
                document.getElementById("column1").innerHTML = "";
                let tmp = '';
                tmp += '<div id="headerRecipe">Новый рецепт<button id="buttonAllRecipe">Посмотреть все рецепты</button></div>';
                tmp += '<div id="recipe">';
                tmp += '<div id="titleRecipeHeader">';
                tmp += '<p><b>Название</b></p>';
                tmp += '<input id="titleRecipe" type="text">';
                tmp += '<div id="products"><b>Продукты</b></div>';
                tmp += '<table id="tableRecipe">';
                tmp += '<thead id="theadRecipe"></thead>';
                tmp += '<tbody id="tbodyRecipe"></tbody>';
                tmp += '<tfoot id="tfootRecipe"></tfoot>';
                tmp += '</table>';
                tmp += '<div id="containerRecipeProductSearch"></div>';
                tmp += '<div id="descriptionRecipeProduct"></div>';
                tmp += '</div>';
                tmp += '<div id="weightRecipeHeader">';
                tmp += '<p><b>Выход</b></p>';
                tmp += '<table id="tableWeight">';
                tmp += '<tbody>';
                tmp += '<tr id="weightWithDishes"></tr>';
                tmp += '<tr id="dishes"></tr>';
                tmp += '<tr id="weightWithoutDishes"></tr>';
                tmp += '</tbody>';
                tmp += '</table>';
                tmp += '</div>';
                tmp += '</div>'
                tmp += '<button id="saveRecipe">Сохранить рецепт</button>';
                document.getElementById("column1").innerHTML = tmp;
            }
            addRecipeTable();


            containerWidth = document.getElementById("titleRecipeHeader").offsetWidth;

            let addTableRecipeTHead = function () {
                let thead = document.getElementById("theadRecipe");
                let tr1Thead = document.createElement("tr");
                let td1Thead = document.createElement("td");
                let td2Thead = document.createElement("td");
                let td3Thead = document.createElement("td");
                let tr2Thead = document.createElement("tr");
                tr2Thead.style.height = 15 + 'px';
                let td4Thead = document.createElement("td");
                let td5Thead = document.createElement("td");
                let td6Thead = document.createElement("td");
                td1Thead.innerText = "Наименование";
                td1Thead.style.fontWeight = "bold";
                td1Thead.style.width = (containerWidth / 100) * 60 + "px";
                td2Thead.innerText = "Вес";
                td2Thead.style.fontWeight = "bold";
                td2Thead.style.width = (containerWidth / 100) * 15 + "px";
                tr1Thead.appendChild(td1Thead);
                tr1Thead.appendChild(td2Thead);
                tr1Thead.appendChild(td3Thead);
                tr2Thead.appendChild(td4Thead);
                tr2Thead.appendChild(td5Thead);
                tr2Thead.appendChild(td6Thead);
                thead.appendChild(tr1Thead);
                thead.appendChild(tr2Thead);
            }
            addTableRecipeTHead();


            let addTableRecipeTfoot = function () {
                let tFoot = document.getElementById("tfootRecipe");
                let tr1Tfoot = document.createElement("tr");
                let tr2Tfoot = document.createElement("tr");
                tr1Tfoot.style.height = 20 + 'px';
                tr2Tfoot.style.marginTop = 20 + 'px';
                let td1Tfoot = document.createElement("td");
                let td2Tfoot = document.createElement("td");
                let td3Tfoot = document.createElement("td");
                let td4Tfoot = document.createElement("td");
                let td5Tfoot = document.createElement("td");
                let td6Tfoot = document.createElement("td");
                let input1Tfoot = document.createElement('input');
                input1Tfoot.style.width = (containerWidth / 100) * 60 + "px";
                widthInput = (containerWidth / 100) * 60;
                input1Tfoot.style.borderRadius = 5 + "px";
                input1Tfoot.id = 'inputSearchRecipe';
                let input2Tfoot = document.createElement('input');
                input2Tfoot.style.width = (containerWidth / 100) * 15 + "px";
                input2Tfoot.style.borderRadius = 5 + "px";
                input2Tfoot.id = 'inputWeightRecipe';
                let buttonTfoot = document.createElement('button');
                buttonTfoot.innerText = "Добавить";
                buttonTfoot.style.borderRadius = 5 + 'px';
                buttonTfoot.style.cursor = 'pointer';
                buttonTfoot.id = 'addProductRecipe';
                td4Tfoot.appendChild(input1Tfoot);
                td5Tfoot.appendChild(input2Tfoot);
                td6Tfoot.appendChild(buttonTfoot);
                tr1Tfoot.appendChild(td1Tfoot);
                tr1Tfoot.appendChild(td2Tfoot);
                tr1Tfoot.appendChild(td3Tfoot);
                tr2Tfoot.appendChild(td4Tfoot);
                tr2Tfoot.appendChild(td5Tfoot);
                tr2Tfoot.appendChild(td6Tfoot);


                let container = document.getElementById('descriptionRecipeProduct');
                container.innerText = 'Введите первые 3-4 буквы названия продукта и выберите его из списка';
                container.style.fontStyle = 'italic';
                container.style.opacity = '0.6';
                container.style.width = (containerWidth / 100) * 60 + "px";
                tFoot.appendChild(tr1Tfoot);
                tFoot.appendChild(tr2Tfoot);


            }
            addTableRecipeTfoot();

            containerWeight = document.getElementById("weightRecipeHeader").offsetWidth;

            let addWeightColumn = function () {
                let tr1 = document.getElementById("weightWithDishes");
                let td1 = document.createElement("td");
                td1.innerText = 'Вес готового блюда с посудой :';
                td1.style.borderWidth = '0 0 2px 0';
                td1.style.borderColor = 'black';
                td1.style.borderStyle = 'solid';
                td1.style.borderColor = 'gainsboro';
                let input1 = document.createElement('input');
                input1.style.width = (containerWeight / 100) * 20 + 'px';
                input1.style.borderRadius = 5 + 'px';
                input1.id = 'dishesWeightWith';
                input1.type = 'text';
                let td2 = document.createElement('td');
                td2.appendChild(input1);
                tr1.appendChild(td1);
                tr1.appendChild(td2);

                let tr2 = document.getElementById("dishes");
                let td3 = document.createElement('td');
                td3.innerText = 'Посуда :';
                td3.style.borderWidth = '0 0 2px 0';
                td3.style.borderColor = 'black';
                td3.style.borderStyle = 'solid';
                td3.style.borderColor = 'gainsboro';
                let input2 = document.createElement('input');
                input2.style.width = (containerWeight / 100) * 20 + 'px';
                input2.style.borderRadius = 5 + 'px';
                input2.id = 'dishesWeight';
                let td4 = document.createElement('td');
                td4.appendChild(input2);
                tr2.appendChild(td3);
                tr2.appendChild(td4);

                let tr3 = document.getElementById("weightWithoutDishes");
                let td5 = document.createElement('td');
                td5.innerText = 'Вес без посуды:';
                td5.style.borderWidth = '0 0 2px 0';
                td5.style.borderColor = 'black';
                td5.style.borderStyle = 'solid';
                td5.style.borderColor = 'gainsboro';
                td5.style.fontWeight = 'bold';
                let input3 = document.createElement('input');
                input3.style.width = (containerWeight / 100) * 20 + 'px';
                input3.style.borderRadius = 5 + 'px';
                input3.id = 'result';
                let td6 = document.createElement('td');
                td6.appendChild(input3);
                tr3.appendChild(td5);
                tr3.appendChild(td6);

            }

            addWeightColumn();

            let addFullProductList = function () {
                const xhr1 = new XMLHttpRequest();
                xhr1.open('GET', 'http://localhost:8080/api/v1/product', false);
                xhr1.send();
                products = JSON.parse(xhr1.responseText);
            }
            addFullProductList();

            let clickButtonOnInputField = function () {
                let input = document.getElementById("inputSearchRecipe");
                input.onkeypress = function () {
                    let searchValue = input.onkeypress.arguments[0].key;
                    productValue += searchValue;
                    searchProduct();
                }
            }

            clickButtonOnInputField();


            let searchProduct = function () {
                if (productValue.length < 3) {
                    let div = document.getElementById("containerRecipeProductSearch");
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
                                    tmp += '<select id="selectProductRecipe" style="width: ' + widthInput + 'px" size="' + (productSearchArray.length + 1) + '">';
                                } else {
                                    tmp += '<select id="selectProductRecipe" style="width: ' + widthInput + 'px" size="5">';
                                }

                                for (let j = 0; j < productSearchArray.length; j++) {
                                    tmp += '<option value="' + productSearchArray[j].productId + '">' + productSearchArray[j].productName + '</option>';
                                }
                                tmp += '</select>'
                                let div = document.getElementById("containerRecipeProductSearch");
                                div.innerHTML = tmp;

                                let select = document.getElementById("selectProductRecipe");
                                select.onchange = function () {
                                    productValue = '';
                                    let value = select.value;
                                    let valueInt = parseInt(value);
                                    for (let j = 0; j < products.length; j++) {
                                        if (valueInt === products[j].productId) {
                                            let input = document.getElementById("inputSearchRecipe");
                                            input.value = products[j].productName;
                                            document.getElementById("containerRecipeProductSearch").innerHTML = '';
                                            document.getElementById("inputWeightRecipe").focus();
                                        }
                                    }
                                }
                            } else {
                                document.getElementById("containerRecipeProductSearch").innerHTML = '';
                            }
                        }
                    }
                }
            }


            let clickButton = function (e) {
                if (e.keyCode === 8 && e.target.id === "inputSearchRecipe") {
                    let input = document.getElementById("inputSearchRecipe");
                    productValue = input.value;
                    productSearchArray.length = 0;
                    searchProduct();
                }
            }


            let pushButtonAddProductRecipe = function (e) {
                if (e.target.id === 'addProductRecipe') {
                    let input1 = document.getElementById('inputSearchRecipe');
                    let product = input1.value;
                    let input2 = document.getElementById('inputWeightRecipe');
                    weight = input2.value;
                    let productPresent = false;
                    let weightCorrect = true;
                    for (let i = 0; i < products.length; i++) {
                        if (products[i].productName === product) {
                            productPresent = true;
                            productId = products[i].productId;
                        }
                    }
                    let weightNumber = isNaN(weight);
                    if (weightNumber) {
                        weightCorrect = false;
                    }
                    if (weight === '') {
                        weightCorrect = false;
                    }
                    if (weight === '0') {
                        weightCorrect = false;
                    }
                    if (weight < 0) {
                        weightCorrect = false;
                    }

                    if (productPresent && weightCorrect) {
                        productValue = '';
                        let tBody = document.getElementById('tbodyRecipe');
                        let tr = document.createElement('tr');
                        tr.className = 'products';
                        tr.style.borderColor = 'black';
                        tr.style.borderStyle = 'solid';
                        tr.style.borderWidth = '1px 0 1px 0';
                        let td1 = document.createElement('td');
                        let td2 = document.createElement('td');
                        let td3 = document.createElement('td');
                        td1.innerText = product;
                        td2.innerText = weight;
                        tr.appendChild(td1);
                        tr.appendChild(td2);
                        tr.appendChild(td3);
                        tBody.appendChild(tr);
                        input1.value = '';
                        input1.focus();
                        input2.value = '';

                        const productRecipe = {
                            productId: productId,
                            productWeight: weight,
                        };

                        let sendJson = JSON.stringify(productRecipe);
                        const xhr1 = new XMLHttpRequest();
                        xhr1.open('POST', 'http://localhost:8080/api/v1/product/productRecipe', false);
                        xhr1.setRequestHeader('Content-Type', 'application/json');
                        xhr1.send(sendJson);
                        productSearchArray.length = 0;
                    }
                }
            }

            let clickWeightInput = function () {
                let input = document.getElementById("dishesWeightWith");
                input.onchange = function () {
                    let dataCorrect = true;
                    let weight = input.value;


                    let weightNumCor = isNaN(weight);

                    if (weightNumCor) {
                        dataCorrect = false;
                    }
                    if (weight === '') {
                        dataCorrect = false;
                    }
                    if (weight === '0') {
                        dataCorrect = false;
                    }
                    if (weight < 0) {
                        dataCorrect = false;
                    }
                    if (dataCorrect) {
                        let input2 = document.getElementById("dishesWeight");
                        input2.onchange = function () {
                            let dataCorrect = true;
                            let weightDashes = input2.value;

                            let weightNumCor = isNaN(weightDashes);

                            if (weightNumCor) {
                                dataCorrect = false;
                            }
                            if (weightDashes === '') {
                                dataCorrect = false;
                            }
                            if (weightDashes === '0') {
                                dataCorrect = false;
                            }
                            if (weightDashes < 0) {
                                dataCorrect = false;
                            }
                            if (dataCorrect) {
                                let input3 = document.getElementById('result');
                                let result = weight - weightDashes;
                                if (result > 0) {
                                    input3.value = result;
                                    correctWeight = result;
                                }
                            }
                        }
                    }
                }
            }

            clickWeightInput();


            let pushButtonSaveRecipe = function (e) {
                if (e.target.id === 'saveRecipe') {
                    let tBody = document.getElementById('tbodyRecipe');
                    let child = tBody.childNodes;
                    let inputRecipeTitle = document.getElementById('titleRecipe');
                    let recipeTitle = inputRecipeTitle.value;
                    if (child.length > 0 && recipeTitle.length > 0 && correctWeight > 0) {
                        const productRecipe = {
                            recipeTitle: recipeTitle,
                            recipeWeight: correctWeight,
                        };

                        let sendJson = JSON.stringify(productRecipe);
                        const xhr1 = new XMLHttpRequest();
                        xhr1.open('POST', 'http://localhost:8080/api/v1/product/saveRecipe', false);
                        xhr1.setRequestHeader('Content-Type', 'application/json');
                        xhr1.send(sendJson);
                        productValue = '';
                        productSearchArray.length = 0;
                        widthInput = 0;
                        productId = 0;
                        weight = 0;
                        correctWeight = 0;
                        addRecipeTable();
                        containerWidth = document.getElementById("titleRecipeHeader").offsetWidth;
                        addTableRecipeTHead();
                        addTableRecipeTfoot();
                        containerWeight = document.getElementById("weightRecipeHeader").offsetWidth;
                        addWeightColumn();
                        clickButtonOnInputField();
                        clickWeightInput();
                    }
                }
            }

            let pushButtonAllRecipe = function (e) {
                if (e.target.id === 'buttonAllRecipe') {
                    createAllRecipeTable();
                }
            }

            let createAllRecipeTable = function () {
                document.getElementById("column1").innerHTML = "";
                let tmp = '';
                tmp += '<div id="allRecipeHeader">Список всех Ваших рецептов<button id="buttonComeBack">Вернуться назад</button></div>';
                tmp += '<div id="containerAllRecipe">';
                tmp += '<div id="allRecipe1">';
                tmp += '<ul id="ulCol1">';
                tmp += '</ul>';
                tmp += '</div>'
                tmp += '<div id="allRecipe2">';
                tmp += '<ul id="ulCol2">';
                tmp += '</ul>';
                tmp += '</div>';
                tmp += '</div>';
                document.getElementById("column1").innerHTML = tmp;
                loadingAllRecipe();
            }

            let pushButtonComeBack = function (e) {
                if (e.target.id === 'buttonComeBack') {
                    productValue = '';
                    productSearchArray.length = 0;
                    widthInput = 0;
                    productId = 0;
                    weight = 0;
                    correctWeight = 0;
                    addRecipeTable();
                    containerWidth = document.getElementById("titleRecipeHeader").offsetWidth;
                    addTableRecipeTHead();
                    addTableRecipeTfoot();
                    containerWeight = document.getElementById("weightRecipeHeader").offsetWidth;
                    addWeightColumn();
                    clickButtonOnInputField();
                    clickWeightInput();
                }

            }

            let loadingAllRecipe = function () {
                const xhr1 = new XMLHttpRequest();
                xhr1.open('GET', 'http://localhost:8080/api/v1/product/allRecipe', false);
                xhr1.send();
                allRecipe = JSON.parse(xhr1.responseText);
                console.log(allRecipe);
                for (let i = 0; i < allRecipe.length; i++) {
                    let li = document.createElement("li");
                    li.style.fontWeight = "bold";
                    li.innerText = allRecipe[i].recipeName + ' ' + allRecipe[i].dateAdded
                    li.style.cursor = 'pointer';
                    li.id = '' + allRecipe[i].recipeId + '';
                    li.className = 'eventRecipe';
                    if (i % 2 === 0) {
                        document.getElementById("ulCol1").appendChild(li);
                    } else {
                        document.getElementById("ulCol2").appendChild(li);
                    }
                }
            }


            let showRecipe = function (e) {
                if (e.target.className === 'eventRecipe') {
                    let elemId = e.target.id;
                    elemId = Number(elemId);
                    for (let i = 0; i < allRecipe.length; i++) {
                        if (elemId === allRecipe[i].recipeId) {
                            let allProduct = allRecipe[i].productRecipes;
                            document.getElementById("column1").innerHTML = "";
                            let tmp = '';
                            tmp += '<div id="showRecipeHeader">' + allRecipe[i].recipeName + '<button id="showRecipeButtonComeBack">Вернуться назад</button></div>';
                            tmp += '<table id="showRecipeTable">';
                            tmp += '<thead>';
                            tmp += '<tr>';
                            tmp += '<td style="min-width: 350px">Наименование продукта</td>';
                            tmp += '<td style="min-width: 70px">Вес</td>';
                            tmp += '</tr>';
                            tmp += '</thead>';
                            tmp += '<tbody id="tbodyShowRecipe"></tbody>';
                            tmp += '</table>';
                            document.getElementById("column1").innerHTML = tmp;
                            addProductRecipe(allProduct);
                        }
                    }
                }
            }

            let addProductRecipe = function (allProduct) {
                let tBody = document.getElementById("tbodyShowRecipe");
                for (let i = 0; i < allProduct.length; i++) {
                    let tr = document.createElement("tr");
                    let td1 = document.createElement("td");
                    let td2 = document.createElement("td");
                    td1.innerText = allProduct[i].productRecipeName;
                    td2.innerText = allProduct[i].weightProductRecipe;
                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tBody.appendChild(tr);
                }
            }

            let pushButtonComeBackProductRecipe = function (e) {
                if (e.target.id === 'showRecipeButtonComeBack') {
                    createAllRecipeTable();
                }
            }


            document.body.addEventListener("keyup", clickButton);
            document.body.addEventListener("click", pushButtonAddProductRecipe);
            document.body.addEventListener("click", pushButtonSaveRecipe);
            document.body.addEventListener("click", pushButtonAllRecipe);
            document.body.addEventListener("click", pushButtonComeBack);
            document.body.addEventListener("click", showRecipe);
            document.body.addEventListener("click", pushButtonComeBackProductRecipe);


        }
    })

})