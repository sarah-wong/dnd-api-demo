import * as dndAPI from './dndAPI.mjs';

const monsterDisplay = document.querySelector(".monster");

async function getRandomMonster(){
    const monsterList = dndAPI.data['monsters']
    const randIndex = Math.floor(Math.random() * monsterList.length);
    const selection = monsterList[randIndex];
    const id = selection['index']

    const monster = await dndAPI.getMonster(id);
    
    monsterDisplay.querySelector('.name').textContent = monster['name'];

    monsterDisplay.querySelector('.size').textContent = monster['size'];
    monsterDisplay.querySelector('.type').textContent = monster['type'];
    monsterDisplay.querySelector('.alignment').textContent = monster['alignment'];

    monsterDisplay.querySelector('.ac').textContent = monster['armor_class'][0]['value'];
    monsterDisplay.querySelector('.hp').textContent = monster['hit_points'];
    monsterDisplay.querySelector('.speed').textContent = monster['speed']['walk'];

    monsterDisplay.querySelector('.str').textContent = monster['strength'];
    monsterDisplay.querySelector('.dex').textContent = monster['dexterity'];
    monsterDisplay.querySelector('.con').textContent = monster['constitution'];
    monsterDisplay.querySelector('.int').textContent = monster['intelligence'];
    monsterDisplay.querySelector('.wis').textContent = monster['wisdom'];
    monsterDisplay.querySelector('.cha').textContent = monster['charisma'];

    const monsterImg = monsterDisplay.querySelector('.monsterImg')
    if(monster['image']){
        monsterImg.src = await dndAPI.getMonsterImage(id);
        monsterImg.classList.remove("hidden");
    }
    else{
        monsterImg.classList.add("hidden");
    }
   
}

document.querySelector(".randomMonster").addEventListener("click",getRandomMonster);