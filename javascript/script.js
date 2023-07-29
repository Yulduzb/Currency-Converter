const dropList=document.querySelectorAll(".drop-list select"),
fromCurrency=document.querySelector(".from select"),
ToCurrency=document.querySelector(".to select")
getButton=document.querySelector("form button");

for(let i=0; i < dropList.length; i++)
{
    for(currency_code in country_code)
    {
      let selected;
      if(i == 0){
        selected = currency_code == "USD" ? "selected" : "";
      }else if(i == 1)
      {
        selected = currency_code == "TRY" ? "selected" : "";
      }
      let optionTag=`<option value="${currency_code}"${selected}>${currency_code}</option>`;
      dropList[i].insertAdjacentHTML("beforeend",optionTag);
        
    }
    dropList[i].addEventListener("change",e=>{
        loadFlag(e.target);
    });
}

function loadFlag(element){
    for(code in country_code){
        if(code==element.value){
            let imgTag=element.parentElement.querySelector("img");
            imgTag.src=`https://flagsapi.com/${country_code[code]}/flat/64.png`;
        }
    }
}





window.addEventListener("load",()=>{
    getExchangeRate();
})



getButton.addEventListener("click", e=>{
    e.preventDefault();
    getExchangeRate();
});


const exchangeIcon=document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click",()=>{
    let tempCode=fromCurrency.value;
    fromCurrency.value=ToCurrency.value;
    ToCurrency.value=tempCode;
    loadFlag(fromCurrency);
    loadFlag(ToCurrency);
    getExchangeRate();
});




function getExchangeRate(){
    const amount=document.querySelector(".amount input");
    const exchangeRateText=document.querySelector(".exchange-rate");
    let amountValue=amount.value;
    if(amountValue== "" || amountValue=="0")
    {
        amount.value="1";
        amountValue=1;
    }
    exchangeRateText.innerText="Getting exchange rate..."
    let url=` https://v6.exchangerate-api.com/v6/${YourApiKey}/latest/${fromCurrency.value}`; //kendi Api Anahtarınız alın
    fetch(url).then(response=>response.json()).then(result=>{
        let exchangeRate=result.conversion_rates[ToCurrency.value];
        let totalExchangeRate=(amountValue*exchangeRate).toFixed(2);
        const exchangeText=document.querySelector(".exchange-rate");
        exchangeRateText.innerText=`${amountValue} ${fromCurrency.value}=${totalExchangeRate} ${ToCurrency.value}`;
    }).catch(()=>{
        exchangeRateText.innerText="Something went wrong";
    });
}