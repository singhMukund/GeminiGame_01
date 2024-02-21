import { _decorator, AudioSource, AudioSourceComponent, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SoundManager')
export class SoundManager extends Component {

    audio:AudioContext = null;

    start() {

    }

    update(deltaTime: number) {
        
    }

    playAudio(){
        if(!this.node.getComponent(AudioSource).playing){
            this.node.getComponent(AudioSource).play();
        }
    }

    getAudio(){
        return this.node.getComponent(AudioSource)
    }



    getAudioBeats(){

    }
}


