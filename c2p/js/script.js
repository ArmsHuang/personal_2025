function setLang(a) {
    for (var b = i18n[a], c = Object.keys(b), d = 0; d < c.length; d++) $("[text=" + c[d] + "]").html(b[c[d]]);
    $("html").attr("lang", a), $(".lang-" + [a]).addClass("active");
    var e = b[Object.keys(b)[34]];
    $(".c2p-form-submit").attr("value", e)
}
$(document).ready(function() {
    $("#fullpage").fullpage({
        anchors: ["intro", "intro-game", "intro-buy", "intro-growth", "quotes", "contact"],
        menu: ".nav",
        scrollingSpeed: 500,
        resize: !0,
        touchSensitivity: 7,
        normalScrollElementTouchThreshold: 3,
        afterLoad: function(a, b) {
            1 == b ? $(".click-ad").show() : $(".click-ad").hide()
        },
        onLeave: function(a, b, c) {
            if (b >= 1 && $(".bg-01").removeClass("gray"), b >= 2 ? ($(".phone").addClass("sc-02"), $(".game").addClass("show"), $(".bg-01, .bg-02").addClass("switch"), setTimeout(function() {
                    $(".bg-02.switch .bg-02-2, .bg-02.switch .bg-02-3").addClass("ani")
                }, 1e3)) : ($(".phone").removeClass("sc-02"), $(".game").removeClass("show"), $(".game.show img").attr("src", ""), $(".bg-01, .bg-02").removeClass("switch"), $(".bg-02 div").removeClass("ani")), b >= 3 ? ($(".queue").show(), $(".bg-03").addClass("switch"), $(".phone").addClass("sc-03"), $(".show").addClass("store"), $(".bg-ptrn, .flow-ftr, .queue").addClass("fadein")) : ($(".queue").hide(), $(".bg-03").removeClass("switch"), $(".phone").removeClass("sc-03"), $(".show").removeClass("store"), $(".bg-ptrn, .flow-ftr, .queue").removeClass("fadein")), b >= 4) {
                $(".queue").hide(), $(".phone").addClass("blur").removeClass("sc-03"), $(".show").removeClass("store"), $(".bg-04").addClass("switch"), $(".chart").addClass("showchart");
                for (var d = 0; 5 > d; d++) $(".chart li:nth-of-type(" + (d + 1) + ") img").attr("src", "img/chart-0" + (d + 1) + ".gif");
                $(".bg-ptrn, .flow-ftr, .queue").removeClass("fadein")
            } else $(".phone").removeClass("blur"), $(".bg-04").removeClass("switch"), $(".chart").removeClass("showchart"), $(".chart li img").attr("src", "img/chart-space.gif");
            b >= 5 ? ($(".phone,.sub-nav").addClass("fade"), $(".allbg").removeClass("switch"), $(".bg-01").addClass("gray")) : $(".phone,.sub-nav").removeClass("fade"), b >= 6 ? ($(".contact").addClass("hide").removeClass("acted"), $(".contact-f").addClass("popup"), $(".contact-f-rbsmall").removeClass("popup"), $(".bg-01").removeClass("gray")) : ($(".contact").removeClass("hide"), $(".contact-f").removeClass("popup"))
        }
    }), $("#moveTo").click(function(a) {
        a.preventDefault(), $.fn.fullpage.moveTo(1)
    }), $(".click-ad").click(function(a) {
        a.preventDefault(), $.fn.fullpage.moveTo(2)
    }), $(".onoff").click(function() {
        $(".nav, .lang").toggleClass("open")
    });
    new Swiper(".swiper-container", {
        pagination: ".swiper-pagination",
        nextButton: ".swiper-button-next",
        prevButton: ".swiper-button-prev",
        paginationClickable: !0,
        spaceBetween: 30,
        centeredSlides: !0,
        autoplay: 3e3,
        autoplayDisableOnInteraction: !1
    })
});
var userLang = navigator.language || navigator.userLanguage,
    Lang = userLang.replace("-", "").toLowerCase(),
    url = window.location.href,
    urlang = url.substr(url.length - 2),
    LangU = urlP[urlang];
setLang(Lang == LangU ? Lang : void 0 == LangU ? Lang : LangU), $(".lang span").click(function() {
    var a = $(this).attr("class").replace("lang-", "").replace(" active", "");
    setLang([a]), $("html").attr("lang", a), $(".lang span").removeClass("active"), $(this).addClass("active")
}), $(window).load(function() {
    $("#wrapper .form-cont").load("form.html"), $("#wrapper .contact").click(function() {
        $(this).toggleClass("acted"), $("#wrapper .contact-f-rbsmall").toggleClass("popup")
    })
});

	//block F12 and right Click
	$(document).keydown(function (event) {
		if (event.keyCode == 123) { // Prevent F12
			return false;
		} else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { // Prevent Ctrl+Shift+I        
			return false;
		}
	});

	$(document).on("contextmenu", function (e) {        
		e.preventDefault();
	});