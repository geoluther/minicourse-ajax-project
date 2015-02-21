
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var city = $("#city").val();
    console.log(city);
    var street = $("#street").val();
    console.log(street);
    var address = street + ', ' + city;
    $greeting.text("So you want to live at " + address);

    var url = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address;

// https://maps.googleapis.com/maps/api/streetview?size=400x400&location=40.720032,-73.988354&fov=90&heading=235&pitch=10
    $( "body" ).append('<img class="bgimg" src="' + url + '">');
    // $body.append('<img class="bgimg" src="https://placeimg.com/640/480/any">');

    // YOUR CODE GOES HERE!

    return false;
};

$('#form-container').submit(loadData);

// loadData();
