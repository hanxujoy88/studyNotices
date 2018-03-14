<template>
    <div>
         <h2>{{msg}}</h2><hr/>
         <h3>{{$store.state.count}}</h3>   
         <p>
             <botton @click="$store.commit('add',10)"></botton>
             <button @click="$store.commit('reduce')"></button>
         </p>
    </div>
</template>

<<script>
    import store from '@/vuex/store';
    import { mapState } from 'vuex';
    export default {
        data() {
            return {
                msg: 'Hello Vuex',
            }
        },
        computed: mapState(['count'])
    }
</script>>

