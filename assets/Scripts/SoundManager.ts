import { _decorator, AudioSource, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SoundManager')
export class SoundManager extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    playAudio(){
        if(!this.node.getComponent(AudioSource).playing){
            this.node.getComponent(AudioSource).play();
        }
    }
}


