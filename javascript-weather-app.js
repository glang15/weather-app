
$(document).ready(function() {        
    $('.mobile-page2').hide();

    function appendCity(cityName){
        console.log(cityName);
            var cityElement = (`<h1>${cityName}</h1>`);
            $('.city-title').empty();
            $('.city-title').append(cityElement);

    }
    
    function getDate(dateToday){
        var todayDate = (`<p class = "dateToday">${moment.unix(dateToday).format('MM/DD/YYYY')}</p>`);
        $('.date').empty();
        $('.date').append(todayDate);
    }
    
    function getSummary(todaySummary, weekSummary){
        $('.today-summary').empty();
        var todaySum = (`<p class="summaryInfo">${todaySummary}</p>`);
        $('.today-summary').append(todaySum);
        $('.week-summary').empty();
        var weekSum = (`<p class="summaryInfo">${weekSummary}</p>`);
        $('.week-summary').append(weekSum);
        
    }
    
    function appendCurrently(apparentTemp){
        apparentTemp = apparentTemp + "\xB0F"
        var apparentTempElement = (`<p class = "apparentTemp">${apparentTemp}</p>`);
        $('.currently').empty();
        $('.currently').append(apparentTempElement);
        
    }
    
    function appendDaily(todayHumidity, todayPrecipProb, todayWindSpeed){
            $('.today-data').empty();
            var todayHumidity = todayHumidity * 100;
            var todayPrecipProb = todayPrecipProb * 100;
            var todayElement = `
                <div class = "todayData">
                    <p class = "todayHumidity">humidity: ${todayHumidity}%</p>
                    <p class = "todayPrecipProb">Chance of Rain: ${todayPrecipProb}%</p>
                    <p class = "todayWindSpeed">Wind Speed: ${todayWindSpeed} mph</p>
                </div>`
            
            $('.today-data').append(todayElement);

            
        }
    
    
    
    function dailyMax(days){
       $('.weekdays').empty();
        days.forEach(function(day){
            var maxTemp = day.temperatureMax;
            maxTemp = maxTemp + "\xB0F"
            var minTemp = day.temperatureMin;
            minTemp = minTemp + "\xB0F"
            var iconDay = day.icon;
                    if (iconDay === 'clear-day'){
                    var iconDayElement = ('<i class="wi wi-day-sunny"></i>');
                    }
                    if (iconDay === 'clear-night'){
                        var iconDayElement = ('<i class="wi wi-night-clear"></i>');}
                    if (iconDay === 'rain'){
                        var iconDayElement = ('<i class="wi wi-rain"></i>');}  
                    if (iconDay === 'snow'){
                        var iconDayElement = ('<i class="wi wi-snow"></i>'); }
                    if (iconDay === 'sleet'){
                        var iconDayElement = ('<i class="wi wi-sleet"></i>');}
                    if (iconDay === 'wind'){
                        var iconDayElement = ('<i class="wi wi-strong-wind"></i>');}
                    if (iconDay === 'fog'){
                        var iconDayElement = ('<i class="wi wi-fog"></i>');} 
                    if (iconDay === 'cloudy'){
                        var iconDayElement = ('<i class="wi wi-cloudy"></i>');}
                    if (iconDay === 'partly-cloudy-day'){
                        var iconDayElement = ('<i class="wi wi-day-cloudy"></i>');}
                    if (iconDay === 'partly-cloudy-night'){
                        var iconDayElement = ('<i class="wi wi-night-alt-cloudy"></i>') ;} 
                    
                    var dayElement = `
                        <div class = "day-container">
                        <div class = "day">
                        <p class="weekday-name"> ${ moment.unix(day.time).format('dddd')} </p>
                        ${iconDayElement}
                        <p class="maxData"> High: ${maxTemp}</p>
                        <p class="minData"> Low: ${minTemp}</p>
                        </div>
                        </div>
                    `
            
                    $(`.weekdays`).append(dayElement);

        })
    }


    
    function appendIcon(apparentIcon, apparentSummary){
        if (apparentIcon === 'clear-day'){
            var apparentIconElement = ('<i class="wi wi-day-sunny"></i>');}
        if (apparentIcon === 'clear-night'){
            var apparentIconElement = ('<i class="wi wi-night-clear"></i>');}
        if (apparentIcon === 'rain'){
            var apparentIconElement = ('<i class="wi wi-rain"></i>');}  
        if (apparentIcon === 'snow'){
            var apparentIconElement = ('<i class="wi wi-snow"></i>'); }
        if (apparentIcon === 'sleet'){
            var apparentIconElement = ('<i class="wi wi-sleet"></i>');}
        if (apparentIcon === 'wind'){
            var apparentIconElement = ('<i class="wi wi-strong-wind"></i>');}
        if (apparentIcon === 'fog'){
            var apparentIconElement = ('<i class="wi wi-fog"></i>');} 
        if (apparentIcon === 'cloudy'){
            var apparentIconElement = ('<i class="wi wi-cloudy"></i>');}
        if (apparentIcon === 'partly-cloudy-day'){
            var apparentIconElement = ('<i class="wi wi-day-cloudy"></i>');}
        if (apparentIcon === 'partly-cloudy-night'){
            var apparentIconElement = ('<i class="wi wi-night-alt-cloudy"></i>') ;} 
        $('.currently-icon').empty();
        $('.currently-icon').append(apparentIconElement) 
//        var apparentIconString = String(apparentIcon);
        $('.currently-icon').append(`<p class="icon-text">${apparentSummary}</p>`)
    }
    
    
    var getCoordinates = function(location) {
        $.ajax({
            url: `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyD9n4FQaoT2ObJxWALfQUpq-0Hw56uEMSQ`,

            success: function(response){
                console.log(response);    
                var cityName = response.results[0].address_components[0].long_name;
                appendCity(cityName);
                getWeather(response.results[0].geometry.location);}

        })
    }
    
    

    var getWeather = function(coordinates) {
        $.ajax({
            url: `https://api.darksky.net/forecast/2ca3ad1ff9ddf2cebd12d3d57178df93/${coordinates.lat},${coordinates.lng}`,

            jsonp: "callback",

            dataType: "jsonp",

            success: function (response){
                var apparentTemp = response.currently.apparentTemperature
                appendCurrently(apparentTemp);
                var apparentIcon = response.currently.icon;
                var apparentSummary = response.currently.summary;
                console.log('here', response)
                appendIcon(apparentIcon, apparentSummary);
                var days = response.daily.data;
                var todayHumidity = response.daily.data[0].humidity;
                var todayPrecipProb = response.daily.data[0].precipProbability;
                var todayWindSpeed = response.daily.data[0].windSpeed;
                var todaySummary = response.daily.data[0].summary;
                var weekSummary = response.daily.summary;
//                console.log(todaySummary);
                dailyMax(days);
                appendDaily(todayHumidity, todayPrecipProb, todayWindSpeed);
                getSummary(todaySummary, weekSummary);
                var dateToday = response.daily.data[0].time
                getDate(dateToday);
                
            }
        })
    }
    
    
    $('#cityForm').submit(function(e) {
        
        e.preventDefault();
        var $cityValue = $('#cityValue').val();
        getCoordinates($cityValue);
        //console.log(myCity);
        $('.mobile-page1').hide();
        $('.mobile-page2').show();
//        $(".city-name").text($cityValue)
        
    })  
    
    $('#cityForm2').submit(function(e){
        e.preventDefault();
        var $cityValue2 = $('#cityValue2').val();
        $cityValue2 = $cityValue2.toUpperCase();
        getCoordinates($cityValue2);
        
//        $('.city-name').text($cityValue2)
        $('.mobile-page1').hide();
        $('.mobile-page2').show();
    })
    

})
