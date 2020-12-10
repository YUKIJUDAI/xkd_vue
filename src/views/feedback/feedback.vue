<template>
    <div class="feedback">
        <div class="feedback-main">
            <div class="xkd-label no-border">
                <div class="xkd-label-item">反馈类型<span>*</span></div>
                <div class="xkd-check">
                    <ul>
                        <li :class="{ active: typeIndex === i }" v v-for="(item,i) in 4" :key="i" @click="typeIndex = i">{{["优化建议","投诉","线上bug","其他"][i]}}</li>
                    </ul>
                </div>
            </div>
            <div class="xkd-label no-border">
                <div class="xkd-label-item">反馈内容<span>*</span></div>
                <textarea class="xkd-textarea" v-model="data.content" placeholder="请填写10字以上的描述以便我们提供更好的帮助"></textarea>
            </div>
            <div class="xkd-label no-border">
                <div class="xkd-label-item">添加图片 <span class="fr">{{picResult.length}}/9</span></div>
                <uploader v-model="picResult" :qnInfo="qnInfo" :max-count="9" />
            </div>
            <div style="height:0.2rem;background-color:#f5f5f5;margin:0 -0.32rem"></div>
            <div class="xkd-label no-border">
                <div class="xkd-label-item">联系方式</div>
                <input class="xkd-input" v-model="data.contact_num" placeholder="QQ/微信/手机号～" />
            </div>
        </div>
        <div class="xkd-btn-yellow" style="width: 5.76rem" @click="submit">提交</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import qn from "@/mix/qn";
import uploader from "@/components/uploader.vue";

@Component({
    components: { uploader }
})
export default class Feedback extends qn {

    data: { [propsName: string]: any } = {}; // 数据
    picResult: Array<{ [propsName: string]: any }> = []; // 上传结果列表
    typeIndex: number = 0;

    created() {
        this.getQnInfo();
    }
    // 提交投诉
    async submit() {
        const data = JSON.parse(JSON.stringify(this.data));
        data.type = this.typeIndex + 1 + "";
        data.pic = this.picResult.join(",");
        const res: any = await this.$http.post("System/sugguest", data);
        if (res.code === 200) {
            this.$toast.success(res.msg);
            this.data = {};
            this.picResult = [];
            this.typeIndex = 0;
        } else {
            this.$toast.fail(res.msg);
        }
    }
}
</script>

<style lang="less" scoped>
@import url("./feedback.less");
</style>