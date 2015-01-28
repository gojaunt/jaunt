$(function(){

  $('button').click(function(){

    var queryData = {
      stops : {
        location : {
          coordinates: [-122.421507, 37.785572],
          range: 1
        }
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