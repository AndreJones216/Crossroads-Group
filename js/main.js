$body = $("body");

$(document).on({
    ajaxStart: function() { $body.addClass("loading");    },
     ajaxStop: function() { $body.removeClass("loading"); }    
});


$("#getCommits").click(function(){
    $.ajax({
        type: "GET",
        url: "https://api.github.com/repos/AndreJones216/Crossroads-Group/commits?&per_page=20",
        data: "data",
        success: function (data) {
            displayCommitInfo(data);
        },
        fail: function(e){
            console.log('No luck getting any information from github' + e);    
        }
    });
});

function displayCommitInfo(gitCommits){
    
    var row = "";
    var commitCount = gitCommits.length;

    $.each(gitCommits, function (i, commit) { 
        row +="<tr><td>" + commit.commit.author.name + "</td>";
        row +="<td><a href='" + commit.html_url + "' target='_blank'>" + commit.commit.message+ "</a></td>";
        row +="<td>"+ moment(commit.commit.author.date).format("MMMM Do YYYY h:mma ") + "</td></tr>"
    });

    $("#commitsHTML").html(row);
    $("#commitCount").html(commitCount);


}


