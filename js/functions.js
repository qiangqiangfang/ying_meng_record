var $window = $(window),
	gardenCtx, gardenCanvas, $garden, garden;
var clientWidth = $(window).width();
var clientHeight = $(window).height();
$(function() {
	$loveHeart = $("#loveHeart");
	var a = $loveHeart.width() / 2;
	var b = $loveHeart.height() / 2 - 55;
	$garden = $("#garden");
	gardenCanvas = $garden[0];
	gardenCanvas.width = $("#loveHeart").width();
	gardenCanvas.height = $("#loveHeart").height();
	gardenCtx = gardenCanvas.getContext("2d");
	gardenCtx.globalCompositeOperation = "lighter";
	garden = new Garden(gardenCtx, gardenCanvas);
	$("#content").css("width", $loveHeart.width() + $("#code").width());
	$("#content").css("height", Math.max($loveHeart.height(), $("#code").height()));
	$("#content").css("margin-top", Math.max(($window.height() - $("#content").height()) / 2, 10));
	$("#content").css("margin-left", Math.max(($window.width() - $("#content").width()) / 2, 10));
	setInterval(function() {
		garden.render()
	}, Garden.options.growSpeed)
});
$(window).resize(function() {
	var b = $(window).width();
	var a = $(window).height();
	if (b != clientWidth && a != clientHeight) {
		location.replace(location)
	}
});

function getHeartPoint(c) {
	var b = c / Math.PI;
	var a = 19.5 * (16 * Math.pow(Math.sin(b), 3));
	var d = -20 * (13 * Math.cos(b) - 5 * Math.cos(2 * b) - 2 * Math.cos(3 * b) - Math.cos(4 * b));
	return new Array(offsetX + a, offsetY + d)
}

function startHeartAnimation(x,y) {
	garden.createRandomBloom(x, y);
}

function startFullHeartAnimation() {
	var interval = 50;
	var angle = 10;
	var heart = new Array();
	var animationTimer = setInterval(function () {
		var bloom = getHeartPoint(angle);
		var draw = true;
		for (var i = 0; i < heart.length; i++) {
			var p = heart[i];
			var distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
			if (distance < Garden.options.bloomRadius.max * 1.3) {
				draw = false;
				break;
			}
		}
		if (draw) {
			heart.push(bloom);
			garden.createRandomBloom(bloom[0], bloom[1]);
		}
		if (angle >= 30) {
			clearInterval(animationTimer);
			showMessages();
		} else {
			angle += 0.2;
		}
	}, interval);

              
    //context.clearRect(0, 0, $("#garden").width, $("#garden").height);
    
}

function adjustByDevice(){
	        if(!isPc()){
		        $("#tree_left").css("top", $("#garden").position().top+295);
		        $("#tree_right").css("top", $("#garden").position().top+295);
	        }
        }

		


function isPc(){
	var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone", "Windows Phone"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}




function drawtree (ctx,startx,starty,length,angle,depth,branchWidth){
	        var rand=Math.random,
	        n_length,n_angle,n_depth,maxbranch=6,
	        endx,endy,maxangle=1.5*Math.PI / 4;
	        var subbranch;
	        ctx.beginPath();
	        ctx.moveTo(startx,starty);
	        endx=startx + length * Math.cos(angle);
	        endy=starty + length * Math.sin(angle);
	        ctx.lineCap='round';
	        ctx.lineWidth=branchWidth;
	        ctx.lineTo(endx,endy);
	        if(depth<=1){
	            //树的枝干
	            ctx.strokeStyle= 'rgb(0,' + (((rand() * 64) +128) >>0) + ',0)';
	        }
	        else{
	            //树的叶子
	            ctx.strokeStyle= 'rgb(0,' + (((rand() * 64) +64) >>0) + ',50,25)';
	        }
	        ctx.stroke();
	        n_depth = depth-1;
	        //判断树是否结束
	        if(!n_depth){
	            return;
	        }
	        subbranch= (rand() * (maxbranch-1)) + 1;
	        branchWidth *=0.7; 
	        for(var i=0;i<subbranch;i++){
	            n_angle = angle +rand() * maxangle -maxangle *0.5;
				n_length = length * (0.5 + rand() *0.5);
				if(depth<=1) {
					n_angle = 0;
					n_length = length;
				};
	            setTimeout(function (){
	                drawtree(ctx,endx,endy,n_length,n_angle,n_depth,branchWidth);
	                return;
	            }, 500)
	        }
	}




(function(a) {
	a.fn.typewriter = function() {
		this.each(function() {
			var d = a(this),
				c = d.html(),
				b = 0;
			d.html("");
			var e = setInterval(function() {
				var f = c.substr(b, 1);
				if (f == "<") {
					b = c.indexOf(">", b) + 1
				} else {
					b++
				}
				d.html(c.substring(0, b) + (b & 1 ? "_" : ""));
				if (b >= c.length) {
					clearInterval(e)
				}
			}, 125)
		});
		return this
	}
})(jQuery);

function timeElapse(start) {


	var current = new Date();
	//总秒数
	var millisecond = Math.floor((current.getTime() - start.getTime())/1000);
	
	//总天数
	var allDay = Math.floor(millisecond/(24*60*60));
 
	//注意同getYear的区别
	var startYear = start.getFullYear();
	var currentYear = current.getFullYear();
	
	//闰年个数
	var leapYear = 0;
	for(var i=startYear;i<currentYear;i++){
		if(isLeapYear(i)){
			leapYear++;
		}
	}
 
	//年数
	var year = Math.floor((allDay - leapYear*366)/365 + leapYear);;
	//天数
        var day;
        if(allDay > 366){
	        day = (allDay - leapYear*366)%365;
        }else{
                day = allDay;
        }
	//取余数(秒)
	var remainder = millisecond%(24*60*60);
	//小时数
	var hour = Math.floor(remainder/(60*60));
	//分钟数
	var minute = Math.floor(remainder%(60*60)/60);
	//秒数
	var second = remainder - hour*60*60 - minute*60; 


	var a = '<span class="digit">'+ year+ '</span> years <span class="digit">'+ day + '</span> days <span class="digit">' + hour + '</span> hours <span class="digit">' + minute + '</span> minutes <span class="digit">' + second + "</span> seconds";
	$("#elapseClock").html(a)
}
function showMessages() {
	adjustWordsPosition();
	$("#messages").fadeIn(20000, function() {
		showLoveU()
	})
}

function adjustWordsPosition() {
	$("#words").css("position", "absolute");
	$("#words").css("top", $("#garden").position().top + 450);
	$("#words").css("left", $("#garden").position().left+350)
}

function adjustLanrenPosition() {
	$("#lanren").css("position", "absolute");
	$("#lanren").css("top", $("#garden").position().top);
	$("#lanren").css("left", $("#garden").position().left)
}

function adjustTree_leftPosition() {
	$("#tree_left").css("position", "absolute");
	$("#tree_left").css("top", $("#garden").position().top+35);
	$("#tree_left").css("left", $("#garden").position().left+17)
}

function adjustTree_rightPosition() {
	$("#tree_right").css("position", "absolute");
	$("#tree_right").css("top", $("#garden").position().top+35);
	$("#tree_right").css("left", $("#garden").position().left+890)
}

function adjustCodePosition() {
	$("#code").css("margin-top", ($("#garden").height() - $("#code").height()) / 2)
}

function showLoveU() {
	$("#loveu").fadeIn(20500)
};

function typecode() {
	$("#code").css('display','block'); 
	adjustCodePosition();
	$("#code").typewriter();
};

//判断是否是闰年
function isLeapYear(year){
	if((year%4==0 && year%100!=0)||(year%100==0 && year%400==0)){
		return true;
	}
	return false;
};

