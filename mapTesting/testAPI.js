$(function(){

  $('button').click(function(){

    var queryData = {
      start_location: {
        lat: 37.7910523,
        lng: -122.4183172,
        range: 500
      }
    };


    $.ajax({
      url: "http://localhost:5000/api/jaunts",
        type: "GET",
        data: queryData,
        contentType: 'application/json',
        success: function (data) {
          console.log(data);
        },
        error: function (error) {
          console.log('error!', error);
        }
    });
  });
  

});