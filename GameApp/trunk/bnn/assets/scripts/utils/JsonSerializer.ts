// 提供JSON与Class序列化和反序列功能

export class JsonSerializer {

    /// 序列化 从对象转成json字符串
    public static serialize(obj: any): string {
        return JSON.stringify(obj);
    }

    /// 反序列化, 从json转化成对象
    public static deserialize<T>(json: string | object, c: {new(): T}): T {
        let instance = new c();

        let jsonObj: object;
        if (typeof json === "string") {
            jsonObj = JSON.parse(json);
        } else {
            jsonObj = json;
        }

        for (let prop in jsonObj) {
            if (!jsonObj.hasOwnProperty(prop)) {
                continue;
            }

            if (typeof jsonObj[prop] === "object") {
                // 如果是对象,递归调用解析该对象
                instance[prop] = JsonSerializer.deserialize(jsonObj[prop], jsonObj[prop]);
            } else {
                instance[prop] = jsonObj[prop];
            }
        }
        
        return instance;
    }

    // public static deserialize(json: string | object, clazz): any {
    //     let instance = new clazz();

    //     let jsonObj: object;
    //     if (typeof json === "string") {
    //         jsonObj = JSON.parse(json);
    //     } else {
    //         jsonObj = json;
    //     }

    //     for (let prop in jsonObj) {
    //         if (!jsonObj.hasOwnProperty(prop)) {
    //             continue;
    //         }

    //         if (typeof jsonObj[prop] === "object") {
    //             // 如果是对象,递归调用解析该对象
    //             instance[prop] = JsonSerializer.deserialize(jsonObj[prop], prop);
    //         } else {
    //             instance[prop] = jsonObj[prop];
    //         }
    //     }
        
    //     return instance;
    // }
} 