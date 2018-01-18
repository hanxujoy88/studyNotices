//ES6 Promise多步骤
let state = 1;

function step1 (resolve,reject) {
	console.log('step1');
	if(state == 1) {
		resolve('step1 finish');
	} else {
		reject('step1 error');
	}
}

function step2 (resolve,reject) {
	console.log('step2');
	if(state == 1) {
		resolve('step2 finish');
	} else {
		reject('step2 error');
	}
}

function step3 (resolve,reject) {
	console.log('step3');
	if(state == 1) {
		resolve('step3 finish');
	} else {
		reject('step3 error');
	}
}

new Promise(step1).
then(function(val){
	console.log(val);
	return new Promise(step2)
}).
then(function(val){
	console.log(val);
	return new Promise(step3)
}).
then((val)=>{
	console.log(val);
})	


//es6 class类
class Coder {
	constructor(a,b){
		this.a = a;
		this.b = b;
	}

	name(val){
		console.log(val);
		return val;
	}
	skill(val) {
		console.log(this.name());
	}

	add() {
		return this.a + this.b;
	}
}

let person = new Coder(1,2);

console.log(person.add());

class htmler extends Coder{

}

let person2 = new htmler;

person2.name('程序员')；


//person.skill('程序员');


//es6模块化操作 (export 输出, import 引入)
export var name = '程序员';
import {name} from './temp';

console.log(name);

var b = '技术群';
var c = 'web';
var skill = 'js';

//export {name,b,skill};
export function add(a,b){
	return a + b;
}

export {
	name as a,
	cname as b,
	skill as c
}

import {name,cname,skill} from './temp';

// export default  文件里只能有一个, export 可以有多个

import {a,add} from './temp';

//export default对外暴露一个,引入的时候就引入一个就可以
export default var a = '程序员';

import shy from './temp';


//set和weakSet数据结构
let setArr = new Set(['js','css','html']);

console.log(setArr.size)

setArr.forEach((val)=> console.log(val))

let weaksetObj = new WeakSet();
let obj = {a:'js',b:'css'};
weaksetObj.add(obj);
console.log(weaksetObj.entries)


//proxy 代理 ES6 增强 对象和函数（方法）

let obj3 = {
	add: function(val) {
		return val + 100;
	},
	name:"I am programer"
}

console.log(obj3.add(100));

let pro = new Proxy({
	add: function(val) {
		return val + 100;
	},
	name:"I am programer"
},{
	get: (target,key,property) => {
		console.log('come in Get');	
		return target[key];
	},

	set: (target,key,value,receiver) => {
		console.log(`setting ${key} = ${value}`);
		return target[key] = value;
	},

	apply(target,ctx,args){
		console.log('do apply');
		return Reflect.apply(...arguments);
	}	
})



let target = function () {
	return 'I am jspang';
}

let handler = {
	apply(target,ctx,args){
		console.log('do apply');
		return Reflect.apply(...arguments);
	}
}






























