// User-supplied information. Future projects each get their own journey panel.
export const projects=[{
  id:'variable',number:'01',title:'变量',englishTitle:'Variable',category:'FIRST-PERSON SCI-FI PHYSICS PUZZLE',engine:'Godot 4',
  startDate:'2026-07-21',dateLabel:'Jul 21, 2026 — Present',status:'In development',
  description:'《变量（Variable）》是一款使用 Godot 4 开发的第一人称科幻物理解谜游戏。玩家被困在自己参与设计的设施中，需要通过终端修改重力大小与方向，利用物理规则探索环境、破解谜题并寻找出路。画面参考早期 Source 引擎作品，采用低多边形、清晰粗糙的纹理与灰暗工业风格。目前处于原型开发阶段，正持续完善核心玩法与关卡。',
  images:[
    {src:'/assets/images/variable/variable-1.webp',width:1270,height:709,alt:'Variable prototype: an industrial chamber with blue floor guidance',caption:'The facility'},
    {src:'/assets/images/variable/variable-2.webp',width:1272,height:713,alt:'Variable prototype: separated platforms and an industrial door',caption:'Physics chamber'},
    {src:'/assets/images/variable/variable-3.webp',width:1266,height:713,alt:'Variable prototype: the gravity terminal with direction controls',caption:'Gravity terminal'},
    {src:'/assets/images/variable/variable-4.webp',width:1269,height:712,alt:'Variable prototype: the observation room and physics protocol interface',caption:'Observation room'},
  ],
},{
  id:'minecraft',number:'02',title:'Minecraft',englishTitle:'Minecraft',category:'MINECRAFT CLIENT DEVELOPMENT',engine:'Java',
  dateLabel:'MythosClient · SoreinClient',status:'Client projects',codeBackdrop:true,
  description:'MythosClient 与 SoreinClient 是围绕 Minecraft 展开的客户端开发项目。从模块组织到界面交互，持续探索功能与视觉表达之间的平衡。',
  images:[
    {src:'/assets/images/minecraft/client-1.webp',width:1920,height:1057,alt:'Minecraft client interface with seven module categories and a violet gradient',caption:'Client interface / 01'},
    {src:'/assets/images/minecraft/client-2.webp',width:1920,height:1057,alt:'Minecraft client interface with a rounded navigation bar and violet module panels',caption:'Client interface / 02'},
  ],
}];
export const explorations=[
  {type:'Research',title:'Gravity as a tool.',description:'Exploring gravity and physical rules as the foundation of first-person puzzles in Variable.',number:'01'},
  {type:'Experiments',title:'A different direction.',description:'The gravity terminal changes both strength and direction, turning the facility into part of the puzzle.',number:'02'},
  {type:'Ideas',title:'An industrial world.',description:'Low-poly geometry, coarse textures, and subdued industrial spaces shape the visual direction.',number:'03'},
  {type:'Development',title:'A prototype in progress.',description:'Variable is in prototype development, with its core mechanics and levels being refined.',number:'04'},
];
