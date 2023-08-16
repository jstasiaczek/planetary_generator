import Entity from "../../engine/entity";
import Sprite from "../../engine/sprite";
import Drawable from "../../engine/drawable";
import EventSystem from "../../engine/eventSystem";
import Position from "../../engine/position";
import Engine from "../../engine/engine";
import Camera from "../../engine/camera";

export interface MenuSettings {
    dimension: [number, number];
    size: [number, number];
    topLeft: [number, number];
}

export class MenuFrame {
    entity: Entity = null;
    drawable: Drawable = null;
    eventSystem: EventSystem = null;
    camera: Camera = null;
    position: Position = null;
    frame = 0;
    tick = 0;

    // Default configuration suitable for Desktop View only 1600/800 px
    // 820 / 1600 = x / screenWidth
    // x = 820 /1600 * screenWidth;
    private defaultMenuSettings: MenuSettings = {
        dimension: [32, 31],
        size: [820, 625],
        topLeft: [447, 48],
    };

    private scale = {
        dimension: [32/1600, 31/800],
        size: [820/1600, 625/800],
        topLeft: [447/1600, 48/800],
    }

    constructor(engine: Engine, screenSize?: [number, number]) {
        const sprite = new Sprite();
        sprite.setImage(engine.loader.images.gaugeSheet.getImage());

        this.entity = new Entity();
        this.drawable = this.getDrawable(screenSize, sprite);
        this.position = new Position();

        this.eventSystem = new EventSystem();
        this.camera = engine.camera;
    }

    update(self: MenuFrame) {
        self.tick++;
        if (self.tick % 5 == 0) {
            self.frame++;
            self.frame = self.frame > 3 ? 0 : self.frame;
        }
        self.drawable.topLeft = [448 + self.frame * 32, 48];
        const cp = self.camera.getPosition();
        let newPosition = [
            Math.round(-cp[0] + 750),
            Math.round(-cp[1] + 395)
        ];
        self.drawable.setPosition(newPosition);
    }


    private getDrawable([screenWidth, screenHeight]: [number, number], sprite: Sprite): Drawable {
        const drawable = new Drawable();

        drawable.dimension = this.defaultMenuSettings.dimension;
        drawable.size = this.defaultMenuSettings.size;
        drawable.topLeft = this.defaultMenuSettings.topLeft;

        drawable.bindSprite(sprite);
        drawable.bindUpdate(this.update, [this]);

        return drawable;
    }
}