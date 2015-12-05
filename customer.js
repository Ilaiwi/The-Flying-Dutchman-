/**
 * Created by ahmadilaiwi on 12/5/15.
 */

$(document).ready(function(){

    $(".quarter-circle-top-left , .quarter-circle-top-right , .quarter-circle-down-left ").hover(function(){
        $(this).css("background-color","yellow");
    },
    function(){
        $(this).css("background-color","#c06");
    });

    $(".quantity").hide();

    $( ".item" ).draggable();

    $(".item").mousedown(function(){
        $(".quantity").show();
    });

    $(".item").mouseup(function(){
        $(".quantity").hide();
    });

    $( ".quantity" ).droppable({
        drop: function( event, ui ) {
            $( this )

                .html( "Dropped!" );
        }
    });

});