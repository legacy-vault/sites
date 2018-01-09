/* Constants
*/
var UNDEF='undefined';
var C = {
	NAVI:'#navigation',
	CTRL:'#controls',
	THMB:'#thumbs',
	THMBC:'#thumbcnt',
	THMC:'#thumbcnt>ul.thmb',
	THMS:'#grid>ul.thmb',
	SCRL:'#scroll-left',
	SCRR:'#scroll-right',
	CLOS:'#close',
	IMGS:'#images',
	SPSH:'#splash',
	HEAD:'#header',
	FOOT:'#footer',
	GALS:'#galleries',
	GALC:'#gallerycnt',
	STTX:'#starttext',
	STBT:'#startbtn',
	UPBTN:'#up',
	IDXBTN:'#index',
	NOIDXB:'#noindex',
	PRVBTN:'#prev',
	NXTBTN:'#next',
	PLAYBTN:'#play',
	STOPBTN:'#pause',
	FITBTN:'#resize',
	NOFITB:'#noresize',
	INFOBTN:'#info',
	NOINFOB:'#noinfo'
};

String.prototype.trim=function(){
	return this.replace(/^\s+|\s+$/g,'');
}
String.prototype.cleanupHTML=function(){
	return this.replace(/<br>/gi,'\n').replace(/\&amp;/gi,'&').replace(/\&lt;/gi,'<').replace(/\&gt;/gi,'>').replace(/\&(m|n)dash;/gi,'-').replace(/\&apos;/gi,'\'').replace(/\&quot;/gi,'"');
}
String.prototype.appendSep=function(s,sep){
	if(typeof sep=='undefined') sep=' &middot; ';
	return (this.length?(this+sep):'')+s;
}
String.prototype.rgb2hex=function(){
	if(this.charAt(0)=='#') return this;
	var n,r=this.match(/\d+/g),h='';
	for(var i=0; i<r.length&&i<3; i++){
		n=parseInt(r[i]).toString(16);
		h+=((n.length<2)?'0':'')+n;
	}
	return '#'+h;
}
String.prototype.stripHTML=function(){
	return this.replace(/<\/?[^>]+>/gi,'');
}
Math.minMax=function(a,b,c){
	return (typeof b!='number')?a:((b<a)?a:((b>c)?c:b));
}
var cssTableSupport=!$.browser.msie || $.browser.version >= 8;

/* Easing by George Smith
*/
jQuery.extend(jQuery.easing,{
	easeOutBack:function (x,t,b,c,d,s){
		if(s==undefined) s=1.70158;
		return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;
	}
});

/* Mousewheel: Copyright (c) 2009 Brandon Aaron (http://brandonaaron.net)
*/
(function($) {
	var types=['DOMMouseScroll','mousewheel'];
	$.event.special.mousewheel={
		setup:function(){
			if(this.addEventListener)
				for(var i=types.length; i;)
					this.addEventListener(types[--i],handler,false);
			else this.onmousewheel=handler;
		},
		teardown:function() {
			if(this.removeEventListener)
				for(var i=types.length; i;)
					this.removeEventListener(types[--i],handler,false);
			else this.onmousewheel=null;
		}
};
jQuery.fn.extend({
	mousewheel:function(fn){
		return fn? this.bind("mousewheel",fn):this.trigger("mousewheel");
	},
	unmousewheel:function(fn){
		return this.unbind("mousewheel",fn);
	}
});
function handler(event) {
	var args=[].slice.call(arguments,1),delta=0,returnValue=true;
	event=$.event.fix(event||window.event);
	event.type='mousewheel';
	if(event.wheelDelta) delta=event.wheelDelta/120;
	else if(event.detail) delta=-event.detail/3;
	args.unshift(event,delta);
	return $.event.handle.apply(this,args);
}})(jQuery);


/* Cookie handling from http://www.quirksmode.org/js/cookies.html
*/
var Cookie = {
	put:function(name,value,hours){
		if(typeof hours==UNDEF) hours=1;
		var expires='';
		if(hours){
			var date=new Date();
			date.setTime(date.getTime()+(hours*60*60*1000));
			expires='; expires='+date.toGMTString();
		}
		document.cookie=name+"="+value+expires+"; path=/";
	},
	get:function(name){
		var nm=name+'=';
		var ca=document.cookie.split(';');
		for(var i in ca) {
			var c=ca[i];
			if(typeof c=='string'){
				c=c.replace(/^\s*/,'');
				if(c.indexOf(nm)==0)
					return c.substring(nm.length);
			}
		}
		return null;
	},
	getBoolean:function(name){
		var c=Cookie.get(name);
		return c!=null&&c!='false';
	},
	clear:function(name){
		Cookie.put(name,'',-1);
	}
};

/* IE6 PNG fix
*/
var FixPng = {
	blank:null,
	init:function(){
		FixPng.blank=new Image();
		FixPng.blank.src=resPath+'/blank.gif';
		$('img[src$=.png]').each(function(){
			if(!this.complete) this.onload=function(){FixPng.img(this)};
			else FixPng.image(this);
		});
		$('#parent,#startbtn,#scrup,#scrdn,#controls>ul>li,#scroll-left,#scroll-right,#close').each(function(){FixPng.bg(this);});
	},
	img:function(png){
		var src=png.src;
		if(!png.style.width) png.style.width=$(png).width();
		if(!png.style.height) png.style.height=$(png).height();
		png.onload=function(){};
		png.src=FixPng.blank.src;
		png.runtimeStyle.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+src+"',sizingMethod='scale')";
	},
	bg:function(obj){
		var mode=(obj.currentStyle.backgroundRepeat=='no-repeat')?'crop':'scale';
		var bg=obj.currentStyle.backgroundImage;
		var src=bg.substring(5,bg.length-2);
		obj.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+src+"',sizingMethod='"+mode+"')";
		obj.style.backgroundImage='url('+FixPng.blank.src+')';
	}
};

(function($) {
$.fn.addScroll = function(settings) {
	settings = $.extend({}, $.fn.addScroll.defaults, settings);
	return this.each(function(){
		var to=null;
		var cont=$(this),wrap=$(this).parent();
		cont.css({position:'absolute'});
		wrap.css({overflow:'hidden',position:'relative'}).append(settings.scrcode);
		var ctrls=wrap.find('.scrup,.scrdn,.scrbar');
		var sup=wrap.find('.scrup'), sdn=wrap.find('.scrdn'), sbar=wrap.find('.scrbar'), shan=sbar.find('div');
		var cheight;
		var wheight;
		var getHeights=function(){
			wrap.parents(':hidden').each(function(){if($(this).css('display')=='none') $(this).css('visibility','hidden').show();});
			cheight=cont.height();
			wheight=wrap.height();
			wrap.parents().each(function(){if($(this).css('visibility')=='hidden') $(this).hide().css('visibility','');});
		};
		var getSt=function(t){ 
			return Math.round((sbar.height()-2)*(-((typeof t==UNDEF)?getTop():t))/cheight)+1; 
		};
		var getSh=function(){ 
			return Math.max(Math.round((sbar.height()-2)*wheight/cheight),settings.dragMinHeight); 
		};
		var getTop=function(){ 
			return cont.position().top; 
		};
		var setArw=function(){
			var t=getTop();
			sup.css({opacity:(t?1:0.3)});
			sdn.css({opacity:(t==wheight-cheight)?0.3:1});
		};
		var matchScr=function(){
			getHeights();
			shan.css({top:getSt(),height:(hh=getSh())});
			if(cheight && cheight<=wheight) ctrls.hide();
			else ctrls.show();
			setArw(); 
		};
		var matchCnt=function(){ 
			cont.css({top:-Math.max(Math.round((shan.position().top-1)*cheight/(sbar.height()-2)),wheight-cheight)}); 
			setArw(); 
		};
		var animateTo=function(t){
			t=Math.minMax(wheight-cheight,t,0);
			shan.stop(true,true).animate({top:getSt(t)},settings.speed,settings.effect);
			cont.stop(true,true).animate({top:t},settings.speed,settings.effect,setArw);
		};
		sup.click(function(){ 
			animateTo(getTop()+settings.incr); return false; 
		});
		sdn.click(function(){ 
			animateTo(getTop()-settings.incr); return false; 
		});
		sbar.click(function(e){
			if(e.pageY<shan.offset().top)
				animateTo(getTop()+wheight);
			else if(e.pageY>(shan.offset().top+shan.height()))
				animateTo(getTop()-wheight);
			return false;
		});
		if(settings.enableMouseWheel) 
			cont.mousewheel(function(e,d){
				if(d) animateTo(getTop()+((d<0)?(-settings.incr):settings.incr));
				return false;
			});
		var dragmove=function(e){
			shan.css({top:Math.minMax(1,Math.round(e.pageY-shan.data('my')),sbar.height()-shan.height()-1)}); 
			matchCnt();
			return false;
		};
		var dragstop=function(e){
			$(document).unbind('mousemove',dragmove).unbind('mouseup',dragstop);
			return false;
		};
		shan.bind('dragstart',function(e){ 
			$(this).data('my',Math.round(e.pageY)-$(this).position().top);
			$(document).bind('mousemove',dragmove).bind('mouseup',dragstop);
			return false;
		});
		$(window).resize(function(){ clearTimeout(to); to=setTimeout(matchScr,50);});
		ctrls.bind('selectstart',function(e){ return false; });
		matchScr();
		if(settings.enableKeyboard)
			$(document).keydown(function(e){
				if(typeof _jaWidgetFocus!=UNDEF&&_jaWidgetFocus || $('#modal').length) return true;
				var k=e?e.keyCode:window.event.keyCode;
				if(!Imgs.on)
					switch(k) {
						case 33: animateTo(getTop()+wheight); return false;
						case 34: animateTo(getTop()-wheight); return false;
					}
				return true;
			});	
	});
};
})(jQuery);

$.fn.addScroll.defaults = {
	scrcode:'<div class="scrup"></div><div class="scrdn"></div><div class="scrbar"><div><img src="'+resPath+'/blank.gif" /></div></div>',
	dragMinHeight:10,
	speed:250,
	effect:'easeOutBack',
	incr:thumbHeight+10,
	enableKeyboard:true,
	enableMouseWheel:true
};

/* Actual skin code
*/

var Splash = {
	div:null, hed:null, gal:null, gac:null, ftr:null, thm:null, xh:0,
	init:function(){
		$(C.STBT).mouseenter(function() {$(C.STTX).stop(true,false).css({opacity:1}).hide().fadeIn(250);})
			.mouseleave(function() {$(C.STTX).stop(true,false).fadeOut(500);})
			.click(function() { Splash.startShow(); return false;});
		if(Splash.gal.length>0){
			Splash.xh=Splash.hed.height()+parseInt(Splash.gal.css('margin-top'))+parseInt(Splash.gal.css('margin-bottom'))+Splash.ftr.height()+parseInt(Splash.div.css('bottom'));
			Splash.setup();
		}
	},
	setup:function(){
		if(images.length>0) Splash.setActive(0);
		Splash.adjust();
		Splash.gac.addScroll({enableMouseWheel:enableMouseWheel});
		Splash.thm.find('a').each(function(i){
			Hints.add($(this),images[i].thmcapt);
			$(this).click(function(){Splash.thumbClicked(i);return false});
		});
	},
	adjust:function(){
		if(Splash.gal.length>0){
			var gh=$(window).height()-Splash.xh;
			var gch=Splash.gac.height();
			if(!gch&&Splash.div.is(':hidden')){
				Splash.div.attr({visibility:'hidden'}).show();
				gch=Splash.gac.height();
				Splash.div.attr({visibility:'visible'}).hide();
			}
			Splash.gal.css({height:(gh&&gch)?Math.min(gh,gch):(gh||gch)});
		}
	},
	show:function(){
		Splash.div.fadeIn(250);
		Imgs.on=false;
		History.setUrl(0);
	},
	setActive:function(n){
		Splash.thm.find('li.active').removeClass('active');
		Splash.thm.find('li').eq(n).addClass('active');
	},
	thumbClicked:function(n){
		Splash.setActive(n);
		Splash.div.fadeOut(250,function() {Imgs.go(n);});
	},
	startShow:function(){
		if(images.length)
			Splash.div.fadeOut(250,function() {
				if(Imgs.curr<0) Imgs.go(0);
				else { Imgs.show(); History.setUrl(Imgs.curr); }
				if(!images[0].video) Imgs.start();
			});
	}
};

var Navi = {
	div:null,
	init:function(){
		this.div=$(C.NAVI);
	}
};

var Thumbs = {
	on:thumbsOn,
	div:null,
	thc:null,
	thm:null,
	tw:0,
	th:0,
	lw:0,
	over:false,
	init:function(){
		Thumbs.thm.find('a').each(function(i){
			Hints.add($(this),images[i].thmcapt);
			$(this).click(function(){Imgs.reloop();Imgs.go(i);return false})
		});
		Thumbs.div.hover(function(){Thumbs.over=true;Ctrl.hide();},function(){Thumbs.over=false;})
		Imgs.div.show();
		Thumbs.lw=Thumbs.thm.find('li:first').outerWidth(true);
		Thumbs.tw=Imgs.max*Thumbs.lw;
		Imgs.div.hide();
		var c=Cookie.get('_ts_thumbs');
		if(c) Thumbs.on=(c!='false');
		if(Thumbs.on){
			Navi.div.css({top:0});
			Ctrl.setThumbsBtn();
		}
		$(C.SCRR).click(function() {
			Thumbs.scrollright();
			return false;
		});
		$(C.SCRL).click(function() {
			Thumbs.scrollleft();
			return false;
		});
		Thumbs.markNewFolders();
		Thumbs.load();
	},
	scrollleft:function(){
		var sw=Thumbs.thc.width();
		if(sw<Thumbs.tw)
			Thumbs.thm.stop(true,false).animate({left:Math.min(Thumbs.thm.position().left+sw,0)},2000,'easeOutBack');
	},
	scrollright:function(){
		var sw=Thumbs.thc.width();
		if(sw<Thumbs.tw)
			Thumbs.thm.stop(true,false).animate({left:Math.max(Thumbs.thm.position().left-sw,sw-Thumbs.tw)},2000,'easeOutBack');
	},
	toggle:function(){
		if(Thumbs.on)
			Navi.div.stop(true,false).animate({top:-Thumbs.div.height()},500);
		else
			Navi.div.stop(true,false).animate({top:0},1000);
		Thumbs.on=!Thumbs.on;	
		Cookie.put('_ts_thumbs',Thumbs.on);
	},
	setActive:function(){
		if(Imgs.on) {
			var sw=Thumbs.thc.width();
			var lt=Imgs.curr*Thumbs.lw;
			var lo=Thumbs.thm.position().left;
			var rt=((Imgs.curr<Imgs.max-1)?2:1)*Thumbs.lw;
			if((lt+lo)>(sw-rt))
				Thumbs.thm.stop(true,false).animate({left:Math.max(-lt+sw-rt,sw-Thumbs.tw)},1000,'easeOutBack');
			else if((lt+lo)<Thumbs.lw) 
				Thumbs.thm.stop(true,false).animate({left:Math.min(-lt+Thumbs.lw,0)},1000,'easeOutBack');
		}
		Thumbs.thm.find('li.active').removeClass('active');
		Thumbs.thm.find('li').eq(Imgs.curr).addClass('active');
	},
	load:function(){
		var st=Thumbs.thc.find('li>a');
		var it=Splash.thm.find('li>a');
		var days=(new Date()).getTime()/86400000;
		var i0=(cssTableSupport)?'':'<b> </b>',d;
		for(var i in images){
			d=st.eq(i).add(it.eq(i));
			d.css({backgroundImage:'none'}).html(i0+'<img src="'+images[i].thumb.cleanupHTML()+'" />');
			if(!cssTableSupport) d.css({display:'block'});
			if((days-images[i].mod)<=newDays) d.after('<span>&nbsp;</span>');
		}
	},
	markNewFolders:function(){
		var mod,days=(new Date()).getTime()/86400000;
		$(".folder .thumb img").each(function(){
			mod=$(this).attr('rel');
			if(mod.length && (typeof mod==='number') && ((days-mod)<=newDays))
				$(this).after('<span>&nbsp;</span>');
		});
	}
};

var Ctrl = {
	on:false,
	div:null,
	to:null,
	over:false,
	init:function(){
		this.div.css({opacity:0}).hover(function(){Ctrl.over=true;},function(){Ctrl.over=false;})
		$(C.UPBTN).click(function(){
			Ctrl.goUp();
			return false;
		});
		$(C.IDXBTN+','+C.NOIDXB).click(function(){
			Thumbs.toggle();
			Ctrl.setThumbsBtn();
			return false;
		});
		$(C.PRVBTN).click(function(){
			Imgs.prev();
			return false;
		});
		$(C.NXTBTN).click(function(){
			Imgs.next();
			return false;
		});
		$(C.PLAYBTN).click(function(){
			Imgs.start(250);
			return false;
		});
		$(C.STOPBTN).click(function(){
			Imgs.stop();
			return false;
		});
		$(C.FITBTN+','+C.NOFITB).click(function(){
			Imgs.toggleFit();
			Ctrl.setFitBtn();
			return false;
		});
		$(C.INFOBTN+','+C.NOINFOB).click(function(){
			Captions.toggle();
			Ctrl.setInfoBtn();
			return false;
		});
	},
	show:function(){
		this.to=clearTimeout(this.to);
		if(!this.on){
			this.on=true; 
			this.div.stop(true,false).animate({opacity:1},500,function(){
				if($.browser.msie) $(this).css('filter','');
			});
		}
		this.to=setTimeout(function(){Ctrl.fade()},2000);
	},
	fade:function(){
		if(this.over)
			this.to=setTimeout(function(){Ctrl.fade()},500);
		else
			this.hide();
	},
	hide:function(){
		this.to=clearTimeout(this.to);
		if(this.on) {
			this.on=false;
			Ctrl.div.animate({opacity:0},1000);
		}
	},
	setFitBtn:function(){
		if(Imgs.fit){$(C.FITBTN).hide();$(C.NOFITB).show();}
		else{$(C.NOFITB).hide();$(C.FITBTN).show();}
	},
	setInfoBtn:function(){
		if(Captions.on){$(C.INFOBTN).hide();$(C.NOINFOB).show();}
		else{$(C.NOINFOB).hide();$(C.INFOBTN).show();}
	},
	setThumbsBtn:function(){
		if(Thumbs.on){$(C.IDXBTN).hide();$(C.NOIDXB).show();}
		else{$(C.NOIDXB).hide();$(C.IDXBTN).show();}
	},
	goUp:function(){
		Imgs.stop();
		if(Splash.div.length) Imgs.hide();
		else Ctrl.goParent();
	},
	goParent:function(){
		if(uplink.length){
			if(!level&&parent) parent.location.href=uplink;
			else window.location=uplink;
		}
	}
};

var Imgs = {
	on:false,
	curr:-1,
	div:null,
	wait:null,
	max:0,
	lx:-1, ly:-1,
	fit:fitImages,
	to:null,
	clicked:null,
	init:function(){
		var n=History.init();
		Imgs.wait=$('#images>.wait');
		var c=Cookie.get('_ts_fit');
		if(c) Imgs.fit=(c!='false');
		Ctrl.setFitBtn();
		$(window).resize(function(){Imgs.adjust();});
		if(n>=0){
			Splash.setActive(n);
			Splash.div.hide(); 
			Imgs.go(n);
		} else if(!Splash.div.length || (slideshow.auto&&!dirCount)){
			if(!Splash.div.length)
				Imgs.show();
			else
				Splash.div.hide(); 
			if(slideshow.auto && images[0].video)
				Imgs.start(0);
			else
				Imgs.go(0);
		} else
			Imgs.preloadnext();
	},
	hide:function(){
		Imgs.div.fadeOut(250,function(){$(this).hide();Splash.show();});
		Imgs.on=false;
	},
	show:function(clear){
		if(typeof clear!=UNDEF && clear){$('#images>.current').empty();}
		Imgs.div.fadeIn(250).mousemove(function(e){
			if(!Thumbs.over&&(e.pageX!=Imgs.lx || e.pageY!=Imgs.ly)) {
				Imgs.lx=e.pageX; Imgs.ly=e.pageY;
				Ctrl.show(); 
			}
		});
		Imgs.on=true;
	},
	start:function(delay){
		if(Imgs.to) clearTimeout(Imgs.to); 
		$(C.PLAYBTN).hide();$(C.STOPBTN).show();
		Imgs.to=setTimeout(function(){Imgs.loop()},(typeof delay!=UNDEF)?delay:slideshow.delay);
	},
	stop:function(){
		$(C.STOPBTN).hide();$(C.PLAYBTN).show();
		if(Imgs.to) {clearTimeout(Imgs.to);Imgs.to=null;}
	},
	loop:function(){
		Imgs.next();
		Imgs.reloop();
	},
	reloop:function(){
		if(Imgs.to){
			clearTimeout(Imgs.to);
			Imgs.to=setTimeout(function(){Imgs.loop()},slideshow.delay);
		}
	},
	suspendLoop:function(){
		if(Imgs.to){
			clearTimeout(Imgs.to);
			Imgs.to=null;
		}
	},
	resumeLoop:function(){
		if(!Imgs.to&&$(C.STOPBTN).css('display')!='none') 
			Imgs.to=setTimeout(function(){Imgs.loop()},slideshow.delay);
	},
	prev:function(){
		Imgs.reloop();
		Imgs.go((this.curr>0)?this.curr-1:this.max-1);
	},
	next:function(){
		Imgs.reloop();
		if(Imgs.curr==Imgs.max-1){
			if(slideshow.loop)
				Imgs.go(0);
			else if(askAtLast){
				Imgs.stop();
				var buttons=new Array({t:text.startOver,h:function(){Imgs.go(0)}},{t:text.stop,h:null});
				if(uplink.length) buttons.splice(1,0,{t:(level>0)?text.up:text.backToHome,h:function(){Ctrl.goParent()}});
				Alert.show('<h3>'+text.atLastPage+'</h3><p>'+text.atLastPageQuestion+'</p>',buttons);
			}
		}
		else
			Imgs.go(this.curr+1);
	},
	preloadnext:function(){
		if(Imgs.curr<Imgs.max-1&&!images[Imgs.curr+1].video) {
			var img=new Image();
			$(img).attr({src:images[Imgs.curr+1].file.cleanupHTML()});
		}
	},
	go:function(n){
		if(!Imgs.on) Imgs.show(true);
		else if(n==Imgs.curr) return;
		n=Math.minMax(0,n,Imgs.max);
		Imgs.wait.css({opacity:1}).fadeIn(500);
		var ci=images[n];
		if(ci.video){
			Imgs.loaded(n);
		}else{
			var img=$(new Image());
			Imgs.loaded(n,img);
			img.load().attr({src:ci.file.cleanupHTML(),width:ci.width,height:ci.height});
		}
	},
	loaded:function(n,img){
		var ci=images[n];
		var to=$('#images>.swap'), pr=$('#images>.current');
		pr.add(to).unmousewheel();
		if(to.children().length) {
			pr.stop(true,false).hide().empty().addClass('swap').removeClass('current');
			to.stop(true,false).addClass('current').removeClass('swap');
			var s=to; to=pr; pr=s;
		}
		pr.fadeOut(500,function(){pr.hide().empty().css({filter:null,display:'none'});}).addClass('swap').removeClass('current');
		to.hide().empty().addClass('current').removeClass('swap');
		Imgs.wait.stop(true,false).fadeOut(100,function(){$(this).hide();});
		Imgs.curr=n;
		History.setUrl(n);
		Thumbs.setActive();
		if(ci.video){
			Video.add(to,ci);
		}else{
			to.append(img);
			img.data('ow',ci.width).data('oh',ci.height);
			Imgs.prepare(img);
		}
		Captions.prepare(to,ci);
		to.css({opacity:1}).fadeIn(1000,function(){
			to.css({display:'block',filter:null});
			if(enableMouseWheel){
				to.mousewheel(function(e,d){
					if($(e.target).parents('div.map').length>0||ci.video) return true;
					if(d<0) Imgs.next(); 
					else if(d>0) Imgs.prev();
					Ctrl.hide();
					return false;
			});}
			Imgs.preloadnext();
		})
	},
	fitWindow:function(img){
		var iw=img.data('ow'), ih=img.data('oh');
		var ww, wh;
		if(Imgs.on){ww=Imgs.div.width();wh=Imgs.div.height();}
		else if(Splash.div.length){ww=Splash.div.width();wh=Splash.div.height();}
		if(ww==0||wh==0) {ww=$(window).width();wh=$(window).height();} // IE6
		ww-=2*borderWidth;
		wh-=2*borderWidth;
		if(Imgs.fit&&!(fitShrinkonly&&iw<ww&&ih<wh)){
			if(ww/iw<=wh/ih){ih=Math.round(ih*ww/iw);iw=ww;}
			else{iw=Math.round(iw*wh/ih);ih=wh;}
		}
		img.css({width:iw,height:ih,top:Math.round((wh-ih)/2),left:Math.round((ww-iw)/2)});
	},
	prepare:function(img){
		Imgs.fitWindow(img);
		img.bind('dragstart',function(e){
			clearTimeout(Imgs.clicked);
			$(this).css('cursor','move')
				.data('mx',Math.round(e.pageX-$(this).eq(0).offset().left))
				.data('my',Math.round(e.pageY-$(this).eq(0).offset().top));
			return false;
		}).mouseup(function(e){
			if(typeof $(this).data('mx')!=UNDEF){
				$(this).css('cursor','default').removeData('mx');
				setTimeout(function(){clearTimeout(Imgs.clicked)},100);
			}
		}).mouseout(function(e){
			if(typeof $(this).data('mx')!=UNDEF)
				$(this).css('cursor','default').removeData('mx');
		}).mousemove(function(e){
			if(typeof $(this).data('mx')!=UNDEF){
				var l=Math.round(e.pageX-$(this).data('mx')), t=Math.round(e.pageY-$(this).data('my'));
				var ww=Imgs.div.width(), wh=Imgs.div.height();
				var iw=$(this).width()+2*borderWidth, ih=$(this).height()+2*borderWidth;
				if(iw<ww){ if(l<0) l=0; else if(l>(ww-iw)) l=ww-iw; }
				else{ if(l>0) l=0; else if(l<(ww-iw)) l=ww-iw; }
				if(ih<wh){ if(t<0) t=0; else if(t>(wh-ih)) t=wh-ih; }
				else{ if(t>0) t=0; else if(t<(wh-ih)) t=wh-ih; }
				$(this).css({left:l,top:t});
			}
		}).dblclick(function(e){
			clearTimeout(Imgs.clicked);
			if(Imgs.fit)
				Imgs.toggleFit({x:(e.pageX-$(this).eq(0).offset().left)/$(this).width(),y:(e.pageY-$(this).eq(0).offset().top)/$(this).height()});
			else
				Imgs.toggleFit();
			Ctrl.setFitBtn();
			return false;
		}).click(function(e){
			clearTimeout(Imgs.clicked);
			Imgs.clicked=setTimeout(function(){Imgs.next();},250);
			return false;
		});
		if(rightClickProtect) img.bind('contextmenu',function(e){e.preventDefault();return false;});
	},
	toggleFit:function(c){
		var ww=Imgs.div.width()||$(window).width(), wh=Imgs.div.height()||$(window).height();
		var img=$('#images>.current>img');
		var iw=img.data('ow'), ih=img.data('oh');
		ww-=2*borderWidth;
		wh-=2*borderWidth;
		var l, t;
		if(!Imgs.fit){
			if(fitShrinkonly&&iw<ww&&ih<wh) return;
			if(ww/iw<=wh/ih) {ih=Math.round(ih*ww/iw);iw=ww;}
			else {iw=Math.round(iw*wh/ih);ih=wh;}
			l=(ww-iw)/2; t=(wh-ih)/2;
		}else{
			if(typeof c!=UNDEF && (iw>ww&&ih>wh)){
				l=Math.round(ww/2-c.x*iw);
				t=Math.round(wh/2-c.y*ih);
				if(l>0) l=0; else if(l<(ww-iw)) l=ww-iw;
				if(t>0) t=0; else if(t<(wh-ih)) t=wh-ih;
			}else{
				l=(ww-iw)/2; t=(wh-ih)/2;
			}
		}
		img.animate({width:iw,height:ih,left:l,top:t},500);
		Imgs.fit=!Imgs.fit;
		Cookie.put('_ts_fit',Imgs.fit);
	},
	adjust:function(){
		if(Imgs.curr>=0){
			if(images[Imgs.curr].video)
				Video.center($('#images>.current>.player'));
			else
				Imgs.fitWindow($('#images>.current>img'));
		}
	},
	find:function(n){
		var f,p;
		for(var i=0; i<images.length; i++){
			p=images[i].file.lastIndexOf('/');
			f=(p>0)?images[i].file.substr(p+1):images[i].file;
			if(f===n) return i;
		}
		return -1;
	}			
};

var Share = {
	div:null,
	over:false,
	init:function(){
		var d=$('#header #share');
		if(d.length){
			d=d.eq(0);
			var u=encodeURIComponent(window.location.href.split('\#')[0]);
			var t=$('#header h1').text();
			d.after('<div id="shares">'+Share.get(u,t,true)+'</div>')
			Share.div=$('#shares');
			d.mouseenter(function(){Share.div.fadeIn();}).mouseleave(function(){if(!Share.over) Share.div.fadeOut();});
			Share.div.hover(function(){Share.over=true;Share.div.stop(true,true).show();},function(){Share.over=false;Share.div.fadeOut();});
		}
	},	
	get:function(u,t,f){
		return (share.facebook?('<a href="http://www.facebook.com/sharer.php?u='+u+'&t='+t+'" target="_blank" title="'+text.shareOn+' Facebook"><img src="'+resPath+'/s_facebook.png" alt="Facebook" />'+(f?' FaceBook':'')+'</a>'):'') +
			(share.twitter?('<a href="http://twitter.com/home?status='+encodeURIComponent(text.checkOutThis)+': '+u+'" target="_blank" title="'+text.shareOn+' Twitter"><img src="'+resPath+'/s_twitter.png" alt="Twitter" />'+(f?' Twitter':'')+'</a>'):'') +
			(share.digg?('<a href="http://digg.com/submit?url='+u+'" target="_blank" title="'+text.shareOn+' Digg"><img src="'+resPath+'/s_digg.png" alt="Digg" />'+(f?' Digg':'')+'</a>'):'') +
			(share.delicious?('<a href="http://delicious.com/save?url='+u+'&title='+t+'&v=5" target="_blank" title="'+text.shareOn+' Delicious"><img src="'+resPath+'/s_delicious.png" alt="Delicious" />'+(f?' Delicious':'')+'</a>'):'') +
			(share.myspace?('<a href="http://www.myspace.com/index.cfm?fuseaction=postto&t='+t+'&u='+u+'&l=3" target="_blank" title="'+text.shareOn+' MySpace"><img src="'+resPath+'/s_myspace.png" alt="MySpace" />'+(f?' MySpace':'')+'</a>'):'') +
			(share.stumbleupon?('<a href="http://www.stumbleupon.com/submit?url='+u+'&title='+t+'" target="_blank" title="'+text.shareOn+' Stumbleupon"><img src="'+resPath+'/s_stumbleupon.png" alt="Stumbleupon" />'+(f?' StumbleUpon':'')+'</a>'):'') +
			(share.email?('<a href="mailto:?subject='+encodeURIComponent(text.checkOutThis)+'&body='+t+'%0D%0A'+u+'" title="'+text.shareOn+' Mail"><img src="'+resPath+'/s_email.png" alt="Email" />'+(f?' Email':'')+'</a>'):'');
	},
	getCurrent:function(ci){
		var u=encodeURIComponent(window.location.href), t=encodeURIComponent(ci.caption.stripHTML().trim());
		var s=Share.get(u,t,false);
		return s.length?('<div class="shares">'+s+'&nbsp;Share</div>'):'';
	}	
};	
		
var Captions = {
	on:captionsOn,
	meta:false,
	map:false,
	shop:false,
	init:function(){
		var c=Cookie.get('_ts_info');
		if(c) this.on=(c!='false');
		Ctrl.setInfoBtn();
		this.meta=Cookie.getBoolean('_ts_meta');
		this.map=Cookie.getBoolean('_ts_map');
		this.shop=Cookie.getBoolean('_ts_shop');
	},
	toggle:function(){
		var b=$('#images>.current>.bottom');
		if(this.on) b.animate({bottom:-b.outerHeight()},500);
		else b.animate({bottom:0},500);
		Captions.on=!Captions.on;
		Cookie.put('_ts_info',this.on);
	},
	compile:function(ci){
		var c=ci.caption;
		var m=Share.getCurrent(ci);
		if(ci.link.length)
		m+='<a href="javascript:void(0)" id="original" title="'+text.download+': '+ci.size+'" class="btn download-icon">'+(ci.orig?text.original:text.hiRes)+'</a>';
		if(typeof ci.meta!=UNDEF){
			m+='<a href="javascript:void(0)" title="'+text.showExif+'" rel="meta" class="btn meta-icon">'+text.photoData+'</a>';
			c+='<div class="meta">'+ci.meta.cleanupHTML()+'</div>';
		}
		if(typeof ci.map!=UNDEF){
			m+='<a href="javascript:void(0)" title="'+text.showLocation+'" rel="map" class="btn map-icon">'+text.map+'</a>';
			c+='<div class="map">'+text.noGPS+'</div>';
		}
		if(typeof ci.shop!=UNDEF){
			m+='<a href="javascript:void(0)" title="'+text.buyThis+'" rel="shop" class="btn shop-icon">'+text.buyThis+'</a>';
			c+='<div class="shop">'+text.notForSale+'</div>';
		}
		//alert(m);
		return '<div class="bottom"><div class="caption"><div class="menu">'+m+'<span class="nr"><b>'+(Imgs.curr+1)+'</b>/'+Imgs.max+'</span></div>'+c+'<div class="clear"></div></div></div>';
	},
	prepare:function(to,ci){
		to.append(Captions.compile(ci));
		var b=to.find('.bottom');
		b.find('a#original').click(function(){
			window.open(ci.link,'Original','width=840,height=600,scrollbars=yes,resizable=yes,menubar=no,toolbar=no,directories=no,status=no,copyhistory=no');});
		if(typeof ci.meta!=UNDEF && Captions.meta) b.find('.caption>.meta').show();
		if(typeof ci.map!=UNDEF){
			var l=b.find('.caption>.map');
			if(Captions.map) l.show();
			Map.show(ci.map, l);
		}
		if(typeof ci.shop!=UNDEF){
			var l=b.find('.caption>.shop');
			l.empty();
			if(Captions.shop) l.show();
			Shop.show(ci, l);
		}
		if(!Captions.on){
			to.css({opacity:0}).show();
			b.css({bottom:-b.outerHeight()});
			to.hide().css({opacity:1});
		}
		b.find('.caption>.menu a').each(function(){
			var rel=$(this).attr('rel');
			Hints.add($(this));
			if(typeof Captions[rel]!=UNDEF && Captions[rel]) $(this).addClass('active');
		}).click(function(){
			var rel=$(this).attr('rel');
			if(rel){
				b.find('.'+rel).slideToggle(200);
				if(typeof Captions[rel]!=UNDEF){
					$(this).toggleClass('active');
					Captions[rel]=!Captions[rel];
					Cookie.put('_ts_'+rel,Captions[rel]);
				}
				return false;
			}
		});
	}
};

var Map = {
	map:null,
	zoom:null,
	type:null,
	blueIcon:null,
	init:function(){
		if(typeof map==UNDEF) return;
		Map.zoom=map.zoom;
		switch(map.type){
			case 'Satellite':Map.type=G_SATELLITE_MAP;break;
			case 'Hybrid':Map.type=G_HYBRID_MAP;break;
			case 'Terrain':Map.type=G_PHYSICAL_MAP;break;
		}
		blueIcon=new GIcon(G_DEFAULT_ICON);
		blueIcon.image="http://maps.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png";
		blueIcon.iconSize=new GSize(32,32);
	},
	show:function(coords,l){
		Map.hide();
		if(GBrowserIsCompatible()){
			var ll=new GLatLng(coords.lat,coords.lon);
			var marker,options;
			var mw=l.width()||($('#images .swap .caption').width())||($('#thumbs').width()-30), mh=l.height()||240;
			Map.map=new GMap2(l[0],{size:new GSize(mw,mh)});
			Map.map.setCenter(ll,Map.zoom);
			Map.map.setMapType(Map.type);
			if(map.all)
				for(var i in images){
					if(images[i].map && i!=Imgs.curr){
						options={title:images[i].thmcapt.stripHTML().trim(),icon:blueIcon};
						marker=new GMarker(new GLatLng(images[i].map.lat,images[i].map.lon),options);
						marker.num=i;
						GEvent.addListener(marker,'click',function(){ 
							Map.saveConfig(); 
							Imgs.go(parseInt(this.num)); 
						});
						Map.map.addOverlay(marker);
					}
				}
			marker=new GMarker(new GLatLng(coords.lat,coords.lon),{zIndexProcess:function(){ return 9999; }});
			Map.map.addOverlay(marker);
			Map.map.setUIToDefault();
		}
	},
	hide:function(){
		if(Map.map){
			Map.saveConfig();
			GUnload();
			Map.map=null;
		}
	},
	saveConfig:function(){
		Map.zoom=Map.map.getZoom();
		Map.type=Map.map.getCurrentMapType();
	}
};

var Shop = {
	div:null,
	getOptions:function(o){
		var s="";
		var o=o.split('::');
		for(var i in o){
			d=o[i].split('=');
			s+='<option value="'+d[1]+'">'+d[0]+' ('+shop.c+' '+d[1]+')</option>';
		}
		return s;
	},
	show:function(ci,l){
		this.div=l;
		l.append('<form name="paypal" target="ShoppingCart" action="https://www.paypal.com/cgi-bin/webscr/" method="post">'+
			'<input type="hidden" name="cmd" value="_cart" />'+
			'<input type="hidden" name="add" value="1" />'+
			'<input type="hidden" name="business" value="'+shop.id.replace('|','@')+'" />'+
			'<input type="hidden" name="currency_code" value="'+shop.c+'" />'+
			((typeof shop.h!=UNDEF)?('<input type="hidden" name="handling_cart" value="'+shop.h+'" />'):'')+
			'<input id="shopName" type="hidden" name="item_name" value="" />'+
			'<input type="hidden" name="item_number" value="'+title+' :: '+ci.file.replace('slides/','')+'" />'+
			text.buyThis+': <select id="shopSelect">'+this.getOptions(ci.shop)+'</select>'+
			'<input id="shopQuantity" type="text" name="quantity" value="1" size="2" />pc(s) &times;'+
			'<input id="shopAmount" type="text" name="amount" readonly="readonly" value="1" size="3" />'+shop.c+
			'<input id="shopShipping" type="hidden" name="shipping" value="0" />'+
			'<input id="shopAdd" type="image" name="submit" src="https://www.paypal.com/en_US/i/btn/btn_cart_SM.gif" alt="Add to Cart" /></form>');
		l.append('<form class="view" target="ShoppingCart" name="paypalview" action="https://www.paypal.com/cgi-bin/webscr/" method="post">'+
			'<input type="hidden" name="cmd" value="_cart" />'+
			'<input type="hidden" name="business" value="'+shop.id.replace('|','@')+'" />'+
			'<input type="hidden" name="display" value="1" />'+
			'<input id="shopView" type="image" name="submit" src="https://www.paypal.com/en_US/i/btn/btn_viewcart_SM.gif" alt="View Cart" /></form>');
		l.append('<div class="clear"></div>');
		var l1=l.find('#shopSelect>option').eq(0);
		var p=l1.val().split('+');
		l.find('#shopName').val(l1.text());
		l.find('#shopAmount').val(p[0]).focus(function(){$(this).blur();return false;});
		if(p.length>0) l.find('#shopShipping').val(p[1]);
		l.find('#shopSelect').change(function(){
			var l=$(this).parent('form');
			var p=$(this).val().split('+');
			l.find('#shopAmount').val(p[0]);
			if(p.length>0) l.find('#shopShipping').val(p[1]);
			l.find('#shopName').val($(this).find('option:selected').text());
		});
		l.find('#shopAdd,#shopView').click(function(){
			window.open('','ShoppingCart','width=840,height=600,scrollbars=yes,resizable=yes,menubar=no,toolbar=no,directories=no,status=no,copyhistory=no');});
	}
};

var Hints = {
	init:function(){
		$('a.showhint,div.showhint,ul.showhint>li').each(function() {Hints.add($(this));});
	},
	add:function(to,txt){
		if(typeof txt=='undefined') {
			txt=to.attr('title');
			to.removeAttr('title');
		}
		if(txt.length){
			to.data('hint',txt.cleanupHTML()).hover(function(){
				$('body').append('<div id="hint">'+to.data('hint')+'</div>');
				var h=$('#hint');
				var o=to.offset();
				var t=(o.top>$(window).height()/3)?(o.top-10-h.outerHeight()):(o.top+to.outerHeight()+10);
				var l=Math.round(o.left+(to.outerWidth()-h.outerWidth())/2);
				if((t+h.outerHeight())>$(window).height())
					t=Math.max(o.top-10-h.outerHeight(),0);
				if((l+h.outerWidth())>$(window).width())
					l=Math.max($(window).width()-h.outerWidth(),0);
				h.css({left:l,top:t}).fadeIn();
			},function(){$('#hint').remove()});
		}
	}
};

var Alert = {
	show:function(text,buttons){
		$('#modal').remove();
		$('body').append('<div id="modal"><div class="panel">'+text+'<div class="buttons"></div></div></div>');
		var b=$('#modal .buttons');
		for(var i in buttons){
			var a=$('<a href="javascript:void(0)">'+buttons[i].t+'</a>').appendTo(b);
			if(typeof buttons[i].h !== UNDEF) a[0].handler=buttons[i].h;
		}
		b.find('a').click(function(){
			if(this.handler) this.handler.call();
			Alert.close();
			return false;
		}).eq(0).addClass('active');
		$('#modal').fadeIn(250);
	},
	prev:function(){
		var b=$('#modal .buttons a');
		var s=$('#modal .buttons a.active');
		var n=(b.index(s)-1);
		if(n===-1) n=b.length-1;
		b.each(function(i){$(this).toggleClass('active',i===n)});
	},
	next:function(){
		var b=$('#modal .buttons a');
		var s=$('#modal .buttons a.active');
		var n=(b.index(s)+1)%b.length;
		b.each(function(i){$(this).toggleClass('active',i===n)});
	},
	close:function(){
		$('#modal').fadeOut(250,function(){$(this).remove();});
	},
	select:function(){
		var s=$('#modal .buttons a.active')[0];
		if(s.handler) s.handler.call();
		Alert.close();
	}
};
		
var Help = {
	init:function(){
		$('.showhelp').click(function(){$(Imgs.on?'#helpimage':'#helpsplash').show();$('#help').fadeIn(500);});
		$('#help .close a').click(function(){Help.hide();});
		$('#help h2>a').click(function(){$('#helpimage,#helpsplash').toggle();return false;});
	},
	showImage:function(){
		$('#helpimage').show();$('#help').fadeIn(500);
	},
	showSplash:function(){
		$('#helpsplash').show();$('#help').fadeIn(500);
	},
	hide:function(){
		if($('#help').is(':visible'))
			$('#help').fadeOut(500,function(){$('#helpimage,#helpsplash').hide();});
	}
};

var Audio = {
	init:function(){
		if(typeof audio!=UNDEF && audio.files.length>0) {
			var src=resPath+'/mp3play.swf?files='+unescape(encodeURIComponent(audio.files))+'&auto='+audio.auto+'&loop='+audio.loop;
			if($.browser.msie)
				$('body').append('<div id="mp3player"><object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" width="60" height="20" id="mp3play">'+
				'<param name="allowScriptAccess" value="sameDomain" />'+
				'<param name="movie" value="'+src+'" />'+
				'<param name="quality" value="high" />'+
				'<param name="wmode" value="transparent"></object></div>');
			else
				$('body').append('<div id="mp3player"><embed src="'+src+'" quality="high" width="60" height="20" name="mp3play"'+
				' wmode="transparent" allowScriptAccess="sameDomain" type="application/x-shockwave-flash"'+
				' pluginspage="http://www.adobe.com/go/getflashplayer" /></div>');
		}
	}
};

var Video = {
	flvPlayer:null,
	add:function(to,ci){
		var mtype=new Array(".avi.mp3", ".qt.mov.mpg.mpeg.mpe.aiff", ".wmv.wma.asf", ".swf", ".flv.mp4.divx.xvid" );
		var i;
		var ext=ci.link.substr(ci.link.lastIndexOf('.')).toLowerCase();
		for(i=0; i<mtype.length; i++)
			if(mtype[i].indexOf(ext)!=-1) break;
		if(i==0)
			i=(navigator.userAgent.indexOf('Macintosh')!=-1)? 1:2;
		to.append('<div class="player"></div>');
		var div=to.find('.player');
		Video.center(div);
		if(i!=4) Imgs.stop();
		switch(i){
			case 1:
				div.addClass('qtplayer').append('<object '+
				($.browser.msie?'classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B" codebase="http://www.apple.com/qtactivex/qtplugin.cab#version=6,0,2,0" ':
					('type="video/quicktime" data="'+ci.link+'" '))+
				'width="'+video.width+'" height="'+video.height+'" id="QuickTimePlayer">'+
				'<param name="src" value="'+ci.link+'" />'+
				'<param name="autoplay" value="'+video.auto+'" />'+
				'<param name="scale" value="tofit" /></object>');
				break;
			case 2:
				div.addClass('wmplayer').append('<object '+
				($.browser.msie?'classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6" ':('type="video/x-ms-wmv" data="'+ci.link+'" '))+
				'width="'+video.width+'" height="'+video.height+'" id="MediaPlayer">'+
				($.browser.msie?('<param name="URL" value="'+ci.link+'" />'):'')+
				'<param name="src" value="'+ci.link+'" />'+
				'<param name="AutoStart" value="'+(video.auto?'1':'0')+'" />'+
				'<param name="StretchToFit" value="1" /></object>');
				break;
    		case 3:
				div.addClass('swfplayer').append('<object '+
				($.browser.msie?'classid="CLSID:D27CDB6E-AE6D-11CF-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0"':
					('type="application/x-shockwave-flash" data="'+ci.link+'"'))+
				' width="'+video.width+'" height="'+video.height+'" id="videoplayer" align="middle">'+
				'<param name="allowScriptAccess" value="sameDomain" /><param name="allowFullScreen" value="true" />'+
				'<param name="movie" value="'+ci.link+'" /><param name="quality" value="high" />'+
				'<param name="bgcolor" value="#000000" /><param name="wmode" value="opaque" /></object>');
				break;
			case 4:
				$('#flvplayer').remove();
				Imgs.suspendLoop();
				div.addClass('flvplayer').attr('id','flvplayer');
				var so=new SWFObject(resPath+'/player.swf','player',video.width,video.height+24,'9',$('#images').css('background-color').rgb2hex());
				if(so){
					so.addParam('allowfullscreen','true'); 
					so.addParam('wmode','opaque'); 
					so.addParam('allowscriptaccess','always');
					var cb=$('body').css('background-color').rgb2hex();
					var cf=$('body').css('color').rgb2hex();
					so.addParam('flashvars','file=../'+relPath+ci.link+'&autostart='+video.auto+'&playerready=Video.ready&backcolor='+cb+'&screencolor='+cb+'&frontcolor='+cf+'&lightcolor='+cf);
					so.write('flvplayer');
				}
				break;
			default:
				div.addClass('otherplayer').append('<embed src="'+ci.link+'" autostart="'+video.auto+'" width="'+video.width+'" height="'+video.height+'" loop="false"></embed>');
		}
	},
	ready:function(obj){
		Video.flvPlayer=document.getElementById(obj['id']);
		Video.flvPlayer.addModelListener('STATE','Video.stateHandler');
	},
	stateHandler:function(obj){
		if(obj.newstate=='COMPLETED'){
			Imgs.resumeLoop();
		}
	},
    center:function(div){
		var ww=Imgs.div.width(), wh=Imgs.div.height();
		if(ww==0||wh==0) {ww=$(window).width();wh=$(window).height();}
    	div.css({left:Math.round((ww-video.width)/2),top:Math.round((wh-video.height)/2)});
	}
};

var History = {
	setUrl:function(n){
		if(Imgs.on&&(typeof n==='number')){
			if(numberLinks){
				window.location.hash=n+1;
			}else{
				var f=images[n].file.lastIndexOf('/');
				window.location.hash=(f>0)?images[n].file.substr(f+1):images[n].file;
			}
		}else
			window.location.hash='';
		if(typeof _ja_W!=UNDEF && _ja_W.ReloadBar)
  			_ja_W.ReloadBar();
	},
	init:function(){
		var n,p=window.location.href.split('\#');
		if(p.length>1){
			if(n=parseInt(p[1]))
				return Math.minMax(0,n-1,Imgs.max-1);
			else
				return Imgs.find(p[1]);
		}
		return -1;
	}
};

var Keyboard = {
	init:function(){
		$(document).keydown(Keyboard.handler);
	},
	handler:function(e){
		if(typeof _jaWidgetFocus!=UNDEF&&_jaWidgetFocus || document.activeElement.nodeName=='INPUT') return true;
		var k=e?e.keyCode:window.event.keyCode; //alert(k);
		if($('#modal').length){
			switch(k){ 
				case 13: case 10: Alert.select(); break; 
				case 39: Alert.next(); break;
				case 37: Alert.prev(); break;
				case 27: Alert.close(); break;
				default: return true;
			}
		}else if(Imgs.on){
	  		switch(k) {
	  			case 38: Ctrl.goUp(); break;
				case 39: Ctrl.hide(); Imgs.next(); break;
				case 37: Ctrl.hide(); Imgs.prev(); break;
				case 106: case 179: if(Imgs.to) Imgs.stop(); else Imgs.start(250); break;
				case 109: Captions.toggle(); Ctrl.setInfoBtn(); Thumbs.toggle(); Ctrl.setThumbsBtn(); break
				case 107: Imgs.toggleFit(); Ctrl.setFitBtn(); break;
				case 112: Help.showImage(); break;
				case 27: Help.hide(); break;
				default: return true;
			}
		}else{
	  		switch(k) {
	  			case 38: Ctrl.goParent(); break;
				case 106: case 179: Splash.startShow(); break;
				case 112: Help.showSplash(); break;
				case 27: Help.hide(); break;
				default: return true;
			}
		}
		return false;
	}
};

$(document).ready(function(){
	Imgs.max=images.length;
	Hints.init();
	Help.init();
	
	Splash.div=$(C.SPSH);
	Splash.div=$(C.SPSH);
	Splash.hed=$(C.HEAD);
	Splash.gal=$(C.GALS);
	Splash.gac=$(C.GALC);
	Splash.ftr=$(C.FOOT);
	Splash.thm=$(C.THMS);
	Thumbs.div=$(C.THMB);
	Thumbs.bck=$(C.BACK);
	Thumbs.thm=$(C.THMC);
	Thumbs.thc=$(C.THMBC);
	Ctrl.div=$(C.CTRL);
	Imgs.div=$(C.IMGS);
	
	if(Splash.div.length){
		Splash.init();
		Share.init();
		$(window).resize(Splash.adjust);
	}
	if(images.length){
		if(typeof map!=UNDEF) Map.init();
		Navi.init();
		Ctrl.init();
		Captions.init();
		Thumbs.init();
		Imgs.init();
	}
	Audio.init();
	Keyboard.init();
	
	$('#likeFacebook').append('<iframe src="http://www.facebook.com/plugins/like.php?href='+encodeURIComponent(window.location.href.split('#')[0])+'&amp;layout=button_count&amp;show_faces=false&amp;width=110&amp;action=like&amp;font=arial&amp;colorscheme='+likeBtnTheme+'&amp;height=20" scrolling="no" frameborder="0" style="border:none;overflow:hidden;width:110px;height:20px;" allowTransparency="true"></iframe>');
	$('#tweetTwitter').append('<iframe allowtransparency="true" frameborder="0" scrolling="no" src="http://platform.twitter.com/widgets/tweet_button.html?url='+encodeURIComponent(window.location.href.split('#')[0])+'&text='+encodeURIComponent(document.title)+'" style="width:55px; height:20px;"></iframe>');
	$(document).unload(function(){Map.hide();});
	if($.browser.msie && $.browser.version<7){
		FixPng.init();
		if(level==0) setTimeout(function(){Alert.show('<h3>'+text.upgradeBrowser+'</h3><p>'+text.upgradeBrowserExplain+'</p>',new Array({t:text.contin,h:null}))},2000);
	}
});

