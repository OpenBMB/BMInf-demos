<template>
  <div class="talk_con">
    <div v-show="loading === 1" class="load">
      <img src="../../assets/images/load.gif" />
      <div style="margin-bottom:16px">模型正在加载中...</div>
      <div>首次加载时间较长（可能会需要十分钟），请耐心等待！</div>
    </div>
    <div v-show="loading === 3" class="load">
      <img src="../../assets/images/fail.jpg" />
    </div>
    <div v-show="loading === 2">
      <div class="title">
        <span>智能对话</span>
        <span class="clear" @click="clearData()">清空聊天记录</span>
      </div>
      <div class="talk_show" id="words">
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
        <!-- <div class="btalk"><span>B说：还没呢，你呢？</span></div> -->
      </div>
      <div class="talk_input">
        <!-- <select class="whotalk" id="who" v-model="sel1">
        <option value="0">A说：</option>
        <option value="1">B说：</option>
      </select> -->
        <input
          type="text"
          class="talk_word"
          id="talkwords"
          v-model="text1"
          @keyup.enter="fnAdd"
        />
        <!-- 绑定单击监听,把value传到vue的list1中 -->
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
      loading: 1
    };
  },
  created() {
    this.loadmodel();
  },
  methods: {
    loadmodel() {
      axios
        .get("/api/loadmodel?key=3")
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
    fnAdd: function() {
      if (this.text1 == "") {
        alert("请输入内容!");
        return;
      }

      // 列表追加数据push()
      // this.list1.push({ person: this.sel1 == 0 ? "A" : "B", say: this.text1 });
      this.list1.push({ person: "A", say: this.text1 });
      // 每次输入内容后,清空输入栏数据
      this.text1 = "";

      // { person: "A", say: "吃饭了吗？" },
      //   { person: "B", say: "还没呢，你呢？" }
      let listArr = [];
      this.list1.forEach(v => {
        listArr.push(v.say);
      });
      let param = {
        text: JSON.stringify(listArr), //"['你好','你好','你在干嘛']"
        max_tokens: 128,
        top_p: 1.0,
        top_n: 10,
        temperature: 0.9,
        frequency_penalty: 0,
        presence_penalty: 0
      };
      axios
        .post("/api/dialogue", param, {
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          }
        })
        .then(res => {
          if (res.data.code == 200) {
            this.list1.push({ person: "B", say: res.data.data });
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
    },
    clearData() {
      this.list1 = [];
    }
  }
};
</script>

<style lang="scss" scoped>
.talk_con {
  width: 60%;
  height: 650px;
  margin: 0 auto;
  .load {
    margin-top: 100px;
    div {
      text-align: center;
    }
  }
  .title {
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #333333;
    font-weight: bold;
    margin: 80px 0px 0px 0px;
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
  height: 560px;
  // border: 1px solid #666;
  // background: #fff;
  overflow: auto;
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
