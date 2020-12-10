<template>
    <div class="team">
        <div class="team-tab">
            <van-tabs color="#333" title-active-color="#333">
                <van-tab :title="`已绑定（${total1}）`">
                    <div class="team-tabs">
                        <TeamList :type="1" @setTotal="setTotal"></TeamList>
                    </div>
                </van-tab>
                <van-tab :title="`VIP会员（${total1}）`">
                    <div class="team-tabs">
                        <TeamList :type="3" @setTotal="setTotal"></TeamList>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import TeamList from "./teamList.vue";

@Component({
    components: { TeamList }
})
export default class team extends Vue {

    total1: number | string = 0;
    total2: number | string = 0;

    // 设置总数
    setTotal(type: number, val: string) {
        [this.total1, this.total2][type] = val;
    }

}
</script>

<style lang="less" scoped>
@import url("./team.less");
</style>
