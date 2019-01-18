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
