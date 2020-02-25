import config from '@/utils/config';
var myMixin = {
    methods: {
        getImgPath(imgName) {
            return config.imgDir + imgName;
        }
    }
};

export default myMixin;
