
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
    $greeting.text("So you want to live at " + address + '?');

    var url = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address;

    $( "body" ).append('<img class="bgimg" src="' + url + '">');
    // YOUR CODE GOES HERE!

    var keyNYT = '&api-key=29ce58daadeb5a0f1e7b6aa079877df2:14:71400766';
    var baseURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json'
    var cityQuery = '?q=' + city;

    var URL = baseURL + cityQuery + keyNYT;

    $.getJSON(URL, function(data) {
        $nytHeaderElem.text("New York Times Artcles About: " + city);
        articles = data.response.docs;
        console.log(articles);

        for (var i = 0; i < articles.length; i = i + 1) {
            //console.log(articles[i].web_url);
            //console.log(articles[i].snippet);

            var articleLink = '<li class="article"><a href="' + articles[i].web_url + '">';
            var headline = '<strong>' + articles[i].headline.main + '</strong></a>';
            var articleText = '<p>' + articles[i].snippet + '</p></li>';

            $nytElem.append(articleLink + headline + articleText);
        }
    })
    .error(function(e) {
        $nytHeaderElem.text("Error: New York Times Articles Could Not Be Loaded");
    });

    var wikiURL = 'http://en.wwwwwwikipedia.org/w/api.php?action=opensearch&search=' +
    city + '&format=json&limit=15&callback=wikiCallback';

    var wikiRequestTimeout = setTimeout(function () {
        $wikiElem.text('failed to get wikipedia resources');
    }, 8000);

    $.ajax( {
        url: wikiURL,
        dataType:'jsonp',
        success: function(response) {
            var articleList = response[1];
            console.log(articleList);

            for (var i = 0; i < articleList.length; i++ ) {
                var articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href="' + url  + '">' +
                    articleStr + '</a></li>');
            };

            clearTimeout(wikiRequestTimeout);
        }
    });

    return false;
};

$('#form-container').submit(loadData);

    // loadData();

    // nyt key:
    // 29ce58daadeb5a0f1e7b6aa079877df2:14:71400766