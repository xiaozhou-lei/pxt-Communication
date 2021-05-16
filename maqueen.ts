/** 
 * @file pxt-maqueen/maqueen.ts
 * @brief DFRobot's maqueen makecode library.
 * @n [Get the module here](https://www.dfrobot.com.cn/goods-1802.html)
 * @n This is a MakeCode graphical programming education robot.
 * 
 * @copyright    [DFRobot](http://www.dfrobot.com), 2016
 * @copyright    MIT Lesser General Public License
 * 
 * @author [email](jie.tang@dfrobot.com)
 * @date  2019-10-08
*/


//% weight=10 color=#008B00 icon="\uf136" block="Maqueen"
//% groups=['micro:bit(v2)']
namespace maqueen {
    let kbCallback: KV[] = []
    export class Packeta {
        public mye: string;
        public myparam: number;
    }


    let irstate:number;
    let state:number;
     /**
     * Read IR sensor value V2.
     */

    //% advanced=true shim=maqueenIRV2::irCode
    function irCode(): number {
        return 0;
    }
    
    //% weight=5
    //% group="micro:bit(v2)"
    //% blockId=IR_readv2 block="read IR key value"
    export function IR_readV2(): number {
        pins.setPull(DigitalPin.P16, PinPullMode.PullUp)
        return valuotokeyConversion();
    }

    //% weight=2
    //% group="micro:bit(v2)"
    //% blockId=IR_callbackUserv2 block="on IR received"
    //% draggableParameters
    export function IR_callbackUserV2(cb: (message: number) => void) {
        pins.setPull(DigitalPin.P16, PinPullMode.PullUp)
        state = 1;
        control.onEvent(11, 22, function() {
            cb(irstate)
        }) 
    }

function valuotokeyConversion():number{
    let irdata:number;
    switch(irCode()){
        case 0xff00:irdata = 0;break;
        case 0xfe01:irdata = 1;break;
        case 0xfd02:irdata = 2;break;
        case 0xfb04:irdata = 4;break;
        case 0xfa05:irdata = 5;break;
        case 0xf906:irdata = 6;break;
        case 0xf708:irdata = 8;break;
        case 0xf609:irdata = 9;break;
        case 0xf50a:irdata = 10;break;
        case 0xf30c:irdata = 12;break;
        case 0xf20d:irdata = 13;break;
        case 0xf10e:irdata = 14;break;
        case 0xef10:irdata = 16;break;
        case 0xee11:irdata = 17;break;
        case 0xed12:irdata = 18;break;
        case 0xeb14:irdata = 20;break;
        case 0xea15:irdata = 21;break;
        case 0xe916:irdata = 22;break;
        case 0xe718:irdata = 24;break;
        case 0xe619:irdata = 25;break;
        case 0xe51a:irdata = 20;break;
        default:
         irdata = -1;
    }
    return irdata;
}

    basic.forever(() => {
        if(state == 1){
            irstate = valuotokeyConversion();
            if(irstate != -1){
                control.raiseEvent(11, 22)
            }
        }
        
        basic.pause(20);
    })
    

}
