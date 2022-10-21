<template>
	<div id="account">
		<van-nav-bar fixed title="个人资料" left-arrow @click-left="onClickLeft" color="red" />
		<div class="account-bg"></div>
		<div class="list-box">
			<van-cell title="头像" value="">
				<template #default>
					<div class="img-box">
                        <img class="auto-img" :src="'http://'+accountInfo[0]?.img" alt="">
						<van-uploader :after-read="afterRead" />
					</div>
				</template>
			</van-cell>
			<van-cell title="用户ID" :value="accountInfo[0]?.id" />
			<van-cell title="手机号" :value="accountInfo[0]?.phone" />
			<van-cell title="昵称">
				<template #default>
					<div class="nikename">
						<form>
                            
							<input type="text" v-model="accountInfo[0] && accountInfo[0].userName" @blur="updateNickName()">
						</form>
					</div>
				</template>
			</van-cell>
			

		</div>
	</div>

</template>

<script>
import { getFunc, postFunc } from "@/http/request";
import { mapState } from "vuex";
export default {
	name: "Account",
	data() {
		return{
			accountInfo:[],
			token:"",
			baseurl:"192.168.35.39:3005",
		}
	},
	mounted() {
		this.token = localStorage.getItem("token");
		this.getUserAsync();
			},
	computed: {
		...mapState({
			// 获取用户信息
		}),
	},
	methods: {
		onClickLeft() {
			this.$router.back();
		},
		beforeRead(file) {
      if (file.type !== 'image/jpeg') {
        Toast('请上传 jpg 格式图片');
        return false;
      }
      return true;
    },
		afterRead(file) {
			file.status = "uploading";
      		file.message = "上传中...";
			// 此时可以自行将文件上传至服务器;	
			let fd = new FormData()
			fd.append("file",file.file)
			fd.append("token",this.token)

			postFunc('/upload/img',fd).then(res=>{
				file.status = "done";
				file.message = "上传成功";
				this.$toast.success('上传成功');
				this.getUserAsync();
			}).catch(err=>{
				file.status = "failed";
				file.message = "上传失败";
				this.$toast.fail('上传失败');
			})
		},
		
		updateNickName() {
			this.$store
				.dispatch("updateNickName", {
					token: this.token,
					name: this.accountInfo[0].userName,
				})
				.then((res) => {
					this.$toast("修改成功");
					this.getUserAsync();
				});
		},

		updateDesc() {
			this.$store
				.dispatch("updateDesc", {
					tokenString: this.tokenString,
					desc: this.accountInfo[0].desc,
				})
				.then((res) => {
					this.$toast(res.msg);
					this.$store.dispatch("findAccountInfo", {
						tokenString: this.tokenString,
					});
				});
		},
		getUserAsync(){
      getFunc("/user/my",{token:localStorage.getItem("token")})
      .then(
        res=>{
          this.accountInfo = res.result;
		//  图片加上默认路径
		 this.accountInfo.forEach(item=>{
			item.img = this.baseurl+item.img
        })
		}
      )
    },
	},
};
</script>

<style lang ="scss">
@import "../static/css/common.scss";
body{
    background-color: #f5f5f5;
}
#account {
	padding-top: 46px;
	.van-cell__value {
		flex: 1;
	}
	

	.account-bg {
		height: 100px;
		background-color:#f4ea2a;
	}

	.list-box {
		margin: -30px 10px 0;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		background-color: #fff;
		overflow: hidden;
		padding: 10px;
		.van-cell {
			padding: 0;
			padding-bottom: 10px;
			line-height: 40px;
		}

		.img-box {
			width: 40px;
			height: 40px;
			background-color: #f5f5f5;
			position: relative;
			overflow: hidden;
			border-radius: 50%;
			margin-left: auto;
				img{
					width: 100%;
					height: 100%;
				}
			.van-uploader {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				opacity: 0;
			}
		}

		.nikename {
			input {
				text-align: right;
				display: block;
				width: 100%;
				padding: 0;
				border: none;
				outline: none;
				color: #969799;
				font-size: 14px;
			}
		}
		.desc-title {
			font-size: 14px;
			line-height: 40px;
		}
		.text-area {
			display: block;
			width: 100%;
			padding: 0;
			border: none;
			outline: none;
			color: #969799;
			font-size: 14px;
			resize: none;
		}
	}
}
</style>