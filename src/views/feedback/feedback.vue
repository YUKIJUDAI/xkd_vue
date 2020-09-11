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
                <textarea class="xkd-textarea" placeholder="">请填写10字以上的描述以便我们提供更好的</textarea>
            </div>         
            <div class="xkd-label no-border">
                <div class="xkd-label-item">添加图片 <span class="fr">0/9</span></div>
                <van-uploader :after-read="afterRead" multiple/>
            </div>
            <div style="height:0.2rem;background-color:#f5f5f5;margin:0 -0.32rem"></div>
            <div class="xkd-label no-border">
                <div class="xkd-label-item">联系方式</div>
                <input class="xkd-input" placeholder="QQ/微信/手机号～"/>
            </div>
        </div>
        <div class="xkd-btn-yellow" style="width: 5.76rem">提交</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Feedback extends Vue {
    typeIndex: number = 0;

    afterRead(file: any) { }
}
</script>

<style lang="less" scoped>
@import url("./feedback.less");
</style>