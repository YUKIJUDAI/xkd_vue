<template>
    <div class="idea">
        <div class="idea-main">
            <div class="xkd-label no-border">
                <div class="xkd-label-item">概括你的想法</div>
                <textarea class="xkd-textarea" v-model="data.outline" placeholder="我有一个想法~"></textarea>
            </div>
            <div class="xkd-label no-border">
                <div class="xkd-label-item">详细介绍</div>
                <textarea class="xkd-textarea" v-model="data.detail" placeholder="写出你想法的详细内容思路"></textarea>
            </div>
            <div style="height:0.2rem;background-color:#fff;margin:0 -0.32rem"></div>
        </div>
        <div class="xkd-btn-yellow" style="width: 5.76rem" @click="submit">提交想法</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class idea extends Vue {

    data: { [propsName: string]: any } = {}; // 数据
    // 提交投诉
    async submit() {
        const res: any = await this.$http.post("System/idea", this.data);
        if (res.code === 200) {
            this.$toast.success(res.msg);
            this.data = {};
        } else {
            this.$toast.fail(res.msg);
        }
    }
}
</script>

<style lang="less" scoped>
@import url("./idea.less");
</style>