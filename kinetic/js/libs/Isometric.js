
Kinetic.Isometric = function(tw,th,mw,mh){
   
    this._tile.width = parseInt(tw);
    this._tile.height = parseInt(th)||parseInt(tw)/2;
    this._tile.r = this._tile.width / this._tile.height;
            
    this._map.width = parseInt(mw);
    this._map.height = parseInt(mh) || parseInt(mw);
       
    this._origin.x = this._map.height * this._tile.width / 2;
    this._width =  this._map.height * this._tile.width;
    this._height = this._map.height * this._tile.height;
            
         
    return this;
}
   
Kinetic.Isometric.prototype ={
    _tile :{
        width:0,
        height:0,
        r:0
    },
    _map:{
        width:0,
        height:0
    },
    _origin:{
        x:0,
        y:0
    },
 

    pos2px:function(x,y){
 
        return{
            left:~~((x-y)*this._tile.width/2+this._origin.x),
            top:~~((x+y)*this._tile.height/2)
        }
    },
    px2pos:function(left,top){
        var x = (left - this._origin.x)/this._tile.r;
        return {
            x:((top+x) / this._tile.height),
            y:((top-x) / this._tile.height)
        }
    },
    getCenterPosition:function(x,y,width,height){
        var pos = this.pos2px(x,y),
        newX = -pos.left+width/2-this._tile.width/2,
        newY = -pos.top+height/2;

        return {
            x:~~newX,
            y:~~newY
            };
    },
    area:function(vp,offset,torus){
        if(!offset) offset = 0;
        if(!torus) torus = true;
        
        
        var start = {
            x:vp.x-this._tile.width/2,
            y:vp.y+this._tile.height
        };
        var end = {
            x:start.x+vp.w,
            y:start.y+vp.h
        }
        var grid = [];
        for(var y = start.y,yl =end.y;y<=yl;y+=this._tile.height/2){
            for(var x = start.x,xl =end.x;x<=xl;x+=this._tile.width/2){
               
                var row = this.px2pos(x,y),
                posX = ~~row.x,posY = ~~row.y;
          
                if(!torus && posX > 0 || posY > 0) {
                    posX = Math.max(0, Math.min(this._map.width, posX));
                    posY = Math.max(0, Math.min(this._map.height, posY));
                    grid.push([posX,posY]); 
                }else{
                    grid.push([posX,posY]);  
                }
              
            }
        }
      
      
        return grid;       
    } 
    
};
