<template>
    <div class="verified">
        <div>
            <van-cell-group>
                <van-field v-model="data.name" label="姓名" placeholder="请输入姓名" />
                <van-field v-model="data.idcard" label="身份证" placeholder="请输入身份证号码" />
                <van-field name="radio" label="性别">
                    <template #input>
                        <van-radio-group v-model="data.sex" direction="horizontal">
                            <van-radio name="1">男</van-radio>
                            <van-radio name="2">女</van-radio>
                        </van-radio-group>
                    </template>
                </van-field>
                <newCodeInput type="other" :phone="$store.state.userInfo.user_phone" @changeSmsCode="changeSmsCode"></newCodeInput>
                <van-field name="uploader" label="身份证正面">
                    <template #input>
                        <uploader v-model="data.negative" :qnInfo="qnInfo" />
                        <van-image width="80" height="80" style="margin-top:-8px" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                    </template>
                </van-field>
                <van-field name="uploader" label="身份证反面">
                    <template #input>
                        <uploader v-model="data.positive" :qnInfo="qnInfo" />
                        <van-image width="80" height="80" style="margin-top:-8px" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                    </template>
                </van-field>
                <van-field name="uploader" label="手持身份证">
                    <template #input>
                        <uploader v-model="data.hand_positive" :qnInfo="qnInfo" />
                        <van-image width="80" height="80" style="margin-top:-8px" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                    </template>
                </van-field>
            </van-cell-group>
            <div class="verifeied-submit">
                <div class="xkd-btn-primary" @click="submit">提交审核</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import newCodeInput from "@/components/newCodeInput.vue";
import qn from "@/mix/qn";
import uploader from "@/components/uploader.vue";

@Component({
    components: { newCodeInput, uploader }
})
export default class extends qn {

    data: { [propsName: string]: any } = { sex: "1" };

    created() {
        this.getQnInfo();
    }

    changeSmsCode(smscode: string) {
        this.data.smscode = smscode;
    }

    async submit() {
        const res: any = await this.$http.post("/User/Wallet/card", this.data);
        if (res.code === 200) {
            this.$toast.success(res.msg);
            this.$router.push("/wallet");
        } else {
            this.$toast.fail(res.msg);
        }
    }

}
</script>

<style lang="less" scoped>
@import url("./verified.less");
</style>