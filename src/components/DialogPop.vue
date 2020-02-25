<template>
  <div class="c-dialog">
      <div class="c-dialog__main">
          <img class="c-dialog__icon" :src="getImgPath('tan_title.png')" />
          <div class="c-dialog__content">
            <h4 class="c-dialog__title">{{ title }}</h4>
            <slot />
          </div>
        <img v-if="hasClose" class="c-dialog__close" @click="onClose" :src="getImgPath('close.png')">
      </div>
      
  </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: '标题'
        },
        hasClose: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        onClose() {
            this.$emit('close');
        }
    }
}
</script>

<style lang="scss">
.c-dialog{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .5);
    z-index: 1000;

    &__main{
        position: absolute;
        top: 50%;
        left: 6.66%;
        right: 6.66%;
        transform: translate(0, -50%);
        border-radius: rem(5);
        text-align: center
    }
    &__content{
        position: relative;
        margin: rem(-28) rem(18) 0;
        padding: rem(80) rem(30) rem(50);
        background: #fff;
    }
    &__title{
        position: absolute;
        top: rem(-28);
        left: 50%;
        transform: translate(-50%, 0);
        padding: rem(12) rem(30);
        font-size: rem(30);
        color: #fff;
        background:linear-gradient(0deg,rgba(255,105,74,1),rgba(254,167,121,1));
        box-shadow:0px 4px 10px 0px rgba(150,23,47,0.2);
        border-radius: rem(5);
        white-space: nowrap;
    }
    &__close{
        position: absolute;
        left: 50%;
        bottom: rem(-114);
        transform: translate(-50%, 0);
        width: rem(70);
    }
}
</style>