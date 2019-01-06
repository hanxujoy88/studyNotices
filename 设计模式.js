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

