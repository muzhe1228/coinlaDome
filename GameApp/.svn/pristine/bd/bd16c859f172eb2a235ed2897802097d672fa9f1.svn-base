$(function() {
    var headerH,
        banner,
        gameIntrod,
        gameFeature,
        blockCompetition,
        gameAgent,
        contactUs;
    var timer = null;
    //home.navTitle
    data.home.navTitle.forEach(function(item, index) {
        var str = '<a href="' + item.link + '">' + item.title + "</a>";
        $(".right_nav").append(str);
    });
    //home.gameIntrod
    var intordClass = [".intord_nn", ".intord_jc", ".intord_db"];
    data.home.gameIntrod.forEach(function(item, index) {
        var dom = $(intordClass[index]).children(".intordSize");
        for (var i = 0; i < item.length; i++) {
            var str = "<p>" + item[i] + "</p>";
            dom.append(str);
        }
    });
    //home.feature
    var featureDom = $(".Feature_explain li");
    data.home.feature.forEach(function(item, index) {
        var dom = featureDom.eq(index).children(".featureSize");
        var str =
            "<strong>" +
            item.title +
            "</strong><span>" +
            item.size1 +
            "</span><span>" +
            item.size2 +
            "</span>";
        dom.append(str);
    });

    //home.whatBlock
    var BlockList = [$(".whatSize"), $(".sizeWhat")];
    data.home.BlockList.forEach(function(item, index) {
        var str =
            "<h2>" +
            item.title +
            "<span></span></h2><p>" +
            item.size1 +
            "</p><p class='color_3'>" +
            item.size2 +
            "</p>";
        BlockList[index].append(str);
    });
    //home.agentList
    var lData = $(".lData ul"),
        rData = $(".rData ul");
    data.home.agentListL.forEach(function(item, index) {
        var dom = lData.eq(index).children(".size");
        for (var i = 0; i < item.length; i++) {
            var str;
            if (i > 0) {
                if (i == item.length - 1) {
                    str = '<p class="color_3">' + item[i] + "</p>";
                } else {
                    str = "<p>" + item[i] + "</p>";
                }
            } else {
                str = "<h3>" + item[i] + "</h3>";
            }
            dom.append(str);
        }
    });
    data.home.agentListR.forEach(function(item, index) {
        var dom = rData.eq(index).children(".size");
        for (var i = 0; i < item.length; i++) {
            var str;
            if (i > 0) {
                if (i == item.length - 1) {
                    str = '<p class="color_3">' + item[i] + "</p>";
                } else {
                    str = "<p>" + item[i] + "</p>";
                }
            } else {
                str = "<h3>" + item[i] + "</h3>";
            }
            dom.append(str);
        }
    });
    //home.footer
    $(".footer_title").html(data.home.footer.title);
    data.home.footer.list.forEach(function(item, index) {
        var target = index == 2 ? "_blank" : "_self";
        var str =
            '<a href="' +
            item.link +
            '" target="' +
            target +
            '">' +
            item.title +
            "</a>";
        $(".footer_list").append(str);
    });

    resetHeight();
    var unslider = $(".banner").unslider({
        speed: 500,
        delay: 3000,
        complete: function() {},
        keys: true,
        dots: true,
        fluid: true
    });
    var mUnslider = $(".m_banner").unslider({
        speed: 500,
        delay: 3000,
        complete: function() {},
        keys: true,
        dots: true,
        fluid: true
    });
    $(".m_banner")
        .on("swipeleft", function(e) {
            mUnslider.data("unslider").prev();
        })
        .on("swiperight", function(e) {
            mUnslider.data("unslider").next();
        });
    $(".right_nav a").click(function() {
        $("html, body").animate(
            {
                scrollTop: $($.attr(this, "href")).offset().top - 80
            },
            500
        );
        return false;
    });

    $(window).resize(function(e) {
        resetHeight();
    });
    $(window).scroll(function(e) {
        clearTimeout(timer);
        timer = setTimeout(function() {
            let scrollTop = $(this).scrollTop();
            if (scrollTop > banner && scrollTop < gameIntrod) {
                setNavLineHeight(0);
            } else if (scrollTop > gameIntrod && scrollTop < blockCompetition) {
                setNavLineHeight(1);
            } else if (scrollTop > blockCompetition && scrollTop < gameAgent) {
                setNavLineHeight(2);
            } else if (scrollTop > gameAgent && scrollTop < contactUs) {
                setNavLineHeight(3);
            } else {
                setNavLineHeight(0);
            }
        }, 100);
    });
    function setNavLineHeight(index) {
        $(".right_nav")
            .children("a")
            .eq(index)
            .addClass("active")
            .siblings()
            .removeClass("active");
    }
    function resetHeight() {
        headerH = $("header").height();
        banner = $("#banner").offset().top - 81;
        gameIntrod = $("#gameIntrod").offset().top - 81;
        gameFeature = $("#gameFeature").offset().top - 81;
        blockCompetition = $("#blockCompetition").offset().top - 81;
        gameAgent = $("#gameAgent").offset().top - 81;
        contactUs = $("#contactUs").offset().top - 81;
    }
});
