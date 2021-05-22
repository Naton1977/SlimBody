window.addEventListener("load", () => {

    let addParameters = function (e) {
        if (e.target.id === "item1d") {
            document.getElementById("column1").innerHTML = "";
            let cont = document.getElementById("column1");
            cont.style.textAlign = "left";
            let div1 = document.createElement("div");
            div1.id = "textFP";
            div1.innerText = "Измерьте параметры фигуры";
            document.getElementById("column1").append(div1);
            let div2 = document.createElement("div");
            let now = new Date();
            let options = {
                year: "numeric",
                month: "long",
                day: "numeric"
            }
            let ruNow = now.toLocaleString("ru", options);
            div2.innerText = "На " + " " + ruNow;
            div2.id = "dateFP";
            document.getElementById("column1").append(div2);
            let div3 = document.createElement("div");
            div3.id = "contImg";
            document.getElementById("column1").append(div3);

            let xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://localhost:8080/bodyParameters');
            xhr.send();
            xhr.onload = function () {
                if (xhr.status === 200) {
                    document.getElementById("contImg").innerHTML = xhr.response;
                }
            }
        }
    }
    document.body.addEventListener("click", addParameters);

})