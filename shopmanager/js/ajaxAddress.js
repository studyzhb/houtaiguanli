define({
    preFix:'http://web.yylm.com/public/index.php/unionShop',
    shop:{
        shopInfo:'/index/index',
        goodslist:'/index/getGoodsList', 
        bankCardList:'/shopbank/bankCarList',
        addBankCard:'/shopbank/addBankCar',
    },
    shopOrder:{
        orderlist:'/order/indexList',
        verifyOrderCode:'/order/sellGoodsCheck',
        //订单校验成功后改变状态
        orderStatus:'/order/goodsChangeStatus',
        //商户账户资金展示
        orderAccount:'/shopbank/getAccount',
        //提现记录展示
        showOutPay:'/shopbank/withdList',
        //申请提现 
        applyMoney:'/shopbank/getMoney'
    }

});