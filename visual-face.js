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

// 真实照片来源与筛选边界见 docs/资料笔记/脸型与身材参考-2026-11-08.md。
VISUAL_ITEMS.push({
  "group": "face",
  "type": "oval",
  "image": "images/visual/face/demo/oval-69b56b340000000022024b68-01.jpg",
  "caption": "原帖将模特归为鹅蛋脸。正面照片可观察额头至下颌的过渡；图片中的模特不等于发布者。",
  "page": "https://www.xiaohongshu.com/explore/69b56b340000000022024b68",
  "credit": "原帖：@深圳｜知一美学；原帖分类参考",
  "sourceImageIndex": 1,
  "classificationBasis": "原帖分类",
  "authorization": "演示使用经项目用户允许；作者复用授权未取得"
});
VISUAL_ITEMS.push({
  "group": "face",
  "type": "oval",
  "image": "images/visual/face/demo/oval-6a4b4fd3000000000f030e68-01.jpg",
  "caption": "原帖以鹅蛋脸为题。仅作轮廓观察，拍摄角度、妆容及修图可能影响观感；不采用原帖美容效果主张。",
  "page": "https://www.xiaohongshu.com/explore/6a4b4fd3000000000f030e68",
  "credit": "原帖：@尸体呼吸机；原帖分类参考",
  "sourceImageIndex": 1,
  "classificationBasis": "原帖标题",
  "authorization": "演示使用经项目用户允许；作者复用授权未取得"
});
VISUAL_ITEMS.push({
  "group": "face",
  "type": "oval",
  "image": "images/visual/face/demo/oval-6a4b4fd3000000000f030e68-02.jpg",
  "caption": "原帖以鹅蛋脸为题。仅作轮廓观察，拍摄角度、妆容及修图可能影响观感；不采用原帖美容效果主张。",
  "page": "https://www.xiaohongshu.com/explore/6a4b4fd3000000000f030e68",
  "credit": "原帖：@尸体呼吸机；原帖分类参考",
  "sourceImageIndex": 2,
  "classificationBasis": "原帖标题",
  "authorization": "演示使用经项目用户允许；作者复用授权未取得"
});
VISUAL_ITEMS.push({
  "group": "face",
  "type": "round",
  "image": "images/visual/face/demo/round-6a4257b20000000016025a1e-01.jpg",
  "caption": "作者以圆脸为题分享淡妆。这三张来自同一人的同一篇笔记；刘海遮挡部分额头，不能据此测量脸型。",
  "page": "https://www.xiaohongshu.com/explore/6a4257b20000000016025a1e",
  "credit": "原帖：@忧郁窝窝头^；原帖分类参考",
  "sourceImageIndex": 1,
  "classificationBasis": "原帖自述",
  "authorization": "演示使用经项目用户允许；作者复用授权未取得"
});
VISUAL_ITEMS.push({
  "group": "face",
  "type": "round",
  "image": "images/visual/face/demo/round-6a4257b20000000016025a1e-02.jpg",
  "caption": "作者以圆脸为题分享淡妆。这三张来自同一人的同一篇笔记；刘海遮挡部分额头，不能据此测量脸型。",
  "page": "https://www.xiaohongshu.com/explore/6a4257b20000000016025a1e",
  "credit": "原帖：@忧郁窝窝头^；原帖分类参考",
  "sourceImageIndex": 2,
  "classificationBasis": "原帖自述",
  "authorization": "演示使用经项目用户允许；作者复用授权未取得"
});
VISUAL_ITEMS.push({
  "group": "face",
  "type": "round",
  "image": "images/visual/face/demo/round-6a4257b20000000016025a1e-03.jpg",
  "caption": "作者以圆脸为题分享淡妆。这三张来自同一人的同一篇笔记；刘海遮挡部分额头，不能据此测量脸型。",
  "page": "https://www.xiaohongshu.com/explore/6a4257b20000000016025a1e",
  "credit": "原帖：@忧郁窝窝头^；原帖分类参考",
  "sourceImageIndex": 3,
  "classificationBasis": "原帖自述",
  "authorization": "演示使用经项目用户允许；作者复用授权未取得"
});
VISUAL_ITEMS.push({
  "group": "face",
  "type": "square",
  "image": "images/visual/face/demo/square-6a0ae5240000000035028223-01.jpg",
  "caption": "作者自述方脸。观察下颌转折与脸部外轮廓；自拍角度会改变长宽比例。",
  "page": "https://www.xiaohongshu.com/explore/6a0ae5240000000035028223",
  "credit": "原帖：@周一周一；原帖分类参考",
  "sourceImageIndex": 1,
  "classificationBasis": "原帖自述",
  "authorization": "演示使用经项目用户允许；作者复用授权未取得"
});
VISUAL_ITEMS.push({
  "group": "face",
  "type": "square",
  "image": "images/visual/face/demo/square-6a0ae5240000000035028223-02.jpg",
  "caption": "作者自述方脸。观察下颌转折与脸部外轮廓；自拍角度会改变长宽比例。",
  "page": "https://www.xiaohongshu.com/explore/6a0ae5240000000035028223",
  "credit": "原帖：@周一周一；原帖分类参考",
  "sourceImageIndex": 2,
  "classificationBasis": "原帖自述",
  "authorization": "演示使用经项目用户允许；作者复用授权未取得"
});
VISUAL_ITEMS.push({
  "group": "face",
  "type": "heart",
  "image": "images/visual/face/demo/heart-69cd4eab000000002200c113-01.jpg",
  "caption": "原帖以心形脸和斜刘海为题。用于观察发型搭配；刘海遮住部分额头，不能作为精确脸型判定。",
  "page": "https://www.xiaohongshu.com/explore/69cd4eab000000002200c113",
  "credit": "原帖：@歪萌；原帖分类参考",
  "sourceImageIndex": 1,
  "classificationBasis": "原帖自述",
  "authorization": "演示使用经项目用户允许；作者复用授权未取得"
});
VISUAL_ITEMS.push({
  "group": "face",
  "type": "heart",
  "image": "images/visual/face/demo/heart-69cd4eab000000002200c113-02.jpg",
  "caption": "原帖以心形脸和斜刘海为题。用于观察发型搭配；刘海遮住部分额头，不能作为精确脸型判定。",
  "page": "https://www.xiaohongshu.com/explore/69cd4eab000000002200c113",
  "credit": "原帖：@歪萌；原帖分类参考",
  "sourceImageIndex": 2,
  "classificationBasis": "原帖自述",
  "authorization": "演示使用经项目用户允许；作者复用授权未取得"
});
VISUAL_ITEMS.push({
  "group": "face",
  "type": "long",
  "image": "images/visual/face/demo/long-6a786ce8000000002c004347-01.jpg",
  "caption": "作者自述长脸、长中庭，分享同一人的两张妆容照。仅参考轮廓和妆发搭配，不以照片测量比例。",
  "page": "https://www.xiaohongshu.com/explore/6a786ce8000000002c004347",
  "credit": "原帖：@珺珺珺予IVY；原帖分类参考",
  "sourceImageIndex": 1,
  "classificationBasis": "原帖自述",
  "authorization": "演示使用经项目用户允许；作者复用授权未取得"
});
VISUAL_ITEMS.push({
  "group": "face",
  "type": "long",
  "image": "images/visual/face/demo/long-6a786ce8000000002c004347-02.jpg",
  "caption": "作者自述长脸、长中庭，分享同一人的两张妆容照。仅参考轮廓和妆发搭配，不以照片测量比例。",
  "page": "https://www.xiaohongshu.com/explore/6a786ce8000000002c004347",
  "credit": "原帖：@珺珺珺予IVY；原帖分类参考",
  "sourceImageIndex": 2,
  "classificationBasis": "原帖自述",
  "authorization": "演示使用经项目用户允许；作者复用授权未取得"
});
VISUAL_ITEMS.push({
  "group": "face",
  "type": "long",
  "image": "images/visual/face/demo/long-6acf85cf0000000018011a73-01.jpg",
  "caption": "原帖面向方圆长脸提供淡妆参考。此处只借鉴妆发与轮廓的关系，不把发布者判定为标准长脸。",
  "page": "https://www.xiaohongshu.com/explore/6acf85cf0000000018011a73",
  "credit": "原帖：@陈制冷；原帖分类参考",
  "sourceImageIndex": 1,
  "classificationBasis": "原帖适用对象；非本人脸型结论",
  "authorization": "演示使用经项目用户允许；作者复用授权未取得"
});
