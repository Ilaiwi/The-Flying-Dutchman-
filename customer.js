/**
 * Created by ahmadilaiwi on 12/5/15.
 */

(function($){

    $.getQuery = function( query ) {
        query = query.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
        var expr = "[\\?&]"+query+"=([^&#]*)";
        var regex = new RegExp( expr );
        var results = regex.exec( window.location.href );
        if( results !== null ) {
            return results[1];
            return decodeURIComponent(results[1].replace(/\+/g, " "));
        } else {
            return false;
        }
    };


})(jQuery);


$(document).ready(function(){

    var username=$.getQuery('username');
    var password=$.getQuery('password');

    $.get(url:"http://pub.jamaica-inn.net/fpdb/api.php?username="+username+"&password="+password+"&action=iou_get",async:false,
        cache: false,
        function(data, status){

            //info=jQuery.parseJSON(data);
            console.log(data.payload);
            $("#userInfo").html("<div>"+data.payload[0].first_name+" "+data.payload[0].last_name+"</div>"+"<div>"+data.payload[0].assets+"</div>");
    });

    $.ajax({
        url: "http://pub.jamaica-inn.net/fpdb/api.php?username="+username+"&password="+password+"&action=iou_get",
        async:false,
        cache: false,
        success: function(data) {
            if( data != "confirmed"){
                location.href = "logout";
            }
        }


        $(".quarter-circle-top-left , .quarter-circle-top-right , .quarter-circle-down-left ").hover(function(){
        $(this).css("background-color","yellow");
    },
    function(){
        $(this).css("background-color","#c06");
    });

    $(".quantity").hide();

    $( ".item" ).draggable({
        helper:'clone',
        drag: function(){
            $(".quantity").show();
            $("#trash").hide();
            $("#orders").hide();
        },
        stop: function(){
            $(".quantity").hide();
            $("#trash").show();
            $("#orders").show();
        }
    });





    $( ".quantity" ).droppable({
        drop: function( event, ui ) {
            var price = ui.draggable.attr('data-price');
            var beerid = ui.draggable.attr('data-beerid');
            console.log(this);
            $("#orders").append('<div class="inCart floatLeft">'+ "<div>"+ui.draggable.html()+"</div>"  + "<div>"+ "total price="+ price*parseInt($(this).html()) +"</div>"+"</div>" );
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
document.onkeydown = function(evt) {
    evt = evt || window.event;
    if (evt.keyCode == 27) {
        hide('popDiv');
    }
};