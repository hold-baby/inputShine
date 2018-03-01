# inputShine
[demo](https://hold-baby.github.io/inputShine/)

#引入
```html
// 在页面引入js
<script type="text/javascript" src="dist/inputShine.min.js"></script>
```

```babel
var white = new inputShine("white", {
	shine : "white"
})
```
#opt
```js
inputShine(id, opt)
id: input的id
opt : {
	shine : "white" // 光点颜色
	textColor : "white" // 输入框字体颜色
	borderColor : "white" // 输入框边框颜色
}
// 颜色可选值：
white(默认), black, red, orange, yellow, green, young, blue,purple;
```
#注意
为使效果更好，建议背景色使用深色系。