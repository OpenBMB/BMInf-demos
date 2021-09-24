<template>
  <div class="textHtml">
    <div v-show="loading === 1" class="load">
      <img src="../../assets/images/load.gif" />
      <div style="margin-bottom:16px">模型正在加载中...</div>
      <div>首次加载时间较长（可能会需要十分钟），请耐心等待！</div>
    </div>
    <div v-show="loading === 3" class="load">
      <img src="../../assets/images/fail.jpg" />
    </div>
    <div v-show="loading === 2">
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
import Vue from "vue";
export default {
  data() {
    return {
      textWord: "",
      textResult: "",
      loading: 1
    };
  },
  created() {
    this.loadmodel();
  },
  methods: {
    loadmodel() {
      axios
        .get("/api/loadmodel?key=2")
        .then(res => {
          if (res.data.code == 200) {
            this.$nextTick(function() {
              this.loading = 2;
            });
          } else {
            this.$nextTick(() => {
              this.loading = 3;
            });
          }
        })
        .catch(error => {
          this.$nextTick(() => {
            this.loading = 3;
          });
        });
    },
    submit() {
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
        axios
          .post("/api/fillblank", param, {
            headers: {
              "Content-Type": "application/json; charset=UTF-8"
            }
          })
          .then(res => {
            if (res.data.code == 200) {
              //let strData = res.data.data.resp_text;
              let strHighlight = res.data.data.list;
              let strData = textTxt;
              // let strHighlight = [
              //   { position: 17, text: "北京" },
              //   { position: 29, text: "场馆" },
              //   { position: 64, text: "购买" },
              //   { position: 113, text: "通过支付宝" }
              // ];
              var str = strData;
              strHighlight.forEach(function(v) {
                str = str.replace(
                  /\<span>/,
                  '<span style="color:#366dec;">' + v.text + "</span>"
                );
              });
              this.textResult = str;
              axios
                .get("/api/gpuinfo", {
                  headers: {
                    "Content-Type": "application/json; charset=UTF-8"
                  }
                })
                .then(res => {
                  if (res.data.code == 200) {
                    this.$store.state.gpu_rate = res.data.data.gpu_rate;
                    this.$store.state.meme_used_rate =
                      res.data.data.meme_used_rate;
                    this.$store.state.memory_rate = res.data.data.memory_rate;
                  }
                })
                .catch(error => {
                  console.log("error init." + error);
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
        // this.$store.dispatch("fillblank", param).then((res) => {
        //   debugger
        //   this.textResult = this.$store.state.text.fillblankData;
        // });
      } else {
        this.$message({
          type: "info",
          message: "输入内容必须包含至少一个双下划线！"
        });
        this.$refs.textRef.focus();
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
  padding: 100px 20%;
  .load {
    div {
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
