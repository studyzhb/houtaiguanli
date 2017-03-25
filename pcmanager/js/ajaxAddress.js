define({
    preFix:'http://www.yylm.com/public/index.php/unionAdmin',
    /**
     * 导航模块
     */
    nav:{
        getPrimaryNav:'/nav/navPrimary',
        showNavlist:'/Nav/navList',
        addNavInfo:'/Nav/addNav',
        updateNav:'/Nav/updateNav',
        deleteNav:'/Nav/deleteNav',
        //根据id获取导航信息(get)
        getSingleNavInfoById:'/Nav/navInfo',
        sortNavlist:'/Nav/navorder',
        /**
         * 导航分类类型
         */
        navclassifyInfo:'/Classify_type/classifyTypeLst',
        addnavclassifyInfo:'/Classify_type/addClassifyType',
        updatenavclassify:'/Classify_type/updateClassify',
        getClassifyById:'/Classify_type/classifyTypeInfo',
        deletenavclassify:'/Classify_type/deleteClassify',
        classifyDetail:''
    },
    /**
     *标签 
     */
    label:{
        showLabelList:'/label/indexList',
        showLabelTypeList:'/label/labelTypeList',
        //添加标签类型
        addLabelType:'/label/addLabelType',
        //添加指定标签类型下的内容
        addLabelConByType:'/label/addLabel',
        // 获取指定便签类型下的标签数据
        getLabelInfoByTypeId:'/label/labelTypeInfo',
        //标签内容的编辑
        editLabelInfo:'/label/labelInfo',
        //标签类型的编辑
        editLabelType:'/label/deleteLabelType',
        updateLabelCon:'/label/updateLabel',
        //更新标签类型
        /**
         * id:类型ID
         * type标签类型修改属性 1:产品,2:店铺,3:暂无
         * status标签类型状态
         */
        updateLabelType:'/label/updateLabelType',
        //获取id
        getLabelListByNavId:'/shop/getNavLabelTypeInfo',
        deleteLabelInfo:'/label/deleteLabel',
        getIconList:'/label/getLabelIco',
        updateLabelTypeStatus:'/label/updateLabelTypeStatus',
        deleteLabelType:'/label/deleteLabelType'
    },
    /**
     * 商品信息
     */
    shopGoods:{
        showlist:'/goods/indexList',
        addShopGoods:'/goods/addGoods',
        getGoodsById:'/goods/getOneInfo',
        editShopGoodsById:'/goods/updateGoods',
        recommendList:'/goods/upReGoods',
        addRecommend:'/goods/upReGoods',
        updateShopGoodsStatus:'/goods/updateGoodsStatus',
        deleteShopGoodsInfo:'/goods/deleteGoods'
    },
    /**
     * 店铺
     */
    shop:{
        shoplist:'/shop/indexList',
        addShopList:'/shop/addShop',
        updateShop:'/shop/updateShop',
        getShopInfoById:'/shop/getOneInfo',
        //店铺推荐列表
        recommendList:'/shop/getReShop',
        addRecommend:'/shop/upReShop',
        updateShopStatus:'/shop/updateShopStatus',

    },
    /**
     * 城市
     */
    city:{
        citylist:'/City/cityList',
        addCityList:'/City/addCity',
        editCityList:'/City/updateCity',
        updateCityStatus:'/City/updateCityStatus',
        deleteCity:'/City/deleteCity'
    },
    /**
     * 区域
     */
    area:{
        //区域列表updateAreaType
        
        arealist:'/Area/areaList',
        //获取区域类型
        getAreaType:'/Area/AreaTypeList',
        //获取单个区域类型
        getSingleAreaTypeInfo:'/Area/getOneAreaType',
        getSingleAreaInfo:'',
        addArea:'/Area/addAreaType',
        addAreaInfo:'/Area/addArea',
        //区域添加
        updateAreaInfo:'/Area/areaInfo',
        updateAreaSingleInfo:'/Area/updateArea',
        //区域类型更新
        updateAreaType:'/Area/updateAreaType',
        //根据城市ID获取区域
        getAreaByCityId:'/Area/getArea',
        updateStatusType:'/Area/updateAreaTypeStatus',
        updateAreaStateInfo:'/Area/updateAreaStatus',
        deleteAreaInfo:'/Area/deleteArea',
        getAreaTypeList:'/shop/getAreaTypeInfo'
    },
    /**
     * 分类
     */
    classify:{
        showlist:'/Classify/classifyList',
        getClassType:'/Classify/getOneClassifyTypeInfo',
        getClassInfo:'/Classify/getOneclassifyInfo',
        addClass:'/Classify/addClassifyType',
        addClassInfo:'/Classify/addClassify',
        updateClassType:'/Classify/updateClassifyType',
        updateClssInfo:'/Classify/updateClassify',
        updateRecommend:'/Nav/getRecommend',
        commitRecommend:'/Nav/updateRecommend',
        updateStatusType:'/Classify/updateClassifyTypeStatus',
        updateStatusInfoType:'/Classify/updateClassifyStatus',
        deleteClassInfo:'/Classify/deleteClassify'
    },
    /**
     * 优惠信息
     */
    discount:{
        showlist:'/benefit/indexList',
        showSingleInfo:'/benefit/oneBenefitInfo',
        addInfo:'/benefit/addBenefit',
        updateInfo:'/benefit/updateBenefit',
        deleteInfo:'/benefit/deleteBenefit',
        sortBenefit:'/benefit/positionChange',
        updateDiscountStatus:'/benefit/updateBenefitStatus',
        deleteDiscountInfo:'/benefit/deleteBenefit',
        sortDiscount:'/benefit/positionChange'
    },
    /**
     * banner图管理
     */
    banner:{
        showlist:'/banner/bannerList',
        //获取单个banner图信息
        getOneInfo:'/banner/getOneBanner',
        //添加banner图信息
        addBanner:'/banner/addBanner',
        //更新banner图信息
        updateBannerInfo:'/banner/updateBanner',
        sortBanner:'/banner/positionChange',
        //删除
        deleteBanner:'/banner/deleteBanner',
        updateBannerStatus:'/banner/updateBannerStatus'
    }


});