
function random(min,max) { 
	return Math.floor(Math.random() * (max - min)) + min 
} 
var arr = []; 
for(var i = 0; i<30; i++) { 
if(i % 2 == 0) { 
	arr.push(random(1,100)); 
}else{ 
	arr.push(random(-100,-1)); 
}
} 
console.log(arr);
for(i = 0; i < 30; i++) { 
if((i + 1) % 5 == 0){ 
console.log(arr[i]) 
}
}