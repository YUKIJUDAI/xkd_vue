<template>
    <div>
        <div class="messages clearfix" v-for="(item,i) in list" :key="i">
            <div class="message-list">
                <div class="message-list-top">
                    <div class="message-list-top-main">
                        <img :src="item.app_info.app_img | qnImg" alt="">
                        <div class="message-name">
                            <p>{{item.app_info.app_name}}</p>
                            <p class="font12">今日访问：{{item.app_info.people}}</p>
                        </div>
                    </div>
                    <p @click="$router.push('/app/detail/' + item.app_id)">详细数据<i class="right"></i></p>
                </div>
                <div class="message-list-bottom">
                    <ul>
                        <li>
                            <p class="font20">{{item.month}}</p>
                            <p class="font12 color999">本月已获得（元）</p>
                        </li>
                        <li>
                            <p class="font20">{{item.money}}</p>
                            <p class="font12 color999">总收益（元）</p>
                        </li>
                        <li>
                            <p class="font20">{{item.yes}}</p>
                            <p class="font12 color999">昨日收益（元）</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class MessageList extends Vue {
    @Prop()
    readonly list!: Array<{ [propsName: string]: any }>;
}
</script>

<style lang="less" scoped>
@import url("./incomeStatement.less");
</style>