<template>
  <div id="app">
    <div class="container h1">first project</div>
    <!--v-if使用--------------------------------------------------------------->
    <div class="title">v-if使用</div>
    <div v-if="ifshow">v-if</div>
    <el-button type="primary"  @click="changevif">切换v-if</el-button>
    <!--v-for使用--------------------------------------------------------------->
    <div class="title">v-for使用</div>
    <div v-for="(item ,index) in vfordata" :key="index">
      <div>第{{index+1}}个数据为{{item}}</div>
    </div>
    <!--computed使用--------------------------------------------------------------->
    <div class="title">计算属性computed使用</div>
    <div>源数据{{source}}</div>
    <div>计算数据{{result}}</div>
    <el-button type="primary"  @click="sourceadd">+1</el-button>
    <!--watch使用--------------------------------------------------------------->
    <div class="title">监听属性watch使用</div>
    <div>源数据{{source1}}</div>
    <div>watch结果{{message1}}</div>
    <el-button type="primary"  @click="sourceadd1">+1</el-button>
    <!--v-model双向数据绑定--------------------------------------------------------------->
    <div class="title">v-model双向数据绑定</div>
    <input v-model="vmodelvalue" />
    <div>v-model结果{{vmodelvalue}}</div>
    <el-button type="primary"  @click="sourceadd2">+1</el-button>
    <!--store设置name与读取name--------------------------------------------------------------->
    <div class="title">store设置name与读取name</div>
    <input v-model="setname" />
    <el-button type="primary"  @click="clicksetname">设置name</el-button>
    <div>读取name:{{readname}}</div>
    <el-button type="primary"  @click="clickreadname">读取name</el-button>
    <!--async、await、promise使用--------------------------------------------------------------->
    <div class="title">async、await、promise使用</div>
    <el-button type="primary"  @click="clickasync">async执行顺序</el-button>
    <el-button type="primary"  @click="clickseriesasync">多个async连续执行</el-button>
    <!--mock模拟后台数据--------------------------------------------------------------->
    <div class="title">mock模拟后台数据与axios请求后台数据</div>
    <div>userid:{{userid}}</div>
    <div>username:{{username}}</div>
    <el-button type="primary"  @click="clickmock">读取mock数据</el-button>
    <el-button type="primary"  @click="clickaxios">读取axios数据</el-button>
    <!--permission权限校验、axios附加token、sessionitem设置--------------------------------------------------------------->
    <div class="title">permission权限校验、axios附加token、sessionitem设置</div>
    <el-button type="primary"  @click="settoken">设置token</el-button>
    <el-button type="primary"  @click="cleartoken">清除token</el-button>
    <el-button type="primary"  @click="jump">跳转页面</el-button>
    <!--router动态路由--------------------------------------------------------------->
    <div class="title">router动态路由</div>
    <input v-model="routerules" />
    <el-button type="primary"  @click="clickroute">添加路由规则</el-button>
    <el-button type="primary"  @click="removeroute">清除路由规则</el-button>
    <el-button type="primary"  id="idyellow" class="classyellow" @click="clickselfroute">跳转路由规则</el-button>
    <!--菜鸟教程--------------------------------------------------------------->
    <div class="title">菜鸟教程</div>
    <router-link to="https://www.runoob.com/vue2/vue-tutorial.html">菜鸟教程使用router-link</router-link>
    <a href="https://www.runoob.com/vue2/vue-tutorial.html">菜鸟教程使用a href</a>
  </div>
</template>
<script>
import { getmock, getaxios } from "@/api/user";
export default {
  name: "exam",
  data() {
    return {
      //是否显示
      ifshow: true,
      //v-for 数据
      vfordata: ["0数据", "1数据", "2数据"],
      source: 0,
      source1: 0,
      message1: "",
      vmodelvalue: 0,
      setname: "",
      readname: "",
      username: "",
      userid: "",
      routerules: "/selfdefineroute"
    };
  },
  computed: {
    result() {
      return this.source + 1;
    }
  },
  watch: {
    source1: function(after, before) {
      this.message1 = "原来为" + before + "变化为" + after;
    }
  },
  methods: {
    changevif() {
      this.ifshow = !this.ifshow;
    },
    sourceadd() {
      this.source = this.source + 1;
    },
    sourceadd1() {
      this.source1 = this.source1 + 1;
    },
    sourceadd2() {
      this.vmodelvalue = parseInt(this.vmodelvalue) + 1;
    },
    async clicksetname() {
      await this.$store.dispatch("user/setname", this.setname);
    },
    clickreadname() {
      this.readname = this.$store.state.user.name;
    },
    async clickasync() {
      let asyfunc = function() {
        console.log("async function,执行顺序1");
        return new Promise((resolve, reject) => {
          //return "async function,执行顺序2"; /*情况二*/
          resolve("async function,执行顺序3"); /*情况三*/
        }).catch(error => {
          reject(error);
        });
      };
      let syncfunc = function() {
        console.log("sync function,执行顺序4");
      };
      /************************************************************************* */
      //第一种情况，先执行1，然后3为pend状态，先执行4，这时3为resolve状态，执行3
      asyfunc().then(result => console.log(result));
      //第二种情况，先执行1，返回了2,3一直为pend状态，执行4,3一直不会被执行
      //console.log(asyfunc().then(result => console.log(result)));
      //第三种情况，先执行1，等待3返回，执行3，然后执行4
      //await(asyfunc().then(result=>console.log(result)))
      /************************************************************************** */
      syncfunc();
    },
    async clickseriesasync() {
      let fun1 = function() {
        return new Promise((resolve, reject) => {
          console.log("fun1");
          resolve('resolve fun1');
          //reject('fun1 error');
        });
      };
      let fun2 = function() {
        return new Promise((resolve, reject) => {
          console.log("fun2");
          //resolve("resolve fun2")
          //throw "fun2 error";
          reject('fun2 error')
        });
      };
      let fun3 = function() {
        return new Promise((resolve, reject) => {
          console.log("fun3");
          resolve();
        });
      };
      //fun1-->fun2-->fun3
      //fun1().then(fun2).then(fun3)//会等待resolve
      //fun1阻塞
      //fun1().then(fun2).then(fun3)
      //fun1().then(fun2).then(item=>{console.log(item);fun3()})
      //fun2阻塞
      //fun1().then(fun2).then(fun3)
      //fun3阻塞
      //fun1().then(fun2).then(fun3);console.log('fun4')
      //fun1().then(fun2).then(fun3).then(function(){console.log('fun4')})
      //fun2打断
      //fun1().then(fun2).then(fun3);console.log("fun4");
      fun1().then(fun2).then(fun3).catch(error=>{console.log(error)});console.log("fun4");
      //promise all使用(接受参数为promise,两个都成功继续,返回两个成功的结果值,一个错误则全部停止,在外面catch只捕捉第一个错误)
      //Promise.all([fun1(),fun2()]).then(item=>{console.log(item);fun3()}).catch(error=>{console.log(error)})
      //promise race使用（接受参数为promise，返回第一个结果（resolve在then处理，reject在catch处理,在里面设置该promise是pending)
      //Promise.race([fun1(),fun2()]).then(fun3).catch(error=>{console.log(error)})
      /***************************************************************************************************/
      /*补充说明1，如果想fun1=>fun2=>fun1内部处理错误，pending=>fun2抛出错误，由外部catch解决，fun3不执行
      //Promise.race([fun1().catch(error=>{console.log(error)}),fun2()]).then(fun3).catch(error=>{console.log(error)})
      /*补充说明2，如果想fun1、fun2后，处理完错误，再处理fun3，可以用以下形式，注意，catch后promise处于pending状态
      await async function(){
        fun1().catch(error=>{console.log(error)})
        await fun2().catch(error=>{console.log(error)})
      }()
      fun3()
      /***************************************************************************************************/
    },
    //Network中没有数据,删除await对比执行顺序
    async clickmock() {
      await getmock("").then(res => {
        console.log(res);
        this.username = res.data.data.username;
        this.userid = res.data.data.userid;
      });
      console.log("get mock");
    },
    async clickaxios() {
      await getaxios({ username: "axiosname", userid: "axiosid" }).then(res => {
        console.log(res);
        this.username = res.data.username;
        this.userid = res.data.userid;
      });
      console.log("get axios");
    },
    settoken() {
      sessionStorage.setItem("token", "token");
    },
    cleartoken() {
      sessionStorage.removeItem("token");
    },
    jump() {
      this.$router.push({ path: "/hastoken" }).catch(error=>{});
    },
    clickroute() {
      var routes = [];
      routes.push({
        path: this.routerules,
        name: "selfdefineroute",
        component: () => import("@/components/selfdefineroute")
      });
      this.$router.addRoutes(routes);
    },
    removeroute() {
      location.reload();
    },
    clickselfroute() {
      this.$router.push({ path: this.routerules });
    }
  }
};
</script>
<style scoped>
.title {
  color: rgb(255, 0, 0);
  font-weight: bold;
  margin-top:20px;
}
.h1 {
  color: rgb(0, 0, 0);
  font-weight: bold;
  font-size: 50px;
}
.el-button{
  margin-bottom: 20px;
}
/*#idyellow{
  color: rgb(255,255,0);
  margin-bottom: 20px;
}*/
.el-button.classyellow{
  color: rgb(255,255,0);
  margin-bottom: 20px;
}
</style>

