<template>
    <van-tabbar @change="footerChange" :value="selectTab" active-color="#030303" inactive-color="#A4A4A4">
        <van-tabbar-item>
            <span>首页</span>
            <template #icon="props">
                <img :src="props.active ? require('@/static/img/homeActive.png') : require('@/static/img/home.png')" />
            </template>
        </van-tabbar-item>
        <van-tabbar-item>
            <span>学院</span>
            <template #icon="props">
                <img :src="props.active ? require('@/static/img/cardActive.png') : require('@/static/img/card.png')" />
            </template>
        </van-tabbar-item>
        <van-tabbar-item>
            <span>数据</span>
            <template #icon="props">
                <img :src="props.active ? require('@/static/img/cartActive.png') : require('@/static/img/cart.png')" />
            </template>
        </van-tabbar-item>
        <van-tabbar-item>
            <span>我的</span>
            <template #icon="props">
                <img :src="props.active ? require('@/static/img/personalActive.png') : require('@/static/img/personal.png')" />
            </template>
        </van-tabbar-item>
    </van-tabbar>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class extends Vue {

    @Prop()
    readonly selectTab!: number;

    // 切换导航条
    footerChange(val: number) {
        this.$router.push(["/", "/college", "/leaderboard", "/me"][val]);
    }
}
</script>

<style lang="less" scoped>
@import url("./footer.less");
</style>
<style lang="less">
.van-tabbar-item__icon {
    margin-bottom: 0.04rem;
}
.van-tabbar-item__icon img {
    height: 0.5rem;
}
</style>