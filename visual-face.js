'use strict';
// 脸型与五官图鉴。写法见 visual-guide.js 开头。
// 下面 5 张脸型示意图是本项目自己画的线稿；真实例图继续往后加。
(function(){
 const shapes={
  oval:['椭圆脸','额头、颧骨和下巴过渡柔和，脸长略大于脸宽。','<ellipse cx="80" cy="100" rx="52" ry="72"/>'],
  round:['圆脸','脸长和脸宽接近，下颌圆润。','<ellipse cx="80" cy="100" rx="62" ry="64"/>'],
  square:['方脸','额头和下颌宽度接近，下颌转角明显。','<path d="M28 58Q30 34 80 32Q130 34 132 58L132 128Q130 162 104 170L56 170Q30 162 28 128Z"/>'],
  heart:['心形脸','额头较宽，向下逐渐收窄，下巴偏尖。','<path d="M80 176Q42 150 27 92Q22 38 80 34Q138 38 133 92Q118 150 80 176Z"/>'],
  long:['长脸','脸长明显大于脸宽，额头、颧骨和下颌宽度接近。','<rect x="38" y="16" width="84" height="168" rx="42"/>']
 };
 Object.entries(shapes).forEach(([type,[name,text,outline]])=>{
  GUIDE_FACE_TEXT[type]=text;
  VISUAL_ITEMS.push({group:'face',type,caption:`${name}示意图：${text}`,credit:'本项目绘制的示意图',svg:`<svg viewBox="0 0 160 200" role="img" aria-label="${name}轮廓示意图"><g class="guide-face-outline">${outline}</g><g class="guide-face-parts"><path d="M52 88Q62 82 72 88M88 88Q98 82 108 88"/><path d="M80 96L76 118Q80 122 84 118"/><path d="M68 138Q80 145 92 138"/></g></svg>`});
 });
})();
