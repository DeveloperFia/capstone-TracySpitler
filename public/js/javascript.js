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

    // search lists
    $('#searchLists').keyup(function() {
        // Declare variables
        var input, filter, ul, li, h3, i, txtValue;
        input = document.getElementById("searchLists");
        filter = input.value.toUpperCase();
        ul = document.getElementById("allLists");
        li = ul.getElementsByTagName("li");

        // Loop through all ul rows, and hide those who don't match the search query
        for (i = 0; i < li.length; i++) {
            h3 = li[i].getElementsByTagName("h3")[0];
            if (h3) {
                txtValue = h3.textContent || h3.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    li[i].style.display = "";
                } else {
                    li[i].style.display = "none";
                }
            }
        }
    });

});
