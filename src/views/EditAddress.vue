<template>
  <div id="editAddress">
    <van-nav-bar
      fixed
      title="编辑地址"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <div class="form-box">
      <van-form>
				<van-address-edit :area-list="areaList" show-postal show-set-default :tel-validator="telValidate" show-delete
					:postal-validator="postValidate" :area-columns-placeholder="['选择县', '选择市', '选择区/县']" :address-info="address"
					@save="onSave" @delete="deleteAddress" />

			</van-form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { areaList } from '@vant/area-data';
export default {
  name: "EddAddress",
  data() {
    return {
      username: "",
      phone: "",
      phonePattern:
        /^[1](([3][0-9])|([4][0,1,4-9])|([5][0-3,5-9])|([6][2,5,6,7])|([7][0-8])|([8][0-9])|([9][0-3,5-9]))[0-9]{8}$/,
      addressDetail: "",
      postcode: "",
      postPattern: /^[0-9]\d{5}$/,
      showArea: false,
      areaList,
      address: {},
      token:"",
    };
  },
  mounted() {
    this.token = localStorage.getItem("token");
    this.$store
    	.dispatch("findAddressByAid", {
    		token: this.token,
    		id: this.$route.query.id,
    	})
    	.then((res) => {
    		if (res.code == 200) {
    			this.address = res.result[0];
    			if (this.address.isDefault == 1) {
    				this.address.isDefault = true;
    			} else {
    				this.address.isDefault = false;
    			}
    		}
    	});
  },
  computed: {
  	...mapState({
  		// token: (state) => state.user.token,
      address1: (state) => state.addAddress.editAddress,
  	}),
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onSave(v) {
      v.token = this.token;
      if (v.postalCode == "") {
        this.$toast("邮政编码不正确");
      } else {
        v.isDefault = v.isDefault ? 1 : 0;
        this.$store.dispatch("editAddress", v).then((res) => {
          if (res.code == 200) {
            this.$toast(res.msg);
            this.$router.back();
          } else {
            this.$toast(res.msg);
          }
        });
      }
    },
    onConfirm(values) {
      if (values[2] == undefined || values[2].code == "") {
        return this.$toast("请选择地区");
      }
      this.value = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join("/");
      this.showArea = false;
    },
    telValidate(v) {
      if (this.phonePattern.test(v)) {
        return true;
      } else {
        return false;
      }
    },
    postValidate(v) {
      if (this.postPattern.test(v)) {
        return true;
      } else {
        return false;
      }
    },

    deleteAddress(v) {
      v.token = this.token;
      this.$store.dispatch("deleteAddress",v).then((res) => {
        this.$toast(res.msg);
        this.$router.back();
      });
    },
  },
};
</script>

<style lang ="scss">
@import "../static/css/common.scss";
#editAddress {
	.van-cell{
		padding:10px;
	}
  padding-top: 46px;
  .van-nav-bar__text {
    color: $bgColor;
  }

  .van-button--danger {
    background-color: $bgColor;
    border-color: $bgColor;
  }
}
</style>