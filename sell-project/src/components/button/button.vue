<template>
	<div class="cartcontrol">
		<div class="decrease" v-show="food.count>0" @click.stop.prevent="decreasecount"></div>
		<div class="num" v-show="food.count>0">{{food.count}}</div>
		<div class="increase" @click.stop.prevent="addcount"></div>
	</div>
	
</template>
<script>
	import Vue from 'vue';

	export default{
		props:{
			food:{
				type:Object
			}
		},
		methods:{
			addcount(event){
				if(!this.food.count){
					Vue.set(this.food, 'count' ,1);
					this.food.count = 1;
				}else{
					this.food.count++;
				}
				// 第二部，在某一个组件内进行派发
				this.$root.eventHub.$emit('cart.add', event.target)
			},
			decreasecount(){
				if(this.food.count){
					this.food.count--;
				}
			}
		}

	}
</script>
<style scoped>
	.cartcontrol{
		overflow: hidden;
	}
	.num{
		float: left;
		font-size: 12px;
		color: rgb(147,153,159);
		line-height: 20px;
		width: 24px;
		text-align: center;
	}
	.decrease{
		display: inline-block;
		float:left;
		width: 20px;
		height: 20px;
		background: url(button-decrease.png) no-repeat;
		background-size: 100%;
		transition:all 0.4s linear;
	}
	.increase{
		display: inline-block;
		float:left;
		width: 20px;
		height: 20px;
		background: url(button-increase.png) no-repeat;
		background-size: 100%;
	}
</style>