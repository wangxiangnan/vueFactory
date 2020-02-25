<template>
  <div class="c-auntlist">
    <div class="c-auntlist__hd">
      <img class="c-auntlist__title" :src="getImgPath(titleImgPath)" alt />
    </div>
    <div class="c-auntlist__bd">
      <!-- 筛选条件 -->
      <span class="c-auntlist__border"></span>
      <ul v-if="listLengthOne >= 20" class="c-auntlist__filter">
        <li>
          <span class="c-auntlist__filter-text" @click="toggleSort('global')">{{ sortList[sortIndex].text }}</span>
        </li>
        <li>
          <span class="c-auntlist__filter-text" @click="toggleSort('condition')">筛选条件</span>
        </li>
        <ul v-if="sortVisible" class="c-auntlist__filter__popup">
          <!-- 综合排序item -->
          <div v-if="sortType === 'global'">
            <li
              v-for="(item, index) in sortList"
              :key="item.id"
              class="c-auntlist__filter__popup-item"
              @click="toSort(index, item.id)"
            >
              <p class="c-sort">
                <label class="c-sort__label">{{ item.text }}</label>
                <img
                  v-if="sortIndex === index"
                  class="c-sort__sign"
                  :src="getImgPath('yes.png')"
                  alt
                />
              </p>
            </li>
          </div>
          <!-- 筛选条件item -->
          <div v-else>
            <!-- <li class="c-auntlist__filter__popup-item">
              <div class="c-condition">
                <h6 class="c-condition__label">空档期</h6>
                <p class="c-condition__value">
                  <span
                    class="c-condition__value-btn"
                    @click="showPicker('freeList', 'neutral_start', '选择空档期开始')"
                  >{{ listQuery.neutral_start || '开始时间' }}</span>
                  <i class="c-condition__value-line"></i>
                  <span
                    class="c-condition__value-btn"
                    @click="showPicker('freeList', 'neutral_end', '选择空档期结束')"
                  >{{ listQuery.neutral_start || '结束时间' }}</span>
                </p>
              </div>
            </li>-->
            <li class="c-auntlist__filter__popup-item">
              <div class="c-condition">
                <h6 class="c-condition__label">价格区间（元）</h6>
                <p class="c-condition__value">
                  <span
                    class="c-condition__value-btn"
                    @click="showPicker('priceList', 'price_start', '选择最小价格')"
                  >{{ listQuery.price_start }}</span>
                  <i class="c-condition__value-line"></i>
                  <span
                    class="c-condition__value-btn"
                    @click="showPicker('priceList', 'price_end', '选择最大价格')"
                  >{{ listQuery.price_end }}</span>
                </p>
              </div>
            </li>
            <li class="c-auntlist__filter__popup-item">
              <div class="c-condition">
                <h6 class="c-condition__label">年龄要求（岁）</h6>
                <p class="c-condition__value">
                  <span
                    class="c-condition__value-btn"
                    @click="showPicker('ageList', 'age_start', '选择最小年龄')"
                  >{{ listQuery.age_start }}</span>
                  <i class="c-condition__value-line"></i>
                  <span
                    class="c-condition__value-btn"
                    @click="showPicker('ageList', 'age_end', '选择最大年龄')"
                  >{{ listQuery.age_end }}</span>
                </p>
              </div>
            </li>
            <li class="c-auntlist__filter__popup-item">
              <div class="c-condition">
                <h6 class="c-condition__label">区域</h6>
                <p
                  class="c-condition__value c-condition__value--location"
                  @click="showPicker('locationList', 'native_province', '选择筛选城市')"
                >
                  <span class="c-condition__value-text">{{ listQuery.native_province || '不限' }}</span>
                  <img class="c-condition__value-arrow" :src="getImgPath('arrow_right.png')" alt />
                </p>
              </div>
            </li>
            <li class="c-auntlist__filter__popup-item">
              <div class="c-popup-btns">
                <span class="c-popup-btns__item" @click="resetQuery">重置</span>
                <span
                  class="c-popup-btns__item c-popup-btns__item--confirm"
                  @click="confirmQuery"
                >确定</span>
              </div>
            </li>
          </div>
        </ul>
      </ul>
      <!-- 阿姨列表 -->
      <div class="c-auntlist__list">
        <h6 class="c-auntlist__list-title">{{ desc }}</h6>
        <ul class="c-auntlist__list-content">
          <li
            v-for="(item, index) in list"
            :key="index"
            :class="['c-auntlist__list-item', (activeAuntIds.indexOf(item.hid)) > -1 ? 'active': '']"
            @click="onSelectAunt(item.hid)"
          >
            <span class="c-auntlist__list-icon"></span>
            <div class="c-auntlist__list-avatar">
              <img :src="item.avatar" alt />
              <p>编号：{{ item.aunt_no }}</p>
            </div>
            <div class="c-auntlist__list-info">
              <div class="c-auntlist__list-info__row c-auntlist__list-info__row--title">
                <span class="name">{{(item.name||'').substr(0, 1)}}阿姨</span>
                <span v-if="item.price_level" class="money">{{ item.price_level }}</span>
              </div>
              <div class="c-auntlist__list-info__row c-auntlist__list-info__row--tags">
                <span>{{ item.age }}岁</span>
                <span>{{ item.experience }}年工作经验</span>
                <span>{{ item.native_province }}</span>
              </div>
              <div class="c-auntlist__list-info__row c-auntlist__list-info__row--free">
                <label>空档期:</label>
                <p v-html="item.neutral"></p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <p class="c-auntlist__footer">{{ nextDescText }}</p>
    </div>
    <van-popup v-model="pickerVisible" position="bottom">
      <van-picker
        :title="pickerTitle"
        show-toolbar
        :columns="columns"
        @cancel="onCancelPicker"
        @confirm="onConfirmPicker"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  // top: 1， top月嫂推荐
  // top: 2   优秀月嫂
  props: {
    top: {
      type: [String, Number],
      default: 1
    },
    desc: {
      type: String,
      default: '可选择0-12位阿姨，预约面试'
    },
    titleImgPath: {
      type: String,
      default: "top001.png"
    },
    nextDescText: {
      type: String,
      default: "更多月嫂，查看下一页"
    }
  },
  data() {
    return {
      pickerTitle: "",
      pickerVisible: false,
      activePickerKey: "", // 当前选中如开始空档期
      columns: [],
      listLengthOne: 0, // 只统计第一次次数
      list: null,
      listQuery: {
        meet_id: "",
        sort_type: "1",
        neutral_start: "",
        neutral_end: "",
        price_start: "0",
        price_end: "26800",
        age_start: "20",
        age_end: "50",
        native_province: "",
        top: ""
      },
      sortVisible: false,
      sortIndex: 0,
      sortType: "global", // global: 综合 condition：条件
      sortList: [
        {
          id: 1,
          text: "综合排序"
        },
        {
          id: 2,
          text: "年龄升序"
        },
        {
          id: 3,
          text: "年龄降序"
        },
        {
          id: 4,
          text: "价格升序"
        },
        {
          id: 5,
          text: "价格降序"
        }
      ],
      activeAuntIds: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.initColumnsOpts();
      this.getList(this.top);
    },
    getLocalActiveIds() {
      // 初始化这个选中的阿姨
      var auntidStr = sessionStorage.getItem("auntIds");
      var auntIdArr = auntidStr? auntidStr.split(","): [];
      auntIdArr = auntIdArr.map(item => +item);
      // console.log(auntIdArr);
      return auntIdArr;
    },
    initColumnsOpts() {
      // 初始化用于columns的数据
      var meet_id = sessionStorage.getItem("meet_id");
      this.listQuery.meet_id = meet_id;
      this.listQuery.top = this.top;
      // 空档期
      this.freeList = [];
      // 价格
      this.priceList = [
        "0",
        "8800",
        "9800",
        "10800",
        "11800",
        "12800",
        "13800",
        "15800",
        "16800",
        "19800",
        "21800",
        "23800",
        "26800"
      ];
      // 年龄
      this.ageList = [20, 25, 30, 35, 40, 45, 50, 55];
      // 区域
      this.locationList = ['不限', '北方人', '南方人'];
      // 请求线上数据
      // this.setLocationList();
    },
    async setLocationList() {
      var url = this.$config.getCityList;
      var data = await this.$request.get(url);
      this.locationList = data.data.map(item => item.name);
      this.locationList.unshift("不限");
      // console.log(this.locationList);
    },
    onSelectAunt(id) {
        console.log(id);
        // 确定阿姨是选中还是取消
        this.activeAuntIds = this.getLocalActiveIds();
        if (!this.activeAuntIds.length || this.activeAuntIds.indexOf(id) === -1) {
            this.activeAuntIds.push(id);
        } else {
            this.activeAuntIds.splice(this.activeAuntIds.indexOf(id), 1);
        }
        sessionStorage.setItem('auntIds', this.activeAuntIds.toString());
        
    },
    async getList() {
      var url = this.$config.getListUrl;
      // this.$request.config.headers['Content-Type'] = 'multipart/form-data';
      var data = await this.$request.get(url, this.listQuery);
      this.list = data.data.data || [];
      this.listLengthOne === 0 && (this.listLengthOne = this.list.length);
    },
    toSort(index, id) {
      if (index === this.sortIndex) {
        return;
      }
      this.sortIndex = index;
      this.sortVisible = false;
      this.listQuery.sort_type = id;
      this.getList();
    },
    toggleSort(t) {
      if (this.sortType === t && this.sortVisible) {
        return (this.sortVisible = false);
      }
      this.sortType = t;
      this.sortVisible = true;
    },
    showPicker(name, key, label) {
      // console.log(name);
      this.pickerTitle = label;
      this.columns = this[name];
      this.activePickerKey = key;
      this.pickerVisible = true;
    },
    onCancelPicker() {
      this.pickerVisible = false;
    },
    onConfirmPicker(val) {
      // console.log(this.activePickerKey, val);
      if (val === "不限") {
        val = "";
      }
      this.listQuery[this.activePickerKey] = val;
      this.pickerVisible = false;
    },
    resetQuery() {
      this.listQuery.price_start = '0';
      this.listQuery.price_end = '26800';
      this.listQuery.age_start = '20';
      this.listQuery.age_end = '50';
      this.listQuery.native_province = '';
    },
    confirmQuery() {
      this.getList();
      this.sortVisible = false;
    }
  }
};
</script>

<style lang="scss">
.c-popup-btns {
  margin: rem(-24) rem(-48);
  display: flex;
  &__item {
    flex: 1;
    line-height: rem(88);
    text-align: center;
    color: #666;
    font-size: rem(32);
    &--confirm {
      color: #ff7254;
      border-left: 1px solid rgba(255, 129, 102, 0.5);
    }
  }
}
.c-condition {
  &__label {
    margin-bottom: rem(24);
    font-size: rem(30);
    line-height: 1;
    color: #262626;
    text-align: left;
  }
  &__value {
    display: flex;

    &-btn {
      width: rem(137);
      line-height: 22px;
      font-size: rem(26);
      text-align: center;
      color: #fff;
      background: rgba(255, 114, 84, 1);
      border: 1px solid rgba(255, 104, 73, 1);
      border-radius: 5px;
    }
    &-line {
      position: relative;
      margin: 0 rem(16);
      width: rem(48);
      height: 24px;
      &::before {
        content: "";
        position: absolute;
        top: 12px;
        left: 0;
        right: 0;
        height: 1px;
        background-color: #fe8761;
      }
    }
    &--location {
      padding-right: rem(45);
      justify-content: space-between;
    }
    &-text {
      font-size: rem(30);
      color: #666;
    }
    &-arrow {
      width: rem(22);
      height: rem(36);
    }
  }
}
.c-sort {
  display: flex;
  justify-content: space-between;
  padding: 0 rem(40);
  line-height: 1;
  &__label {
    font-size: rem(30);
    color: #262626;
  }
  &__sign {
    width: rem(40);
    height: rem(28);
  }
}
.c-auntlist {
  &__hd {
    text-align: center;
  }
  &__title {
    display: inline-block;
    width: rem(300);
    vertical-align: top;
  }
  &__bd {
    margin: 0 rem(26) 0;
    background: linear-gradient(
      0deg,
      rgba(255, 105, 74, 1),
      rgba(255, 86, 54, 1)
    );
    border-radius: rem(17);
  }
  &__filter {
    position: relative;
    display: flex;
    padding: rem(19) 0;
    text-align: center;
    font-size: rem(32);
    color: #fff;
    & > li {
      position: relative;
      flex: 1;
      height: rem(40);
      line-height: rem(40);
      &:first-of-type::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        width: rem(1);
        background-color: #fff;
      }
    }
    &-text {
      &::after {
        margin-left: rem(20);
        content: "";
        display: inline-block;
        border: rem(15) solid transparent;
        border-top-color: #fff;
        vertical-align: rem(-12);
      }
    }
    &__popup {
      position: absolute;
      left: 0;
      right: 0;
      top: 100%;
      z-index: 2;
      background-color: #ffece8;
      border-radius: 0 0 rem(20) rem(20);
      &-item {
        padding: rem(24) rem(48);
        border-top: 1px solid rgba(255, 129, 102, 0.5);
        &:first-of-type {
          border-top: none;
        }
      }
    }
  }

  &__list {
    padding-bottom: rem(6);
    &-title {
      padding-top: rem(14);
      padding-left: rem(43);
      font-size: rem(26);
      font-weight: 400;
      color: #fff;
      line-height: rem(38);
    }
    &-content {
      padding: 0 rem(10);
      min-height: 50px
    }
    &-item {
      margin-top: rem(14);
      padding: rem(18) 0;
      display: flex;
      align-items: center;
      background: rgba(255, 191, 151, 1);
      border-radius: rem(4);
      &.active .c-auntlist__list-icon {
        background-image: url($path+"check.png");
      }
    }
    &-icon {
      margin-left: rem(10);
      margin-right: rem(8);
      width: rem(28);
      height: rem(28);
      background: url($path+"uncheck.png") center center no-repeat;
      background-size: rem(28) rem(28);
    }
    &-avatar {
      position: relative;
      margin-right: rem(20);
      width: rem(210);
      height: rem(210);
      & > img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        background-color: #fff;
      }
      & > p {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        font-size: rem(26);
        color: #fff;
        font-weight: 500;
        line-height: rem(42);
        text-align: center;
        background-color: rgba(0, 0, 0, 0.5);
      }
    }
    &-info {
      flex: 1;
      font-size: rem(26);

      &__row {
        margin-top: rem(16);
        &--title {
          margin-top: 0;
          display: flex;
          padding-bottom: rem(4);
          font-size: rem(30);
          line-height: rem(44);
          & .name {
            color: #000;
            font-weight: bold;
            & + .money {
              position: relative;
              padding-left: rem(65);
              &::before {
                content: "";
                position: absolute;
                top: rem(7);
                bottom: 0;
                left: rem(28);
                width: 1px;
                height: rem(30);
                background-color: #a08888;
              }
            }
          }
          & .money {
            color: #ff5636;
          }
        }
        &--tags {
          display: flex;
          justify-content: space-around;
          & span {
            padding: rem(8) rem(10);
            color: #fff;
            line-height: 1;
            background: linear-gradient(
              107deg,
              rgba(255, 114, 81, 1),
              rgba(254, 136, 98, 1)
            );
            border-radius: rem(10);
          }
        }
        &--free {
          color: #ff5636;
          line-height: rem(40);
          & > p {
            padding-left: rem(30);
            & > span {
              display: block;
            }
          }
        }
      }
    }
  }
  &__footer {
    font-size: rem(30);
    color: #fff;
    text-align: center;
    line-height: rem(76);
  }
}
</style>