const diceRE = /(?<minus>-)?(?<dice>(?<count>\d+)?d(?<sides>\d+))|(?<mod>\d+)/gmi;

function d(n){
    return Math.floor(Math.random()*n)+1;
}

function roll(str){
    const matches = str.matchAll(diceRE);

    let total = 0;
    for (const match of matches) {
        const groups = match.groups;
        console.log(groups);
        
        let roll = 0;
        if(groups['dice']){
            const count = groups['count']?Number(groups['count']):1;
            const sides = Number(groups['sides']);
            for(let i = 0; i < count; i++){
                roll += d(sides);
            }
        }
        else if(groups['mod']){
            roll += Number(groups['mod']);
        }

        if(groups['minus']){
            roll *= -1;
        }
        total += roll;
    }
    return total;
}


export {roll};