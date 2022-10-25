const url = "https://eucs23v2.ksearchnet.com/cs/v2/search";
data = {
  context: { apiKeys: ["klevu-160320037354512854"] },
  recordQueries: [
    {
      id: "configLayoutProducts564",
      typeOfRequest: "SEARCH",
      settings: {
        query: { term: "bags" },
        typeOfRecords: ["KLEVU_PRODUCT"],
        limit: 12,
        typeOfSearch: "WILDCARD_AND",
      },
    },
  ],
};

fetch(url, {
  method: "post", // Default is 'get'

  body: JSON.stringify(data),
  //mode: "cors",
  /*headers: new Headers({
      "Content-Type": "application/json",
    }),*/
})
  .then((response) => response.json())
  //.then((json) => console.log("Response", json));
  .then((j) => {
    dataFetched = j.queryResults[0].records;
    return dataFetched;
    //console.log(dataFetched.queryResults[0].records);
    //console.log(json.queryResults[0].records);
    //var names = JSON.stringify(json.queryResults[0].records);
    //window.yourGlobalVariable = names;
  })
  .then((bagsData) => {
    var aBD = document.getElementById("allBagsData");
    //document.write(typeof bagsData[0].image);
    document.getElementById("totalResultFound").innerHTML =
      "Total results found: --" + bagsData.length;
    for (var i = 0; i < bagsData.length; i++) {
      //var tag = document.createElement("img"); // <button></button>
      //tag.src = bagsData[i].image;
      //images.appendChild(tag);

      // creating li tag
      var li_tag = document.createElement("li");
      aBD.appendChild(li_tag);
      li_tag.className = "kuvmProduct";

      var div1_tag = document.createElement("div");
      li_tag.appendChild(div1_tag);
      div1_tag.className = "kuvmProdWrap";

      var div2_tag = document.createElement("div");
      div1_tag.appendChild(div2_tag);
      div2_tag.className = "kuvmProdTop";

      var div3_tag = document.createElement("div");
      div2_tag.appendChild(div3_tag);
      div3_tag.className = "kuvmImgWrap";

      var anchor_tag = document.createElement("a");
      div3_tag.appendChild(anchor_tag);
      anchor_tag.href = "javascript:void(0)";
      anchor_tag.className = "kuvmProductLink";

      var span_tag = document.createElement("span");
      anchor_tag.appendChild(span_tag);
      span_tag.className = "kuvmImgSpan";

      var img_tag = document.createElement("img");
      span_tag.appendChild(img_tag);
      img_tag.src = bagsData[i].imageUrl;
      img_tag.className = "kuProdImg";
      img_tag.alt = bagsData[i].name;

      var div_2_tag = document.createElement("div");
      div1_tag.appendChild(div_2_tag);
      div_2_tag.className = "kuvmProdBottom";

      var div_3_tag = document.createElement("div");
      div_2_tag.appendChild(div_3_tag);
      div_3_tag.className = "kuvmNameDesc";

      var div_4_tag = document.createElement("div");
      div_3_tag.appendChild(div_4_tag);
      div_4_tag.name = bagsData[i].name;

      var anchor_1_tag = document.createElement("a");
      div_4_tag.appendChild(anchor_1_tag);
      anchor_1_tag.href = "javascript:void(0)";
      anchor_1_tag.className = "kuvmProductLink";
      anchor_1_tag.innerHTML = bagsData[i].name;

      var div_4_2_tag = document.createElement("div");
      div_3_tag.appendChild(div_4_2_tag);
      div_4_2_tag.className = "kuvmsku";
      div_4_2_tag.name = bagsData[i].sku;

      var div_4_2_1_tag = document.createElement("small");
      div_4_2_tag.appendChild(div_4_2_1_tag);
      div_4_2_1_tag.innerHTML = bagsData[i].sku;
      div_4_2_1_tag.className = "text-muted";

      var div_5_tag = document.createElement("div");
      div_2_tag.appendChild(div_5_tag);
      div_5_tag.className = "kuPrice";

      var div_5_1_tag = document.createElement("div");
      div_5_tag.appendChild(div_5_1_tag);
      div_5_1_tag.className = "kuSalePrice kuStartPrice";
      div_5_1_tag.innerHTML = bagsData[i].salePrice + " USD";

      var btn_tag = document.createElement("button");
      div_5_tag.appendChild(btn_tag);
      btn_tag.innerHTML = "Show Information";
      btn_tag.id = bagsData[i].sku;
      btn_tag.className = "btn";

      var div_5_2_tag = document.createElement("div");
      div_5_tag.appendChild(div_5_2_tag);
      div_5_tag.className = "kuClearBoth";

      var div_6_tag = document.createElement("div");
      div1_tag.appendChild(div_6_tag);
      div_6_tag.className = "kuvmClearLeft";
    }

    var btnElement = document.getElementsByClassName("btn");
    for (var i = 0; i < btnElement.length; i++) {
      btnElement[i].addEventListener("click", (e) => {
        //var id = e.target.sku;
        var button_id = e.target.id;
        const index = bagsData.findIndex((item) => item.sku === button_id);
        console.log(index);
        //var prod = bagsData.find((product) => {
        //console.log(product.sku);
        //return product.sku === id;
        // === id
        document.getElementById("modal_container").style.display = "block";
        document.getElementById("allBagsData").style.display = "none";
        var content = document.getElementById("content");
        var addImg = (document.getElementById("addImg").src =
          bagsData[index].imageUrl);

        document.getElementById("head").innerHTML = bagsData[index].name;
        content.innerHTML =
          "color: " +
          bagsData[index].color +
          ", type: " +
          bagsData[index].type +
          "\n" +
          ", price: " +
          bagsData[index].price +
          ", USD" +
          "\n" +
          ", inStock: " +
          bagsData[index].inStock +
          "\n" +
          ", brand: " +
          bagsData[index].brand +
          "\n" +
          ", size: " +
          bagsData[index].size +
          "\n" +
          ", Short Description: " +
          bagsData[index].shortDesc +
          "";
        btn_close = document.getElementById("close");
        btn_close.addEventListener("click", () => {
          document.getElementById("allBagsData").style.display = "block";
          document.getElementById("modal_container").style.display = "none";
        });
      });
    }
    document.getElementById("modal_container").style.display = "none";
    var Price = document.getElementById("Price");
    Price.addEventListener("change", () => {
      var x = document.getElementById("Price").selectedIndex;
      var y = document.getElementById("Price").options;

      if (y[x].index == 0) {
        document.getElementById("allBagsData").innerHTML = "";
        var newArr = bagsData.sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
        // sorting of an array

        //console.log(newArr);
        // Low To High Price
        for (var l = 0; l < newArr.length; l++) {
          var li_tag = document.createElement("li");
          aBD.appendChild(li_tag);
          li_tag.className = "kuvmProduct";

          var div1_tag = document.createElement("div");
          li_tag.appendChild(div1_tag);
          div1_tag.className = "kuvmProdWrap";

          var div2_tag = document.createElement("div");
          div1_tag.appendChild(div2_tag);
          div2_tag.className = "kuvmProdTop";

          var div3_tag = document.createElement("div");
          div2_tag.appendChild(div3_tag);
          div3_tag.className = "kuvmImgWrap";

          var anchor_tag = document.createElement("a");
          div3_tag.appendChild(anchor_tag);
          anchor_tag.href = "javascript:void(0)";
          anchor_tag.className = "kuvmProductLink";

          var span_tag = document.createElement("span");
          anchor_tag.appendChild(span_tag);
          span_tag.className = "kuvmImgSpan";

          var img_tag = document.createElement("img");
          span_tag.appendChild(img_tag);
          img_tag.src = newArr[l].imageUrl;
          img_tag.className = "kuProdImg";
          img_tag.alt = newArr[l].name;

          var div_2_tag = document.createElement("div");
          div1_tag.appendChild(div_2_tag);
          div_2_tag.className = "kuvmProdBottom";

          var div_3_tag = document.createElement("div");
          div_2_tag.appendChild(div_3_tag);
          div_3_tag.className = "kuvmNameDesc";

          var div_4_tag = document.createElement("div");
          div_3_tag.appendChild(div_4_tag);
          div_4_tag.name = newArr[l].name;

          var anchor_1_tag = document.createElement("a");
          div_4_tag.appendChild(anchor_1_tag);
          anchor_1_tag.href = "javascript:void(0)";
          anchor_1_tag.className = "kuvmProductLink";
          anchor_1_tag.innerHTML = newArr[l].name;

          var div_4_2_tag = document.createElement("div");
          div_3_tag.appendChild(div_4_2_tag);
          div_4_2_tag.className = "kuvmsku";
          div_4_2_tag.name = newArr[l].sku;

          var div_4_2_1_tag = document.createElement("small");
          div_4_2_tag.appendChild(div_4_2_1_tag);
          div_4_2_1_tag.innerHTML = newArr[l].sku;
          div_4_2_1_tag.className = "text-muted";

          var div_5_tag = document.createElement("div");
          div_2_tag.appendChild(div_5_tag);
          div_5_tag.className = "kuPrice";

          var div_5_1_tag = document.createElement("div");
          div_5_tag.appendChild(div_5_1_tag);
          div_5_1_tag.className = "kuSalePrice kuStartPrice";
          div_5_1_tag.innerHTML = newArr[l].salePrice + " USD";

          var btn_tag = document.createElement("button");
          div_5_tag.appendChild(btn_tag);
          btn_tag.innerHTML = "Show Information";
          btn_tag.id = newArr[l].sku;
          btn_tag.className = "btn";

          var div_5_2_tag = document.createElement("div");
          div_5_tag.appendChild(div_5_2_tag);
          div_5_tag.className = "kuClearBoth";

          var div_6_tag = document.createElement("div");
          div1_tag.appendChild(div_6_tag);
          div_6_tag.className = "kuvmClearLeft";
        }

        var btnElement = document.getElementsByClassName("btn");
        for (var i = 0; i < btnElement.length; i++) {
          btnElement[i].addEventListener("click", (e) => {
            //var id = e.target.sku;
            var button_id = e.target.id;
            const index = bagsData.findIndex((item) => item.sku === button_id);
            console.log(index);
            document.getElementById("modal_container").style.display = "block";
            document.getElementById("allBagsData").style.display = "none";
            var content = document.getElementById("content");
            var linebreak = "\n";
            var addImg = (document.getElementById("addImg").src =
              bagsData[index].imageUrl);

            document.getElementById("head").innerHTML = bagsData[index].name;
            content.innerHTML =
              "color: " +
              bagsData[index].color +
              linebreak +
              ", type: " +
              bagsData[index].type +
              "\n" +
              ", price: " +
              bagsData[index].price +
              ", USD" +
              "\n" +
              ", inStock: " +
              bagsData[index].inStock +
              "\n" +
              ", brand: " +
              bagsData[index].brand +
              "\n" +
              ", size: " +
              bagsData[index].size +
              "\n" +
              ", Short Description: " +
              bagsData[index].shortDesc +
              "";
            btn_close = document.getElementById("close");
            btn_close.addEventListener("click", () => {
              document.getElementById("allBagsData").style.display = "block";
              document.getElementById("modal_container").style.display = "none";
            });
            //var prod = bagsData.find((product) => {
            //console.log(product.sku);
            //return product.sku === id;
            // === id

            /*
            alert(
              "color: " +
                bagsData[index].color +
                "\n" +
                "type: " +
                bagsData[index].type +
                "\n" +
                "price: " +
                bagsData[index].price +
                " USD" +
                "\n" +
                "inStock: " +
                bagsData[index].inStock +
                "\n" +
                "brand: " +
                bagsData[index].brand +
                "\n" +
                "size: " +
                bagsData[index].size +
                "\n" +
                "Short Description: " +
                bagsData[index].shortDesc
            );*/
          });
        }
        //revArrSort = arrSort.reverse();
        console.log(revArr);
      } else if (y[x].index == 1) {
        document.getElementById("allBagsData").innerHTML = "";

        // sorting of an array
        var newArr = bagsData.sort(
          (a, b) => parseFloat(a.price) - parseFloat(b.price)
        );
        var revArr = newArr.reverse();
        // Low To High Price
        for (var l = 0; l < revArr.length; l++) {
          var li_tag = document.createElement("li");
          aBD.appendChild(li_tag);
          li_tag.className = "kuvmProduct";

          var div1_tag = document.createElement("div");
          li_tag.appendChild(div1_tag);
          div1_tag.className = "kuvmProdWrap";

          var div2_tag = document.createElement("div");
          div1_tag.appendChild(div2_tag);
          div2_tag.className = "kuvmProdTop";

          var div3_tag = document.createElement("div");
          div2_tag.appendChild(div3_tag);
          div3_tag.className = "kuvmImgWrap";

          var anchor_tag = document.createElement("a");
          div3_tag.appendChild(anchor_tag);
          anchor_tag.href = "javascript:void(0)";
          anchor_tag.className = "kuvmProductLink";

          var span_tag = document.createElement("span");
          anchor_tag.appendChild(span_tag);
          span_tag.className = "kuvmImgSpan";

          var img_tag = document.createElement("img");
          span_tag.appendChild(img_tag);
          img_tag.src = revArr[l].imageUrl;
          img_tag.className = "kuProdImg";
          img_tag.alt = revArr[l].name;

          var div_2_tag = document.createElement("div");
          div1_tag.appendChild(div_2_tag);
          div_2_tag.className = "kuvmProdBottom";

          var div_3_tag = document.createElement("div");
          div_2_tag.appendChild(div_3_tag);
          div_3_tag.className = "kuvmNameDesc";

          var div_4_tag = document.createElement("div");
          div_3_tag.appendChild(div_4_tag);
          div_4_tag.name = revArr[l].name;

          var anchor_1_tag = document.createElement("a");
          div_4_tag.appendChild(anchor_1_tag);
          anchor_1_tag.href = "javascript:void(0)";
          anchor_1_tag.className = "kuvmProductLink";
          anchor_1_tag.innerHTML = revArr[l].name;

          var div_4_2_tag = document.createElement("div");
          div_3_tag.appendChild(div_4_2_tag);
          div_4_2_tag.className = "kuvmsku";
          div_4_2_tag.name = revArr[l].sku;

          var div_4_2_1_tag = document.createElement("small");
          div_4_2_tag.appendChild(div_4_2_1_tag);
          div_4_2_1_tag.innerHTML = revArr[l].sku;
          div_4_2_1_tag.className = "text-muted";

          var div_5_tag = document.createElement("div");
          div_2_tag.appendChild(div_5_tag);
          div_5_tag.className = "kuPrice";

          var div_5_1_tag = document.createElement("div");
          div_5_tag.appendChild(div_5_1_tag);
          div_5_1_tag.className = "kuSalePrice kuStartPrice";
          div_5_1_tag.innerHTML = revArr[l].salePrice + " USD";

          var btn_tag = document.createElement("button");
          div_5_tag.appendChild(btn_tag);
          btn_tag.innerHTML = "Show Information";
          btn_tag.id = revArr[l].sku;
          btn_tag.className = "btn";

          var div_5_2_tag = document.createElement("div");
          div_5_tag.appendChild(div_5_2_tag);
          div_5_tag.className = "kuClearBoth";

          var div_6_tag = document.createElement("div");
          div1_tag.appendChild(div_6_tag);
          div_6_tag.className = "kuvmClearLeft";
        }

        var btnElement = document.getElementsByClassName("btn");
        for (var i = 0; i < btnElement.length; i++) {
          btnElement[i].addEventListener("click", (e) => {
            //var id = e.target.sku;
            var button_id = e.target.id;
            const index = bagsData.findIndex((item) => item.sku === button_id);
            console.log(index);
            //var prod = bagsData.find((product) => {
            //console.log(product.sku);
            //return product.sku === id;
            // === id
            document.getElementById("modal_container").style.display = "block";
            document.getElementById("allBagsData").style.display = "none";
            var content = document.getElementById("content");
            var linebreak = "\n";
            var addImg = (document.getElementById("addImg").src =
              bagsData[index].imageUrl);

            document.getElementById("head").innerHTML = bagsData[index].name;
            content.innerHTML =
              "color: " +
              bagsData[index].color +
              linebreak +
              ", type: " +
              bagsData[index].type +
              "\n" +
              ", price: " +
              bagsData[index].price +
              ", USD" +
              "\n" +
              ", inStock: " +
              bagsData[index].inStock +
              "\n" +
              ", brand: " +
              bagsData[index].brand +
              "\n" +
              ", size: " +
              bagsData[index].size +
              "\n" +
              ", Short Description: " +
              bagsData[index].shortDesc +
              "";
            btn_close = document.getElementById("close");
            btn_close.addEventListener("click", () => {
              document.getElementById("allBagsData").style.display = "block";
              document.getElementById("modal_container").style.display = "none";
            });
          });
        }
        console.log(revArr);
      }
    });
  });
