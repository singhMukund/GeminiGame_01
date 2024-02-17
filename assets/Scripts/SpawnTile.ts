import { _decorator, Animation, Component, Node, physics, randomRange, randomRangeInt, RigidBody, SystemEvent, Vec2, Vec3 } from 'cc';
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

    @property([RigidBody])
    rightpicecs:RigidBody[]=[]

    @property([RigidBody])
    leftpicecs:RigidBody[]=[]

    start() {
        this.canRun = this.node.getParent().getComponent(TileGenerator).canGenerate
    }

    update(deltaTime: number) {
        if(this.canRun){
            this.node.translate(new Vec3(0,0,-this.speed))
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

    Oncollide(){
        if(this.canRun){
            for (var i = 0; i < this.rightpicecs.length; i++) {
                var element = this.rightpicecs[i];
                element.type = physics.ERigidBodyType.DYNAMIC
                element.setLinearVelocity(new Vec3(-3 , randomRangeInt(0,4) , randomRange(-3,3) ) )
            }
            for (var i = 0; i < this.leftpicecs.length; i++) {
                var element = this.leftpicecs[i];
                element.type = physics.ERigidBodyType.DYNAMIC
                element.setLinearVelocity(new Vec3(3 , randomRangeInt(0,4) , randomRange(-3,3) ) )
            }
        }   
    }
}


