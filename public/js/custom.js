// custom javascript/jquery

// delete a list
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

/******************* data table *******************/

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

// single song info
$("#aboutsong").click(function() {
  var selected = $("#dtSongs tr").hasClass("highlight");
  if (selected) {
    var parent_id = $(".highlight").find('td:eq(0)').text();
    window.location.href = "/song/get/" + parent_id;
  }
});
