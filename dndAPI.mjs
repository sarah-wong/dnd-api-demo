
// Request Args
const root = 'https://www.dnd5eapi.co/api/';
const reqHeaders = new Headers();
reqHeaders.append('Accept','application/json');
const options = {
    method : 'GET',
    headers : reqHeaders,
    redicrect : 'follow'
}

const endpoints = [];
const data = {};
const monsters = [];

async function fetchData(url){
    const response = await fetch(url, options);
    if(!response.ok){
        throw new WebTransportError("API not responding");
    }
    else{
        const data = await response.json();
        return data;
    }
}

async function getEndpoints(){
    const data = await fetchData(root);
    for (const key in data) {
        endpoints.push(key);
    }
}


async function getAllData(){
    for(const key of endpoints){
        const url = root + key + '/'
        await fetchData(url).then((res) => {
            data[key] = res['results'];
        })
    }
}

async function getMonster(id){
    const data = await fetchData(root + 'monsters/' + id);
    return data;
}

async function getMonsterImage(id){
    const img = await fetchData(root + 'images/monsters/' + id);
    return img;
}

getEndpoints().then(()=>getAllData()).then(()=>{console.log("Done")});

export {root, data, getMonster, getMonsterImage};