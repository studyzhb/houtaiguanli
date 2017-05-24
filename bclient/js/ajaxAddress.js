define({
    preFix:'/api/public/index.php/bfapp',
    obligationManagerPreFix:'/api/public/index.php/bweb',
    publicAddress:'/api/public/index.php/bweb',
    /**
     * 显示债权金信息
     */
    obligation:{
        showlist:'/Debt/debtList',
        showOneInfo:'/Debt/oneDebt',
        addInfo:'/Debt/addDebt',
        //展示债权金历史记录
        showObligationHisInfo:'/Debt/debtLog',
        obligationLineList:'/Lines/linesList',
        sendPreFer:'/Lines/Prefer'
    },
    shopObligation:{
        showHisList:'/Turnin/withList',
        obligationScore2Balance:'/Turnin/applyTurn',
        outputMoney:'/Turnin/withDraw',
        obligationBalance:'/Turnin/creditorIncome'
    },
    shopDetail:{
      shopInfo:'/Shopdetail/index',
      shopbalance:'/mypurse/index'
    }
});