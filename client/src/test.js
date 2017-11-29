
let str = "1234"

function reverse (str){
    newStr=''
 for(let i = str.length -1; i<-1; i--){
    newStr+= i[0];
 }
return newStr
}


console.log(reverse());
