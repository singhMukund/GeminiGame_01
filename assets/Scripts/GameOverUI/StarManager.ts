import { _decorator, Component, Node } from 'cc';
import { Star } from './Star';
const { ccclass, property } = _decorator;

@ccclass('StarManager')
export class StarManager extends Component {


    @property([Star])
    stars:Star[] = [];

    start() {

    }

    update(deltaTime: number) {
        
    }

    animateStars(index:number)
    {
        if(index > this.stars.length){
            index = this.stars.length;
        }
        var count = 0;

        this.schedule(()=>{
            this.stars[count].getComponent(Star).animateStar()
            count++;
        },0.5,index - 1,1)
    }

    stopAnimateStars()
    {
        for (let i = 0; i < this.stars.length; i++) {
            this.stars[i].star.active = false;  
        }
    }
}


