<template>
  <div class="page-three">
      <banner />
      <img class="page-three__row" :src="getImgPath('th001.png')" alt="" />
      <img class="page-three__row" :src="getImgPath('th002.png')" alt="" />
      <img class="page-three__row" :src="getImgPath('th003.png')" alt="" />
      <img class="page-three__row" :src="getImgPath('th004.png')" alt="" />
      <img class="page-three__row" :src="getImgPath('th005.png')" alt="" />
      <btn-page prev-step-text="上一页" next-step-text="预约面试" @toPrevStep="toPrevStep" @toNextStep="toNextStep" />
  </div>
</template>

<script>
import Banner from './Banner';
import BtnPage from './BtnPage';
export default {
    components: {
        Banner,
        BtnPage
    },
    methods: {
        toPrevStep() {
            this.$emit('toPrevStep');
        },
        toNextStep() {
            this.$emit('toNextStep');
        }
    }
}
</script>

<style lang="scss">
.page-three{
    &__row{
        margin-top: rem(24);
        &:first-of-type{
            margin-top: 0
        }
    }
}
</style>