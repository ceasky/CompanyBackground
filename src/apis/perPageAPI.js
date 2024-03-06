import { apiHelper } from "./../utils/helpers";

//CRUD post get put delete
export default {
  //get
  getPageData({ data1, data2 }) {
    const searchParams = new URLSearchParams({ data1, data2 });
    return apiHelper.get(`/sample?${searchParams.toString()}`);
  },
  //delete
  deleteOneItem({ data1 }) {
    return apiHelper.delete(`/delete/${data1}`);
  },
  //post
  createOneItem({ data1 }) {
    return apiHelper.post(`/create/${data1}`, null);
  },
  //上傳file的post
  sentFileAPI({ formData }) {
    return apiHelper.post("/createfile", formData);
  },
  //上傳file修改 put
  sentFileUpdateAPI({ id, formData }) {
    return apiHelper.put(`/editfile/${id}`, formData);
  },
};
