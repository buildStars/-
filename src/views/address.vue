<template>
	<div id="myaddress">
		<van-nav-bar fixed title="地址管理" left-text="返回" left-arrow @click-left="onClickLeft" />

		<div class="content-box">
			<van-address-list v-model="chosenAddressId" :list="address" :switchable="false" default-tag-text="默认" 
				@edit="onEdit" @add="onAdd">

			</van-address-list>
		</div>
	</div>

</template>

<script>
import { mapState } from "vuex";
export default {
	name: "Myaddress",
	data() {
		return {
			chosenAddressId: "1",
			disabledList: [],
			token:"",
		};
	},
	mounted() {
		this.token = localStorage.getItem("token");
		this.$store.dispatch("findAddress", { token: this.token });
	},
	computed: {
		...mapState({
			// accountInfo: (state) => state.user.accountInfo,
			// token: (state) => state.user.token,
			address: (state) => state.addAddress.addressList,
		}),
	},
	methods: {

		onClickLeft() {
			this.$router.back();
		},
		onEdit(item,index) {
			console.log(item,index);
			this.$router.push({path:"/editaddress",query:{id:item.address_id}});
		},
		onAdd() {
			this.$router.push({path:"/addAddress"});
		},
	},
};
</script>

<style lang ="scss">
body{
	background-color: #f5f5f5;
}
#myaddress {
	
	@import "../static/css/common.scss";
	padding-top: 46px;
	.van-cell{
		padding:15px 0;
	}
	.van-cell__value {
		flex: 1;
	}
	.van-nav-bar__text {
		color: $bgColor;
	}

	.van-tag--danger {
		background-color:$bgColor;
	}
	.van-button--danger {
		background-color:$bgColor;
		border-color:$bgColor;
	}
	.content-box {
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;

		overflow: hidden;
	}
}
</style>