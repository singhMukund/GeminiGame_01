import { _decorator, Component, Node } from 'cc';
import { GameManager } from '../GameManager';
const { ccclass, property } = _decorator;

@ccclass('GameOverButtons')
export class GameOverButtons extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    OnHome(){

    }

    OnPlayAgain(){
        GameManager.instance.gameOverStop();
    }
}


