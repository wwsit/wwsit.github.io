jQuery.expr[":"].contains=function(t,e,i){return 0<=jQuery(t).text().toUpperCase().indexOf(i[3].toUpperCase())},jQuery.expr[":"].contains_tag=function(t,e,i){var a=jQuery(t).data("tag").split(",");return-1!=$.inArray(i[3],a)},jQuery.expr[":"].contains_author=function(t,e,i){var a=jQuery(t).data("author").split(",");return-1!=$.inArray(i[3],a)};var blog_path=$(".theme_blog_path").val();blog_path=blog_path.lastIndexOf("/")===blog_path.length-1?blog_path.slice(0,blog_path.length-1):blog_path;var content=$(".pjax"),container=$(".post");function afterPjax(){(""===blog_path?"/"===location.pathname:blog_path===location.pathname.split("/")[1])?$(".post").addClass("index"):$(".post").removeClass("index"),0<$("script[type='text/x-mathjax-config']").length&&$.getScript($("#MathJax-js").val(),function(){MathJax.Hub.Queue(["resetEquationNumbers",MathJax.InputJax.TeX],["Typeset",MathJax.Hub])}),$("pre code").each(function(t,e){hljs.highlightBlock(e)}),content.css({opacity:1}).removeClass("fadeOuts").addClass("fadeIns"),bind(),"true"==$(".theme_disqus_on").val()&&DISQUSWIDGETS.getCount({reset:!0}),$("#comments").hasClass("disqus")&&setTimeout(function(){""==$(".count-comment").text().trim()&&$(".count-comment").text(0)},300)}$(document).pjax(".nav-right nav a,.nav-left .avatar_target,.site_url",".pjax",{fragment:".pjax",timeout:8e3}),$(document).on({"pjax:click":function(){content.removeClass("fadeIns").addClass("fadeOuts"),NProgress.start()},"pjax:start":function(){content.css({opacity:0})},"pjax:end":function(){NProgress.done(),container.scrollTop(0),afterPjax(),$(window).width()<=1024&&$(".full-toc .full").trigger("click")}}),$(".nav-left ul li>div").on("click",function(t){$(".friend").removeClass("friend"),$(".nav-right form .search").val("").change(),$(".nav-left li>div.active").removeClass("active"),$(this).addClass("active");var e=$(".nav-right nav a");$(this).hasClass("all")?e.css("display","block"):(e.css("display","none"),$(".nav-right").find("."+$(this).data("rel")).css("display","block"))}),$(".nav-left ul.sub").each(function(){$(this).height(26*$(this).children().length-1)}),$(".nav-left ul>li>div>.fold").on("click",function(t){var e=this;t.stopPropagation(),$(e).toggleClass("unfold"),$(e).parent().next().toggleClass("hide"),$(e).parents("ul.sub").each(function(){$(e).hasClass("unfold")?$(this).height($(this).height()+parseInt($(e).parent().next().attr("style").match(/\d+/g)[0])+1):$(this).height($(this).height()-parseInt($(e).parent().next().attr("style").match(/\d+/g)[0])-1)})}),$(".nav-right nav a").mouseenter(function(t){$(".nav-right nav a.hover").removeClass("hover"),$(this).addClass("hover")}),$(".nav-right nav a").mouseleave(function(t){$(this).removeClass("hover")});var searchContent,publickey={shift:!1,ctrl:!1,alt:!1,last:0};function inputChange(t){var e=$(t.currentTarget).val().trim();e!=searchContent&&(searchContent=e,$(".nav-right form .cross").css("display",""==e?"none":"block"),0<$("#local-search-result").length&&(3<e.length&&("in:"==e.substr(0,3).toLowerCase()||"in："==e.substr(0,3).toLowerCase())?($("#title-list-nav").hide(),$("#local-search-result").show(),searchAll(e.substr(3))):($("#title-list-nav").show(),$("#local-search-result").hide())),""==e?$(".nav-right nav a").css("display","block"):"#"==e.substr(0,1)?($("div.ac > ul").attr("class","tag"),$("div.acParent").css("display","block"),0!=e.substr(1).length&&($(".nav-right nav a").css("display","none"),$(".nav-right nav").find("a:contains_tag('"+e.substr(1)+"')").css("display","block"))):"@"==e.substr(0,1)?($("div.ac > ul").attr("class","author"),$("div.acParent").css("display","block"),0!=e.substr(1).length&&($(".nav-right nav a").css("display","none"),$(".nav-right nav").find("a:contains_author('"+e.substr(1)+"')").css("display","block"))):($("div.acParent").css("display","none"),$(".nav-right nav a").css("display","none"),$(".nav-right nav").find("a:contains('"+e+"')").css("display","block")))}function bind(){(initArticle(),$(".article_number").text($("#yelog_site_posts_number").val()),$(".site_word_count").text($("#yelog_site_word_count").val()),$(".site_uv").text($("#busuanzi_value_site_uv").text()),$("#busuanzi_value_site_uv").bind("DOMNodeInserted",function(t){$(".site_uv").text($(this).text())}),$(".site_pv").text($("#busuanzi_value_site_pv").text()),$("#busuanzi_value_site_pv").bind("DOMNodeInserted",function(t){$(".site_pv").text($(this).text())}),$(".post .pjax .index").find("br").remove(),$(".post .pjax .index h1:eq(0)").addClass("article-title"),$(".post .pjax article .article-meta .tag a").on("click",function(t){$(".nav-right form input").val("#"+$(this).text().trim()).change(),$(window).width()<=1024?$(".full-toc .full").trigger("click"):$(".full-toc .full span").hasClass("max")&&$(".full-toc .full").trigger("click")}),$(".post .pjax article .article-meta .book a").on("click",function(t){$(".nav-left ul li>div[data-rel='"+$(this).data("rel")+"']").parents(".hide").each(function(){var t=this;$(t).removeClass("hide").prev().children(".fold").addClass("unfold"),$(t).parents("ul.sub").each(function(){$(this).height(parseInt($(this).attr("style").match(/\d+/g)[0])+parseInt($(t).attr("style").match(/\d+/g)[0])+1)})}),$(".nav-left ul li>div[data-rel='"+$(this).data("rel")+"']").trigger("click"),$(window).width()<=1024?$(".full-toc .full").trigger("click"):$(".full-toc .full span").hasClass("max")&&$(".full-toc .full").trigger("click")}),$(".post .pjax article .article-meta .author").on("click",function(t){$(".nav-right form input").val("@"+$(this).text().trim()).change(),$(window).width()<=1024?$(".full-toc .full").trigger("click"):$(".full-toc .full span").hasClass("max")&&$(".full-toc .full").trigger("click")}),$(".post-toc-content").html($(".post .pjax article .toc-ref .toc").clone()),$("a[href^='#']").click(function(){return container.animate({scrollTop:$($(this).attr("href")).offset().top+container.scrollTop()},500),"#comments"===$(this).attr("href")&&load$hide(),!1}),$("#comments").hasClass("disqus"))&&$(".disqus-comment-count").bind("DOMNodeInserted",function(t){$(".count-comment").text($(this).text().replace(/[^0-9]/gi,""))});$(document).pjax(".post .pjax article a[target!=_blank]",".pjax",{fragment:".pjax",timeout:8e3}),"photoSwipe"!=img_resize&&$(".pjax").find("img").each(function(){if(!$(this).parent().hasClass("div_img")){$(this).wrap("<div class='div_img'></div>");var t=this.alt;t&&$(this).after('<div class="img_alt"><span>'+t+"</span></div>")}426<$(window).width()&&$(this).on("click",function(t){var e=$(this);$("body").append('<img class="img_hidden" style="display:none" src="'+this.src+'" />');var i="",a="",s="",l="";l=this.width/this.height>document.body.clientWidth/document.body.clientHeight&&$(".img_hidden").width()>document.body.clientWidth?(i=document.body.clientWidth+"px",a=this.height*document.body.clientWidth/this.width+"px",s=(document.body.clientHeight-this.height*document.body.clientWidth/this.width)/2+"px","0px"):this.width/this.height<document.body.clientWidth/document.body.clientHeight&&$(".img_hidden").height()>document.body.clientHeight?(i=this.width*document.body.clientHeight/this.height+"px",a=document.body.clientHeight+"px",s="0px",(document.body.clientWidth-this.width*document.body.clientHeight/this.height)/2+"px"):(a=$(".img_hidden").height()+"px",i=$(".img_hidden").width()+"px",s=(document.body.clientHeight-$(".img_hidden").height())/2+"px",(document.body.clientWidth-$(".img_hidden").width())/2+"px"),$("body").append('<div class="img_max" style="opacity: 0"></div>'),$("body").append('<img class="img_max" src="'+this.src+'" style="top:'+$(this).offset().top+"px;left:"+$(this).offset().left+"px; width:"+$(this).width()+"px;height: "+this.height+'px;">'),$(this).css("visibility","hidden"),setTimeout(function(){$("img.img_max").attr("style","").css({top:s,left:l,width:i,height:a}),$("div.img_max").css("opacity","1")},10),$(".img_max").on("click",function(t){$("img.img_max").css({width:e.width()+"px",height:e.height()+"px",top:e.offset().top+"px",left:e.offset().left+"px"}),$("div.img_max").css("opacity","0"),setTimeout(function(){e.css("visibility","visible"),$(".img_max").remove(),$(".img_hidden").remove()},500)})})})}$(document).keydown(function(t){var e=container.prop("scrollHeight")-container.scrollTop()-container.height(),i=container.scrollTop();$(".nav-right form .search").is(":focus")||$("#comments textarea").is(":focus")||(74==t.keyCode?container.animate({scrollTop:container.prop("scrollHeight")-container.height()},e,"linear"):75==t.keyCode?container.animate({scrollTop:0},i,"linear"):71==t.keyCode?publickey.shift?container.animate({scrollTop:container.prop("scrollHeight")},800):71==publickey.last&&container.animate({scrollTop:0},800):16==t.keyCode&&(publickey.shift=!0))}),$(document).keyup(function(t){$(".nav-right form .search").is(":focus")||$("#comments textarea").is(":focus")||(83==t.keyCode?$(".full-toc .full").trigger("click"):73!=t.keyCode||"0px"!=$(".nav").css("margin-left")||$(".title-list").hasClass("friend")?87==t.keyCode?$(".full-toc .post-toc-menu").trigger("click"):74==t.keyCode||75==t.keyCode?container.stop(!0):16==t.keyCode&&(publickey.shift=!1):$(".nav-right form .search").focus()),publickey.last=t.keyCode}),$(".nav-right form .search").blur(function(t){$(".nav-right nav a.hover").removeClass("hover")}),$(".nav-right form .search").keydown(function(t){var e;if(0<$(".nav-right nav a:not(:hidden), #local-search-result a:not(:hidden)").length&&!$(".ac").is(":visible"))if(13==t.which)0==(e=$(".nav-right nav a.hover:not(:hidden), #local-search-result a.hover:not(:hidden)")).length?$(".nav-right nav a:not(:hidden):first, #local-search-result a:not(:hidden):first").trigger("click"):e.trigger("click"),$(":focus").blur();else if(38==t.which)$("nav").is(":visible")?0==$("nav a:visible.hover").length||0==$("nav a:visible.hover").prevAll(":visible").length?($("nav").scrollTop($("nav").prop("scrollHeight")),$(".nav-right nav a.hover").removeClass("hover"),$(".nav-right nav a:visible:last").addClass("hover")):$("nav a.hover").prevAll().each(function(){if($(this).is(":visible"))return $(".nav-right nav a.hover").removeClass("hover"),$(this).addClass("hover"),$(this).offset().top-$(".nav-right form").height()<0&&$("nav").scrollTop($("nav").scrollTop()-$(this).height()),!1}):0==$("#local-search-result a.hover").length||0==$("#local-search-result a.hover").parent().prevAll(":visible").length?($("#local-search-result").scrollTop($("#local-search-result").prop("scrollHeight")),$("#local-search-result a.hover").removeClass("hover"),$("#local-search-result a:visible:last").addClass("hover")):$("#local-search-result a.hover").parent().prevAll().each(function(){if($(this).is(":visible"))return $("#local-search-result a.hover").removeClass("hover"),$(this).children().addClass("hover"),$(this).offset().top-$(".nav-right form").height()<0&&$("#local-search-result").scrollTop($("#local-search-result").scrollTop()-$(this).height()),!1});else if((9==t.which||40==t.which)&&($("nav").is(":visible")?0==$("nav a:visible.hover").length||0==$("nav a:visible.hover").nextAll(":visible").length?($("nav").scrollTop(0),$(".nav-right nav a.hover").removeClass("hover"),$(".nav-right nav a:visible:first").addClass("hover")):$("nav a.hover").nextAll().each(function(){if($(this).is(":visible"))return $(".nav-right nav a.hover").removeClass("hover"),$(this).addClass("hover"),$("nav").height()+$(".nav-right form").height()-$(this).offset().top<20&&$("nav").scrollTop($("nav").scrollTop()+$(this).height()),!1}):0==$("#local-search-result a:visible.hover").length||0==$("#local-search-result a:visible.hover").parent().nextAll(":visible").length?($("#local-search-result").scrollTop(0),$("#local-search-result a.hover").removeClass("hover"),$("#local-search-result a:visible:first").addClass("hover")):$("#local-search-result a.hover").parent().nextAll().each(function(){if($(this).is(":visible"))return $("#local-search-result a.hover").removeClass("hover"),$(this).children().addClass("hover"),$("#local-search-result").height()+$(".nav-right form").height()-$(this).offset().top<20&&$("#local-search-result").scrollTop($("#local-search-result").scrollTop()+$(this).prev().height()),!1}),9==t.which))return!1;27==t.which&&((e=$(".nav-right form .cross")).is(":visible")?$(".nav-right form .cross").trigger("click"):$(".nav-right form input").blur())}),$(".nav-right form .search").on("input",function(t){inputChange(t)}),$(".nav-right form .search").on("change",function(t){inputChange(t)}),$("#tagsWitchIcon").on("click",function(){$("#tagswitch").trigger("click")}),$("#tagswitch").on("change",function(t){$(".nav-right .tags-list").css("display",$(this).prop("checked")?"block":"none");var e=$(this).prop("checked")?$(".nav-right form").height()+$(".nav-right .tags-list").height()+51:$(".nav-right form").height()+1;if(426<$(window).width())var i=$(document).height()-e-11;else i=$(document).height()-e-$(".nav-left").height()-11;$(".nav-right nav, #local-search-result").css({top:e,height:i})}),$(".full-toc .full,.semicircle").click(function(t){if($(window).width()<=1024&&$(".nav").hasClass("mobile"))return $(".nav").removeClass("mobile"),void $(".full-toc .full").children().removeClass("mobile");$(".full-toc .full").children().hasClass("min")?($(".full-toc .full").children().removeClass("min").addClass("max"),$(".nav, .hide-list").addClass("fullscreen"),content.delay(200).queue(function(){$(".full-toc .full").addClass("fullscreen").dequeue()})):($(".full-toc .full").children().removeClass("max").addClass("min"),$(".nav, .hide-list").removeClass("fullscreen"),content.delay(300).queue(function(){$(".full-toc .full").removeClass("fullscreen").dequeue()}))}),$(".post").hover(function(){$(".semicircle").css("margin-left","-43px")},function(){$(".semicircle").css("margin-left","0")}),$(function(){bind(),$(".more-menus").on("click",function(){$(".mobile-menus-out").addClass("show"),$(".mobile-menus").addClass("show")}),$(".mobile-menus-out,.mobile-menus a").on("click",function(){$(".mobile-menus-out").removeClass("show"),$(".mobile-menus").removeClass("show")}),$(".nav-left>ul").css("height","calc(100vh - "+($(".avatar_target img").outerHeight(!0)+$(".author").outerHeight(!0)+$(".nav-left .icon").outerHeight(!0)+$(".left-bottom").outerHeight(!0))+"px)"),0<$("#local-search-result").length&&$.getScript(blog_path+"/js/search.js",function(){searchFunc(blog_path+"/search.xml","local-search-input","local-search-result")}),$(".nav-right .tags-list li a").on("click",function(t){$(".nav-right form input").val("#"+$(this).text().trim()).change()}),$(".full-toc .post-toc-menu").on("click",function(){$(".post-toc").toggleClass("open")}),$(".nav-right form .cross").on("click",function(t){$(".nav-right form .search").val("").change(),$(".nav-right form .search").focus()}),$("#rocket").on("click",function(t){$(this).addClass("launch"),container.animate({scrollTop:0},500)}),container.scroll(function(t){200<=container.scrollTop()&&"none"==$("#rocket").css("display")?$("#rocket").removeClass("launch").css("display","block").css("opacity","0.5"):container.scrollTop()<200&&"block"==$("#rocket").css("display")&&$("#rocket").removeClass("launch").css("opacity","1").css("display","none")}),$("#comments").hasClass("disqus")&&setTimeout(function(){""==$(".count-comment").text().trim()&&$(".count-comment").text(0)},1500),414<$(window).width()&&$(".nav-right>nav>a>.post-title").css("width",$(".nav-right>nav>a").width()-$(".nav-right>nav>a>.post-date:first").width()-40),$(".tags-list").css("width",$(".nav-right").width()-40),$(".friends").on("click",function(){$(".friends-area,.title-list").toggleClass("friend")}),$(".back-title-list").on("click",function(){$(".friends-area,.title-list").removeClass("friend")})});