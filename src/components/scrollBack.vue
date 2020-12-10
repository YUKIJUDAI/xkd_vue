<template>
    <div class="xkd-scroll-back">
        <div class="xkd-scroll-back-btn" @click="scrollTop">
            <img src="@/static/img/scroll.png" alt="" />
            回到顶部
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {
    scrollTop() {
        window.scrollTo(0, 0);
    }
}
</script>

<style scoped>
</style>
