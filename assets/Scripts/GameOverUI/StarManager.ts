import { _decorator, Component, Node, Scheduler } from 'cc';
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
        },0.5,index - 1,0.5)
    }

    stopAnimateStars()
    {
        this.unscheduleAllCallbacks()
        for (let i = 0; i < this.stars.length; i++) {

            this.stars[i].stopStar()
        }
    }
}


