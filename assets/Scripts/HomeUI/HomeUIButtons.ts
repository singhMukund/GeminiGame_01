import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('HomeUIButtons')
export class HomeUIButtons extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    OnPlayGame(){
        director.loadScene('scene')
    }
}


