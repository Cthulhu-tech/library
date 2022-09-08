<template>
    <form @submit.prevent="login">
        <input type="text" name="name" v-model="user.name" placeholder="имя">
        <input type="text" name="surname" v-model="user.surname" placeholder="фамилия">
        <input type="text" name="password" v-model="user.password" placeholder="пароль">
        <button>Войти</button>
        <p v-if="error !== 'Token not valid'">{{error}}</p>
    </form>
</template>
<script lang="ts">
import { IAdminData } from '../../store/modules/interface'
import { defineComponent, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
    setup(){
        const store = useStore()
        const route = useRouter()
        const error = ref(store.state.jwt.adminError)
        const user = ref({ name: '', surname: '', password: '' } as IAdminData)
        const login = () => store.dispatch('loginInAdmin', user.value)

        watch(store.state.jwt, (selection, prevSelection) => {
            if(selection.error)
                error.value = selection.error.message
            if(selection.adminError)
                error.value = selection.adminError 
            if(selection.token)
                route.push('/')
        })
        return {login, user, error, store}
    }
})
</script>
<style lang="scss">
    
</style>