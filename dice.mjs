const re = /(?<dice>(?<count>[+-]?\d+)?d(?<sides>\d+))|(?<modifier>[+-])/gm

function roll(str){
    const matches = str.matchAll(re);
}


export {roll};