<template>
	<div class="seller" ref="seller">
		<div class="seller-content">
			<div class="seller-info">
				<div class="seller-info-top">
					<div class="sellername">{{seller.name}}</div>
					<div class="star starpart">
						<span class="stars"></span>
						<div class="monthcount">
							月售{{seller.sellCount}}单
						</div>
					</div>
					<div class="collection">
						<svg class="icon" aria-hidden="true">
  							<use xlink:href="#icon-iconfontheart"></use>
						</svg>
						<span class="collection-text">收藏</span>
					</div>
				</div>
				<div class="seller-info-bottom">
					<div class="start">
						<div class="text-item">起送价</div>
						<div class="price-item">{{seller.minPrice}}<span class="yuan">元</span></div>
					</div>
					<div class="send">
						<div class="text-item shopsend">商家配送</div>
						<span class="price-item">{{seller.deliveryPrice}}<span class="yuan">元</span></span>
					</div>
					<div class="average">
						<div class="text-item">平均配送时间</div>
						<div class="price-item">{{seller.deliveryTime}}<span class="dtimer">分钟</span></div>
					</div>
				</div>
			</div>
			<split></split>
			<div class="seller-center">
				<h1 class="seller-center-title">公告与活动</h1>
				<div class="title-content">{{seller.bulletin}}</div>
			</div>
		</div>
	</div>
</template>
<script>
	import BetterScroll from 'better-scroll'
	import split from 'components/split/split'
	export default{
		props:{
			seller:{
					type:Object
				}
		},
		data(){
			return {
				// seller :[]
			}
		},
		created(){
			// this.$http.get('/api/seller').then((success) =>{
			// 	console.log(success);
			// 	success = success.body;
			// 	if(success.errno === 0){
			// 		this.seller = success.data;
			// 		console.log(this.seller);
			// 		this.$nextTick(()=>{
			// 			this.scroll = new BetterScroll(this.$refs.seller,{
			// 				click:true
			// 			});
			// 		})
			// 	}
			// });
		},
		components:{
			split
		}
	}
</script>
<style scoped>
	.sellers{
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
	.icon {
   		width: 1em; height: 1em;
   		vertical-align: -0.15em;
   		fill: rgb(147,153,159);
   		overflow: hidden;
	}
	.seller-info{
		padding: 18px;
	}
	.seller-info-top{
		position: relative;
		border-bottom: 1px solid rgb(147,153,159);

	}
	.sellername{
		font-size: 14px;
		color: rgb(7,17,27);
		line-height: 14px;
	}
	.starpart{
		margin:8px 0 18px 0;
	}
	.monthcount{
		display: inline-block;
		font-size: 10px;
		transform: scale(0.8);
		color: rgb(77,85,93);
		line-height: 18px;
	}
	.collection{
		position: absolute;
		right: 0;
		top: 0;
		text-align: center;
	}
	.collection-text{
		display: block;
		font-size: 10px;
		color: rgb(77,85,93);
		line-height: 10px;
		transform: scale(0.8);
		margin-top: 4px;
	}
	.seller-info-bottom{
		display:flex;
		text-align: center;
		padding: 18px 0 0 0 ;
	}
	.start{
		flex-grow:1;
	}
	.send{
		flex-grow: 1;
		border-left: 1px solid rgb(147,153,159);
		border-right: 1px solid rgb(147,153,159);
	}
	.average{
		flex-grow: 1;
	}
	.text-item{
		font-size: 10px;
		color: rgb(147,153,159);
		line-height: 10px;
		transform:scale(0.8);
		margin-bottom: 4px;
	}
	.price-item{
		font-size: 24px;
		font-weight: 200;
		color: rgb(7,17,27);
		line-height: 24px;
	}
	.yuan{
		font-size: 10px;
		transform:scale(0.8);
		font-weight: 200;
		color: rgb(7,17,27);
		line-height: 24px;
	}
	.dtimer{
		font-size: 10px;
		transform:scale(0.8);
		font-weight: 200;
		color: rgb(7,17,27);
		line-height: 24px;
	}
	.seller-center-title{
		font-size: 14px;
		color: rgb(7,17,27);
		line-height: 14px;
		font-weight: 700;
	}
	.seller-center{
		margin:18px 18px 0px 18px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.title-content{
		padding: 8px 12px 0px 12px;
		font-size: 12px;
		font-weight: 200;
		color: rgb(240,20,20);
		line-height: 24px;
		margin-bottom: 16px;
	}
</style>