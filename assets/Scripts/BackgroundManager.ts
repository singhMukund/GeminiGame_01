import { _decorator, AudioSource, Color, Component, Material, MeshRenderer, Node, renderer, Scheduler, SpriteRenderer } from 'cc';
const { ccclass, property } = _decorator;
enum  effect{fadein , fadeout};
@ccclass('BackgroundManager')
export class BackgroundManager extends Component {


    @property(MeshRenderer)
    bg1:MeshRenderer
    @property(MeshRenderer)
    bg2:MeshRenderer

    @property(MeshRenderer)
    floor:MeshRenderer

    @property([Material])
    floor_Mat:Material[] = [];

    @property([Material])
    Bg_Mat:Material[] = [];

    activeBg:number =1;
    

    start() {
        //this.scheduleOnce(this.setbgDefault ,2)
        //this.scheduleOnce(this.setbg1Material ,4)
        // this.schedule((dt)=>{
        
        // },0.1,10,0)
        // this.scheduleOnce((dt)=>{
        // },0)
        this.bg1.getComponent(MeshRenderer).getRenderMaterial(0).setProperty("albedo" , new Color(255,0,0,255) ,0)
        this.bg2.getComponent(MeshRenderer).getRenderMaterial(0).setProperty("albedo" , new Color(255,0,0,255) ,0)
    }

    update(deltaTime: number) {
       
    }

    checkBG(sec:number){
        switch (this.activeBg) {
            case 1:
                this.activeBg = 2;
                this.changeBG(effect.fadeout , sec)
                break;
            case 2:
                this.activeBg = 1;
                this.changeBG(effect.fadein , sec);
                break;
        
            default:
                break;
        }
        console.log("Active BG "+this.activeBg);

    }

    changeBG(eff:effect , sec:number){
        var repeat = sec*10;
        var interval = sec/repeat;
        var count = 0;
        
        if(eff == effect.fadein){ //0 to 255  else //255 to 0
            count = repeat+1;
        }

        this.schedule(()=>{
            var calculateAlpha;
            if(eff == effect.fadein){
                count = count - 1;
                calculateAlpha = 255 - (255/repeat)*count;
                if(calculateAlpha > 255){
                    calculateAlpha = 255
                }                
            }else{
                count = count + 1;
                calculateAlpha = 255 - ((255/repeat)*count);
                if(calculateAlpha < 0){
                    calculateAlpha = 0
                }
            }
            this.bg1.getComponent(MeshRenderer).getRenderMaterial(0).setProperty("albedo" , new Color(255,0,0,calculateAlpha) ,0)
        } , interval , repeat ,0)
    } 
}


