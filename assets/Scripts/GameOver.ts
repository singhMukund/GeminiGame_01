import { _decorator, Component, Label, Node } from 'cc';
import { StarManager } from './GameOverUI/StarManager';
const { ccclass, property } = _decorator;

@ccclass('GameOver')
export class GameOver extends Component {


    @property(Node)
    tileManager:Node;

    @property(Node)
    ball:Node;

    @property(StarManager)
    starManager:StarManager;

    @property(Label)
    score:Label;

    @property(Node)
    canvas:Node

    start() {
        //this.starManager.animateStars(3);
    }

    update(deltaTime: number) {
        
    }
    OnGameOverStart(){
        this.tileManager.active = false;
        this.ball.active = false;
        this.canvas.active = true

        this.starManager.animateStars(2);
    }

    OnGameOverStop(){
        this.starManager.stopAnimateStars();
        this.tileManager.active = true;
        this.ball.active = true;
        this.canvas.active = false;
    }
}


