var vm = new Vue({
  el: ".checkout-addr",

  data: {
    addressList: [],
    limitAddressNum: 3,
    currIndex: 0,
    shippingMethod: 1
  },

  mounted: function(){
      this.$nextTick(function(){
        this.getAddressList();
      })
  },
  computed: {
    limitAddress: function(){
        return this.addressList.slice(0, this.limitAddressNum);
    }
  },
  methods: {
      getAddressList: function(){
        var that = this;
        axios.get('data/address.json')
             .then(function(res){
               that.addressList = res.data.result;
             })
             .catch(function(err){
               console.log(err);
             });
      },
      setDefault: function(currIdx){
        this.addressList.forEach(function(item, index){
          if(index == currIdx){
            item.isDefault = true;
          }
          else {
            item.isDefault = false;
          }
        })
      }
  }
});
