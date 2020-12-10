<template>
    <div class="college-detail">
        <div class="college-player">
            <vueMiniPlayer :video="video" v-if="videoFlag" />
        </div>
        <div class="college-detail-main">
            <div class="college-detail-nav color333">课程介绍</div>
            <div class="college-detail-title color333">{{videoInfo.title}}</div>
            <div class="college-detail-title college-detail-info">{{videoInfo.description}}</div>
            <div class="college-detail-class">共{{videoInfo.class}}课时/已更新{{videoInfo.number}}课时</div>
            <div>
                <ul class="college-detail-list">
                    <hr />
                    <li v-for="(item,i) in videoList" :key="i">
                        <div class="college-detail-list-left">
                            <p class="color333">{{i + 1}}.{{item.title}}</p>
                            <p>时长：{{item.length}}</p>
                        </div>
                        <div class="college-detail-list-right" @click="changeVideoOrgin(i)">
                            <img src="@/static/img/video.png" alt="" />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <ScrollBack></ScrollBack>
        <Footer :selectedTab="1"></Footer>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { qnUrl } from "@/config/index";
import ScrollBack from "@/components/scrollBack.vue";
import Footer from "@/layout/footer.vue";

@Component({
    components: { ScrollBack }
})
export default class Detail extends Vue {
    // 视频配置
    video = {
        url: "",
        muted: false,
    };
    // 视频信息
    videoInfo: { [propsName: string]: any } = {};
    // 视频列表
    videoList: Array<{ [propsName: string]: any }> = [];
    // 当前正在播放的视频
    index: number = 0;
    // 重新插件组件
    videoFlag: boolean = true;

    created() {
        this.getVideoList();
    }

    async getVideoList() {
        const res: any = await this.$http.post("College/video", { id: this.$route.params.id });
        if (res.code) {
            this.videoInfo = res.result.info;
            this.videoList = res.result.video;
            res.result.video && res.result.video[this.index] && (this.video.url = qnUrl + res.result.video[this.index].link);
        }
    }

    // 更换视频
    changeVideoOrgin(index: number) {
        if (index === this.index) return;
        this.index = index;
        if (!this.videoList[this.index]) return;
        this.videoFlag = false;
        this.video.url = qnUrl + this.videoList[this.index].link;
        this.$nextTick(() => {
            this.videoFlag = true;
            window.scroll(0, 0);
            this.$toast("开始播放");
        })

    }
}
</script>

<style lang="less" scoped>
@import url("./college.less");
</style>
