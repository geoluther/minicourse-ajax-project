
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

    $( "body" ).append('<img class="bgimg" src="' + url + '">');
    // YOUR CODE GOES HERE!

    var keyNYT = '&api-key=29ce58daadeb5a0f1e7b6aa079877df2:14:71400766';
    var baseURL = 'http://api.nytimes.com/svc/search/v2/articlesearch'
    var query = '?q=new+york+times&page=2&sort=oldest';

    var URL = baseURL + query + keyNYT;

    $.getJSON(URL, function(data) {
        console.log(data);
    });

    return false;
};

$('#form-container').submit(loadData);

// loadData();

// nyt key:
// 29ce58daadeb5a0f1e7b6aa079877df2:14:71400766