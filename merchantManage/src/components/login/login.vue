<template>
  <div class="loginWrapper">
  	<transition name="fadeDown">
	  	<div class="content">
	  		<h1 class="logo">商户管理中心</h1>
	  		<ul>
	  			<li class="item">
	  				<input type="text" v-model="accountName" placeholder="账户名">
	  			</li>
	  			<li class="item">
	  				<input type="password" v-model="login_pwd" placeholder="登录密码">
	  			</li>
	  			<!-- <li class="item">
	  				<div class="ecode">
	  					<input type="text" v-model="code" placeholder="输入右侧验证码">
	  					<img :src="ecodeUrl" @click="getNewCode" alt="图片验证码">
	  				</div>
	  			</li> -->
	  			<li class="item">
	  				<div @click="login" class="btn">登录</div>
	  			</li>
	  		</ul>
	  	</div>
  	</transition>
		<transition name="layerFadeIn">
			<layer v-show="isShowLayer" :layerDesc="layerDesc"></layer>
		</transition>
  </div>
</template>

<script type="text/ecmascript-6">
	import Layer from 'base/layer/layer'
	import qs from 'qs'

	export default {
		props: {
			isLogin: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				accountName: '',
				login_pwd: '',
				layer: {
					isShowLayer: false,
					layerDesc: ''
				}
			}
		},
		created() {
			document.title = '登录'
			window.localStorage.pagePos = '登录'
		},
		methods: {
			login() {
				// 验证并提交 
				if (!this.verification()) {
					return
				}
				this.isLogin = true
				localStorage.__loginState__ = true
				this.$emit('loginState', this.isLogin)
				// let _this = this
				// this.$ajax({
				// 	method: 'POST',
				// 	url: _this.baseUrl + '/login'
				// }).then((response) => {
				// 	console.log(response)
				// 	let res = response.data
				// 	let msg = res.message
				// 	console.log(res)
				// 	if (res.code === 1) {
				// 		_this._showLayer(msg, 1000)
				// 	} else {
				// 		_this._showLayer(msg, 1000)
				// 	}
				// })

			},
			verification() {
				if (this.accountName === '') {
					this._showLayer('请输入代办点编号', 1000)
					return false
				}
				if (this.login_pwd === '') {
					this._showLayer('请输入您的密码', 1000)
					return false
				}
				return true
			},
			_showLayer(text, time) {
				this.layer.layerDesc = text
				this.layer.isShowLayer = true
				let _this = this
				if (!time) {
					time = 999999
					setTimeout(function() {
						_this.layer.isShowLayer = false
					}, time)
					return
				}
				setTimeout(function() {
					_this.layer.isShowLayer = false
				}, time)
			}
		},
		components: {
			Layer
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.loginWrapper
		.content
			width: 300px
			display: block
			margin: 0 auto
			&.fadeDown-enter-active
				transition: all .5s
			&.fadeDown-enter
				opacity: 0
				transform: translateY(30px)
			.logo
				font-size: 40px
				color: #e6e6e6
				font-weight: 800
				letter-spacing: 1px
				margin-bottom: 30px
				margin-top: 30%
				text-align: center
			.item
				margin-bottom: 15px
				input
					background-color: #FFFFFF
					background-image: none
					border: 1px solid #e5e6e7
					border-radius: 1px
					color: #7d7a7a
					display: block
					padding: 6px 12px
					transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s
					width: 100%
					height: 34px
					line-height: 1.42857143
					font-size: 14px
				input[placeholder]
					color: #7d7a7a
					&:hover
						border-color: #1ab394 !important
				.ecode
					display: flex
					input
						flex: 1
					img
						flex: 0 0 100px
						width: 100px
						height: 34px
						cursor: pointer
						margin-left: 10px
				.btn
					padding: 6px 12px
					margin-bottom: 0
					font-size: 14px
					font-weight: 400
					line-height: 1.42857143
					text-align: center
					white-space: nowrap
					vertical-align: middle
					-ms-touch-action: manipulation
					touch-action: manipulation
					cursor: pointer
					-webkit-user-select: none
					-moz-user-select: none
					-ms-user-select: none
					user-select: none
					background-image: none
					border: 1px solid #1ab394
					border-radius: 4px
					background-color: #1ab394
					color: #FFFFFF
					width: 100%
					box-sizing: border-box
</style>