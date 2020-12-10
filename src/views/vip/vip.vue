<template>
    <div class="vip">
        <div class="vip-head">
            <div class="vip-head-left fl">
                <img :src="$store.state.userInfo.headimgurl ? $store.state.userInfo.headimgurl : require('@/static/img/default-avatar.png')" alt="">
            </div>
            <div class="vip-head-center fl">
                <p v-if="$store.state.userInfo.wechat">{{$store.state.userInfo.nickname}}</p>
                <p v-else>{{$store.state.userInfo.user_phone | addMosaic}}</p>
            </div>
        </div>
        <div class="vip-card">
            <h1>招财进宝卡激活会员</h1>
            <p>请输入招财进宝卡激活会员：</p>
            <input type="text" placeholder="请输入招财进宝卡激活会员" v-model="code">
            <van-checkbox v-model="protocol" shape="square" class="vip-radio" icon-size="12px">
                <span class="font12">开通会员前我已阅读并遵守<router-link to="/single/2" tag="a">《小蝌蚪用户服务协议》</router-link></span>
            </van-checkbox>
            <van-button type="danger" round style="width:100%;margin-top:0.3rem" @click="activation">激活会员</van-button>
        </div>
        <div class="vip-price">
            <p>官方招财进宝激活码唯一购买途径</p>
            <p>请联系团队负责人购买 统一价格为298元</p>
        </div>
        <div class="vip-team font14">
            <div class="flexsb vip-team-head">
                <p class="font14">负责人</p>
            </div>
            <div class="flexsb vip-team-main">
                <img class="headimgurl" :src="headInfo.headimgurl" alt="">
                <div>
                    <p>{{headInfo.nickname}}</p>
                    <p>购买招财进宝激活码请联系我</p>
                </div>
                <div class="xkd-btn-yellow" @click="copy">联系购买</div>
            </div>
        </div>
        <div class="vip-foot">
            <h3 class="color666">激活须知</h3>
            <p class="color999">1.输入招财进宝卡激活码即可激活会员权益;</p>
            <p class="color999">2.激活成功后即升级为抖推猫会员，享受会员服务; </p>
            <p class="color999">3.招财进宝卡激活码可向团队负责人购买获得。</p>
            <p class="color999">*注：如果通过其它途径购买上当受骗，与小蝌蚪平台无关!</p>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import copy from "copy-to-clipboard";

@Component
export default class extends Vue {

    // 团长信息
    headInfo: { [propsName: string]: any } = {};
    // 协议勾选
    protocol: boolean = false;
    // 激活码
    code: string = "";

    created() {
        this.getHead();
    }

    // 获取团长信息
    async getHead() {
        const res: any = await this.$http.post("/user/getHead")
        if (res.code === 200) {
            this.headInfo = res.result;
        }
    }

    // 激活激活码
    async activation() {
        if (!this.protocol) {
            this.$toast.fail("请先阅读并同意协议");
            return;
        }
        const res: any = await this.$http.post("/User/Wallet/activation", { code: this.code });
        if (res.code === 200) {
            this.$toast.success(res.msg);
            this.$store.commit("SET_USER_INFO", { "user_level": "1" });
        } else {
            this.$toast.fail(res.msg);
        }
    }

    copy() {
        copy(this.headInfo.wechat);
        this.$toast.success("复制成功");
    }

}
</script>

<style lang="less" scoped>
@import url("./vip.less");
</style>
<style lang="less">
.vip-radio .van-radio__label {
    font-size: 0.24rem;
    color: #666 !important;
}
</style>