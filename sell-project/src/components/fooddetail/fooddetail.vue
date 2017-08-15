<template>
	<div class="food" v-show="showflag" ref="foodscroll">
		<div class="foodcontent">
			<div class="imgTop">
				<img :src="food.image" width="100%">
				<div class="iconBack" @click="iconBack">
					<svg class="icon" aria-hidden="true">
	  					<use xlink:href="#icon-fanhui"></use>
					</svg>
				</div>
			</div>
			<div class="yourfood">
				<div class="foodname">{{food.name}}</div>
				<div class="saleText">
					<div class="monthSale">
						月售{{food.sellCount}}份
					</div>
					<div class="monthRating">
						好评率{{food.rating}}%
					</div>
				</div>
				<div class="price">
					¥{{food.price}}
				</div>
				<div class="oldprice" v-show="food.oldPrice">
					¥{{food.oldPrice}}
				</div>
				<div class="addcart"  v-show="(!food.count || food.count===0)"  @click="firstadd"> 
					<span class="addtext">加入购物车</span>
				</div>
				<div class="buttonwrapper" v-show="food.count>0">
					<controllbutton :food="food"></controllbutton>
				</div>
			</div>
			<split></split>
			<div class="fooddesc" v-show="food.info">
				<h1>商品介绍</h1>
				<div class="desc">{{food.info}}</div>
			</div>
			<split v-show="food.info"></split>
			<div class="foodratings">
				<h1>商品评价</h1>
				<div class="swrapper">
					<ratingselected :selecttype="selecttype"  :onlycontent="onlycontent" :desc="desc"  :ratings="food.ratings"></ratingselected>		
				</div>
				<div class="rating-wrapper">
					<ul v-show="food.ratings && food.ratings.length">
						<li  v-for="rating in food.ratings" class="rating-item">
							<div class="user">
								<span class="name">{{rating.username}}</span>
								<img class="avatar" width="12" height="12" :src="rating.avatar">
							</div>
							<div class="time">{{rating.rateTime | formDate}}</div>
							<p class="text">
								<span v-show="rating.rateType===1">
									<svg class="icon" aria-hidden="true">
  										<use xlink:href="#icon-caibishi"></use>
									</svg>
								</span>
								<span v-show="rating.rateType===0">
									<svg class="icon" aria-hidden="true">
  										<use xlink:href="#icon-iconxiaoshou"></use>
									</svg>
								</span>
								{{rating.text}}
							</p>
						</li>
					</ul>
					<div class="no-rating" v-show="!food.ratings || !food.ratings.length"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import "../../common/js/iconfont.js"
    import BetterScroll from 'better-scroll'
    import controllbutton from 'components/button/button'
    import vue from 'vue'
    import split from 'components/split/split'
    import ratingselected from 'components/ratingselected/ratingselected'
    import {formDate} from '../../common/js/date.js'
    const PT = 0; //推荐
	const NT = 1;	//吐槽
	const ALL = 2;  //全部
	export default{
		
		data(){
			return {
				showflag:false,
				selecttype:NT,
				onlycontent:false,
				desc:{
					all:'全部',
					pt:'推荐',
					nt:'吐槽'
				}

			}
			
		},
		props:{
			food:{
				type:Object
			}
		},
		methods:{
			showdetail(){
				console.log(this.$refs.foodscroll)
				this.selecttype = ALL;
				this.onlycontent = true;
				this.showflag = true;
				this.$nextTick(()=>{
						if(!this.scroll){
							this.scroll = new BetterScroll(this.$refs.foodscroll,{
							click:true
							})
						}else{
							this.scroll.refresh()
						}
				})
			},
			iconBack(){
				this.showflag=false;
			},
			firstadd(){
				// 起初创建一个food.count
				// 需要引入importvue
				vue.set(this.food,'count',1)

			},
			// needShow(type,text){
			// 	if(this.onlycontent && !text){
			// 		return false;
			// 	}
			// 	if(this.selecttype === ALL){
			// 		return true;
			// 	}else{
			// 		return type === this.selecttype;
			// 	}
			// }
		},
		components:{
			controllbutton,
			split,
			ratingselected
		},
		// vue过滤，date.js导入正则替换
		filters:{
			formDate(time){
				let date = new Date(time);
				return formDate(date,'yyyy-MM-dd hh:mm');
			}
		}
	}
</script>

<style scoped>
	/*icon 图标公共样式*/
	.icon {
	   width: 1em; height: 1em;
	   vertical-align: -0.15em;
	   fill: gray;
	   overflow: hidden;
	}
	.iconBack{
		position: absolute;
		display: block;
		padding: 10px;
		left: 5px;
		top: 5px;
	}
	.icon-check-outline-name{
		font-size: 12px;
		color: gray;
		line-height: 16px;
	}
	.food{
		position: fixed;
		top: 0;
		left: 0;
		bottom: 48px;
		z-index: 30;
		background: #fff;
		width: 100%;
	}
	.imgTop{
		width: 100%;
	}
	.yourfood{
		position: relative;
		padding: 18px;
	}
	.foodname{
		font-size: 14px;
		font-weight: 700;
		color: rgb(7,17,27);
		line-height: 14px;
	}
	.saleText{
		font-size: 0.4rem;
		color: rgb(147,153,159);
		line-height: 10px;
		margin:8px 0 18px 0;
	}
	.monthSale{
		display: inline-block;
		margin-right:12px;
	}
	.monthRating{
		display: inline-block;
	}
	.price{
		display: inline-block;
		font-size: 14px;
		font-weight: 700;
		color: rgb(240,20,20);
		line-height:14px;
	}
	.oldprice{
		display: inline-block;
		font-size: 0.4rem;
		font-weight: 700;
		color: rgb(147,153,159);
		line-height: 24px;
		text-decoration: line-through;
	}
	.addcart{
		display: inline-block;
		position: absolute;
		bottom: 18px;
		right: 18px;
		width: 74px;
		height: 24px;
		background: rgb(0,160,220);
		border-radius: 12px;
		line-height: 22px;
		text-align: center;
	}
	.buttonwrapper{
		position: absolute;
		bottom: 18px;
		right: 18px;
	}
	.addtext{
		font-size: 0.4rem;
		color: rgb(255,255,255);
		line-height: 12px;
	}
	.fooddesc{
		padding: 18px;
	}
	.desc{
		font-size: 12px;
		font-weight: 200;
		color:rgb(77,85,93);
		line-height: 24px;
		margin-top:6px;
	}
	.foodratings{
		padding: 18px;
	}
	.ratingsButton{
		margin:18px 0 18px 0;
	}
	.swrapper{
		padding: 18px 18px 18px 0;
	}
	.rating-item{
		position: relative;
		padding-bottom: 16px;
		margin-bottom: 16px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.rating-wrapper{
		padding: 0 18px 16px 0;
	}
	.user{
		position: absolute;
		right:0;
		top: 0;
	}
	.time{
		padding-bottom: 6px;
		font-size: 12px;
		color: rgb(147,153,159);
	}
	.text{
		font-size: 12px;
		color: rgb(7,17,27);
		line-height: 16px;
	}
	.name{
		font-size: 10px;
		color: rgb(147,153,159);
		line-height: 12px;
	}
</style>