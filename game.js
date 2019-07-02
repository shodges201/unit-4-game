var ObiWan = {
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
        this.baseAttack= 5;
        this.counterAttack=  15;
    }
};

var LukeSkywalker = {
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
        this.baseAttack= 6;
        this.counterAttack=  20;
    }
};

var DarthSidious = {
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
        this.baseAttack= 8;
        this.counterAttack=  10;
    }
};

var DarthMaul = {
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
        this.baseAttack= 4;
        this.counterAttack=  20;
    }
};

var player1;
var player2;
var firstSelected = false;
var bothSelected = false;
$('#attackBtn').css("visibility", "hidden");
var dead = [];
var characterArray = [ObiWan, LukeSkywalker, DarthSidious, DarthMaul];

$('.character').on("click", function(){
    console.log($(this));
    console.log($(this).attr('value'));
    var idx = $(this).attr('value');
    if(!firstSelected){
        player1 = characterArray[idx];
        $('#player1').html(this);
        firstSelected = true;
    }
    else if(firstSelected && !bothSelected){
        player2 = characterArray[idx];
        $('#player2').html(this);
        bothSelected = true;
        $('#attackBtn').css("visibility", "visible");
    }
})

$('#attackBtn').on("click", function(){
    if(player1.health > 0 && player2.health > 0){
        player2.health = player2.health - player1.attack;
        player1.health = player1.health - player2.counterAttack;
        player1.increaseAttack();
        player1.healthDiv.text(player1.health);
        player2.healthDiv.text(player2.health);
    }

    console.log(player1.health);
    console.log(player2.health);

    if(player1.health <= 0 && player2.health <= 0){
        console.log("both die");
        dead.push(player1);
        dead.push(player2);
        startOver();
    }
    else if(player1.health <= 0){
        console.log("p1 dies");
        dead.push(player1);
        dead.push(player2);
        startOver();
    }
    else if(player2.health <= 0){
        console.log("p2 dies");
        dead.push(player2);
        player2.container.html(player2.div);
        player2.div.css("visibility", "hidden");
        player2 = undefined;
        healthDisplay2 = undefined;
        bothSelected = false;
        $('#attackBtn').css("visibility", "hidden");
    }
});

function startOver(){
    for(var i =0; i < dead.length; i++){
        var replace = dead[i];
        replace.resetStats();
        replace.div.css("visibility", "visible");
        console.log(replace);
        replace.healthDiv.text(replace.health);
        replace.container.html(replace.div);
    }

    player1 = undefined;
    player2 = undefined;
    firstSelected = false;
    bothSelected = false;
    $('#attackBtn').css("visibility", "hidden");
}