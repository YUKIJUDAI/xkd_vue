<template>
    <div class="cooperation">
        <div class="xkd-title">合作信息</div>
        <div class="xkd-label">
            <div class="xkd-label-item">昵称<span>*</span></div>
            <input class="xkd-input" placeholder="请输入名字"></input>
        </div>
        <div class="xkd-label">
            <div class="xkd-label-item">手机号<span>*</span></div>
            <input class="xkd-input" placeholder="请输入手机号"></input>
        </div>
        <div class="xkd-label">
            <div class="xkd-label-item">微信号<span>*</span></div>
            <input class="xkd-input" placeholder="请输入微信号"></input>
        </div>
        <div class="xkd-label no-border">
            <div class="xkd-label-item">合作内容</div>
            <textarea class="xkd-textarea" placeholder="请输入需要合作的内容，我们的导师将会及时"></textarea>
        </div>
        <div class="xkd-btn-yellow" style="width: 5.76rem">提交</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class cooperation extends Vue {

}
</script>

<style lang="less" scoped>
@import url("./cooperation.less");
</style>