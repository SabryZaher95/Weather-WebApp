let weatherData, weatherData2, searchValue;
let today, tomorrow, later, dayName, dayNum, month;
const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const findBtn = document.getElementById('findBtn');


async function getWeatherApi(){
    const searchInput = document.getElementById('search');
    searchValue = searchInput.value;
    if(searchValue == ''){
        searchValue = 'Cairo';
    }
    
    if(searchValue.trim() != ''){
        const urlApi = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c726cc3d7f4441e0841161626231802&q="${searchValue}"&days=3&aqi=no&alerts=no`);
        const data = await urlApi.json();
        if(urlApi.status == 200){
            //--------------Today Weather----------------------------------------------
        today = new Date(data.forecast.forecastday[0].date)
        dayName = days[today.getDay()];
        dayNum = today.getDate();
        month = today.toLocaleString('default', { month: 'long' });
        document.getElementById('today').innerHTML = `
            <div class="card-header bg-dark text-light d-flex justify-content-between px-1 py-2">
                <span>${dayName}</span>
                <span>${dayNum + ' ' + month}</span>
            </div>
            <div class="card-body pt-3 pb-4">
                <p class="text-light fs-1">${data.location.name}</p>
                <div class="degree d-flex justify-content-between">
                    <h1 class="text-light display-5">${data.current.temp_c} <sup>o</sup>C</h1>
                    <img src="${data.current.condition.icon}" alt="${data.current.condition.text}">
                </div>
                <span class="text-info d-block mb-4">${data.current.condition.text}</span>
                <div class="addition-info d-flex justify-content-between">
                    <span class="text-light"><img src="./images/icon-umberella.png" class="img-fluid me-2" alt="">20%</span>
                    <span class="text-light"><img src="./images/icon-wind.png" class="img-fluid me-2" alt="">18km/h</span>
                    <span class="text-light"><img src="./images/icon-compass.png" class="img-fluid me-2" alt="">East</span>
                </div>
            </div>
        `;
        //----------------------------------------------------------------------------------
        //---------------Tommorow Weather-----------------------------------------------------
        tomorrow = new Date(data.forecast.forecastday[1].date);
        dayName = days[tomorrow.getDay()];
        dayNum = tomorrow.getDate();
        month = tomorrow.toLocaleString('default', { month: 'long' });
        document.getElementById('tomorrow').innerHTML = `
            <div class="card-header bg-dark text-light d-flex justify-content-center px-1 py-2">
                <span>${dayName}</span>
            </div>
            <div class="card-body pt-3 pb-4">
                <div class="degree text-center">
                    <img src="${data.forecast.forecastday[1].day.condition.icon}" alt="${data.forecast.forecastday[1].day.condition.text}">
                    <h3 class="fs-1 text-light">${data.forecast.forecastday[1].day.maxtemp_c} <sup>o</sup>C</h3>
                    <span class="text-secondary fs-4 pb-2 d-block">${data.forecast.forecastday[1].day.mintemp_c} <sup>o</sup>C</span>
                    <span class="text-info d-block mb-4">${data.forecast.forecastday[1].day.condition.text}</span>
                </div>
            </div>
        `;
        //------------------------------------------------------------------------------------------
        //------------------After tomorrow Weather-------------------------------------------------
        later = new Date(data.forecast.forecastday[2].date);
        dayName = days[later.getDay()];
        dayNum = later.getDate();
        month = later.toLocaleString('default', { month: 'long' });
        document.getElementById('later').innerHTML = `
            <div class="card-header bg-dark text-light d-flex justify-content-center px-1 py-2">
                <span>${dayName}</span>
            </div>
            <div class="card-body pt-3 pb-4">
                <div class="degree text-center">
                    <img src="${data.forecast.forecastday[2].day.condition.icon}" alt="${data.forecast.forecastday[2].day.condition.text}">
                    <h3 class="fs-1 text-light">${data.forecast.forecastday[2].day.maxtemp_c} <sup>o</sup>C</h3>
                    <span class="text-secondary fs-4 pb-2 d-block">${data.forecast.forecastday[2].day.mintemp_c} <sup>o</sup>C</span>
                    <span class="text-info d-block mb-4">${data.forecast.forecastday[2].day.condition.text}</span>
                </div>
            </div>
        `;    
        }
    }
}

findBtn.addEventListener('click', getWeatherApi);
findBtn.onclick = getWeatherApi();
