
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
    var baseURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json'
    var query = '?q=new+york+times&page=2&sort=oldest';
    var cityQuery = '?q=' + city;

    var URL = baseURL + cityQuery + keyNYT;

    $.getJSON(URL, function(data) {
        console.log(data);
        for (var i = 0; i < data.response.docs.length; i = i + 1) {
            console.log(data.response.docs[i].web_url);
            console.log(data.response.docs[i].snippet);
            //$nytElem.append('<li><a href="' + data.response.docs[i].web_url + '">');
            $nytElem.append('<li><strong>' + data.response.docs[i].headline.main + '</strong>');
            $nytElem.append('<div class=article>' + data.response.docs[i].snippet + '</div></li>');
        }
    });

    return false;
};

$('#form-container').submit(loadData);

// loadData();

// nyt key:
// 29ce58daadeb5a0f1e7b6aa079877df2:14:71400766