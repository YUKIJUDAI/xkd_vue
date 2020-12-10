<template>
    <div>
        <van-uploader v-model="picList" :after-read="afterRead" @delete="del" :max-count="maxCount" />
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator';

@Component
export default class extends Vue {

    @Prop()
    value!: string | Array<string>;

    @Prop({ default: 1 })
    readonly maxCount!: number;

    @Prop()
    readonly qnInfo!: { token: string, url: string }

    picList: Array<any> = [];

    @Emit("input")
    changeInput(val: string | number) {
        if (typeof val === "string") {
            if (typeof this.value === 'string') {
                return val;
            } else if (typeof this.value === 'object') {
                const arr = this.value.concat([val]);
                return arr;
            }
        }
        if (typeof val === "number") {
            if (typeof this.value === 'string') {
                return "";
            } else if (typeof this.value === 'object') {
                const arr = this.value.concat([]);
                arr.splice(val, 1);
                return arr;
            }
        }
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
            this.changeInput(res.key);
        });
    }
    // 删除图片
    del(val: any, index: any) {
        this.changeInput(index.index);
    }
}
</script>

<style lang="less" scoped>
</style>