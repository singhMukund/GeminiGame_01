import { _decorator, Component, macro, Node, ParticleSystem, Scheduler } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ParticalsManager')
export class ParticalsManager extends Component {

    @property(ParticleSystem)
    particals1:ParticleSystem
    @property(ParticleSystem)
    particals2:ParticleSystem

    start() {
    
    }

    update(deltaTime: number) {
        
    }
    playPaticals(){
        this.particals1.play();
        this.particals2.play();
    }
}