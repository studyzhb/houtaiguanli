define({
    preFix:'http://web.yylm.com/public/index.php/unionAdmin',
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
    },
    /**
     *标签 
     */
    label:{
        showLabelList:'/label/indexList',
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
        //更新标签类型
        /**
         * id:类型ID
         * type标签类型修改属性 1:产品,2:店铺,3:暂无
         * status标签类型状态
         */
        updateLabelType:'/label/updateLabelTypeStatus'
    }

});