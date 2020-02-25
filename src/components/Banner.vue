<template>
  <div class="c-banner">
      <img :src="getImgPath('banner.png')" alt="">
  </div>
</template>

<script>
export default {
    data(){
        return {
            imgPath: this.$config.imgDir + 'banner.png'
        }
    }
}
</script>

<style>

</style>