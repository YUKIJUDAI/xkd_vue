<template>
    <div class="footer-tabbar">
        <van-tabbar>
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
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {

}
</script>

<style lang="less" scoped>
@import url("./footer.less");
</style>