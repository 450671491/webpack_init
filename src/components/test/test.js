export default () => {
  return {
    name: 'test',
    data () {
      return {
      }
    },
    created () {
      console.log('created');
    },
    render () {
      const vnode = this.$slots.default ? this.$slots.default[0] : null
      console.log(vnode);
      return vnode
    }
  }
};
