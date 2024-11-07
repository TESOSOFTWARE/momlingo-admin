import axios, { AxiosStatic } from 'axios';
// import { Thumbnail } from "../interfaces/common.interfaces";
import { API_PRESIGN_URL } from '../constants/apis';
import axiosInstance from 'src/common/utils/axios';

export async function presignUrl(file: any, axiosInstant?: AxiosStatic) {
  if (file) {
    const imgType = file?.name?.split('.').pop() || 'png' || 'xlsx';
    const imgName = file?.name;
    try {
      const presignHeaderInfo: any = await axiosInstance.post(API_PRESIGN_URL, {
        type: imgType,
        fileName: imgName,
      });
      const urlPostImng = presignHeaderInfo?.presigned?.url;
      const headerFileds = presignHeaderInfo?.presigned?.fields || {};
      const id = presignHeaderInfo?.file?.id;
      const formData = new FormData();
      Object.keys(headerFileds).forEach((header) =>
        formData.append(header, headerFileds[header])
      );
      formData.append('file', file);
      await (axiosInstant || axios).post(urlPostImng, formData);
      const fileUrl = presignHeaderInfo?.presigned?.url + presignHeaderInfo?.file.key;
      return { ...presignHeaderInfo?.file, url: fileUrl, id };
    } catch (error) {
      console.log(error);
      return Promise.reject({});
    }
  }
  return Promise.resolve({});
}
