Crafty.scene("Loading",function(){
    
    });

Crafty.scene("FrontierOutpost",function(){
    //Setup background color
    //Crafty.background("#000");
    //Get Background Tiles
    var backgrounds = frontier_outpost.layers.background.split(","); 
    //Get Object Tiles
    var objects = frontier_outpost.layers.object.split(",");
    //Get Collision Tiles
    var collisions = frontier_outpost.layers.collision.split(",");
    //Get Map Metadata;
    var map = frontier_outpost.metadata;

    //Convert Data to Integers
    var tw = parseInt(map.tilewidth);
    var th = parseInt(map.tileheight);
    var mw = parseInt(map.width);
    var mh = parseInt(map.height);
    var startX = 10;
    var startY = 10;
    var iso = Crafty.diamondIso.init(tw,th,mw,mh);
  
    var player = Crafty.e("Player");
    iso.place(player,startX,startY,2);
          
 
   
    iso.centerAt(startX,startY);
    var bg = Crafty.e("IsoLayer"); //Create Background entity
      
 
    
    player.bind("Moved",function(){
        var pos = iso.px2pos(this.x,this.y+this.h);
        pos.x = ~~pos.x;
        pos.y = ~~pos.y;
        //If player coordiantes didnt changed return
        if(this.position.x == pos.x || this.position.y == pos.y) return;
      
        //update player coordiantes
        this.position.x = pos.x;
        this.position.y = pos.y;
        this.z = (~~pos.y+1) * 2;
        //update map
       // bg.render();
        renderObjects();
    });

    var renderObjects = function(){
        var area = iso.area();
        for(var a=0,al = area.length;a<al;a++){
            var loc = area[a],
            x = loc[0],
            y= loc[1],
            i = y * mh + x,
            object = objects[i], //get current object
            collision =  collisions[i], //get current collision
            tile = null,//initialize tile
            layer = 1,//initialize layer
            z=0,//initialize Z
            tilename=''; //initialize individual name for tiles
          
         
            //place object tiles
            if(object > 0){
                //set layer
                layer = 2;
                z = (y+1)*layer;
                tilename = 'Y'+y+'X'+x+'Z'+z;
                //Find Tile
                tile = Crafty(tilename);
                if(tile.length < 1){ //Create tile if tile not exists
                    tile = Crafty.e("2D","Tile","Canvas",object,tilename);//Mark the components as Tiles with Tile component
                    //add colision 
                    // < 0 means disabled 
                    if(collision < 0) {
                        tile.addComponent("Solid");
                        tile.collision( this._iso.polygon(tile));
                    } 
                    iso.place(tile,x,y,layer);
                }
                //clear tile
                tile = null;
            }
                    
              
        }
        //Clearing up the objects
        var tiles = Crafty("Tile"); //get the marked tiles
        if(tiles.length >1){
            var vp = Crafty.viewport.rect(); //get Rect of viewport
            for(var t = 0,tl = tiles.length;t<tl;t++){
                tile = Crafty(tiles[t]);
                if(!tile.intersect(vp._x,vp._y,vp._w,vp._h)){ //if tile not intersect the viewport
                    tile.destroy(); //destroy
                }
               
            }
    
        }
         
    };  
    //Testing prerender
    var renderBg = function(){
        var i = 0;

       
        for(var y = 0;y<mh;y++){
            
            for(var x = 0;x<mw;x++){
                i = y * mh+x;
                var background = backgrounds[i],tile=null; //get Background image
                if(background > 0){
                    tile = Crafty.e(background); //Create Tile
                    iso.place(tile,x,y); //calculate tile positions
                    bg.addTile(tile.cacheCanvas,tile.x,tile.y); //Draw tile to offscreen
                    tile.destroy(); //Destroy object
                }
                
              
            }
                
            
        }
      //  bg.render(); //Draw offscreen into stage
      
    }
    
    renderBg(); 
    renderObjects();
 
   
    console.log("Tiles in Screen");
    console.log(Crafty("2D").length);
});
