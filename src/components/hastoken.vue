<template>
  <div id="app">
    <div class="container">拥有token,token为{{token}}</div>
  </div>
</template>
<script>
import { getmock, getaxios } from "@/api/user";
export default {
  name: "hastoken",
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

