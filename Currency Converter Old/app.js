//this is the base url of api which is used to fetch the exchange rate
const URL =
  " https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

// here we access our html elements in JS from there class/id or tags name
let fromAmount = document.querySelector(".form input");
let fromCurrency = document.querySelector(".from select");
let toCurrency = document.querySelector(".to select");
let newMsg = document.querySelector(".msg");
let exBtn = document.querySelector("form button");
let options = document.querySelectorAll(".dropdown select");

// here for of loop is used
for (let select of options) {
  // here for in loop is used to access country code and currency codes that are written in codes.js file
  for (currencyCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currencyCode;
    newOption.value = currencyCode;
    if (select.name === "from" && currencyCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currencyCode === "PKR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    changeFlag(evt.target);
  });
}

// this func is used to change the flags on changing the currencies
let changeFlag = (element) => {
  let currencyCode = element.value;
  let countryCode = countryList[currencyCode];
  let newImgSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newImgSrc;
};
// this event listner access the btn and perform a task on click the btn that is explained in exrate func
exBtn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  exRate();
});

// this event listner show the default selected pairs exchange rate on loading windows
window.addEventListener("load", () => {
  exRate();
});

// making an async function and getting a value from user input and checking the value is not less than 1
let exRate = async () => {
  let amountValue = document.querySelector(".amount input");
  let amountVal = amountValue.value;
  if (amountValue === "" || amountValue < 1) {
    amountValue = 1;
    amount.value = "1";
  }
  // here we add a url that is defined on top and make a proper url to fetch a data from that api
  let newURL = `${URL}/${fromCurrency.value.toLowerCase()}.json`;
  let responce = await fetch(newURL);
  let data = await responce.json();
  let rate =
    data[fromCurrency.value.toLowerCase()][toCurrency.value.toLowerCase()];
  // here after geting an exchange rate we multiple it with inputed ammount and display final result
  let finalAmount = amountVal * rate;
  newMsg.innerText = `${amountVal}${fromCurrency.value} = ${finalAmount.toFixed(
    2
  )}${toCurrency.value}`;
};
