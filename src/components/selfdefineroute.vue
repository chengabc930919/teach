<template>
  <div id="app">
    <div class="container">这是一个自定义路由规则</div>
  </div>
</template>
<script>
import { getmock, getaxios } from "@/api/user";
export default {
  name: "selfdefineroute",
  data() {
    return {
      token:""
    };
  },
  mounted(){
    this.token=sessionStorage.getItem("token")
  }
};
</script>
<style scoped>
.title {
  color: rgb(255, 0, 0);
  font-weight: bold;
}
</style>

