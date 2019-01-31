import { mapActions, mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['getNewsResponse'])
    },
    methods: {
        ...mapActions(['NewS_LIST'])
    }
}


