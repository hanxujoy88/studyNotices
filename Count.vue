<template>
    <div>
         <h2>{{msg}}</h2><hr/>
         <h3>{{$store.state.count}}</h3>   
         <p>
             <botton @click="$store.commit('add',10)"></botton>
             <button @click="reduce"></button>
         </p>
         <p>
             <botton @click="addAction"></botton>
             <button @click="reduceAction"></button>
         </p>
    </div>
</template>

<<script>
    import store from '@/vuex/store';
    import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
    export default {
        data() {
            return {
                msg: 'Hello Vuex',
            }
        },
        computed: {
            ...mapState(['count']),
            count(){
                return this.$store.getters.count
            }
        },
        methods: mapMutations(['add','reduce'])
    }
</script>>

