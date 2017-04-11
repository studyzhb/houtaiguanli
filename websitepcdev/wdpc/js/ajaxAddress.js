var ajaxAddress={
    preFix:'http://192.168.1.20/yylm/public/index.php/unionIndex',
    formFix:'',
    area:{
        areaData:'/condition/getArea'
    },
    Classify:{
        Classifydata:'/condition/getClassify'
    },
    user:{
        getPicCode:'/login/getcode',
        getLoginMessCode:'/login/code',
        login:'/login/login',
        resetLoginInfo:'/login/foundBack',
        //
        getRegisterMessCode:'/register/code',
        register:'/register/register'
    },
    list:{
        shoplist:'/lists/shop',
        goodslist:'/lists/goods',
        benefit:'/lists/Benefit'
    },
    detail:{
        goodsDetail:'/goods/GoodsDetail',
        shopDetail:'/goods/shopDetail',
        hotSale:'/goods/hotSale'
    },
    discount:{
        bendfit:'/benefit/BenefitDetail',
    },
    label:{
        labelAll:'/comment/LabelAll'
    },
    Banner:{
        banner:'/index/getBanner'
    },

    nav:{
        showPrimaryNav:'/index/getNav',
    },

    updataContent:{
        hotContent:'/index/getRecommendShop',
        goods:'/index/getRecommendGoods '
    },
}