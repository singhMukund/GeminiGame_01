import { _decorator, Animation, Component, Node, SystemEvent, Vec2, Vec3 } from 'cc';
import { TileGenerator } from './TileGenerator';
const { ccclass, property } = _decorator;

@ccclass('SpawnTile')
export class SpawnTile extends Component {

    @property
    speed:number =0.1;
    @property
    canRun:boolean = false;
    @property
    xPos:number =0;

    start() {
        this.canRun = this.node.getParent().getComponent(TileGenerator).canGenerate
    }

    update(deltaTime: number) {
    if(this.canRun){
        this.node.translate(new Vec3(this.xPos,0,-this.speed))
    }else{
        this.canRun = this.node.getParent().getComponent(TileGenerator).canGenerate
    }
    if(this.node.position.z < -15){
       this.deleteTile()
    }
    }
    spawnTile(){
    this.node.getComponent(Animation).play();
    }
    deleteTile(){
        this.node.destroy();
    }
}


