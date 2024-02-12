import { _decorator, Component, instantiate, macro, Node, Prefab, randomRangeInt, Vec3 } from 'cc';
import { SpawnTile } from './SpawnTile';
const { ccclass, property } = _decorator;

@ccclass('TileGenerator')
export class TileGenerator extends Component {


    @property(Prefab)
    tile:Prefab = null;
    
    start() {
    this.schedule(this.generateTile ,1,macro.REPEAT_FOREVER,1)
    }

    update(deltaTime: number) {
        
    }

    generateTile(){
    var generatedTile = instantiate(this.tile)
    generatedTile.parent = this.node;
    var randomPos = randomRangeInt(-3 , 3)
    generatedTile.setPosition(new Vec3(randomPos,0,10))
    generatedTile.getComponent(SpawnTile).spawnTile()
    }
}


