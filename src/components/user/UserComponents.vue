<template>
<v-content>
    <v-container fill-height>
        <v-row cols="16" class="justify-center">
            <v-col cols="8">
                <v-form @submit.prevent="login">
                    <v-banner>
                        <v-btn to="/login" color="accent" elevation="2" plain >
                            <v-icon dark left>mdi-arrow-left</v-icon>
                            Назад
                        </v-btn>
                    </v-banner>
                    <v-text-field required type="text" name="name" v-model="user.email" placeholder="Почта"></v-text-field>
                    <v-text-field required type="text" name="password" v-model="user.password" placeholder="Пароль"></v-text-field>
                    <v-banner  v-if="error">
                        <v-alert dense outlined type="error">{{error}}</v-alert>
                    </v-banner>
                    <v-btn type="submit">Войти</v-btn>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</v-content>
</template>
<script lang="ts">
import { IUserData } from '../../store/modules/interface'
import { defineComponent, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
    setup(){
        const store = useStore()
        const route = useRouter()
        const error = ref(store.state.jwt.userError)
        const user = ref({ email: '', password: '' } as IUserData)
        const login = () => store.dispatch('loginInUser', user.value)
        watch(store.state.jwt, (selection, prevSelection) => {
            if(selection.error)
                error.value = selection.error.message
            if(selection.userError)
                error.value = selection.userError 
            if(selection.token)
                route.push('/')
        })
        return {login, user, error, store}
    }
})
</script>
