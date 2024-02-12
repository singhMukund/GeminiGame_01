import { _decorator, BoxCollider, Component, EventTouch, input, Layers, Node, RigidBody, SphereCollider, System, SystemEvent, systemEvent, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Input')
export class Input extends Component {

    @property
    floor:Layers = 0;
    @property
    character:Node
    @property
    speed:number=0.1;
    
    

    start() {
    
    }

    update(deltaTime: number) {
        if(input.getTouchCount() > 0){
            var touch = input.getTouch(0);
            var x = new Vec2();
            var y = new Vec2();
            
            console.log("TOuch "+touch.getStartLocation().x+" Y "+touch.getLocationX());

            if(touch.getLocationX() != touch.getStartLocation().x){
               if(touch.getLocationX() > touch.getStartLocation().x){
                if(this.node.getPosition().x > -4){
                    this.node.translate(new Vec3(-this.speed*deltaTime,0,0))
                }
                
               }else{
                if(this.node.getPosition().x < 4){
                    this.node.translate(new Vec3(this.speed*deltaTime,0,0))
                }
                
               }
            }
        }
    }


    onTouch(touch:any){
    console.log("touch "+touch._prevPoint , "  "+touch._startPoint);
    if(touch._prevPoint > touch._startPoint){  ///right Swipe
        if(this.node.position.x > -4){
            var newPos = this.node.getPosition() 
            this.node.translate(new Vec3(-0.1,0,0))
        }
        
    }else{
        if(this.node.position.x < 4){
            var newPos = this.node.getPosition() 
            this.node.translate(new Vec3(0.1,0,0))
        }
    }
    }
}


