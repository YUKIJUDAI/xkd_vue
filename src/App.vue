<template>
    <div>
        <div class="head" v-if="!isWeixin && !this.$route.meta.nohead">
            <van-nav-bar :title="$route.meta.title" left-arrow @click-left="onClickLeft" fixed z-index="99"/>
        </div>
        <router-view v-wechat-title="$route.meta.title" :class="{styleClass:!isWeixin && !this.$route.meta.nohead}" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { isWeixin } from "@/utils/utils";

@Component
export default class extends Vue {
    isWeixin: boolean = isWeixin();

    // 上一页
    onClickLeft(): void {
        this.$router.go(-1);
    }

}
</script>

<style lang="less">
.van-nav-bar .van-icon {
    color: #323232;
}
.styleClass {
    margin-top: 46px !important;
    min-height: calc(~"100vh - 46px") !important;
}
</style>