import { _decorator, Component, instantiate, macro, Node, Prefab, randomRangeInt, Scheduler, Vec3 } from 'cc';
import { SpawnTile } from './SpawnTile';
const { ccclass, property } = _decorator;

@ccclass('TileGenerator')
export class TileGenerator extends Component {


    @property(Prefab)
    tile:Prefab = null;
    @property
    canGenerate:boolean = false;
    @property(Prefab)
    changer:Prefab = null;

    tileCount:number =0;
    changerCount:number = 20;
    canGenrateChanger:boolean = false;

    counter:number =0;
    timer:number = 30;

    
    start() {
        var num =0;
    this.schedule((dt)=>{
        var ar = [25 ,20,20, 35  ,40 ];
        this.timer = ar[num];

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
            var generatedTile;
            if(this.canGenrateChanger){
                generatedTile = instantiate(this.changer)
                this.changerCount = 20
                this.tileCount = 0;
            }else{
                generatedTile = instantiate(this.tile)
            }
            
            generatedTile.parent = this.node;
            if(this.canGenrateChanger){
                generatedTile.setPosition(new Vec3(0,0,10))
            }else{
                var randomPos = this.getXpos()
                generatedTile.setPosition(new Vec3(randomPos,0,10))
            }
            var xpos = 0;
            // if(randomPos < 0){
            //     xpos = -0.01
            // }else{
            //     xpos = 0.01
            // }

            // if(this.canGenrateChanger){
            //     xpos = 0
            // }
            generatedTile.getComponent(SpawnTile).xPos = xpos
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
        const pos = [-2 , -1 , 0 , 2 , 1];
        const randomPos = randomRangeInt(0,pos.length);
        return pos[randomPos];
    }
}


