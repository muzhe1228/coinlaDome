<template>
  <div class="wrapper" @click.stop="close">
    <div class="centerWrapper">
      <div id="yydb-content" @click.stop="showLuziDetail">
        <div class="content-wrapper">
          <div class="right-num">
            <ul class="right-content">
              <li class="lie" v-for="(itemArray,index) in dataArray" :key="index">
                <div class="row" v-for="(item,index2) in itemArray" :key="index2">
                  <p>{{AddZero(item.result)}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    luziData: {
      type: Array
      // required: true
    },
    showYydbLuziDetail: {
      type: Function
    },
    displayNo: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      animationTime: 100, //动画执行总时间 越大越慢
      animationShowing: false, //动画是否正在执行
      data: [], //原路子数据
      dataArray: [] //每6个分割后的数组
    };
  },
  mounted() {
    this.showAnimatioin();
    this.dataArray = this.getArrayByLength(this.luziData, 4);
  },
  components: {},
  methods: {
    close() {
      this.closeAnimatioin();
    },
    //出现路子详情弹窗
    showLuziDetail() {
      this.showYydbLuziDetail();
    },
    // 出现动画
    showAnimatioin() {
      if (this.animationShowing) {
        return;
      }
      let timer = null;
      let num = 0;
      this.animationShowing = true;
      timer = setInterval(() => {
        num++;
        let progressImg = document.getElementById("yydb-content");
        progressImg.style.left = num - 100 + "%";
        if (num == this.animationTime) {
          clearInterval(timer);
          this.animationShowing = false;
        }
      }, 5);
    },
    //关闭动画
    closeAnimatioin() {
      if (this.animationShowing) {
        return;
      }
      let timer = null;
      let num = this.animationTime;
      this.animationShowing = true;
      timer = setInterval(() => {
        num--;
        let progressImg = document.getElementById("yydb-content");
        progressImg.style.left = num - 100 + "%";
        if (num == 0) {
          clearInterval(timer);
          this.animationShowing = false;
          this.$emit("close");
        }
      }, 5);
    },
    //按照长度分割数组
    getArrayByLength(array, size) {
      var count = 40 - array.length;
      if (count > 0) {
        for (var i = 0; i < count; i++) array = [...array, { result: "" }];
      }
      //获取数组的长度，如果你传入的不是数组，那么获取到的就是undefined
      const length = array.length;
      //判断不是数组，或者size没有设置，size小于1，就返回空数组
      if (!length || !size || size < 1) {
        return [];
      }
      //核心部分
      let index = 0; //用来表示切割元素的范围start
      let resIndex = 0; //用来递增表示输出数组的下标

      //根据length和size算出输出数组的长度，并且创建它。
      let result = new Array(Math.ceil(length / size));
      //进行循环
      while (index < length) {
        //循环过程中设置result[0]和result[1]的值。该值根据array.slice切割得到。
        result[resIndex++] = array.slice(index, (index += size));
      }
      //输出新数组
      return result;
    },
    //数字前面补0变为3位
    AddZero(num) {
      if (num === "") {
        return num;
      } else if (num == -2) {
        return "/";
      } else {
        return this.displayNo(num);
      }
    }
  }
};
</script>

<style scoped lang="stylus">
.wrapper {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .centerWrapper {
    width: 100%;
    height: 100%;
    margin-left: 0.898876rem;
    margin-top: 0.449438rem;
    position: relative;
    overflow: hidden;
    #yydb-content {
      position: absolute;
      top: 0;
      left: -100%;
      // width: 4.284644rem;
      height: 1.752809rem;
      background: url('../../../assets/Images/YYdb/@3x/bg_yydb_luzi.png') 0 0 / 100% 100% no-repeat;
      // background :red;
      .content-wrapper {
        width: 100%;
        height: 100%;
        padding: 0.044944rem 0.029963rem 0.044944rem 0.037453rem;
        display: flex;
        .right-num {
          height: 100%;
          .right-content {
            height: 100%;
            display: flex;
            .lie {
              width: 0.464419rem;
              height: 100%;
              border-right: 0.014981rem solid #3c3863;
              &:last-child {
                border-right: none;
              }
              .row {
                border-bottom: 0.014981rem solid #3c3863;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 25%;
                &:nth-child(4) {
                  border-bottom: none;
                }
                p {
                  color: #919acd;
                  font-size: 0.179775rem;
                  text-align: center;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
