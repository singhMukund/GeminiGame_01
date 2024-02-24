import { _decorator, Component, director, Node } from 'cc';
import { TileGenerator } from './TileGenerator';
import { BackgroundManager } from './BackgroundManager';
import { SpawnTile } from './SpawnTile';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    @property(Node)
    ball:Node =null;

    @property(TileGenerator)
    tileGenerator:TileGenerator;

    @property
    bgChangeTime:number = 2;

    static instance:GameManager = null;
    start() {
        GameManager.instance = this;
    }

    update(deltaTime: number) {
        if(this.ball.position.y < -4){
            director.loadScene('scene')
        }
    }

    changeTileMat(){
        var childs = this.tileGenerator.node.children;
        for (let i = 0; i < childs.length; i++) {
            const element = childs[i];
            element.getComponent(SpawnTile).matIndex = this.tileGenerator.bgMat - 1;
            element.getComponent(SpawnTile).changeMat();
        }
    }
}


