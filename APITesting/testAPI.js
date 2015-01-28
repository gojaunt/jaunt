$(function(){

  $('button').click(function(){

    // var queryData = {
    //   end_location: {
    //     coordinates: [-122.4025466, 37.7943864],
    //     range: 1500
    //   },
    //   tags : ['happy hour']
    // };

    var queryData = {
      stops: {
        tags: ["Drinking"]
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