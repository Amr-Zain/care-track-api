/* 
0=>6m
1=> 1y
2=>2y
3=>all
 */

export const calcDiagnoisDate = (number: number): number=>{
    const today = new Date();
    if(number ===0){
        return new Date(today.getFullYear(), today.getMonth() - 6, today.getDate()).getTime();
    }else if(number ===1){
        return new Date(today.getFullYear()-1, today.getMonth(), today.getDate()).getTime();
    }else if(number ===2){
        return new Date(today.getFullYear()-2, today.getMonth(), today.getDate()).getTime();
    }
    else 
    return new Date(today.getFullYear()-50, today.getMonth(), today.getDate()).getTime();
}