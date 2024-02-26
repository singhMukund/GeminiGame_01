import { _decorator, Animation, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Star')
export class Star extends Component {

    @property(Node)
    star:Node;
    start() {

    }

    update(deltaTime: number) {
        
    }

    animateStar()
    {
        this.star.active = true;
        this.star.getComponent(Animation).play();
    }

    stopStar()
    {
        this.star.getComponent(Animation).stop();
        this.star.active = false;
        
    }
}


