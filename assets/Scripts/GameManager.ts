import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    @property(Node)
    ball:Node =null;
    start() {

    }

    update(deltaTime: number) {
        if(this.ball.position.y < -4){
            director.loadScene('scene')
        }
    }
}


