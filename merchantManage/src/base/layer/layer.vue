<template>
  <div class="layer">
  	{{desc}}
  </div>
</template>

<script type="text/ecmascript-6">
	export default {
		props: {
			desc: {
				type: String,
				default: '请稍后操作'
			}
		}
	}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	.layer
		position: fixed
		display: inline-block
		left: 0
		right: 0
		margin: 0 auto
		top: 36%
		width: 120px
		text-align: center
		padding: 20px
		line-height: 19px
		font-size: 14px
		border-radius: 3px
		color: #fff
		background: rgba(0,0,0,.8)
		z-index: 9999999
</style>