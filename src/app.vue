<template>
  <div class="container">
    {{msg}}
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: '有点东西呀'
    }
  },
  created () {
    console.log('这个要干掉')
  }
}
</script>

<style scoped>
  .container{
    display: flex;
    font-size: 32px;
    color: red;
  }
</style>


