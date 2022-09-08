<template>

    <v-toolbar dense elevation="4" scroll-target="#scrolling-techniques-3" v-if="!this.$store.state.jwt.token">
        <v-btn to="/login" >Авторизация</v-btn>
        <v-btn to="/registration">Регистрация</v-btn>
    </v-toolbar>

    <v-toolbar scroll-target="#scrolling-techniques-3" v-if="this.$store.state.jwt.token">
        <v-btn to="/" @click="lagout">Выход</v-btn>
    </v-toolbar>

    <router-view/>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
    setup(){
        const store = useStore()
        const route = useRouter()
        const lagout = () => store.dispatch('lagoutInSession')
        watch(store.state.jwt, (selection, prevSelection) => {
            if(selection.token === null && !selection.load)
                route.push('/login')
        })
        return {lagout}
    }
})
</script>

<style lang="scss">
    
</style>