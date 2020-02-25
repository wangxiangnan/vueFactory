<template>
  <div class="page-btn">
      <span v-if="prevStepText" class="page-btn__item" @click="toPrevStep">{{ prevStepText }}</span>
      <span v-if="nextStepText" class="page-btn__item" @click="toNextStep">{{ nextStepText }}</span>
  </div>
</template>

<script>
export default {
    props: {
        prevStepText: {
            type: String,
            default: ''
        },
        nextStepText: {
            type: String,
            default: ''
        }
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
.page-btn{
    display: flex;
    justify-content: center;
    margin-top: rem(10);
    padding: rem(30) 0;
    &__item{
        margin: 0 rem(30);
        flex: 1;
        font-size: rem(46);
        color: #fff;
        text-align: center;
        line-height: rem(98);
        background:linear-gradient(0deg,rgba(255,108,76,1),rgba(254,165,119,1));
        box-shadow:0px 4px 6px 0px rgba(4,0,0,0.2);
        border-radius:2px;
    }
}
</style>