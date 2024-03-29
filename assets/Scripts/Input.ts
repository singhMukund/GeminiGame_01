import { _decorator, BoxCollider, Camera, Component, EventTouch, input, Layers, Node, RigidBody, SphereCollider, System, SystemEvent, systemEvent, Vec2, Vec3 } from 'cc';
import { TileGenerator } from './TileGenerator';
import { SoundManager } from './SoundManager';
const { ccclass, property } = _decorator;

@ccclass('Input')
export class Input extends Component {

    @property
    floor:Layers = 0;
    @property
    character:Node
    @property
    speed:number=0.1;
    @property(TileGenerator)
    tilemangager:TileGenerator;
    @property(SoundManager)
    soundManager:SoundManager;
    @property(Camera)
    mainCamera:Camera;
    
    
    start() {
        systemEvent.on(SystemEvent.EventType.TOUCH_MOVE , this.onTouch , this)
    }

    update(deltaTime: number) {
        // var pos =  Vec3.ZERO;
        // Vec3.lerp(pos , this.character.getPosition() , this.mainCamera.node.getPosition() , deltaTime)
        // this.mainCamera.node.setPosition(pos)
    }

    onTouch(touch:any){
        this.tilemangager.canGenerate = true;
        this.soundManager.playAudio();
        var nextPos = touch.getDelta().x as number
        if(this.node.position.x > 1.5){
            if(nextPos < 0){
                nextPos = 0; 
             }
        }
        if(this.node.position.x < -1.5){
            if(nextPos > 0){
                nextPos = 0; 
             }
        }
        this.node.translate(new Vec3(-(nextPos/this.speed),0,0))
    }
}


