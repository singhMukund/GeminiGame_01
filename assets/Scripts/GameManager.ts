import { _decorator, Component, director, Node } from 'cc';
import { TileGenerator } from './TileGenerator';
import { BackgroundManager } from './BackgroundManager';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    @property(Node)
    ball:Node =null;

    @property(TileGenerator)
    tileGenerator:TileGenerator;
    
    @property(BackgroundManager)
    backgroundManager:BackgroundManager;

    static instance:GameManager = null;
    start() {
        GameManager.instance = this;
    }

    update(deltaTime: number) {
        if(this.ball.position.y < -4){
            director.loadScene('scene')
        }
    }
}


