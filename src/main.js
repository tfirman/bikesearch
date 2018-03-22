import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./../.env"
import "./styles.css"

$(document).ready(function() {
  $('#searchLocation').click(function() {
    let location = $('#location').val();
    $('#location').val("");

    let promise = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://bikeindex.org:443/api/v3/search?page=1&per_page=10&location=${location}&distance=10&stolenness=proximity&access_token=`+process.env.API_KEY;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });

    promise.then(function(response) {
      let body = JSON.parse(response);
      for (let i=0; i <body.bikes.length; i++){
        $('.showResults').append('<img src='+body.bikes[i].thumb+' alt="bike thumb" height="80" width="80">');
        $('.showResults').append("<h5>"+body.bikes[i].title+"</h5>");
        $('.showResults').append("Serial #" + body.bikes[i].serial+"<br>");
        $('.showResults').append(body.bikes[i].stolen_location+"<br><br>");
      };
    });
  });
});
