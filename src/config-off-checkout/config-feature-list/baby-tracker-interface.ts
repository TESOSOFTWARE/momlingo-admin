// interface MomInfo {
//     id: number;
//     week: number;
//     thumbnail3DUrl: string;
//     image3DUrl: string;
//     symptoms: string;
//     thingsTodo: string;
//     thingsToAvoid: string;
//   }

//   interface BabyInfo {
//     id: number;
//     week: number;
//     weight: number;
//     high: number;
//     thumbnail3DUrl: string;
//     image3DUrl: string;
//     symbolicImageUrl: string;
//     sizeShortDescription: string;
//     babyOverallInfo: string;
//     babySizeInfo: string;
//   }

//   interface KeyTakeaway {
//     id: number;
//     week: number;
//     keyTakeaways: string;
//     createdAt: string;
//     updatedAt: string;
//     momInfo: MomInfo;
//     babyInfo: BabyInfo;
//   }
export interface PregnancyWeekInfo {
  id: string;
  week: number;
  keyTakeaways: string;
  createdAt: string;
  updatedAt: string;
  momInfo: {
    id: number;
    week: number;
    thumbnail3DUrl: string;
    image3DUrl: string;
    symptoms: string;
    thingsTodo: string;
    thingsToAvoid: string;
  };
  babyInfo: {
    id: number;
    week: number;
    weight: number;
    high: number;
    thumbnail3DUrl: string;
    image3DUrl: string;
    symbolicImageUrl: string;
    sizeShortDescription: string;
    babyOverallInfo: string;
    babySizeInfo: string;
  };
}
export interface UpdateBabyTrackerParams {
  week: string; // Tham số tuần
  data: {
    keyTakeaways: string | any;
    thumbnail3DMom: string | any;
    image3DUrlMom: string | any;
    symptoms: string | any;
    thingsTodo: string | any;
    thingsToAvoid: string | any;
    weight: number | any;
    high: number | any;
    thumbnail3DBaby: string | any;
    image3DUrlBaby: string | any;
    symbolicImage: string | any;
    sizeShortDescription: string | any;
    babyOverallInfo: string | any;
    babySizeInfo: string | any;
  };
}
