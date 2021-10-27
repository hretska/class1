fetch('data.json')
.then(response => response.json())
.then(json =>{
    let i = json.name
     console.log(i)
    })
window.addEventListener(`load`, ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

  


    let test1 = document.getElementById("p")
    fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(json => test1.innerHTML= '<h1>'+json.title+'</h1>')
    

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=f54e32240f7ce26e110f4531e263bf25`;

            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);
                const {temp} = data.main;
                const {description} = data.weather[0];
                //Set DOM Elements from the API
                temperatureDegree.textContent = parseInt(temp) -273;
                temperatureDescription.textContent = description;
                locationTimezone.textContent = data.name + " / " + data.sys.country;

                //Change temperature to Celsius/Farenheit
                    temperatureSection.addEventListener('click', () =>{
                        if (temperatureSpan.textContent === "C"){
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent =  parseInt((temp - 273) * 9/5 + 32);
                        }else{
                            temperatureSpan.textContent = "C";
                            temperatureDegree.textContent = parseInt(temp) -273;
                        }
                    });
                
            });
        });


    }else{
        h1.textContent = "hey this is not working because reasons :]"
    }


});