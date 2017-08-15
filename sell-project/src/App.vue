<template>
  <div id="app">
  		<m-header :seller="seller"></m-header>	
      	<tabs></tabs>
  		<router-view :seller="seller"></router-view>
  		
  </div>
</template>
<script>
// 引入组件  
import MHeader from './components/header/header'
import Tabs from './components/tabs/tabs'

const ERR_OK = 0;
export default {
	data(){
		return{
			seller:{}
		};
	},
	created(){
		// 拿到假数据
		this.$http.get('/api/seller').then((response)=>{
			response = response.body;
			if(response.errno===ERR_OK){
				this.seller = response.data
				console.log(this.seller);
			}
		});
	},
// 注册header
	components:{
		MHeader,
    	Tabs,
	}
}
</script>

<style>

</style>
