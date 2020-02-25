<template>
  <div class="c-index">
      <div class="c-index__bg"></div>
      <div v-if="isValid">
        <page-one v-show="page === 1" :meet-id="meetId" @toNextStep="toStep(2)" />
        <page-two v-show="page === 2" @toPrevStep="toStep(1)" @toNextStep="toStep(3)" />
        <page-three v-show="page === 3" @toPrevStep="toStep(2)" @toNextStep="toStep(4)" />
      </div>
      <invalid v-else />
      <dialog-form v-if="dialogVisible" title="填写资料  查看更多阿姨" @close="close" @success="onSuccess" />
      <dialog-success v-if="successVisible" />
  </div>
</template>

<script>
import PageOne from './PageOne';
import PageTwo from './PageTwo';
import PageThree from './PageThree';
import Invalid from './Invalid';
import DialogForm from './DialogForm';
import DialogSuccess from './DialogSuccess';
export default {
  components: {
    PageOne,
    PageTwo,
    Invalid,
    PageThree,
    DialogForm,
    DialogSuccess
  },
  data() {
    return {
      meetId: -1,
      isValid: true,
      page: 1,
      dialogVisible: false,
      successVisible: false
      
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.saveOptions();
      this.setValid();
    },
    saveOptions() { // 保存参数到sessionStorage，以便获取阿姨时获取
      var options = this.getOptions();
      this.options = options;
      console.log(options);
      sessionStorage.setItem('creattime', options.creattime);
      sessionStorage.setItem('meet_id', options.meet_id);
      sessionStorage.setItem('sell', options.sell);
      sessionStorage.setItem('city', options.city);
      sessionStorage.setItem('auntIds', '');
    },
    parseQuery(url) { // 把url参数转换为对象
        if (!url) return {};

        var str = url.split('#')[0].split('?')[1];
        var result = {};
        var temp = str.split('&');
        for (var i = 0; i < temp.length; i++) {
            var temp2 = temp[i].split('=');
            result[temp2[0]] = temp2[1];
        }

        return result;
    },
    getOptions() {
      var encodedString = this.parseQuery(location.href).keys;
      var str = window.atob(encodedString);

      var params = JSON.parse(str);
      return params
    },
    async setValid() { // 设置是否过期
      var url = this.$config.getOnlineTimeUrl;
      var res = await this.$request.get(url, {
          headers: {
            "content-type": "text/html"
          }
        });
      var time = res.date.time;
      var creattime = sessionStorage.getItem('creattime');
      var ruleTime = 24 * 60 * 60;
      var cha = time - creattime;
      // console.log(cha);
      // 和当前创建时间比对
      if (cha > ruleTime) {
        this.isValid = false;
      } else {
        this.isValid = true;
      }
    },
    async submitLikeAunts() {
      var auntidStr = sessionStorage.getItem("auntIds");
      var auntIdArr = auntidStr? auntidStr.split(","): [];
      var url = this.$config.saveLikeAuntUrl;
      var member_id = localStorage.getItem('member_id');
      var phone = localStorage.getItem('phone');
      var options = {
        member_id,
        sell: this.options.sell,
        meet_id: this.options.meet_id,
        houseworker_ids: auntIdArr,
        phone: phone
      };
      await this.$request.post(url, options);
      // this.successVisible = true;
      // console.log(data);
    },
    toStep(page) {
      // console.log(page);
      var member_id = localStorage.getItem('member_id');
      var phone = localStorage.getItem('phone');
      var auntIds = sessionStorage.getItem('auntIds');
      if (this.page === 1 && page === 2 && !member_id && !phone) {
        return this.dialogVisible = true;
      }
      if (this.page === 1 && page === 2 && member_id && phone) {
        this.submitLikeAunts();
      }
      if (this.page === 2 && page === 3) {
        if (auntIds) {
          this.submitLikeAunts();
        }else {
          return this.$toast('请至少选择一名阿姨');
        }
        
      }
      if (page === 4) { // 提交喜欢的阿姨
        return this.successVisible = true; 
      }
      this.page = page;
      setTimeout(function() {
        document.documentElement.scrollTop = 0; // 切换到页头
      }, 500);
      
    },
    close() {
      this.dialogVisible = false;
    },
    onSuccess() {
      this.dialogVisible = false;
      this.submitLikeAunts();
      this.toStep(2);
    }
  }
}
</script>

<style>
  .c-index__bg{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #fdc7a6;
    z-index: -1;
  }
</style>