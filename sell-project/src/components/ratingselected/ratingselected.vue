<template>
	<div class="ratingselected">
		<div class="rating-type">
			<span class="all" :class="{'activen':selecttype===2}"  @click="select(2,$event)">{{desc.all}}<span class="n">{{ratings.length}}</span></span>
			<span class="recommand" :class="{'activen':selecttype===0}"  @click="select(0,$event)">{{desc.pt}}<span class="n">{{posti.length}}</span></span>
			<span class="fack" :class="{'activenf':selecttype===1}"  @click="select(1,$event)">{{desc.nt}}<span class="n">{{negati.length}}</span></span>
		</div>
		<div class="switch">
			<div class="icon-check-outline" >
				<svg class="icon" aria-hidden="true">
	  				<use xlink:href="#icon-check-outline"></use>
				</svg>
			</div>
			<span class="icon-check-outline-name">只看有内容的评价</span>
		</div>
	</div>
</template>

<script>
	import "../../common/js/iconfont.js"

	const PT = 0; //推荐
	const NT = 1;	//吐槽
	const ALL = 2;  //全部
	export default{
		props:{
			ratings:{
				type:Array,
				default(){
					return [];
				}
			},
			selecttype:{
				type:Number,
				default:ALL
			},
			onlycontent:{
				type:Boolean,
				default:false
			},
			desc:{
				type:Object,
				default(){
					return{
						all:'全部',
						pt:'满意',
						nt:'不满意'
					}
				}
			},
		},
		computed:{
			posti(){
				return this.ratings.filter((rating)=>{
					return rating.ratType === PT;
				})
			},
			negati(){
				return this.ratings.filter((rating)=>{
					return rating.rateType === NT;
				})
			}
		},
		methods:{
				select(type,event){
					if(!event._constructed){
						return;
					}
					this.selecttype = type;
					// 父子组件的通信，在子组件中派发一个事件
					// this.$dispath('ratingtype.select',type);
				},
				toggleContent(event){
					// if(!event._constructed){
					// 	return;
					// }
					// this.onlycontent = !this.onlycontent;
					// this.$dispath('content.toggle',this.onlycontent);
				}
		}
	}
</script>

<style scoped>
	.icon {
	   width: 1em; height: 1em;
	   vertical-align: -0.15em;
	   fill: gray;
	   overflow: hidden;
	}
	.icon-check-outline{
		display: inline-block;
	}
	.icon-check-outline-name{
		font-size: 12px;
		color: gray;
		line-height: 16px;
		display: inline-block;
		margin-top: 12px;
		margin-bottom: 12px;
		/*border-bottom: 1px solid gray;*/
	}
	.all{
		font-size: 12px;
		color: rgb(255,255,255);
		line-height: 16px;
		padding: 8px 12px 8px 12px;
		border-radius: 6px;
		background-color: rgba(0,160,220,0.2);
		margin-right:8px;
	}
	.recommand{
		font-size: 12px;
		color: rgb(77,85,93);
		line-height: 16px;
		padding: 8px 12px 8px 12px;
		border-radius: 2px;
		background-color: rgba(0,160,220,0.2);
		margin-right:8px;
	}
	.fack{
		font-size: 12px;
		/*color: rgb(77,85,93);*/
		line-height: 16px;
		padding: 8px 12px 8px 12px;
		border-radius: 2px;
		background-color: rgba(77,85,93,0.2);
		margin-right:8px;
	}
	.rating-type{
		height: 36px;
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
	.activef{
		color: white;
		background: gray;
	}
	.activen{
		background-color: rgb(0,160,220);
	}
	.switch{
		border-bottom: 1px solid rgba(7,17,27,0.1);
	}
</style>