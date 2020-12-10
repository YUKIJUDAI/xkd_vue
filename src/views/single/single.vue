<template>
    <div class="single">
        <div v-html="pageInfo.content"></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class extends Vue {

    type: string = this.$route.params.type;

    pageInfo: { [propsName: string]: any } = {};

    created() {
        this.getPage();
    }

    async getPage() {
        const res: any = await this.$http.post("/Page/index", { type: this.type });
        res.code === 200 && (this.pageInfo = res.result);
    }

}
</script>

<style lang="less" scoped>
.single {
    padding: 0 0.32rem;
    background: #fff;
    div {
        padding: 0.4rem 0 0.6rem;
    }
}
</style>