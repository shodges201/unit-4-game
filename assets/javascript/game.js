$(document).ready(function(){

var ObiWan = {
        name: "Obi-Wan",
        health: 120,
        attack: 5,
        baseAttack: 5,
        counterAttack:  15,
        container: $('#obiWanContainer'),
        div: $('#obiWan'),
        healthDiv: $('#healthObi'),

    increaseAttack: function(){
        this.attack += this.baseAttack;
    },
    resetStats: function(){
        this.health = 120;
        this.attack= 5;
    }
};

var LukeSkywalker = {
        name: "Luke Skywalker",
        health: 100,
        attack: 6,
        baseAttack: 6,
        counterAttack: 20,
        container: $('#lukeContainer'),
        div: $('#luke'),
        healthDiv: $('#healthLuke'),

    increaseAttack: function(){
        this.attack += this.baseAttack;
    },

    resetStats: function(){
        this.health = 100;
        this.attack= 6;
    }
};

var DarthSidious = {
        name: "Darth Sidious",
        health: 150,
        attack: 8,
        baseAttack: 8,
        counterAttack: 10,
        container: $('#sidiousContainer'),
        div: $('#sidious'),
        healthDiv: $('#healthSid'),

    increaseAttack: function(){
        this.attack += this.baseAttack;
    },
    resetStats: function(){
        this.health = 150;
        this.attack= 8;
    }
};

var DarthMaul = {
        name: "Darth Maul",
        health: 100,
        attack: 4,
        baseAttack: 4,
        counterAttack: 20,
        container: $('#maulContainer'),
        div: $('#maul'), 
        healthDiv: $('#healthMaul'),

    increaseAttack: function(){
        this.attack += this.baseAttack;
    },
    
    resetStats: function(){
        this.health = 100;
        this.attack= 4;
    }
};

var player1;
var player2;
var firstSelected = false;
var bothSelected = false;
$('#attackBtn').css("visibility", "hidden");
$('#resetBtn').css('visibility', 'hidden');
var dead = [];
var characterArray = [ObiWan, LukeSkywalker, DarthSidious, DarthMaul];

$('.character').on("click", select);

function select(){
    console.log($(this));
    console.log($(this).attr('value'));
    var idx = $(this).attr('value');
    if(!firstSelected){
        player1 = characterArray[idx];
        $('#player1').html(player1.div);
        firstSelected = true;
        player1.div.css('background-color', 'deepskyblue');
        $('#topHeader').text("Choose Your Opponent");
    }
    else if(firstSelected && !bothSelected){
        if(dead.indexOf(idx) == -1 && player1 !== characterArray[idx]){
            player2 = characterArray[idx];
            $('#player2').html(player2.div);
            bothSelected = true;
            $('#attackBtn').css("visibility", "visible");
            player2.div.css('background-color', '#c82333');
            $('#topHeader').text("Opponents Left Standing");
        }
    }
}

$('#attackBtn').on("click", function(){
    $('#stats').html("");
    if(player1.health > 0 && player2.health > 0){
        player2.health = player2.health - player1.attack;
        player1.health = player1.health - player2.counterAttack;
        player1.healthDiv.text(player1.health);
        player2.healthDiv.text(player2.health);
        $('#stats').prepend("<p class=stats>You attacked "+ player2.name + " for " + player1.attack + " damage<p>");
        $('#stats').prepend("<p class=stats>"+ player2.name + " attacked you back for " + player2.counterAttack + " damage<p>");
        player1.increaseAttack();
    }


    console.log(player1.health);
    console.log(player2.health);

    if(player1.health <= 0 && player2.health <= 0){
        console.log("both die");
        dead.push(player1);
        dead.push(player2);
        $('#resetBtn').css('visibility', 'visible');
        $('#attackBtn').css("visibility", "hidden");
        player1.div.css("background-color", "gray");
        player2.div.css("background-color", "gray");
    }
    else if(player1.health <= 0){
        console.log("p1 dies");
        dead.push(player1);
        dead.push(player2);
        $('#resetBtn').css('visibility', 'visible');
        $('#attackBtn').css("visibility", "hidden");
        player1.div.css("background-color", "gray");
    }
    else if(player2.health <= 0){
        console.log("p2 dies");
        dead.push(player2);
        player2 = undefined;
        healthDisplay2 = undefined;
        bothSelected = false;
        $('#attackBtn').css("visibility", "hidden");
        player2.div.css("background-color", "gray");
        $('#topHeader').text("Choose Your Opponent");
    }
});

function startOver(){
    for(var i =0; i < dead.length; i++){
        var replace = dead[i];
        replace.resetStats();
        console.log(replace);
        console.log(replace.div.attr("value"));
        console.log(replace.div.attr("class"));
        replace.healthDiv.text(replace.health);
        replace.container.html(replace.div);
        replace.div.css("background-color", "white");
        replace.div.css("visibility", "visible");
        replace.div.on("click", select);
    }

    player1 = undefined;
    player2 = undefined;
    firstSelected = false;
    bothSelected = false;
    $('#attackBtn').css("visibility", "hidden");
    $('#resetBtn').css("visibility", "hidden");
    $('#topHeader').text("Choose Your Player");
}

$('#resetBtn').on("click", function(){
        startOver();
    })

});