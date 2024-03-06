<template>
  <div></div>
</template>
<script>
import perPageAPI from "../apis/perPageAPI";
import { Toast } from "./../utils/helpers";

export default {
  data() {
    return {
      item1: "",
      item2: "",
      id:"",
    };
  },
  methods: {
    //get
    async getPageData({ input1, input2 }) {
      try {
        const response = await perPageAPI.getPageData({
          data1: input1,
          data2: input2,
        });

        if (response.status === "error") {
          throw new Error(response.message);
        }

        this.item1 = response.item1;
        this.item2 = response.item2;
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取得資料，請稍後再試",
        });
      }
    },
    //create post
    async createOneItem(data1) {
      try {
        const { data } = await perPageAPI.createOneItem({ data1 });
        if (data.status === "error") {
          throw new Error(data.message);
        }
        console.log("createOneItem");
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法將餐廳加入最愛，請稍後再試",
        });
        console.log("error", error);
      }
    },
    //create includes file post
    async sentFileAPI(e) {
      try {
        const form = e.target;
        //傳送含file的檔案
        const formData = new FormData(form);

        const { data } = await perPageAPI.sentFileAPI({
          formData,
        });

        if (data.status === "error") {
          throw new Error(data.message);
        }

      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法建立餐廳，請稍後再試",
        });
      }
    },
    //edit put
    async sentFileUpdateAPI(e) {
      try {
        const form = e.target;
        //傳送含file的檔案
        const formData = new FormData(form);

        const { data } = await perPageAPI.sentFileUpdateAPI({
          id:this.id,
          formData,
        });

        if (data.status === "error") {
          throw new Error(data.message);
        }

      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法建立餐廳，請稍後再試",
        });
      }
    },
  },
  created() {
    //從url取得數值的方式
    //query
    const { data1 = "", data2 = "" } = this.$route.query;
    this.getPageData({ input1: data1, input2: data2 });
    //params
    const { id } = this.$route.params
    this.getPageData2(id)
  },
  beforeRouteUpdate(to, from, next) {
    //同畫面 不重新讀取觸發created的情況下 url改變 重新呼叫api取得資料
    //query
    const { data1 = "", data2 = "" } = to.query;
    this.getPageData({ input1: data1, input2: data2 });
    //params
    const { id } = to.params
    this.getPageData2(id)

    next()
  },
};
</script>