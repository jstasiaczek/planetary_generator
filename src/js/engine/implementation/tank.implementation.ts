import { Implementation } from "../baseClasses/Implementation.class";
import { Tank } from "../models/tank.model";

export class TankImplementation extends Implementation{

    _tank:Tank = null;
    constructor(tank:Tank){
        super();
        this._tank = tank;
    }
    getLevel():number{
        return this._tank.level;
    }
    setLevel(level:number){
        this._tank.level = level;
    }
    getCapacity(){
        return this._tank.capacity;
    }
    getFuelType():string{
        return this._tank.fuelType;
    }

}