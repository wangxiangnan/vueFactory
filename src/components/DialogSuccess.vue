<template>
  <div class="dialogSucc">
    <dialog-pop :title="title" >
      <h4 class="dialogSucc__title">预约成功！好孕妈妈小伙伴正全速赶来</h4>
      <van-button class="dialogSucc__btn" color="linear-gradient(to bottom, #FEA577, #FF6C4C)" @click="backToHome" type="info">返回首页</van-button>
    </dialog-pop>
  </div>
</template>

<script>
import DialogPop from "./DialogPop";
export default {
    components: {
        DialogPop
    },
    data() {
      return {
        title: '预约成功'
      }
    },
    methods: {
      backToHome() {
        location.reload();
      }
    }
}
</script>

<style lang="scss">
.dialogSucc{
  &__title{
    font-size: rem(32);
    color: #262626;
  }
  &__btn{
    margin-top: rem(40);
    padding: 0 rem(130)
  }
}
</style>