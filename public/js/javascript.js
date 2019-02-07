$(document).ready(function() {

    // create a metronome
    var metronome = new Pendulum();

    $('select').material_select();

    // update list
    $("#editList").click(function() {
        $("#listUpdate").toggle();
    });

    // delete a list
    $("#deleteList").click(function() {
        var r = confirm("WAIT! This action can not be undone. Are you sure you want to delete this list?");
        if (r == true) {
            $.ajax({
                url: window.location.href,
                method: 'delete'
            }).done(function() {
                // redirect
                window.location.href = "/lists";
            })
        }
    });

    // add song - popout form
    $('.popout').click(function(){
        $('#pop').toggle();
    });

    // search lists
    $('#searchLists').keyup(function() {
        // Declare variables
        var input = document.getElementById("searchLists");
        var str = input.value.toUpperCase();
        // send data to filterLists function
        filterLists("allLists", "h3", "search", str);
    });

    // filter choice toggle
    $("#filters").click(function() {
        $("#filter_difficulty_div").toggle();
    });

    // filter lists by difficulty
    $('#filter_difficulty').change(function() {
        var str = "";
        $("select option:selected").each(function() {
            str += $(this).val() + " ";
        });
        filterLists("allLists", "h5", "difficulty", str);
    });

    // filter songs toggle
    $("#song_filters").click(function() {
        $("#song_filters_div").toggle();
    });

    // search songs
    $('#searchSongs').keyup(function() {
        // Declare variables
        var input = document.getElementById("searchSongs");
        var str = input.value.toUpperCase();
        // send data to filterLists function
        filterLists("allSongs", "strong", "search", str);
    });

    // search artists
    $('#searchArtists').keyup(function() {
        // Declare variables
        var input = document.getElementById("searchArtists");
        var str = input.value.toUpperCase();
        // send data to filterLists function
        filterLists("allSongs", "em", "search", str);
    });

    // search for chords
    $('#search-chords').keyup(function() {
        // get user input
        var input = document.getElementById("search-chords");
        // capitalize the first letter (root note) after a space
        var chord = capitalize(input.value);
        // render svg chords
        jtab.render($('#Chords'), chord);
    });

    // start/stop metronome based on input
    $('.metronome').click(function(){
        var $this = $(this);
        $this.toggleClass('metronome');
        // get user input
        var input = document.getElementById("bpm");
        var bpm = input.value;
        // set the bpm
        metronome.set(bpm);

        if($this.hasClass('metronome')){
            metronome.stop();
            $this.text('Start');
        } else {
            metronome.start();
            $this.text('Stop');
        }

        metronome.on('tick', function() {
            // get dot
            var dot = document.getElementById("dot");
            $(dot).toggleClass('purple');
        });
    });

    $("#spotSearchInput").change(function () {
      // variables
      var token = document.getElementById("token").innerText;
      var input = $('#spotSearchInput').val();
      if (input) {
        var query = input.split(' ').join('%20');
        var url = 'https://api.spotify.com/v1/search?q=' + query + '&type=track';

        // ajax call to spotify
        $.ajax({
            url: url,
            type: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Bearer ' + token
            },
            success: function (result) {
               var name = result.tracks.items[0].name;
               var artist = result.tracks.items[0].artists[0].name
               var tracks = result.tracks.items;
               $('#spotifyData').html('');
               // render the top 5 results
               for (var i = 0; i < 10; i++) {
                 $('#spotifyData').append("<li><strong>Name: "+ tracks[i].name +"</strong><br>Artist: "+ tracks[i].artists[0].name +"</li><br>");
               }
            },
            error: function (error) {
              console.log('error: ' + error);
            }
        });
      }
    })
});

function filterLists(id, eTag, filter, str) {
    // get all lists
    var ul = document.getElementById(id);
    var li = ul.getElementsByTagName("li");

    // Loop through all ul rows, and hide those who don't match the search query
    for (i = 0; i < li.length; i++) {
        // if value is 0 or undefined then clear the filter
        if (parseInt(str) === 0) {
            li[i].style.display = "";
        }
        else {
            element = li[i].getElementsByTagName(eTag)[0];
            // filter lists
            if (element) {
                var txtValue = element.textContent || element.innerText;
                // filter by difficulty
                if (filter === "difficulty") {
                    if (parseInt(txtValue) == parseInt(str)){
                        li[i].style.display = "";
                    }
                    else {
                        li[i].style.display = "none";
                    }
                }
                // filter by search query
                if (filter === "search") {
                    if (txtValue.toUpperCase().indexOf(str) > -1) {
                        li[i].style.display = "";
                    } else {
                        li[i].style.display = "none";
                    }
                }
            }
            else {
                li[i].style.display = "none";
            }
        }
    }
}

function capitalize(str) {
   var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       // assign it to the array
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
   }
   // return the string
   return splitStr.join(' ');
}
