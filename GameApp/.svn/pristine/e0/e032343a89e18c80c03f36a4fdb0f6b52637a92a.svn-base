import Card from "../view/Card";
import CardGroupController from "./CardGroupController";
import FlyChip from "../view/FlyChip";
import CardDealerController from "./CardDealerController";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TestController extends cc.Component {

    @property(Card)
    card: Card = null;

    @property(CardGroupController)
    cardGroup: CardGroupController = null;

    @property(CardDealerController)
    cardDealer: CardDealerController = null;

    @property(cc.Button)
    button: cc.Button = null;

    @property(cc.Sprite)
    sprite: cc.Sprite = null;

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var self = this;
        this.scrollView.node.on(cc.Node.EventType.TOUCH_END, function(event: cc.Event.EventTouch) {
            console.log("sprite click");
            var touchPos = event.getLocation();
            // console.log(touchPos);
            self.card.node.emit("sprite-touch", touchPos)
        }, this);

        this.card.node.on(cc.Node.EventType.TOUCH_END, function(event) {
            console.log("card click");
        }, this)

        // this.card.node.on("sprite-touch", function(event) {
        //     console.log("card click");
        // }, this)

        this.card.node.on("sprite-touch", function(pos) {
            console.log("on sprite touch");
            console.log(pos);
            if (self.card.node.getBoundingBoxToWorld().contains(pos)) {
                console.log("card click");
            } else {

            }
        })
    }

    // public emit(type: string, dst: cc.Node, event: cc.Event.EventTouch) {
    //     if (!dst.hasEventListener(type)) {
    //         dst.on(type, function(pos) {
    //             console.log(type);
    //             if (dst.getBoundingBoxToWorld().contains(pos)) {
    //                 dst.emit(cc.Node.EventType.TOUCH_END, event);
    //             }
    //         }, dst);
    //     }

    //     dst.emit(type, event);
    // }

    start () {

        //this.testCardGroup();

        //this.testWorldSpace();

        // this.testSendCards();

        // var self = this;
        // this.button.node.on("click", function() {
        //     self.cardGroup.flopCards("123aF", null);
        // }, this);
    }

    

    public testSendCards () {
        var interval = 0.1;
        var repeat = 4;
        var delay = 1;
        var self = this;
        this.schedule(function (){
            var card = self.cardDealer.drawCard();
            // self.cardGroup.obtainCard(card);
        }, interval, repeat, delay)
    }

    public testCardGroup () {
        for (var i = 0; i < 5; i++) {
            let card = cc.instantiate(this.card.node) as cc.Node;
            this.node.addChild(card);
            // this.cardGroup.obtainCard(card.getComponent(Card));
        }
    }

    // update (dt) {}

    public testWorldSpace() {
        let self = this;
        // step2. load prefab 
        cc.loader.loadRes("prefabs/FlyChip", cc.Prefab, function(err, prefab){
            if (err) {
                // todo...
                console.log("load perfab [FlyChip] error!");
            } else {
                // clone prefab
                let flyChip = cc.instantiate(prefab) as cc.Node;
                flyChip.getComponent(FlyChip).setChip(1000);
                
                var worldPosition = self.getRandomHeaderWorldPosition();
                flyChip.setPosition(worldPosition);
            }
        });
    }

    private getRandomHeaderWorldPosition(): cc.Vec2 {
        return this.node.convertToWorldSpaceAR(this.card.node.position);
    }
}
