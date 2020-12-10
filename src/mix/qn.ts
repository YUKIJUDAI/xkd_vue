import { Vue } from "vue-property-decorator";

export default class extends Vue {
    qnInfo: { [propsName: string]: any } = {};

    // 获取七牛信息
    async getQnInfo() {
        const res: any = await this.$http.post("upload/token");
        res.code === 200 && (this.qnInfo = res.result);
    }
}
