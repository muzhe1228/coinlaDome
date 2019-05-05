import React, { Component } from "react";
class InputOutJSTool
{
    static asyncLoadScript(url, callback)
    {
        let old_script = document.getElementById(url);
        if (old_script)
        {
            if (old_script.ready == true)
            {
                // console.log("INFO:already load:" + url);
                callback();
                return;
            }
            else
            {
                document.body.removeChild(old_script);
                // console.log("INFO:remove an old script that not ready:" + url);
            }
        }
        let script = document.createElement('script');
        script.id = url;
        script.src = url;
        script.onload = script.onreadystatechange = function() {
            if (script.ready) {
                return false;
            }
            if (!script.readyState //这是FF的判断语句，因为ff下没有readyState这个值，IE的readyState肯定有值
                || script.readyState == "loaded" || script.readyState == 'complete' // 这是IE的判断语句
            ) {
                // console.log("INFO:load:" + url);
                script.ready = true;
                callback();
            }
        };
        document.body.appendChild(script);
    }
 
    static asyncLoadScripts(scripts, callback)
    {
        var ok = 0;
        for (var i=0; i < scripts.length; i++) {
          InputOutJSTool.asyncLoadScript(scripts[i], function() {
                ok++;
                if (ok==scripts.length)
                {
                    callback();
                }
            })
        }
    }
}
 
export default InputOutJSTool;
