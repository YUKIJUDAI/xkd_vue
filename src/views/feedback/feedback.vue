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
                <textarea class="xkd-textarea" v-model="data.content" placeholder="请填写10字以上的描述以便我们提供更好的"></textarea>
            </div>
            <div class="xkd-label no-border">
                <div class="xkd-label-item">添加图片 <span class="fr">{{picResult.length}}/9</span></div>
                <van-uploader v-model="picList" :after-read="afterRead" @delete="del" :max-count="9" />
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

@Component
export default class Feedback extends Vue {

    data: { [propsName: string]: any } = {}; // 数据
    picList: Array<{ [propsName: string]: any }> = []; // 上传列表
    picResult: Array<{ [propsName: string]: any }> = []; // 上传结果列表
    qnInfo: { [propsName: string]: any } = {};
    typeIndex: number = 0;

    created() {
        this.getQnInfo();
    }
    // 获取七牛信息
    async getQnInfo() {
        const res: any = await this.$http.post("upload/token");
        res.code === 200 && (this.qnInfo = res.result);
    }
    // 上传
    afterRead(file: any) {
        var formData = new FormData();
        formData.append("file", file.file);
        formData.append("token", this.qnInfo.token);
        this.$http.post(this.qnInfo.url, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then((res: any) => {
            if (typeof res === "string") {
                return this.$toast.fail("上传失败");
            }
            this.picResult.push(res.key);
        });
    }
    // 删除图片
    del(val: any, index: any) {
        this.picResult.splice(index.index, 1);
    }
    // 提交投诉
    async submit() {
        const data = JSON.parse(JSON.stringify(this.data));
        data.type = this.typeIndex + 1 + "";
        data.pic = this.picResult.join(",");
        const res: any = await this.$http.post("System/idea", data);
        if (res.code === 200) {
            this.$toast.success(res.msg);
            this.data = {};
            this.picList = [];
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