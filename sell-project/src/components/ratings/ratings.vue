<template>
	<div class="ratings" ref="ratings">
		<div class="ratings-content">
			<div class="ratings-info">
				<div class="ratings-info-l">
					<h1 class="score">{{seller.score}}</h1>
					<h1 class="colligate">综合评分</h1>
					<span class="high">高于周边商家{{seller.rankRate}}%</span>
				</div>
				<div class="ratings-info-r">
					<div>
						<span class="item">服务态度</span>
						<span class="stars"></span>
						<span class="scoreitem">{{seller.serviceScore}}</span>
					</div>
					<div>
						<span class="item">服务态度</span>
						<span class="stars"></span>
						<span class="scoreitem">{{seller.foodScore}}</span>
					</div>
					<div>
						<span class="item">送达时间</span> 
						<span class="sendtime">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
			</div>
			<split></split>
			<!-- <ratingsselected></ratingsselected> -->
			<div class="swrapper">
				<ratingselected :selecttype="selecttype"  :onlycontent="onlycontent"  :desc="desc"  :ratings="ratings" ></ratingselected>		
			</div>
			<div class="rating-wrapper">
				<ul>
					<li v-for="rating in ratings" class="ratingitem">
						<div class="avatar">
							<img :src="rating.avatar" width="100%" class="avatarimg">
						</div>
						<div class="avatarright">
							<div class="content">
								<h1 class="username">{{rating.username}}</h1>
							</div>
							<span class="stars"></span>
							<div class="sendend" v-show="">
								<p>{{rating.deliveryTime}}分钟送达</p>
							</div>
							<div class="text">
								{{rating.text}}
							</div>
						</div>
						<div class="date">
							{{rating.rateTime | formDate}}
						</div>
					</li>
				</ul>
			</div>
		</div>
		<!-- <shopcart ref:shopcart  :minPrice="seller.minPrice"  :selectedfoods="selectedfoods" :postprice="seller.deliveryPrice"></shopcart> -->
	</div>
</template>
<script>
	import BetterScroll from 'better-scroll'
	import {formDate} from '../../common/js/date.js'
	import split from 'components/split/split'
	import ratingselected from 'components/ratingselected/ratingselected'
	import shopcart from 'components/shopcart/shopcart'
	const ALL = 2;
	export default{
		props:{
			seller:{
				type:Object
			}
		},
		data(){
			return {
				ratings:[],
				selecttype:ALL,
				onlycontent:true,
				desc:{
					all:'全部',
					pt:'推荐',
					nt:'吐槽'
				},
			}

		},
		// props:{
		// 	deliveryTime:{
		// 		type:Number
		// 	}
		// },
		components:{
			split,
			ratingselected,
			shopcart
		},
		created(){
			this.$http.get('/api/ratings').then((success) =>{
				console.log(success);
				success = success.body;
				if(success.errno === 0){
					this.ratings = success.data;
					console.log(this.ratings);
					// this.$nextTick(()=>{
					// 	this.scroll = new betterScroll(this.$refs.ratings,{
					// 		click:true
					// }){
					this.$nextTick(()=>{
						this.scroll = new BetterScroll(this.$refs.ratings,{
							click:true
						});
					})
				}
			});
		},
		filters:{
			formDate(time){
				let date = new Date(time);
				return formDate(date,'yyyy-MM-dd hh:mm');
			}
		},
	}
</script>
<style>
	.ratings{
		 position:absolute;
	 	 width:100%;
	 	 top:181px;
	 	 left:0;
	 	 bottom:0;
	 	 overflow: hidden;

	}
	.stars{
		width: 50px;
		height: 10px;
		display:inline-block;
		background: url(star24_on@2x.png) repeat;
		background-size: 10px 10px;
		margin: 4px auto 0px auto;
		vertical-align: top;
	}
	.ratings-info{
		display: flex;
		justify-content:center;
	}
	.ratings-info-l{
		text-align: center;
		flex-grow:0.8;
		margin: 18px 0 18px 0;
		border-right: 1px solid gray;
	}
	.ratings-info-r{
		text-align: left;
		flex-grow:2;
		margin:18px 24px 18px 24px;
	}
	.ratings-info-r div{
		margin-bottom: 8px;
	}
	.colligate/* 评分*/{
		margin:6px 0 8px 0 ;
		font-size: 12px;
		color: rgb(7,17,27);
		line-height: 12px;
	}
	.score{
		font-size: 24px;
		color: rgb(255,153,0);
		line-height: 28px;
	}
	.high{
		/*行内元素要选择缩放必须要转化成*/
		display: block;
		font-size: 12px;
		transform:scale(0.8);
		color: rgb(147,153,159);
		line-height: 10px;
	}
	.item{
		font-size: 12px;
		color: rgb(7,17,27);
		line-height: 18px;
		display: inline-block;
		margin-right: 12px;
	}
	.swrapper{
		padding: 18px 18px 18px 18px;
	}
	.scoreitem{
		font-size: 12px;
		color: rgb(255,153,0);
		line-height: 18px;
		vertical-align: top;
		margin-left: 12px;
	}
	.sendtime{
		font-size: 12px;
		color: rgb(147,153,159);
		line-height: 18px;
	}
	.avatar{
		display: inline-block;
		width: 56px;
		margin-right:12px;
	}
	.avatarimg{
		width: 56px;
		border-radius: 50%;
	}
	.ratingitem{
		position: relative;
		margin:0 18px 18px 18px;
		border-bottom: 1px solid gray;
		display: flex;
	}
	.avatarright{
		display: inline-block;
	}
	.content{
		text-align: left;
		font-size: 10px;
		color: rgb(7,17,27);
		line-height: 12px;
	}
	.sendend{
		display: inline-block;
		font-size: 10px;
		font-weight: 200;
		color: rgb(147,153,159);
		line-height: 12px;
		margin:4px 0 6px 0 ;
	}
	.text{
		font-size: 12px;
		color: rgb(7,17,27);
		line-height: 18px;
		margin-bottom: 34px;
	}
	.date{
		position: absolute;
		right: 0;
		top: 0;
		font-size:10px;
		font-weight: 200;
		color: rgb(147,153,159);
		line-height: 12px;
		transform: scale(0.8);
	}
</style>