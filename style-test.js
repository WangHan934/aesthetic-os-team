'use strict';
// 八大风格自测。三个维度都取 0–1：v 量感（0 小 → 1 大）、l 曲直（0 曲 → 1 直）、d 动静（0 静 → 1 动）。
// 题目结构参考形象设计领域常见的量感、曲直自测方法；坐标为本项目设定，不是标准答案。
const STYLES={
 girl:{name:'少女型',pos:{v:.18,l:.2,d:.65},axis:'小量感 · 曲线 · 偏动',words:['甜美','灵动','轻盈','可爱'],outfit:{shape:'短款、小廓形、收腰 A 字，上短下长更显比例。',fabric:'柔软轻薄：细针织、雪纺、细条灯芯绒。',pattern:'小碎花、小圆点、细格纹，图案尺寸宜小。',detail:'圆领、娃娃领、小荷叶边、小泡泡袖。',accessory:'小巧圆润的耳钉、发夹、小号包，玛丽珍鞋。',items:['短款针织开衫','A 字半裙','圆领小衬衫','玛丽珍鞋'],avoid:'大廓形硬挺西装、大面积几何图案和粗重金属配饰，容易压住轻盈感。'},makeup:{focus:'眼睛的圆润感和腮红，整体清透有光泽。',quick:'润色唇膏＋苹果肌腮红，眉毛顺着毛流梳理。',full:'圆形眼妆（眼线不拉长）、轻卧蚕、果冻感粉调唇色。',avoid:'拉长上挑的眼线和大面积修容。'},hair:{shape:'锁骨发、内扣短发、蓬松小卷或丸子头。',bang:'空气刘海、轻薄的弧形刘海。',avoid:'过长且贴头皮的直发、大背头。'},cases:['chloe-aw24','khaite-ss25-beauty']},
 boy:{name:'少年型',pos:{v:.2,l:.8,d:.7},axis:'小量感 · 直线 · 偏动',words:['清爽','利落','帅气','中性'],outfit:{shape:'直筒、H 型、短款，合身但不过大。',fabric:'棉、牛仔、挺括府绸、细针织。',pattern:'条纹、小格纹或纯色。',detail:'衬衫领、翻领、POLO 领、明线。',accessory:'小巧的几何耳钉、细表带手表、帆布包、乐福鞋。',items:['白衬衫','直筒牛仔裤','短款夹克','针织马甲'],avoid:'大荷叶边、蕾丝堆叠和繁复的蝴蝶结，和利落的线条不太协调。'},makeup:{focus:'眉毛平直、保留毛流，底妆清透干净。',quick:'梳眉＋润唇，局部遮瑕即可。',full:'浅棕平直短眼线、淡棕眼影、轻修容，唇色选裸色或豆沙。',avoid:'粉嫩圆润的腮红和亮片眼妆。'},hair:{shape:'短发、齐耳短发、锁骨直发。',bang:'利落短刘海，或无刘海侧分。',avoid:'大波浪长卷发。'},cases:['saint-laurent-ss25','khaite-ss25-beauty']},
 elegant:{name:'优雅型',pos:{v:.45,l:.28,d:.25},axis:'中量感 · 曲线 · 偏静',words:['温柔','知性','柔和','精致'],outfit:{shape:'合身收腰、中长款，肩线柔和。',fabric:'真丝、羊毛针织、垂坠雪纺、柔软羊绒。',pattern:'淡雅小花、细条纹、柔和渐变或纯色。',detail:'V 领、小翻领、柔和褶裥、腰间系带。',accessory:'珍珠、细链项链、中小号精致手袋，细跟鞋或尖头平底鞋。',items:['针织套装','垂感中长半裙','裹身裙','软料风衣'],avoid:'硬朗的工装、强对比撞色和粗犷做旧。'},makeup:{focus:'低饱和、柔和晕染，强调气色而不是线条。',quick:'柔雾底妆＋豆沙或玫瑰色唇。',full:'大地色或玫瑰色眼影晕染、细眼线、柔和微弧眉。',avoid:'锋利的眼线和高对比唇色。'},hair:{shape:'中长柔和的大波浪、低盘发、侧分。',bang:'侧分长刘海、八字刘海。',avoid:'很短的几何短发、过于蓬乱的造型。'},cases:['chloe-aw24','armani-ss25-beauty']},
 classic:{name:'古典型',pos:{v:.62,l:.55,d:.1},axis:'中量感 · 直曲均衡 · 静',words:['端庄','规整','大方','知性'],outfit:{shape:'合体、对称的正装剪裁，长度适中。',fabric:'精纺羊毛、挺括棉、真丝衬衫，质地细腻。',pattern:'纯色为主，细条纹、小千鸟格。',detail:'西装领、立领、整齐的纽扣、对称设计。',accessory:'简洁的小金属首饰、经典手表、结构感手袋，乐福鞋或中跟鞋。',items:['合身西装外套','白衬衫','直筒西裤或铅笔裙','经典风衣'],avoid:'大量破洞、夸张不对称和多层叠穿，会打乱秩序感。'},makeup:{focus:'干净完整，底妆细致，眉形规整。',quick:'均匀底妆＋梳整眉形＋饱和度适中的唇色。',full:'精致细眼线、大地色眼影，正红或豆沙唇。',avoid:'大面积晕染的烟熏妆和夸张亮片。'},hair:{shape:'整齐的低马尾、中长直发、利落发髻。',bang:'无刘海或侧分。',avoid:'凌乱的蓬松卷发。'},cases:['saint-laurent-ss25','armani-ss25-beauty']},
 natural:{name:'自然型',pos:{v:.5,l:.68,d:.55},axis:'中量感 · 偏直 · 松弛',words:['随性','舒展','松弛','亲切'],outfit:{shape:'宽松、直筒、落肩，略微 oversize。',fabric:'亚麻、棉、粗针织、麂皮、水洗牛仔。',pattern:'格纹、扎染、大地色纹理。',detail:'贴袋、卷边、开襟、自然褶皱。',accessory:'木质、皮革和编织包，粗一点的手链，乐福鞋或短靴。',items:['宽松衬衫','阔腿裤','粗针织开衫','工装外套'],avoid:'紧身精致的套装、闪亮材质和甜美蝴蝶结堆叠。'},makeup:{focus:'少量妆，保留皮肤和眉毛的原生感。',quick:'只梳一梳原生眉＋润色唇膏。',full:'薄底妆、大地色单色眼影、裸色唇。',avoid:'精雕的眉形和浓重的眼线。'},hair:{shape:'自然微卷、有层次的中长发、随意扎发。',bang:'微分碎刘海或无刘海。',avoid:'过于规整的发髻和硬定型。'},cases:['balenciaga-aw25-47','khaite-ss25-beauty']},
 avant:{name:'前卫型',pos:{v:.25,l:.75,d:.92},axis:'小中量感 · 直线 · 动',words:['个性','新潮','独特','有态度'],outfit:{shape:'不对称、解构、长短交错，有剪裁巧思。',fabric:'皮革、科技面料、金属光泽，软硬材质混搭。',pattern:'几何、撞色、抽象图案。',detail:'不对称领口、拉链、切口、层叠。',accessory:'几何金属首饰、个性眼镜、链条、厚底鞋。',items:['不对称上衣','短款机车夹克','工装阔腿裤','厚底鞋'],avoid:'传统端庄的成套正装、过多甜美元素，会削弱个性。'},makeup:{focus:'只做一处局部重点，其他部分保持干净。',quick:'干净底妆＋一处小重点，比如短而利落的眼线。',full:'图形眼线、彩色睫毛或局部亮片，三选一。',avoid:'全脸都浓，几个重点会互相抢。'},hair:{shape:'不对称短发、利落短发、挑染。',bang:'短刘海、斜刘海。',avoid:'中规中矩的长直发，容易显得平淡。'},cases:['balenciaga-aw25-47','dior-aw25-beauty']},
 romantic:{name:'浪漫型',pos:{v:.85,l:.2,d:.4},axis:'大量感 · 曲线',words:['妩媚','华丽','柔美','成熟'],outfit:{shape:'收腰、贴合身体曲线的 X 型，大裙摆。',fabric:'丝缎、天鹅绒、垂坠针织，有光泽的面料。',pattern:'大花朵、流动纹样、豹纹。',detail:'大 V 领、一字肩、大荷叶边、褶皱。',accessory:'大耳环、珍珠或宝石感首饰、曲线造型的配饰。',items:['裹身裙','收腰连衣裙','真丝衬衫','细带凉鞋'],avoid:'过小过碎的图案；硬朗的直线西装需要用柔软内搭来平衡。'},makeup:{focus:'眼妆晕染、睫毛浓密、唇色饱满。',quick:'有光泽的底妆＋玫瑰或浆果色唇。',full:'暖棕或玫瑰色眼影晕染、浓密睫毛、饱满唇形。',avoid:'平直锋利的线条妆。'},hair:{shape:'大波浪长发、蓬松卷发、侧分。',bang:'侧分长刘海或无刘海。',avoid:'线条很直的超短发。'},cases:['chloe-aw24','armani-ss25-beauty']},
 dramatic:{name:'戏剧型',pos:{v:.88,l:.8,d:.65},axis:'大量感 · 直线 · 偏动',words:['大气','有气场','醒目','夸张'],outfit:{shape:'大廓形、宽肩、长款，比例夸张。',fabric:'硬挺羊毛、皮革，厚重或高光泽的面料。',pattern:'大几何、强对比撞色、大块面。',detail:'大翻领、宽肩、大口袋、夸张袖型。',accessory:'大号金属首饰、大墨镜、大包。',items:['宽肩西装','长款大衣','阔腿裤','一件强色单品'],avoid:'小碎花、细小装饰和过于精巧的小饰品，容易被整体量感盖住。'},makeup:{focus:'结构感强，线条清晰，唇色鲜明。',quick:'底妆＋清晰的眉形＋正红或深色唇。',full:'拉长眼线、立体修容、高饱和唇色。',avoid:'过淡的妆，会让五官和衣服的存在感不平衡。'},hair:{shape:'大背头、利落长直发、高马尾、几何短发。',bang:'无刘海或长侧分。',avoid:'零碎的小卷和厚重的齐刘海。'},cases:['saint-laurent-ss25','dior-aw25-beauty']}
};
const STEPS=[
 {title:'量感',intro:'量感指脸和身体给人的“尺寸感”，和胖瘦无关。凭第一感觉选，拿不准就选“不确定”。'},
 {title:'曲直',intro:'曲直指线条是圆润柔和，还是平直有棱角。可以对着镜子，或看一张素颜正面照。'},
 {title:'动静与氛围',intro:'动静指五官给人的感觉是端正安静，还是灵动多变。氛围词可以问问身边的人。'},
 {title:'色彩',intro:'用来估计适合你的颜色倾向，在自然光下看更准。'},
 {title:'使用场景',intro:'前面的题目说明你“不费力”的方向；这一步决定这次要怎样用。'}
];
// [选项文字, 分值]；每题另有“不确定”，不计入计算。
const QUESTIONS=[
 {step:1,id:'face',dim:'v',title:'脸的整体大小与长度',opts:[['小而圆，或偏短',0],['鹅蛋形，比例适中',.5],['偏长或偏宽，轮廓舒展',1]]},
 {step:1,id:'features',dim:'v',title:'五官在脸上的占比',opts:[['小巧紧凑，留白多',0],['适中协调',.5],['大而舒展，存在感强',1]]},
 {step:1,id:'nose',dim:'v',title:'鼻子',opts:[['小巧，鼻梁不高',0],['适中',.5],['鼻梁高挺，有存在感',1]]},
 {step:1,id:'brow',dim:'v',title:'眉毛浓淡',opts:[['细、淡',0],['适中',.5],['浓、粗',1]]},
 {step:1,id:'height',dim:'v',title:'身高',opts:[['158 cm 以下',0],['158–165 cm',.5],['166 cm 以上',1]]},
 {step:1,id:'frame',dim:'v',title:'骨架（看手腕和肩）',opts:[['纤细、肩窄',0],['适中',.5],['手腕粗、肩宽或骨感明显',1]]},
 {step:2,id:'bone',dim:'l',title:'脸部的骨感与肉感',opts:[['圆润有肉感',0],['介于两者之间',.5],['骨骼轮廓清晰、有棱角',1]]},
 {step:2,id:'browShape',dim:'l',title:'眉形',opts:[['弧形，没有明显眉峰',0],['微微有弧度',.5],['平直，或眉峰锋利',1]]},
 {step:2,id:'eye',dim:'l',title:'眼型',opts:[['圆眼、杏眼，有弧度',0],['标准眼型',.5],['细长，或眼尾上扬',1]]},
 {step:2,id:'jaw',dim:'l',title:'下颌线',opts:[['圆润流畅',0],['微有弧度',.5],['棱角分明',1]]},
 {step:2,id:'lip',dim:'l',title:'嘴唇',opts:[['饱满圆润，唇峰不明显',0],['厚度适中',.5],['偏薄，唇线平直或唇峰锋利',1]]},
 {step:2,id:'body',dim:'l',title:'身体线条',opts:[['曲线明显，腰臀差大',0],['介于两者之间',.5],['线条平直，腰臀差小',1]]},
 {step:2,id:'faceShape',hairOnly:true,title:'脸型（只用于发型建议）',opts:[['椭圆脸','oval'],['圆脸','round'],['方脸','square'],['心形脸','heart'],['长脸','long']]},
 {step:3,id:'impression',dim:'d',title:'五官给人的第一印象',opts:[['端正规整',.05],['柔和安静',.25],['舒展随意',.6],['灵动活泼',.8],['独特，不容易归类',.95]]},
 {step:3,id:'expression',dim:'d',title:'平时的表情与眼神',opts:[['表情少，眼神安静',.1],['介于两者之间',.5],['表情丰富，眼神灵活',.9]]},
 {step:3,id:'words',vote:true,title:'朋友最常用哪个词形容你的外在感觉',opts:[['可爱甜美','girl'],['清爽帅气','boy'],['温柔知性','elegant'],['端庄大方','classic'],['随性松弛','natural'],['个性独特','avant'],['妩媚精致','romantic'],['大气有气场','dramatic']]},
 {step:4,id:'vein',axis:'warm',title:'手腕内侧的血管颜色',opts:[['偏蓝紫',-1],['蓝绿都有',0],['偏绿',1]]},
 {step:4,id:'metal',axis:'warm',title:'金色和银色饰品，哪个更衬你',opts:[['银色',-1],['差不多',0],['金色',1]]},
 {step:4,id:'sun',axis:'warm',title:'晒太阳之后',opts:[['容易泛红',-1],['先红后黑',0],['容易晒黑',1]]},
 {step:4,id:'depth',axis:'deep',title:'天然的发色与瞳色',opts:[['偏浅，浅棕或带黄调',0],['深棕',.5],['乌黑',1]]},
 {step:4,id:'contrast',axis:'deep',title:'发色与肤色之间的对比',opts:[['柔和，差别不大',0],['适中',.5],['强烈，像黑发配白皙皮肤',1]]},
 {step:4,id:'lipColor',axis:'both',title:'素颜时的唇色',opts:[['珊瑚、蜜桃色','1,0'],['浅粉、淡玫瑰色','-1,0'],['砖红、深棕色','1,1'],['紫红、深红色','-1,1']]}
];
const FACE_HAIR={oval:'椭圆脸：中分、侧分、法式或空气刘海基本都适合，按风格自由选择。',round:'圆脸：让头顶蓬松一些，侧分或不对称刘海能拉长比例；避开贴头皮的厚齐刘海。',square:'方脸：用卷度、轻薄刘海或有纹理的锁骨发，柔化下颌的线条。',heart:'心形脸：八字刘海或侧分刘海可以平衡额头；扎丸子头时留一点碎发。',long:'长脸：齐刘海、空气刘海或带卷度的中短发能缩短视觉长度；少用全部梳起的大背头。'};
// 直卷和齐刘海建议按风格给；发色按色彩季型给。均为本项目整理，待专业复核。
const HAIR_PLUS={
 girl:{texture:'蓬松微卷或内扣，发尾带一点弧度。',blunt:'可以尝试，选轻薄、透额的款式。'},
 boy:{texture:'直发或轻微纹理，少做大卷。',blunt:'短而利落的可以，厚重款不优先。'},
 elegant:{texture:'柔和的微卷或大波浪。',blunt:'不优先，侧分或八字刘海更柔和。'},
 classic:{texture:'顺滑直发，或发尾微微内扣。',blunt:'不优先；想尝试时选整齐的薄款。'},
 natural:{texture:'自然微卷或水洗纹理，不追求规整。',blunt:'不优先，微分碎刘海更松弛。'},
 avant:{texture:'直发或有棱角的层次，可以局部挑染。',blunt:'可以尝试，短款或斜剪更有个性。'},
 romantic:{texture:'大卷或流动的波浪。',blunt:'不优先，侧分长刘海更合适。'},
 dramatic:{texture:'顺直长发，或卷度很大的卷发。',blunt:'不优先，尤其是厚重款；可选长侧分。'}
};
const SEASON_HAIR={spring:'蜜糖棕、浅栗棕、暖金棕。',summer:'灰棕、冷棕、雾感深棕。',autumn:'焦糖棕、红棕、深栗色。',winter:'自然黑、冷黑、深冷棕，黑发通常最容易协调。'};
// 三维：判断规则为常见的身材分类经验，本项目整理，待专业复核。只用于选版型，不评价身材好坏。
const BODY_SHAPES={
 pear:{name:'梨形',desc:'臀围明显大于胸围',top:'上身可以多一点设计：一字领、方领、泡泡袖、浅色或有图案的上衣。',bottom:'A 字裙、高腰直筒裤和微喇裤，面料选有垂感的。',dress:'A 字裙、收腰伞裙。',care:'紧身浅色下装和臀部的大贴袋会把重点放在下半身；想平衡比例时可以换掉。'},
 hourglass:{name:'曲线型（沙漏）',desc:'胸臀接近，腰线明显',top:'V 领、裹身上衣、合身针织，保留腰线。',bottom:'高腰铅笔裙、高腰微喇裤。',dress:'裹身裙、收腰连衣裙。',care:'又直又宽的长款容易盖住腰线；穿时可以加腰带或把上衣束进去。'},
 h:{name:'H 型',desc:'胸、腰、臀差别不大',top:'可以穿利落的直筒款；想要腰线时，用短款上衣或束腰带做出层次。',bottom:'直筒裤、阔腿裤、百褶裙。',dress:'直筒连衣裙、衬衫裙，加腰带可以变化比例。',care:'如果想增加曲线，可以用腰部褶裥和有下摆的款式；喜欢直线感就不用改。'},
 inverted:{name:'倒三角',desc:'胸围或肩部明显大于臀围',top:'V 领、深一点的领口和简洁的肩线。',bottom:'阔腿裤、A 字裙、有体积或图案的下装。',dress:'上身简洁、裙摆展开的款式。',care:'垫肩、泡泡袖和一字领会继续加强上半身；想平衡比例时可以换掉。'},
 apple:{name:'O 型（苹果形）',desc:'腰围接近胸围和臀围',top:'V 领、垂感开衫和不贴身的前片，把视线引向上下方。',bottom:'露出腿部线条的直筒裤、铅笔裤或及膝裙。',dress:'高腰线或 A 字连衣裙，面料选有垂感的。',care:'腰部的宽腰带和堆叠褶皱会把重点放在腰间；按舒服程度选择。'}
};
function computeBody(f){const vals=['bust','waist','hip'].map(k=>f.get(k)==null?'':String(f.get(k)).trim());if(vals.every(x=>x===''))return null;const [b,w,h]=vals.map(Number);if(vals.some(x=>x==='')||[b,w,h].some(x=>!(x>=50&&x<=180)))return {invalid:true};const big=Math.max(b,h);let key='h';if(w/big>=.9)key='apple';else if(h-b>=5)key='pear';else if(b-h>=5)key='inverted';else if(w<=big*.75)key='hourglass';return {key,b,w,h};}
function bodyBlock(body,s){if(!body)return '<p class="quiet">在第 2 步填写胸围、腰围和臀围，这里会给出适合你身材的版型建议。</p>';if(body.invalid)return '<div class="detail-block"><h4>身材与版型</h4><p class="reason">三维要全部填写，范围是 50–180 厘米。请回到第 2 步检查后重新生成报告。</p></div>';const x=BODY_SHAPES[body.key];return `<div class="detail-block"><h4>身材与版型：${x.name}</h4><p>胸围 ${body.b} / 腰围 ${body.w} / 臀围 ${body.h} 厘米。${x.desc}。</p><dl class="spec"><dt>上装</dt><dd>${x.top}</dd><dt>下装</dt><dd>${x.bottom}</dd><dt>连衣裙</dt><dd>${x.dress}</dd></dl><p class="reason">留意：${x.care}</p><p class="quiet">搭配时，版型先看这里，面料、图案和配饰继续沿用上面的${s.name}方案。身材类型只用来选版型，没有好坏之分；三维只保存在这台设备上。</p></div>`;}
const PREFS=[
 {id:'scene',title:'你要去哪里',opts:[['日常出门','daily'],['上班与面试','work'],['看展与拍照','creative']]},
 {id:'intent',title:'想传达的感觉',opts:[['松弛亲近','relaxed'],['利落从容','composed'],['有点不一样','expressive']]},
 {id:'budget',title:'新增购买预算',opts:[['先不买','0'],['300 元以内','300'],['800 元以内','800']]},
 {id:'makeup',title:'妆容时间',opts:[['不化妆','0'],['约 5 分钟','5'],['约 15 分钟','15']]}
];
const PREF_DEFAULTS={scene:'daily',intent:'relaxed',budget:'0',makeup:'5'};
const SEASONS={
 spring:{name:'春季型',desc:'暖调、明亮',colors:[['珊瑚','#F08A6C'],['杏色','#F6C7A1'],['暖黄','#F2C14E'],['嫩绿','#9CCB6B'],['奶油白','#FFF4DC'],['浅驼','#D4A373']],avoid:'大面积纯黑、冷灰、深紫',lip:'珊瑚色、蜜桃色'},
 summer:{name:'夏季型',desc:'冷调、柔和',colors:[['雾霾蓝','#8EA9C9'],['薰衣草','#B8A9D9'],['玫瑰粉','#E3A6B4'],['浅灰','#C9CCD3'],['薄荷','#A8D5C2'],['灰紫','#9C8AA5']],avoid:'橙色、芥末黄、高饱和荧光色',lip:'豆沙粉、玫瑰色'},
 autumn:{name:'秋季型',desc:'暖调、浓郁',colors:[['驼色','#B8875B'],['焦糖','#A0522D'],['橄榄绿','#6B7B3A'],['砖红','#A8432F'],['芥末黄','#C9A227'],['深棕','#5C4033']],avoid:'冷粉、亮紫、荧光色',lip:'砖红、焦糖棕'},
 winter:{name:'冬季型',desc:'冷调、鲜明',colors:[['纯黑','#111111'],['纯白','#FFFFFF'],['正红','#C8102E'],['宝蓝','#1F3FA8'],['玫红','#C2185B'],['冰灰','#D9DEE5']],avoid:'土黄、橙棕等浑浊的中间色',lip:'正红、莓果色'}
};
const INTENTS={relaxed:{name:'松弛亲近',borrow:'natural',tip:'借自然型的一点松弛：换一件更宽松或更柔软的单品，降低整体的正式感。'},composed:{name:'利落从容',borrow:'classic',tip:'借古典型的秩序感：加一件合身外套或干净衬衫，让轮廓更清楚。'},expressive:{name:'有点不一样',borrow:'avant',tip:'借前卫型的一个细节：不对称、撞色或一件特别的配饰，只加一处。'}};
const STYLE_QS=QUESTIONS.filter(q=>q.step<4&&!q.hairOnly);
// 相近的流行说法，参考小红书笔记中“八大风格与流行风格”的常见对照整理。
const TRENDS={girl:['学院风','JK 风','甜酷风','元气少女'],boy:['中性风','运动风','BF 风','盐系'],elegant:['赫本风','法式优雅','静奢风','温柔知性'],classic:['英伦风','小香风','通勤精英','新中式'],natural:['森系','日杂风','法式田园','松弛感'],avant:['暗黑风','机车风','潮牌街头','未来感'],romantic:['港风','法式浪漫','复古华丽'],dramatic:['超模风','结构主义','大女主']};
const EMPTY_REPORT='<p class="report-empty">完成上面五步后，这里会生成你的风格报告：风格比例、坐标、色彩倾向，以及穿搭、妆容、发型方案。</p>';
let step=1;
const avg=a=>a.reduce((s,x)=>s+x,0)/a.length;
const level=(x,a,b,c)=>x<.35?a:x<.65?b:c;
const pct=x=>Math.round(x*100);
function answer(f,id){const x=f.get(id);return x===null||x===''?null:x;}
// 量感、曲直、动静分别取已答题目的平均值；按到各风格坐标的距离换算接近程度，氛围词给对应风格加权。
function computeStyle(f){const dims={v:[],l:[],d:[]};let answered=0;STYLE_QS.forEach(q=>{const x=answer(f,q.id);if(x===null)return;answered++;if(q.dim)dims[q.dim].push(Number(x));});const p={v:dims.v.length?avg(dims.v):.5,l:dims.l.length?avg(dims.l):.5,d:dims.d.length?avg(dims.d):.5};const vote=answer(f,'words');const raw=Object.entries(STYLES).map(([key,s])=>{const d2=(p.v-s.pos.v)**2+(p.l-s.pos.l)**2+(p.d-s.pos.d)**2;return {key,w:Math.exp(-d2/.0968)*(vote===key?1.8:1)};});const sum=raw.reduce((t,x)=>t+x.w,0);return {p,answered,ranked:raw.map(x=>({key:x.key,share:x.w/sum})).sort((a,b)=>b.share-a.share)};}
function computeColor(f){const warm=[],deep=[];QUESTIONS.filter(q=>q.axis).forEach(q=>{const x=answer(f,q.id);if(x===null)return;if(q.axis==='both'){const [w,d]=x.split(',').map(Number);warm.push(w);deep.push(d);}else (q.axis==='warm'?warm:deep).push(Number(x));});if(!warm.length&&!deep.length)return null;const w=warm.length?avg(warm):0,d=deep.length?avg(deep):.5;return {key:w>=0?(d<.5?'spring':'autumn'):(d<.5?'summer':'winter'),unsure:!warm.length||Math.abs(w)<.34};}
function choiceHTML(q,n){const opts=q.opts.map(([label,val])=>`<label><input type="radio" name="${q.id}" value="${val}"><span>${label}</span></label>`).join('');return `<fieldset><legend>${String(n).padStart(2,'0')} / ${q.title}</legend><div class="choice-group">${opts}<label class="unsure"><input type="radio" name="${q.id}" value=""><span>不确定</span></label></div></fieldset>`;}
function prefHTML(q){return `<fieldset><legend>${q.title}</legend><div class="choice-group">${q.opts.map(([label,val])=>`<label><input type="radio" name="${q.id}" value="${val}"${PREF_DEFAULTS[q.id]===val?' checked':''}><span>${label}</span></label>`).join('')}</div></fieldset>`;}
function renderTest(){$('#test-steps').innerHTML=STEPS.map(s=>`<li>${s.title}</li>`).join('');$('#test-body').innerHTML=STEPS.map((s,i)=>{const n=i+1;const body=n<5?QUESTIONS.filter(q=>q.step===n).map(q=>choiceHTML(q,QUESTIONS.indexOf(q)+1)).join(''):PREFS.map(prefHTML).join('')+'<fieldset><legend>舒适需求</legend><label class="check"><input type="checkbox" id="test-comfort" checked> 保留平底鞋与活动空间</label></fieldset>';const bodyFields=n===2?'<fieldset class="body-fields"><legend>三维（选填，用来推荐衣服版型）</legend><div class="body-inputs">'+[['bust','胸围'],['waist','腰围'],['hip','臀围']].map(([id,label])=>`<label>${label}<input type="number" name="${id}" min="50" max="180" step="0.5" inputmode="decimal" placeholder="厘米"></label>`).join('')+'</div><p class="quiet">软尺贴身水平测量，三项都填才能判断。不方便可以跳过，只保存在这台设备上。</p></fieldset>':'';return `<div class="test-step" data-step="${n}"><p class="step-intro">${s.intro}</p><div class="form-grid">${body}</div>${bodyFields}</div>`;}).join('');}
function showStep(n){step=n;document.querySelectorAll('.test-step').forEach(x=>x.hidden=Number(x.dataset.step)!==n);document.querySelectorAll('#test-steps li').forEach((li,i)=>{li.classList.toggle('active',i+1===n);li.classList.toggle('done',i+1<n);});$('#test-progress').textContent=`第 ${n} / ${STEPS.length} 步 · ${STEPS[n-1].title}`;$('#test-prev').hidden=n===1;$('#test-next').hidden=n===STEPS.length;$('#test-finish').hidden=n!==STEPS.length;}
// 答案和报告状态存在本机浏览器：打开小红书再返回、页面被系统重载时，都能恢复。
const SAVE_KEY='aesthetic-os-test-v1';
let reported=false;
function saveTest(){try{localStorage.setItem(SAVE_KEY,JSON.stringify({answers:[...new FormData($('#style-test')).entries()],comfort:$('#test-comfort').checked,step,reported}));}catch(e){}}
function clearSavedTest(){reported=false;try{localStorage.removeItem(SAVE_KEY);}catch(e){}}
function setAnswers(answers){document.querySelectorAll('#style-test input[type=radio]').forEach(i=>{if(i.name in answers)i.checked=answers[i.name]===String(i.value);});document.querySelectorAll('#style-test input[type=number]').forEach(i=>{if(i.name in answers)i.value=answers[i.name];});}
function restoreTest(){let saved=null;try{saved=JSON.parse(localStorage.getItem(SAVE_KEY));}catch(e){}if(!saved||!Array.isArray(saved.answers))return;setAnswers(Object.fromEntries(saved.answers));if(typeof saved.comfort==='boolean')$('#test-comfort').checked=saved.comfort;showStep(Math.min(Math.max(Number(saved.step)||1,1),STEPS.length));if(saved.reported){reported=true;renderReport(new FormData($('#style-test')));}}
// 给拍照分析模块用：传入 {题目id: 选项值}，把识别结果预填到题目里，用户仍可修改。
window.applyTestAnswers=function(answers){setAnswers(answers);saveTest();};
function goStep(n){showStep(n);saveTest();$('#style-test').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
// 坐标图上相邻风格的文字会重叠，只移动文字位置，不改变计算用的坐标。
const LABEL_SHIFT={boy:-8,avant:14,natural:-12};
function mapSVG(p,primary){const X=l=>40+l*240,Y=v=>32+v*236;return `<svg viewBox="0 0 320 300" role="img" aria-label="风格坐标：横轴从曲线到直线，纵轴从小量感到大量感"><line class="map-axis" x1="160" y1="24" x2="160" y2="276"/><line class="map-axis" x1="30" y1="150" x2="290" y2="150"/><text class="map-end" x="160" y="14">小量感</text><text class="map-end" x="160" y="296">大量感</text><text class="map-end" x="14" y="154">曲</text><text class="map-end" x="306" y="154">直</text>${Object.entries(STYLES).map(([k,s])=>`<text class="map-label${k===primary?' primary':''}" x="${X(s.pos.l)}" y="${Y(s.pos.v)+(LABEL_SHIFT[k]||0)}">${s.name}</text>`).join('')}<circle class="map-dot" cx="${X(p.l)}" cy="${Y(p.v)}" r="7"/><text class="map-you" x="${X(p.l)}" y="${Y(p.v)+22}">你</text></svg>`;}
function shareRow(label,x){return `<div class="share-row"><span>${label}</span><div class="bar"><i style="width:${pct(x)}%"></i></div><strong>${pct(x)}%</strong></div>`;}
function dimRow(name,x,left,right,label){return `<div class="dim-row"><span>${name}</span><div class="dim-track"><small>${left}</small><div class="dim-bar"><i style="left:${pct(x)}%"></i></div><small>${right}</small></div><strong>${label}</strong></div>`;}
function makeupText(m,time,season){if(time==='0')return '<p>你选择不化妆：做好护肤、顺一顺眉毛就够了，把重点留给发型和衣服。</p>';const lip=season?`按你的色彩倾向，唇色也可以试试${SEASONS[season.key].lip}。`:'';return `<p>重点：${m.focus}</p><p>约 5 分钟：${m.quick}${lip}</p>${time==='15'?`<p>约 15 分钟再加：${m.full}</p>`:''}<p class="reason">慎选：${m.avoid}</p>`;}
function renderReport(f){const r=computeStyle(f);if(r.answered<5){$('#report').innerHTML='<p class="report-empty">前三步的风格题至少要回答 5 道，才能计算倾向。拿不准的题可以问问身边的人。</p>';return;}const c=computeColor(f),top=r.ranked[0],second=r.ranked[1],s=STYLES[top.key],s2=STYLES[second.key],o=s.outfit;const pref={scene:f.get('scene'),intent:f.get('intent'),budget:f.get('budget'),makeup:f.get('makeup'),comfort:$('#test-comfort').checked};const it=INTENTS[pref.intent];const shown=r.ranked.slice(0,3).filter(x=>pct(x.share)>0);const restPct=100-shown.reduce((t,x)=>t+pct(x.share),0);const skipped=STYLE_QS.length-r.answered;const composite=second.share>=top.share*.7;const season=c&&SEASONS[c.key];const face=FACE_HAIR[answer(f,'faceShape')];
 const scene={daily:'日常出门：优先选择好走、方便活动的组合。',work:'上班与面试：先确认环境的正式程度，再试试坐下和抬手是否舒服。',creative:'看展与拍照：留意场地和走动，让一处细节成为画面重点。'}[pref.scene];
 const budget=pref.budget==='0'?'新增预算 0 元：先从已有衣服里找版型和面料接近的单品，不安排购买。':`新增购买上限 ${pref.budget} 元：先用已有衣服试搭，再从衣橱清单里补一件真正缺少的。`;
 const refs=s.cases.map(id=>{const k=cases.find(x=>x.id===id);return `<figure>${photo(k)}<figcaption class="credit">${k.category}参考：${k.brand} / ${k.season} / ${k.direction}<br>${sourceLine(k)}</figcaption></figure>`;}).join('');
 $('#report').innerHTML=`<div class="report-head"><p class="eyebrow">你的风格倾向 / 根据 ${r.answered} 道风格题计算</p><h3>${s.name}</h3><p class="report-sub">${composite?`复合型：${s.name}＋${s2.name}，两种特点很接近`:`兼有${s2.name}的特点`}</p><div class="chips">${s.words.map(w=>`<span>${w}</span>`).join('')}<span>${s.axis}</span></div><p class="report-trends">相近的流行说法：${TRENDS[top.key].join('、')}</p>${skipped>=6?`<p class="reason">有 ${skipped} 道风格题选了“不确定”，结果的参考性会降低。可以问问身边的人，再测一次。</p>`:''}</div>
 <div class="report-grid"><div><h4>风格比例</h4>${shown.map(x=>shareRow(STYLES[x.key].name,x.share)).join('')}${restPct>0?shareRow('其他',restPct/100):''}<p class="quiet">比例表示你选的特征和各风格的接近程度。大多数人兼有两三种风格，主风格是最不费力的起点，不是限制。</p><h4 class="dims-title">三个维度</h4>${dimRow('量感',r.p.v,'小','大',level(r.p.v,'小量感','中等量感','大量感'))}${dimRow('曲直',r.p.l,'曲','直',level(r.p.l,'曲线','直曲均衡','直线'))}${dimRow('动静',r.p.d,'静','动',level(r.p.d,'偏静','适中','偏动'))}</div><div class="style-map"><h4>风格坐标</h4>${mapSVG(r.p,top.key)}<p class="quiet">红点是你的位置。横轴为曲直，纵轴为量感；越靠近哪个风格，比例越高。</p></div></div>
 <div class="detail-block"><h4>色彩倾向${season?`：${season.name}（${season.desc}）`:''}</h4>${season?`<div class="palette">${season.colors.map(([n,hex])=>`<span><i style="background:${hex}"></i>${n}</span>`).join('')}</div><p>慎选：${season.avoid}。靠近脸的上衣、围巾和唇色最受影响，下装和鞋可以随意一些。</p>${c.unsure?'<p class="reason">冷暖倾向不明显，可以在相邻的季型之间多试几种颜色。</p>':''}`:'<p>色彩题都选了“不确定”，暂不给出季型。可以在自然光下对比金色和银色饰品，再测一次。</p>'}</div>
 <div class="report-cols"><div class="detail-block"><h4>穿搭方案</h4><dl class="spec"><dt>版型</dt><dd>${o.shape}</dd><dt>面料</dt><dd>${o.fabric}</dd><dt>图案</dt><dd>${o.pattern}</dd><dt>细节</dt><dd>${o.detail}</dd><dt>配饰</dt><dd>${o.accessory}</dd></dl><p class="reason">慎选：${o.avoid}</p></div><div class="detail-block"><h4>妆容方案</h4>${makeupText(s.makeup,pref.makeup,c)}</div><div class="detail-block"><h4>发型方案</h4><p>发型：${s.hair.shape}</p><p>刘海：${s.hair.bang}</p><p>齐刘海：${HAIR_PLUS[top.key].blunt}</p><p>直发还是卷发：${HAIR_PLUS[top.key].texture}</p><p>发色：${season?`${SEASON_HAIR[c.key]}不想染发时，保留自然发色也可以。`:'色彩题未作答，先保留自然发色。'}</p>${face?`<p>${face}</p>`:''}<p class="reason">慎选：${s.hair.avoid}${face?' 脸型只是参考之一，发质、发量和打理时间同样重要。':''}</p></div></div>
 ${bodyBlock(computeBody(f),s)}
 <div class="detail-block"><h4>想传达“${it.name}”时怎样调整</h4><p>${top.key===it.borrow?'这和你的风格倾向一致，可以直接按上面的方案放大一点。':it.tip}</p><p>${scene}</p><p>${budget}${pref.comfort?' 保留平底鞋和活动空间：方案里的鞋型都可以换成平底款。':''}</p></div>
 <div class="report-cols two"><div class="detail-block"><h4>衣橱清单</h4><ul class="checklist">${o.items.map(i=>`<li>${i}</li>`).join('')}</ul><p class="quiet">${pref.budget==='0'?'先在衣柜里找相近的单品。':'示例没有商品报价，只补最缺的一件。'}</p></div><div class="detail-block"><h4>7 天小练习</h4><p>第 1 天：用一件“${o.items[0]}”类的单品搭配已有衣服。第 3 天：试一个${s.name}的妆容或发型重点。第 7 天：记下“舒服、像我、愿意再穿”的感受。觉得不像自己，就换成${s2.name}的方案再试。</p></div></div>
 ${typeof celebrityStrip==='function'?celebrityStrip(top.key):''}
 ${typeof bloggerStrip==='function'?bloggerStrip(top.key,second.key):''}
 <div class="detail-block"><h4>真实造型参考</h4><div class="report-refs">${refs}</div><p class="quiet">这两张是本项目按风格语言挑选的杂志官网图片，杂志原文没有使用八大风格分类。图片中人物并非本产品用户。</p></div>
 <p class="quiet report-note">本测试根据你自己选择的外在特征，计算与八种风格语言的接近程度。它是形象设计中常用的描述工具，不是科学诊断，也不判断性格或能力。答案只保存在这台设备的浏览器里，不会上传；点页面底部“清空本次选择”可以删除。分析文字由 AI 辅助整理，尚待专业复核。</p>`;}
renderTest();showStep(1);$('#report').innerHTML=EMPTY_REPORT;restoreTest();
$('#style-test').addEventListener('change',saveTest);
// 在三维输入框按回车时不提前生成报告。
$('#style-test').addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches('input[type=number]'))e.preventDefault();});
$('#test-prev').addEventListener('click',()=>goStep(step-1));
$('#test-next').addEventListener('click',()=>goStep(step+1));
$('#style-test').addEventListener('submit',e=>{e.preventDefault();renderReport(new FormData(e.currentTarget));reported=true;saveTest();$('#report').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});
$('#reset').addEventListener('click',()=>{$('#style-test').reset();clearSavedTest();showStep(1);$('#report').innerHTML=EMPTY_REPORT;$('#reset-status').textContent='已清空本次测试；可以从第一步重新开始。';});
