<template>
    <div class="weChat"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import qs from "qs";

@Component
export default class extends Vue {


    created() {
        this.callback();
    }

    async callback() {
        const { key, invitecode } = this.$route.query;
        if (key) {
            const res: any = await this.$http.post("/user/wechat/getWechat", { key });
            this.$store.commit("SET_USER_INFO", res.result);
            this.$router.replace("/bind-phone?" + qs.stringify({ key, invitecode }));
        } else {
            const { token } = this.$route.query;
            this.$store.commit("SET_USER_INFO", { token });
            const res: any = await this.$http.post("/user/Login/getUserToken");
            if (res.code === 200) {
                this.$store.commit("SET_USER_INFO", res.result);
                this.$router.replace("/");
            }
        }
    }
}
</script>

<style scoped>
</style>