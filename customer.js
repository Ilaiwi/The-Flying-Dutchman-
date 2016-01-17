/**
 * Created by ahmadilaiwi on 12/5/15.
 */


function getDictionary(lang) {
    if ("en" == lang) {
        return [["cartName", "Cart"],
            ["undo", "Undo"],
            ["redo", "Redo"],
            ["crackerName","Crackers"],
            ["beerName","Beer"],
            ["alcoholfreeName","Non-Alcoholic"],
            ["purchasesName","Purchases"]

        ];
    };

    if ("sv" == lang) {

        return [["cartName", "Vagn"],
            ["undo", "Ångra"],
            ["redo", "göra om"],
            ["crackerName","Crackers"],
            ["beerName","öl"],
            ["alcoholfreeName","Alkoholfri"],
            ["purchasesName","inköp"]
        ];

    };

    // This is just a place holder, in case that you would have a wrong
    // language code.
    //
    return [ ["gurka", "gurka"],["gurka","gurka"]];
}


function translate() {
    // First we check for the current language.
    //
    var lang=$.getQuery('lang');
    console.log(lang);

    // The we get the appropriate dictionary.
    //
    var diction = getDictionary(lang);

    // Then we replace the content of all the defined class tags. If a tag is missing, it
    // will not be translated.
    //
    // This is a simple loop over the array.
    //
    for (var i=0; i < diction.length;i++) {

        // A simple jQuery call, that replaces the content of all the items with the
        // specified class.
        //
        $("#" + diction[i][0]).html(diction[i][1]);
    }

}


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


    translate();
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
        $('#beers').append("<div class=item data-price="+ frontPageBeers[i].prisinklmoms +" data-beerid="+ frontPageBeers[i].nr +" data-beername="+ frontPageBeers[i].namn +" >"
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
            $("#user").prepend("<div>" + data.payload[0].first_name + " " + data.payload[0].last_name + "</div>" + "<div>" + data.payload[0].assets + "</div>");
        }
    });

    $.ajax({
        url: "http://pub.jamaica-inn.net/fpdb/api.php?username=" + username + "&password=" + password + "&action=inventory_get",
        async: false,
        cache: false,
        success: function (data) {
            console.log(data.payload[0]);
            for (i=0 ; i< data.payload.length;i++)
                $('#shopBeer').append("<div class='mainItem item' data-price="+ data.payload[i].price +" data-beerid="+ data.payload[i].beer_id +" data-beername="+ data.payload[i].namn +" >"
                    //+ "<img src='./beer/"+data.payload[i].namn +".jpg' />"
                    +"<div class='notAvailable'>"+data.payload[i].namn+"<br/>"+data.payload[i].price+"kr"+"</div>"
                    + "</div>");
        }
    });





    $.ajax({
        url: "http://pub.jamaica-inn.net/fpdb/api.php?username=" + username + "&password=" + password + "&action=purchases_get",
        async: false,
        cache: false,
        success: function (data) {
            console.log(data.payload[0]);
            for (i=0 ; i< data.payload.length;i++)
            $("#purchases").append("<div>" + data.payload[i].namn + " <br> " + data.payload[i].timestamp + "</div>");
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
            $(".undo").hide();
            $(".redo").hide();
        },
        stop: function () {
            $(".quantity").hide();
            $("#trash").show();
            $("#orders").show();
            $(".undo").show();
            $(".redo").show();

        }
    });




    $(".quantity").droppable({
        drop: function (event, ui) {
            var price = ui.draggable.attr('data-price');
            var beerid = ui.draggable.attr('data-beerid');
            var name= ui.draggable.attr('data-beername');
            console.log(this);
            addBeerOrder('<div class="inCart floatLeft">' + "<div>" + name + "</div>" + "<div>" +  price * parseInt($(this).html()) +"kr"+ + "</div>" + "</div>")
            //$("#orders").append('<div class="inCart floatLeft">' + "<div>" + name + "</div>" + "<div>" + "total price=" + price * parseInt($(this).html()) + "</div>" + "</div>");
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

    function UndoItem (perform, data) {
        this.perform = perform;
        this.data = data;
    }


    function UndoStack(self) {
        this.stack = [];
        this.current = -1;
        this.self = self;
    }

    /**
     * UndoStack#push (action, data);
     * perform(true, data)  -> Function which performs redo based on previous state
     * perform(false, data) -> Function which performs undo based on current state
     * data -> Argument passed to undo/redo functions
     **/
    UndoStack.prototype.push = function (perform, data) {
        this.current++;

        // We need to invalidate all undo items after this new one
        // or people are going to be very confused.
        this.stack.splice(this.current);
        this.stack.push(new UndoItem(perform, data));
    };

    UndoStack.prototype.undo = function () {
        var item;

        if (this.current >= 0) {
            item = this.stack[this.current];
            item.perform.call(this.self, false, item.data);
            this.current--;
        } else {
            alert("Already at oldest change");
        }
    };

    UndoStack.prototype.redo = function () {
        var item;

        item = this.stack[this.current + 1];
        if (item) {
            item.perform.call(this.self, true, item.data);
            this.current++;
        } else {
            alert("Already at newest change");
        }
    };

    UndoStack.prototype.invalidateAll = function () {
        this.stack = [];
        this.current = -1;
    };



    var undostack = new UndoStack(null);

    function pushAction (perform, data) {
        var return_value;

        // We want the redo call before the push in case it throws.
        return_value = perform.call(this, true, data);
        undostack.push(perform, data);
        return return_value;
    };

    function addBeerOrder (newOrder) {
        var oldOrder= $("#mainOrders").find(".inCart ");
        console.log(oldOrder);
        pushAction(
            function (redo, data) {
                if (redo)
                {
                    $("#orders").append(data[1]);
                    $("#mainOrders").append(data[1]);
                }
                else
                {
                    $("#mainOrders").html("");
                    $("#orders").html("");
                    for(i=0;i<data[0].length;i++){
                        $("#orders").append(data[0][i]);
                        $("#mainOrders").append(data[0][i]);
                    }
                }

            },
            [oldOrder, newOrder]
        );
    };



    $(".undo").click(function(){
        undostack.undo();
    });

    $(".redo").click(function(){
        undostack.redo();
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


