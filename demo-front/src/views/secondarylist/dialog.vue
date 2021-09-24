<template>
  <div class="talk_con">
    <div v-if="loading" style="text-align: center;">
      <img src="@/assets/images/load.gif" />
      <div style="margin-bottom:16px">模型正在加载中...</div>
      <div>首次加载时间较长（可能会需要十分钟），请耐心等待！</div>
    </div>
    <div v-else>
      <div class="title">
        <span>智能对话</span>
        <span class="clear" @click="clearData()">清空聊天记录</span>
      </div>
      <div class="talk_show" id="words" ref="chatbox">
        <div
          v-for="(item, index) in list1"
          :key="index"
          :class="[item.person == 'A' ? 'atalk' : 'btalk']"
        >
          <span class="user" v-show="item.person == 'A'"
            ><i class="el-icon-user-solid"></i
          ></span>
          <span class="text">{{ item.say }}</span>
          <span class="user" v-show="item.person == 'B'"
            ><i class="el-icon-user"></i
          ></span>
        </div>
      </div>
      <div class="talk_input" v-loading="query_loading">
        <input
          type="text"
          class="talk_word"
          id="talkwords"
          v-model="text1"
          @keyup.enter="fnAdd"
        />
        <input
          type="button"
          value="发送"
          class="talk_sub"
          id="talksub"
          @click="fnAdd"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "chat",
  props: {},
  data() {
    return {
      list1: [],
      sel1: 0,
      text1: "",
      loading: true,
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
    if (this.loading_handle) clearInterval(this.loading_handle);
  },
  methods: {
    loadmodel() {
      if (!this.loading_query) {
        this.loading_query = true;
        axios
          .get("/api/loadmodel?key=3")
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
    fnAdd: function() {
      if (!this.query_loading) {
        this.query_loading = true;
        if (this.text1 == "") {
          alert("请输入内容!");
          return;
        }

        this.list1.push({ person: "A", say: this.text1 });
        this.text1 = "";

        let listArr = [];
        this.list1.forEach(v => {
          listArr.push(v.say);
        });
        let param = {
          text: listArr,
          max_tokens: 128,
          top_p: 1.0,
          top_n: 10,
          temperature: 0.9,
          frequency_penalty: 0,
          presence_penalty: 0
        };
        
        this.$nextTick(() => {
          let dom = this.$refs.chatbox;
          dom.scrollTo(0, dom.scrollTopMax);
        });

        axios
          .post("/api/dialogue", param)
          .then(res => {
            this.query_loading = false;
            if (res.data.code == 200) {
              this.list1.push({ person: "B", say: res.data.data });
            }
            this.$nextTick(() => {
              let dom = this.$refs.chatbox;
              dom.scrollTo(0, dom.scrollTopMax);
            })
          })
          .catch(error => {
            this.query_loading = false;
            this.$message.error("调用模型失败！");
            console.log(error);
          });
      }
    },
    clearData() {
      this.list1 = [];
    }
  }
};
</script>

<style lang="scss" scoped>
.talk_con {
  width: 100%;
  max-width: 900px;
  margin: auto;
  .title {
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #333333;
    font-weight: bold;
    text-align: left;
    .clear {
      float: right;
      font-weight: 400;
      color: #2468f2;
      cursor: pointer;
      border-bottom: 1px solid #2468f2;
    }
  }
}

.talk_show {
  // width: 580px;
  width: 100%;
  height: 450px;
  // border: 1px solid #666;
  // background: #fff;
  overflow-y: scroll;
  border: 1px solid #dcdfe6;
  margin: 20px auto 0;
  background: #f9f9f9;
  .user {
    border: none;
    background: none;
    color: inherit;
    vertical-align: top;
    i {
      font-size: 20px;
    }
  }
  .text {
    max-width: 65%;
  }
}

.talk_input {
  width: 100%;
  height: 60px;
  margin-top: 16px;
}

.whotalk {
  width: 8%;
  height: 36px;
  float: left;
  outline: none;
}

.talk_word {
  width: 88%;
  height: 32px;
  padding: 0px;
  float: left;
  outline: none;
  text-indent: 10px;
}

.talk_sub {
  width: 8%;
  height: 36px;
  float: right;
  margin-left: 2%;
  cursor: pointer;
}

.atalk {
  margin: 10px 16px;
  text-align: left;
}

.atalk span {
  display: inline-block;
  // background: #0181cc;
  color: #000;
  padding: 5px 10px;
  border-radius: 10px;
  border: 1px solid #ccc;
}

.btalk {
  margin: 10px 16px;
  text-align: right;
}

.btalk span {
  display: inline-block;
  background: #1067ee;
  color: #fff;
  padding: 5px 10px;
  border-radius: 10px;
  // border: 1px solid #bfc1c5;
}
</style>
