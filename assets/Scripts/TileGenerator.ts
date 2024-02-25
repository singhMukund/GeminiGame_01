import { _decorator, Component, instantiate, macro, Material, Node, Prefab, randomRangeInt, Scheduler, Vec3 } from 'cc';
import { SpawnTile } from './SpawnTile';
const { ccclass, property } = _decorator;
enum Tile_Type{single , double , triple}
@ccclass('TileGenerator')
export class TileGenerator extends Component {


    @property(Prefab)
    tile:Prefab = null;
    @property
    canGenerate:boolean = false;
    @property(Prefab)
    changer:Prefab = null;

    tileCount:number =0;
    changerCount:number = 5;
    canGenrateChanger:boolean = false;

    counter:number =0;
    timer:number = 40;

    @property([Material])
    tile_mat:Material[] =[]

    @property([Material])
    tile_pressed_mat:Material[] =[]

    @property
    zPos:number = 15;

    bgMat:number = 1;

    tile_Type:Tile_Type = Tile_Type.single;

    tileTypeTest:number =0;

    
    start() {
        var num =0;
    this.schedule((dt)=>{
        var ar = [25 ,20,20, 35  ,40 ];
        //this.timer = ar[num];

        num++;
        if(num > ar.length-1){
            num =0;
        }
    },3,macro.REPEAT_FOREVER)
    }

    update(deltaTime: number) {
        
        if(this.tileCount > this.changerCount){
            this.canGenrateChanger = true;
        }else{
            this.canGenrateChanger = false;
        }
        if(this.canGenerate){
           this.counter++
            if( this.counter%this.timer === 0){
            this.generateTile()
            this.counter = 0; 
            }

    }
}

    generateTile(){
        if(this.canGenerate){
            this.tileCount++;
            var generatedTile:Node;
            if(this.canGenrateChanger)
            {
                generatedTile = instantiate(this.changer)
                this.changerCount = 20
                this.tileCount = 0;
                this.tileTypeTest++;
                if(this.tileTypeTest > 2){
                    this.tileTypeTest = 0;
                }
                switch (this.tileTypeTest) {
                    case 0:
                        this.activateTileType(Tile_Type.single)
                        break;
                    case 1:
                        this.activateTileType(Tile_Type.double)
                        break;
                    case 2:
                        this.activateTileType(Tile_Type.triple)
                        break;
                    default:
                        break;
                }
            }
            else
            {
                generatedTile = instantiate(this.tile)
            }
            
            this.node.addChild(generatedTile);
            if(this.canGenrateChanger)
            {  //For BigTile
                generatedTile.setPosition(new Vec3(0,0,this.zPos))
            }
            else
            {  //For Normal Tile
                var randomPos = this.getXpos()
                
                if(this.tile_Type != Tile_Type.single){    // Check for Double or Triple Tile
                    randomPos = 0;
                }
                if(this.tile_Type == Tile_Type.double){
                generatedTile.getComponent(SpawnTile).tile_Type = Tile_Type.double
                }
                else if(this.tile_Type == Tile_Type.triple){
                generatedTile.getComponent(SpawnTile).tile_Type = Tile_Type.triple
                }
                else{
                generatedTile.getComponent(SpawnTile).tile_Type = Tile_Type.single
                }

                generatedTile.setPosition(new Vec3(randomPos,0,this.zPos))
            }
            
            

            generatedTile.getComponent(SpawnTile).matIndex = this.bgMat-1;
            generatedTile.getComponent(SpawnTile).spawnTile()

        }

    }

    getInterval(){
        const list = [0.3 , 0.5 , 0.6];
        var random = randomRangeInt(0,list.length);
        var numberOfTile = this.getNumberOfTiles(random);
        return [list[random],numberOfTile];
    }
    getNumberOfTiles(index:number){
        const list = [3 , 2 , 1];
     return list[index];
    }
    getXpos(){
        const pos = [-1 , 0 , 1];
        const randomPos = randomRangeInt(0,pos.length);
        return pos[randomPos];
    }

    prepareAfterGameOver(){
        this.node.removeAllChildren();
        const pos = [0, 3.7 , 8 , 12 , 15 , 18]
        for (let i = 0; i < pos.length; i++) {
            const element = pos[i];
            var generatedTile = instantiate(this.tile)
            generatedTile.parent = this.node;
            generatedTile.setPosition(new Vec3(0,0,element))
            generatedTile.getComponent(SpawnTile).matIndex = this.bgMat-1;
        }
    }

    activateTileType(type:Tile_Type){
        this.tile_Type = type;
    }
}


