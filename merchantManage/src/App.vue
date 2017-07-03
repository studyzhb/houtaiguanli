<template>
  <div id="app">
  	<div v-if="!isLogin" class="loginWrap">
  		<login :isLogin="this.isLogin" @loginState="loginState"></login>
  	</div>
  	<div v-if="isLogin" class="content">
	    <div class="menus-wrapper">
	  		<router-link to="/login" class="menus-header">
	  			<p class="accountName" v-text="accountName"></p>
	  		</router-link>
				<menus></menus>
	  	</div>
	  	<div class="page-wrapper">
	  		<!-- <transition name="slideDown"> -->
	  		<nav-header v-show="turnon"></nav-header>
	  		<!-- </transition> -->
	  		<div class="nav-show">
	  			<ul>
	  				<li>当前位置： <span v-text="curPos"></span></li>
	  			</ul>
	  		</div>
	  		<!-- <transition name="fadeIn"> -->
					<router-view></router-view>
	  		<!-- </transition> -->
	  	</div>
  	</div>
  </div>
</template>

<script type="text/ecmascript-6">
	import Menus from 'base/menus/menus'
	import NavHeader from 'base/header/header'
	import Login from 'components/login/login'

  export default {
  	data() {
  		return {
  			isLogin: false,
  			accountName: '橡树玫瑰城',
  			curPos: '',
  			turnon: false
  		}
  	},
  	created() {
  		if (window.localStorage.__loginState__) {
  			this.isLogin = true
  		}
  	},
  	mounted() {
  		this.turnon = true
  	},
  	methods: {
  		loginState(state) {
  			this.isLogin = state
  		}
  	},
  	components: {
  		Menus,
  		NavHeader,
  		Login
  	}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.content
		width: 100%
		border-color: #2f4050
		background: #2f4050
		.menus-wrapper
			width: 220px
			z-index: 2000
			position: absolute
			left: 0
			top: 0
			bottom: 0
			background: #2f4050
			color: #fff
			text-align: left
			.menus-header
				display: block
				position: relative
				text-align: center
				padding: 33px 25px
				background: url('./common/image/header-profile.png') no-repeat center top
				.accountName
					font-size: 20px
					letter-spacing: 2px
		.page-wrapper
			margin: 0 0 0 220px
			padding: 0 15px
			min-height: 900px
			background: #f3f3f4
			transition: all .4s
			.nav-show
				padding: 0 15px
				margin: 0 -15px
				background: white
				padding: 20px 10px
				color: #676a6c
				font-size: 13px
			.fadeIn-enter-active
				transition: transform 0.5s
			.fadeIn-enter
				opacity: 0
				transform: translateX(100px)
		
</style>
