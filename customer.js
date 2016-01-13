/**
 * Created by ahmadilaiwi on 12/5/15.
 */

(function ($) {

    $.getQuery = function (query) {
        query = query.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var expr = "[\\?&]" + query + "=([^&#]*)";
        var regex = new RegExp(expr);
        var results = regex.exec(window.location.href);
        if (results !== null) {
            return results[1];
            return decodeURIComponent(results[1].replace(/\+/g, " "));
        } else {
            return false;
        }
    };


})(jQuery);


$(document).ready(function () {

    var username = $.getQuery('username');
    var password = $.getQuery('password');


    function beerData(){
        beerId=[141001,197302,156503,604504,693502,150103,1191303,159103];
        beerObjects=[];
        for (i=0 ; i< beerId.length;i++){
            $.ajax({
                url: "http://pub.jamaica-inn.net/fpdb/api.php?username=" + username + "&password=" + password + "&action=beer_data_get&beer_id=" + beerId[i],
                async: false,
                cache: true,
                success: function(data, status){
                    beerObjects.push(data.payload[0]);
                }
            });
        }
        return beerObjects;
    }

    frontPageBeers=beerData();
    for (i=0 ;i<frontPageBeers.length;i++){
        if(i==4){
            $('#beers').append("<div class='clear'>");
        }
        $('#beers').append("<div class=item data-price="+ frontPageBeers[i].prisinklmoms +" data-beerid="+ frontPageBeers[i].nr +" >"
            +"<img src='./beer/"+frontPageBeers[i].namn +".jpg' />"+"<BR CLEAR=ALL>"+frontPageBeers[i].namn+
        "</div>");
        //console.log("<div class=item data-price="+ frontPageBeers[i].prisinklmoms +" data-beerid="+ frontPageBeers[i].nr +" >"
        //    +"<img src='./beer/"+frontPageBeers[i].namn +".jpg' />"+
        //    "</div>");

    }

    //$.get(
    //    url :"http://pub.jamaica-inn.net/fpdb/api.php?username=" + username + "&password=" + password + "&action=iou_get",
    //    async : false,
    //    cache : false,
    //    function (data, status) {
    //        //info=jQuery.parseJSON(data);
    //        console.log(data.payload);
    //        $("#userInfo").html("<div>" + data.payload[0].first_name + " " + data.payload[0].last_name + "</div>" + "<div>" + data.payload[0].assets + "</div>");
    //    }
    //
    //);

    $.ajax({
        url: "http://pub.jamaica-inn.net/fpdb/api.php?username=" + username + "&password=" + password + "&action=iou_get",
        async: false,
        cache: false,
        success: function (data) {
            console.log(data.payload[0]);
            $("#userInfo").html("<div>" + data.payload[0].first_name + " " + data.payload[0].last_name + "</div>" + "<div>" + data.payload[0].assets + "</div>");
        }
    });


        $(".quarter-circle-top-left , .quarter-circle-top-right , .quarter-circle-down-left ").hover(function () {
                $(this).css("background-color", "yellow");
            },
            function () {
                $(this).css("background-color", "#c06");
            });

    $(".quantity").hide();

    $(".item").draggable({
        helper: 'clone',
        drag: function () {
            $(".quantity").show();
            $("#trash").hide();
            $("#orders").hide();
        },
        stop: function () {
            $(".quantity").hide();
            $("#trash").show();
            $("#orders").show();
        }
    });




    $(".quantity").droppable({
        drop: function (event, ui) {
            var price = ui.draggable.attr('data-price');
            var beerid = ui.draggable.attr('data-beerid');
            console.log(this);
            $("#orders").append('<div class="inCart floatLeft">' + "<div>" + ui.draggable.html() + "</div>" + "<div>" + "total price=" + price * parseInt($(this).html()) + "</div>" + "</div>");
            $(".inCart").draggable({
                helper: 'clone',
                drag: function () {
                }
            });
        }
    });

    $("#trash").droppable({
        drop: function (event, ui) {
            ui.draggable.remove();
            $('#trash').css({"background": "none"})
        },
        over: function(event,ui){
            $('#trash').css({"background-color": "cadetblue","alpha": "0.3","border-radius": "10px"});
        }
    });

});

function pop(div) {
    document.getElementById(div).style.display = 'block';
}
function hide(div) {
    document.getElementById(div).style.display = 'none';
}
//To detect escape button
document.onkeydown = function (evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        hide('popup');
        hide('popDiv');
    }
};


