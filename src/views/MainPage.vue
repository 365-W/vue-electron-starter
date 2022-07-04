<template>
  <div class="main-page">
<!--    <p><button @click="onClickButton('sc query apache')">checkStatus</button></p>-->
<!--    <button @click="onClickButton('net start apache')">启动Apache</button>-->
<!--    <button @click="onClickButton('net stop apache')">停止Apache</button>-->
<!--    <button @click="onClickButton('net start mysql')">启动MySQL</button>-->
<!--    <button @click="onClickButton('net stop mysql')">停止MySQL</button>-->
    <el-button>btn</el-button>
  </div>
</template>

<script>
import {cmd} from "@/utils";
export default {
  name: "MainPage",
  data() {
    return {
    }
  },
  created() {
  },
  methods:{
    onClickButton(command){
      cmd(command, e=>{
        console.log('success',e)
      }, e=>{
        console.log('failure:',e)
      })
    },
    checkStatus(){
      // https://zhidao.baidu.com/question/20975718.html
      cmd('sc query apache', (e)=>{
        console.log('success',e)
      }, (e)=>{
        console.log('failure:',e)
      })
    }
  }
}
</script>

<style lang="scss">
</style>
