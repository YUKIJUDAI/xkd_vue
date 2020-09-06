<template>
    <div class="message">
        <div class="message-tab">
            <van-tabs color="#333" title-active-color="#333">
                <van-tab>
                    <div class="message-tabs">
                        <div class="message-title">
                            <p>通知列表</p>
                            <p>全部已读</p>
                        </div>
                        <MessageList type={1}></MessageList>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import MessageList from "./messageList.vue";

@Component
export default class extends Vue {

}
</script>

<style lang="less" scoped>
@import url("./message.less");
</style>
