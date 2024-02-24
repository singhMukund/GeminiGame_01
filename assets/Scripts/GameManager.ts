import { _decorator, Component, director, Node, physics, RigidBody, Vec2, Vec3 } from 'cc';
import { TileGenerator } from './TileGenerator';
import { BackgroundManager } from './BackgroundManager';
import { SpawnTile } from './SpawnTile';
import { GameOver } from './GameOver';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    @property(Node)
    ball:Node =null;

    @property(TileGenerator)
    tileGenerator:TileGenerator;

    @property
    bgChangeTime:number = 2;

    @property(GameOver)
    gameOverManager:GameOver;

    static instance:GameManager = null;
    gameOver:Boolean = false;

    start() {
        this.gameOver = false;
        GameManager.instance = this;
    }

    update(deltaTime: number) {
        if(this.ball.position.y < -4){
            this.gameOverStart();
            //director.loadScene('scene')
        }
    }

    changeTileMat(){
        var childs = this.tileGenerator.node.children;
        for (let i = 0; i < childs.length; i++) {
            const element = childs[i];
            element.getComponent(SpawnTile).matIndex = this.tileGenerator.bgMat - 1;
            element.getComponent(SpawnTile).changeMat();
        }
    }

    gameOverStart(){
        this.gameOver = true;
        this.tileGenerator.canGenerate = false;
        this.gameOverManager.OnGameOverStart();
        this.ball.setPosition(new Vec3(0,0,0));
        this.ball.getComponent(RigidBody).type = physics.ERigidBodyType.KINEMATIC;
    }

    gameOverStop(){
        this.gameOver = false;
        this.gameOverManager.OnGameOverStop()
        this.ball.setPosition(new Vec3(0,0,0));
        this.ball.parent.setPosition(new Vec3(0,2,1))
        this.tileGenerator.prepareAfterGameOver();
        this.ball.getComponent(RigidBody).type = physics.ERigidBodyType.DYNAMIC;
    }
}


