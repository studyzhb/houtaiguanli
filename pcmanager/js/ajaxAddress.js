define({
    preFix:'http://192.168.1.20/yylm/public/index.php/unionAdmin',
    /**
     * 导航模块
     */
    nav:{
        showNavlist:'/Nav/navLst',
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
    }

});