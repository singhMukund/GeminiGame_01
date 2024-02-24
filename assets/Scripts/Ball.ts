import { _decorator, Component, director, Game, Layers, Material, Node, RigidBody, Scene, SphereCollider, Vec3 } from 'cc';
import { SpawnTile } from './SpawnTile';
import { BackgroundManager } from './BackgroundManager';
import { GameManager } from './GameManager';
const { ccclass, property } = _decorator;

@ccclass('Ball')
export class Ball extends Component {
     
    @property
    fallingSpeed:number = 12;
    @property
    upSpeed:number = 7;
    @property(BackgroundManager)
    bgManager:BackgroundManager;

    
    start() {
        this.node.getComponent(SphereCollider).on('onCollisionEnter' , this.OnCollide , this)
        this.node.getComponent(SphereCollider).on('onTriggerEnter' , this.OnTriggerEnter , this)
    }

    update(deltaTime: number) {
        this.node.setPosition(new Vec3(this.node.getPosition().x ,this.node.getPosition().y , 0 ))
        
    }
    
    OnCollide(target:any){ //It contains OtherCollider , SelfCollider
        
        if(target.otherCollider.node.layer == 1){  //Floor Layer
            var sphere = target.selfCollider.node as Node
            var tile = target.otherCollider.node.parent as Node;
            tile.getComponent(SpawnTile).Oncollide();
            sphere.getComponent(RigidBody).setLinearVelocity(new Vec3(0, this.upSpeed, 0))      
        }

        if(target.otherCollider.node.layer == 8){ //BigTile Layer
            var sphere = target.selfCollider.node as Node
            sphere.getComponent(RigidBody).setLinearVelocity(new Vec3(0, this.upSpeed, 0))
            this.bgManager.checkBG(GameManager.instance.bgChangeTime)
        }
        
    
    }
    OnTriggerEnter(target:any){ //It contains OtherCollider , SelfCollider
        target.otherCollider.enabled = false;
        if(target.otherCollider.node.layer == 2){//Find Layer
        var sphere = target.selfCollider.node as Node
        sphere.getComponent(RigidBody).setLinearVelocity(new Vec3(0, -this.fallingSpeed, 0))
        }
    
    }
}


