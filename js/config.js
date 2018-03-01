var PI_2, PI_180, MAX_LIFE, rgb, cssFile;

PI_2 = Math.PI / 2;
PI_180 = Math.PI / 180;
MAX_LIFE = 50;

/**
 * 光点色值配置
 */
rgb = {
	d : "255,255,255",  // 光点内部白色色值
	white : "231,244,255",
	black : "0,0,0",
	red : "247,32,16",
	orange : "255,152,0",
	yellow : "255,244,0",
	green : "173,255,47",
	young : "0,128,0",
	blue : "27,84,208",
	purple : "231,100,255"
}

/**
 * css样式内容
 */
cssFile = "cssFileContent";

var styles = document.getElementsByTagName("style");
var inpStyle;
for(var i = 0;i < styles.length; i++){
	if(styles[i].id == "inpShineStyle"){
		inpStyle = styles[i];
		break;
	}
}
if(typeof inpStyle == "undefined"){
	inpStyle = document.createElement("style");
	inpStyle.id = "inpShineStyle";
	inpStyle.innerHTML = cssFile;
	document.head.appendChild(inpStyle);
}

/**
 * Random
 */
var Random = {
	between: function(min, max) {
		return min + (Math.random() * (max - min));
	}
}

/**
 * 创建input.keyup
 */
 var inpKeyUp = function(el, opt){
 	var textColor = "rgb(" + (opt.textColor ? rgb[opt.textColor] : rgb.white) + ")";
 	var borderColor = "rgb(" + (opt.borderColor ? rgb[opt.borderColor] : rgb.white) + ")";
 	var classId = "_Shine" + Math.floor(Math.random() * 100000000);
 	var classContent = (
 			"input[shine=shine].keyup" + classId + " {"
 			+	"color:" + textColor + ";"
 			+	"text-shadow: 0 0 .125em " + textColor + ";"
 			+	"border-color:" + borderColor + ";"
 			+	"box-shadow: 0 0 .25em white,inset 0 0 .25em " + borderColor + ";"
 			+ "}"
 		);
	inpStyle.innerHTML = inpStyle.innerHTML + classContent;
 	el.classList.add(classId)
 	return classId
 }

export {
	PI_2,
	PI_180,
	MAX_LIFE,
	Random,
	rgb,
	inpKeyUp
}