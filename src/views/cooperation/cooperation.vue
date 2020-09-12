<template>
    <div class="cooperation">
        <div class="xkd-title">合作信息</div>
        <div class="xkd-label">
            <div class="xkd-label-item">昵称<span>*</span></div>
            <input class="xkd-input" v-model="data.nickname" placeholder="请输入名字"></input>
        </div>
        <div class="xkd-label">
            <div class="xkd-label-item">手机号<span>*</span></div>
            <input class="xkd-input" v-model="data.phone" placeholder="请输入手机号"></input>
        </div>
        <div class="xkd-label">
            <div class="xkd-label-item">微信号<span>*</span></div>
            <input class="xkd-input" v-model="data.weixin_id" placeholder="请输入微信号"></input>
        </div>
        <div class="xkd-label no-border">
            <div class="xkd-label-item">合作内容</div>
            <textarea class="xkd-textarea" v-model="data.content" placeholder="请输入需要合作的内容，我们的导师将会及时与您联系"></textarea>
        </div>
        <div class="xkd-btn-yellow" style="width: 5.76rem" @click="addMessage">提交</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class cooperation extends Vue {

    data: { [propsName: string]: any } = {};

    // 提交商务合作
    async addMessage() {
        const res: any = await this.$http.post("Cooperation/addMessage", this.data);
        if (res.code === 200) {
            this.data = {};
            this.$toast.success(res.msg);
        } else {
            this.$toast.fail(res.msg);
        }
    }

}
</script>

<style lang="less" scoped>
@import url("./cooperation.less");
</style>