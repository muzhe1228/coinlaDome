/**
 * 常量定义类
 */
export module CommonConsts {
    //线上环境
    export const resourceBaseUrl = "https://resource.pk123.app/static/";
    // export const apiBaseUrl = "https://api.pk123.app";
    // export const socketBaseUrl = "wss://socket.pk123.app/gameSocket";
    // //本地开发环境
    export const apiBaseUrl = "http://192.168.10.200:7001";
    export const socketBaseUrl = "ws://192.168.10.200:7000/gameSocket";
    
    export const HttpMethod_GET = "get";
    export const HttpMethod_POST = "post";
    export const HttpTimout = 5000;

    export const ContentType = "Content-Type";
    export const ContentType_JSON = "application/json";
    export const ContentType_TEXT = "text/plain;charset=UTF-8";
    export const ContentType_FormData = "application/x-www-form-urlencoded";
}