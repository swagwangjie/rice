<template>
	<div class="tab">
		<router-link  tag="div" class="tab-item" to="/goods">
        <span>商品</span>
      	</router-link>
      	<router-link tag="div" class="tab-item" to="/ratings">
        	<span>评论</span>
      	</router-link>
      	<router-link tag="div" class="tab-item" to="/sellers">
      	  <span>商家</span>
      	</router-link>
	</div>
</template>
<script type="text/javascript">
</script>
<style>
.tab{
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 0.5px solid gray;
}
.tab-item{
  flex:1;
  text-align: center;
}
.tab span{
  display: block;
  font-size: 14px;
}
.active{
  color: rgb(240,20,20);
}
</style>