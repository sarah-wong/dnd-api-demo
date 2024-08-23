import * as dndAPI from './dndAPI.mjs';
import * as dice from './dice.mjs';

const monsterDisplay = document.querySelector(".monster");
const monsterBtn = document.querySelector(".randomMonster");

function monsterStat(str){
    return monsterDisplay.querySelector('.'+str);
}

function calcMod(x){
    const mod =  Math.floor((Number(x) - 10)/2);
    return ` (${mod>=0?'+':''}${mod})`;
}

async function getRandomMonster(){
    const monsterList = dndAPI.data['monsters']
    const randIndex = Math.floor(Math.random() * monsterList.length);
    const selection = monsterList[randIndex];
    const id = selection['index']

    const monster = await dndAPI.getMonster(id);
    
    monsterStat('name').textContent = monster['name'];

    monsterStat('size').textContent = monster['size'];
    monsterStat('type').textContent = monster['type'];
    monsterStat('alignment').textContent = monster['alignment'];

    monsterStat('ac').textContent = monster['armor_class'][0]['value'];
    monsterStat('hp').textContent = monster['hit_points'];
    monsterStat('speed').textContent = monster['speed']['walk'];

    const str = monster['strength'];
    const dex = monster['dexterity'];
    const con = monster['constitution'];
    const int = monster['intelligence'];
    const wis = monster['wisdom'];
    const cha = monster['charisma'];

    monsterStat('str').textContent = str + calcMod(str);
    monsterStat('dex').textContent = dex + calcMod(dex);
    monsterStat('con').textContent = con + calcMod(con);
    monsterStat('int').textContent = int + calcMod(int);
    monsterStat('wis').textContent = wis + calcMod(wis);
    monsterStat('cha').textContent = cha + calcMod(cha);

    if(monsterDisplay.classList.contains('hidden')){
        monsterDisplay.classList.remove('hidden');
    }

    const monsterImg = monsterStat('monsterImg');
    if(monster['image']){
        monsterImg.src = await dndAPI.getMonsterImage(id);
        monsterImg.classList.remove("hidden");
    }
    else{
        monsterImg.classList.add("hidden");
    }
   
}

monsterBtn.addEventListener("click", getRandomMonster);