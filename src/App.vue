<template>
  <div id="app">
    <router-view/>
    <!-- 返回顶部 -->
    <backTop></backTop>
  </div>
</template>

<script>
import backTop from "@/commonComponents/backTop"
export default {
  components: {
    backTop
  }
}
</script>

<style>
input{
  border: none;
  padding: 0;
  height: .16rem;
}
input:focus{
  outline: none;
}
input::-webkit-input-placeholder{
  color: #ccc;
  font-size: .16rem;
  line-height: .16rem;
}
</style>