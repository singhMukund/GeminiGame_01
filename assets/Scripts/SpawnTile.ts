import { _decorator, Animation, BoxCollider, Component, Layers, Material, MeshRenderer, Node, physics, randomRange, randomRangeInt, RigidBody, SystemEvent, Vec2, Vec3 } from 'cc';
import { TileGenerator } from './TileGenerator';
const { ccclass, property } = _decorator;

enum Tile_Type{single , double , triple}
enum Activated_Tile{left, centre, right}
@ccclass('SpawnTile')
export class SpawnTile extends Component {

    @property
    speed:number =0.1;
    @property
    canRun:boolean = false;
    @property
    xPos:number =0;

    @property(MeshRenderer)
    base:MeshRenderer;

    @property([RigidBody])
    rightpicecs:RigidBody[]=[]

    @property([RigidBody])
    leftpicecs:RigidBody[]=[]


    @property([Material])
    tile_Mat:Material[]=[]

    @property([Material])
    tile_Pressed_Mat:Material[]=[]

    @property([Material])
    tile_Empty_Mat:Material[]=[]

    public matIndex:number = 0;

    @property
    bigTile:Boolean = true;

    tile_Type:Tile_Type = Tile_Type.single;

    @property(Node)
    leftTile:Node;

    @property(Node)
    rightTile:Node;

    @property(Material)
    disableTileBorder:Material;

    @property(Material)
    activeTileBorder:Material;

    @property(MeshRenderer)
    centreBorder:MeshRenderer;

    @property(MeshRenderer)
    leftBorder:MeshRenderer;

    @property(MeshRenderer)
    rightBorder:MeshRenderer;

    activatedTile:Activated_Tile = Activated_Tile.centre;

    start() {
        this.canRun = this.node.getParent().getComponent(TileGenerator).canGenerate
    }

    update(deltaTime: number) {
        if(this.canRun){
            this.node.translate(new Vec3(0,0,-this.speed))
        }else{
            this.canRun = this.node.getParent().getComponent(TileGenerator).canGenerate
        }
        if(this.node.position.z < -15){
           this.deleteTile()
        }
    }

    spawnTile(){
        this.node.getComponent(Animation).play();
        this.checkForTileType();
        this.changeMat()
    }

    deleteTile(){
        this.node.destroy();
    }

    Oncollide(){
        if(this.canRun){
            // for (var i = 0; i < this.rightpicecs.length; i++) {
            //     var element = this.rightpicecs[i];
            //     element.type = physics.ERigidBodyType.DYNAMIC
            //     element.setLinearVelocity(new Vec3(-3 , randomRangeInt(0,4) , randomRange(-3,3) ) )
            // }
            // for (var i = 0; i < this.leftpicecs.length; i++) {
            //     var element = this.leftpicecs[i];
            //     element.type = physics.ERigidBodyType.DYNAMIC
            //     element.setLinearVelocity(new Vec3(3 , randomRangeInt(0,4) , randomRange(-3,3) ) )
            // }
            this.base.setSharedMaterial(this.tile_Pressed_Mat[this.matIndex],0); 
            
        }   
    }
    changeMat(){
        if(!this.bigTile)
        {
            //this.base.setSharedMaterial(this.tile_Mat[this.matIndex],0);
            
            switch (this.activatedTile) {
                case Activated_Tile.left:
                    this.leftTile.getComponent(MeshRenderer).setSharedMaterial(this.tile_Mat[this.matIndex] ,0)
                    this.rightTile.getComponent(MeshRenderer).setSharedMaterial(this.tile_Empty_Mat[this.matIndex] ,0)
                    this.base.setSharedMaterial(this.tile_Empty_Mat[this.matIndex] ,0)
                    this.leftBorder.setSharedMaterial(this.activeTileBorder ,0);
                    this.rightBorder.setSharedMaterial(this.disableTileBorder ,0);
                    this.centreBorder.getComponent(MeshRenderer).setSharedMaterial(this.disableTileBorder ,0);
                    break;
                case Activated_Tile.right:
                    this.leftTile.getComponent(MeshRenderer).setSharedMaterial(this.tile_Empty_Mat[this.matIndex] ,0)
                    this.rightTile.getComponent(MeshRenderer).setSharedMaterial(this.tile_Mat[this.matIndex] ,0)
                    this.base.setSharedMaterial(this.tile_Empty_Mat[this.matIndex] ,0)
                    this.leftBorder.setSharedMaterial(this.disableTileBorder ,0);
                    this.rightBorder.setSharedMaterial(this.activeTileBorder ,0);
                    this.centreBorder.getComponent(MeshRenderer).setSharedMaterial(this.disableTileBorder ,0);
                    break;
                case Activated_Tile.centre:
                    this.leftTile.getComponent(MeshRenderer).setSharedMaterial(this.tile_Empty_Mat[this.matIndex] ,0)
                    this.rightTile.getComponent(MeshRenderer).setSharedMaterial(this.tile_Empty_Mat[this.matIndex] ,0)
                    this.base.setSharedMaterial(this.tile_Mat[this.matIndex] ,0)
                    this.leftBorder.setSharedMaterial(this.disableTileBorder ,0);
                    this.rightBorder.setSharedMaterial(this.disableTileBorder ,0);
                    this.centreBorder.getComponent(MeshRenderer).setSharedMaterial(this.activeTileBorder ,0);
                    break;
            
                default:
                    break;
            }
        }else{
            this.base.setSharedMaterial(this.tile_Mat[this.matIndex] ,0)
        }
        
    }

    checkForTileType(){
        switch (this.tile_Type) {
            case Tile_Type.double:
                this.activateForDoubleType()
                
                break;
            case Tile_Type.triple:
                this.activateForTripleType();
                break;
        
            default:
                break;
        }
    }

    activateForDoubleType(){
        var random = randomRange(-1,1)

        if(random < 0){  //right
            this.rightTile.active = true;
            this.rightBorder.node.active = true;

        }else{ //left
            this.leftTile.active = true;
            this.leftBorder.node.active = true;
        }
        
        var random2 = randomRange(-1,1)
        if(random2 < 0){  // centreActive
            this.activatedTile = Activated_Tile.centre

            this.base.node.layer = Layers.nameToLayer("Floor");
            this.leftTile.layer = Layers.nameToLayer("DeadTile");
            this.rightTile.layer = Layers.nameToLayer("DeadTile");

            this.rightTile.parent.getComponent(BoxCollider).isTrigger = true;
            this.leftTile.parent.getComponent(BoxCollider).isTrigger = true;
            this.base.node.parent.getComponent(BoxCollider).isTrigger = false;
            
        }else{ //For Right And Left
            if(random < 0){ //For Right
                this.activatedTile = Activated_Tile.right

                this.base.node.layer = Layers.nameToLayer("DeadTile");
                this.leftTile.layer = Layers.nameToLayer("DeadTile");
                this.rightTile.layer = Layers.nameToLayer("Floor");

                this.rightTile.parent.getComponent(BoxCollider).isTrigger = false;
                this.leftTile.parent.getComponent(BoxCollider).isTrigger = true;
                this.base.node.parent.getComponent(BoxCollider).isTrigger = true;
            }else{  //For Left
                this.activatedTile = Activated_Tile.left

                this.base.node.layer = Layers.nameToLayer("DeadTile");
                this.leftTile.layer = Layers.nameToLayer("Floor");
                this.rightTile.layer = Layers.nameToLayer("DeadTile");

                this.leftTile.parent.getComponent(BoxCollider).isTrigger = false;
                this.rightTile.parent.getComponent(BoxCollider).isTrigger = true;
                this.leftTile.parent.getComponent(BoxCollider).isTrigger = true;

            }
        }
    }

    activateForTripleType(){
        this.leftTile.active = true;
        this.rightTile.active = true;
        this.leftBorder.node.active = true;
        this.rightBorder.node.active = true;
        var random = randomRangeInt(-1,1)

        //Layer = Floor() For Activated Tile
        //Layer = DeadTile() for Dead Tile

        if(random  == 0)  //Centre
        {      
            this.activatedTile = Activated_Tile.centre;
            this.base.node.layer = Layers.nameToLayer("Floor");
            this.leftTile.layer = Layers.nameToLayer("DeadTile");
            this.rightTile.layer = Layers.nameToLayer("DeadTile");

            this.base.node.parent.getComponent(BoxCollider).isTrigger = false;
            this.leftTile.parent.getComponent(BoxCollider).isTrigger = true;
            this.rightTile.parent.getComponent(BoxCollider).isTrigger = true;
        }
        else if(random == -1)  //Right
        {
            this.activatedTile = Activated_Tile.right;
            this.base.node.layer = Layers.nameToLayer("DeadTile");
            this.leftTile.layer = Layers.nameToLayer("DeadTile");
            this.rightTile.layer = Layers.nameToLayer("Floor");

            this.base.node.parent.getComponent(BoxCollider).isTrigger = true;
            this.leftTile.parent.getComponent(BoxCollider).isTrigger = true;
            this.rightTile.parent.getComponent(BoxCollider).isTrigger = false;
        }
        else  //Left
        {                 
            this.activatedTile = Activated_Tile.left;
            this.base.node.layer = Layers.nameToLayer("DeadTile");
            this.leftTile.layer = Layers.nameToLayer("Floor");
            this.rightTile.layer = Layers.nameToLayer("DeadTile");

            this.base.node.parent.getComponent(BoxCollider).isTrigger = true;
            this.rightTile.parent.getComponent(BoxCollider).isTrigger = true;
            this.leftTile.parent.getComponent(BoxCollider).isTrigger = false;
        }
    }

    fallDownTile(){

    }
    
}


