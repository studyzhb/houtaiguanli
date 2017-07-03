<template>
	<transition name="slideDown">
		<div class="nav-wrapper">
			<!-- <div class="btn-indent">=</div> -->
			<ul class="navbar-link">
				<li> 
					<span class="headImg">
						<img class="" src="../../common/image/head.jpg" alt="">	
					</span>
					<span v-text="accountName"></span>
				</li>
				<li class="logout-btn" @click="logout"><i class="fa fa-sign-out"></i> 退出</li>
			</ul>
		</div>
	</transition>
</template>

<script type="text/ecmascript-6">
  export default {
  	props: {
  		accountName: {
  			type: String,
  			default: '橡树玫瑰城'
  		}
  	},
  	data() {
  		return{}
  	},
  	methods: {
  		logout() {}
  	}
  }
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
	.nav-wrapper
		overflow: hidden
		height: 60px
		margin: 0 -15px
		background: #f3f3f4
		border-bottom: 1px solid #e7eaec
		.btn-indent
			float: left
			text-align: center
			margin: 14px 5px 5px 20px
			background: #1ab394
			border-color: #1ab394
			display: inline-block
			padding: 4px 12px
			color: white
			border-radius: 3px
			font-size: 18px
			cursor: pointer
			&:hover
				background: #18a689
				border-color: #18a689
				color: white
		.navbar-link
			float: right
			margin-right: 40px
			line-height: 60px
			color: #999c9e
			font-size: 14px
			overflow: hidden
			li
				display: inline-block
				padding: 0 5px
				margin-left: 10px
				&.logout-btn
					cursor: pointer
				.headImg
					display: inline-block
					width: 25px
					height: 25px
					cursor: pointer
					border-radius: 100%
					overflow: hidden
					vertical-align: text-bottom
					img
						width: 100%
						display: inline-block
						vertical-align: top
	.slideDown-enter-active
		transition: all .3s
	.slideDown-enter
		opacity: 0
		transform: translateY(-50px)
</style>
