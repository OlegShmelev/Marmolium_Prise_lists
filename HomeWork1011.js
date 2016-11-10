function random(min,max) { 
	return Math.floor(Math.random() * (max - min)) + min 
} 
var arr = [];
var ARR_SIZE = 10;
for( var i = 0 ;i < ARR_SIZE; i++){
	arr[i] = [];
	for (var i1 = 0; i1 < ARR_SIZE; i1++){
		arr[i].push(random(0, 100))
	}
}
var resultArr = arr[0].slice(0 ,10);
for(var i = 1; i < ARR_SIZE - 1; i++){
	resultArr.push(arr[i][arr.length-1]);
}
var bottomArr = arr[ARR_SIZE -1].slice(0, 10);
bottomArr.reverse();
var  resultArr1=resultArr.concat(bottomArr);
for(var i = ARR_SIZE - 2; i > 0; i--){
	resultArr1.push(arr[i][0]);
}
console.log(resultArr1);
console.table(arr);