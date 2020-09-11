<template>
    <div class="dy-list">
        <div style="height:0.36rem"></div>
        <div class="list">
            <ul>
                <li class="dy-list-li clearfix">
                    <div class="dy-list-li-left fl">
                        <img src="" alt="">
                    </div>
                    <div class="dy-list-li-center fl">
                        <p>吴彦祖<span class="point"></span><span>剩余14天</span></p>
                        <p><span>粉丝数：更新中</span></p>
                    </div>    
                    <div class="dy-list-li-right fr">
                        ...
                    </div>
                </li>
            </ul>  
        </div> 
        <router-link to="/dy-add" tag="div" class="add clearfix">
            <img src="@/static/img/add-dy.png" alt="" class="fl">
            <p class="fl">添加抖音号</p>
            <span class="fr">查看教程</span>
        </router-link>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class Dylist extends Vue {
        
    }
</script>

<style lang="less" scoped>
@import url("./dy.less");
</style>