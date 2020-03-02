const hostUrl = 'http://testing.mumway.com';
export default {
    title: '月嫂见面会',
    imgDir: '//static.mumway.com/lp/meeting/',
    hostUrl: hostUrl,
    getListUrl: `${hostUrl}/api/yuesaomeetaunt/getauntbymeetid`,
    getOnlineTimeUrl: `${hostUrl}/api/Yuesaomeetaunt/getServersTime`,
    saveLikeAuntUrl: `${hostUrl}/crm/master/saveIntentionHouseworker`,
    saveMasterUrl: `${hostUrl}/crm/Bafe/saveMasterInfo`,
    getUrl: `${hostUrl}/admin/sapi/getIntentionHouseworker`,
    getCityList: `${hostUrl}/index/activity/cityList`
};