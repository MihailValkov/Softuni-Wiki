function toyShop (budget,p,d,b,m,t){
    const price = +p *2.60 + +d*3 + +b*4.10 + +m*8.20 + +t*2;
    let result;
    p+d+b+m+t>=50 ?  result = (price -price *0.25) - (price -price *0.25)*0.10 : result = price -price*0.1;
    result>=budget ? console.log(`Yes! ${(result-budget).toFixed(2)} lv left.`) :
    console.log(`Not enough money! ${(budget-result).toFixed(2)} lv needed.`);
}