<template>
  <div class="textHtml">
    <div v-show="loading === 1" class="load">
      <img src="../../assets/images/load.gif"/>
      <div style="margin-bottom:16px">模型正在加载中...</div>
      <div>首次加载时间较长（可能会需要十分钟），请耐心等待！</div>
    </div>
    <div v-show="loading === 3" class="load">
      <img src="../../assets/images/fail.jpg"/>
    </div>
    <div v-show="loading === 2">
    <div class="textInput">
      <div>
        <span>生成故事</span>
        <span class="example" @click="forExample">随机一个例子</span>
      </div>
      <el-autocomplete
      id="autocomplete"
        type="textarea"
        class="inline-input search-input"
        v-model="searchContent"
        ref="autocomplete"
        :fetch-suggestions="(searchContent == '') ? null : requestDoSuggest"
        :trigger-on-focus="(searchContent == '') ? false : true"
        @select="handleSelect"
        :select-when-unmatched = "true"
        :highlight-first-item = "true"
        :opper-append-to-body= "false"
        @keyup.enter.native="requestDo"
        :debounce = "0"
        @keyup="changeStyle('none', '.el-autocomplete-suggestion')"
      >
      </el-autocomplete>
    </div>
    <div class="btnOption">
      <!-- <button class="btnBlue" @click="submit">填空</button> -->
      <button class="btnWhite" @click="clearData">清空</button>
    </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "auto-complete",
  data() {
    return {
      searchContent: "",
      textInit: "",
      loading: 1,
      selectData: ""
    };
  },
  computed: {},
  created() {
    this.loadmodel()
  },
  methods: {
    loadmodel(){
      axios
        .get("/api/loadmodel?key=1")
      .then(res => {
       if (res.data.code == 200) {
         //setInterval(this.getStatus, 10000);
          this.$nextTick(function () {
            this.loading = 2
          });
       }else{
         this.$nextTick(() => {
           this.loading = 3
         })
       }
      })
      .catch(error => {
         this.$nextTick(() => {
           this.loading = 3
         })
      });
    },
    getStatus(){
      axios
        .get("/api/loadmodel?key=1")
      .then(res => {
       if (res.data.code == 200) {
          this.$nextTick(function () {
            this.loading = 2
          });
       }else{
         this.$nextTick(() => {
           this.loading = 3
         })
       }
      })
      .catch(error => {
         this.$nextTick(() => {
           this.loading = 3
         })
      });
    },
    changeStyle(status, className) {
      let dom = document.querySelectorAll(className);
      dom[0].style.display = status;
    },
    /*自动补全*/
    requestDoSuggest(queryString, cb) {
      if (queryString != "") {
        // 仅为输入时的搜索
        this.searchByKeyWord(queryString, cb);
        this.changeStyle('none', '.el-autocomplete-suggestion')
      } else {
        // 输入完成时的点击enter事件后触发的，需配合 el的 :select-when-unmatched="true" 同时使用
        this.requestDo();
      }
    },
    requestDo(){
      this.$refs.autocomplete.suggestions = [];
    },
     // 输入时进行检索
    searchByKeyWord(queryString, cb) {
      if (!this.searchContent || this.searchContent.length < 2) {
        // 如果搜索关键词长度小于2时不进行检索
        return false;
      }
      let queryData = queryString.replace(/[\r\n]/g,"")
      this.selectData = ''
      let param = {
          "text": queryData,
          "top_p": 1.0,
          "top_n": 10,
          "temperature": 0.9,
          "frequency_penalty": 0,
          "presence_penalty": 0
      };
      let cbFun = cb;
      // let res = ["大片的绿色植物和","一片片的树叶,还有一些星星","一株高大的白杨树,树干笔直,"]
      //       let list = res.map(item => {
      //         return { value: item };
      //       });
      //       cbFun(list);
      //       this.$nextTick(() => {
      //         this.textInit = queryString;
      //       });
      
        axios
          .post("/api/generatestory", param)
          .then(res => {
            if (res.data.code == 200) {
                let list = res.data.data.map(item => {
                  return { value: item };
                });
                this.$nextTick(() => {
                  cbFun(list);
                  this.textInit = queryData;
                });
            } else {
              this.$message({
                type: "info",
                message: res.data.message
              });
            }
          })
          .catch(error => {
            console.log("error init." + error);
          });
    },
    /*选择联想出来的数据*/
    handleSelect(item) {
      this.searchContent = this.textInit + item.value;
      //this.selectData = item.value
      axios
        .get("/api/gpuinfo",{
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          }
        })
      .then(res => {
       if (res.data.code == 200) {
        this.$store.state.gpu_rate = res.data.data.gpu_rate
        this.$store.state.meme_used_rate = res.data.data.meme_used_rate
        this.$store.state.memory_rate = res.data.data.memory_rate
       }
      })
      .catch(error => {
        console.log("error init." + error);
      });
      this.$nextTick(() => {
        this.$refs.autocomplete.focus();
      });
    },
    clearData() {
      this.searchContent = "";
    },
    forExample(){
      let example = ['天空是蔚蓝色，窗外有','哈利波特第一次去霍格沃茨魔法学校上学，地址在北京通州','北京的秋天是一年最美的季节，漫山遍野的']
      this.searchContent = example[Math.floor(Math.random() * example.length)];
      this.$nextTick(() => {
        this.$refs.autocomplete.focus();
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.textHtml {
  padding: 100px 20%;
  .load{
    div{
      text-align: center;
    }
  }
  .textInput {
    text-align: left;
    div {
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #333333;
      font-weight: bold;
      .example {
        float: right;
        font-weight: 400;
        color: #2468f2;
        cursor: pointer;
        border-bottom: 1px solid #2468f2;
      }
    }
    /deep/ .el-autocomplete {
      margin: 20px 0px;
      height: 200px;
      width: 100%;
      overflow: auto;
    }
    /deep/ .el-textarea__inner {
      height: 200px;
      width: 100%;
    }
  }
  .btnOption {
    text-align: right;
    .btnWhite {
      width: 80px;
      height: 40px;
      background: #fff;
      color: #333;
      border: 1px solid #ccc;
      cursor: pointer;
    }
  }
}
</style>
