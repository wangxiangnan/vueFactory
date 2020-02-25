<template>
  <div class="c-invalid">
    <h4 class="c-invalid__title">抱歉，链接已过期</h4>
    <img :src="getImgPath('banner002.png')" alt="" />
    <van-button class="c-invalid__btn" color="linear-gradient(to bottom, #FEA577, #FF6C4C)" @click="pickForm" round type="info">联系顾问      预约近期见面会</van-button>
    <dialog-form v-if="show" title="预约见面会" @close="close" @success="onSuccess" />
  </div>
</template>

<script>

import DialogForm from './DialogForm';
export default {
    components: {
        DialogForm
    },
    data() {
        return {
            show: false
        }
    },
    methods: {
        pickForm() {
            this.show = true;
        },
        close() {
            this.show = false;
        },
        onSuccess() { // 提交表单成功
            this.show = false;
            this.$toast('恭喜您，报名见面会成功！');
        }
    }
}
</script>

<style lang="scss">
.c-invalid{
    padding: 0 rem(30);
    text-align: center;
    &__title{
        padding: rem(70) 0;
        font-size: rem(30);
        color: #262626;
        line-height: rem(32);
        &::before{
            margin-right: rem(27);
            content: '';
            display: inline-block;
            width: rem(32);
            height: rem(32);
            background: url($path + 'icon001.png') center center no-repeat;
            background-size: cover;
            vertical-align: top
        }
    }
    &__btn{
        margin-top: rem(68);
        padding: 0 rem(70)
    }
}
</style>