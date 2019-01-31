let isDone: boolean = false;

let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;

//空值
function alertName(): void{
    alert('My name is Tom');
}

let unusabel : void = undefined;

let u: undefined = undefined;

let n: null = null;

//任意值
let myFavoriteNumber: any = 'seven';

//联合类型
let myFavoriteNumbers: string | number;

function getLength(something: string | number) {
}

//对象的类型 接口

interface Person {
    readonly name: string;   //定义只读属性
    age?: number;   //可选属性，不完全匹配一个形状
    [propName: string]: any;  //接口允许有任意的属性
}

let tom: Person = {
    name: 'Tom',
    age: 25,
}

// 数组的类型(方块表示法)
let fibonacci: number[] = [1,1,2,3,5]; //限制数组元素类型为数字

//数组泛型
let fibonaccis: Array<number> = [1,1,2,3,5];

//接口表示数组

interface NumberArray {
    [index: number]: number;
}
let fibonaccisa: NumberArray = [1,2,3,4,5];

//any在数组中的应用

let list: any[] = ['han', 25, {website: 'http://xcatliu.com'}];

//类数组
function sum1() {
   let argumentsArray: number[] = arguments;
}

function sum2() {
   let args: IArguments = arguments; 
}

//函数的声明

function sum (x: number, y: number): number {    //不允许传入多余或者少于要求的参数
    return x + y;
}   

//函数表达式
let mySum: (x: number, y: number) => number = function(x:number, y: number): number {
    return x + y;
}

//用接口定义函数的形状

interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;

mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}

//函数的可选参数

function buildName(firstName: string, lastName?: string) {
    if(lastName) {
        return firstName + ' ' + lastName;
    } else {
        return firstName;
    }
}
let tomcat = buildName('Tom','cat');
let toms = buildName('Tom');


//函数参数默认值

function buildNames(firstName: string, lastName: string = 'Cat') {
    return firstName + ' ' + lastName;
}

//函数剩余参数

function push(array: any[], ...items: any[]) {
    items.forEach(function(item) {
        array.push(item);
    })
}

//函数的重载
function reverse(x: number): number;

function reverse(x: string): string;

function reverse(x: number | string) :number | string {
    if(typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if(typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}

//类型断言

function getLength(something: string | number) : number {
    if (something.length) {
        return something.length;
    } else {
        return something.toString().length;
    }
}








































