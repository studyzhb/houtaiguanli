define({
    preFix:'/shop/shop/public/index.php/admin',
    obligationPreFix:'/shop/shop/public/index.php/bfapp',
    obligationOutPreFix:'/shop/shop/public/index.php/admin',
    obligationSplit:{
        showlist:'/Debt/debtList',
        addInfo:'/Debt/addDebt',
        showOneInfo:'/Debt/oneDebt',
        getIsSaveShopGoods:'/relevance/deliveryPoint',
        editShopid:'/Debt/editDebt'
    },
    hideRegister:{
        sendPhoneCode:'/Assistregis/getPhoneCode',
        getPicCode:'/Assistregis/getCode',
        register:'/Assistregis/index'
    },
    viplist:{
        showlist:'/User/userList',
        inputMoney:'/User/recharge',
        updatePayPassword:'/Paypassword/suycPassword',
        lookVipHisInfo:'/User/userCash',
        editRealName:'/Vip/update'
    },
    platForm:{
        showlist:'/Paylog/payList',
        //平台支出总数汇总
        outputlist:'/WidthdrawReport/report',
        //资金统计
        outAndInputTotalMoney:'/Flowing/getDayInfo',
        //店铺出入单相关统计总表
        shopOutAndInputTotal:'/Report/allReport',
        //出入单统计总表
        outAndInputPersonTotal:'/Report/Report',
        //分店铺统计
        everyShopInfo:'/Report/linesIn'
    },
    discount:{
        showlist:'/Coupon/show',
        addType:'/Coupon/addHnus',
        updateType:'/Coupon/editHnus',
        createNumber:'/Coupon/createUnmber',
        lookDiscountInfo:'/Userbonus/show'
    },
    obligation:{
        showlist:'/debtnexus/index',
        check2debtCode:'/Debtnexus/cheackDebtCode',
        update:'/debtnexus/edit',
        typeshow:'/Proportion/show',
        typeAdd:'/Proportion/add',
        updateType:'/Proportion/edit',
        updateListByTypeId:'/proportion/showgood',
        searchFilterGoods:'/proportion/searchgood',
        addObligationGoods:'/proportion/editStandard',
        deleteObligationGoods:'/proportion/delgoodtandard',
        classifyList:'/Goodsclass/classList',
        addClass:'/Goodsclass/addClass',
        updateClass:'/Goodsclass/upClass',
        getOneClass:'/Goodsclass/oneClass',
        updateStatusType:'/Goodsclass/onOff',
        goods:{
            showlist:'/goods/goodsList',
            getOneInfo:'/goods/oneGoods',
            addGoods:'/goods/addGoods',
            updateGoods:'/goods/upGoods',
            copyGoods:'/goods/copyGoods',
            upordownGoods:'/goods/onOff',
            lookInfoCopyed:'/goods/beforeId',
            searchFilterGoods:'/relevance/goodsList'
        },
        goodsBag:{
            showlist:'/package/packList',
            getOneInfo:'/package/onePack',
            addGoodsBag:'/package/addPack',
            updateBagInfo:'/package/upPack',
            updateStatus:'/package/onOff',
            lookGoodsInBag:'/package/packGoods',
            deleteObligationGoods:'/package/delGood',
            searchFilterGoods:'/goods/goodsList'
        },
        queueMode:{
            showlist:'/Queue/queueList',
            addNewMode:'/Queue/addQueue',
            getOneInfo:'/Queue/oneQueue',
            updateMode:'/Queue/upQueue',
            updateStatus:'/Queue/onOff'
        },
        queueList:{
            showlist:'/Lines/linesList',
            readyGoods:'/Lines/Stocking',
            finishedGoods:'/Lines/okStock',
            leaveUser:'/Lines/tiRen',
            sortList:'/Lines/positionChange',
            sortInputList:'/Lines/chSort',
            getDiscountType:'/Bonus/bonusList'
        },
        currencyMoney:{
            showlist:'/debtreview/listdebt',
            lookOneUserList:'/debtreview/listdebtdes',
            oneUserGoodsList:'/debtreview/debegoodlist',
            finishedMoney:'/debtreview/review'
        },
        exportdayExcel:'/debtreview/downdebt',
        exportUserExcel:'/debtreview/downgood',
        convertScore:'/Exchange/exList',
        updateConvertScore:'/Exchange/exOk',
        output:{
            showlist:'/Userbalanceh/withdrawList',
            updateStatus:'/Userbalanceh/withdrawCheck',
            getOneInfo:'/Userbalanceh/withdrawDetail',
            finishedOk:'/Userbalanceh/withdrawOk',
            finishFalse:'/Userbalanceh/withdrawFalse'
        },
        backGoods:{
            showlist:'/Buyback/backList',
            updateStatus:'/Buyback/checkBack'
        }
    },
    article:{
        showlist:'/Article/lst',
        addSingle:'/Article/add',
        updateSingle:'/Article/update',
        changeStatus:'/Article/beginStopUse'
    },
    distributeShare:{
        sharelist:'/share/show',
        updateShareInfo:'/share/editShare',
        disShareList:'/sharesub/show',
        updateDisShareInfo:'/sharesub/editSubShare'
    }
});