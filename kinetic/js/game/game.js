var Game = function(config){
    this._config = config;
}

Game.prototype ={
    _stage:null,
    _window:null,
    _map:null,
    run:function(){
        this._init();
    },
    _init:function(){
        this._window = $('#game');
        var stats = new Stats();
        $('#stats').append(stats.domElement);
        this._stage = new Kinetic.Stage({
            container:'game',
            // width:640,
            //height:480
            width:this._window.width(),
            height:this._window.height()
        });
        this._map = new Map(this._stage);
        this._map.load(this._config);
        var map = this._map;
        var stage = this._stage;
        var FPS = 25;
        var maxFrames = 10;
        var skip = 1000/FPS;
       
        var next = Date.now();
        var speed = 3;
        var animation = new Kinetic.Animation({
            func:function(frame){
      
                stats.begin(); 
                var loops = 0;
                var inter = 0;
                while(Date.now() > next && loops < maxFrames){
                    stage.attrs.y +=speed;
                    next+= skip;
                    loops++;
                }
                if(loops > 0){
                    inter = parseFloat(Date.now()+skip-next) /parseFloat(skip);
                    stage.attrs.y+=~~inter;
                    map.draw(); 
                }
                
                stats.end();
            
                  
            }
        });
        animation.start();
       
    }
}
