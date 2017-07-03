<template>
	  <div class="popup">
	  	<div class="title">{{title}}</div>
	  	<div class="cont">
	  		<p>{{desc}}</p>
	  	</div>
	  	<div class="btnWrap">
	  		<div @click="confirm(2)" class="btn-small">取消</div>
	  		<div @click="confirm(1)" class="btn-small">确定</div>
	  	</div>
	  </div>
</template>

<script type="text/ecmascript-6">
	export default {
		props: {
			title: {
				type: String,
				default: '弹窗提示'
			},
			desc: {
				type: String,
				default: '确定这样操作吗？'
			},
			id: {
				default: null
			}
		},
		created() {
		},
		methods: {
			confirm(type) {
				this.type = type
				this.$emit('confirm', [this.type, this.id])
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.popup
		z-index: 999999
		position: fixed
		top: 20%
		left: 0
		right: 0
		margin: 0 auto
		width: 200px
		// height: 150px
		text-align: center
		font-size: 14px
		background: #fff
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3)
		border: 1px solid rgba(0, 0, 0, 0)
		border-radius: 4px
		.title
			padding: 10px
			font-size: 15px
			border-bottom: 1px solid #ddd
		.cont
			font-size: 14px
			padding: 20px 10px
		.btnWrap
			border-top: 1px solid #ddd
			text-align: right
			padding: 10px
</style>