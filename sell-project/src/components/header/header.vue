<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img :src="seller.avatar" width="64" height="64">
			</div>
			<div class="content">
				<!-- 商家 -->
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<!-- 商家描述 -->
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
					<!-- 因为异步请求数据一开始seller对象为空会出现undefined 所以vif判断-->
				<div class="support" v-if="seller.supports">
					<span class="icon"></span>
					<span class="text">{{seller.supports[0].description}},满50减10</span>
				</div>
			</div>
			<div class="support-count" v-if="seller.supports" @click="showDetail">
				<span class="count">{{seller.supports.length}}个</span>
			</div>
		</div>
		<div class="bulletin-wrapper" @click="showDetail">
			<span class="bulletin-title"></span>
			<span class="bulletin-text">{{seller.bulletin}}></span>
		</div>
		<div class="background">
			<img :src="seller.avatar"  width="100%" height="100%">
		</div>
		<!-- css sticky footer布局 -->
		<div class="detail" v-show="detailShow">
			<div class="detail-wrapper">
				<div class="detail-main">
					<div class="seller-name">
						<!-- 这边星星写死了 -->
						<h1 class="detail-main-title">{{seller.name}}</h1>
						<span class="stars"></span>
					</div>
					<!-- 优惠信息 -->
					<div class="free-title">
						<div class="line"></div>
						<div class="free-title-title">优惠信息</div>
						<div class="line"></div>
					</div>
					<div class="free-info">
						<ul v-if="seller.supports" class="supports">
							<li class="supports-item" v-for="item in seller.supports">
								<span class="icon supports-icon"></span>
								<span class="supports-content">{{seller.supports[0].description}}</span>
							</li>
						</ul>
					</div>
					<!-- 商家公告 -->
					<div class="sellers-title">
						<div class="line"></div>
						<div class="sellers-title-title">商家公告</div>
						<div class="line"></div>
					</div>
					<div class="sellers-infos">
						{{seller.bulletin}}
					</div>
				</div>
			</div>
			<div class="detail-close" @click="hide">
				<i class="icon-close">X</i>
			</div>
		</div>
	</div>
</template>

<script>
// 对外输出
export default{
	data(){
		return{
			detailShow:false,
		}
	},
	methods:{
		showDetail(){
			this.detailShow=true
		},
		hide(){
			this.detailShow=false
		}
	},
	props:{
		seller:{
			type:Object
		}
	},
	created(){
		this.classMap = ['decrease','discount','special','invoice','guarantee'];
	}
};
</script>

<style scoped>
/*@import "../../common/stylus/mixin.styl"*/
	.header{
		position: relative;
		color: rgb(255,255,255);
		background: rgba(7,17,27,0.5);
		overflow: hidden;
	}
	.content-wrapper{
		padding: 24px 12px 18px 24px;
		overflow: hidden;
		position: relative;
		background-color:rgba(0,0,0,0.2);
	}
	.avatar{
		float:left;
	}
	.avatar img{
		border-radius: 2px;
	}
	.content{
		float:left;
		margin-left: 16px;
	}
	.name{
		font-size: 16px;
		color: rgb(255,255,255);
		font-weight: bold;
		line-height: 18px;
		vertical-align: top;
		text-align: left;
	}
	.description{
		display: block;
		margin-top: 8px;
		margin-bottom:10px;
		font-size: 12px;
		font-weight: 200;
		line-height: 12px;
		color: rgb(255,255,255);
	}
	.brand{
		display: inline-block;
		width: 30px;
		height: 18px;
		background-image: url(brand@2x.png);
		background-size: 100%;
		margin:2px 6px 0 0;
	}
	.icon{
		display: inline-block;
		width: 12px;
		height: 12px;
		background-image: url(decrease_1@2x.png);
		background-size: 100%;
		margin:0px 4px 2px 0;
	}
	.text{
		font-size: 10px;
		color: rgb(255,255,255);
		font-weight: 200;
		line-height: 12px;
		text-align: left;
		vertical-align: top;
	}
	.support-count{
		width: 32px;
		height: 24px;
		position: absolute;
		right:12px;
		bottom: 18px;
		color: white;
		font-size: 10px;
		font-weight: 200;
		line-height: 24px;
		text-align: center;
		border-radius: 14px;
		background-color: rgba(0,0,0,0.2);
	}
	.bulletin-wrapper{
		font-size: 10px;
		height: 28px;
		line-height: 28px;
		padding: 0 12px 0 12px;
		overflow: hidden; /*能显示....3部*/
		white-space: nowrap;
		text-overflow: ellipsis;
		background-color:rgba(7,17,27,0.2);

	}
	.bulletin-title{
		display: inline-block;
		width: 22px;
		height: 12px;
		background: url(bulletin@2x.png) no-repeat;
		background-size: 22px 12px;
		vertical-align: middle;
		margin-right:4px;
		margin-top: 1px;
	}
	.bulletin-text{
		text-align: left;
		vertical-align: middle;
	}
	.background{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		/*模糊的效果*/
		filter:blur(10px);
	}
	.detail{
		position: fixed;
		top:0;
		left: 0;
		z-index: 100;
		width: 100%;
		height: 100%;
		overflow: auto;
		transition: all 0.5s;
		background: rgba(7,17,27,0.8);
		clear: both;
		backdrop-filter:blur(10px);
	}
	/*.fade-transition{
		opacity: 1;
		background: rgba(7,17,27,0.8);
	}
	.fade-enter,.fade-leave{
		opacity: 0;
		background: rgba(7,17,27,0);
	}*/
	.detail-wrapper{
		min-height: 100%;
		overflow: hidden;
		padding: 0 36px 0 36px;
	}
	.detail-main{
		margin-top: 64px ;
		padding-bottom: 64px;
	}
	.detail-close{

	}
	.icon-close{
		position: relative;
		width: 32px;
		height: 32px;
		margin:-64px auto 0 auto;
		display: block;
	}
	.detail-main-title{
		display: block;
		text-align: center;
		font-size: 16px;
		font-weight: 700;
		color:rgb(255,255,255);
		line-height: 16px;
	}
	.stars{
		width: 50px;
		height: 10px;
		display:block;
		background: url(star24_on@2x.png) repeat;
		background-size: 10px 10px;
		margin: 16px auto 0px auto;
	}
	/*flex布局*/
	.free-title,.sellers-title{
		display: flex;
		line-height: 14px;
		/*margin-bottom: 24px;*/
		margin: 28px auto 24px auto;
	}
	.free-title-title,.sellers-title-title{
		font-size: 14px;
		font-weight: 700;
		color: rgb(255,255,255);
		line-height: 14px;
		padding: 0 12px 0 12px;
	}
	.line{
		width: 30%;
		background: rgba(255,255,255,0.2);
		height: 1px;
		flex:1;
		vertical-align: middle;
		margin-top: 6px;
	}
	.supports-content{
		font-size: 12px;
		font-weight: 200;
		color: rgb(255,255,255);
		line-height: 12px;
		display: inline-block;
		margin-left: 6px;
		vertical-align: top;
		text-align: left;
		letter-spacing:1px;
	}
	.supports-icon{
		margin-left: 12px;
	}
	.supports-item{
		margin-top: 6px;
	}
	.sellers-infos{
		padding: 0 12px 0 12px;
		font-size: 12px;
		font-weight: 200;
		color: rgb(255,255,255);
		line-height: 24px;
	}
</style>