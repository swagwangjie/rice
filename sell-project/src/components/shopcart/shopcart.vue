<template>
	<div>
		<div class="shopcart">
			<div class="content"  @click = "toggleList">
				<div class="content-left">
					<div class="content-left-logo">
						<div class="logo-container">
							<div class="redcircle" v-show="totalCount>0">
								<!-- 1222 -->
								<span>{{totalCount}}</span>
							</div>
							<div class="logo-container-container" :class="{'	highLightcircle':totalCount>0}">
								<span class="cart"></span>
							</div>
						</div>
					</div>
					<div class="content-left-price" :class="{'highLightprice':totalCount>	0}">
						￥{{totalPrice}}
					</div>
					<div class="line"></div>o
					<div class="content-left-desc">
						另需配送费￥{{postprice}}
					</div>
				</div>
				<div class="content-right" :class="color" @click.stop.prevent="pay">
					<p class="content-right-number">{{paysend}}</p>
				</div>
			</div>
			<!-- 小球 -->
			<div class="ball-container">
				<div v-for="ball in balls" v-show="ball.show"  transition="drop" class="	ball">
					<div class="inner inner-hook"></div>
				</div>
			</div>
			<!-- 购物车详情页 -->
			<div class="shopcart-list" v-show="listshow" transition="fold">
				<div class="listhaeder">
					<h1 class="title">购物车</h1>
					<span class="empty" @click="doempty(this.food)">清空</span>
				</div>
				<div class="listline"></div>
				<div class="listcontent" ref="listcontent">
					<ul>
						<li class="food" v-for="food in selectedfoods">
							<div class="price">
								<span>¥{{food.price*food.count}}</span>
							</div>
							<span class="foodname">{{food.name}}</span>
							<div class="buttonwrapper">
								<controllbutton :food="food"></controllbutton>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<!-- 模糊背景 -->
		<div class="list-mask" v-show="listshow" @click="reset">123</div>
	</div>
</template>
<script>
 import controllbutton from 'components/button/button'
 import BetterScroll from 'better-scroll'
	export default{
		data(){
			return{
				balls:[
					{
						show:false
					},
					{
						show:false
					},
					{
						show:false
					},
					{
						show:false
					},
					{
						show:false
					},
				],
				dropBalls:[],
				fold:true
			}
		},
		components:{
			controllbutton
		},
		props:{
			selectedfoods:{
				type:Array,
				default(){
					return [
						{
							price:30,
							count:1
						}
					]
				}
			},
			minPrice:{
				type:Number,
				default:0
			},
			postprice:{
				type:Number,
				default:0
				
			},
			
		},
		// 计算属性computed
		computed:{
			totalPrice(){
				let total = 0;
				this.selectedfoods.forEach((food) =>{
					total+=food.price * food.count
				})
				return total;
			},
			totalCount(){
				let count = 0;
				this.selectedfoods.forEach((food) =>{
					count+=food.count
				})
				return count;
			},
			paysend(){
				if(this.totalPrice === 0){
					return `￥${this.minPrice}起送`;
				}else if(this.totalPrice < this.minPrice){
					let diff = this.minPrice - this.totalPrice
					return `还差￥${diff}起送`;
				}else{
					return '去结算';
				}
			},
			color(){
				if(this.totalPrice < this.minPrice){
					return 'notchangeGreen'
				}else if(this.totalPrice >= this.minPrice){
					return 'changeGreen'
				}
			},
			listshow(){
				if(!this.totalCount){
					this.fold = true;
					return false;
				}
				let show = !this.fold;
				if(show){
					// BetterScroll引入后的初始化
					this.$nextTick(()=>{
						if(!this.scroll){
							this.scroll = new BetterScroll(this.$refs.listcontent,{
							click:true
							})
						}else{
							this.scroll.refresh()
						}
						
					})
				}
				return show
			}
		},
		// 第三部,在另一个组件内接收
		created(){
			this.$root.eventHub.$on('cart.add',(target) =>{
				this.drop(target);
			});
		},
		methods:{
			drop(el){
				console.log(el)
				for(let i=0;i<this.balls.length;i++){
					let ball = this.balls[i];
					if(!ball.show){
						ball.shwo = true;
						ball.el = el;
						this.dropBalls.push(ball);
						return;
					}
				}
			},
			toggleList(){
				if(!this.totalCount){
					return
				}
				this.fold = !this.fold;
			},
			doempty(){
				this.selectedfoods.forEach((food)=>{
					food.count = 0
				})
			},
			reset(){
				this.fold = true;
			},
			pay(){
				// 这边需要组织冒泡
				if(this.totalPrice < this.minPrice){
					return
				}else{
					window.alert(`请支付${this.totalPrice}元`)
				}
			}

		},
		transitions:{
			drop:{
				beforeEnter(el){
					let count = this.balls.length
					while(count--){
						let ball = this.balls[count];
						if(ball.show){
							let rect = ball.el.getBoundingClientRect();
							let x = rect.left-32;
							let y =-(window.innerHeight - rect.top-22);
							el.style.display = '';
							el.style.webkitTransform = `translate3d(0,${y}px,0)`;
							el.style.transform = `translate3d(0,${y}px,0)`;
							let inner = el.getElementsByClassName('inner-hook')[0];
							inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
							inner.style.transform = `translate3d(${x}px,0,0)`;
						}
					}
				},
				enter(el){
					// 浏览器重绘
					let rf = el.offsetHeight;
					this.$nextTick(()=>{
						el.style.webkitTransform = 'translate3d(0,0,0)';
						el.style.transform = 'translate3d(0,0,0)';
						let inner = el.getElementsByClassName('inner-hook')[0];
						inner.style.webkitTransform = 'translate3d(0,0,0)';
						inner.style.transform = 'translate3d(0,0,0)';
					})
				},
				afterEnter(el){
					let ball = this.dropBalls.shift();
					if(ball){
						ball.show = false;
						el.style.display ='none';
					}
				}
			}
		},
		
	};
</script>
<style scoped>
	.shopcart{
		width: 100%;
		height: 48px;
		background: pink;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 10000;
		position: fixed;
	}
	.list-mask{
		position:fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		z-index: 10;
		backdrop-filter:blur(10px);
		background: rgba(7,17,27,0.6);
	}
	/*.fade-transition{
		opacity: 1;
		background: rgba(7,17,27,0.6);
	}
	.fade-enter , .fade-leave{
		opacity: 0;
		background: rgba(7,17,27,0);
	}*/
	.content{
		display: flex;
		position: relative;
	}
	.content-left{
		height: 48px;
		flex:1;
		background: #141d17;
		line-height: 48px;
	}
	.content-right{
		flex:0,0,105px;
		width: 105px;/*兼容*/
		height: 48px;
		background-color: gray;
		line-height: 48px;
		text-align: center;
	}
	.content-right-number{
		display: block;
		font-size: 12px;
		color:rgba(255,255,255,0.4);
		font-weight: 700;
		/*line-height: 24px;*/
	}
	.content-left-logo{
		display: inline-block;
	}
	.content-left-desc{
		display: inline-block;
	}
	.cart{
		position: absolute;
		left: 50%;
		top: 50%;
		display: inline-block;
		width: 100%;
		height: 100%;
		margin-left: -12px;
		margin-top: -10px;
		background: url(cart.png) no-repeat;
		background-size: 50%;
	}
	.logo-container{
		position: relative;
		width: 56px;
		height: 56px;
		border-radius: 28px;
		background:#141d17;
		top: -10px;
		margin-left: 12px;
	}
	.logo-container-container{
		position: relative;
		width: 44px;
		height: 44px;
		border-radius: 22px;
		background:gray;
		top: 6px;
		margin-left: 6px;
	}
	.content-left-price{
		display: inline-block;
		font-size: 12px;
		color:rgba(255,255,255,0.4);
		font-weight: 700;
		vertical-align: top;
		margin-left: 10px;
	}
	.line{
		display: inline-block;
		width: 1px;
		height: 24px;
		background: gray;
		vertical-align: top;
		margin:12px 2px 0 10px;
	}
	.content-left-desc{
		display: inline-block;
		font-size: 12px;
		color: rgba(255,255,255,0.4);
		vertical-align: top;
	}
	.redcircle{
		position: absolute;
		right:0;
		top:0;
		width: 24px;
		height: 18px;
		background: red;
		border-radius: 10px;
		color: white;
		text-align: center;
		vertical-align: top;
		z-index: 50;
	}
	.redcircle span{
		position: absolute;
		font-size: 12px;
		display: inline-block;
		-webkit-transform: scale(0.8);
		left: 5px;
		top:-16px;
		font-weight: 700;
	}
	.highLightcircle{
		background:rgb(0,160,220);
	}
	.highLightprice{
		color: rgb(255,255,255);
	}
	.changeGreen{
		background: #00b43c;
	}
	.notchangeGreen{
		background: gray;
	}
	.ball{
		position: fixed;
		left: 32px;
		bottom: 48px;
		z-index: 2000
	}
	.drop-transition{
		transition: all 0.4s
	}
	.inner{
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background:red;
		transition: all 0.4s
	}
	.shopcart-list{
		position: absolute;
		left: 0;
		bottom: 48px;
		z-index: -1;
		width: 100%;
		/*padding:0 18px 0 18px;*/
	}
	/*.fold-transition{
		transition:all 0.5s;
		transform: translate3d(0,-100%,0);
	}
	.fold-enter , .fold-leave{
		transform: translate3d(0,0,0);
	}*/
	.listhaeder{
		display: block;
		height: 40px;
		line-height: 80px;
		overflow: hidden;
		margin:0 auto;
		padding: 0 18px;
		background: #f3f5f7;
	}
	.listline{
		width: 100%;
		height: 1px;
		background: rgba(7,17,27,0.1);
	}
	.listhaeder .title{
		display: block;
		float:left;
		font-size: 14px;
		font-weight: 200;
		color: rgb(7,17,27);
		line-height: 40px;
	}
	.empty{
		float: right;
		font-size: 12px;
		color:rgb(0,160,220);
		line-height: 40px;
	}
	.listcontent{
		padding: 0 18px;
		max-height: 217px;
		overflow: hidden;
		background: #fff;
		/*height: 48px;*/
		/*line-height: 48px;*/
	}
	.foodname{
		text-align: right;
		display: inline-block;
		color: rgb(7,17,27)
	}
	.buttonwrapper{
		display: inline-block;
		float:right;
		margin-top: 14px;
	}
	.price{
		display: inline-block;
		float: right;
		margin-left: 14px;
		color: rgb(240,20,20);
		font-weight: 700;
	}
	.food{
		height: 48px;
		line-height: 48px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
		overflow:hidden;
	}
</style>