//父类
function Person(name) {
	this.name = name;
	this.sayHello = function() {
		alert("my name is  " + this.name);
	}
}

//子类
function Empolyee(salary) {
	this.salary = salary;
	this.showMoney = function() {
		alert(this.name + "$" + this.salary);
	}
}

//子类继承父类

Empolyee.prototype = new Person("SteveJobs");

//新建实例

var SteveJobs = new Empolyee('9.99');

SteveJobs.sayHello();

SteveJobs.showMoney();

//call apply bind

//call和apply的区别 第二个形参传入参数不一样，一个是类数组，一个是单独传入

//call和apply 与 bind的区别  bind可以绑定后不立即执行

var obj = {
	a: 1,
	b: function() {
		return function() {
			return this.a;
		}
	}
}

//直接调用
obj.b()()   //undefined  因为此时闭包里函数的调用域是window

//如何修复这个问题？

var obj2 = obj.b().bind(obj);
obj2();  // 输出1


obj.b().apply(obj)   //输出1

obj.b().call(obj)    //输出1






