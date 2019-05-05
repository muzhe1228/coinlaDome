
/**
 * 共通方法封装
 */
export default class CommonFunc {
    /**
     * URL参数转换成JSON OBJECT对象
     */
    public static parserUrlParams(): object {
        let params = {};
        if (window.location == null) {
            return params
        }

        let name, value;
        let urlStr = window.location.href;
        let paramIndex = urlStr.indexOf("?");
        let paramStr = urlStr.substr(paramIndex + 1);

        let paramArray = paramStr.split("&");
        for (let i = 0; i < paramArray.length; i++) {
            let index = paramArray[i].indexOf("=");
            if (index > 0) {
                name = paramArray[i].substring(0, index);
                value = paramArray[i].substr(index + 1);
                params[name] = value
            }
        }

        return params
    }
}
