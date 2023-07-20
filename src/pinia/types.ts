export interface UserStoreType {
  userId: string;
  imToken: string;
  token: string;
  tokenHeader: string;
  userDetail: any;
  userSelectedArea: any;
}

export interface CveCompanyType {
  hrId: string;
  companyAbbreviation: string;
  companyLogo: string;
  companyName: string;
  companyScaleName: string;
  jobAreaName: string;
  jobName: string;
  jobSalaryMin: number;
  jobSalaryMax: number;
  jobStatus: number;
}

export interface CveStoreType {
  cves: {
    latestMsg: any;
    latestMsgSendTime: any;
    companyAbbreviation: '';
    companyIndustryCode: '';
    companyIndustryName: '';
    companyLogo: '';
    companyLogoPreviewLogo: '';
    companyName: '';
    companyScaleCode: '';
    companyScaleName: '';
    hrId: string;
    hrMobile: string;
    interViewConfirmFlag: true;
    jobAreaCode: '';
    jobAreaName: '';
    jobName: '';
    jobSalaryMax: 0;
    jobSalaryMin: 0;
    jobStatus: 0;
    lastChatContent: string;
    lastChatContentType: number;
    lastChatTime: '';
    conversationID: string;
    unreadCount: number;
    jobId: number | string;
  }[];
  unReadCount: number;
  curCveIndex: number;
}

export interface AppStoreType {}
