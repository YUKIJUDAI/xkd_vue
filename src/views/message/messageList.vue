<template>
    <van-pull-refresh v-model="isLoading" success-text="刷新成功"></van-pull-refresh>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class extends Vue {
    @Prop()
    readonly type: string = "";

    isLoading: boolean = false;

}
</script>

<style scoped>
</style>