$(function() {
    var InviteCode = getUrlKey("inviteCode") || "xhlgyr";
    $(".downloadTip").text(data.register.downloadTip);
    $(".sizeInfo").text(data.register.sizeInfo);
    $(".tips").text(data.register.tipsBot);
    $("#invite").val(InviteCode);

    $(".downloadBtn,.topDownBtn").click(function() {
        // isIos();
        let terminal = isIos_And_Pc();
        if (is_weixn_qq()) {
            window.open("/download.html");
        } else {
            if (terminal == "ios") {
                window.open(constant.IosDownload);
            } else if (terminal == "android") {
                window.open(constant.androidDownload);
            } else {
                window.open("/download.html");
            }
        }
    });
    //点击注册
    $(".submitBtn").click(function() {
        // eslint-disable-next-line no-undef
        var regData = {
            mobile: $("#email").val(),
            code: $("#code").val(),
            loginPassword: $("#pwd").val(),
            recaptchaVersion: 2,
            beInvitationCode: $("#invite").val(),
            ditch: 1
        };
        if (
            (isEmail(regData.mobile) || isPhone(regData.mobile)) &&
            isCode(regData.code) &&
            isPwd(regData.loginPassword)
        ) {
            recaptchaToken(regData, register);
            //register(regData);
        } else if (!isEmail(regData.mobile) && !isPhone(regData.mobile)) {
            tishiMode("手机号或邮箱格式错误");
        } else if (!isCode(regData.code)) {
            tishiMode("验证码格式错误");
        } else if (!isPwd(regData.loginPassword)) {
            tishiMode("密码格式错误");
        }
    });
    //点击发送验证码
    $(".sendCode").click(function() {
        var email = {
            account: $("#email").val(),
            type: 1
        };
        if (isEmail(email.account) || isPhone(email.account)) {
            sendCode(email);
        } else if (!isEmail(email.account) && !isPhone(email.account)) {
            tishiMode("手机号或邮箱格式错误");
        }
    });
    $(".closeDown").click(function() {
        $(".successMode").fadeOut();
    });
});
