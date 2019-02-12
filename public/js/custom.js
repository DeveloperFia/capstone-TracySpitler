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
