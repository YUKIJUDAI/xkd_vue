<template>
    <div class="leaderboard">
        <ul>
            <li>
                <div class="leaderboard-num">1</div>
                <div class="leaderboard-img">
                    <img src="" alt="" class="leaderborder-avatar avatar1" />
                    <img src="@/static/img/hg1.png" alt="" class="leaderborder-crown" />
                </div>
                <div class="leaderboard-name">姜沫沫</div>
                <div class="leaderboard-price">7893.2元</div>
            </li>
            <li>
                <div class="leaderboard-num">2</div>
                <div class="leaderboard-img">
                    <img src="" alt="" class="leaderborder-avatar avatar2" />
                    <img src="@/static/img/hg3.png" alt="" class="leaderborder-crown" />
                </div>
                <div class="leaderboard-name">姜沫沫</div>
                <div class="leaderboard-price">7893.2元</div>
            </li>
            <li>
                <div class="leaderboard-num">3</div>
                <div class="leaderboard-img">
                    <img src="" alt="" class="leaderborder-avatar avatar3" />
                    <img src="@/static/img/hg2.png" alt="" class="leaderborder-crown" />
                </div>
                <div class="leaderboard-name">姜沫沫</div>
                <div class="leaderboard-price">7893.2元</div>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {

}
</script>

<style lang="less" scoped>
@import url("./leaderboard.less");
</style>
