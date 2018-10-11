<template>
    <div class="loading">
        <img class="loading-img" :src="loading" alt="">
        <p class="loading-text">LOADING {{percent}}%</p>
    </div>
</template>
<script>
const loading = require('./LOADING.gif');
export default {
    name: 'loading',
    data() {
        return {
            loading,
            percent: 0
        }
    },
    mounted () {
        // ...

        const vm = this;
        console.log(resLoader)
        const loadImgs = new resLoader({
            resourceType : 'image', //资源类型，默认为图片
            baseUrl : window.location.origin, //基准url
            resources : [
                require('../home/images/bg.gif'),
                require('../home/images/start.png'),
                require('../home/images/start.png'),
                require('../home/images/bg.jpg')], //资源路径数组
            onStart : (total) => {
            }, //加载开始回调函数，传入参数total
            onProgress : (currentIndex, total) => {
                vm.percent = ((currentIndex / total)*100).toFixed(0);
            }, //正在加载回调函数，传入参数currentIndex, total
            onComplete : () => {
                vm.$router.push('home')
            } //加载完毕回调函数，传入参数total
        });
        loadImgs.start()
    },
}
</script>
<style lang="scss">
    .loading {
        width: 100%;
        height: 100%;
    }
</style>

