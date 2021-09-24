<template>
  <div class="textHtml">
    <div v-if="loading" style="text-align: center;">
      <img src="@/assets/images/load.gif"/>
      <div style="margin-bottom:16px">模型正在加载中...</div>
      <div>首次加载时间较长（可能会需要十分钟），请耐心等待！</div>
    </div>
    <div v-else>
      <div class="textInput">
        <div>
          <span style="font-size: 18px;">
            生成故事
            <span style="margin-left: 32px; font-size: 16px;">
              按<b style="background-color: rgba(222,222,222,0.3); color: crimson; font-weight: normal; padding: 2px 4px; border: 1px solid #888; border-radius: 6px; margin: 0 4px;">TAB</b>生成下文
            </span>
          </span>
          <span style="font-size: 16px;" class="example" @click="forExample">随机一个例子</span>
        </div>
        <div class="textarea-container" style="position: relative;">
          <textarea ref="input" class="textarea-box" @input="onInput" @keydown.tab.prevent="get_hint" v-model="content" :readonly="autocomp_loading"></textarea>
          <div class="textarea-hint" v-loading="autocomp_loading" style="min-height: 130px;">
            <p v-for="hint in hints" :key="hint" @click="appendHint(hint)"><span>{{ hint.replace("\n", "↲") }}</span></p>

          </div>
        </div>
      </div>
      <div class="btnOption">
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
      content: "",
      hints: [],
      autocomp_loading: false,
      
      loading: false,
      loading_handle: null,
      loading_query: false
    };
  },
  created() {
    this.loading = true;
    this.loading_handle = setInterval(this.loadmodel, 100);
  },
  destroyed() {
    if (this.loading_handle) clearInterval(this.loading_handle);
  },
  methods: {
    loadmodel(){
      if (!this.loading_query) {
        this.loading_query = true;
        axios
          .get("/api/loadmodel?key=1")
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
    get_hint(){
      if (!this.autocomp_loading) {
        this.autocomp_loading = true;
        axios
        .post("/api/generatestory",  {
            "text": this.content,
            "max_tokens": 16,
            "top_p": 1.0,
            "top_n": 10,
            "temperature": 0.9,
            "frequency_penalty": 0,
            "presence_penalty": 0
        })
        .then(res => {
          this.autocomp_loading = false;
          if (res.data.code == 200) {
              let list = res.data.data;
              this.hints = list;
          } else {
            this.$message({
              type: "error",
              message: res.data.message
            });
          }
        })
        .catch(error => {
          this.autocomp_loading = false;
          this.$message.error("调用接口失败");
          console.error(error);
        });
      }
    },
    onInput() {
      this.hints = [];
    },
    appendHint(hint) {
      this.content += hint;
      this.hints = [];
      this.$refs.input.focus();
    },
    clearData() {
      this.content = "";
    },
    forExample(){
      let example = ['天空是蔚蓝色，窗外有','哈利波特第一次去霍格沃茨魔法学校上学，地址在北京通州','北京的秋天是一年最美的季节，漫山遍野的']
      this.content = example[Math.floor(Math.random() * example.length)];
    }
  }
};
</script>
<style lang="scss" scoped>
.textHtml {
  width: 90%;
  max-width: 900px;
  .textarea-container {
    margin: 10px auto;
    .textarea-box {
      width: 100%;
      height: 300px;
      padding: 12px 16px;
      
      border: 1px solid #ccc;
      border-radius: 4px;
      resize: none;
      font-size: 18px;
      box-sizing: border-box;
      font-family: monospace;
    }

    .textarea-hint {
      padding: 8px 16px;

      p {
        font-size: 18px;
        padding: 8px 16px;
        font-weight: normal;
        font-family: monospace;
        cursor: pointer;
      }
      p:hover {
        background: #E8EEFC;
      }
    }
  }
  

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
        padding-top: 4px;
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
