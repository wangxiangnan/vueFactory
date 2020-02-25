<template>
  <div class="c-page">
    <banner />
    <list-aunt :top="top" :title-img-path="titleImgPath" :next-desc-text="nextDescText" />
    <btn-page next-step-text="下一步" @toNextStep="toNextStep" />
  </div>
</template>

<script>
import Banner from './Banner';
import ListAunt from './ListAunt';
import BtnPage from './BtnPage';
export default {
    components: {
        Banner,
        ListAunt,
        BtnPage
    },
    data() {
        return {
            top: 1,
            titleImgPath: 'top001.png',
            nextDescText: '更多月嫂，查看下一页'
        }
    },
    methods: {
      toNextStep() {
        this.$emit('toNextStep');
      }
    }
}
</script>

<style>

</style>