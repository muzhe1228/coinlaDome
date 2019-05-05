import SocketType from "../model/SocketType";

export default class ModelDecorator {
    public static models: {[sockeType: number]: SocketType} = {}
}

export function Model(str: string) {
    
    return function(target: any) {
        let keyValue = str.split("=");
        if (keyValue.length >= 2) {
            let key = keyValue[0];
            let value = keyValue[1];

            if (key === "SocketType") {
                ModelDecorator.models[value] = target;
            }

        }
    }
}
