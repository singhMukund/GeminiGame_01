import { _decorator, Color, Component, MeshRenderer, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ChangeBGColor')
export class ChangeBGColor extends Component {

    initalColor:Color;
    start() {
        this.initalColor = Color.WHITE;
        var m = this.node.getComponent(MeshRenderer).getRenderMaterial(0);
        m.setProperty('maincolor' ,new Color(this.initalColor.r, this.initalColor.g,this.initalColor.b,0),0);
    this.changeBackground(Color.BLUE,2)
    }

    update(deltaTime: number) {
        
    }
    changeBackground(fromColor:Color , time:number){
        var number =0;
        
    // this.schedule(()=>{
    //    number=number+1;
    //    //var outColor = Color.WHITE;
    //    //Color.lerp(outColor ,this.initalColor , fromColor , number/10);
       
    //    if(number == 10){
    //     this.initalColor = fromColor;
    //    }
    // },time/10,10)
    
    }
}


