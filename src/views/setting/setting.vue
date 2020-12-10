<template>
    <div class="setting">
        <div class="setting-main">
            <div class="xkd-list">
                <van-cell-group>
                    <van-cell title="服务协议" to="/single/2" is-link size="large"></van-cell>
                    <van-cell title="隐私政策" to="/single/3" is-link size="large"></van-cell>
                    <van-cell title="推广规范" to="/single/4" is-link size="large"></van-cell>
                    <van-cell :title="'系统版本 v' + version" size="large"></van-cell>
                    <van-cell title="退出登录" @click="exit" v-if="!isWeixin()" size="large"></van-cell>
                </van-cell-group>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { isWeixin } from "@/utils/utils";
import { version } from "@/config/index";

@Component
export default class Setting extends Vue {

    version: string = version;

    is_vip: boolean = Boolean(+this.$store.state.userInfo.user_level);

    isWeixin = () => {
        return isWeixin();
    }

    exit() {
        this.$dialog.confirm({
            message: "您确定要退出登录吗？"
        }).then(res => {
            this.$router.replace("/login");
            this.$store.commit("REMOVE_USER_INFO");
        });
    }
}
</script>

<style lang="less" scoped>
@import url("./setting.less");
</style>