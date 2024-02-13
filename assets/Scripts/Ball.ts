import { _decorator, Component, Node, RigidBody, SphereCollider, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Ball')
export class Ball extends Component {
    start() {
        this.node.getComponent(SphereCollider).on('onCollisionEnter' , this.OnCollide)
        this.node.getComponent(SphereCollider).on('onTriggerEnter' , this.OnTriggerEnter) 
    }

    update(deltaTime: number) {
        this.node.setPosition(new Vec3(this.node.getPosition().x ,this.node.getPosition().y , 0 ))
    }
    
    OnCollide(target:any){ //It contains OtherCollider , SelfCollider
        
        if(target.otherCollider.node.layer == 1){//Floor Layer
        var sphere = target.selfCollider.node as Node
        
        sphere.getComponent(RigidBody).setLinearVelocity(new Vec3(0, 7, 0))
        }
    
    }
    OnTriggerEnter(target:any){ //It contains OtherCollider , SelfCollider
        target.otherCollider.enabled = false;
        if(target.otherCollider.node.layer == 2){//Find Layer
        var sphere = target.selfCollider.node as Node
        sphere.getComponent(RigidBody).setLinearVelocity(new Vec3(0, -10, 0))
        }
    
    }
}


