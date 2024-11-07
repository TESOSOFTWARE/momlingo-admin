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
