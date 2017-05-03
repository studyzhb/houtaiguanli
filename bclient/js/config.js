function Dsy() {
    this.Items = {};
}
Dsy.prototype.add = function (id, iArray) {
    this.Items[id] = iArray;
}
Dsy.prototype.Exists = function (id) {
    if (typeof(this.Items[id]) == "undefined") return false;
    return true;
}



/**
 * cookie
 */
var cookieUtil={
    //天数
    setCookie:function(user,name){
        document.cookie=user+"="+name;
    },
    setExpiresDate:function(user,name,value){
        var da=new Date();
        var expiresDay=da.getDate()+value;
        da.setDate(expiresDay);
        document.cookie=user+"="+name+";expires="+da+";path=/";
    },
    getCookie:function(name) {
        if(document.cookie.length>0){
            var start=document.cookie.indexOf(name+"=");
            if(start!=-1){
                start=document.cookie.indexOf(name+"=")+name.length+1;
            }else{
                return '';
            }
            var end=document.cookie.indexOf(';',start)!=-1?document.cookie.indexOf(';',start):document.cookie.length;
            return document.cookie.substring(start,end);
        }
        return "";
    },
    removeCookie:function(name){
        this.setExpiresDate(name,1,-1);
    }
};


var config={
  //表单提交
  formSubmit:function(formId,urlhttp,fun){
    var tok=cookieUtil.getCookie('token');
    
    $(formId).ajaxSubmit({
      url:urlhttp,
      data:{
        token:tok
      },
      success:function(data){
        console.log(data);
        if(!!fun){
          fun(data);
        }  
      }
    });
  },
  accessKey:'5f843e288bb1cabb834b9d20eea3d8c0',
	ajaxAddress:{
    publicAddress:'/api/public/index.php/bweb',
    imgAddress:'',
    //判断session 是否失效
    checkSession:'/index/index',
    //获取手机短信验证码
    updateloginpass:'/login/code/',
    //设置支付密码
    updatePayPass:'/login/addpay/',
    //验证支付密码通过手机
    checkoutCodeBypayTel:'/login/lookcode/',
    //通过原密码更新密码
    updateLoginPassByOld:'/login/updatalogin/',
    //登录
    loginAdd:"/login/index/",
    //访问前权限验证
    validateAuthor:'/shop/shop/public/index.php/admin/Index/check',
    //退出登录
    quit:'/login/logout/',
    //获取验证码
    getValiCode:'/login/verify',
    //获取分类信息
    getTypeInfo:'/good/index',
    addMart:'/car/add',
    //显示购物车
    showShoppingList:'/car/show',
    //更新购物车
    updateShoppingList:'/car/update',
    //删除购物车
    deleteSingleGoods:'/car/delete',
    //生成订单
    createBorderList:'/Border/add',
    //平台支付
    payOrderList:'/pay/pingtai',
    //店铺进货单展示
    borderList:'/Border/index',
    //是否有新订单
    isNewOrder:'/corder/isNewCorder',
    //用户订单
    userOrderList:'/corder/index',
    //用户订单详情
    userOrderDetail:'/corder/ordershow',
    //打印小票或者完成订单
    printTrainOrder:'/corder/updateorderstatus',
    //店铺展示
    showShopGoods:'/shopgood/index',
    //上架
    addPutaway:'/shopgood/updatesale',
    //修改上架价格
    editgoodsprice:'/shopgood/updateprice',
    //专题管理
    specApi:{
      specManage:'/ShopSpecial/showspecial',
      specInfo:'/ShopSpecial/shoeSpecialGood',
      //更新专题图片地址
      updateSpecPic:'/Shopspecial/updataPecialShopPic',
      updateSpec:'/ShopSpecial/addShopSpecial',
      sortSpec:'/ShopSpecial/SetSpecialSort'
    },
    shopDetail:{
      shopInfo:'/Shopdetail/index',
      shopbalance:'/mypurse/index'
    },
    //一键同步
      store2shop:'/Aa/stroetoshop',
    //推送
    postmessage:'/shop/shop/public/index.php/admin/tui/tuisong',
    //验证供应商编号
    supplierNum:'/shop/shop/public/index.php/admin/Supplier/checkCoding',
    //验证商品的国际条形码barcode
    goodsI18Num:'/shop/shop/public/index.php/admin/Good/checkBarcode',
    //验证商品的一品多码decode
    goodsNum:'/shop/shop/public/index.php/admin/Good/checkDecode',
    //物品信息列表http://192.168.1.18/wp/public/index.php/admin/good/show
	goodsInfo:'/shop/shop/public/index.php/admin/Good/show',
    //添加物品信息
    addgoodsInfo:'/shop/shop/public/index.php/admin/Good/addGoods',
    //商品基本信息编辑更改
    goodsEditor:'/shop/shop/public/index.php/admin/Good/edit',
    //商品详情页添加
    goodsDetail:'/shop/shop/public/index.php/admin/Good/detail',
    goodsaddDetail:'/shop/shop/public/index.php/admin/Good/addDetail',
    //添加供货商地址
	addSupplier:'/shop/shop/public/index.php/admin/supplier/add',
    //更新单个供货商信息地址http://192.168.1.18/wp/public/index.php/admin/supplier/update
	updateSupplier:'/shop/shop/public/index.php/admin/Supplier/edit',
    //显示供货商列表信息http://192.168.1.18/wp/public/index.php/admin/supplier/show
    showSupplierList:'/shop/shop/public/index.php/admin/Supplier/lst',
    //商品分类添加
    addGoodsSort:'/shop/shop/public/index.php/admin/Category/add',
    //商品分类展示
    showGoodsSort:'/shop/shop/public/index.php/admin/Category/lst',
    //商品分类修改
    editGoodsSort:'/shop/shop/public/index.php/admin/Category/edit',
    //商品品牌
    showgoodsbrand:'/shop/shop/public/index.php/admin/Brand/lst',
    //商品品牌
    addgoodsbrand:'/shop/shop/public/index.php/admin/Brand/add',
    //添加商品品牌时，判断是否重复
    checkrepeatbrand:'/shop/shop/public/index.php/admin/Brand/check',
    //商品品牌
    editgoodsbrand:'/shop/shop/public/index.php/admin/Brand/edit',
    //搜索商品
    searchOrder:'/shop/shop/public/index.php/admin/purchase/getInfo',
    // 添加订单
    addOrderList:'/shop/shop/public/index.php/admin/purchase/add',
    //获取采购单列表
    getOrderList:'/shop/shop/public/index.php/admin/purchase/lst',
    //编辑采购单列表
    editOrderList:'/shop/shop/public/index.php/admin/purchase/edit',
    //编辑采购单列表
    checkOrderList:'/shop/shop/public/index.php/admin/purchase/check',
    //增加菜单
    addMenulist:'/shop/shop/public/index.php/admin/Privilege/add',
    //修改菜单
    editMenulist:'/shop/shop/public/index.php/admin/Privilege/edit',
    //删除菜单
    deleteMenulist:'/shop/shop/public/index.php/admin/Privilege/delete',
    //通过工号获取所拥有的权限列表
    getAuthorlist:'/shop/shop/public/index.php/admin/Index/index',
    //角色列表展示
    getUserRoleList:'/shop/shop/public/index.php/admin/Role/lst',
    //角色信息修改
    editorUserRole:'/shop/shop/public/index.php/admin/Role/edit',
    //添加角色
    addUserRole:'/shop/shop/public/index.php/admin/Role/add',
    //显示员工列表
    showUserInfo:'/shop/shop/public/index.php/admin/Admin/lst',
    //添加员工
    addUserInfo:'/shop/shop/public/index.php/admin/Admin/add',
    //员工编辑
    editUserInfo:'/shop/shop/public/index.php/admin/Admin/edit',
    //组织机构
    showAdminOrigin:'/shop/shop/public/index.php/admin/Dept/lst',
    //添加组织机构
    addAdminOrigin:'/shop/shop/public/index.php/admin/Dept/add',
    //修改
    editAdminOrigin:'/shop/shop/public/index.php/admin/Dept/edit',
    //删除
    deleteAdminOrigin:'/shop/shop/public/index.php/admin/Dept/delete',
    //店铺列表
    shopList:'/shop/shop/public/index.php/admin/Shop/lst',
    //店铺区域绑定
    getShopStock:'/shop/shop/public/index.php/admin/Shop/getInfo',
    //店铺添加
    addshopList:'/shop/shop/public/index.php/admin/Shop/add',
    //店铺修改
    editshopList:'/shop/shop/public/index.php/admin/Shop/edit',
    showshopUser:'/shop/shop/public/index.php/admin/Shop/bLst',
     addshopUser:'/shop/shop/public/index.php/admin/Shop/bAdd',
      editshopUser:'/shop/shop/public/index.php/admin/Shop/bEdit',
      goodsInput:'/shop/shop/public/index.php/admin/Store/storeInput',
      //核实数量
      changeInput:'/shop/shop/public/index.php/admin/Store/editInput',
      //修改入库
      editInput:'/shop/shop/public/index.php/admin/Store/check',
      //店铺充值
      shopprice:'/shop/shop/public/index.php/admin/Shop/addMoney',
      //店铺流水信息
      shophis:'/shop/shop/public/index.php/admin/Shop/llst',
      //身份证查重
      idcardcheck:'/shop/shop/public/index.php/admin/Shop/bCheck',
      //出库单列表
      outputList:'/shop/shop/public/index.php/admin/Store/lst',
      //单个单号的出库商品详情信息
      outputSingleDetail:'/shop/shop/public/index.php/admin/Store/chakan',
      //状态改变
    outputSingleStatus:'/shop/shop/public/index.php/admin/Store/status',
      //配送
      sendingStorelist:'/shop/shop/public/index.php/admin/Store/peisong',
      //拒绝
      refuseStorelist:'/shop/shop/public/index.php/admin/Store/jujue',


	},
  pSort:{
    pagecount:10
  },
    
    formatTemplate:function(dta, tmpl) {  
        var b;
        var format = { 
            price: function(x) {  
                // console.log(typeof x,this.discount);
                return (x*b).toFixed(2); 
            },
            discount:function(a){
                b=a==0?1:a*0.1;
                return b;
            }
        };  
        return tmpl.replace(/{(\w+)}/g, function(m1, m2) {  
            if (!m2)  
                return "";  
            return (format && format[m2]) ? format[m2](dta[m2]) : dta[m2];  
        });  
    },
    /**
     * 
     * @param {String} method 请求方法
     * @param {String} url 请求地址
     * @param {Function} fun 回调函数
     * @param {Object} data	请求参数
     */
    ajax:function(method,url,fun,data){
    	// console.log(url);
        data=data||{};
        data.token=cookieUtil.getCookie('token');
        url+="?v="+new Date().getTime();
    	$.ajax({
    		type:method,
		   	url:url,
		   	data:data||{date:new Date().getTime()},
		   	success: function(msg){
              msg=typeof msg==='object'?msg:JSON.parse(msg);
              if(msg.code&&msg.code=='401'){
                  /*layui.use('layer',function(){
                    var layer=layui.layer;
                    layer.closeAll('iframe');
                  var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                  parent.layer.close(index);
                  location.href='http://web.wandlm.com/bclient';
                      parent.window.frames['iframeId']
                  })*/
                // $(parent.document).find('iframe').remove();
                // open('login.html','_self');
                top.location.href="/login.html";
              }else if(msg.code&&msg.code=='402'){
                  top.location.href="/login.html";
              }
              else{
                 if(fun){
                  fun(msg);
                  } 
              }   		 	
		   },
       error:function(e){
         console.log(JSON.stringify(e));
        
            }
        })
		

    },
    uploadImage:function(inputId,imgId) {
        var docObj=document.getElementById(inputId);
        var imgObjPreview=document.getElementById(imgId);
                if(docObj.files &&docObj.files[0]){
                        //火狐下，直接设img属性
                        imgObjPreview.style.display = 'block';
                        imgObjPreview.style.width = '200px';
                        imgObjPreview.style.height = '120px';                    
                        //imgObjPreview.src = docObj.files[0].getAsDataURL();

      //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式  
      imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);

                }else{
                        //IE下，使用滤镜
                        docObj.select();
                        var imgSrc = document.selection.createRange().text;
                        var localImagId = document.getElementById("localImag");
                        //必须设置初始大小
                        localImagId.style.width = "300px";
                        localImagId.style.height = "120px";
                        //图片异常的捕捉，防止用户修改后缀来伪造图片
                      try{
                          localImagId.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                          localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
                        }catch(e){
                          alert("您上传的图片格式不正确，请重新选择!");
                          return false;
                        }
                        imgObjPreview.style.display = 'none';
                        document.selection.empty();
                }
                return true;
        }

   
}









