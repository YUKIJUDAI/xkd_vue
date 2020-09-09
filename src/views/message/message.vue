<template>
    <div class="message">
        <div class="message-tab">
            <van-tabs color="#333" title-active-color="#333">
                <van-tab title="通知">
                    <div class="message-tabs">
                        <div class="message-title">
                            <p>通知列表</p>
                            <p @click="allunread(1)">全部已读</p>
                        </div>
                        <MessageList :type="1"></MessageList>
                    </div>
                </van-tab>
                <van-tab title="消息">
                    <div class="message-tabs">
                        <div class="message-title">
                            <p @click="allunread(2)">消息列表</p>
                            <p>全部已读</p>
                        </div>
                        <MessageList :type="2"></MessageList>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import MessageList from "./messageList.vue";

@Component({
    components: { MessageList }
})
export default class extends Vue {
    // 全部已读
    async allunread(type: number) {
        const res: any = await this.$http.post("Message/allunread", { type });
        if (res.code === 200) {
            this.$toast.success(res.msg);
            this.$router.go(0);
        } else {
            this.$toast.fail(res.msg);
        }
    }

}
</script>

<style lang="less" scoped>
@import url("./message.less");
</style>
