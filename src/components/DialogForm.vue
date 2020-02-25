<template>
  <div class="dialogForm">
    <dialog-pop :title="title" :has-close="true" @close="close">
      <div class="dialogForm__row">
        <h6 class="dialogForm__label">手机号</h6>
        <van-field
          class="dialogForm__input"
          v-model="phone"
          type="tel"
          placeholder="请输入手机号"
          :maxlength="11"
        />
        <p class="dialogForm__desc">方便我们找到您，为您提供更多阿姨信息</p>
      </div>
      <div class="dialogForm__row">
        <h6 class="dialogForm__label">预产期</h6>
        <van-field
          class="dialogForm__input"
          :value="date"
          placeholder="请选择预产期"
          @click="pickDate"
          readonly
        />
        <p class="dialogForm__desc">自动筛选合适的阿姨，享受一对一顾问服务</p>
      </div>
      <van-button
        class="dialogForm__btn"
        color="linear-gradient(to bottom, #FEA577, #FF6C4C)"
        @click="submit(phone, date)"
        type="info"
      >立即报名</van-button>
    </dialog-pop>
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
        @confirm="onConfrim"
        @cancel="onCancel"
      />
    </van-popup>
  </div>
</template>

<script>
import DialogPop from "./DialogPop";
export default {
  props: {
    title: {
      type: String,
      default: "预约见面会"
    }
  },
  components: {
    DialogPop
  },
  data() {
    return {
      phone: "",
      date: "",
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2022, 10, 1),
      currentDate: new Date(),
      show: false
    };
  },
  methods: {
    formatter(type, val) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      } else if (type === "day") {
        return `${val}日`;
      }
      return val;
    },
    preFixAny(str, size = 2, char = 0) {
      if (String(str).length >= size) return str;
      return (Array(+size).join(char) + str).slice(-size);
    },
    formatTime(date, type = "date") {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();
      const t1 = [year, month, day].map(item => this.preFixAny(item)).join("/");
      const t2 = [hour, minute, second]
        .map(item => this.preFixAny(item))
        .join(":");
      return type === "date" ? `${t1}` : `${t1} ${t2}`;
    },
    pickDate() {
      this.show = true;
    },
    onConfrim(val) {
      var date = this.formatTime(val);
      this.date = date;
      this.show = false;
    },
    onCancel() {
      this.show = false;
    },
    close() {
      this.$emit("close");
    },
    async submit(phone, date) {
      var reg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      var errMsg = "";
      var data = null;
      var url = this.$config.saveMasterUrl;
      var options = null;
      var agentid = sessionStorage.getItem("sell");
      var meet_id = sessionStorage.getItem("meet_id");
      var city = sessionStorage.getItem("city");
      if (!phone) {
        errMsg = "请输入手机号！";
      }
      if (!reg.test(phone)) {
        errMsg = "手机号格式不正确";
      }
      if (!date) {
        errMsg = "请选择空档期";
      }
      if (errMsg) {
        return this.$toast(errMsg);
      }
      if (!this.isPosting) {
        this.isPosting = true;
        options = {
          row: {
            work_type: "月嫂",
            phone: phone,
            expected_date: date,
            source_url: location.href,
            city: city
          },
          agentid: agentid,
          meet_id: meet_id
        };
        data = await this.$request.post(url, options, {
          headers: {
            "content-type": "application/x-www-form-urlencoded"
          }
        });
        // console.log(data);
        localStorage.setItem("member_id", data.data.member_id);
        localStorage.setItem("phone", phone);
        this.$emit("success");
      }
    }
  }
};
</script>

<style lang="scss">
.dialogForm {
  &__row {
    margin-top: rem(50);
    &:first-of-type {
      margin-top: rem(10);
    }
  }
  &__label {
    font-size: rem(32);
    text-align: left;
    color: #262626;
    &::after {
      content: "*";
      color: #ff5651;
      margin-left: rem(4);
      line-height: 1;
    }
  }
  &__input {
    margin-top: rem(18);
    border: 1px solid #ffe8dd;
  }
  &__desc {
    margin-top: rem(15);
    font-size: rem(26);
    color: #666;
    text-align: left;
    line-height: rem(36);
  }
  &__btn {
    margin-top: rem(20);
    padding: 0 rem(130);
    border-radius: rem(10);
  }
}
</style>