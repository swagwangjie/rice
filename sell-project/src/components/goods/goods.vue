<template>
	<div class="all-goods">
		<div class="menu-wrapper" ref="menu"> <!--                      better-scroll的v-el在2.0里面已经失效。改用ref="" -->
			<ul>
				<li v-for="(item,index) in goods" class="goods-item" :class="{'current':currentIndex===index}"  @click="select(index,$event)">
					<span class="text">
						<span v-show="item.type>0" class="icon"></span>
						<span class="goods-name">{{item.name}}</span>
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="food">
			<ul>
				<li v-for="item in goods" class="food-list-hook">
					<span class="title">{{item.name}}</span>
					<ul>
						<li v-for="(food,index) in item.foods" class="food-item" @click="showdetail(food)">
							<div class="food-icon">
								<img :src="food.icon">
							</div>
							<div class="food-content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span>月售{{food.sellCount}}份</span>
									&nbsp;&nbsp;
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="yuan">¥</span>
									<span class="currentPrice">
										{{food.price}}
									</span>
									<span class="oldPrice" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
								</div>
								<div class="buttonwrapper">
									<controllbutton :food="food"></controllbutton>
								</div>
							</div>
							<div class="li-line"></div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shopcart ref:shopcart  :minPrice="seller.minPrice"  :selectedfoods="selectedfoods" :postprice="seller.deliveryPrice"></shopcart>
		<fooddetail :food="selected" ref="foodmode"></fooddetail>	
	</div>
	
</template>
<script>
	// 1.引入组件
	import BetterScroll from 'better-scroll'
	import shopcart from 'components/shopcart/shopcart'
	import controllbutton from 'components/button/button'
	import fooddetail from 'components/fooddetail/fooddetail'
	const ERR_OK = 0;
	export default{
		props:{
			seller:{
				type:Object
			}
		},
	// 2.导入组件
		components:{
			shopcart,
			controllbutton,
			fooddetail
		},
		events:{
			'cart.add'(target){
				this._drop(target)
			}
		},
		data(){
			return{
				goods:[],
				listHeight:[],
				scrollY:0,
				selected:{}
			};
		},
		computed:{
			currentIndex(){
				for(let i =0;i<this.listHeight.length;i++){
					let heighta = this.listHeight[i];
					let heightb = this.listHeight[i+1];
					if(!heightb || (this.scrollY>=heighta && this.scrollY<heightb)){
						return i;
					}
				}
				return 0 ;
			},
			selectedfoods(){
				let foods = [];
				this.goods.forEach((good)=>{
					good.foods.forEach((food) =>{
						if(food.count){
							foods.push(food);
						}
					});
					// return foods;
				});
				return foods;				
			}
		},
		created(){
			this.$http.get('/api/goods').then((response)=>{
				console.log(response);
				response = response.body;
				if(response.errno===ERR_OK){
					this.goods = response.data;
					console.log(this.goods);
					this.$nextTick(()=>{
						this._initScroll();
						this._calculateHeight();
					})
				}
			});
		},
		methods: {
			select(index,event){
				// 在pc端上会点击两次,event判断
				if(!event._constructed){
					return
				}
				let foodList = this.$refs.food.getElementsByClassName('food-list-hook');
				let el = foodList[index];
				this.foodScroll.scrollToElement(el,300)
				// console.log(index)
				// 用到better-scroll的一个接口scrollToElement
			},
			_initScroll () {
				// 初始化better-scroll
				this.menuScroll = new BetterScroll(this.$refs.menu,{
					// 初始化better-scroll的时候会组织默认的
					click:true
				});
				this.foodScroll = new BetterScroll(this.$refs.food,{
					click:true,
					probeType:3
				});	
				this.foodScroll.on('scroll',(pos)=>{
					this.scrollY =Math.abs(Math.round(pos.y)) 
				});
			},
			_calculateHeight(){
				let foodList = this.$refs.food.getElementsByClassName('food-list-hook');
				// console.log(foodList)
				let height = 0;
				this.listHeight.push(height);
				for(let i = 0;i<foodList.length;i++){
					let item = foodList[i];
					height+=item.clientHeight;
					this.listHeight.push(height);
				}
			},
			_drop(target){
				this.$refs.shopcart.drop(target)
			},
			showdetail(food){
				this.selected = food
				this.$refs.foodmode.showdetail()
			}

		}

	}
</script>
<style scoped>
	 .all-goods{
	 	 display:flex;
	 	 position:absolute;
	 	 width:100%;
	 	 top:181px;
	 	 left:0;
	 	 bottom:46px;
	 	 overflow: hidden;
	 }
	 .menu-wrapper{
	 	flex:0 0 80px;
	 	width: 80px;
	 	background-color: #f3f5f7;
	 	/*overflow-y: scroll;*/
	 }	
	 .foods-wrapper{
	 	flex:1;
	 	/*overflow: auto;*/
	 }
	 .icon{
		display: inline-block;
		width: 12px;
		height: 12px;
		background-image: url(decrease_1@2x.png);
		background-size: 100%;
		margin:0px 4px 2px 0;
		float: left;
	}
	.goods-item{
		line-height: 56px;
		font-size: 12px;
		color: black;
		font-weight: 200;
		padding: 0 12px 0 12px;
		border-bottom: 1px solid gray;
	}
	.goods-name{
		display: inline-block;
		line-height: 14px;
		/*float: left;*/
	}
	.title{
		display: block;
		font-size: 12px;
		line-height: 27px;
		color:rgb(147,153,159);
		background: #f3f5f7;
		padding-left: 14px;
	}
	.food-icon{
		display: inline-block;
		width: 64px;
		height: 64px;
	}
	.food-icon img{
		width: 64px;
		height: 64px;
	}
	.food-content{
		display: inline-block;
		/*padding-left: 10px;*/
		vertical-align: top;
		text-align: left;
		padding-top:2px;
	}
	.food-item{
		padding: 18px;
		position: relative;
	}
	.li-line{
		width: 100%;
		height: 1px;
		background-color: #ccc;
	}
	.food-content .name{
		font-size: 14px;
		color:rgb(7,17,27);
		line-height: 14px;
		font-weight: 700;
	}
	.desc,.extra{
		font-size: 10px;
		color: rgb(147,153,159);
		line-height: 10px;
		margin:8px 0 8px 0;
	}
	.yuan{
		font-size: 10px;
		color: red;
		font-weight: normal;
		line-height: 24px;
	}
	.currentPrice{
		font-size: 14px;
		color: red;
		font-weight: 700;
		line-height: 24px;
	}
	.oldPrice{
		font-size: 10px;
		color:rgba(147,153,159);
		font-weight: 700;
		line-height: 24px;
		text-decoration: line-through;
	}
	.current{
		position: relative;
		margin-top: -1px;
		z-index: 10;
		background: #fff;
		font-weight: 700;
		border:none;
	}
	.buttonwrapper{
		position: absolute;
		right:20px;
		bottom: 20px;
		margin-bottom: 2px;
	}
</style>