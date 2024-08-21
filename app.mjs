import * as dndAPI from './dndAPI.mjs';

const label = document.querySelector(".display>h2");

function getRandomMonster(){
    const monsters = dndAPI.data['monsters'];
    const randIndex = Math.floor(Math.random() * monsters.length);

    label.textContent = monsters[randIndex]['name'];
}

document.querySelector(".randomMonster").addEventListener("click",getRandomMonster);