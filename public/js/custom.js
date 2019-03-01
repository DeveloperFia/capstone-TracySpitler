// custom javascript/jquery

$(document).ready(function () {

  /******************* data table *******************/

  // instantiate song data table
  $('#dtSongs').DataTable({
    "order": [[ 1, "asc" ]],
    "language": {
      "lengthMenu": "Display _MENU_ songs",
      "info": "Showing <span class='light-blue-text'>_START_ to _END_</span> of _TOTAL_ songs"
    }
  });
  $('.dataTables_length').detach().appendTo('#songfilters').addClass('bs-select');;
  $('.dataTables_filter').detach().appendTo('#songfilters');
  $('.dataTables_info').detach().appendTo('#songfooter');
  $('.dataTables_paginate').detach().appendTo('#songfooter');

  // highlight selected row
  $("#dtSongs tr").not("thead tr").click(function() {
    var selected = $(this).hasClass("highlight");
    $("#dtSongs tr").removeClass("highlight blue lighten-5");
    if(!selected) {
      $(this).addClass("highlight blue lighten-5");
      $("#aboutsong").addClass("blue-gradient");
    }
    else {
      $("#aboutsong").removeClass("blue-gradient");
    }
  });

  // table buttons
  $('#editsong').hover(
    function(){ $(this).addClass('peach-gradient') },
    function(){ $(this).removeClass('peach-gradient') }
  );

  $('#deletesong').hover(
    function(){ $(this).addClass('purple-gradient') },
    function(){ $(this).removeClass('purple-gradient') }
  );

  $('#aboutsong').not("highlight").hover(
    function(){ $(this).addClass('blue-gradient') },
    function(){ $(this).removeClass('blue-gradient') }
  );

  /******************* songs *******************/

  // about single song
  $("#aboutsong").click(function() {
    var selected = $("#dtSongs tr").hasClass("highlight");
    if (selected) {
      var parent_id = $(".highlight").find('td:eq(0)').text();
      window.location.href = "/song/get/" + parent_id;
    }
  });

  // modal - confirm delete song
  $("#deletesong").click(function() {
    var selected = $("#dtSongs tr").hasClass("highlight");
    if (selected) {
      $('#modalSongDelete').modal('show');
    }
  });

  // delete song by {id}
  $("#confirmSongDelete").click(function(){
    var parent_id = $(".highlight").find('td:eq(0)').text();
    var btn_id = $('#songid').val();
    var url = (parent_id) ? parent_id : btn_id;
    $.ajax({
      url: '/song/delete/' + url,
      method: 'delete'
    }).done(function() {
      // redirect
      window.location.href = "/song";
    })
  });

  /******************* spotify *******************/

  // search spotify for song
  $("#searchspotify").keyup(function(){
    var query = ($(this).val() == '') ? 0 : $(this).val();
    var beginning = '<div class="list-group-item list-group-item-action d-flex"><p class="mb-0">';
    var middle = '</p><div class="flex-column"><p><strong class="spotify-title">';
    var end = '</span></div></div>';

    $.getJSON('/spotify/' + query, function(data) {
      var songs = data.results;
      $('#spotifyresults div:first').replaceWith('<div>');
      if (!query) {
        $('#spotifyresults div:first').append(beginning + '<i class="fab fa-spotify fa-2x mr-4 success-color p-3 white-text rounded " aria-hidden="true" />' + middle + 'Search Results</strong></p><span class="spotify-artist"> from Spotify' + end);
      }
      else {
        for (var i = 0; i < songs.length; i++) {
          $('#spotifyresults div:first').append(beginning + '<img data-options={"preview":"'+ songs[i].preview_url +'"} id="' + songs[i].id + '" class="mr-4 z-depth-1 img-thumbnail" src="' + songs[i].album.images[1].url + '" alt="Album Image" height="64" width="64">' + middle + songs[i].name + '</strong></p><span class="spotify-artist"> by ' + songs[i].artists[0].name + end);
        }
      }
    });
  });

  // on song select, fill fields
  $('#spotifyresults').on('click', function(e) {
    var el = $(e.target).closest('.list-group-item');
    var songid = el.find('p').find('.img-thumbnail').attr("id");
    var title = el.find('p:last').text();
    var art = el.find('span').text();
    var img = el.find('p').find('.img-thumbnail').attr("src");

    if (songid) {
      // remove labels
      $('label').text('');

      $.getJSON('/spotify/features/' + songid, function(data) {
        var features = data.results;
        var artist = art.split('by ');
        var duration = toTime(features.duration_ms);
        var preview = $( "#"+ songid +"" ).data( "options" ).preview;

        // set form values
        $('.songtitle').val(title);
        $('.artist').val(artist[1]);
        $('.key').val(features.key);
        $('.capo').val(0);
        $('.tempo').val(features.tempo);
        $('.duration').val(((duration.hour > 0) ? duration.hour + ':' : '') + duration.minute + ':' + duration.seconds);

        // set hidden values
        $('.img').val(img);
        $('.spotify_id').val(features.id);
        $('.preview_url').val(preview);
      });
    }
  });

  // play sample
  $(".fa-play-circle").click(function() {
    var songid = this.id;
    var song = document.getElementById("audio-" + songid);
    var sounds = document.getElementsByTagName('audio');

    // pause all sounds & reset buttons
    for (i=0; i<sounds.length; i++) sounds[i].pause();
    if ($('i.mod').hasClass("fa-pause-circle")) {
      $('i.mod').removeClass('playing fa-pause-circle');
      $('i.mod').addClass('fa-play-circle');
    }
    else {
      // play clicked sample
      $(this).toggleClass('playing');
      if($(this).hasClass('playing')){
        song.play();
        $(this).toggleClass('fa-play-circle fa-pause-circle');
      }
      else {
        song.pause();
        $(this).toggleClass('fa-play-circle fa-pause-circle');
      }
    }
  });

  /******************* lists *******************/

  // search lists
  $('#searchlists').keyup(function() {
    // Declare variables
    var input = document.getElementById("searchlists");
    var str = input.value.toUpperCase();
    // send data to filterLists function
    filterLists("allLists", "h4", "search", str);
  });

  // delete list {by id}
  $("#deleteList").click(function() {
    var r = confirm("Are you sure you want to delete this list?");
    if (r == true) {
      $.ajax({
        url: window.location.href,
        method: 'delete'
      }).done(function() {
        // redirect
        window.location.href = "/list";
      })
    }
  });

  /******************* metronome *******************/

  // volume button
  $('#mute').click(function() {
    $(this).find('i').toggleClass('fa-volume-mute fa-volume-up');
  });

  // create a metronome
  var metronome = new Pendulum();

  // on tempo change
  function bpmVal(e){
    var input = $(this);
    var str = input.val();
    metronome.set(str);
    $( ".circle-content" ).html( str );
  }
  jQuery('.bpm-change').change(bpmVal).keyup(bpmVal);

  // start/stop metronome based on input
  $('.metronome').click(function(){

    var $this = $(this);
    $this.toggleClass('metronome');
    // get user input
    var input = $('.bpm-change');
    var bpm = input.val();
    // set the bpm
    metronome.set(bpm);

    // toggle the metronome & buttons
    if($this.hasClass('metronome')){
      metronome.stop();
      $this.text('Start');
      $this.toggleClass('blue-gradient peach-gradient');
    } else {
      metronome.start();
      $this.text('Stop');
      $this.toggleClass('blue-gradient peach-gradient');
    }

    // toggle bigger circle & sound
    metronome.on('tick', function() {
      $(bigdot).toggleClass('dusty-grass-gradient');
      if ($('#mute i').hasClass('fa-volume-up')) {
        var sound = document.getElementById("audio");
        sound.play();
      }
    });
  });

  // song metronome
  $('.fa-circle').click(function() {
    $(this).toggleClass('blue-text');
    var tempo = this.id;
    metronome.set(tempo);

    // toggle the metronome & buttons
    if($(this).hasClass('blue-text')){
      metronome.start();
      $(this).toggleClass('fas fa-circle far fa-circle');
    } else {
      metronome.stop();
      $(this).toggleClass('fas fa-circle far fa-circle');
    }

    // toggle sound
    metronome.on('tick', function() {
      var sound = document.getElementById("audiotable");
      sound.play();
    });
  });

  /******************* chords *******************/

  $('.search-chords').keyup(function() {
    // get user input
    var input = $('.search-chords').val();
    // capitalize the first letter (root note) after a space
    var chord = capitalize(input);
    // render svg chords
    jtab.render($('#chords'), chord);
  });

  // end
});

/******************* flash alerts *******************/

// alerts fade in 4 sec unless 'danger'
window.setTimeout(function() {
  $(".alert").not(".alert-danger").fadeTo(500, 0).slideUp(500, function(){
    $(this).remove();
  });
}, 4000);

// 'danger' alert display's for 8 sec
window.setTimeout(function() {
  $(".alert-danger").fadeTo(500, 0).slideUp(500, function(){
    $(this).remove();
  });
}, 8000);

/******************* functions *******************/

// filter function
function filterLists(id, eTag, filter, str) {
  // get all lists
  var ul = document.getElementById(id);
  var li = ul.getElementsByClassName("filter-list");

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

// capitalize string
function capitalize(str) {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
    // assign it to the array
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // return the string
  return splitStr.join(' ');
}

// convert milliseconds to time
function toTime(ms) {
  var minutes = Math.floor(ms / 60000);
  var seconds = ((ms % 60000) / 1000).toFixed(0);
  return {
    minute: minutes,
    seconds: (seconds < 10 ? '0' : '') + seconds
  }
}
