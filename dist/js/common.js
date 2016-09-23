"use strict";$.fn.slider=function(e){var n,t=this,i=this,a=i.find(".slider__wrap"),o=a.find(".slider__slides"),r=i.find(".slider__prev"),l=i.find(".slider__next"),s=i.find(".slider__pagination"),c=e.currentSlide||0,d=e.duration||.3,f=o.children().length,u=a["vertical"===e.slideStyle?"outerHeight":"outerWidth"](),p=e.delay||6e3;this.prevSlide=function(){return 0===c?void(c=f-1):void c--},this.nextSlide=function(){return c===f-1?void(c=0):void c++},this.createPagination=function(){if(s.length){for(var n=document.createDocumentFragment(),t=0;t<f;t++){var i=document.createElement("li");i.addClass(e.pagItemClass);var a=document.createElement("a");a.addClass(e.pagLinkClass),a.attr("data-slide",t),i.append(a),n.append(i)}s.append(n),s.children()[c].find("a").addClass("active")}},this.render=function(){var n="vertical"===e.slideStyle?"margin-top":"margin-left";o.css(n,-c*u),s.length&&(s.find(".active").removeClass("active"),s.children()[c].find("a").addClass("active"))},this.setupListeners=function(){r&&r.on("click",function(e){e.preventDefault(),t.prevSlide(),t.render(),clearInterval(n)}),l&&l.on("click",function(e){e.preventDefault(),t.nextSlide(),t.render(),clearInterval(n)}),s&&s.on("click",function(e){e.preventDefault();var i=e.target;"A"===i.prop("tagName")&&(clearInterval(n),c=+i.data("slide"),t.render())}),$(window).on("resize",function(){u=a["vertical"===e.slideStyle?"outerHeight":"outerWidth"](),t.render()})},this.autoSlide=function(){n=setInterval(function(){t.nextSlide(),t.render()},p)},this.init=function(){o.css("transition","margin "+d+"s linear"),this.createPagination(),"vertical"===e.slideStyle&&o.css("white-space","normal"),this.setupListeners(),this.render(),this.autoSlide()},this.init()},$(".main-slider").slider({selector:".main-slider",slideStyle:"horizontal",duration:.4});var mainNav=function(){function e(){r.on("click",function(e){return e.preventDefault(),r.hasClass("page-header__humburger-link--active")?void n():void t()})}function n(){l.slideUp(300,"swing",function(){r.removeClass("page-header__humburger-link--active")})}function t(){l.slideDown(300,"swing",function(){r.addClass("page-header__humburger-link--active")})}function i(){e()}var a=$(".page-header"),o=a.find(".page-header__humburger"),r=o.find(".page-header__humburger-link"),l=a.find(".nav");i()}();!function(){function e(){a.on("click",function(e){e.preventDefault();var t=$(this);i.css("display","none"),n(t.attr("href"))}),o.on("click",function(e){e.preventDefault();var t=$(this);n(t.attr("href"))}),l.on("click",function(e){e.preventDefault();var t=$(this);n(t.attr("href"))}),s.on("click",function(e){e.preventDefault();var t=$(this);n(t.attr("href"))})}function n(e){var n=e.substring(1),t=$("."+n);console.log(t.offset().top),$("html, body").animate({scrollTop:t.offset().top},500)}function t(){e()}var i=$(".nav"),a=i.find(".nav__link"),o=$(".jump-section"),r=($(".page-header"),$(".main-slider")),l=r.find(".main-slider__nav-link--show"),s=r.find(".main-slider__nav-link--jump");t()}(),function(){function e(){$(window).on("scroll",function(){var e=$(window);e.scrollTop()+e.height()>=a.offset().top+a.outerHeight()&&n()})}function n(){for(var e=o.length-1;e>=0;e--){var n=$(o[e]),t=+n.data("percent");n.find(".skills__meter-inner").css("width",t+"%")}}function t(){return $(window).scrollTop()>=i.offset().top?void n():void e()}var i=$(".skills"),a=i.find(".skills__list"),o=a.find(".skills__meter");$(".page-header");t()}(),function(){function e(){return f===u-1?void(f=0):void f++}function n(){s.find(".testimonials__item--active").fadeOut(300).removeClass(".testimonials__item--active"),$(c[f]).fadeIn("slow").addClass("testimonials__item--active"),d.find(".testimonials__nav-item--active").removeClass("testimonials__nav-item--active"),$(d.children()[f]).addClass("testimonials__nav-item--active")}function t(){for(var e=$(document.createDocumentFragment()),n=0;n<c.length;n++){var t=$(document.createElement("li"));t.addClass("testimonials__nav-item");var i=$(document.createElement("a"));i.addClass("testimonials__nav-link").attr({"data-slide":n,href:"#"}),t.append(i),e.append(t)}d.append(e),$(d.children()[f]).addClass("testimonials__nav-item--active")}function i(){r=setInterval(function(){e(),n()},5e3)}function a(){c.on("click",function(){e(),n(),clearInterval(r),i()}),d.on("click",function(e){e.preventDefault();var t=$(e.target);"A"===t.prop("tagName")&&(f=+t.data("slide"),n(),clearInterval(r),i())})}function o(){t(),a(),n(),i()}var r,l=$(".testimonials"),s=l.find(".testimonials__list"),c=l.find(".testimonials__item"),d=l.find(".testimonials__nav-list"),f=0,u=c.length;o()}(),function(){function e(){s--,s<0&&(o.prepend(o.children().last().clone()),o.children().last().remove(),s++)}function n(){s++,s===o.children().length-1&&(o.append(o.children().first().clone()),o.children().first().remove(),s--)}function t(){document.documentElement.clientWidth>=1200&&(s=0);var e=o.outerWidth();o.css("margin-left",-s*e)}function i(){r.on("click",function(n){n.preventDefault(),e(),t()}),$(window).on("resize",function(){t()}),l.on("click",function(e){e.preventDefault(),n(),t()})}function a(){i()}var o=$(".team__list"),r=(o.find(".team__item"),o.parent().find(".team__slider-nav--prev")),l=o.parent().find(".team__slider-nav--next"),s=0;a()}(),function(){function e(){l.on("click",function(e){e.preventDefault();var n=$(this);s.removeClass("portfolio__rhomb--active"),i.removeClass("portfolio__list--rhomb"),n.addClass("portfolio__rect--active")}),s.on("click",function(e){e.preventDefault();var n=$(this);l.removeClass("portfolio__rect--active"),n.addClass("portfolio__rhomb--active"),i.hasClass("portfolio__list--rhomb")||i.addClass("portfolio__list--rhomb")}),o.on("click",function(e){e.preventDefault();var n=$(this);o.removeClass("portfolio__nav-link--active"),n.addClass("portfolio__nav-link--active")}),a.on("click",function(e){e.preventDefault();var n=$(this).parent();galleryPopup.show(n)})}function n(){e()}var t=$(".portfolio"),i=t.find(".portfolio__list"),a=i.find(".portfolio__item-link"),o=t.find(".portfolio__nav-link--thematic"),r=t.find(".portfolio__grid"),l=r.find(".portfolio__rect"),s=r.find(".portfolio__rhomb");n()}();var galleryPopup=function(){function e(e){f.addClass("gallery-popup--active");var n=e.find(".portfolio__item-image").attr("src");p.attr("src",n),l=e.parent(),s=e,c=e.index(),d=l.children().length}function n(){f.removeClass("gallery-popup--active"),g.removeClass("gallery-popup-socials--shown"),g.fadeOut()}function t(){c===d-1?c=0:c++}function i(){0===c?c=d-1:c--}function a(){s=l.children().eq(c);var e=s.find(".portfolio__item-image").attr("src");p.attr("src",e)}function o(){h.on("click",function(e){e.preventDefault(),g.hasClass("gallery-popup-socials--shown")?(g.removeClass("gallery-popup-socials--shown"),g.fadeOut()):(g.addClass("gallery-popup-socials--shown"),g.slideDown())}),m.on("click",function(e){e.preventDefault(),n()}),_.on("click",function(e){e.preventDefault(),t(),a()}),v.on("click",function(e){e.preventDefault(),i(),a()})}function r(){o()}var l,s,c,d,f=$(".gallery-popup"),u=f.find(".gallery-popup__content"),p=u.find(".gallery-popup__image"),v=u.find(".gallery-popup__prev"),_=u.find(".gallery-popup__next"),m=u.find(".gallery-popup__close"),h=u.find(".gallery-popup__socials-trigger"),g=u.find(".gallery-popup__socials");return r(),{show:e}}();