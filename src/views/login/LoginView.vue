<template>
<v-content v-if="currentRoute === 'Login'">
    <v-container fill-height>
        <v-row cols="16" class="justify-center">
            <v-col cols="8">
                <v-card primary-title>
                    <v-img
                    src="https://postermarket.ru/upload/iblock/db0/db0552d1e4efaee5e93af8027378165c.jpg"
                    height="100%"
                    contain
                    ></v-img>
                    <v-card-actions class="justify-center">
                        <v-btn to="/login/user" class="pa-12">Для пользователя</v-btn>
                        <v-btn to="/login/admin" class="pa-12">Для администратора</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</v-content>
<router-view/>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
    setup(){
        const currentRoute = computed(() => {
            return useRoute().name
        })

        return { currentRoute }
    }
})
</script>
