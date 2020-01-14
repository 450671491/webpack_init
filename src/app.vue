<template>
  <test>
     <div class="container">
      {{msg}}
    </div>
  </test>
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


