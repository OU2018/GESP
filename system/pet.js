/** system/pet.js — 抽卡/仓库/商店/派遣 */
(function (global) {
"use strict";
const PD = global.PET_DATA || {};
const GACHA_BYTE_COST = PD.GACHA_BYTE_COST || PD.GACHA_XP_COST || 80;
const GACHA_XP_COST = GACHA_BYTE_COST;
const UI_LABELS = PD.UI_LABELS || {};
const GACHA_RATES = PD.GACHA_RATES || [{rarity:"N",weight:55},{rarity:"R",weight:30},{rarity:"SR",weight:12},{rarity:"SSR",weight:3}];
const RARITY_LABEL = PD.RARITY_LABEL || {N:{name:"bool",color:"#94a3b8"},R:{name:"int",color:"#60a5fa"},SR:{name:"long long",color:"#c084fc"},SSR:{name:"double",color:"#fbbf24"}};
const FALLBACK_SPECIES = [
  {id:"bug",rarity:"N",stages:[{emoji:"🐛",name:"调试小虫",desc:"常见伙伴"}],baseStamina:30,harvest:0.35,lines:["加油刷题！"]}
];
let PET_SPECIES = (PD.PET_SPECIES && PD.PET_SPECIES.length) ? PD.PET_SPECIES : FALLBACK_SPECIES;
const SHOP_ITEMS = (PD.SHOP_ITEMS && PD.SHOP_ITEMS.length) ? PD.SHOP_ITEMS : [
  {id:"food",name:"逻辑饼干",emoji:"🍪",price:25,desc:"恢复20体力",effect:"stamina",value:20}
];
const MAPS = (PD.MAPS && PD.MAPS.length) ? PD.MAPS : [
  {id:"forest",name:"入门森林",emoji:"🌲",unlockXp:0,durationMin:3,eggChance:0.25,expItemChance:0.4,xpPerHour:8,staminaCost:10}
];
const WAREHOUSE = PD.WAREHOUSE || { baseCap: 8, maxCap: 24, expandCost: function(c){ return 60+(c-8)*40; } };
const UPGRADES = PD.UPGRADES || [];
const MILESTONES = PD.MILESTONES || [];
const EGG_HATCH_RATES = PD.EGG_HATCH_RATES || {N:[{rarity:"N",weight:80},{rarity:"R",weight:20}]};
const EGG_LABEL = PD.EGG_LABEL || {N:{name:"bool 蛋",emoji:"🥚"},R:{name:"int 蛋",emoji:"🥚"},SR:{name:"long long 蛋",emoji:"🔮"},SSR:{name:"double 蛋",emoji:"👑"}};
const HATCH_STAMINA = PD.HATCH_STAMINA || {N:8,R:14,SR:22,SSR:35};
const RARITY_PREFIX = PD.RARITY_PREFIX || {N:[""],R:[""],SR:[""],SSR:[""]};
const SHINY_LABEL = PD.SHINY_LABEL || {char:{base:"N",name:"char",color:"#7dd3fc",tag:"✨闪光"},float:{base:"SR",name:"float",color:"#e879f9",tag:"✨闪光"}};
const SPECIES_MAP = {};
PET_SPECIES.forEach(s => { SPECIES_MAP[s.id] = s; });
if (!SPECIES_MAP.bug) SPECIES_MAP.bug = FALLBACK_SPECIES[0];

function uid(){return "p_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,7);}
function getBytes(){ return (global.data && global.data.bytes) || 0; }
function getKB(){ return (global.data && global.data.kb) || 0; }
function getMB(){ return (global.data && global.data.mb) || 0; }
function getCurrency(cur){
  const d=global.data||{};
  if(cur==="kb") return d.kb||0;
  if(cur==="mb") return d.mb||0;
  return d.bytes||0;
}
function spendCurrency(cur, n){
  const d=global.data; if(!d) return false;
  n=Math.floor(n);
  if(cur==="kb"){ if((d.kb||0)<n) return false; d.kb-=n; }
  else if(cur==="mb"){ if((d.mb||0)<n) return false; d.mb-=n; }
  else { if((d.bytes||0)<n) return false; d.bytes-=n; }
  if(typeof global.saveData==="function") global.saveData(d); return true;
}
function spendBytes(n){ return spendCurrency("byte", n); }
function addCurrency(cur, n){
  const d=global.data; if(!d||!n) return;
  n=Math.floor(n);
  if(cur==="kb") d.kb=(d.kb||0)+n;
  else if(cur==="mb") d.mb=(d.mb||0)+n;
  else d.bytes=(d.bytes||0)+n;
  normalizeWallet();
}
/** 1024 Byte = 1 KB，1024 KB = 1 MB */
function normalizeWallet(){
  const d=global.data; if(!d) return;
  let b=Math.max(0, Math.floor(Number(d.bytes)||0));
  let k=Math.max(0, Math.floor(Number(d.kb)||0));
  let m=Math.max(0, Math.floor(Number(d.mb)||0));
  k += Math.floor(b/1024); b = b % 1024;
  m += Math.floor(k/1024); k = k % 1024;
  d.bytes=b; d.kb=k; d.mb=m;
}
function formatWallet(){
  const d=global.data||{};
  normalizeWallet();
  return `Byte ${d.bytes||0} · KB ${d.kb||0} · MB ${d.mb||0}`;
}


function getPlayerLevelInfo(){
  if(typeof global.getPlayerLevelInfo==="function") return global.getPlayerLevelInfo();
  const xp=(global.data&&global.data.totalXp)||0;
  let lv=1, need=200, left=xp;
  while(left>=need && lv<99){
    left-=need; lv++;
    if(lv===2) need=500;
    else if(lv===3) need=900;
    else if(lv===4) need=1400;
    else if(lv<=8) need=Math.floor(need*1.36)+60;
    else if(lv<=15) need=Math.floor(need*1.44)+100;
    else if(lv<=25) need=Math.floor(need*1.52)+160;
    else need=Math.floor(need*1.58)+220;
  }
  return {level:lv, into:left, need, totalXp:xp};
}

function ensurePetSystem(){
  const d=global.data; if(!d) return null;
  if(!d.petSystem){
    d.petSystem={pets:[],items:{food:2,exp_potion:0,super_food:0,ticket:0,egg:0},tickets:0,activePetId:null,mapsUnlocked:["forest"],dispatchSlots:1,dispatches:[],warehouseCap:WAREHOUSE.baseCap||8,lastLoginAt:Date.now(),lastHarvestAt:Date.now(),upgrades:{},pendingIdle:0,lifetimeIdle:0,gachaCount:0,milestones:{},lastIdleAt:Date.now(),lastStaminaRegen:Date.now()};
    const st=createPetInstance("bug"); d.petSystem.pets.push(st); d.petSystem.activePetId=st.uid;
  }
  const ps=d.petSystem;
  if(!ps.items) ps.items={food:0,exp_potion:0,super_food:0,ticket:0,egg:0};
  if(!ps.pets) ps.pets=[]; if(!ps.dispatches) ps.dispatches=[];
  if(!ps.upgrades) ps.upgrades={};
  if(ps.pendingIdle==null) ps.pendingIdle=0;
  if(ps.lifetimeIdle==null) ps.lifetimeIdle=0;
  if(ps.gachaCount==null) ps.gachaCount=0;
  if(!ps.milestones) ps.milestones={};
  if(!ps.lastIdleAt) ps.lastIdleAt=Date.now();
  if(!ps.eggs) ps.eggs={N:0,R:0,SR:0,SSR:0};
  if(ps.hatchBoost==null) ps.hatchBoost=0;
  if(ps.hatchDiscount==null) ps.hatchDiscount=0;
  // 迁移旧 egg 道具
  if(ps.items && ps.items.egg>0){ ps.eggs.N=(ps.eggs.N||0)+ps.items.egg; ps.items.egg=0; }
  try{ regenPetStamina(ps); }catch(e){}
  if(!ps.mapsUnlocked) ps.mapsUnlocked=["forest"]; if(!ps.dispatchSlots) ps.dispatchSlots=1; if(!ps.warehouseCap) ps.warehouseCap=WAREHOUSE.baseCap||8;
  if(!ps.lastLoginAt) ps.lastLoginAt=Date.now(); if(!ps.lastHarvestAt) ps.lastHarvestAt=Date.now();
  return ps;
}
function regenPetStamina(ps){
  // 离线/打开时按时间恢复：约每 3 分钟 +1，最多回满
  const now=Date.now();
  const last=ps.lastStaminaRegen||ps.lastLoginAt||now;
  const gained=Math.floor((now-last)/(3*60*1000));
  if(gained>0){
    (ps.pets||[]).forEach(p=>{
      if(p.stamina==null) p.stamina=p.maxStamina||30;
      if(p.maxStamina==null) p.maxStamina=30;
      p.stamina=Math.min(p.maxStamina, (p.stamina||0)+gained);
    });
    ps.lastStaminaRegen=now;
  }
}
function getShinyBonus(sp){
  if(!sp||!sp.shiny) return { staminaMul:1, harvestMul:1, key:null };
  const sh=(typeof SHINY_LABEL!=="undefined" && SHINY_LABEL[sp.shiny]) ? SHINY_LABEL[sp.shiny] : null;
  if(!sh) return { staminaMul:1.1, harvestMul:1.08, key:sp.shiny };
  return {
    staminaMul: sh.staminaMul||1.12,
    harvestMul: sh.harvestMul||1.1,
    key: sp.shiny,
    color: sh.color,
    glow: sh.glow,
    sparkle: sh.sparkle
  };
}
function getUniqueStageMul(sp, stage){
  if(!sp||!sp.unique) return 1;
  const arr=sp.stageStatMul||[1];
  const i=Math.min(Math.max(0, stage|0), arr.length-1);
  return arr[i];
}
function createPetInstance(speciesId){
  const sp=SPECIES_MAP[speciesId]||SPECIES_MAP.bug||FALLBACK_SPECIES[0];
  if(sp.unique || sp.noShiny){
    const mul=getUniqueStageMul(sp, 0);
    let maxSt=Math.max(8, Math.round((sp.baseStamina||22)*mul));
    let har=Math.min(0.95, +((sp.harvest||0.22)*mul).toFixed(3));
    return {
      uid:uid(), speciesId:sp.id, stage:0, feedExp:0,
      stamina:maxSt, maxStamina:maxSt, harvest:har,
      shiny:false, shinyKey:null, trait:sp.trait||"const", unique:true,
      obtainedAt:Date.now()
    };
  }
  const bonus=getShinyBonus(sp);
  let maxSt=Math.round((sp.baseStamina||30)*bonus.staminaMul);
  let har=Math.min(0.95, +(Math.round((sp.harvest||0.35)*bonus.harvestMul*1000)/1000));
  return {
    uid:uid(), speciesId:sp.id, stage:0, feedExp:0,
    stamina:maxSt, maxStamina:maxSt, harvest:har,
    shiny:!!sp.shiny, shinyKey:sp.shiny||null,
    obtainedAt:Date.now()
  };
}
function getSpecies(pet){
  if(!pet) return SPECIES_MAP.bug||FALLBACK_SPECIES[0];
  return SPECIES_MAP[pet.speciesId]||SPECIES_MAP.bug||FALLBACK_SPECIES[0];
}
function getPetDisplay(pet){
  const sp=getSpecies(pet);
  const stages=(sp && sp.stages && sp.stages.length) ? sp.stages : FALLBACK_SPECIES[0].stages;
  const st=stages[Math.min(Math.max(0, pet && pet.stage || 0), stages.length-1)];
  const baseKey=(sp && sp.rarity)||"N";
  const rar=RARITY_LABEL[baseKey]||RARITY_LABEL.N;
  let rarityName=rar.name, rarityColor=rar.color, shiny=false, typeHint=rar.typeHint||"";
  let glow=rar.color, sparkle="";
  const shinyKey=(pet&&pet.shinyKey)||(sp&&sp.shiny);
  if(shinyKey && SHINY_LABEL[shinyKey]){
    const sh=SHINY_LABEL[shinyKey];
    rarityName=sh.name+" "+(sh.tag||"✨");
    rarityColor=sh.color||rar.color;
    glow=sh.glow||sh.color||rar.color;
    sparkle=sh.sparkle||"gold";
    shiny=true;
    typeHint=sh.typeHint||typeHint;
  } else if(sp && sp.typeName){
    rarityName=sp.typeName;
  }
  let unique=!!(sp&&sp.unique)||!!(pet&&pet.unique);
  let trait=(pet&&pet.trait)||(sp&&sp.trait)||"";
  if(unique && sp && Array.isArray(sp.stageRarity)){
    const si=Math.min(Math.max(0, pet&&pet.stage||0), sp.stageRarity.length-1);
    const rk=sp.stageRarity[si];
    const rr=RARITY_LABEL[rk]||rar;
    rarityName=(rr.name||rk)+" · const";
    rarityColor=rr.color||rarityColor;
    glow=rr.color||glow;
    typeHint="全局唯一 · 无闪光 · 升阶提升稀有度";
    baseKey=rk;
  }
  const harRaw=(pet&&pet.harvest!=null)?pet.harvest:((sp&&sp.harvest)||0.35);
  return {
    emoji:st.emoji, name:st.name, desc:st.desc||"",
    rarity:baseKey, rarityName, rarityColor, glow, sparkle, shiny: unique?false:shiny, typeHint,
    stage:(pet&&pet.stage||0)+1, maxStage:stages.length,
    stamina:pet?pet.stamina:0, maxStamina:pet?pet.maxStamina:0,
    harvest:Math.round(harRaw*100),
    shinyKey: unique?null:(shinyKey||null),
    unique: unique, trait: trait
  };
}
function getActivePet(){
  const ps=ensurePetSystem(); if(!ps||!ps.pets.length) return null;
  let p=ps.pets.find(x=>x.uid===ps.activePetId); if(!p){p=ps.pets[0]; ps.activePetId=p.uid;} return p;
}
function getPetStage(){
  ensurePetSystem();
  const pet=getActivePet();
  if(!pet) return {emoji:"💾",name:"未绑定 main",title:"Heap 空闲",desc:"去 new 一个进程，或从 Heap 里选中一只"};
  const d=getPetDisplay(pet);
  return {
    emoji:d.emoji, name:d.name,
    title:d.rarityName+" · "+d.stage+"/"+d.maxStage+(d.shiny?" · 闪光":""),
    desc:d.desc, shiny:!!d.shiny, rarityColor:d.rarityColor, glow:d.glow, sparkle:d.sparkle
  };
}
/** 将 unlockXp 换算成大约需要的等级（展示用） */
function xpToApproxLevel(unlockXp){
  let lv=1, need=100, left=unlockXp||0;
  while(left>=need && lv<99){ left-=need; lv++; need=Math.floor(need*1.22); }
  return lv;
}

function getNextPetStage(){return null;} function getPetPathId(){return "gacha";} function setPetPath(){}

function weightedRarity(){
  const bonus=getUpgradeEffect("ssrWeight")||0;
  const rates=GACHA_RATES.map(row=>{
    if(row.rarity==="SSR") return {rarity:row.rarity, weight:row.weight+bonus};
    return row;
  });
  const total=rates.reduce((s,r)=>s+r.weight,0); let r=Math.random()*total;
  for(const row of rates){r-=row.weight; if(r<=0) return row.rarity;} return "N";
}
function hasUniquePet(speciesId){
  const ps=ensurePetSystem();
  return (ps.pets||[]).some(p=>p.speciesId===speciesId);
}
function pickSpeciesByRarity(rarity){
  const pool=PET_SPECIES.filter(s=>s.rarity===rarity && !s.unique);
  if(!pool.length) return PET_SPECIES.find(s=>!s.unique)||PET_SPECIES[0];
  return pool[Math.floor(Math.random()*pool.length)]||PET_SPECIES[0];
}
/** 约 1%：全局唯一循环锦鲤（已有则不再出） */
function tryGrantUniqueKoi(){
  const koi=PET_SPECIES.find(s=>s.id==="fish" && s.unique);
  if(!koi) return null;
  if(hasUniquePet("fish")) return null;
  const chance = koi.hatchChance != null ? koi.hatchChance : 0.01;
  if(Math.random() > chance) return null;
  return koi;
}


function upgradeLevel(id){
  const ps=ensurePetSystem();
  return (ps.upgrades && ps.upgrades[id]) || 0;
}
function upgradeCost(u){
  const lv=upgradeLevel(u.id);
  return Math.floor(u.baseCost * Math.pow(u.costGrow||1.4, lv));
}
function getUpgradeEffect(effect){
  let sum=0;
  UPGRADES.filter(u=>u.effect===effect).forEach(u=>{
    sum += (u.value||0) * upgradeLevel(u.id);
  });
  return sum;
}
/** 挂机 Byte/分钟（仅按墙钟流逝累计，UI 刷新不得额外加分钟） */
function getIdleBytePerMin(){
  const ps=ensurePetSystem(); if(!ps) return 0;
  if(isPetAntiLocked()) return 0;
  let rate=0.15;
  rate += getUpgradeEffect("idleFlat");
  (ps.pets||[]).forEach(p=>{
    const sp=SPECIES_MAP[p.speciesId]||{};
    const r={N:0.08,R:0.15,SR:0.28,SSR:0.5}[sp.rarity||"N"]||0.08;
    const stageBonus=1+(p.stage||0)*0.12;
    const maxS=Math.max(1, p.maxStamina||30);
    const stamRatio=Math.min(1, (p.stamina||0)/maxS);
    const stamFactor=0.35+0.65*stamRatio;
    rate += r*stageBonus*stamFactor;
  });
  const mult=1+getUpgradeEffect("idleMult");
  return Math.round(rate*mult*100)/100;
}

/** 防沉迷：每日宠物系统可用 5 分钟 */
const PET_ANTI_MS = 5 * 60 * 1000;
function todayKeyLocal(){
  const d=new Date();
  return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
}
function ensureAntiAddiction(){
  const ps=ensurePetSystem(); if(!ps) return null;
  if(!ps.anti) ps.anti={ date:"", usedMs:0, sessionStart:null };
  const tk=todayKeyLocal();
  if(ps.anti.date!==tk){
    ps.anti={ date:tk, usedMs:0, sessionStart:null };
  }
  return ps.anti;
}
function isPetAntiLocked(){
  const a=ensureAntiAddiction();
  if(!a) return false;
  return (a.usedMs||0)>=PET_ANTI_MS;
}
/** 进入宠物页开始计时；离开结算本段时长 */
function petSessionStart(){
  const a=ensureAntiAddiction(); if(!a) return;
  if(isPetAntiLocked()){ a.sessionStart=null; return; }
  if(!a.sessionStart) a.sessionStart=Date.now();
}
function petSessionEnd(){
  const ps=ensurePetSystem(); if(!ps) return;
  const a=ensureAntiAddiction(); if(!a||!a.sessionStart) return;
  const add=Math.max(0, Date.now()-a.sessionStart);
  a.usedMs=Math.min(PET_ANTI_MS, (a.usedMs||0)+add);
  a.sessionStart=null;
  if(typeof global.saveData==="function") global.saveData(global.data);
}
function petSessionTick(){
  const a=ensureAntiAddiction(); if(!a) return getAntiStatus();
  if(a.sessionStart){
    const live=Math.max(0, Date.now()-a.sessionStart);
    if((a.usedMs||0)+live>=PET_ANTI_MS){
      a.usedMs=PET_ANTI_MS;
      a.sessionStart=null;
      // 锁定瞬间推进 lastIdleAt，避免锁定时段在解锁后被一次性结算
      const ps=ensurePetSystem();
      if(ps) ps.lastIdleAt=Date.now();
      if(typeof global.saveData==="function") global.saveData(global.data);
    }
  }
  return getAntiStatus();
}
function getAntiStatus(){
  const a=ensureAntiAddiction();
  if(!a) return { locked:false, usedMs:0, leftMs:PET_ANTI_MS, leftSec:300 };
  let used=a.usedMs||0;
  if(a.sessionStart) used+=Math.max(0, Date.now()-a.sessionStart);
  used=Math.min(PET_ANTI_MS, used);
  const left=Math.max(0, PET_ANTI_MS-used);
  return { locked: used>=PET_ANTI_MS, usedMs:used, leftMs:left, leftSec:Math.ceil(left/1000) };
}

/**
 * 仅按真实流逝时间累计。禁止把升级分钟、UI 刷新算进收益。
 * 防沉迷锁定期间：不累计，并刷新 lastIdleAt，防止解锁后补发。
 */
function accumulateIdle(){
  const d=global.data, ps=ensurePetSystem(); if(!ps) return 0;
  const now=Date.now();
  if(!ps.lastIdleAt) ps.lastIdleAt=now;

  if(isPetAntiLocked()){
    ps.lastIdleAt=now;
    return 0;
  }

  const last=ps.lastIdleAt;
  const elapsedMs=now-last;
  // 快速连点/翻页：不足 2 秒不结算，避免浮点噪声
  if(elapsedMs<2000) return 0;

  let mins=elapsedMs/60000;
  mins=Math.min(mins, 12*60); // 最多累计 12 小时墙钟
  // 注意：绝不在此处加上 autoClaimMin 等「每次调用额外分钟」

  const rate=getIdleBytePerMin();
  const gain=rate*mins;
  // 先推进时间戳，再加收益，防止并发重入双加
  ps.lastIdleAt=now;
  if(gain>=0.01){
    ps.pendingIdle=(ps.pendingIdle||0)+gain;
    if(typeof global.saveData==="function") global.saveData(d);
  }
  return gain;
}

/** 单次领取上限：按队伍最高品阶 */
function getClaimCapByte(){
  const ps=ensurePetSystem(); if(!ps) return 100;
  let best="N";
  const rank={N:1,R:2,SR:3,SSR:4};
  (ps.pets||[]).forEach(p=>{
    const sp=SPECIES_MAP[p.speciesId]||{};
    const r=sp.rarity||"N";
    if((rank[r]||0)>(rank[best]||0)) best=r;
  });
  // 低品级（bool）一次最多 100；逐级放宽
  const caps={ N:100, R:250, SR:600, SSR:1500 };
  return caps[best]||100;
}

function getSyncPermitCount(){
  const d=global.data;
  if(!d||!d.questItems) return 0;
  return d.questItems.qi_sync_permit||0;
}
function consumeSyncPermit(n){
  n=n||1;
  const d=global.data;
  if(!d) return false;
  if(!d.questItems) d.questItems={};
  const have=d.questItems.qi_sync_permit||0;
  if(have<n) return false;
  d.questItems.qi_sync_permit=have-n;
  return true;
}
function claimIdle(){
  const d=global.data, ps=ensurePetSystem();
  if(isPetAntiLocked()){
    return {ok:false,msg:"今日宠物系统使用已达 5 分钟上限，收益已锁定至明日", amount:0, locked:true};
  }
  accumulateIdle();
  const pending=Math.floor(ps.pendingIdle||0);
  if(pending<1) return {ok:false,msg:"暂无可领取（再挂一会儿）", amount:0};
  if(getSyncPermitCount()<1){
    return {ok:false,msg:"需要「时序校准符」才能取回挂机收益（完成一次正确率≥90%的练习可获得）", amount:0, needPermit:true};
  }
  const cap=getClaimCapByte();
  const amt=Math.min(pending, cap);
  if(!consumeSyncPermit(1)) return {ok:false,msg:"时序校准符不足", amount:0, needPermit:true};
  ps.pendingIdle=Math.max(0, (ps.pendingIdle||0)-amt);
  ps.lifetimeIdle=(ps.lifetimeIdle||0)+amt;
  d.bytes=(d.bytes||0)+amt;
  normalizeWallet();
  if(typeof global.saveData==="function") global.saveData(d);
  checkMilestones();
  const left=Math.floor(ps.pendingIdle||0);
  let msgExtra=amt<pending?("（本档单次上限 "+cap+"B，剩余 "+left+"B 可下次领取）"):"";
  return {ok:true, amount:amt, usedPermit:1, cap:cap, left:left, msgExtra:msgExtra};
}
function buyUpgrade(id){
  const d=global.data, ps=ensurePetSystem();
  const u=UPGRADES.find(x=>x.id===id);
  if(!u) return {ok:false,msg:"未知升级"};
  const lv=upgradeLevel(id);
  if(lv>=(u.max||99)) return {ok:false,msg:"已满级"};
  const cost=upgradeCost(u);
  const cur=u.currency||"byte";
  if(getCurrency(cur)<cost) return {ok:false,msg:(cur.toUpperCase())+" 不足（需要 "+cost+"）"};
  if(!spendCurrency(cur, cost)) return {ok:false,msg:"余额不足"};
  ps.upgrades[id]=lv+1;
  // apply max stamina bump immediately
  if(u.effect==="maxStamina"){
    (ps.pets||[]).forEach(p=>{
      p.maxStamina=(p.maxStamina||30)+u.value;
      p.stamina=Math.min(p.maxStamina, (p.stamina||0)+u.value);
    });
  }
  if(typeof global.saveData==="function") global.saveData(d);
  return {ok:true, level:ps.upgrades[id], cost};
}
function checkMilestones(){
  const d=global.data, ps=ensurePetSystem(); if(!ps) return [];
  const newly=[];
  const ssr=(ps.pets||[]).filter(p=>{
    const sp=SPECIES_MAP[p.speciesId]; return sp&&sp.rarity==="SSR";
  }).length;
  const ctx={
    pets:(ps.pets||[]).length,
    dispatchClaims:(d.stats&&d.stats.dispatchClaims)||0,
    lifetimeIdle:Math.floor(ps.lifetimeIdle||0),
    gachaCount:ps.gachaCount||0,
    ssr
  };
  MILESTONES.forEach(m=>{
    if(ps.milestones[m.id]) return;
    const val=ctx[m.need]||0;
    if(val>=m.n){
      ps.milestones[m.id]={at:Date.now()};
      d.bytes=(d.bytes||0)+(m.prizeBytes||0);
      if(m.prizeKb) d.kb=(d.kb||0)+m.prizeKb;
      if(m.prizeMb) d.mb=(d.mb||0)+m.prizeMb;
      d.totalXp=(d.totalXp||0)+(m.prizeXp||0);
      newly.push(m);
    }
  });
  if(newly.length && typeof global.saveData==="function") global.saveData(d);
  newly.forEach(m=>{
    if(typeof petToast==="function") petToast(`🏆 里程碑：${m.name}`, "success");
  });
  return newly;
}
function getIdlePreview(){
  accumulateIdle();
  const ps=ensurePetSystem();
  const anti=getAntiStatus();
  return {
    rate:getIdleBytePerMin(),
    pending:Math.floor(ps.pendingIdle||0),
    claimCap:getClaimCapByte(),
    anti:anti,
    lifetime:Math.floor(ps.lifetimeIdle||0)
  };
}

function addEgg(rarity, n){
  const ps=ensurePetSystem(); n=n||1;
  if(!ps.eggs) ps.eggs={N:0,R:0,SR:0,SSR:0};
  if(!ps.eggs[rarity]) ps.eggs[rarity]=0;
  ps.eggs[rarity]+=n;
}
function totalEggs(){
  const e=(ensurePetSystem().eggs)||{};
  return (e.N||0)+(e.R||0)+(e.SR||0)+(e.SSR||0);
}
function pickRarityFromTable(table){
  let rates=table.map(r=>({rarity:r.rarity,weight:r.weight}));
  const boost=ensurePetSystem().hatchBoost||0;
  if(boost>0){
    rates=rates.map(r=>{
      if(r.rarity==="SSR") return {rarity:r.rarity,weight:r.weight+boost*8};
      if(r.rarity==="SR") return {rarity:r.rarity,weight:r.weight+boost*4};
      return r;
    });
  }
  const total=rates.reduce((s,r)=>s+r.weight,0); let x=Math.random()*total;
  for(const row of rates){ x-=row.weight; if(x<=0) return row.rarity; }
  return "N";
}
/** 孵化蛋：消耗时间片，稀有蛋更容易出高品质 */

function hatchAnimEnabled(){
  try {
    const s=global.data&&global.data.settings;
    if(s && s.hatchAnim===false) return false;
    if(s && s.anim===false) return false;
    return true;
  } catch(e){ return true; }
}

const HATCH_FX = {
  N:   { color:"#94a3b8", glow:"#cbd5e1", vol:0.08, tones:[320,400], burst:10 },
  R:   { color:"#60a5fa", glow:"#93c5fd", vol:0.11, tones:[360,480,560], burst:16 },
  SR:  { color:"#a78bfa", glow:"#c4b5fd", vol:0.14, tones:[400,520,660,780], burst:22 },
  SSR: { color:"#fbbf24", glow:"#fde68a", vol:0.18, tones:[440,554,659,880,1040], burst:32 },
  UR:  { color:"#f472b6", glow:"#fbcfe8", vol:0.2,  tones:[480,600,720,900,1100], burst:36 }
};

function playHatchSfx(rarity){
  const fx=HATCH_FX[rarity]||HATCH_FX.N;
  const vol=fx.vol;
  // crack
  petPlayTone(180, 0.06, "square", vol*0.5);
  setTimeout(()=>petPlayTone(140, 0.08, "sawtooth", vol*0.4), 60);
  (fx.tones||[]).forEach((f,i)=>{
    setTimeout(()=>petPlayTone(f, 0.1 + i*0.02, "sine", vol), 180 + i*90);
  });
}

/**
 * 播放孵化过场：弹跳 → 碎裂发光 → 现身
 * @returns Promise
 */
function playHatchAnimation(eggRarity, pet, opts){
  opts=opts||{};
  return new Promise((resolve)=>{
    if(!opts.force && !hatchAnimEnabled()){ resolve(); return; }
    let display;
    try{
      display=(pet && pet._mockDisplay) ? pet._mockDisplay : getPetDisplay(pet);
    }catch(e){
      display={ emoji:"💾", name:"测试进程", rarity:eggRarity||"N", rarityName:eggRarity||"N" };
    }
    if(!display) display={ emoji:"💾", name:"测试进程", rarity:eggRarity||"N", rarityName:eggRarity||"N" };
    const rarity=display.rarity||eggRarity||"N";
    const fx=HATCH_FX[rarity]||HATCH_FX.N;
    const lab=(typeof EGG_LABEL!=="undefined" && EGG_LABEL[eggRarity]) ? EGG_LABEL[eggRarity] : { emoji:"🥚", name:eggRarity };

    let layer=document.getElementById("hatch-fx-layer");
    if(!layer){
      layer=document.createElement("div");
      layer.id="hatch-fx-layer";
      document.body.appendChild(layer);
    }
    // 始终挂到 body 顶层，遮罩最高优先级
    if(layer.parentNode!==document.body) document.body.appendChild(layer);
    layer.style.zIndex="2147483000";
    layer.style.position="fixed";
    layer.style.inset="0";
    layer.style.pointerEvents="auto";
    layer.innerHTML=`
      <div class="hatch-fx-backdrop"></div>
      <div class="hatch-fx-stage">
        <div class="hatch-fx-glow" style="--hatch-glow:${fx.glow}; --hatch-color:${fx.color}"></div>
        <div class="hatch-fx-egg" style="--hatch-color:${fx.color}">${lab.emoji||"🥚"}</div>
        <div class="hatch-fx-shells" aria-hidden="true">
          <span class="shell s1">🐚</span><span class="shell s2">✨</span>
          <span class="shell s3">✦</span><span class="shell s4">✧</span>
        </div>
        <div class="hatch-fx-pet" style="display:none">${display.emoji||"💾"}</div>
        <div class="hatch-fx-caption"></div>
      </div>`;
    layer.className="hatch-fx-layer show rarity-"+rarity;
    playHatchSfx(rarity);

    const egg=layer.querySelector(".hatch-fx-egg");
    const petEl=layer.querySelector(".hatch-fx-pet");
    const cap=layer.querySelector(".hatch-fx-caption");
    const glow=layer.querySelector(".hatch-fx-glow");
    const shells=layer.querySelector(".hatch-fx-shells");
    if(cap) cap.textContent="孵化中…";

    // phase 1 bounce
    if(egg) egg.classList.add("bounce");
    setTimeout(()=>{
      if(egg){ egg.classList.remove("bounce"); egg.classList.add("crack"); }
      if(glow) glow.classList.add("pulse");
      petPlayTone(220, 0.12, "square", (fx.vol||0.1)*0.6);
    }, 700);

    setTimeout(()=>{
      if(egg) egg.classList.add("shatter");
      if(shells) shells.classList.add("burst");
      if(glow) glow.classList.add("flare");
      playHatchSfx(rarity);
      try{ if(typeof petBurst==="function") petBurst(fx.color, fx.burst||16); }catch(e){}
    }, 1100);

    setTimeout(()=>{
      if(egg) egg.style.display="none";
      if(petEl){ petEl.style.display="block"; petEl.classList.add("reveal"); }
      if(cap) cap.innerHTML=`${display.emoji} <strong>${display.name||""}</strong><br><span style="color:${fx.color}">${display.rarityName||rarity}</span>`;
    }, 1450);

    let settled=false;
    const finish=()=>{
      if(settled) return;
      settled=true;
      try{
        const psys=ensurePetSystem();
        psys.hatchAnimSeen=true;
        if(typeof global.saveData==="function") global.saveData(global.data);
      }catch(e){}
      layer.classList.remove("show");
      layer.innerHTML="";
      layer.onclick=null;
      resolve();
    };

    setTimeout(finish, 2800);

    // 首次孵化：屏蔽点击，不可跳过；之后可点击跳过
    let canSkip=false;
    try{
      const psys=ensurePetSystem();
      canSkip=!!psys.hatchAnimSeen;
    }catch(e){ canSkip=false; }
    if(opts.force) canSkip=true; // 调试强制动画仍可点跳过

    if(canSkip){
      if(cap) cap.textContent=(cap.textContent||"孵化中…")+"（点击可跳过）";
      layer.style.cursor="pointer";
      layer.onclick=()=>finish();
    } else {
      layer.style.cursor="default";
      layer.onclick=(ev)=>{ if(ev){ ev.preventDefault(); ev.stopPropagation(); } };
      // 阻断下层交互
      layer.addEventListener("pointerdown", (e)=>{ e.preventDefault(); e.stopPropagation(); }, true);
    }
  });
}

function hatchEgg(eggRarity){
  const d=global.data, ps=ensurePetSystem();
  eggRarity=eggRarity||"N";
  if(!ps.eggs||(ps.eggs[eggRarity]||0)<1) return {ok:false,msg:"没有该品质的蛋"};
  if(ps.pets.length>=(ps.warehouseCap||8)) return {ok:false,msg:"Heap 已满，先 sbrk 或 return 0"};
  // 需要一只有时间片的 main 来孵化
  const pet=getActivePet();
  if(!pet) return {ok:false,msg:"需要绑定 main 才能孵化"};
  let cost=HATCH_STAMINA[eggRarity]||10;
  const disc=Math.min(0.5, ps.hatchDiscount||0);
  cost=Math.max(3, Math.ceil(cost*(1-disc)));
  if((pet.stamina||0)<cost) return {ok:false,msg:"main 时间片不足（需要 "+cost+"）"};
  pet.stamina-=cost;
  ps.eggs[eggRarity]--;
  const table=EGG_HATCH_RATES[eggRarity]||EGG_HATCH_RATES.N;
  let rarity=pickRarityFromTable(table);
  if(ps.hatchBoost>0) ps.hatchBoost--;
  let species=tryGrantUniqueKoi();
  if(species){
    rarity="SSR";
  } else {
    species=pickSpeciesByRarity(rarity);
  }
  const baby=createPetInstance(species.id);
  ps.pets.push(baby);
  if(!ps.activePetId) ps.activePetId=baby.uid;
  ps.gachaCount=(ps.gachaCount||0)+1;
  if(typeof global.saveData==="function") global.saveData(d);
  try{ checkMilestones(); }catch(e){}
  try{ if(typeof global.checkAchievements==="function") global.checkAchievements(buildPetAchieveCtx()); }catch(e){}
  return {ok:true, pet:baby, eggRarity, cost};
}
/** 兼容旧调用名：不再允许花钱抽卡 */
function doGacha(times){
  return {ok:false,msg:"已改为孵化系统：请用探索/练习掉落的蛋进行孵化"};
}

function expandWarehouse(){
  const d=global.data, ps=ensurePetSystem();
  const cap=ps.warehouseCap||8;
  if(cap>=(WAREHOUSE.maxCap||24)) return {ok:false,msg:"Heap 已达上限"};
  if((d.mb||0)>=1){ d.mb-=1; }
  else if((d.kb||0)>=12){ d.kb-=12; }
  else return {ok:false,msg:"需要 1 MB 或 12 KB"};
  ps.warehouseCap=cap+2;
  if(typeof global.saveData==="function") global.saveData(d);
  try{ if(typeof global.checkAchievements==="function") global.checkAchievements(buildPetAchieveCtx()); }catch(e){}
  return {ok:true,cap:ps.warehouseCap,cost:1};
}
function releasePet(uid){
  const d=global.data, ps=ensurePetSystem();
  if(ps.pets.length<=1) return {ok:false,msg:"至少保留一只宠物"};
  const idx=ps.pets.findIndex(p=>p.uid===uid);
  if(idx<0) return {ok:false,msg:"找不到该宠物"};
  if(ps.dispatches.some(x=>x.petUid===uid)) return {ok:false,msg:"派遣中无法 return 0"};
  const removed=ps.pets.splice(idx,1)[0];
  if(ps.activePetId===uid) ps.activePetId=ps.pets[0].uid;
  d.stats=d.stats||{};
  d.stats.releaseCount=(d.stats.releaseCount||0)+1;
  if(typeof global.saveData==="function") global.saveData(d);
  try{ if(typeof global.checkAchievements==="function") global.checkAchievements(buildPetAchieveCtx()); }catch(e){}
  return {ok:true,pet:removed};
}
function buildPetAchieveCtx(){
  const d=global.data||{};
  const ps=d.petSystem||{};
  const speciesOwned=(ps.pets||[]).map(p=>p.speciesId);
  let hasSSR=false, ssrCount=0;
  (ps.pets||[]).forEach(p=>{
    const sp=SPECIES_MAP[p.speciesId];
    if(sp && sp.rarity==="SSR"){ hasSSR=true; ssrCount++; }
  });
  const lv=(typeof global.getPlayerLevelInfo==="function")?global.getPlayerLevelInfo():{level:1};
  let upgradeLevels=0;
  Object.keys(ps.upgrades||{}).forEach(k=>{ upgradeLevels+=ps.upgrades[k]||0; });
  return {
    stats:d.stats||{},
    totalXp:d.totalXp||0,
    bytes:d.bytes||0,
    kb:d.kb||0,
    mb:d.mb||0,
    level:lv.level||1,
    petCount:(ps.pets||[]).length,
    warehouseCap:ps.warehouseCap||8,
    speciesOwned,
    hasSSR,
    ssrCount,
    mapsUnlocked:ps.mapsUnlocked||[],
    dispatchClaims:d.stats&&d.stats.dispatchClaims||0,
    releaseCount:d.stats&&d.stats.releaseCount||0,
    streak:d.streak||0,
    gachaCount:ps.gachaCount||0,
    hatchCount:ps.gachaCount||0,
    lifetimeIdle:Math.floor(ps.lifetimeIdle||0),
    upgradeLevels,
    last:null
  };
}


function convertXpToTickets(n){ return false; }
function buyItem(itemId,qty){
  const d=global.data, ps=ensurePetSystem(), item=SHOP_ITEMS.find(x=>x.id===itemId); qty=Math.max(1,qty||1);
  if(!item) return {ok:false,msg:"包不存在"};
  const cur=item.currency||"byte";
  const cost=item.price*qty;
  if(getCurrency(cur)<cost) return {ok:false,msg:(cur.toUpperCase())+" 不足"};
  if(!spendCurrency(cur, cost)) return {ok:false,msg:"余额不足"};
  if(item.effect==="hatchDiscount"){
    ps.hatchDiscount=Math.min(0.5, (ps.hatchDiscount||0)+item.value*qty);
  } else if(item.effect==="hatchBoost"){
    ps.hatchBoost=(ps.hatchBoost||0)+item.value*qty;
  } else if(item.effect==="expandHeap"){
    ps.warehouseCap=(ps.warehouseCap||8)+item.value*qty;
  } else {
    ps.items[itemId]=(ps.items[itemId]||0)+qty;
  }
  if(typeof global.saveData==="function") global.saveData(d); return {ok:true};
}
function feedPet(petUid,itemId){
  const d=global.data, ps=ensurePetSystem(), pet=ps.pets.find(p=>p.uid===petUid), item=SHOP_ITEMS.find(x=>x.id===itemId);
  if(!pet||!item||item.effect==="ticket") return {ok:false,msg:"无效"};
  if((ps.items[itemId]||0)<1) return {ok:false,msg:"道具不足"}; ps.items[itemId]--;
  const sp=getSpecies(pet);
  if(item.effect==="stamina") pet.stamina=Math.min(pet.maxStamina,pet.stamina+item.value);
  else if(item.effect==="staminaFull") pet.stamina=pet.maxStamina;
  else if(item.effect==="petExp"){
    // 唯一 const：经验获取效率降低（需要数倍资源）
    let gain=item.value;
    if(sp.unique){
      const mul=sp.feedCostMul||3;
      gain=Math.max(1, Math.floor(gain/mul));
    }
    pet.feedExp=(pet.feedExp||0)+gain;
    const stageNeed = sp.unique ? Math.floor(30*(sp.stageCostMul||4)) : 30;
    while(pet.feedExp>=stageNeed && pet.stage<(sp.stages||[]).length-1){
      pet.feedExp-=stageNeed;
      pet.stage=(pet.stage||0)+1;
      if(sp.unique){
        const mul=getUniqueStageMul(sp, pet.stage);
        const nextMax=Math.max(8, Math.round((sp.baseStamina||22)*mul));
        const nextH=Math.min(0.95, +((sp.harvest||0.22)*mul).toFixed(3));
        pet.maxStamina=Math.max(pet.maxStamina||0, nextMax);
        pet.stamina=pet.maxStamina;
        pet.harvest=Math.max(pet.harvest||0, nextH);
      } else {
        const bonus=getShinyBonus(sp);
        const baseSt=Math.round((sp.baseStamina||30)*(bonus.staminaMul||1));
        const baseH=Math.min(0.95, (sp.harvest||0.35)*(bonus.harvestMul||1));
        const nextMax=Math.round(baseSt*(1+pet.stage*0.18));
        pet.maxStamina=Math.max(pet.maxStamina||baseSt, nextMax);
        pet.stamina=pet.maxStamina;
        const nextH=Math.min(0.95, baseH*(1+pet.stage*0.1));
        pet.harvest=Math.max(pet.harvest||baseH, nextH);
      }
    }
  }
  if(typeof global.saveData==="function") global.saveData(d); return {ok:true};
}
function setActivePet(uid){
  const ps=ensurePetSystem(); if(!ps.pets.find(p=>p.uid===uid)) return;
  ps.activePetId=uid; if(typeof global.saveData==="function") global.saveData(global.data);
  renderPetPage(); if(typeof global.updateHome==="function") global.updateHome();
}
function unlockMap(mapId){
  const d=global.data, ps=ensurePetSystem(), map=MAPS.find(m=>m.id===mapId);
  if(!map||ps.mapsUnlocked.includes(mapId)) return {ok:false};
  if((d.totalXp||0)<map.unlockXp) return {ok:false,msg:"XP 不足（需 "+map.unlockXp+" 解锁资格）"};
  const byteCost = Math.max(20, Math.floor((map.unlockXp||0)/10));
  if((d.bytes||0)<byteCost) return {ok:false,msg:"需要 "+byteCost+" Byte 挂载地图"};
  d.bytes-=byteCost;
  ps.mapsUnlocked.push(mapId); if(typeof global.saveData==="function") global.saveData(d);
  try{ if(typeof global.checkAchievements==="function") global.checkAchievements(buildPetAchieveCtx()); }catch(e){}
  return {ok:true,byteCost};
}
function unlockDispatchSlot(){
  const d=global.data, ps=ensurePetSystem(), cost=120*ps.dispatchSlots;
  if((d.bytes||0)<cost) return {ok:false,msg:"需要 "+cost+" Byte"};
  if(ps.dispatchSlots>=4) return {ok:false,msg:"并发上限"};
  d.bytes-=cost; ps.dispatchSlots++; if(typeof global.saveData==="function") global.saveData(d); return {ok:true};
}
function startDispatch(petUid,mapId){
  const d=global.data, ps=ensurePetSystem(), pet=ps.pets.find(p=>p.uid===petUid), map=MAPS.find(m=>m.id===mapId);
  if(!pet||!map) return {ok:false,msg:"无效"};
  if(!ps.mapsUnlocked.includes(mapId)) return {ok:false,msg:"地图未解锁"};
  if(ps.dispatches.length>=ps.dispatchSlots) return {ok:false,msg:"并发槽已满"};
  if(ps.dispatches.some(x=>x.petUid===petUid)) return {ok:false,msg:"已在派遣中"};
  if(pet.stamina==null) pet.stamina=pet.maxStamina||30;
  if(pet.maxStamina==null) pet.maxStamina=30;
  if((pet.stamina||0)<map.staminaCost) return {ok:false,msg:"时间片不足（需要 "+map.staminaCost+"）"};
  pet.stamina-=map.staminaCost;
  ps.dispatches.push({petUid,mapId,startedAt:Date.now(),durationMs:map.durationMin*60*1000});
  if(typeof global.saveData==="function") global.saveData(d); return {ok:true};
}
function calcDispatchProgress(disp){ return Math.min(1,(Date.now()-disp.startedAt)/disp.durationMs); }
function claimDispatch(idx){
  const d=global.data, ps=ensurePetSystem(), disp=ps.dispatches[idx];
  if(!disp) return {ok:false,msg:"无此任务"}; if(calcDispatchProgress(disp)<1) return {ok:false,msg:"尚未完成"};
  const pet=ps.pets.find(p=>p.uid===disp.petUid), map=MAPS.find(m=>m.id===disp.mapId);
  if(!map) return {ok:false,msg:"地图数据缺失"};
  let harvest=pet?(pet.harvest||0.4):0.4; harvest=Math.min(0.95, harvest+getUpgradeEffect("harvest")); const rewards={eggs:0,expItems:0,xp:0};
  rewards.eggRarity=null;
  if(Math.random()<map.eggChance*harvest){
    const table=map.eggTable||["N","N","R"];
    const er=table[Math.floor(Math.random()*table.length)];
    addEgg(er,1);
    rewards.eggs=1; rewards.eggRarity=er;
  }
  if(Math.random()<map.expItemChance*harvest){ rewards.expItems=1; ps.items.exp_potion=(ps.items.exp_potion||0)+1; }
  rewards.xp=Math.round(map.xpPerHour*(map.durationMin/60)*(0.7+harvest)*(1+getUpgradeEffect("dispatchXp")));
  // 时间片越充足（出发时状态已在 stamina 扣除后），收获略好已体现在 harvest
  if(Math.random()<(map.kbChance||0)*harvest){ rewards.kb=1; addCurrency("kb",1); }
  if(Math.random()<(map.mbChance||0)*harvest){ rewards.mb=1; addCurrency("mb",1); }
  d.totalXp=(d.totalXp||0)+rewards.xp; ps.dispatches.splice(idx,1);
  d.stats=d.stats||{}; d.stats.dispatchClaims=(d.stats.dispatchClaims||0)+1;
  if(typeof global.saveData==="function") global.saveData(d);
  try{ if(typeof global.checkAchievements==="function") global.checkAchievements(buildPetAchieveCtx()); }catch(e){}
  return {ok:true,rewards};
}
function processOffline(){
  try{ accumulateIdle(); }catch(e){}
  const d=global.data, ps=ensurePetSystem(), now=Date.now();
  const last=ps.lastHarvestAt||ps.lastLoginAt||now, maxMs=8*3600*1000;
  const effective=Math.min(Math.max(0,now-last),maxMs), progress=Math.min(1,effective/maxMs);
  const activeCount=ps.dispatches.length;
  const offlineXp=activeCount>0?Math.floor((effective/3600000)*10*activeCount):Math.floor((effective/3600000)*2);
  ps._offlinePreview={progress,elapsedMs:effective,offlineXp,maxMs,canClaim:offlineXp>0&&effective>60000};
  ps.lastLoginAt=now; if(typeof global.saveData==="function") global.saveData(d); return ps._offlinePreview;
}
function claimOffline(){
  const d=global.data, ps=ensurePetSystem(), prev=processOffline();
  if(isPetAntiLocked()) return {ok:false,msg:"防沉迷锁定中，无法领取离线收益", locked:true};
  if(!prev||!prev.canClaim) return {ok:false,msg:"暂无收益"};
  if(getSyncPermitCount()<1){
    return {ok:false,msg:"需要「时序校准符」才能安全取回离线收益（正确率≥90%的练习可获得）", needPermit:true};
  }
  if(!consumeSyncPermit(1)) return {ok:false,msg:"时序校准符不足", needPermit:true};
  d.totalXp=(d.totalXp||0)+prev.offlineXp; ps.lastHarvestAt=Date.now(); ps._offlinePreview=null;
  if(typeof global.saveData==="function") global.saveData(d); return {ok:true,xp:prev.offlineXp, usedPermit:1};
}

let petTab="overview";
let petPage=1;
const PETS_PER_PAGE=6;


function petSoundEnabled(){
  try { return !(global.data && global.data.settings && global.data.settings.sound===false); } catch(e){ return true; }
}
function petAnimEnabled(){
  try { return !(global.data && global.data.settings && global.data.settings.anim===false); } catch(e){ return true; }
}
function petPlayTone(freq, dur, type, vol){
  if(!petSoundEnabled()) return;
  if(typeof global.playTone==="function"){ global.playTone(freq, dur, type||"sine", vol||0.12); return; }
}
function petSfx(kind){
  if(!petSoundEnabled()) return;
  if(kind==="click"){ petPlayTone(440,0.05,"sine",0.08); }
  else if(kind==="select"){ petPlayTone(520,0.06); setTimeout(()=>petPlayTone(660,0.08),50); }
  else if(kind==="buy"){ petPlayTone(392,0.06); setTimeout(()=>petPlayTone(523,0.1),70); }
  else if(kind==="release"){ petPlayTone(300,0.08,"square",0.06); setTimeout(()=>petPlayTone(200,0.12,"square",0.05),90); }
  else if(kind==="gacha"){ petPlayTone(300,0.05); setTimeout(()=>petPlayTone(450,0.06),80); setTimeout(()=>petPlayTone(600,0.08),160); }
  else if(kind==="ssr"){ petPlayTone(523,0.1); setTimeout(()=>petPlayTone(659,0.1),100); setTimeout(()=>petPlayTone(784,0.12),200); setTimeout(()=>petPlayTone(1046,0.15),320); }
  else if(kind==="sr"){ petPlayTone(587,0.08); setTimeout(()=>petPlayTone(740,0.12),100); }
  else if(kind==="ok"){ petPlayTone(660,0.08); setTimeout(()=>petPlayTone(880,0.1),70); }
  else if(kind==="err"){ petPlayTone(200,0.15,"square",0.08); }
}
function petBurst(color, count, anchorEl){
  if(!petAnimEnabled()) return;
  let x = window.innerWidth/2, y = window.innerHeight*0.38;
  if(anchorEl && anchorEl.getBoundingClientRect){
    try{
      const r=anchorEl.getBoundingClientRect();
      x=r.left + r.width/2;
      y=r.top + r.height/2;
    }catch(e){}
  }
  if(typeof global.spawnParticles==="function"){
    global.spawnParticles(x, y, count||18, color||"#60a5fa");
    global.spawnParticles(x + (Math.random()-0.5)*40, y-12, Math.floor((count||18)/2), color||"#a78bfa");
  }
}
function playSelectPetAnim(pet, cardEl){
  if(!petAnimEnabled()) return;
  const disp=getPetDisplay(pet);
  const stage=disp.stage||1;
  const rarity=disp.rarity||"N";
  // 卡片弹跳
  if(cardEl){
    cardEl.classList.remove("pet-select-pop");
    void cardEl.offsetWidth;
    cardEl.classList.add("pet-select-pop");
    const em=cardEl.querySelector(".pet-card-emoji");
    if(em){
      em.classList.remove("pet-bounce-n","pet-bounce-r","pet-bounce-sr","pet-bounce-ssr");
      const cls = rarity==="SSR"||stage>=4 ? "pet-bounce-ssr"
        : rarity==="SR"||stage>=3 ? "pet-bounce-sr"
        : rarity==="R"||stage>=2 ? "pet-bounce-r" : "pet-bounce-n";
      void em.offsetWidth;
      em.classList.add(cls);
    }
  }
  // 左侧 main 同步动画
  const mainEm=document.getElementById("pet-main-emoji");
  if(mainEm){
    mainEm.classList.remove("pet-main-select","pet-main-tier2","pet-main-tier3","pet-main-tier4");
    void mainEm.offsetWidth;
    let tier="pet-main-select";
    if(stage>=4 || rarity==="SSR") tier="pet-main-tier4";
    else if(stage>=3 || rarity==="SR") tier="pet-main-tier3";
    else if(stage>=2 || rarity==="R") tier="pet-main-tier2";
    mainEm.classList.add(tier);
  }
  const homeEm=document.getElementById("home-pet-emoji");
  if(homeEm){
    homeEm.classList.remove("pet-main-select","pet-main-tier2","pet-main-tier3","pet-main-tier4");
    void homeEm.offsetWidth;
    homeEm.classList.add(stage>=3?"pet-main-tier3":"pet-main-select");
  }
}


function petToast(msg, type){
  type = type || "info";
  if(type==="success") petSfx("ok");
  else if(type==="error") petSfx("err");
  // 走统一合并提示，避免连续相同气泡
  if(typeof global.uiToast==="function"){
    global.uiToast(msg, type==="error"?"error":(type==="success"?"success":"info"));
    return;
  }
  let layer = document.getElementById("toast-layer");
  if(!layer){
    layer = document.createElement("div");
    layer.id = "toast-layer";
    document.body.appendChild(layer);
  }
  const el = document.createElement("div");
  el.className = "float-toast float-toast-" + type;
  el.textContent = msg;
  layer.appendChild(el);
  requestAnimationFrame(()=> el.classList.add("show"));
  setTimeout(()=>{
    el.classList.remove("show");
    el.classList.add("hide");
    setTimeout(()=> el.remove(), 280);
  }, 2200);
}

let _petAntiTimer=null;
function renderPetPage(){
  ensurePetSystem(); processOffline();
  try{ petSessionStart(); }catch(e){}
  if(_petAntiTimer){ clearInterval(_petAntiTimer); _petAntiTimer=null; }
  _petAntiTimer=setInterval(function(){
    var st=petSessionTick();
    var el=document.getElementById("pet-anti-status");
    if(el) el.textContent=st.locked?("已锁定（明日重置）"):("今日剩余 "+st.leftSec+" 秒");
    if(st.locked){
      clearInterval(_petAntiTimer); _petAntiTimer=null;
      try{ renderPetPage(); }catch(e){}
    }
  }, 1000);
  let host=document.getElementById("pet-page-root");
  if(!host){ host=document.createElement("div"); host.id="pet-page-root";
    const right=document.querySelector(".pet-side-right")||document.getElementById("pet-view");
    if(right) right.appendChild(host);
  }
  // 左侧当前 main 预览
  try {
    const pet=getActivePet();
    const em=document.getElementById("pet-main-emoji");
    const nm=document.getElementById("pet-main-name");
    const meta=document.getElementById("pet-main-meta");
    const res=document.getElementById("pet-res-bar");
    const d=global.data||{};
    const lv=getPlayerLevelInfo();
    if(pet){
      const disp=getPetDisplay(pet);
      if(em){
        em.textContent=disp.emoji;
        em.className="pet-main-emoji pet-breath"+(disp.shiny?" pet-shiny-emoji":"");
        if(disp.glow) em.style.setProperty("--pet-glow", disp.glow);
      }
      if(nm) nm.textContent=disp.name;
      if(meta) meta.innerHTML=`<span style="color:${disp.rarityColor}">${disp.rarityName}</span> · ${disp.stage}/${disp.maxStage}阶<br>时间片 ${disp.stamina}/${disp.maxStamina} · I/O ${disp.harvest}%`;
    } else {
      if(em) em.textContent="💾";
      if(nm) nm.textContent="未绑定 main";
      if(meta) meta.textContent="从右侧 Heap 选择进程";
    }
    if(res) res.innerHTML=`Lv.${lv.level}<br>XP ${d.totalXp||0}<br><span style="color:#86efac">Byte ${d.bytes||0}</span><br><span style="color:#93c5fd">KB ${d.kb||0}</span> · <span style="color:#fbbf24">MB ${d.mb||0}</span><br>蛋 ${totalEggs()}`;
  } catch(e) {}

  const d=global.data, ps=d.petSystem, xp=d.totalXp||0, offline=ps._offlinePreview||processOffline(), pct=Math.round((offline.progress||0)*100);
  const lv=getPlayerLevelInfo();
  const bytes=d.bytes||0;
  try{ accumulateIdle(); checkMilestones(); }catch(e){}
  const idle=getIdlePreview();
  host.innerHTML=`<div class="idle-banner">
    <div class="idle-rate">挂机 <strong>${idle.rate}</strong> Byte/分</div>
    <div class="idle-pending">待领取 <strong id="idle-pending-num">${idle.pending}</strong></div>
    <button type="button" class="btn-primary btn-sm" id="btn-claim-idle">一键收获</button>
  </div>
  <div class="pet-offline pet-offline-inline"><div class="pet-offline-label">离线 XP 进度 ${pct}%</div><div class="daily-checkin-bar"><i style="width:${pct}%"></i></div>
  <button type="button" class="btn-secondary btn-sm" id="btn-claim-offline" ${offline.canClaim?"":"disabled"}>收取约 ${offline.offlineXp||0} XP</button></div>
  <div class="tab-bar tab-bar-scroll" id="pet-tabs">
  <button type="button" class="tab-btn ${petTab==="overview"?"active":""}" data-tab="overview">总览</button>
  <button type="button" class="tab-btn ${petTab==="team"?"active":""}" data-tab="team">${UI_LABELS.warehouse||"Heap"}</button>
  <button type="button" class="tab-btn ${petTab==="gacha"?"active":""}" data-tab="gacha">孵化</button>
  <button type="button" class="tab-btn ${petTab==="upgrade"?"active":""}" data-tab="upgrade">升级</button>
  <button type="button" class="tab-btn ${petTab==="dispatch"?"active":""}" data-tab="dispatch">派遣</button>
  <button type="button" class="tab-btn ${petTab==="shop"?"active":""}" data-tab="shop">apt</button></div>
  <div class="pet-anti-bar" id="pet-anti-bar"></div>
  <div id="pet-tab-body"></div>`;
  const anti=getAntiStatus();
  const antiBar=document.getElementById("pet-anti-bar");
  if(antiBar){
    antiBar.innerHTML=anti.locked
      ? `<strong>防沉迷锁定</strong>：今日宠物系统已用满 5 分钟，窗口功能与挂机收益已暂停，明日再来。`
      : `防沉迷：今日宠物可用 <strong id="pet-anti-status">${anti.leftSec} 秒</strong>（满 5 分钟锁定收益与操作）`;
    antiBar.className="pet-anti-bar"+(anti.locked?" locked":"");
  }
  if(anti.locked){
    const body=document.getElementById("pet-tab-body");
    if(body) body.innerHTML=`<div class="pet-lock-panel">
      <div style="font-size:2.5rem">🔒</div>
      <p>今日在宠物系统中的时间已达 <strong>5 分钟</strong>。</p>
      <p>挂机收益已停止计算，领取与探索等操作暂不可用。</p>
      <p class="setting-hint">明天再来，或先去做题练习吧。</p>
    </div>`;
    host.querySelectorAll("#pet-tabs .tab-btn").forEach(btn=>{ btn.disabled=true; });
    const ci=document.getElementById("btn-claim-idle");
    const co=document.getElementById("btn-claim-offline");
    if(ci){ ci.disabled=true; ci.onclick=()=>petToast("防沉迷锁定中","error"); }
    if(co){ co.disabled=true; co.onclick=()=>petToast("防沉迷锁定中","error"); }
    return;
  }
  host.querySelectorAll("#pet-tabs .tab-btn").forEach(btn=>{btn.onclick=()=>{petTab=btn.dataset.tab; renderPetPage();};});
  const claimBtn=document.getElementById("btn-claim-offline");
  if(claimBtn) claimBtn.onclick=()=>{ const r=claimOffline(); petToast(r.ok?("领取了 "+r.xp+" XP"):(r.msg||"失败")); renderPetPage(); if(typeof global.updateHome==="function") global.updateHome(); };
  const claimIdleBtn=document.getElementById("btn-claim-idle");
  if(claimIdleBtn) claimIdleBtn.onclick=()=>{
    const r=claimIdle();
    if(r.ok){ petToast("校准取回 +"+r.amount+" Byte"+(r.msgExtra||"")+"（耗符×1）","success"); if(typeof petBurst==="function") petBurst("#86efac",16); }
    else petToast(r.msg||"无","error");
    renderPetPage(); if(typeof global.updateHome==="function") global.updateHome();
  };
  const body=document.getElementById("pet-tab-body");
  if(petTab==="overview") renderOverviewTab(body);
  else if(petTab==="team") renderTeamTab(body);
  else if(petTab==="gacha") renderGachaTab(body);
  else if(petTab==="upgrade") renderUpgradeTab(body);
  else if(petTab==="shop") renderShopTab(body);
  else if(petTab==="dispatch") renderDispatchTab(body);
  else renderOverviewTab(body);
}

function renderOverviewTab(body){
  if(!body) return;
  const d=global.data, ps=ensurePetSystem(), idle=getIdlePreview();
  const permits=getSyncPermitCount();
  const claimCap=getClaimCapByte();
  const nextMs=MILESTONES.filter(m=>!ps.milestones[m.id]);
  const ssr=(ps.pets||[]).filter(p=>(SPECIES_MAP[p.speciesId]||{}).rarity==="SSR").length;
  const ctx={pets:(ps.pets||[]).length,dispatchClaims:(d.stats&&d.stats.dispatchClaims)||0,lifetimeIdle:Math.floor(ps.lifetimeIdle||0),gachaCount:ps.gachaCount||0,ssr:ssr};
  let msHtml=nextMs.slice(0,5).map(m=>{
    const cur=ctx[m.need]||0;
    const pct=Math.min(100, Math.round(cur/Math.max(1,m.n)*100));
    return `<div class="ms-row"><div class="ms-name">${m.name}</div><div class="daily-checkin-bar"><i style="width:${pct}%"></i></div><div class="ms-meta">${cur}/${m.n} · 奖 ${m.prizeBytes}B</div></div>`;
  }).join("")||"<div class='setting-hint'>里程碑已全部完成！🎉</div>";
  const done=Object.keys(ps.milestones||{}).length;
  body.innerHTML=`<div class="overview-card">
    <div class="ov-title">📈 增长仪表盘</div><div class="setting-hint">⏳ 时序校准符 ×${permits}（领取挂机/离线收益各消耗 1；正确率≥90% 练习可获得）</div>
    <div class="ov-grid">
      <div class="ov-item"><span>挂机速度</span><strong>${idle.rate}/分</strong></div>
      <div class="ov-item"><span>待收获</span><strong style="color:#86efac">${idle.pending}</strong></div>
      <div class="ov-item"><span>累计挂机</span><strong>${idle.lifetime}</strong></div>
      <div class="ov-item"><span>进程数</span><strong>${(ps.pets||[]).length}</strong></div>
      <div class="ov-item"><span>new 次数</span><strong>${ps.gachaCount||0}</strong></div>
      <div class="ov-item"><span>里程碑</span><strong>${done}/${MILESTONES.length||0}</strong></div>
    </div>
    <p class="setting-hint">做题 → Byte → 升级挂机 → 数字上涨 → 再做题。挂机即使离开也会累积（最多 12 小时）。</p>
    <div class="ov-title" style="margin-top:12px;">🎯 下一里程碑</div>
    ${msHtml}
  </div>`;
}

function renderUpgradeTab(body){
  if(!body) return;
  if(!UPGRADES.length){ body.innerHTML="<p class='setting-hint'>暂无升级配置</p>"; return; }
  body.innerHTML=`<p class="setting-hint">永久升级 · 花 Byte 让数字永远变大</p><div class="upgrade-list" id="upgrade-list"></div>`;
  const list=body.querySelector("#upgrade-list");
  UPGRADES.forEach(u=>{
    const lv=upgradeLevel(u.id);
    const max=u.max||99;
    const cost=upgradeCost(u);
    const full=lv>=max;
    const card=document.createElement("div");
    card.className="upgrade-card";
    card.innerHTML=`<div class="up-emoji">${u.emoji}</div>
      <div class="up-body"><strong>${u.name}</strong> <span class="up-lv">Lv.${lv}/${max}</span>
      <div class="setting-hint">${u.desc}</div>
      <div class="daily-checkin-bar"><i style="width:${Math.round(lv/max*100)}%"></i></div></div>
      <button type="button" class="btn-secondary btn-sm" data-id="${u.id}" ${full?"disabled":""}>${full?"MAX":cost+" "+(u.currency||"byte").toUpperCase()}</button>`;
    list.appendChild(card);
  });
  list.querySelectorAll("button[data-id]").forEach(btn=>{
    btn.onclick=()=>{
      const r=buyUpgrade(btn.dataset.id);
      if(r.ok){ petToast("升级成功","success"); if(typeof petBurst==="function") petBurst("#fbbf24",12); }
      else petToast(r.msg||"失败","error");
      renderPetPage(); if(typeof global.updateHome==="function") global.updateHome();
    };
  });
}


function renderTeamTab(body){
  const ps=ensurePetSystem(); if(!ps.pets.length){body.innerHTML="<p class='setting-hint'>Heap 为空，去 new 一个进程吧！</p>"; return;}
  const items=ps.items||{};
  const total=ps.pets.length;
  const pages=Math.max(1, Math.ceil(total/PETS_PER_PAGE));
  if(petPage>pages) petPage=pages;
  if(petPage<1) petPage=1;
  const slice=ps.pets.slice((petPage-1)*PETS_PER_PAGE, petPage*PETS_PER_PAGE);
  body.innerHTML=`<div class="setting-hint">道具 🍪${items.food||0} 🧪${items.exp_potion||0} 🍱${items.super_food||0} 🥚${items.egg||0} · Heap ${total}/${ps.warehouseCap||8} <button type="button" class="btn-secondary btn-sm" id="btn-expand-wh">sbrk 扩容</button></div>
  <div class="pet-grid" id="pet-grid"></div>
  <div class="pager" id="pet-pager">
    <button type="button" class="btn-secondary btn-sm" id="pet-page-prev" ${petPage<=1?"disabled":""}>上一页</button>
    <span class="pager-info">${petPage} / ${pages}</span>
    <button type="button" class="btn-secondary btn-sm" id="pet-page-next" ${petPage>=pages?"disabled":""}>下一页</button>
  </div>
  <div class="pet-feed-row"><select id="feed-pet-select"></select>
  <select id="feed-item-select"><option value="food">🍪 逻辑饼干</option><option value="exp_potion">🧪 经验药水</option><option value="super_food">🍱 满分大餐</option></select>
  <button type="button" class="btn-primary btn-sm" id="btn-feed-pet">喂养</button>
  <button type="button" class="btn-secondary btn-sm" id="btn-hatch-egg">孵化宠物蛋</button></div>`;
  const grid=body.querySelector("#pet-grid"), sel=body.querySelector("#feed-pet-select");
  // 下拉包含全部宠物
  ps.pets.forEach(pet=>{
    const disp=getPetDisplay(pet);
    const opt=document.createElement("option"); opt.value=pet.uid; opt.textContent=disp.emoji+" "+disp.name+(pet.uid===ps.activePetId?" · 已选中":""); sel.appendChild(opt);
  });
  if(ps.activePetId) sel.value=ps.activePetId;
  slice.forEach(pet=>{
    const disp=getPetDisplay(pet), active=pet.uid===ps.activePetId, busy=ps.dispatches.some(x=>x.petUid===pet.uid);
    const shinyCls=disp.shiny?(" shiny shiny-"+(disp.sparkle||"gold")+(disp.shinyKey==="char"?" shiny-char":"")+(disp.shinyKey==="float"?" shiny-float":"")):"";
    const card=document.createElement("div");
    card.className="pet-card"+(active?" active":"")+shinyCls+(disp.unique?" unique-const":"");
    if(disp.shiny) card.style.setProperty("--pet-glow", disp.glow||disp.rarityColor);
    card.innerHTML=`<div class="pet-card-emoji pet-breath ${disp.shiny?"pet-shiny-emoji":""} ${disp.unique?"pet-unique-emoji":""}">${disp.emoji}${disp.shiny?'<span class="shiny-spark">✨</span>':""}${disp.unique?'<span class="const-spark">const</span>':""}</div>
    <div class="pet-card-name">${disp.name}${disp.shiny?' <span class="shiny-badge">闪光</span>':""}${disp.unique?' <span class="const-badge">const</span>':""}</div>
    <div class="pet-card-meta" style="color:${disp.rarityColor}">${disp.rarityName} · ${disp.stage}/${disp.maxStage}阶</div>
    <div class="pet-card-meta">时间片 ${disp.stamina}/${disp.maxStamina} · I/O ${disp.harvest}%${disp.shiny?' <span class="shiny-bonus">↑</span>':""}</div>
    <div class="pet-card-meta">${busy?"🚀 运行中":(active?"✓ main":"绑定 main")}</div>
    <button type="button" class="btn-release btn-sm" data-uid="${pet.uid}" title="放生">return 0</button>`;
    card.style.cursor="pointer";
    card.onclick=(e)=>{ if(e.target.closest(".btn-release")) return; setActivePet(pet.uid); petSfx("select"); playSelectPetAnim(pet, card); petBurst(disp.rarityColor, 14, card); petToast("已选中 "+disp.emoji+" "+disp.name+"（"+disp.rarityName+"）","success"); };
    grid.appendChild(card);
  });
  body.querySelector("#pet-page-prev").onclick=()=>{ petPage--; renderPetPage(); };
  body.querySelector("#pet-page-next").onclick=()=>{ petPage++; renderPetPage(); };
  const expBtn=body.querySelector("#btn-expand-wh");
  if(expBtn) expBtn.onclick=()=>{ const r=expandWarehouse(); petToast(r.ok?("Heap 扩至 "+r.cap+"（-"+r.cost+" Byte）"):(r.msg||"失败"), r.ok?"success":"error"); renderPetPage(); if(typeof global.updateHome==="function") global.updateHome(); };
  grid.querySelectorAll(".btn-release").forEach(b=>{
    b.onclick=(e)=>{ e.stopPropagation();
      const pet=ps.pets.find(p=>p.uid===b.dataset.uid); const dd=pet?getPetDisplay(pet):null;
      if(!confirm("确认 return 0？将放生 "+(dd?dd.emoji+" "+dd.name:"该宠物"))) return;
      const r=releasePet(b.dataset.uid);
      if(r.ok) petSfx("release"); petToast(r.ok?("return 0; // 已放生"):(r.msg||"失败"), r.ok?"info":"error");
      renderPetPage(); if(typeof global.updateHome==="function") global.updateHome();
    };
  });
  body.querySelector("#btn-feed-pet").onclick=()=>{ const r=feedPet(sel.value, body.querySelector("#feed-item-select").value); petToast(r.ok?"喂养成功":(r.msg||"失败"), r.ok?"success":"error"); renderPetPage(); };
  body.querySelector("#btn-hatch-egg").onclick=()=>{ const r=hatchEgg(); if(r.ok){const dd=getPetDisplay(r.pet); petToast("孵化成功："+dd.emoji+" "+dd.name,"success");} else petToast(r.msg||"失败","error"); renderPetPage(); };
}
function renderGachaTab(body){
  const ps=ensurePetSystem();
  const eggs=ps.eggs||{N:0,R:0,SR:0,SSR:0};
  const pet=getActivePet();
  const disc=Math.min(0.5, ps.hatchDiscount||0);
  body.innerHTML=`<p class="setting-hint">蛋来自<strong>练习结算</strong>与<strong>地图探索</strong>，不可用货币购买抽取。<br>
  稀有蛋更容易孵出高品质进程；孵化消耗 main 的<strong>时间片</strong>。</p>
  <div class="egg-grid" id="egg-grid"></div>
  <p class="setting-hint">当前 main 时间片：${pet?((pet.stamina||0)+"/"+(pet.maxStamina||0)):"未绑定"} · 孵化减免 ${Math.round(disc*100)}% · 加成次数 ${ps.hatchBoost||0}</p>
  <div id="hatch-result" class="hatch-result"></div>`;
  const grid=body.querySelector("#egg-grid");
  ["N","R","SR","SSR"].forEach(r=>{
    const lab=EGG_LABEL[r]||{name:r,emoji:"🥚"};
    const n=eggs[r]||0;
    const cost=Math.max(3, Math.ceil((HATCH_STAMINA[r]||10)*(1-disc)));
    const card=document.createElement("div");
    card.className="egg-card";
    card.innerHTML=`<div style="font-size:1.8rem">${lab.emoji}</div>
      <strong style="color:${lab.color||'#e2e8f0'}">${lab.name}</strong>
      <div>库存 <strong>${n}</strong></div>
      <div class="setting-hint">耗时片 ${cost}</div>
      <button type="button" class="btn-primary btn-sm" data-r="${r}" ${n<1?"disabled":""}>孵化</button>`;
    grid.appendChild(card);
  });
  grid.querySelectorAll("button[data-r]").forEach(btn=>{
    btn.onclick=async ()=>{
      btn.disabled=true;
      const r=hatchEgg(btn.dataset.r);
      const box=document.getElementById("hatch-result");
      if(r.ok){
        try{ await playHatchAnimation(r.eggRarity||btn.dataset.r, r.pet); }catch(e){}
        const d=getPetDisplay(r.pet);
        if(box) box.innerHTML=`孵化成功！${d.emoji} <strong>${d.name}</strong>（${d.rarityName}）· 耗时片 ${r.cost}`;
        petToast("孵化成功 "+d.name,"success");
      } else {
        petToast(r.msg||"失败","error");
      }
      renderPetPage(); if(typeof global.updateHome==="function") global.updateHome();
    };
  });
}
function renderShopTab(body){
  body.innerHTML='<div class="shop-grid"></div>'; const grid=body.querySelector(".shop-grid");
  SHOP_ITEMS.forEach(item=>{
    const card=document.createElement("div"); card.className="shop-card";
    card.innerHTML=`<div style="font-size:1.6rem">${item.emoji}</div><strong>${item.name}</strong><div class="setting-hint">${item.desc}</div><div>${item.price} ${(item.currency||'byte').toUpperCase()}</div><button type="button" class="btn-secondary btn-sm" data-id="${item.id}">apt install</button>`;
    grid.appendChild(card);
  });
  grid.querySelectorAll("button[data-id]").forEach(btn=>{ btn.onclick=()=>{ const r=buyItem(btn.dataset.id,1); if(r.ok){petSfx("buy"); petBurst("#86efac",12);} petToast(r.ok?"购买成功":(r.msg||"失败"), r.ok?"success":"error"); renderPetPage(); if(typeof global.updateHome==="function") global.updateHome(); }; });
}
function formatRemain(ms){
  const s=Math.max(0,Math.ceil(ms/1000));
  const m=Math.floor(s/60), sec=s%60;
  return m+":"+String(sec).padStart(2,"0");
}
function renderDispatchTab(body){
  if(!body) return;
  const d=global.data, ps=ensurePetSystem();
  try{ regenPetStamina(ps); }catch(e){}
  const slotCost=120*ps.dispatchSlots;
  body.innerHTML=`<div class="setting-hint">把进程派去地图「探索」：消耗时间片，完成后领取 <strong>蛋 / XP / KB</strong>。<br>
  并发槽 ${ps.dispatches.length}/${ps.dispatchSlots}
  <button type="button" class="btn-secondary btn-sm" id="btn-unlock-slot">扩展(+1 · ${slotCost} Byte)</button></div>
  <div id="dispatch-list"></div>
  <h4 style="margin:14px 0 8px;color:#93c5fd;">派出探索</h4>
  <div class="pet-feed-row">
    <select id="disp-pet"></select>
    <select id="disp-map"></select>
    <button type="button" class="btn-primary btn-sm" id="btn-start-disp">开始探索</button>
  </div>
  <h4 style="margin:14px 0 8px;color:#93c5fd;">地图</h4>
  <div id="map-list"></div>`;

  // active missions
  const dlist=body.querySelector("#dispatch-list");
  if(!ps.dispatches.length){
    dlist.innerHTML="<div class='setting-hint'>当前没有探索任务。选一只进程 + 地图，点「开始探索」。</div>";
  } else {
    ps.dispatches.forEach((disp,i)=>{
      const pet=ps.pets.find(p=>p.uid===disp.petUid);
      const map=MAPS.find(m=>m.id===disp.mapId);
      const prog=calcDispatchProgress(disp);
      const left=Math.max(0,(disp.durationMs||0)-(Date.now()-disp.startedAt));
      const dd=pet?getPetDisplay(pet):{emoji:"?",name:"?"};
      const done=prog>=1;
      const row=document.createElement("div");
      row.className="dispatch-row";
      row.innerHTML=`<div><strong>${dd.emoji} ${dd.name}</strong> → ${map?(map.emoji+" "+map.name):"?"}
        <span class="dispatch-live">${done?"已完成":("剩余 "+formatRemain(left))}</span></div>
        <div class="daily-checkin-bar"><i style="width:${Math.round(prog*100)}%"></i></div>
        <button type="button" class="btn-primary btn-sm" data-i="${i}" ${done?"":"disabled"}>${done?"领取奖励":"探索中…"}</button>`;
      dlist.appendChild(row);
    });
    dlist.querySelectorAll("button[data-i]").forEach(btn=>{
      btn.onclick=()=>{
        const r=claimDispatch(+btn.dataset.i);
        if(r.ok){
          const rw=r.rewards||{};
          const parts=[`XP+${rw.xp||0}`];
          if(rw.eggs) parts.push(`蛋(${rw.eggRarity||"N"})`);
          if(rw.expItems) parts.push("药水");
          if(rw.kb) parts.push("KB+1");
          if(rw.mb) parts.push("MB+1");
          petToast("探索收获："+parts.join(" · "),"success");
          if(typeof petBurst==="function") petBurst("#60a5fa",14);
        } else petToast(r.msg||"失败","error");
        renderPetPage();
        if(typeof global.updateHome==="function") global.updateHome();
      };
    });
    // 自动刷新进度
    if(window._dispTimer) clearInterval(window._dispTimer);
    window._dispTimer=setInterval(()=>{
      if(petTab!=="dispatch"){ clearInterval(window._dispTimer); return; }
      const host=document.getElementById("pet-tab-body");
      if(host) renderDispatchTab(host);
    }, 5000);
  }

  const maps=body.querySelector("#map-list");
  const myXp=(d.totalXp||0);
  MAPS.forEach(m=>{
    const unlocked=ps.mapsUnlocked.includes(m.id);
    const needLv=xpToApproxLevel(m.unlockXp||0);
    const xpOk=myXp>=(m.unlockXp||0);
    const byteCost=Math.max(20, Math.floor((m.unlockXp||0)/10));
    const el=document.createElement("div");
    el.className="map-card"+(unlocked?"":(xpOk?" map-unlockable":" map-locked"));
    let statusHtml;
    if(unlocked) statusHtml="<span class='status done'>✓ 已开放</span>";
    else if(!xpOk) statusHtml=`<span class="lock-badge">🔒 需约 Lv.${needLv}</span>`;
    else statusHtml=`<button type="button" class="btn-secondary btn-sm btn-unlock-map" data-id="${m.id}">开放（${byteCost} Byte）</button>`;
    el.innerHTML=`<strong>${m.emoji} ${m.name}</strong>
      <div class="setting-hint">${m.durationMin} 分钟 · 耗时片 ${m.staminaCost} · 易掉 ${ (m.eggTable||["N"]).join("/") }</div>
      ${statusHtml}`;
    maps.appendChild(el);
  });
  maps.querySelectorAll(".btn-unlock-map").forEach(btn=>{
    btn.onclick=()=>{
      const mapId=btn.dataset.id;
      const m=MAPS.find(x=>x.id===mapId);
      const cost=Math.max(20, Math.floor((m.unlockXp||0)/10));
      if((d.bytes||0)<cost){ petToast("Byte 不足","error"); return; }
      d.bytes-=cost;
      if(!ps.mapsUnlocked.includes(mapId)) ps.mapsUnlocked.push(mapId);
      if(typeof global.saveData==="function") global.saveData(d);
      petToast("地图已开放","success");
      renderPetPage();
    };
  });

  const petSel=body.querySelector("#disp-pet");
  const mapSel=body.querySelector("#disp-map");
  let avail=0;
  ps.pets.forEach(p=>{
    if(ps.dispatches.some(x=>x.petUid===p.uid)) return;
    const dd=getPetDisplay(p);
    const o=document.createElement("option");
    o.value=p.uid;
    o.textContent=`${dd.emoji} ${dd.name}（时片 ${p.stamina||0}/${p.maxStamina||0}）`;
    petSel.appendChild(o);
    avail++;
  });
  if(!avail){
    const o=document.createElement("option"); o.value=""; o.textContent="没有空闲进程（可能都在探索或没有宠物）"; petSel.appendChild(o);
  }
  MAPS.filter(m=>ps.mapsUnlocked.includes(m.id)).forEach(m=>{
    const o=document.createElement("option");
    o.value=m.id;
    o.textContent=`${m.emoji} ${m.name}（${m.durationMin}分 / 耗${m.staminaCost}）`;
    mapSel.appendChild(o);
  });
  body.querySelector("#btn-start-disp").onclick=()=>{
    if(!petSel.value||!mapSel.value){ petToast("请选择进程和地图","error"); return; }
    const r=startDispatch(petSel.value, mapSel.value);
    if(r.ok){ petToast("探索开始！完成后可领取","success"); if(typeof petSfx==="function") petSfx("ok"); }
    else petToast(r.msg||"失败","error");
    renderPetPage();
  };
  const slotBtn=body.querySelector("#btn-unlock-slot");
  if(slotBtn) slotBtn.onclick=()=>{
    const r=unlockDispatchSlot();
    petToast(r.ok?"并发槽+1":(r.msg||"失败"), r.ok?"success":"error");
    renderPetPage();
  };
}


function maybeShowPetBless(){
  const d=global.data; if(!d||!d.settings||d.settings.petBless===false) return;
  const cfg=(typeof global.getConfig==="function"?global.getConfig():global.GESP_CONFIG)||{};
  if(Math.random()>(cfg.petBlessChance!=null?cfg.petBlessChance:0.45)) return;
  const el=document.getElementById("pet-bless"); if(!el) return;
  const name=typeof global.getUserName==="function"?global.getUserName():"同学";
  const pet=getActivePet();
  let text;
  if(pet){
    const sp=getSpecies(pet); const disp=getPetDisplay(pet);
    const lines=sp.lines||["加油刷题！"];
    const line=lines[Math.floor(Math.random()*lines.length)];
    const prefs=RARITY_PREFIX[sp.rarity]||[""];
    const pref=prefs[Math.floor(Math.random()*prefs.length)];
    text=`${disp.emoji} ${disp.name}：${pref}${name}，${line}`;
  } else {
    text=`💾 系统：${name}，Heap 空闲，去 new 一个进程吧！`;
  }
  el.style.display="block"; el.textContent=text;
  setTimeout(()=>{el.style.display="none";},6500);
}
global.PET_SPECIES=PET_SPECIES; global.releasePet=releasePet; global.expandWarehouse=expandWarehouse; global.PET_PATHS={}; global.GACHA_XP_COST=GACHA_XP_COST;
global.getPetStage=getPetStage; global.getNextPetStage=getNextPetStage; global.getPetPathId=getPetPathId; global.setPetPath=setPetPath;
global.renderPetPage=renderPetPage;
global.playHatchAnimation=playHatchAnimation;
global.hatchAnimEnabled=hatchAnimEnabled;
global.petSessionEnd=petSessionEnd;
global.petSessionStart=petSessionStart;
global.isPetAntiLocked=isPetAntiLocked;
global.getAntiStatus=getAntiStatus;
 global.getIdlePreview=getIdlePreview; global.claimIdle=claimIdle; global.hatchEgg=hatchEgg; global.addEgg=addEgg; global.totalEggs=totalEggs; global.formatWallet=formatWallet; global.normalizeWallet=normalizeWallet; global.getIdleBytePerMin=getIdleBytePerMin; global.maybeShowPetBless=maybeShowPetBless; global.ensurePetSystem=ensurePetSystem; global.processOffline=processOffline; global.buildPetAchieveCtx=buildPetAchieveCtx;
})(typeof window!=="undefined"?window:globalThis);