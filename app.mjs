import * as dndAPI from './dndAPI.mjs';

const monsterDisplay = document.querySelector(".monster");
const monsterBtn = document.querySelector(".randomMonster");

function monsterStat(str){
    return monsterDisplay.querySelector('.'+str);
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

    monsterStat('str').textContent = monster['strength'];
    monsterStat('dex').textContent = monster['dexterity'];
    monsterStat('con').textContent = monster['constitution'];
    monsterStat('int').textContent = monster['intelligence'];
    monsterStat('wis').textContent = monster['wisdom'];
    monsterStat('cha').textContent = monster['charisma'];

    if(monsterDisplay.classList.contains('hidden')){
        monsterDisplay.classList.remove('hidden');
    }

    const monsterImg = monsterStat('monsterImg')
    if(monster['image']){
        monsterImg.src = await dndAPI.getMonsterImage(id);
        monsterImg.classList.remove("hidden");
    }
    else{
        monsterImg.classList.add("hidden");
    }
   
}

monsterBtn.addEventListener("click",getRandomMonster);