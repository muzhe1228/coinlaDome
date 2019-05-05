$(function() {
  // activity.rule_size
  var ruleSize = $(".rule_size li");
  data.activity.rule_size.forEach(function(item, index) {
    var str = "<p>" + item.content + "</p>";
    ruleSize.eq(index).append(str);
  });
  // activity.rebate_list
  var ruleList = $(".rebate_list li");
  data.activity.rebate_list.forEach(function(item, index) {
    var str = "<p data='self'>" + item.title1 + "</p><p>" + item.title2 + "</p>";
    ruleList.eq(index).append(str);
  });
 
  let startTime = moment("2019/04/09 20:00:00", "YYYY/MM/DD HH:mm:ss");
  let endTime = moment("2019/04/16 20:00:00", "YYYY/MM/DD HH:mm:ss");
  let deviceType = isIos_And_Pc();
  let isApp = getUrlKey("isApp") == 1 || false;
  if (isApp) {
    $(".btn_back").show();
    $("#imgDownload")[0].src = "../static/images/activity/toRecharge.png";
  } else {
    $(".btn_back").hide();
    $("#imgDownload")[0].src = "../static/images/activity/downloadGame.png";
  }

  //倒计时
  function countDown(endTime) {
    let now = moment();
    if (now.isBefore(startTime)) {
      let du = moment.duration(startTime - now, "ms");
      $("#days").text(du.get("days"));
      $("#hours").text(du.get("hours"));
      $("#minutes").text(du.get("minutes"));
      $("#seconds").text(du.get("seconds"));
      $(".activity_timer").text("距离活动开始还有");
      $(".time_list").show();
    } else if (now.isBefore(endTime)) {
      let du = moment.duration(endTime - now, "ms");
      $("#days").text(du.get("days"));
      $("#hours").text(du.get("hours"));
      $("#minutes").text(du.get("minutes"));
      $("#seconds").text(du.get("seconds"));
      $(".activity_timer").text("距离活动结束还有");
      $(".time_list").show();
    } else {
      //活动已结束
      $(".activity_timer").text("活动已结束");
      $(".time_list").hide();
      clearInterval(intervalHandle);
    }
  }

  let intervalHandle = setInterval(countDown, 1000, endTime);

  function gotoHomePage() {
    if (isApp) {
      let backUrl =
        parserUrlParams()["backUrl"] || window.localStorage.getItem("backUrl");
      console.log(backUrl);
      if (deviceType == "ios") {
        //返回首页
        window.webkit.messageHandlers.NativeMethod.postMessage(
          "backHome://" + backUrl
        );
      } else {
        window.openApp.backHome(backUrl);
      }
    }
  }

  //返回首页
  $(".btn_back").click(function() {
    gotoHomePage();
  });

  $(".download_game").click(function() {
    if (isApp) {
      gotoHomePage();
    } else {
      window.open(constant.androidDownload);
    }
  });

  //强制竖屏
  function changeLandspace() {
    if (isApp) {
      if (deviceType == "ios") {
        //旋转屏幕 横屏
        window.webkit.messageHandlers.NativeMethod.postMessage(
          "changeLandspace://1"
        );
      } else {
        window.openApp.changeLandspace("1");
      }
    }
  }

  changeLandspace();
});
