<template>
  <div class="textHtml">
    <div v-if="loading" style="text-align: center;">
      <img src="@/assets/images/load.gif" />
      <div style="margin-bottom:16px">模型正在加载中...</div>
      <div>首次加载时间较长（可能会需要十分钟），请耐心等待！</div>
    </div>
    <div v-else v-loading="query_loading">
      <div class="textInput">
        <div>
          <span>文本填空</span>
          <span class="example" @click="forExample">随机一个例子</span>
        </div>
        <el-input
          type="textarea"
          v-model="textWord"
          ref="textRef"
          placeholder="请在英文状态下输入，双下划线‘__’来代表您需要填空的内容"
        ></el-input>
      </div>
      <div class="btnOption">
        <button class="btnBlue" @click="submit">填空</button>
        <button class="btnWhite" @click="clearData">清空</button>
      </div>
      <div class="resultInput">
        <div v-html="textResult" id="result"></div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      textWord: "",
      textResult: "",

      loading: false,
      loading_handle: null,
      loading_query: false,

      query_loading: false,
    };
  },
  created() {
    this.loading = true;
    this.loading_handle = setInterval(this.loadmodel, 100);
  },
  destroyed() {
    if(this.loading_handle) clearInterval(this.loading_handle);
  },
  methods: {
    loadmodel() {
      if (!this.loading_query) {
        this.loading_query = true;
        axios
          .get("/api/loadmodel?key=2")
          .then(res => {
            if (res.data.code == 200) {
              this.loading = false;
              clearInterval(this.loading_handle);
              this.loading_handle = null;
            } else {
              // retry
            }
            this.loading_query = false;
          })
          .catch(error => {
            this.$message.error("模型加载失败，请重试！");
            console.error(error);
            // retry
            this.loading_query = false;
          });
      }
      
    },
    submit() {
      if (!this.query_loading) {
        let textTxt = this.textWord;
        var reg = RegExp(/__/);
        if (textTxt.match(reg)) {
          // 包含
          textTxt = textTxt.replace(/\__/g, "<span>");
          let param = {
            text: textTxt,
            top_p: 1.0,
            top_n: 10,
            temperature: 0.9,
            frequency_penalty: 0,
            presence_penalty: 0
          };
          this.query_loading = true;
          axios
            .post("/api/fillblank", param, {
              headers: {
                "Content-Type": "application/json; charset=UTF-8"
              }
            })
            .then(res => {
              this.query_loading = false;
              if (res.data.code == 200) {
                let strHighlight = res.data.data.list;
                let strData = textTxt;
                var str = strData;
                strHighlight.forEach(function(v) {
                  str = str.replace(
                    /\<span>/,
                    '<span style="color:#366dec;">' + v.text + "</span>"
                  );
                });
                this.textResult = str;
              } else {
                this.$message({
                  type: "info",
                  message: res.data.message
                });
              }
            })
            .catch(error => {
              this.query_loading = false;
              this.$message.error("调用模型错误！");
              console.error(error);
            });
        } else {
          this.$message({
            type: "info",
            message: "输入内容必须包含至少一个双下划线！"
          });
          this.$refs.textRef.focus();
        }
      }
    },
    clearData() {
      this.textWord = "";
      this.textResult = "";
    },
    // strChange() {
    //   this.$nextTick(() => {
    //     this.textWord = this.textWord.replace(/\ /g, "__");
    //   });
    // },
    forExample() {
      let example = [
        "北京环球度假区相关负责人介绍，北京环球影城指定单日门票将采用__制度，即推出淡季日、平季日、旺季日和特定日门票。__价格为418元，__价格为528元，__价格为638元，__价格为__元。北京环球度假区将提供90天滚动价格日历，以方便游客提前规划行程。",
        "今天天气真好，我穿了一件__的衣服。",
        "清华大学开发的低资源大规模预训练语言推理工具包的名字叫做__。"
      ];
      this.textWord = example[Math.floor(Math.random() * example.length)];
    }
  }
};
</script>
<style lang="scss" scoped>
.textHtml {
  width: 80%;
  max-width: 900px;
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
    /deep/ .el-textarea {
      margin: 20px 0px;
      height: 200px;
    }
    /deep/ .el-textarea__inner {
      height: 200px;
    }
  }
  .btnOption {
    .btnBlue {
      width: 80px;
      height: 40px;
      background: #2468f2;
      color: #fff;
      border: 1px solid #2468f2;
      margin-right: 30px;
      cursor: pointer;
    }
    .btnWhite {
      width: 80px;
      height: 40px;
      background: #fff;
      color: #333;
      border: 1px solid #ccc;
      cursor: pointer;
    }
  }
  .resultInput {
    width: 100%;
    height: 200px;
    border: 1px solid #dcdfe6;
    margin-top: 30px;
    text-align: left;
    #result {
      margin: 10px 12px;
    }
  }
  .highlight {
    color: #2468f2;
  }
}
</style>
