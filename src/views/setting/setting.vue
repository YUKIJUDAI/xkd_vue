<template>
    <div class="setting">
        <div class="setting-main">
            <div class="xkd-list">
                <ul>
                    <li>服务协议 <span class="right"></span></li>
                    <li>隐私政策 <span class="right"></span></li>
                    <li>推广规范 <span class="right"></span></li>
                    <li @click="exit">退出登录</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Setting extends Vue {

    exit() {
        this.$dialog.confirm({
            message: "您确定要退出登录吗"
        })
    }
}
</script>

<style lang="less" scoped>
@import url("./setting.less");
</style>