<template>
  <div class="pageTwo">
    <banner />
    <list-aunt :top="top" :title-img-path="titleImgPath" :desc="desc" :next-desc-text="nextDescText"></list-aunt>
    <btn-page
      prev-step-text="上一步"
      next-step-text="下一步"
      @toPrevStep="toPrevStep"
      @toNextStep="toNextStep"
    />
  </div>
</template>

<script>
import Banner from './Banner';
import BtnPage from "./BtnPage";
import ListAunt from './ListAunt';
export default {
  components: {
    BtnPage,
    ListAunt,
    Banner
  },
  data() {
    return {
      top: 2,
      titleImgPath: 'top002.png',
      nextDescText: '下一页查看好孕妈妈企业介绍',
      desc: '可选择1-20位阿姨，预约面试'
    }
  },
  methods: {
    toPrevStep() {
      this.$emit("toPrevStep");
    },
    toNextStep() {
      this.$emit("toNextStep");
    }
  }
};
</script>

<style>
</style>