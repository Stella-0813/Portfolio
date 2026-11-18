const sections = [
  {slug:'marketing', name:'整合营销', accent:'#df4936', tone:'#ffd4ad', hint:'担任项目PM，统筹策划-招商-执行-传播-复盘全流程', items:[
    {name:'天猫校园招咪计划',type:'动保公益 · 2025 冬',image:'campaign0.jpg',desc:'天猫校园第四届高校动保活动，全网招募“天猫校园四大岗位代言咪”。百家高校动保社团选送顶流猫咪、传递公益心智，话题声量超7200w+。总计捐赠7.25万救助基金、1.02吨猫粮、2164份宠物药品，帮助60+高校的5000+只流浪动物度过一个温暖的冬天。',url:'https://www.adquan.com/article/358520'},
    {name:'大学生创新挑战赛',type:'校园商赛 · 2024 春',image:'campaign1.jpg',desc:'淘宝、天猫校园、淘天招聘联合发起大学生创新挑战赛，与学生共创淘宝业务创新方向、强化品牌影响力，总计参赛人数超2000，为决赛优胜学生颁发实习offer与万元赛事奖金。',url:'https://www.digitaling.com/articles/1215948.html'},
    {name:'#出发趣游学#暑期游学专项',type:'大学生乡村公益 · 2025 夏',image:'campaign2.jpg',desc:'在阿里巴巴公益、浙江文旅、学习通等平台支持下，天猫校园发起#出发趣游学#暑期内容专项，招募15位大学生在4天3晚的短途旅行中践行乡村公益。游学回顾视频超23w次观看，新京报、浙江日报等媒体网站报道收录。',url:'https://www.adquan.com/article/354328'},
    {name:'萌友守护计划',type:'动保公益 · 2024 冬',image:'campaign3.jpg',desc:'天猫校园发起第三届暖冬动保公益行动，通过萌宠投票、公益派样、校园快闪等创意互动形式传递公益温度，打造超100万浏览爆款话题，总计捐赠1.28吨宠粮与万元救助资金。',url:'https://www.adquan.com/article/349310'}
  ]},
  {slug:'writing', name:'文章创作', accent:'#318452', tone:'#cbe8b4', hint:'原创编写官方公众号与媒体网站PR稿',items:[
    {name:'服务好每位学生，也照顾好一只小猫',short:'公益零售门店专访',type:'公众号 · 公益门店专访',image:'copy0.jpg',slices:5,url:'https://mp.weixin.qq.com/s/H2zhsbmkTnfu4MUFFMYvxA'},
    {name:'天（猫校园）不负我，看我华丽重生',type:'公众号 · 活动攻略',image:'copy1.jpg',slices:12,url:'https://mp.weixin.qq.com/s/eJurQ42cqtQO_D1XxIVzdQ'},
    {name:'20天的时间，200多位大学生可以为海洋保护做哪些事？',short:'环保公益活动 PR',type:'广告门 · 环保公益活动 PR',image:'copy2.jpg',slices:3,url:'https://www.adquan.com/article/342485'},
    {name:'一只猫的“求职简历”，如何撬动百万大学生做公益？',short:'动保公益活动 PR',type:'广告门 · 动保公益活动 PR',image:'copy3.jpg',slices:5,url:'https://www.adquan.com/article/358520'}
  ]},
  {slug:'brand', name:'厂牌VI', accent:'#5a4fb4', tone:'#d9d1fa', hint:'为街舞工作室设计全套VI、确立文化内核',items:['厂牌标识','设计理念','设计规范','文创周边'].map((name,i)=>({name,type:'LUOGANG CREW · 厂牌 VI 规范',image:'brand'+i+'.png'}))},
  {slug:'film', name:'视频剪辑', accent:'#e77d24', tone:'#ffdbad',hint:'个人自媒体视频与编舞视频制作',items:[
    {name:'摩洛哥旅游vlog',file:2,type:'@Wooper · 个人 vlog'},
    {name:'浙江南车悬瀑徒步vlog',file:3,type:'@Wooper · 个人 vlog'},
    {name:'《Ice Cream Paint Job》编舞',file:0,type:'LUOGANG CREW · 编舞作品'},
    {name:'《难解》编舞',file:1,type:'LUOGANG CREW · 编舞作品'}
  ].map(({name,type,file})=>({name,type,image:'film'+file+'.jpg',video:'film'+file+'.mp4'}))}
];
const $ = id => document.getElementById(id);
const path = name => 'media/'+name;
function element(tag,cls,text){
  const el=document.createElement(tag);
  if(cls) el.className=cls;
  if(text) el.textContent=text;
  return el;
}
function picture(file,alt){
  const img=new Image();
  img.src=path(file); img.alt=alt; img.draggable=false;
  return img;
}
sections.forEach((group,i)=>{
  const link=element('a','stand');
  link.href='#/'+group.slug;
  const icon=picture('stand'+i+'.webp','');
  icon.className='stand-icon';
  const label=element('span','stand-label',group.name);
  link.append(icon,label); $('stands').append(link);
});
let group=null, active=0, holdUntil=0, swipe=null, blockClick=0;
let frames=[], buttons=[], muted=true;
let hoverTarget=null, hoverTimer=0;
let wheelTotal=0, wheelUsed=false, lastWheel=-Infinity;
function cancelHover(){
  clearTimeout(hoverTimer);
  hoverTarget=null;
}
function resetGestures(){
  cancelHover();
  swipe=null;
  wheelTotal=0;
  wheelUsed=false;
  lastWheel=-Infinity;
  holdUntil=0;
}
function pauseFilms(){
  frames.forEach(f=>f.querySelector('video')?.pause());
}
function playFilm(){
  const v=frames[active]?.querySelector('video');
  if(v && !v.hasAttribute('data-user-paused') && !document.hidden){v.muted=muted;v.play().catch(()=>{});}
}
function mediaFrame(item,i){
  const frame=element('div','frame');
  frame.dataset.index=i;
  const chrome=element('header'); chrome.setAttribute('aria-hidden','true');
  chrome.append(element('i'),element('i'),element('i'));
  const screen=element('div','screen');
  if(item.slices){
    const reader=element('div','reader');
    reader.setAttribute('aria-label',item.name+'，上下滚动阅读');
    for(let k=0;k<item.slices;k++){
      const img=picture('copy'+i+'-'+k+'.jpg',item.name+' 第 '+(k+1)+' 段');
      reader.append(img);
    }
    screen.append(reader);
  }else if(item.video){
    const v=element('video');
    v.muted=true;v.playsInline=true;v.preload='none';v.poster=path(item.image);
    v.src=path(item.video);v.setAttribute('aria-label',item.name);
    v.onplay=v.onpause=()=>{if(i===active && group?.slug==='film')updateFilmButtons()};
    const pauseIcon=element('span','pause-icon');
    pauseIcon.setAttribute('aria-hidden','true');
    screen.append(v,pauseIcon);
  }else screen.append(picture(item.image,item.name));
  frame.append(chrome,screen);
  frame.onclick=()=>{
    if(performance.now()<blockClick)return;
    if(active!==i){select(i,true);return;}
    if(item.video)toggleFilm();
    else if(group.slug==='brand')zoom();
  };
  return frame;
}
function select(index,autoplay=false){
  cancelHover();
  index=Math.max(0,Math.min(group.items.length-1,index));
  if(index!==active){pauseFilms();active=index;holdUntil=performance.now()+800;}
  frames.forEach((f,i)=>{
    f.classList.toggle('active',active===i);
    const reader=f.querySelector('.reader');
    if(reader) reader.tabIndex=i===active?0:-1;
    buttons[i].setAttribute('aria-pressed',String(active===i));
  });
  const item=group.items[active];
  $('type').textContent=item.type+'　·　'+(active+1)+' / '+group.items.length;
  $('case-name').textContent=item.name;
  $('description').textContent=item.desc||'';
  const actions=$('actions');actions.replaceChildren();
  if(item.url){
    const a=element('a','brick',(group.slug==='writing'?'查看原文':'案例回顾')+' ↗');
    a.href=item.url;a.target='_blank';a.rel='noopener noreferrer';actions.append(a);
  }else if(item.video){
    action('toggle-film','播放',toggleFilm);
    action('sound','开启声音',()=>{muted=!muted;const v=frames[active].querySelector('video');v.muted=muted;updateFilmButtons()});
    updateFilmButtons();
    if(autoplay)playFilm();
  }else action('zoom-page','放大本页',zoom);
  $('prev').disabled=active===0;
  $('next').disabled=active===group.items.length-1;
  layout();
}
function action(id,label,fn){const b=element('button','brick',label);b.id=id;b.onclick=fn;$('actions').append(b)}
function toggleFilm(){
  const video=frames[active].querySelector('video');
  if(video.paused){
    video.removeAttribute('data-user-paused');
    playFilm();
  }else{
    video.setAttribute('data-user-paused','');
    video.pause();
  }
}
function updateFilmButtons(){
  const v=frames[active]?.querySelector('video');
  if(v&&$('toggle-film')){$('toggle-film').textContent=v.paused?'播放':'暂停';$('sound').textContent=muted?'开启声音':'静音'}
}
function zoom(){
  const item=group.items[active];
  $('zoom-img').src=path(item.image);$('zoom-img').alt=item.name;$('zoom').showModal();
}
function layout(){
  if(!group)return;
  const width=$('rail').clientWidth;
  const small=width<600;
  const documentWindow=group.slug==='brand' || group.slug==='writing';
  const ratio=documentWindow?1.317:16/9;
  // The grid reserves room for the full caption and controls before sizing the gallery.
  const availableHeight=Math.max(1,$('rail').clientHeight-14);
  const base=Math.min(width*(small?.83:.56),documentWindow?465:625,availableHeight*ratio);
  const height=base/ratio;
  // Keep each outer window proportionate. Narrow the neighbours through uniform scaling.
  frames.forEach((f,i)=>{
    const distance=Math.abs(i-active),factor=distance===0?1:distance===1?.38:.24;
    const offset=distance===0?0:Math.sign(i-active)*(base*.515+base*.19+(distance-1)*base*.30);
    f.style.width=base+'px';
    f.style.height=height+'px';
    f.style.zIndex=String(7-distance);
    f.style.transform='translate(-50%,-50%) translateX('+offset+'px) scale('+factor+')';
  });
}
function openSection(index){
  group=sections[index];active=0;
  document.body.classList.add('inside');
  document.documentElement.style.setProperty('--accent',group.accent);
  document.documentElement.style.setProperty('--tone',group.tone);
  $('home').hidden=true;$('section').hidden=false;
  $('section-icon').src=path('stand'+index+'.webp');$('section-title').textContent=group.name;
  $('section-hint').textContent=group.hint;
  frames=group.items.map(mediaFrame);
  buttons=group.items.map((item,i)=>{
    const b=element('button','stud');
    b.setAttribute('aria-label','查看'+item.name);b.title=item.name;
    b.onclick=()=>select(i,true);
    return b;
  });
  $('frames').replaceChildren(...frames);$('selectors').replaceChildren(...buttons);
  select(0);document.title=group.name+' · 顾梦然作品集';window.scrollTo(0,0);
}
function route(){
  resetGestures();
  pauseFilms();
  const slug=location.hash.replace(/^#\/?/,'');
  const i=sections.findIndex(s=>s.slug===slug);
  if(i>=0){openSection(i);return;}
  group=null;frames=[];buttons=[];$('frames').replaceChildren();$('selectors').replaceChildren();
  document.body.classList.remove('inside');$('section').hidden=true;$('home').hidden=false;
  document.title='顾梦然 · 整合营销作品集';
  if(slug==='about'){$('about').focus({preventScroll:true});$('about').scrollIntoView({block:'center'})}else window.scrollTo(0,0);
}
// Only a deliberate dwell inside the side card can change the focused case.
$('rail').onpointermove=e=>{
  if(!group || e.pointerType!=='mouse' || swipe || e.buttons || performance.now()<holdUntil){
    cancelHover();return;
  }
  const frame=e.target.closest('.frame');
  if(!frame || frame===frames[active]){cancelHover();return;}
  const rect=frame.getBoundingClientRect();
  const insetX=Math.min(14,rect.width*.12), insetY=Math.min(9,rect.height*.12);
  if(e.clientX<rect.left+insetX || e.clientX>rect.right-insetX ||
     e.clientY<rect.top+insetY || e.clientY>rect.bottom-insetY){cancelHover();return;}
  if(hoverTarget?.frame===frame && Math.hypot(e.clientX-hoverTarget.x,e.clientY-hoverTarget.y)<9)return;
  cancelHover();
  hoverTarget={frame,x:e.clientX,y:e.clientY};
  hoverTimer=setTimeout(()=>{
    const {x,y}=hoverTarget;
    if(!document.hidden && !swipe && frame.contains(document.elementFromPoint(x,y))){
      select(Number(frame.dataset.index),true);
    }
    cancelHover();
  },550);
};
$('rail').onpointerover=e=>{
  if(e.pointerType!=='mouse'||group?.slug!=='film')return;
  const f=e.target.closest('.frame');
  if(f===frames[active] && !f.contains(e.relatedTarget))playFilm();
};
$('rail').onpointerleave=cancelHover;
// Preserve vertical reading and pinch zoom while consuming horizontal page pans.
let touchOrigin=null;
document.addEventListener('touchstart',e=>{
  const touch=e.touches[0];
  touchOrigin=e.touches.length===1?{x:touch.clientX,y:touch.clientY}:null;
},{passive:true});
document.addEventListener('touchmove',e=>{
  if(!touchOrigin || e.touches.length!==1)return;
  const touch=e.touches[0],dx=touch.clientX-touchOrigin.x,dy=touch.clientY-touchOrigin.y;
  if(e.cancelable && Math.abs(dx)>4 && Math.abs(dx)>1.35*Math.abs(dy))e.preventDefault();
},{passive:false});
// Claim horizontal trackpad input before it can trigger browser history navigation.
// A wheel burst, including its momentum tail, may advance at most one case.
document.addEventListener('wheel',e=>{
  if(e.ctrlKey)return;
  const dx=e.shiftKey && !e.deltaX?e.deltaY:e.deltaX;
  if(!dx || (!e.shiftKey && Math.abs(dx)<=Math.abs(e.deltaY)))return;
  e.preventDefault();
  if(!group || !$('rail').contains(e.target) || $('zoom').open)return;
  cancelHover();
  const now=performance.now();
  if(now-lastWheel>240){wheelUsed=false;wheelTotal=0;}
  lastWheel=now;
  if(wheelUsed)return;
  const unit=e.deltaMode===1?16:e.deltaMode===2?$('rail').clientWidth:1;
  wheelTotal+=dx*unit;
  if(Math.abs(wheelTotal)>=72){
    wheelUsed=true;
    select(active+Math.sign(wheelTotal),true);
  }
},{passive:false});
$('rail').onpointerdown=e=>{
  cancelHover();
  if(e.button===0)swipe={x:e.clientX,y:e.clientY,id:e.pointerId};
};
window.addEventListener('pointerup',e=>{
  if(!swipe||swipe.id!==e.pointerId)return;
  const dx=e.clientX-swipe.x,dy=e.clientY-swipe.y;swipe=null;
  if(group&&Math.abs(dx)>=60&&Math.abs(dx)>1.5*Math.abs(dy)){
    blockClick=performance.now()+350;select(active+(dx<0?1:-1),true);
  }
});
window.addEventListener('pointercancel',()=>{swipe=null});
$('prev').onclick=()=>select(active-1,true);$('next').onclick=()=>select(active+1,true);
document.addEventListener('keydown',e=>{
  if(!group||$('zoom').open)return;
  if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();select(active+(e.key==='ArrowRight'?1:-1),true)}
  if(e.key==='Escape')location.hash='/';
});
document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelHover();pauseFilms()}});
if(window.ResizeObserver)new ResizeObserver(layout).observe($('rail'));
window.addEventListener('resize',layout);window.addEventListener('hashchange',route);
route();
