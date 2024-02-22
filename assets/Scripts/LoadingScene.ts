import { _decorator, assetManager, Component, Director, director, Label, Node, ProgressBar, SceneAsset } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LoadingScene')
export class LoadingScene extends Component {

    @property(ProgressBar)
    loading:ProgressBar;
    @property(Label)
    progressLable:Label;

    static progressString:number = 0;
    start() {
    this.loadScene()
    }

    update(deltaTime: number) {
        this.progressLable.string = LoadingScene.progressString +"%"
        this.loading.progress = LoadingScene.progressString/100;
    }

    loadScene(){
        director.preloadScene('scene' ,function(completedCount , totalCount){
            var percent = 0;
            if (totalCount > 0) 
            {
                percent = 100 * completedCount / totalCount;
            }
            LoadingScene.progressString = Math.round(percent);        
        }, function(){
            director.loadScene('scene')
        } )
        
        
    }
    
}


