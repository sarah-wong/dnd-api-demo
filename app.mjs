import * as dndAPI from './dndAPI.mjs';
import * as dice from './dice.mjs';

const monsterDisplay = document.querySelector(".monster");

const textInput = document.querySelector('.monsterSearch .textInput');
const searchBtn = document.querySelector('.monsterSearch .searchBtn');
const randomBtn = document.querySelector(".monsterSearch .randomBtn");
const statusText = document.querySelector(".statusText");
const searchResults = document.querySelector(".searchResults");
const resultList = document.querySelector(".searchResults ul");

function monsterStat(val, useID=false){
    const query = `${useID?'#':'.'}${val}`
    return monsterDisplay.querySelector(query);
}

function addMod(x){
    const mod =  Math.floor((Number(x) - 10)/2);
    return `${x} (${mod>=0?'+':''}${mod})`;
}

function getSpeed(monster){
    const speeds = monster['speed'];
    let outputStr = "";
    for (const speed_type in speeds) {
        const val = speeds[speed_type];
        if(speed_type === "walk"){
            outputStr = val + outputStr;
        }
        else{
            outputStr += `, ${speed_type} ${val}`;
        }
    }
    return outputStr;
}

function getCR(monster){
    const cr = monster['challenge_rating']
    switch(cr){
        case 0.125:
            return "1/8"
        case 0.25:
            return "1/4"
        case 0.5:
            return "1/2"
        default:
            return cr;
    }
}

function setHide(elem, hide=true){
    if(hide){
        elem.classList.add('hidden')
    }
    else{
        elem.classList.remove('hidden');
    }
    
}

function displayStats(monster){
    monsterStat('name').textContent = monster['name'];

    monsterStat('size').textContent = monster['size'];
    monsterStat('type').textContent = monster['type'];
    monsterStat('alignment').textContent = monster['alignment'];

    monsterStat('ac').textContent = monster['armor_class'][0]['value'];


    monsterStat('hp').textContent = monster['hit_points'];
    monsterStat('speed').textContent = getSpeed(monster);

    monsterStat('cr').textContent = getCR(monster);
    monsterStat('xp').textContent = monster['xp'];

    const str = addMod(monster['strength']);
    const dex = addMod(monster['dexterity']);
    const con = addMod(monster['constitution']);
    const int = addMod(monster['intelligence']);
    const wis = addMod(monster['wisdom']);
    const cha = addMod(monster['charisma']);

    monsterStat('str .num', true).textContent = str;
    monsterStat('dex .num', true).textContent = dex;
    monsterStat('con .num', true).textContent = con;
    monsterStat('int .num', true).textContent = int;
    monsterStat('wis .num', true).textContent = wis;
    monsterStat('cha .num', true).textContent = cha;

    setHide(monsterDisplay, false);
}

async function getRandomMonster(){
    const monsterList = dndAPI.data['monsters'];
    const randIndex = Math.floor(Math.random() * monsterList.length);
    const selection = monsterList[randIndex];
    const id = selection['index']

    const monster = await dndAPI.getMonster(id);
    
    setHide(statusText);
    displayStats(monster);
}

function searchMonsterByName(e){
    e.preventDefault();
    setHide(monsterDisplay);

    const monsterList = dndAPI.data['monsters'];
    const input = textInput.value;

    if(!input){
        setHide(statusText, false);
        statusText.textContent = "Text field is empty";
        return;
    }

    textInput.value = ""

    let results = []
    for (const monster of monsterList) {
        const _name = monster['name'];
        const _index = _name.toUpperCase().indexOf(input.toUpperCase());

        if(_index !== -1){
            results.push({name:_name, index:_index, monster_id:monster['index']});
        }
    }

    if(results.length === 0){
        setHide(statusText, false);
        statusText.textContent = `No results found for ${input}`;
        return;
    }
    else{
        setHide(statusText);
        statusText.textContent = "";
    }

    const sorted = results.sort((a,b)=>a.index-b.index);

    resultList.innerHTML = "";
    for(const {name, index, monster_id} of sorted){
        const listItem = resultList.appendChild(document.createElement("li"));
        const endIndex = index+input.length;

        const before = name.slice(0,index);
        const highlight = name.slice(index,endIndex);
        const after = name.slice(endIndex);

        listItem.innerHTML = before + `<b>${highlight}</b>` + after;
        listItem.setAttribute('value',monster_id);
        listItem.addEventListener('click', selectFromList);
    }
    setHide(searchResults, false);
}

async function selectFromList(e){
    const id = e.currentTarget.getAttribute('value');
    const monster = await dndAPI.getMonster(id);

    setHide(searchResults);
    displayStats(monster);
}

searchBtn.addEventListener("click", searchMonsterByName);
randomBtn.addEventListener("click", getRandomMonster);