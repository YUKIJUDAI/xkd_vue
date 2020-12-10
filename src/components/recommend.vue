<template>
    <div class="recommend">
        <div class="border-top"></div>
        <div class="home-recommend">
            <div class="home-title clearfix">
                <p class="fl">{{title}}</p>
                <router-link tag="span" to="/application" class="fr">
                    全部<i class="right"></i>
                </router-link>
            </div>
            <div class="home-recommend-list">
                <ul>
                    <router-link tag="li" :to="'/product/detail/' + item.id" v-for="(item,i) in list" :key="i">
                        <div class="home-recommend-list-left">
                            <img :src="item.logo | qnImg" alt="" />
                        </div>
                        <div class="home-recommend-list-center">
                            <p>{{item.name}}</p>
                            <p>
                                收益：自推<span> {{item.gain}}%</span>
                            </p>
                            <router-link tag="p" :to="'/app/detail/' + item.app_id">
                                <img class="xingqu" :src="item.app_det.app_img | qnImg">{{item.app_det.app_name}}
                            </router-link>
                        </div>
                        <div class="home-recommend-list-right" @click.stop="createQRCode(item.url)">
                            <img src="@/static/img/ewm.png" alt="" />
                            <p>推广</p>
                        </div>
                    </router-link>
                </ul>
            </div>
            <codeOverlay v-model="show" :imgUrl="imgUrl" />
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import codeOverlay from "@/components/codeOverlay.vue";

@Component({
    components: { codeOverlay }
})
export default class extends Vue {
    @Prop()
    readonly title!: string;

    @Prop({ default: 0 })
    readonly is_free!: number;

    @Prop({ default: 0 })
    readonly is_new!: number;

    @Prop({ default: 0 })
    readonly is_hot!: number;


    list: Array<{ [propsName: string]: any }> = [];
    page: number = 1;
    limit: number = 10;
    show: boolean = false;
    imgUrl: string = "";

    created() {
        this.getGoods();
    }

    // 生成二维码
    createQRCode(url: string) {
        this.imgUrl = url;
        this.show = true;
    }
    
    async getGoods() {
        const data = { is_free: this.is_free, is_new: this.is_new, is_hot: this.is_hot, tag: 0, sort: 1, page: this.page, limit: this.limit };
        const res: any = await this.$http.post("Goods/index", data);
        res.code === 200 && (this.list = res.result.list);
    }

}
</script>

<style lang="less" scoped>
@import url("~@/views/home/home.less");
</style>