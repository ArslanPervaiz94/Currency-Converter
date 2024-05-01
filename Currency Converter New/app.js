//this is the base url of api which is used to fetch the exchange rate
const URL =
  " https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

// here we access our html elements in JS from there class/id or tags name
let fromAmount = document.querySelector(".input-amount");
let fromConvertedAmount = document.querySelector(".converted-amount");
let fromCurrency = document.querySelector(".from");
let toCurrency = document.querySelector(".to");
let options = document.querySelectorAll(".select-cont select");
let newMsg = document.querySelector(".msg");
let cont = document.querySelector(".container");

// Assuming 'options' is an array of select elements
const option1 = document.querySelectorAll("select");

for (let select of option1) {
  for (let currencyCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = `${currencyCode} ${countryList[currencyCode].name}`;
    newOption.value = currencyCode;
    if (select.name === "from" && currencyCode === "USD") {
      newOption.selected = true;
    } else if (select.name === "to" && currencyCode === "PKR") {
      newOption.selected = true;
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    // Assuming 'changeFlag' is a function to change flag based on the selected option
    changeFlag(evt.target);
  });
}

// this func is used to change the flags on changing the currencies
let changeFlag = (element) => {
  let currencyCode = element.value;
  let countryCode = countryList[currencyCode];
  let newImgSrc = `https://flagsapi.com/${countryCode.flag}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newImgSrc;
};

const getExRate = async () => {
  newMsg.textContent = "Fetching Data....";
  try {
    // here we add a url that is defined on top and make a proper url to fetch a data from that api
    let newURL = `${URL}/${fromCurrency.value.toLowerCase()}.json`;
    let responce = await fetch(newURL);
    let data = await responce.json();
    let rate =
      data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()];
    // here after geting an exchange rate we multiple it with inputed ammount and display final result
    let finalAmount = fromAmount.value * rate;
    if (typeof finalAmount === "undefined") {
      newMsg.textContent = "Rate for Selected Country is not found";
      fromConvertedAmount = "";
    } else {
      fromConvertedAmount.value = finalAmount.toFixed(2);
      newMsg.innerText = `${fromAmount.value} ${
        fromCurrency.value
      } = ${finalAmount.toFixed(2)} ${toCurrency.value}`;
    }
  } catch (error) {
    cont.innerHTML = `<h2> Error in Fetching Data</h2>`;
  }
};
// auto fetch rate on windows load
window.addEventListener("load", getExRate);
// auto fetch rate on input ammout
fromAmount.addEventListener("input", getExRate);
// auto fetch rate on change from currency
fromCurrency.addEventListener("change", getExRate);
// auto fetch rate on change to currency
toCurrency.addEventListener("change", getExRate);
