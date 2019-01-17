$(document).ready(function() {
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

    // list choice
    $("#lchoicebtn").click(function() {
        $("#inList").toggle();
    });

    // custom list
    $("#lcustombtn").click(function() {
        $("#customList").toggle();
    });

    // expand options
    $("#soptionsbtn").click(function() {
        $("#extraOptions").toggle();
    });

});
