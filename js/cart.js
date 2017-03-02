var vm = new Vue({
  // Vue 实例对象的作用范围，app 范围内的所有元素都可以被 vue 实例操控
  el: "#cart", // 注意这里要有#号

  // 定义模型，所有的模型发生改变都会反向去操作 DOM
  data: {
    title: "Hello Vue.js!"
  },

  // 局部过滤器
  filters: {

  },

  // 生命周期中，实例准备完成后执行，参考：https://cn.vuejs.org/v2/guide/instance.html#生命周期图示
  mounted: function(){
    this.cartView();
  },

  // 定义事件绑定的函数放在这里
  methods: {
    cartView: function(){
      this.title = "Hello Vue";
    }
  }
});

// 全局过滤器
Vue.filter();
