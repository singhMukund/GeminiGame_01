import { _decorator, Component, Node, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SpawnTile')
export class SpawnTile extends Component {

    @property
    speed:number =0.1;

    start() {

    }

    update(deltaTime: number) {
    //var initalPos = this.node.getPosition()
    this.node.translate(new Vec3(0,0,-1*this.speed))
    }
}


