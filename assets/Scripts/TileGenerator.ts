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
    changerCount:number = 5;
    canGenrateChanger:boolean = false;
    
    start() {
    this.schedule(this.generateTile ,0.8,macro.REPEAT_FOREVER,1)
    }

    update(deltaTime: number) {
        if(this.tileCount > this.changerCount){
            this.canGenrateChanger = true;
        }else{
            this.canGenrateChanger = false;
        }
    }

    generateTile(){
        if(this.canGenerate){
            this.tileCount++;
            var generatedTile;
            if(this.canGenrateChanger){
                generatedTile = instantiate(this.changer)
                this.changerCount += 20
            }else{
                generatedTile = instantiate(this.tile)
            }
            
            generatedTile.parent = this.node;
            if(this.canGenrateChanger){
                generatedTile.setPosition(new Vec3(0,0,10))
            }else{
                var randomPos = randomRangeInt(-2 , 2)
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
}


