var weather_endpoint = "https://api.weatherbit.io/v2.0/current?key=b6c58d04639142ddbe58fee338f6c6bd";
var forecast_endpoint = "http://api.weatherbit.io/v2.0/forecast/daily?key=b6c58d04639142ddbe58fee338f6c6bd";
var w_endpoint = "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&search=";
var mylat;
var mylong;






// Defining the DB.
 const db = new Dexie("history");
          db.version(1).stores({
              searches: 'id++, cityname, latitude,longitude'
          });

db.open().catch((error) => {
    console.log(error);
});







//a function to check if the string is empty
var empty = true;
$('input[type="text"]').each(function(){
   if($(this).val()!=""){
      empty =false;
      return false;
    }
 });





//   THE WEATHER SEARCH BUTTON (including the geolocation) 
$(document).ready(function() {
    $("#wBtn").on("click", function() {

        $("#list").empty();

        if ($("#city").val() == 0) {
            if ("geolocation" in navigator) {
                console.log("geolocation available");

                navigator.geolocation.getCurrentPosition(position => {

                    mylong = position.coords.longitude;
                    mylat = position.coords.latitude;
                    console.log(mylat);
                    db.searches.put({ latitude: mylat, longitude: mylong });
                });   
            
               if(mylat == undefined || mylong == undefined){
                db.searches.get(1, function (lastKnowLocation) {
                mylat = lastKnowLocation.latitude;
                mylong = lastKnowLocation.longitude;
                     console.log(mylat, mylong);
                                 $.get(weather_endpoint + "&lat=" + mylat + "&lon=" + mylong, function(response) {
                $.each(response, function(i, v) {
                    if (v != 1) {

                        $.get(w_endpoint + v[0].city_name, function(response) {
                            var data = "<div class= 'card'>" + v[0].city_name + ", " + v[0].state_code + "<br>" +
                                "~ " + v[0].weather.description + " ~" + "<br>" + "Current Tempertature: " + v[0].temp + " °C" + "<br>" + "Wind Speed: " + v[0].wind_spd + "<br>" + '<a href="' + response[3][1] + '">Discover More about City</a>' + "<br>" + "</li>" + "<br>" + "</div>";
                            console.log(response[3][1]);

                            $("#list").append(data);
                        });
                    };
                });
            });   

        });

        }
                   
                 

                $.get(weather_endpoint + "&lat=" + mylat + "&lon=" + mylong, function(response) {
                    $.each(response, function(i, v) {
                        if (v != 1) {

                            $.get(w_endpoint + v[0].city_name, function(response) {
                                var data = "<div class= 'card'>" + v[0].city_name + ", " + v[0].state_code + "<br>" +
                                    "~ " + v[0].weather.description + " ~" + "<br>" + "Current Tempertature: " + v[0].temp + " °C" + "<br>" + "Wind Speed: " + v[0].wind_spd + "<br>" + '<a href="' + response[3][1] + '">Discover More about City</a>' + "<br>" + "</li>" + "<br>" + "</div>";
                                console.log(response[3][1]);

                                $("#list").append(data);
                            });
                        };
                    });
                });
         
        }

        else {
            console.log("geolocation unavailable")
            alert("Location unavailable, try searching with City Name");
            console.log(longitude, latitude);


        }
    
        }

        $.get(weather_endpoint + "&country=" + $('#country').val() + "&state=" + $('#state').val() + "&city=" + $('#city').val(), function(response) {
            $.each(response, function(i, v) {
                if (v != 1) {

                    $.get(w_endpoint + v[0].city_name, function(response) {
                        var data = "<div class= 'card'>" + v[0].city_name + ", " + v[0].state_code + "<br>" +
                            "~ " + v[0].weather.description + " ~" + "<br>" + "Current Tempertature: " + v[0].temp + " °C" + "<br>" + "Wind Speed: " + v[0].wind_spd + "<br>" + '<a href="' + response[3][1] + '"> Discover More about City </a>' + "<br>" + "</li>" + "<br>" + "</div>";
                        console.log(response[3][1]);

                        db.searches.put({ cityname: v[0].city_name });
                        $("#list").append(data);

                        console.log(db.searches.cityname);
                        //                     $("#list").append(response[3][1]);

                    });

                }

            });
        });

    });
});



/***************************************************************************************************************************** */ 

// THE LOCATION BUTTON

$(document).ready( function(){
    $("#geo").on("click", function(){
          $("#list").empty();
        
        if ("geolocation" in navigator) {
          console.log("geolocation available");
           
          console.log("A")  
          navigator.geolocation.getCurrentPosition( position => {            
          console.log("B")
          mylong= position.coords.longitude;
          mylat = position.coords.latitude;
          console.log(mylat, mylong);
           db.searches.put({latitude:mylat, longitude:mylong});
              
          });
         
             if(mylat == undefined || mylong == undefined){
                    db.searches.get(1, function (lastKnowLocation) {
                    mylat = lastKnowLocation.latitude;
                    mylong = lastKnowLocation.longitude;
                         console.log(mylat, mylong);
                                     $.get(weather_endpoint + "&lat=" + mylat + "&lon=" + mylong, function(response) {
                    $.each(response, function(i, v) {
                        if (v != 1) {

                            $.get(w_endpoint + v[0].city_name, function(response) {
                                var data = "<div class= 'card'>" + v[0].city_name + ", " + v[0].state_code + "<br>" +
                                    "~ " + v[0].weather.description + " ~" + "<br>" + "Current Tempertature: " + v[0].temp + " °C" + "<br>" + "Wind Speed: " + v[0].wind_spd + "<br>" + '<a href="' + response[3][1] + '">Discover More about City</a>' + "<br>" + "</li>" + "<br>" + "</div>";
                                console.log(response[3][1]);

                                $("#list").append(data);
                            });
                        };
                    });
                });   

            });

        }

            
            
            
             $.get(weather_endpoint + "&lat="+ mylat + "&lon=" + mylong, function(response){  
              $.each(response, function(i,v){
                 if(v != 1){
                     
                  $.get(w_endpoint + v[0].city_name , function(response){
                         var data= "<div class= 'card'>" + v[0].city_name + ", " + v[0].state_code + "<br>" +
                 "~ "+v[0].weather.description +" ~"+ "<br>" + "Current Tempertature: " + v[0].temp+ " °C"+ "<br>" + "Wind Speed: " + v[0].wind_spd + "<br>" +'<a href="'+response[3][1]+'">Discover More about City</a>' + "<br>" + "</li>" + "<br>" + "</div>" ;
            console.log(response[3][1]);
            $("#list").append(data);
     
            });   console.log(v[0].city_name);
             };
            });    
            });
            }
        
            else {
                 console.log("Location unavailable, try searching with City Name.");
            }
    });        
})