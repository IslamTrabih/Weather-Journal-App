//Coding by Islam Trabih

//Define Global Variables
let generate = document.querySelector('#generate')
//My personal API Key from OpenWeatherMap API
const Url = "https://api.openweathermap.org/data/2.5/weather?zip=";
const myAPIKey = "&appid=3607ab368bdc82f98da020d54e92564f";
//Convert data to metric units (temp unit is Celsius)
const metric = "&units=metric";
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate()+'.'+ (d.getMonth()+1) +'.'+ d.getFullYear();

//activate functions
evnt(generate);


//Main Functions

//function to add event for generate button by click
function evnt (elm){
    elm.addEventListener('click', weatherData)
};

//function to get and post data (requests) of weather
function weatherData (){
    let zipCode = document.querySelector('#zip').value;
    let feelings = document.querySelector('#feelings').value;
    if(!zipCode){
        alert('Please Enter Zip Code')
    }
    apiData(Url, zipCode, myAPIKey, metric)
    .then((result) =>{
        addData('/postRoute', {date: newDate, temp: result.main.temp, feelings: feelings});
    })
    .then(() => {updatePageData('/getRoute');})
};

//function to get data of weather from  personal API Key
const apiData = async (baseUrl, zip, key, units) =>{
    const res = await fetch(baseUrl+zip+key+units);
    try {
        const apiWeather = await res.json();
        console.log(apiWeather);
        return apiWeather;
    } catch (error) {
        console.log('Error : ', error);
    }
};

//Function to post data (add data)
const addData = async (url, selectData)=>{
    const req = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
      body: JSON.stringify(selectData),
    });
    try {
        const requireData = await req.json();
        return requireData
    }catch(error) {
        console.log('Error : ', error);
    }
};

//Function to update User interface dynamically
const updatePageData = async (url)=>{
    const res = await fetch(url, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    try {
        const getDate = await res.json();
        console.log(getDate)
        document.getElementById('date').innerHTML = '<strong>Date : </strong>' + getDate.date;
        document.getElementById('temp').innerHTML = '<strong>Temp : </strong>' + getDate.temp;
        document.getElementById('content').innerHTML = '<strong>Feelings : </strong>' + getDate.feelings;
    }catch(error) {
        console.log('Error : ', error);
    }
};


//Coding by Islam Trabih