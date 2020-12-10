<template>
    <div class="feedback">
        <div class="feedback-main">
            <div class="xkd-label no-border">
                <div class="xkd-label-item">投诉负责人原因<span>*</span></div>
                <textarea class="xkd-textarea" v-model="data.content" placeholder="请填写10字以上的描述以便我们提供更好的帮助"></textarea>
            </div>
            <div class="xkd-label no-border">
                <div class="xkd-label-item">添加图片 <span class="fr">{{picResult.length}}/4</span></div>
                <uploader v-model="picResult" :qnInfo="qnInfo" :max-count="9" />
            </div>
            <div style="height:0.2rem;background-color:#f5f5f5;margin:0 -0.32rem"></div>
            <div class="xkd-label no-border">
                <div class="xkd-label-item">联系方式</div>
                <input class="xkd-input" v-model="data.contact_num" placeholder="QQ/微信/手机号～" />
            </div>
        </div>
        <div class="xkd-btn-yellow" style="width: 5.76rem" @click="submit">确认投诉</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import qn from "@/mix/qn";
import uploader from "@/components/uploader.vue";

@Component
export default class Feedback extends qn {

    data: { [propsName: string]: any } = {}; // 数据
    picResult: Array<{ [propsName: string]: any }> = []; // 上传结果列表
    qnInfo: { [propsName: string]: any } = {};

    created() {
        this.getQnInfo();
    }
    // 删除图片
    del(val: any, index: any) {
        this.picResult.splice(index.index, 1);
    }
    // 提交投诉
    async submit() {
        const data = JSON.parse(JSON.stringify(this.data));
        data.pic = this.picResult.join(",");
        data.head_id = this.$route.params.id;
        const res: any = await this.$http.post("/user/sugguest", data);
        if (res.code === 200) {
            this.$toast.success(res.msg);
            this.data = {};
            this.picResult = [];
        } else {
            this.$toast.fail(res.msg);
        }
    }
}
</script>

<style lang="less" scoped>
@import url("./feedback.less");
</style>