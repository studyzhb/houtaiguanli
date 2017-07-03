<template>
  <div class="menus">
  	<ul>
  		<li v-for="item in menus" :class="{'active':isShowChild}">
	  		<router-link v-if="!item.main" :to="item.url" v-text="item.text">{{item.text}}</router-link>
	  		<router-link v-if="item.main" to="/" @click.prev.stop="toggleChild">
	  			<i class="fa fa-th-large"></i>
	  			<span v-text="item.main.name"></span>
	  			<span class="fa arrow"></span>
	  		</router-link>
	  		<ul v-if="item.main" ref="childList">
	  			<li v-for="subItem in item.main.children">
	  				<router-link :to="subItem.url" v-text="subItem.text">{{subItem.text}}</router-link>
	  			</li>
	  		</ul>
  		</li>
  	</ul>
  </div>
</template>

<script type="text/ecmascript-6">
	export default {
		data() {
			return {
				menus: [
					{
						text: '店铺资料',
						url: '/store-info'
					},
					{
						text: '修改密码',
						url: '/modify-password'
					},
					{
						text: '广告图',
						url: '/advertising-map'
					},
					{
						main: {
							name: '队列管理',
							children: [
								{
									text: '队列资料',
									url: '/queue-data'
								},
								{
									text: '产品管理',
									url: '/product-manage-queue'
								},
								{
									text: '订单管理',
									url: '/order-manage'
								}
							]
						}
					},
					{
						text: '会员管理',
						url: '/member-manage'
					},
					{
						main: {
							name: '资金中心',
							children: [
								{
									text: '提现审核',
									url: '/cash-check'
								},
								{
									text: '积分兑换',
									url: '/exchange'
								}
							]
						}
					},
					{
						text: '订单管理',
						url: 'product-manage'
					},
					{
						text: '帮助',
						url: '/help'
					}
				],
				isShowChild: false
			}
		},
		created() {
			// this.$router.push('/employeemanage')
		},
		methods: {
			toggleChild() {
				this.isShowChild = true
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.menus
			a
				font-weight: 600
				padding: 14px 20px 14px 25px
				color: #a7b1c2
				display: block
				position: relative
				font-size: 13px
				transition: border 0.2s ease-in
				i
					margin-right: 6px
				&:hover
					background-color: #293846
					color: white
				&.router-link-active
					border-left: 4px solid #19aa8d
					background: #293846
					color: white
					
</style>