var vm = new Vue({
  // Vue 实例对象的作用范围，app 范围内的所有元素都可以被 vue 实例操控
  el: "#cart", // 注意这里要有#号

  // 定义模型 model，所有的模型发生改变都会反向去操作 DOM
  data: {
    productList: [],
    total: 0,
    checkAllFlag: false,
    delFlag: false
  },

  // 局部过滤器
  filters: {
    formatMoney: function(price){
      return '￥ ' + price.toFixed(2);
    }
  },

  // 生命周期中，实例准备完成后执行，参考：https://cn.vuejs.org/v2/guide/instance.html#生命周期图示
  mounted: function(){
    this.$nextTick(function(){ // 保证 this.$el 已经插入到文档中
      this.cartView();
    })
  },

  // 定义事件绑定的函数放在这里
  methods: {
    cartView: function(){
      var that = this;
      axios.get('data/cart.json') // 获取 json 文件
           .then(function(res){
             that.productList = res.data.result.productList;
             that.total = res.data.result.totalMoney;
            //  console.log(res.data.result);
           })
           .catch(function(err){
             console.log(err);
           });
    },
    changeQuantity: function(product, num){
      if (num > 0){
        product.productQuentity++;
        if (product.productQuentity > 10) {
          // 最多一次购买10件商品
          product.productQuentity = 10;
        }
      }
      else {
        product.productQuentity--;
        if (product.productQuentity < 1) {
          // 最少一次购买1件商品
          product.productQuentity = 1;
        }
      }
      this.calTotal();
    },
    // selectedProduct: function(item){
    //   if(typeof item == 'undefined'){
    //     Vue.set(item, 'checked', true);
    //     // this.$set(item, "checked", true);
    //   }
    //   else {
    //     item.checked = !item.checked;
    //   }
    // },
    selectedProduct: function(index){
      if(typeof this.productList[index].checked == 'undefined'){
        // Vue.set(this.productList[index], 'checked', true);
        this.$set(this.productList[index], 'checked', true);
      }
      else {
        this.productList[index].checked = !this.productList[index].checked;
      }
      if (this.productList[index].checked == false){
        this.checkAllFlag = false;
      }
      else {
        this.setCheckAllFlag();
      }
      this.calTotal();
    },
    checkAll: function(flag){
      var that = this;
      this.checkAllFlag = flag;
      this.productList.forEach(function(product, index){
        if(typeof product.checked == 'undefined'){
          that.$set(product, 'checked', flag);
        }
        else {
          product.checked = flag;
        }
      })
      this.calTotal();      
    },
    setCheckAllFlag: function(){
      var setAll = true;
      this.productList.forEach(function(product, index){
        if (typeof product.checked == 'undefined' || product.checked == false){
          setAll = false;
        }
      })
      this.checkAllFlag = setAll;
    },
    calTotal: function(){
      var that = this;
      var sum = 0;
      this.productList.forEach(function(product, index){
        if(product.checked){
          sum += product.productPrice * product.productQuentity;
        }
      })
      this.total = sum;
    }
  }
});

// 全局过滤器，所有页面都可以使用
Vue.filter("money", function(price, type){
  return price.toFixed(2) + " " + type;
});
