/* 
发布订阅通用实现
*/
var event = {
    clientList: [],
    listen: function( key, fn ) {
        if ( !this.clientList[ key ] ) {
            this.clientList[ key ] = [];
        }
        this.clientList[ key ].push( fn );   //订阅的消息添加进缓存列表
    },
    trigger: function() {
        var key = Array.prototype.shift.call( arguments ),  // (1)
            fns = this.clientList[ key ];

        if( !fns || fns.length === 0) {
            return false;
        }    

        for( var i = 0, fn; fn = fns[ i++]; ) {
            fn.apply( this.arguments );  //(2) // arguments 是trigger时带上的参数
        }
    }
};

//定义一个installEvent函数，可以给所有对象动态安装发布-订阅
var installEvent = function( obj ) {
    for ( var i in event ) {
        obj[ i ] = event[ i ];
    }
};

//取消订阅的事件
event.remove = function( key, fn ) {
    var fns = this.clientList[ key ];

    if( !fns ) {   //如果key对应的消息没有被人订阅，则直接返回
        return false;
    }

    if( !fns ) {   // 如果没有传入具体的回调函数，表示需要取消key对应消息的所有订阅
        fns && (fns.length = 0);
    }else{
        for( var l = fns.length - 1; l >=0; l--) {
            var _fn = fns[ l ];
            if ( _fn === fn) {
                fns.splice( l, 1);  //删除订阅者的回调函数
            }
        }
    }
};

var Plane = function(){}

Plane.prototype.fire = function() {
    console.log('发射普通子弹');
}

//装饰类
var MissileDecorator = function( plane ){
    this.plane = plane;
}

MissileDecorator.prototype.fire = function() {
    this.plane.fire();
    console.log('发射导弹');
}

var AtomDecorator = function( plane ) {
    this.plane = plane;
} 

AtomDecorator.prototype.fire = function() {
    this.plane.fire();
    console.log('发射原子弹');
}

var plane = new Plane();
plane = new MissileDecorator( plane );
plane = new AtomDecorator( plane );

plane.fire();


Function.prototype.before = function( beforefn ) {
    var __self = this; //保存原函数的引用
    return function() {
        beforefn.apply( this, arguments);

        return __self.apply( this, arguments);
    }
}


Function.prototype.after = function( afterfn ) {
    var __self = this;
    return function() {
        var ret = __self.apply( this, arguments );
        afterfn.apply( this, arguments);
        return ret;
    }
}

//状态模式

var Light = function() {
    this.state = 'off';
    this.button = null;
}

Light.prototype.init = function() {
    var button = document.createElement('button');
        self = this;
    button.innerHTML = '开关';
    this.button = document.body.appendChild('button');
    this.button.onclick = function(){
        self.buttonWasPressed();
    }    
};

Light.prototype.buttonWasPressed = function() {
    if ( this.state === 'off') {
        console.log('开灯');
        this.state = 'on';
    }else if( this.state === 'on') {
        console.log('关灯');
        this.state = 'off';
    }
};


var light = new Light();
light.init();

var OffLightState = function( light ) {
    this.light = light;
} 

OffLightState.prototype.buttonWasPressed = function() {
    console.log('弱光');
    this.light.setState( this.light.weakLightState );
}

//WeakLightState

var WeakLightState = function( light ) {
    this.light = light;
} 

WeakLightState.prototype.buttonWasPressed = function() {
    console.log('强光');  // weakLightState 对应的行为
    this.light.setState( this.light.strongLightState ); 
}

//StrongLightState

var StrongLightState = function( light ) {
    this.light = light;
}

StrongLightState.prototype.buttonWasPressed = function() {
    console.log('关灯');
    this.light.setState( this.light.OffLightState);
}


//改写Light类

var Light = function() {
    this.OffLightState = new OffLightState( this );
    this.weakLightState = new WeakLightState( this );
    this.strongLightState = new StrongLightState ( this );
    this.button = null;
}

Light.prototype.init = function() {
    var button = document.createElement( 'button' );
        self = this;
        this.button = document.body.appendChild('button');
        this.button.innerHTML = '开关';

        this.currState = this.OffLightState;

        this.button.onclick = function() {
            self.currState.buttonWasPressed();
        }
}


Light.prototype.setState = function( newState ) {
    this.currState = newState;
} 

//测试

var light = new Light();
light.init();








