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
      updateSpec:'/ShopSpecial/addShopSpecial',
      sortSpec:'/ShopSpecial/SetSpecialSort'
    },
    shopDetail:{
      shopInfo:'/Shopdetail/index',
      shopbalance:'/mypurse/index'
    },
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
      refuseStorelist:'/shop/shop/public/index.php/admin/Store/jujue'

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
                $(parent.document).find('iframe').remove();
                open('login.html','_self');
              }else if(msg.code&&msg.code=='402'){
                  open('login.html','_self');
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
		
		// var test='{"data":[{"id": 2,"coding": "234561","name": "可口可乐","barcode": "1215456131311","jname": "可口可乐","typename": "饮用水","eachsale": "瓶","brandname": "拉芳","suppliername": "供货商七"}]}'
	
		//fun(test);
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
        },
    area_num:{
  "root": {
    "province": [
      {
        "-Id": "110000",
        "-Name": "北京市",
        "city": [{
          "-Id": "110000",
          "-Name": "北京市",
          "district": [
            {
              "-Id": "110100",
              "-Name": "东城区"
            },
            {
              "-Id": "110200",
              "-Name": "西城区"
            },
            {
              "-Id": "110500",
              "-Name": "朝阳区"
            },
            {
              "-Id": "110600",
              "-Name": "丰台区"
            },
            {
              "-Id": "110700",
              "-Name": "石景山区"
            },
            {
              "-Id": "110800",
              "-Name": "海淀区"
            },
            {
              "-Id": "110900",
              "-Name": "门头沟区"
            },
            {
              "-Id": "111100",
              "-Name": "房山区"
            },
            {
              "-Id": "111200",
              "-Name": "通州区"
            },
            {
              "-Id": "111300",
              "-Name": "顺义区"
            },
            {
              "-Id": "111400",
              "-Name": "昌平区"
            },
            {
              "-Id": "111500",
              "-Name": "大兴区"
            },
            {
              "-Id": "111600",
              "-Name": "怀柔区"
            },
            {
              "-Id": "111700",
              "-Name": "平谷区"
            },
            {
              "-Id": "112800",
              "-Name": "密云县"
            },
            {
              "-Id": "112900",
              "-Name": "延庆县"
            }
          ]
        }]
      },
      {
        "-Id": "120000",
        "-Name": "天津市",
        "city": [{
          "-Id": "120000",
          "-Name": "天津市",
          "district": [
            {
              "-Id": "120100",
              "-Name": "和平区"
            },
            {
              "-Id": "120200",
              "-Name": "河东区"
            },
            {
              "-Id": "120300",
              "-Name": "河西区"
            },
            {
              "-Id": "120400",
              "-Name": "南开区"
            },
            {
              "-Id": "120500",
              "-Name": "河北区"
            },
            {
              "-Id": "120600",
              "-Name": "红桥区"
            },
            {
              "-Id": "120900",
              "-Name": "滨海新区"
            },
            {
              "-Id": "121000",
              "-Name": "东丽区"
            },
            {
              "-Id": "121100",
              "-Name": "西青区"
            },
            {
              "-Id": "121200",
              "-Name": "津南区"
            },
            {
              "-Id": "121300",
              "-Name": "北辰区"
            },
            {
              "-Id": "121400",
              "-Name": "武清区"
            },
            {
              "-Id": "121500",
              "-Name": "宝坻区"
            },
            {
              "-Id": "122100",
              "-Name": "宁河县"
            },
            {
              "-Id": "122300",
              "-Name": "静海县"
            },
            {
              "-Id": "122500",
              "-Name": "蓟县"
            }
          ]
        }]
      },
      {
        "-Id": "130000",
        "-Name": "河北省",
        "city": [
          {
            "-Id": "130100",
            "-Name": "石家庄市",
            "district": [
              {
                "-Id": "130101",
                "-Name": "市辖区"
              },
              {
                "-Id": "130121",
                "-Name": "井陉县"
              },
              {
                "-Id": "130123",
                "-Name": "正定县"
              },
              {
                "-Id": "130124",
                "-Name": "栾城县"
              },
              {
                "-Id": "130125",
                "-Name": "行唐县"
              },
              {
                "-Id": "130126",
                "-Name": "灵寿县"
              },
              {
                "-Id": "130127",
                "-Name": "高邑县"
              },
              {
                "-Id": "130128",
                "-Name": "深泽县"
              },
              {
                "-Id": "130129",
                "-Name": "赞皇县"
              },
              {
                "-Id": "130130",
                "-Name": "无极县"
              },
              {
                "-Id": "130131",
                "-Name": "平山县"
              },
              {
                "-Id": "130132",
                "-Name": "元氏县"
              },
              {
                "-Id": "130133",
                "-Name": "赵县"
              },
              {
                "-Id": "130181",
                "-Name": "辛集市"
              },
              {
                "-Id": "130182",
                "-Name": "藁城市"
              },
              {
                "-Id": "130183",
                "-Name": "晋州市"
              },
              {
                "-Id": "130184",
                "-Name": "新乐市"
              },
              {
                "-Id": "130185",
                "-Name": "鹿泉市"
              }
            ]
          },
          {
            "-Id": "130200",
            "-Name": "唐山市",
            "district": [
              {
                "-Id": "130201",
                "-Name": "市辖区"
              },
              {
                "-Id": "130223",
                "-Name": "滦县"
              },
              {
                "-Id": "130224",
                "-Name": "滦南县"
              },
              {
                "-Id": "130225",
                "-Name": "乐亭县"
              },
              {
                "-Id": "130227",
                "-Name": "迁西县"
              },
              {
                "-Id": "130229",
                "-Name": "玉田县"
              },
              {
                "-Id": "130230",
                "-Name": "唐海县"
              },
              {
                "-Id": "130281",
                "-Name": "遵化市"
              },
              {
                "-Id": "130283",
                "-Name": "迁安市"
              }
            ]
          },
          {
            "-Id": "130300",
            "-Name": "秦皇岛市",
            "district": [
              {
                "-Id": "130301",
                "-Name": "海港区"
              },
              {
                "-Id": "130303",
                "-Name": "山海关区"
              },
              {
                "-Id": "130304",
                "-Name": "北戴河区"
              },
              {
                "-Id": "130321",
                "-Name": "青龙满族自治县"
              },
              {
                "-Id": "130322",
                "-Name": "昌黎县"
              },
              {
                "-Id": "130323",
                "-Name": "抚宁县"
              },
              {
                "-Id": "130324",
                "-Name": "卢龙县"
              }
            ]
          },
          {
            "-Id": "130400",
            "-Name": "邯郸市",
            "district": [
              {
                "-Id": "130401",
                "-Name": "市辖区"
              },
              {
                "-Id": "130421",
                "-Name": "邯郸县"
              },
              {
                "-Id": "130423",
                "-Name": "临漳县"
              },
              {
                "-Id": "130424",
                "-Name": "成安县"
              },
              {
                "-Id": "130425",
                "-Name": "大名县"
              },
              {
                "-Id": "130426",
                "-Name": "涉县"
              },
              {
                "-Id": "130427",
                "-Name": "磁县"
              },
              {
                "-Id": "130428",
                "-Name": "肥乡县"
              },
              {
                "-Id": "130429",
                "-Name": "永年县"
              },
              {
                "-Id": "130430",
                "-Name": "邱县"
              },
              {
                "-Id": "130431",
                "-Name": "鸡泽县"
              },
              {
                "-Id": "130432",
                "-Name": "广平县"
              },
              {
                "-Id": "130433",
                "-Name": "馆陶县"
              },
              {
                "-Id": "130434",
                "-Name": "魏县"
              },
              {
                "-Id": "130435",
                "-Name": "曲周县"
              },
              {
                "-Id": "130481",
                "-Name": "武安市"
              }
            ]
          },
          {
            "-Id": "130500",
            "-Name": "邢台市",
            "district": [
              {
                "-Id": "130501",
                "-Name": "市辖区"
              },
              {
                "-Id": "130521",
                "-Name": "邢台县"
              },
              {
                "-Id": "130522",
                "-Name": "临城县"
              },
              {
                "-Id": "130523",
                "-Name": "内丘县"
              },
              {
                "-Id": "130524",
                "-Name": "柏乡县"
              },
              {
                "-Id": "130525",
                "-Name": "隆尧县"
              },
              {
                "-Id": "130526",
                "-Name": "任县"
              },
              {
                "-Id": "130527",
                "-Name": "南和县"
              },
              {
                "-Id": "130528",
                "-Name": "宁晋县"
              },
              {
                "-Id": "130530",
                "-Name": "新河县"
              },
              {
                "-Id": "130531",
                "-Name": "广宗县"
              },
              {
                "-Id": "130532",
                "-Name": "平乡县"
              },
              {
                "-Id": "130533",
                "-Name": "威县"
              },
              {
                "-Id": "130534",
                "-Name": "清河县"
              },
              {
                "-Id": "130535",
                "-Name": "临西县"
              },
              {
                "-Id": "130581",
                "-Name": "南宫市"
              },
              {
                "-Id": "130582",
                "-Name": "沙河市"
              }
            ]
          },
          {
            "-Id": "130600",
            "-Name": "保定市",
            "district": [
              {
                "-Id": "130601",
                "-Name": "新市区"
              },
              {
                "-Id": "130603",
                "-Name": "北市区"
              },
              {
                "-Id": "130604",
                "-Name": "南市区"
              },
              {
                "-Id": "130621",
                "-Name": "满城县"
              },
              {
                "-Id": "130622",
                "-Name": "清苑县"
              },
              {
                "-Id": "130623",
                "-Name": "涞水县"
              },
              {
                "-Id": "130624",
                "-Name": "阜平县"
              },
              {
                "-Id": "130625",
                "-Name": "徐水县"
              },
              {
                "-Id": "130626",
                "-Name": "定兴县"
              },
              {
                "-Id": "130627",
                "-Name": "唐县"
              },
              {
                "-Id": "130628",
                "-Name": "高阳县"
              },
              {
                "-Id": "130629",
                "-Name": "容城县"
              },
              {
                "-Id": "130630",
                "-Name": "涞源县"
              },
              {
                "-Id": "130631",
                "-Name": "望都县"
              },
              {
                "-Id": "130632",
                "-Name": "安新县"
              },
              {
                "-Id": "130633",
                "-Name": "易县"
              },
              {
                "-Id": "130634",
                "-Name": "曲阳县"
              },
              {
                "-Id": "130635",
                "-Name": "蠡县"
              },
              {
                "-Id": "130636",
                "-Name": "顺平县"
              },
              {
                "-Id": "130637",
                "-Name": "博野县"
              },
              {
                "-Id": "130638",
                "-Name": "雄县"
              },
              {
                "-Id": "130681",
                "-Name": "涿州市"
              },
              {
                "-Id": "130682",
                "-Name": "定州市"
              },
              {
                "-Id": "130683",
                "-Name": "安国市"
              },
              {
                "-Id": "130684",
                "-Name": "高碑店市"
              },
              {
                "-Id": "130685",
                "-Name": "白沟新城县"
              }
            ]
          },
          {
            "-Id": "130700",
            "-Name": "张家口市",
            "district": [
              {
                "-Id": "130701",
                "-Name": "市辖区"
              },
              {
                "-Id": "130721",
                "-Name": "宣化县"
              },
              {
                "-Id": "130722",
                "-Name": "张北县"
              },
              {
                "-Id": "130723",
                "-Name": "康保县"
              },
              {
                "-Id": "130724",
                "-Name": "沽源县"
              },
              {
                "-Id": "130725",
                "-Name": "尚义县"
              },
              {
                "-Id": "130726",
                "-Name": "蔚县"
              },
              {
                "-Id": "130727",
                "-Name": "阳原县"
              },
              {
                "-Id": "130728",
                "-Name": "怀安县"
              },
              {
                "-Id": "130729",
                "-Name": "万全县"
              },
              {
                "-Id": "130730",
                "-Name": "怀来县"
              },
              {
                "-Id": "130731",
                "-Name": "涿鹿县"
              },
              {
                "-Id": "130732",
                "-Name": "赤城县"
              },
              {
                "-Id": "130733",
                "-Name": "崇礼县"
              }
            ]
          },
          {
            "-Id": "130800",
            "-Name": "承德市",
            "district": [
              {
                "-Id": "130801",
                "-Name": "市辖区"
              },
              {
                "-Id": "130821",
                "-Name": "承德县"
              },
              {
                "-Id": "130822",
                "-Name": "兴隆县"
              },
              {
                "-Id": "130823",
                "-Name": "平泉县"
              },
              {
                "-Id": "130824",
                "-Name": "滦平县"
              },
              {
                "-Id": "130825",
                "-Name": "隆化县"
              },
              {
                "-Id": "130826",
                "-Name": "丰宁满族自治县"
              },
              {
                "-Id": "130827",
                "-Name": "宽城满族自治县"
              },
              {
                "-Id": "130828",
                "-Name": "围场满族蒙古族自治县"
              }
            ]
          },
          {
            "-Id": "130900",
            "-Name": "沧州市",
            "district": [
              {
                "-Id": "130901",
                "-Name": "市辖区"
              },
              {
                "-Id": "130921",
                "-Name": "沧县"
              },
              {
                "-Id": "130922",
                "-Name": "青县"
              },
              {
                "-Id": "130923",
                "-Name": "东光县"
              },
              {
                "-Id": "130924",
                "-Name": "海兴县"
              },
              {
                "-Id": "130925",
                "-Name": "盐山县"
              },
              {
                "-Id": "130926",
                "-Name": "肃宁县"
              },
              {
                "-Id": "130927",
                "-Name": "南皮县"
              },
              {
                "-Id": "130928",
                "-Name": "吴桥县"
              },
              {
                "-Id": "130929",
                "-Name": "献县"
              },
              {
                "-Id": "130930",
                "-Name": "孟村回族自治县"
              },
              {
                "-Id": "130981",
                "-Name": "泊头市"
              },
              {
                "-Id": "130982",
                "-Name": "任丘市"
              },
              {
                "-Id": "130983",
                "-Name": "黄骅市"
              },
              {
                "-Id": "130984",
                "-Name": "河间市"
              }
            ]
          },
          {
            "-Id": "131000",
            "-Name": "廊坊市",
            "district": [
              {
                "-Id": "131001",
                "-Name": "市辖区"
              },
              {
                "-Id": "131022",
                "-Name": "固安县"
              },
              {
                "-Id": "131023",
                "-Name": "永清县"
              },
              {
                "-Id": "131024",
                "-Name": "香河县"
              },
              {
                "-Id": "131025",
                "-Name": "大城县"
              },
              {
                "-Id": "131026",
                "-Name": "文安县"
              },
              {
                "-Id": "131028",
                "-Name": "大厂回族自治县"
              },
              {
                "-Id": "131081",
                "-Name": "霸州市"
              },
              {
                "-Id": "131082",
                "-Name": "三河市"
              }
            ]
          },
          {
            "-Id": "131100",
            "-Name": "衡水市",
            "district": [
              {
                "-Id": "131101",
                "-Name": "市辖区"
              },
              {
                "-Id": "131121",
                "-Name": "枣强县"
              },
              {
                "-Id": "131122",
                "-Name": "武邑县"
              },
              {
                "-Id": "131123",
                "-Name": "武强县"
              },
              {
                "-Id": "131124",
                "-Name": "饶阳县"
              },
              {
                "-Id": "131125",
                "-Name": "安平县"
              },
              {
                "-Id": "131126",
                "-Name": "故城县"
              },
              {
                "-Id": "131127",
                "-Name": "景县"
              },
              {
                "-Id": "131128",
                "-Name": "阜城县"
              },
              {
                "-Id": "131181",
                "-Name": "冀州市"
              },
              {
                "-Id": "131182",
                "-Name": "深州市"
              }
            ]
          }
        ]
      },
      {
        "-Id": "140000",
        "-Name": "山西省",
        "city": [
          {
            "-Id": "140100",
            "-Name": "太原市",
            "district": [
              {
                "-Id": "140101",
                "-Name": "市辖区"
              },
              {
                "-Id": "140121",
                "-Name": "清徐县"
              },
              {
                "-Id": "140122",
                "-Name": "阳曲县"
              },
              {
                "-Id": "140123",
                "-Name": "娄烦县"
              },
              {
                "-Id": "140181",
                "-Name": "古交市"
              }
            ]
          },
          {
            "-Id": "140200",
            "-Name": "大同市",
            "district": [
              {
                "-Id": "140201",
                "-Name": "市辖区"
              },
              {
                "-Id": "140221",
                "-Name": "阳高县"
              },
              {
                "-Id": "140222",
                "-Name": "天镇县"
              },
              {
                "-Id": "140223",
                "-Name": "广灵县"
              },
              {
                "-Id": "140224",
                "-Name": "灵丘县"
              },
              {
                "-Id": "140225",
                "-Name": "浑源县"
              },
              {
                "-Id": "140226",
                "-Name": "左云县"
              },
              {
                "-Id": "140227",
                "-Name": "大同县"
              }
            ]
          },
          {
            "-Id": "140300",
            "-Name": "阳泉市",
            "district": [
              {
                "-Id": "140301",
                "-Name": "市辖区"
              },
              {
                "-Id": "140321",
                "-Name": "平定县"
              },
              {
                "-Id": "140322",
                "-Name": "盂县"
              }
            ]
          },
          {
            "-Id": "140400",
            "-Name": "长治市",
            "district": [
              {
                "-Id": "140401",
                "-Name": "市辖区"
              },
              {
                "-Id": "140421",
                "-Name": "长治县"
              },
              {
                "-Id": "140423",
                "-Name": "襄垣县"
              },
              {
                "-Id": "140424",
                "-Name": "屯留县"
              },
              {
                "-Id": "140425",
                "-Name": "平顺县"
              },
              {
                "-Id": "140426",
                "-Name": "黎城县"
              },
              {
                "-Id": "140427",
                "-Name": "壶关县"
              },
              {
                "-Id": "140428",
                "-Name": "长子县"
              },
              {
                "-Id": "140429",
                "-Name": "武乡县"
              },
              {
                "-Id": "140430",
                "-Name": "沁县"
              },
              {
                "-Id": "140431",
                "-Name": "沁源县"
              },
              {
                "-Id": "140481",
                "-Name": "潞城市"
              }
            ]
          },
          {
            "-Id": "140500",
            "-Name": "晋城市",
            "district": [
              {
                "-Id": "140501",
                "-Name": "市辖区"
              },
              {
                "-Id": "140521",
                "-Name": "沁水县"
              },
              {
                "-Id": "140522",
                "-Name": "阳城县"
              },
              {
                "-Id": "140524",
                "-Name": "陵川县"
              },
              {
                "-Id": "140525",
                "-Name": "泽州县"
              },
              {
                "-Id": "140581",
                "-Name": "高平市"
              }
            ]
          },
          {
            "-Id": "140600",
            "-Name": "朔州市",
            "district": [
              {
                "-Id": "140601",
                "-Name": "市辖区"
              },
              {
                "-Id": "140621",
                "-Name": "山阴县"
              },
              {
                "-Id": "140622",
                "-Name": "应县"
              },
              {
                "-Id": "140623",
                "-Name": "右玉县"
              },
              {
                "-Id": "140624",
                "-Name": "怀仁县"
              }
            ]
          },
          {
            "-Id": "140700",
            "-Name": "晋中市",
            "district": [
              {
                "-Id": "140701",
                "-Name": "市辖区"
              },
              {
                "-Id": "140721",
                "-Name": "榆社县"
              },
              {
                "-Id": "140722",
                "-Name": "左权县"
              },
              {
                "-Id": "140723",
                "-Name": "和顺县"
              },
              {
                "-Id": "140724",
                "-Name": "昔阳县"
              },
              {
                "-Id": "140725",
                "-Name": "寿阳县"
              },
              {
                "-Id": "140726",
                "-Name": "太谷县"
              },
              {
                "-Id": "140727",
                "-Name": "祁县"
              },
              {
                "-Id": "140728",
                "-Name": "平遥县"
              },
              {
                "-Id": "140729",
                "-Name": "灵石县"
              },
              {
                "-Id": "140781",
                "-Name": "介休市"
              }
            ]
          },
          {
            "-Id": "140800",
            "-Name": "运城市",
            "district": [
              {
                "-Id": "140801",
                "-Name": "市辖区"
              },
              {
                "-Id": "140821",
                "-Name": "临猗县"
              },
              {
                "-Id": "140822",
                "-Name": "万荣县"
              },
              {
                "-Id": "140823",
                "-Name": "闻喜县"
              },
              {
                "-Id": "140824",
                "-Name": "稷山县"
              },
              {
                "-Id": "140825",
                "-Name": "新绛县"
              },
              {
                "-Id": "140826",
                "-Name": "绛县"
              },
              {
                "-Id": "140827",
                "-Name": "垣曲县"
              },
              {
                "-Id": "140828",
                "-Name": "夏县"
              },
              {
                "-Id": "140829",
                "-Name": "平陆县"
              },
              {
                "-Id": "140830",
                "-Name": "芮城县"
              },
              {
                "-Id": "140881",
                "-Name": "永济市"
              },
              {
                "-Id": "140882",
                "-Name": "河津市"
              }
            ]
          },
          {
            "-Id": "140900",
            "-Name": "忻州市",
            "district": [
              {
                "-Id": "140901",
                "-Name": "忻府区"
              },
              {
                "-Id": "140921",
                "-Name": "定襄县"
              },
              {
                "-Id": "140922",
                "-Name": "五台县"
              },
              {
                "-Id": "140923",
                "-Name": "代县"
              },
              {
                "-Id": "140924",
                "-Name": "繁峙县"
              },
              {
                "-Id": "140925",
                "-Name": "宁武县"
              },
              {
                "-Id": "140926",
                "-Name": "静乐县"
              },
              {
                "-Id": "140927",
                "-Name": "神池县"
              },
              {
                "-Id": "140928",
                "-Name": "五寨县"
              },
              {
                "-Id": "140929",
                "-Name": "岢岚县"
              },
              {
                "-Id": "140930",
                "-Name": "河曲县"
              },
              {
                "-Id": "140931",
                "-Name": "保德县"
              },
              {
                "-Id": "140932",
                "-Name": "偏关县"
              },
              {
                "-Id": "140981",
                "-Name": "原平市"
              }
            ]
          },
          {
            "-Id": "141000",
            "-Name": "临汾市",
            "district": [
              {
                "-Id": "141001",
                "-Name": "市辖区"
              },
              {
                "-Id": "141002",
                "-Name": "尧都区"
              },
              {
                "-Id": "141021",
                "-Name": "曲沃县"
              },
              {
                "-Id": "141022",
                "-Name": "翼城县"
              },
              {
                "-Id": "141023",
                "-Name": "襄汾县"
              },
              {
                "-Id": "141024",
                "-Name": "洪洞县"
              },
              {
                "-Id": "141025",
                "-Name": "古县"
              },
              {
                "-Id": "141026",
                "-Name": "安泽县"
              },
              {
                "-Id": "141027",
                "-Name": "浮山县"
              },
              {
                "-Id": "141028",
                "-Name": "吉县"
              },
              {
                "-Id": "141029",
                "-Name": "乡宁县"
              },
              {
                "-Id": "141030",
                "-Name": "大宁县"
              },
              {
                "-Id": "141031",
                "-Name": "隰县"
              },
              {
                "-Id": "141032",
                "-Name": "永和县"
              },
              {
                "-Id": "141033",
                "-Name": "蒲县"
              },
              {
                "-Id": "141034",
                "-Name": "汾西县"
              },
              {
                "-Id": "141081",
                "-Name": "侯马市"
              },
              {
                "-Id": "141082",
                "-Name": "霍州市"
              }
            ]
          },
          {
            "-Id": "141100",
            "-Name": "吕梁市",
            "district": [
              {
                "-Id": "141101",
                "-Name": "市辖区"
              },
              {
                "-Id": "141121",
                "-Name": "文水县"
              },
              {
                "-Id": "141122",
                "-Name": "交城县"
              },
              {
                "-Id": "141123",
                "-Name": "兴县"
              },
              {
                "-Id": "141124",
                "-Name": "临县"
              },
              {
                "-Id": "141125",
                "-Name": "柳林县"
              },
              {
                "-Id": "141126",
                "-Name": "石楼县"
              },
              {
                "-Id": "141127",
                "-Name": "岚县"
              },
              {
                "-Id": "141128",
                "-Name": "方山县"
              },
              {
                "-Id": "141129",
                "-Name": "中阳县"
              },
              {
                "-Id": "141130",
                "-Name": "交口县"
              },
              {
                "-Id": "141181",
                "-Name": "孝义市"
              },
              {
                "-Id": "141182",
                "-Name": "汾阳市"
              }
            ]
          }
        ]
      },
      {
        "-Id": "150000",
        "-Name": "内蒙古自治区",
        "city": [
          {
            "-Id": "150100",
            "-Name": "呼和浩特市",
            "district": [
              {
                "-Id": "150101",
                "-Name": "市辖区"
              },
              {
                "-Id": "150121",
                "-Name": "土默特左旗"
              },
              {
                "-Id": "150122",
                "-Name": "托克托县"
              },
              {
                "-Id": "150123",
                "-Name": "和林格尔县"
              },
              {
                "-Id": "150124",
                "-Name": "清水河县"
              },
              {
                "-Id": "150125",
                "-Name": "武川县"
              }
            ]
          },
          {
            "-Id": "150200",
            "-Name": "包头市",
            "district": [
              {
                "-Id": "150201",
                "-Name": "市辖区"
              },
              {
                "-Id": "150221",
                "-Name": "土默特右旗"
              },
              {
                "-Id": "150222",
                "-Name": "固阳县"
              },
              {
                "-Id": "150223",
                "-Name": "达尔罕茂明安联合旗"
              }
            ]
          },
          {
            "-Id": "150300",
            "-Name": "乌海市",
            "district": {
              "-Id": "150301",
              "-Name": "市辖区"
            }
          },
          {
            "-Id": "150400",
            "-Name": "赤峰市",
            "district": [
              {
                "-Id": "150401",
                "-Name": "市辖区"
              },
              {
                "-Id": "150421",
                "-Name": "阿鲁科尔沁旗"
              },
              {
                "-Id": "150422",
                "-Name": "巴林左旗"
              },
              {
                "-Id": "150423",
                "-Name": "巴林右旗"
              },
              {
                "-Id": "150424",
                "-Name": "林西县"
              },
              {
                "-Id": "150425",
                "-Name": "克什克腾旗"
              },
              {
                "-Id": "150426",
                "-Name": "翁牛特旗"
              },
              {
                "-Id": "150428",
                "-Name": "喀喇沁旗"
              },
              {
                "-Id": "150429",
                "-Name": "宁城县"
              },
              {
                "-Id": "150430",
                "-Name": "敖汉旗"
              }
            ]
          },
          {
            "-Id": "150500",
            "-Name": "通辽市",
            "district": [
              {
                "-Id": "150501",
                "-Name": "市辖区"
              },
              {
                "-Id": "150521",
                "-Name": "科尔沁左翼中旗"
              },
              {
                "-Id": "150522",
                "-Name": "科尔沁左翼后旗"
              },
              {
                "-Id": "150523",
                "-Name": "开鲁县"
              },
              {
                "-Id": "150524",
                "-Name": "库伦旗"
              },
              {
                "-Id": "150525",
                "-Name": "奈曼旗"
              },
              {
                "-Id": "150526",
                "-Name": "扎鲁特旗"
              },
              {
                "-Id": "150581",
                "-Name": "霍林郭勒市"
              }
            ]
          },
          {
            "-Id": "150600",
            "-Name": "鄂尔多斯市",
            "district": [
              {
                "-Id": "150602",
                "-Name": "东胜区"
              },
              {
                "-Id": "150621",
                "-Name": "达拉特旗"
              },
              {
                "-Id": "150622",
                "-Name": "准格尔旗"
              },
              {
                "-Id": "150623",
                "-Name": "鄂托克前旗"
              },
              {
                "-Id": "150624",
                "-Name": "鄂托克旗"
              },
              {
                "-Id": "150625",
                "-Name": "杭锦旗"
              },
              {
                "-Id": "150626",
                "-Name": "乌审旗"
              },
              {
                "-Id": "150627",
                "-Name": "伊金霍洛旗"
              }
            ]
          },
          {
            "-Id": "150700",
            "-Name": "呼伦贝尔市",
            "district": [
              {
                "-Id": "150701",
                "-Name": "市辖区"
              },
              {
                "-Id": "150721",
                "-Name": "阿荣旗"
              },
              {
                "-Id": "150722",
                "-Name": "莫力达瓦达斡尔族自治旗"
              },
              {
                "-Id": "150723",
                "-Name": "鄂伦春自治旗"
              },
              {
                "-Id": "150724",
                "-Name": "鄂温克族自治旗"
              },
              {
                "-Id": "150725",
                "-Name": "陈巴尔虎旗"
              },
              {
                "-Id": "150726",
                "-Name": "新巴尔虎左旗"
              },
              {
                "-Id": "150727",
                "-Name": "新巴尔虎右旗"
              },
              {
                "-Id": "150781",
                "-Name": "满洲里市"
              },
              {
                "-Id": "150782",
                "-Name": "牙克石市"
              },
              {
                "-Id": "150783",
                "-Name": "扎兰屯市"
              },
              {
                "-Id": "150784",
                "-Name": "额尔古纳市"
              },
              {
                "-Id": "150785",
                "-Name": "根河市"
              }
            ]
          },
          {
            "-Id": "150800",
            "-Name": "巴彦淖尔市",
            "district": [
              {
                "-Id": "150801",
                "-Name": "市辖区"
              },
              {
                "-Id": "150802",
                "-Name": "临河区"
              },
              {
                "-Id": "150821",
                "-Name": "五原县"
              },
              {
                "-Id": "150822",
                "-Name": "磴口县"
              },
              {
                "-Id": "150823",
                "-Name": "乌拉特前旗"
              },
              {
                "-Id": "150824",
                "-Name": "乌拉特中旗"
              },
              {
                "-Id": "150825",
                "-Name": "乌拉特后旗"
              },
              {
                "-Id": "150826",
                "-Name": "杭锦后旗"
              }
            ]
          },
          {
            "-Id": "150900",
            "-Name": "乌兰察布市",
            "district": [
              {
                "-Id": "150901",
                "-Name": "市辖区"
              },
              {
                "-Id": "150921",
                "-Name": "卓资县"
              },
              {
                "-Id": "150922",
                "-Name": "化德县"
              },
              {
                "-Id": "150923",
                "-Name": "商都县"
              },
              {
                "-Id": "150924",
                "-Name": "兴和县"
              },
              {
                "-Id": "150925",
                "-Name": "凉城县"
              },
              {
                "-Id": "150926",
                "-Name": "察哈尔右翼前旗"
              },
              {
                "-Id": "150927",
                "-Name": "察哈尔右翼中旗"
              },
              {
                "-Id": "150928",
                "-Name": "察哈尔右翼后旗"
              },
              {
                "-Id": "150929",
                "-Name": "四子王旗"
              },
              {
                "-Id": "150981",
                "-Name": "丰镇市"
              }
            ]
          },
          {
            "-Id": "152200",
            "-Name": "兴安盟",
            "district": [
              {
                "-Id": "152201",
                "-Name": "乌兰浩特市"
              },
              {
                "-Id": "152202",
                "-Name": "阿尔山市"
              },
              {
                "-Id": "152221",
                "-Name": "科尔沁右翼前旗"
              },
              {
                "-Id": "152222",
                "-Name": "科尔沁右翼中旗"
              },
              {
                "-Id": "152223",
                "-Name": "扎赉特旗"
              },
              {
                "-Id": "152224",
                "-Name": "突泉县"
              }
            ]
          },
          {
            "-Id": "152500",
            "-Name": "锡林郭勒盟",
            "district": [
              {
                "-Id": "152501",
                "-Name": "二连浩特市"
              },
              {
                "-Id": "152502",
                "-Name": "锡林浩特市"
              },
              {
                "-Id": "152522",
                "-Name": "阿巴嘎旗"
              },
              {
                "-Id": "152523",
                "-Name": "苏尼特左旗"
              },
              {
                "-Id": "152524",
                "-Name": "苏尼特右旗"
              },
              {
                "-Id": "152525",
                "-Name": "东乌珠穆沁旗"
              },
              {
                "-Id": "152526",
                "-Name": "西乌珠穆沁旗"
              },
              {
                "-Id": "152527",
                "-Name": "太仆寺旗"
              },
              {
                "-Id": "152528",
                "-Name": "镶黄旗"
              },
              {
                "-Id": "152529",
                "-Name": "正镶白旗"
              },
              {
                "-Id": "152530",
                "-Name": "正蓝旗"
              },
              {
                "-Id": "152531",
                "-Name": "多伦县"
              }
            ]
          },
          {
            "-Id": "152900",
            "-Name": "阿拉善盟",
            "district": [
              {
                "-Id": "152921",
                "-Name": "阿拉善左旗"
              },
              {
                "-Id": "152922",
                "-Name": "阿拉善右旗"
              },
              {
                "-Id": "152923",
                "-Name": "额济纳旗"
              }
            ]
          }
        ]
      },
      {
        "-Id": "210000",
        "-Name": "辽宁省",
        "city": [
          {
            "-Id": "210100",
            "-Name": "沈阳市",
            "district": [
              {
                "-Id": "210101",
                "-Name": "市辖区"
              },
              {
                "-Id": "210122",
                "-Name": "辽中县"
              },
              {
                "-Id": "210123",
                "-Name": "康平县"
              },
              {
                "-Id": "210124",
                "-Name": "法库县"
              },
              {
                "-Id": "210181",
                "-Name": "新民市"
              },
              {
                "-Id": "210182",
                "-Name": "沈北新区"
              }
            ]
          },
          {
            "-Id": "210200",
            "-Name": "大连市",
            "district": [
              {
                "-Id": "210201",
                "-Name": "市辖区"
              },
              {
                "-Id": "210224",
                "-Name": "长海县"
              },
              {
                "-Id": "210281",
                "-Name": "瓦房店市"
              },
              {
                "-Id": "210282",
                "-Name": "普兰店市"
              },
              {
                "-Id": "210283",
                "-Name": "庄河市"
              }
            ]
          },
          {
            "-Id": "210300",
            "-Name": "鞍山市",
            "district": [
              {
                "-Id": "210301",
                "-Name": "市辖区"
              },
              {
                "-Id": "210321",
                "-Name": "台安县"
              },
              {
                "-Id": "210323",
                "-Name": "岫岩满族自治县"
              },
              {
                "-Id": "210381",
                "-Name": "海城市"
              }
            ]
          },
          {
            "-Id": "210400",
            "-Name": "抚顺市",
            "district": [
              {
                "-Id": "210401",
                "-Name": "市辖区"
              },
              {
                "-Id": "210421",
                "-Name": "抚顺县"
              },
              {
                "-Id": "210422",
                "-Name": "新宾满族自治县"
              },
              {
                "-Id": "210423",
                "-Name": "清原满族自治县"
              }
            ]
          },
          {
            "-Id": "210500",
            "-Name": "本溪市",
            "district": [
              {
                "-Id": "210501",
                "-Name": "市辖区"
              },
              {
                "-Id": "210521",
                "-Name": "本溪满族自治县"
              },
              {
                "-Id": "210522",
                "-Name": "桓仁满族自治县"
              }
            ]
          },
          {
            "-Id": "210600",
            "-Name": "丹东市",
            "district": [
              {
                "-Id": "210601",
                "-Name": "市辖区"
              },
              {
                "-Id": "210624",
                "-Name": "宽甸满族自治县"
              },
              {
                "-Id": "210681",
                "-Name": "东港市"
              },
              {
                "-Id": "210682",
                "-Name": "凤城市"
              }
            ]
          },
          {
            "-Id": "210700",
            "-Name": "锦州市",
            "district": [
              {
                "-Id": "210701",
                "-Name": "市辖区"
              },
              {
                "-Id": "210726",
                "-Name": "黑山县"
              },
              {
                "-Id": "210727",
                "-Name": "义县"
              },
              {
                "-Id": "210781",
                "-Name": "凌海市"
              },
              {
                "-Id": "210782",
                "-Name": "北宁市"
              }
            ]
          },
          {
            "-Id": "210800",
            "-Name": "营口市",
            "district": [
              {
                "-Id": "210801",
                "-Name": "市辖区"
              },
              {
                "-Id": "210881",
                "-Name": "盖州市"
              },
              {
                "-Id": "210882",
                "-Name": "大石桥市"
              }
            ]
          },
          {
            "-Id": "210900",
            "-Name": "阜新市",
            "district": [
              {
                "-Id": "210901",
                "-Name": "市辖区"
              },
              {
                "-Id": "210921",
                "-Name": "阜新蒙古族自治县"
              },
              {
                "-Id": "210922",
                "-Name": "彰武县"
              }
            ]
          },
          {
            "-Id": "211000",
            "-Name": "辽阳市",
            "district": [
              {
                "-Id": "211001",
                "-Name": "市辖区"
              },
              {
                "-Id": "211021",
                "-Name": "辽阳县"
              },
              {
                "-Id": "211081",
                "-Name": "灯塔市"
              }
            ]
          },
          {
            "-Id": "211100",
            "-Name": "盘锦市",
            "district": [
              {
                "-Id": "211101",
                "-Name": "市辖区"
              },
              {
                "-Id": "211121",
                "-Name": "大洼县"
              },
              {
                "-Id": "211122",
                "-Name": "盘山县"
              }
            ]
          },
          {
            "-Id": "211200",
            "-Name": "铁岭市",
            "district": [
              {
                "-Id": "211201",
                "-Name": "市辖区"
              },
              {
                "-Id": "211221",
                "-Name": "铁岭县"
              },
              {
                "-Id": "211223",
                "-Name": "西丰县"
              },
              {
                "-Id": "211224",
                "-Name": "昌图县"
              },
              {
                "-Id": "211281",
                "-Name": "调兵山市"
              },
              {
                "-Id": "211282",
                "-Name": "开原市"
              }
            ]
          },
          {
            "-Id": "211300",
            "-Name": "朝阳市",
            "district": [
              {
                "-Id": "211301",
                "-Name": "市辖区"
              },
              {
                "-Id": "211321",
                "-Name": "朝阳县"
              },
              {
                "-Id": "211322",
                "-Name": "建平县"
              },
              {
                "-Id": "211324",
                "-Name": "喀喇沁左翼蒙古族自治县"
              },
              {
                "-Id": "211381",
                "-Name": "北票市"
              },
              {
                "-Id": "211382",
                "-Name": "凌源市"
              }
            ]
          },
          {
            "-Id": "211400",
            "-Name": "葫芦岛市",
            "district": [
              {
                "-Id": "211401",
                "-Name": "市辖区"
              },
              {
                "-Id": "211421",
                "-Name": "绥中县"
              },
              {
                "-Id": "211422",
                "-Name": "建昌县"
              },
              {
                "-Id": "211481",
                "-Name": "兴城市"
              }
            ]
          }
        ]
      },
      {
        "-Id": "220000",
        "-Name": "吉林省",
        "city": [
          {
            "-Id": "220100",
            "-Name": "长春市",
            "district": [
              {
                "-Id": "220101",
                "-Name": "市辖区"
              },
              {
                "-Id": "220122",
                "-Name": "农安县"
              },
              {
                "-Id": "220181",
                "-Name": "九台市"
              },
              {
                "-Id": "220182",
                "-Name": "榆树市"
              },
              {
                "-Id": "220183",
                "-Name": "德惠市"
              }
            ]
          },
          {
            "-Id": "220200",
            "-Name": "吉林市",
            "district": [
              {
                "-Id": "220201",
                "-Name": "市辖区"
              },
              {
                "-Id": "220221",
                "-Name": "永吉县"
              },
              {
                "-Id": "220281",
                "-Name": "蛟河市"
              },
              {
                "-Id": "220282",
                "-Name": "桦甸市"
              },
              {
                "-Id": "220283",
                "-Name": "舒兰市"
              },
              {
                "-Id": "220284",
                "-Name": "磐石市"
              }
            ]
          },
          {
            "-Id": "220300",
            "-Name": "四平市",
            "district": [
              {
                "-Id": "220301",
                "-Name": "市辖区"
              },
              {
                "-Id": "220322",
                "-Name": "梨树县"
              },
              {
                "-Id": "220323",
                "-Name": "伊通满族自治县"
              },
              {
                "-Id": "220381",
                "-Name": "公主岭市"
              },
              {
                "-Id": "220382",
                "-Name": "双辽市"
              }
            ]
          },
          {
            "-Id": "220400",
            "-Name": "辽源市",
            "district": [
              {
                "-Id": "220401",
                "-Name": "市辖区"
              },
              {
                "-Id": "220421",
                "-Name": "东丰县"
              },
              {
                "-Id": "220422",
                "-Name": "东辽县"
              }
            ]
          },
          {
            "-Id": "220500",
            "-Name": "通化市",
            "district": [
              {
                "-Id": "220501",
                "-Name": "市辖区"
              },
              {
                "-Id": "220521",
                "-Name": "通化县"
              },
              {
                "-Id": "220523",
                "-Name": "辉南县"
              },
              {
                "-Id": "220524",
                "-Name": "柳河县"
              },
              {
                "-Id": "220581",
                "-Name": "梅河口市"
              },
              {
                "-Id": "220582",
                "-Name": "集安市"
              }
            ]
          },
          {
            "-Id": "220600",
            "-Name": "白山市",
            "district": [
              {
                "-Id": "220601",
                "-Name": "市辖区"
              },
              {
                "-Id": "220621",
                "-Name": "抚松县"
              },
              {
                "-Id": "220622",
                "-Name": "靖宇县"
              },
              {
                "-Id": "220623",
                "-Name": "长白朝鲜族自治县"
              },
              {
                "-Id": "220625",
                "-Name": "江源区"
              },
              {
                "-Id": "220681",
                "-Name": "临江市"
              }
            ]
          },
          {
            "-Id": "220700",
            "-Name": "松原市",
            "district": [
              {
                "-Id": "220701",
                "-Name": "市辖区"
              },
              {
                "-Id": "220721",
                "-Name": "前郭尔罗斯蒙古族自治县"
              },
              {
                "-Id": "220722",
                "-Name": "长岭县"
              },
              {
                "-Id": "220723",
                "-Name": "乾安县"
              },
              {
                "-Id": "220724",
                "-Name": "扶余市"
              }
            ]
          },
          {
            "-Id": "220800",
            "-Name": "白城市",
            "district": [
              {
                "-Id": "220801",
                "-Name": "市辖区"
              },
              {
                "-Id": "220802",
                "-Name": "洮北区"
              },
              {
                "-Id": "220821",
                "-Name": "镇赉县"
              },
              {
                "-Id": "220822",
                "-Name": "通榆县"
              },
              {
                "-Id": "220881",
                "-Name": "洮南市"
              },
              {
                "-Id": "220882",
                "-Name": "大安市"
              }
            ]
          },
          {
            "-Id": "222400",
            "-Name": "延边朝鲜族自治州",
            "district": [
              {
                "-Id": "222401",
                "-Name": "延吉市"
              },
              {
                "-Id": "222402",
                "-Name": "图们市"
              },
              {
                "-Id": "222403",
                "-Name": "敦化市"
              },
              {
                "-Id": "222404",
                "-Name": "珲春市"
              },
              {
                "-Id": "222405",
                "-Name": "龙井市"
              },
              {
                "-Id": "222406",
                "-Name": "和龙市"
              },
              {
                "-Id": "222424",
                "-Name": "汪清县"
              },
              {
                "-Id": "222426",
                "-Name": "安图县"
              }
            ]
          }
        ]
      },
      {
        "-Id": "230000",
        "-Name": "黑龙江省",
        "city": [
          {
            "-Id": "230100",
            "-Name": "哈尔滨市",
            "district": [
              {
                "-Id": "230101",
                "-Name": "市辖区"
              },
              {
                "-Id": "230123",
                "-Name": "依兰县"
              },
              {
                "-Id": "230124",
                "-Name": "方正县"
              },
              {
                "-Id": "230125",
                "-Name": "宾县"
              },
              {
                "-Id": "230126",
                "-Name": "巴彦县"
              },
              {
                "-Id": "230127",
                "-Name": "木兰县"
              },
              {
                "-Id": "230128",
                "-Name": "通河县"
              },
              {
                "-Id": "230129",
                "-Name": "延寿县"
              },
              {
                "-Id": "230181",
                "-Name": "阿城市"
              },
              {
                "-Id": "230182",
                "-Name": "双城市"
              },
              {
                "-Id": "230183",
                "-Name": "尚志市"
              },
              {
                "-Id": "230184",
                "-Name": "五常市"
              }
            ]
          },
          {
            "-Id": "230200",
            "-Name": "齐齐哈尔市",
            "district": [
              {
                "-Id": "230201",
                "-Name": "市辖区"
              },
              {
                "-Id": "230221",
                "-Name": "龙江县"
              },
              {
                "-Id": "230223",
                "-Name": "依安县"
              },
              {
                "-Id": "230224",
                "-Name": "泰来县"
              },
              {
                "-Id": "230225",
                "-Name": "甘南县"
              },
              {
                "-Id": "230227",
                "-Name": "富裕县"
              },
              {
                "-Id": "230229",
                "-Name": "克山县"
              },
              {
                "-Id": "230230",
                "-Name": "克东县"
              },
              {
                "-Id": "230231",
                "-Name": "拜泉县"
              },
              {
                "-Id": "230281",
                "-Name": "讷河市"
              }
            ]
          },
          {
            "-Id": "230300",
            "-Name": "鸡西市",
            "district": [
              {
                "-Id": "230301",
                "-Name": "市辖区"
              },
              {
                "-Id": "230321",
                "-Name": "鸡东县"
              },
              {
                "-Id": "230381",
                "-Name": "虎林市"
              },
              {
                "-Id": "230382",
                "-Name": "密山市"
              }
            ]
          },
          {
            "-Id": "230400",
            "-Name": "鹤岗市",
            "district": [
              {
                "-Id": "230401",
                "-Name": "市辖区"
              },
              {
                "-Id": "230421",
                "-Name": "萝北县"
              },
              {
                "-Id": "230422",
                "-Name": "绥滨县"
              }
            ]
          },
          {
            "-Id": "230500",
            "-Name": "双鸭山市",
            "district": [
              {
                "-Id": "230501",
                "-Name": "市辖区"
              },
              {
                "-Id": "230521",
                "-Name": "集贤县"
              },
              {
                "-Id": "230522",
                "-Name": "友谊县"
              },
              {
                "-Id": "230523",
                "-Name": "宝清县"
              },
              {
                "-Id": "230524",
                "-Name": "饶河县"
              }
            ]
          },
          {
            "-Id": "230600",
            "-Name": "大庆市",
            "district": [
              {
                "-Id": "230601",
                "-Name": "市辖区"
              },
              {
                "-Id": "230621",
                "-Name": "肇州县"
              },
              {
                "-Id": "230622",
                "-Name": "肇源县"
              },
              {
                "-Id": "230623",
                "-Name": "林甸县"
              },
              {
                "-Id": "230624",
                "-Name": "杜尔伯特蒙古族自治县"
              }
            ]
          },
          {
            "-Id": "230700",
            "-Name": "伊春市",
            "district": [
              {
                "-Id": "230701",
                "-Name": "市辖区"
              },
              {
                "-Id": "230722",
                "-Name": "嘉荫县"
              },
              {
                "-Id": "230781",
                "-Name": "铁力市"
              }
            ]
          },
          {
            "-Id": "230800",
            "-Name": "佳木斯市",
            "district": [
              {
                "-Id": "230801",
                "-Name": "市辖区"
              },
              {
                "-Id": "230822",
                "-Name": "桦南县"
              },
              {
                "-Id": "230826",
                "-Name": "桦川县"
              },
              {
                "-Id": "230828",
                "-Name": "汤原县"
              },
              {
                "-Id": "230833",
                "-Name": "抚远县"
              },
              {
                "-Id": "230881",
                "-Name": "同江市"
              },
              {
                "-Id": "230882",
                "-Name": "富锦市"
              }
            ]
          },
          {
            "-Id": "230900",
            "-Name": "七台河市",
            "district": [
              {
                "-Id": "230901",
                "-Name": "市辖区"
              },
              {
                "-Id": "230921",
                "-Name": "勃利县"
              }
            ]
          },
          {
            "-Id": "231000",
            "-Name": "牡丹江市",
            "district": [
              {
                "-Id": "231001",
                "-Name": "市辖区"
              },
              {
                "-Id": "231024",
                "-Name": "东宁县"
              },
              {
                "-Id": "231025",
                "-Name": "林口县"
              },
              {
                "-Id": "231081",
                "-Name": "绥芬河市"
              },
              {
                "-Id": "231083",
                "-Name": "海林市"
              },
              {
                "-Id": "231084",
                "-Name": "宁安市"
              },
              {
                "-Id": "231085",
                "-Name": "穆棱市"
              }
            ]
          },
          {
            "-Id": "231100",
            "-Name": "黑河市",
            "district": [
              {
                "-Id": "231101",
                "-Name": "市辖区"
              },
              {
                "-Id": "231121",
                "-Name": "嫩江县"
              },
              {
                "-Id": "231123",
                "-Name": "逊克县"
              },
              {
                "-Id": "231124",
                "-Name": "孙吴县"
              },
              {
                "-Id": "231181",
                "-Name": "北安市"
              },
              {
                "-Id": "231182",
                "-Name": "五大连池市"
              }
            ]
          },
          {
            "-Id": "231200",
            "-Name": "绥化市",
            "district": [
              {
                "-Id": "231201",
                "-Name": "北林区"
              },
              {
                "-Id": "231221",
                "-Name": "望奎县"
              },
              {
                "-Id": "231222",
                "-Name": "兰西县"
              },
              {
                "-Id": "231223",
                "-Name": "青冈县"
              },
              {
                "-Id": "231224",
                "-Name": "庆安县"
              },
              {
                "-Id": "231225",
                "-Name": "明水县"
              },
              {
                "-Id": "231226",
                "-Name": "绥棱县"
              },
              {
                "-Id": "231281",
                "-Name": "安达市"
              },
              {
                "-Id": "231282",
                "-Name": "肇东市"
              },
              {
                "-Id": "231283",
                "-Name": "海伦市"
              }
            ]
          },
          {
            "-Id": "232700",
            "-Name": "大兴安岭地区",
            "district": [
              {
                "-Id": "232701",
                "-Name": "加格达奇区"
              },
              {
                "-Id": "232702",
                "-Name": "松岭区"
              },
              {
                "-Id": "232703",
                "-Name": "新林区"
              },
              {
                "-Id": "232704",
                "-Name": "呼中区"
              },
              {
                "-Id": "232721",
                "-Name": "呼玛县"
              },
              {
                "-Id": "232722",
                "-Name": "塔河县"
              },
              {
                "-Id": "232723",
                "-Name": "漠河县"
              }
            ]
          }
        ]
      },
      {
        "-Id": "310000",
        "-Name": "上海市",
        "city": [{
          "-Id": "310000",
          "-Name": "上海市",
          "district": [
            {
              "-Id": "310100",
              "-Name": "黄浦区"
            },
            {
              "-Id": "310300",
              "-Name": "卢湾区"
            },
            {
              "-Id": "310400",
              "-Name": "徐汇区"
            },
            {
              "-Id": "310500",
              "-Name": "长宁区"
            },
            {
              "-Id": "310600",
              "-Name": "静安区"
            },
            {
              "-Id": "310700",
              "-Name": "普陀区"
            },
            {
              "-Id": "310800",
              "-Name": "闸北区"
            },
            {
              "-Id": "310900",
              "-Name": "虹口区"
            },
            {
              "-Id": "311000",
              "-Name": "杨浦区"
            },
            {
              "-Id": "311200",
              "-Name": "闵行区"
            },
            {
              "-Id": "311300",
              "-Name": "宝山区"
            },
            {
              "-Id": "311400",
              "-Name": "嘉定区"
            },
            {
              "-Id": "311500",
              "-Name": "浦东新区"
            },
            {
              "-Id": "311600",
              "-Name": "金山区"
            },
            {
              "-Id": "311700",
              "-Name": "松江区"
            },
            {
              "-Id": "311800",
              "-Name": "青浦区"
            },
            {
              "-Id": "311900",
              "-Name": "南汇区"
            },
            {
              "-Id": "312000",
              "-Name": "奉贤区"
            },
            {
              "-Id": "313000",
              "-Name": "崇明县"
            }
          ]
        }]
      },
      {
        "-Id": "320000",
        "-Name": "江苏省",
        "city": [
          {
            "-Id": "320100",
            "-Name": "南京市",
            "district": [
              {
                "-Id": "320101",
                "-Name": "市辖区"
              },
              {
                "-Id": "320124",
                "-Name": "溧水区"
              },
              {
                "-Id": "320125",
                "-Name": "高淳区"
              }
            ]
          },
          {
            "-Id": "320200",
            "-Name": "无锡市",
            "district": [
              {
                "-Id": "320201",
                "-Name": "市辖区"
              },
              {
                "-Id": "320281",
                "-Name": "江阴市"
              },
              {
                "-Id": "320282",
                "-Name": "宜兴市"
              }
            ]
          },
          {
            "-Id": "320300",
            "-Name": "徐州市",
            "district": [
              {
                "-Id": "320301",
                "-Name": "泉山区"
              },
              {
                "-Id": "320302",
                "-Name": "鼓楼区"
              },
              {
                "-Id": "320303",
                "-Name": "云龙区"
              },
              {
                "-Id": "320305",
                "-Name": "贾汪区"
              },
              {
                "-Id": "320321",
                "-Name": "丰县"
              },
              {
                "-Id": "320322",
                "-Name": "沛县"
              },
              {
                "-Id": "320323",
                "-Name": "铜山县"
              },
              {
                "-Id": "320324",
                "-Name": "睢宁县"
              },
              {
                "-Id": "320381",
                "-Name": "新沂市"
              },
              {
                "-Id": "320382",
                "-Name": "邳州市"
              }
            ]
          },
          {
            "-Id": "320400",
            "-Name": "常州市",
            "district": [
              {
                "-Id": "320401",
                "-Name": "市辖区"
              },
              {
                "-Id": "320481",
                "-Name": "溧阳市"
              },
              {
                "-Id": "320482",
                "-Name": "金坛市"
              }
            ]
          },
          {
            "-Id": "320500",
            "-Name": "苏州市",
            "district": [
              {
                "-Id": "320501",
                "-Name": "市辖区"
              },
              {
                "-Id": "320581",
                "-Name": "常熟市"
              },
              {
                "-Id": "320582",
                "-Name": "张家港市"
              },
              {
                "-Id": "320583",
                "-Name": "昆山市"
              },
              {
                "-Id": "320584",
                "-Name": "吴江市"
              },
              {
                "-Id": "320585",
                "-Name": "太仓市"
              }
            ]
          },
          {
            "-Id": "320600",
            "-Name": "南通市",
            "district": [
              {
                "-Id": "320601",
                "-Name": "市辖区"
              },
              {
                "-Id": "320621",
                "-Name": "海安县"
              },
              {
                "-Id": "320623",
                "-Name": "如东县"
              },
              {
                "-Id": "320681",
                "-Name": "启东市"
              },
              {
                "-Id": "320682",
                "-Name": "如皋市"
              },
              {
                "-Id": "320683",
                "-Name": "通州市"
              },
              {
                "-Id": "320684",
                "-Name": "海门市"
              }
            ]
          },
          {
            "-Id": "320700",
            "-Name": "连云港市",
            "district": [
              {
                "-Id": "320701",
                "-Name": "市辖区"
              },
              {
                "-Id": "320721",
                "-Name": "赣榆县"
              },
              {
                "-Id": "320722",
                "-Name": "东海县"
              },
              {
                "-Id": "320723",
                "-Name": "灌云县"
              },
              {
                "-Id": "320724",
                "-Name": "灌南县"
              }
            ]
          },
          {
            "-Id": "320800",
            "-Name": "淮安市",
            "district": [
              {
                "-Id": "320801",
                "-Name": "市辖区"
              },
              {
                "-Id": "320826",
                "-Name": "涟水县"
              },
              {
                "-Id": "320829",
                "-Name": "洪泽县"
              },
              {
                "-Id": "320830",
                "-Name": "盱眙县"
              },
              {
                "-Id": "320831",
                "-Name": "金湖县"
              }
            ]
          },
          {
            "-Id": "320900",
            "-Name": "盐城市",
            "district": [
              {
                "-Id": "320901",
                "-Name": "市辖区"
              },
              {
                "-Id": "320921",
                "-Name": "响水县"
              },
              {
                "-Id": "320922",
                "-Name": "滨海县"
              },
              {
                "-Id": "320923",
                "-Name": "阜宁县"
              },
              {
                "-Id": "320924",
                "-Name": "射阳县"
              },
              {
                "-Id": "320925",
                "-Name": "建湖县"
              },
              {
                "-Id": "320981",
                "-Name": "东台市"
              },
              {
                "-Id": "320982",
                "-Name": "大丰市"
              }
            ]
          },
          {
            "-Id": "321000",
            "-Name": "扬州市",
            "district": [
              {
                "-Id": "321001",
                "-Name": "市辖区"
              },
              {
                "-Id": "321023",
                "-Name": "宝应县"
              },
              {
                "-Id": "321081",
                "-Name": "仪征市"
              },
              {
                "-Id": "321084",
                "-Name": "高邮市"
              },
              {
                "-Id": "321088",
                "-Name": "江都市"
              }
            ]
          },
          {
            "-Id": "321100",
            "-Name": "镇江市",
            "district": [
              {
                "-Id": "321101",
                "-Name": "市辖区"
              },
              {
                "-Id": "321181",
                "-Name": "丹阳市"
              },
              {
                "-Id": "321182",
                "-Name": "扬中市"
              },
              {
                "-Id": "321183",
                "-Name": "句容市"
              }
            ]
          },
          {
            "-Id": "321200",
            "-Name": "泰州市",
            "district": [
              {
                "-Id": "321201",
                "-Name": "市辖区"
              },
              {
                "-Id": "321281",
                "-Name": "兴化市"
              },
              {
                "-Id": "321282",
                "-Name": "靖江市"
              },
              {
                "-Id": "321283",
                "-Name": "泰兴市"
              },
              {
                "-Id": "321284",
                "-Name": "姜堰市"
              }
            ]
          },
          {
            "-Id": "321300",
            "-Name": "宿迁市",
            "district": [
              {
                "-Id": "321301",
                "-Name": "市辖区"
              },
              {
                "-Id": "321322",
                "-Name": "沭阳县"
              },
              {
                "-Id": "321323",
                "-Name": "泗阳县"
              },
              {
                "-Id": "321324",
                "-Name": "泗洪县"
              }
            ]
          }
        ]
      },
      {
        "-Id": "330000",
        "-Name": "浙江省",
        "city": [
          {
            "-Id": "330100",
            "-Name": "杭州市",
            "district": [
              {
                "-Id": "330101",
                "-Name": "市辖区"
              },
              {
                "-Id": "330122",
                "-Name": "桐庐县"
              },
              {
                "-Id": "330127",
                "-Name": "淳安县"
              },
              {
                "-Id": "330182",
                "-Name": "建德市"
              },
              {
                "-Id": "330183",
                "-Name": "富阳市"
              },
              {
                "-Id": "330185",
                "-Name": "临安市"
              }
            ]
          },
          {
            "-Id": "330200",
            "-Name": "宁波市",
            "district": [
              {
                "-Id": "330201",
                "-Name": "市辖区"
              },
              {
                "-Id": "330225",
                "-Name": "象山县"
              },
              {
                "-Id": "330226",
                "-Name": "宁海县"
              },
              {
                "-Id": "330281",
                "-Name": "余姚市"
              },
              {
                "-Id": "330282",
                "-Name": "慈溪市"
              },
              {
                "-Id": "330283",
                "-Name": "奉化市"
              }
            ]
          },
          {
            "-Id": "330300",
            "-Name": "温州市",
            "district": [
              {
                "-Id": "330301",
                "-Name": "市辖区"
              },
              {
                "-Id": "330322",
                "-Name": "洞头县"
              },
              {
                "-Id": "330324",
                "-Name": "永嘉县"
              },
              {
                "-Id": "330326",
                "-Name": "平阳县"
              },
              {
                "-Id": "330327",
                "-Name": "苍南县"
              },
              {
                "-Id": "330328",
                "-Name": "文成县"
              },
              {
                "-Id": "330329",
                "-Name": "泰顺县"
              },
              {
                "-Id": "330381",
                "-Name": "瑞安市"
              },
              {
                "-Id": "330382",
                "-Name": "乐清市"
              }
            ]
          },
          {
            "-Id": "330400",
            "-Name": "嘉兴市",
            "district": [
              {
                "-Id": "330401",
                "-Name": "市辖区"
              },
              {
                "-Id": "330421",
                "-Name": "嘉善县"
              },
              {
                "-Id": "330424",
                "-Name": "海盐县"
              },
              {
                "-Id": "330481",
                "-Name": "海宁市"
              },
              {
                "-Id": "330482",
                "-Name": "平湖市"
              },
              {
                "-Id": "330483",
                "-Name": "桐乡市"
              }
            ]
          },
          {
            "-Id": "330500",
            "-Name": "湖州市",
            "district": [
              {
                "-Id": "330501",
                "-Name": "市辖区"
              },
              {
                "-Id": "330521",
                "-Name": "德清县"
              },
              {
                "-Id": "330522",
                "-Name": "长兴县"
              },
              {
                "-Id": "330523",
                "-Name": "安吉县"
              }
            ]
          },
          {
            "-Id": "330600",
            "-Name": "绍兴市",
            "district": [
              {
                "-Id": "330601",
                "-Name": "市辖区"
              },
              {
                "-Id": "330621",
                "-Name": "绍兴县"
              },
              {
                "-Id": "330624",
                "-Name": "新昌县"
              },
              {
                "-Id": "330681",
                "-Name": "诸暨市"
              },
              {
                "-Id": "330682",
                "-Name": "上虞市"
              },
              {
                "-Id": "330683",
                "-Name": "嵊州市"
              }
            ]
          },
          {
            "-Id": "330700",
            "-Name": "金华市",
            "district": [
              {
                "-Id": "330701",
                "-Name": "市辖区"
              },
              {
                "-Id": "330723",
                "-Name": "武义县"
              },
              {
                "-Id": "330726",
                "-Name": "浦江县"
              },
              {
                "-Id": "330727",
                "-Name": "磐安县"
              },
              {
                "-Id": "330781",
                "-Name": "兰溪市"
              },
              {
                "-Id": "330782",
                "-Name": "义乌市"
              },
              {
                "-Id": "330783",
                "-Name": "东阳市"
              },
              {
                "-Id": "330784",
                "-Name": "永康市"
              }
            ]
          },
          {
            "-Id": "330800",
            "-Name": "衢州市",
            "district": [
              {
                "-Id": "330801",
                "-Name": "市辖区"
              },
              {
                "-Id": "330822",
                "-Name": "常山县"
              },
              {
                "-Id": "330824",
                "-Name": "开化县"
              },
              {
                "-Id": "330825",
                "-Name": "龙游县"
              },
              {
                "-Id": "330881",
                "-Name": "江山市"
              }
            ]
          },
          {
            "-Id": "330900",
            "-Name": "舟山市",
            "district": [
              {
                "-Id": "330901",
                "-Name": "市辖区"
              },
              {
                "-Id": "330921",
                "-Name": "岱山县"
              },
              {
                "-Id": "330922",
                "-Name": "嵊泗县"
              }
            ]
          },
          {
            "-Id": "331000",
            "-Name": "台州市",
            "district": [
              {
                "-Id": "331001",
                "-Name": "市辖区"
              },
              {
                "-Id": "331021",
                "-Name": "玉环县"
              },
              {
                "-Id": "331022",
                "-Name": "三门县"
              },
              {
                "-Id": "331023",
                "-Name": "天台县"
              },
              {
                "-Id": "331024",
                "-Name": "仙居县"
              },
              {
                "-Id": "331081",
                "-Name": "温岭市"
              },
              {
                "-Id": "331082",
                "-Name": "临海市"
              }
            ]
          },
          {
            "-Id": "331100",
            "-Name": "丽水市",
            "district": [
              {
                "-Id": "331101",
                "-Name": "市辖区"
              },
              {
                "-Id": "331121",
                "-Name": "青田县"
              },
              {
                "-Id": "331122",
                "-Name": "缙云县"
              },
              {
                "-Id": "331123",
                "-Name": "遂昌县"
              },
              {
                "-Id": "331124",
                "-Name": "松阳县"
              },
              {
                "-Id": "331125",
                "-Name": "云和县"
              },
              {
                "-Id": "331126",
                "-Name": "庆元县"
              },
              {
                "-Id": "331127",
                "-Name": "景宁畲族自治县"
              },
              {
                "-Id": "331181",
                "-Name": "龙泉市"
              }
            ]
          }
        ]
      },
      {
        "-Id": "340000",
        "-Name": "安徽省",
        "city": [
          {
            "-Id": "340100",
            "-Name": "合肥市",
            "district": [
              {
                "-Id": "340101",
                "-Name": "市辖区"
              },
              {
                "-Id": "340121",
                "-Name": "长丰县"
              },
              {
                "-Id": "340122",
                "-Name": "肥东县"
              },
              {
                "-Id": "340123",
                "-Name": "肥西县"
              },
              {
                "-Id": "340124",
                "-Name": "庐江县"
              },
              {
                "-Id": "340181",
                "-Name": "巢湖市"
              }
            ]
          },
          {
            "-Id": "340200",
            "-Name": "芜湖市",
            "district": [
              {
                "-Id": "340201",
                "-Name": "市辖区"
              },
              {
                "-Id": "340221",
                "-Name": "芜湖县"
              },
              {
                "-Id": "340222",
                "-Name": "繁昌县"
              },
              {
                "-Id": "340223",
                "-Name": "南陵县"
              },
              {
                "-Id": "340225",
                "-Name": "无为县"
              }
            ]
          },
          {
            "-Id": "340300",
            "-Name": "蚌埠市",
            "district": [
              {
                "-Id": "340301",
                "-Name": "市辖区"
              },
              {
                "-Id": "340321",
                "-Name": "怀远县"
              },
              {
                "-Id": "340322",
                "-Name": "五河县"
              },
              {
                "-Id": "340323",
                "-Name": "固镇县"
              }
            ]
          },
          {
            "-Id": "340400",
            "-Name": "淮南市",
            "district": [
              {
                "-Id": "340401",
                "-Name": "市辖区"
              },
              {
                "-Id": "340421",
                "-Name": "凤台县"
              }
            ]
          },
          {
            "-Id": "340500",
            "-Name": "马鞍山市",
            "district": [
              {
                "-Id": "340501",
                "-Name": "市辖区"
              },
              {
                "-Id": "340521",
                "-Name": "当涂县"
              },
              {
                "-Id": "340522",
                "-Name": "含山县"
              },
              {
                "-Id": "340523",
                "-Name": "和县"
              }
            ]
          },
          {
            "-Id": "340600",
            "-Name": "淮北市",
            "district": [
              {
                "-Id": "340601",
                "-Name": "市辖区"
              },
              {
                "-Id": "340621",
                "-Name": "濉溪县"
              }
            ]
          },
          {
            "-Id": "340700",
            "-Name": "铜陵市",
            "district": [
              {
                "-Id": "340701",
                "-Name": "市辖区"
              },
              {
                "-Id": "340721",
                "-Name": "铜陵县"
              }
            ]
          },
          {
            "-Id": "340800",
            "-Name": "安庆市",
            "district": [
              {
                "-Id": "340801",
                "-Name": "市辖区"
              },
              {
                "-Id": "340822",
                "-Name": "怀宁县"
              },
              {
                "-Id": "340823",
                "-Name": "枞阳县"
              },
              {
                "-Id": "340824",
                "-Name": "潜山县"
              },
              {
                "-Id": "340825",
                "-Name": "太湖县"
              },
              {
                "-Id": "340826",
                "-Name": "宿松县"
              },
              {
                "-Id": "340827",
                "-Name": "望江县"
              },
              {
                "-Id": "340828",
                "-Name": "岳西县"
              },
              {
                "-Id": "340881",
                "-Name": "桐城市"
              }
            ]
          },
          {
            "-Id": "341000",
            "-Name": "黄山市",
            "district": [
              {
                "-Id": "341001",
                "-Name": "黄山区"
              },
              {
                "-Id": "341002",
                "-Name": "屯溪区"
              },
              {
                "-Id": "341004",
                "-Name": "徽州区"
              },
              {
                "-Id": "341021",
                "-Name": "歙县"
              },
              {
                "-Id": "341022",
                "-Name": "休宁县"
              },
              {
                "-Id": "341023",
                "-Name": "黟县"
              },
              {
                "-Id": "341024",
                "-Name": "祁门县"
              },
              {
                "-Id": "341091",
                "-Name": "汤口镇"
              }
            ]
          },
          {
            "-Id": "341100",
            "-Name": "滁州市",
            "district": [
              {
                "-Id": "341101",
                "-Name": "市辖区"
              },
              {
                "-Id": "341122",
                "-Name": "来安县"
              },
              {
                "-Id": "341124",
                "-Name": "全椒县"
              },
              {
                "-Id": "341125",
                "-Name": "定远县"
              },
              {
                "-Id": "341126",
                "-Name": "凤阳县"
              },
              {
                "-Id": "341181",
                "-Name": "天长市"
              },
              {
                "-Id": "341182",
                "-Name": "明光市"
              }
            ]
          },
          {
            "-Id": "341200",
            "-Name": "阜阳市",
            "district": [
              {
                "-Id": "341201",
                "-Name": "颍泉区"
              },
              {
                "-Id": "341202",
                "-Name": "颍州区"
              },
              {
                "-Id": "341203",
                "-Name": "颍东区"
              },
              {
                "-Id": "341221",
                "-Name": "临泉县"
              },
              {
                "-Id": "341222",
                "-Name": "太和县"
              },
              {
                "-Id": "341225",
                "-Name": "阜南县"
              },
              {
                "-Id": "341226",
                "-Name": "颍上县"
              },
              {
                "-Id": "341282",
                "-Name": "界首市"
              }
            ]
          },
          {
            "-Id": "341300",
            "-Name": "宿州市",
            "district": [
              {
                "-Id": "341301",
                "-Name": "市辖区"
              },
              {
                "-Id": "341321",
                "-Name": "砀山县"
              },
              {
                "-Id": "341322",
                "-Name": "萧县"
              },
              {
                "-Id": "341323",
                "-Name": "灵璧县"
              },
              {
                "-Id": "341324",
                "-Name": "泗县"
              }
            ]
          },
          {
            "-Id": "341500",
            "-Name": "六安市",
            "district": [
              {
                "-Id": "341501",
                "-Name": "市辖区"
              },
              {
                "-Id": "341521",
                "-Name": "寿县"
              },
              {
                "-Id": "341522",
                "-Name": "霍邱县"
              },
              {
                "-Id": "341523",
                "-Name": "舒城县"
              },
              {
                "-Id": "341524",
                "-Name": "金寨县"
              },
              {
                "-Id": "341525",
                "-Name": "霍山县"
              }
            ]
          },
          {
            "-Id": "341600",
            "-Name": "亳州市",
            "district": [
              {
                "-Id": "341601",
                "-Name": "谯城区"
              },
              {
                "-Id": "341621",
                "-Name": "涡阳县"
              },
              {
                "-Id": "341622",
                "-Name": "蒙城县"
              },
              {
                "-Id": "341623",
                "-Name": "利辛县"
              }
            ]
          },
          {
            "-Id": "341700",
            "-Name": "池州市",
            "district": [
              {
                "-Id": "341701",
                "-Name": "市辖区"
              },
              {
                "-Id": "341721",
                "-Name": "东至县"
              },
              {
                "-Id": "341722",
                "-Name": "石台县"
              },
              {
                "-Id": "341723",
                "-Name": "青阳县"
              }
            ]
          },
          {
            "-Id": "341800",
            "-Name": "宣城市",
            "district": [
              {
                "-Id": "341801",
                "-Name": "市辖区"
              },
              {
                "-Id": "341821",
                "-Name": "郎溪县"
              },
              {
                "-Id": "341822",
                "-Name": "广德县"
              },
              {
                "-Id": "341823",
                "-Name": "泾县"
              },
              {
                "-Id": "341824",
                "-Name": "绩溪县"
              },
              {
                "-Id": "341825",
                "-Name": "旌德县"
              },
              {
                "-Id": "341881",
                "-Name": "宁国市"
              }
            ]
          }
        ]
      },
      {
        "-Id": "350000",
        "-Name": "福建省",
        "city": [
          {
            "-Id": "350100",
            "-Name": "福州市",
            "district": [
              {
                "-Id": "350101",
                "-Name": "市辖区"
              },
              {
                "-Id": "350121",
                "-Name": "闽侯县"
              },
              {
                "-Id": "350122",
                "-Name": "连江县"
              },
              {
                "-Id": "350123",
                "-Name": "罗源县"
              },
              {
                "-Id": "350124",
                "-Name": "闽清县"
              },
              {
                "-Id": "350125",
                "-Name": "永泰县"
              },
              {
                "-Id": "350128",
                "-Name": "平潭县"
              },
              {
                "-Id": "350181",
                "-Name": "福清市"
              },
              {
                "-Id": "350182",
                "-Name": "长乐市"
              }
            ]
          },
          {
            "-Id": "350200",
            "-Name": "厦门市",
            "district": {
              "-Id": "350201",
              "-Name": "市辖区"
            }
          },
          {
            "-Id": "350300",
            "-Name": "莆田市",
            "district": [
              {
                "-Id": "350301",
                "-Name": "市辖区"
              },
              {
                "-Id": "350322",
                "-Name": "仙游县"
              }
            ]
          },
          {
            "-Id": "350400",
            "-Name": "三明市",
            "district": [
              {
                "-Id": "350401",
                "-Name": "市辖区"
              },
              {
                "-Id": "350421",
                "-Name": "明溪县"
              },
              {
                "-Id": "350423",
                "-Name": "清流县"
              },
              {
                "-Id": "350424",
                "-Name": "宁化县"
              },
              {
                "-Id": "350425",
                "-Name": "大田县"
              },
              {
                "-Id": "350426",
                "-Name": "尤溪县"
              },
              {
                "-Id": "350427",
                "-Name": "沙县"
              },
              {
                "-Id": "350428",
                "-Name": "将乐县"
              },
              {
                "-Id": "350429",
                "-Name": "泰宁县"
              },
              {
                "-Id": "350430",
                "-Name": "建宁县"
              },
              {
                "-Id": "350481",
                "-Name": "永安市"
              }
            ]
          },
          {
            "-Id": "350500",
            "-Name": "泉州市",
            "district": [
              {
                "-Id": "350501",
                "-Name": "市辖区"
              },
              {
                "-Id": "350521",
                "-Name": "惠安县"
              },
              {
                "-Id": "350524",
                "-Name": "安溪县"
              },
              {
                "-Id": "350525",
                "-Name": "永春县"
              },
              {
                "-Id": "350526",
                "-Name": "德化县"
              },
              {
                "-Id": "350527",
                "-Name": "金门县"
              },
              {
                "-Id": "350581",
                "-Name": "石狮市"
              },
              {
                "-Id": "350582",
                "-Name": "晋江市"
              },
              {
                "-Id": "350583",
                "-Name": "南安市"
              }
            ]
          },
          {
            "-Id": "350600",
            "-Name": "漳州市",
            "district": [
              {
                "-Id": "350601",
                "-Name": "市辖区"
              },
              {
                "-Id": "350622",
                "-Name": "云霄县"
              },
              {
                "-Id": "350623",
                "-Name": "漳浦县"
              },
              {
                "-Id": "350624",
                "-Name": "诏安县"
              },
              {
                "-Id": "350625",
                "-Name": "长泰县"
              },
              {
                "-Id": "350626",
                "-Name": "东山县"
              },
              {
                "-Id": "350627",
                "-Name": "南靖县"
              },
              {
                "-Id": "350628",
                "-Name": "平和县"
              },
              {
                "-Id": "350629",
                "-Name": "华安县"
              },
              {
                "-Id": "350681",
                "-Name": "龙海市"
              }
            ]
          },
          {
            "-Id": "350700",
            "-Name": "南平市",
            "district": [
              {
                "-Id": "350701",
                "-Name": "市辖区"
              },
              {
                "-Id": "350721",
                "-Name": "顺昌县"
              },
              {
                "-Id": "350722",
                "-Name": "浦城县"
              },
              {
                "-Id": "350723",
                "-Name": "光泽县"
              },
              {
                "-Id": "350724",
                "-Name": "松溪县"
              },
              {
                "-Id": "350725",
                "-Name": "政和县"
              },
              {
                "-Id": "350781",
                "-Name": "邵武市"
              },
              {
                "-Id": "350782",
                "-Name": "武夷山市"
              },
              {
                "-Id": "350783",
                "-Name": "建瓯市"
              },
              {
                "-Id": "350784",
                "-Name": "建阳市"
              }
            ]
          },
          {
            "-Id": "350800",
            "-Name": "龙岩市",
            "district": [
              {
                "-Id": "350801",
                "-Name": "市辖区"
              },
              {
                "-Id": "350821",
                "-Name": "长汀县"
              },
              {
                "-Id": "350822",
                "-Name": "永定县"
              },
              {
                "-Id": "350823",
                "-Name": "上杭县"
              },
              {
                "-Id": "350824",
                "-Name": "武平县"
              },
              {
                "-Id": "350825",
                "-Name": "连城县"
              },
              {
                "-Id": "350881",
                "-Name": "漳平市"
              }
            ]
          },
          {
            "-Id": "350900",
            "-Name": "宁德市",
            "district": [
              {
                "-Id": "350901",
                "-Name": "市辖区"
              },
              {
                "-Id": "350921",
                "-Name": "霞浦县"
              },
              {
                "-Id": "350922",
                "-Name": "古田县"
              },
              {
                "-Id": "350923",
                "-Name": "屏南县"
              },
              {
                "-Id": "350924",
                "-Name": "寿宁县"
              },
              {
                "-Id": "350925",
                "-Name": "周宁县"
              },
              {
                "-Id": "350926",
                "-Name": "柘荣县"
              },
              {
                "-Id": "350981",
                "-Name": "福安市"
              },
              {
                "-Id": "350982",
                "-Name": "福鼎市"
              }
            ]
          }
        ]
      },
      {
        "-Id": "360000",
        "-Name": "江西省",
        "city": [
          {
            "-Id": "360100",
            "-Name": "南昌市",
            "district": [
              {
                "-Id": "360101",
                "-Name": "市辖区"
              },
              {
                "-Id": "360121",
                "-Name": "南昌县"
              },
              {
                "-Id": "360122",
                "-Name": "新建县"
              },
              {
                "-Id": "360123",
                "-Name": "安义县"
              },
              {
                "-Id": "360124",
                "-Name": "进贤县"
              }
            ]
          },
          {
            "-Id": "360200",
            "-Name": "景德镇市",
            "district": [
              {
                "-Id": "360201",
                "-Name": "市辖区"
              },
              {
                "-Id": "360222",
                "-Name": "浮梁县"
              },
              {
                "-Id": "360281",
                "-Name": "乐平市"
              }
            ]
          },
          {
            "-Id": "360300",
            "-Name": "萍乡市",
            "district": [
              {
                "-Id": "360301",
                "-Name": "市辖区"
              },
              {
                "-Id": "360321",
                "-Name": "莲花县"
              },
              {
                "-Id": "360322",
                "-Name": "上栗县"
              },
              {
                "-Id": "360323",
                "-Name": "芦溪县"
              }
            ]
          },
          {
            "-Id": "360400",
            "-Name": "九江市",
            "district": [
              {
                "-Id": "360401",
                "-Name": "市辖区"
              },
              {
                "-Id": "360421",
                "-Name": "九江县"
              },
              {
                "-Id": "360423",
                "-Name": "武宁县"
              },
              {
                "-Id": "360424",
                "-Name": "修水县"
              },
              {
                "-Id": "360425",
                "-Name": "永修县"
              },
              {
                "-Id": "360426",
                "-Name": "德安县"
              },
              {
                "-Id": "360427",
                "-Name": "星子县"
              },
              {
                "-Id": "360428",
                "-Name": "都昌县"
              },
              {
                "-Id": "360429",
                "-Name": "湖口县"
              },
              {
                "-Id": "360430",
                "-Name": "彭泽县"
              },
              {
                "-Id": "360481",
                "-Name": "瑞昌市"
              },
              {
                "-Id": "360482",
                "-Name": "共青城市"
              }
            ]
          },
          {
            "-Id": "360500",
            "-Name": "新余市",
            "district": [
              {
                "-Id": "360501",
                "-Name": "市辖区"
              },
              {
                "-Id": "360521",
                "-Name": "分宜县"
              }
            ]
          },
          {
            "-Id": "360600",
            "-Name": "鹰潭市",
            "district": [
              {
                "-Id": "360601",
                "-Name": "市辖区"
              },
              {
                "-Id": "360622",
                "-Name": "余江县"
              },
              {
                "-Id": "360681",
                "-Name": "贵溪市"
              }
            ]
          },
          {
            "-Id": "360700",
            "-Name": "赣州市",
            "district": [
              {
                "-Id": "360701",
                "-Name": "市辖区"
              },
              {
                "-Id": "360721",
                "-Name": "赣县"
              },
              {
                "-Id": "360722",
                "-Name": "信丰县"
              },
              {
                "-Id": "360723",
                "-Name": "大余县"
              },
              {
                "-Id": "360724",
                "-Name": "上犹县"
              },
              {
                "-Id": "360725",
                "-Name": "崇义县"
              },
              {
                "-Id": "360726",
                "-Name": "安远县"
              },
              {
                "-Id": "360727",
                "-Name": "龙南县"
              },
              {
                "-Id": "360728",
                "-Name": "定南县"
              },
              {
                "-Id": "360729",
                "-Name": "全南县"
              },
              {
                "-Id": "360730",
                "-Name": "宁都县"
              },
              {
                "-Id": "360731",
                "-Name": "于都县"
              },
              {
                "-Id": "360732",
                "-Name": "兴国县"
              },
              {
                "-Id": "360733",
                "-Name": "会昌县"
              },
              {
                "-Id": "360734",
                "-Name": "寻乌县"
              },
              {
                "-Id": "360735",
                "-Name": "石城县"
              },
              {
                "-Id": "360781",
                "-Name": "瑞金市"
              },
              {
                "-Id": "360782",
                "-Name": "南康市"
              }
            ]
          },
          {
            "-Id": "360800",
            "-Name": "吉安市",
            "district": [
              {
                "-Id": "360801",
                "-Name": "市辖区"
              },
              {
                "-Id": "360821",
                "-Name": "吉安县"
              },
              {
                "-Id": "360822",
                "-Name": "吉水县"
              },
              {
                "-Id": "360823",
                "-Name": "峡江县"
              },
              {
                "-Id": "360824",
                "-Name": "新干县"
              },
              {
                "-Id": "360825",
                "-Name": "永丰县"
              },
              {
                "-Id": "360826",
                "-Name": "泰和县"
              },
              {
                "-Id": "360827",
                "-Name": "遂川县"
              },
              {
                "-Id": "360828",
                "-Name": "万安县"
              },
              {
                "-Id": "360829",
                "-Name": "安福县"
              },
              {
                "-Id": "360830",
                "-Name": "永新县"
              },
              {
                "-Id": "360881",
                "-Name": "井冈山市"
              }
            ]
          },
          {
            "-Id": "360900",
            "-Name": "宜春市",
            "district": [
              {
                "-Id": "360901",
                "-Name": "市辖区"
              },
              {
                "-Id": "360921",
                "-Name": "奉新县"
              },
              {
                "-Id": "360922",
                "-Name": "万载县"
              },
              {
                "-Id": "360923",
                "-Name": "上高县"
              },
              {
                "-Id": "360924",
                "-Name": "宜丰县"
              },
              {
                "-Id": "360925",
                "-Name": "靖安县"
              },
              {
                "-Id": "360926",
                "-Name": "铜鼓县"
              },
              {
                "-Id": "360981",
                "-Name": "丰城市"
              },
              {
                "-Id": "360982",
                "-Name": "樟树市"
              },
              {
                "-Id": "360983",
                "-Name": "高安市"
              }
            ]
          },
          {
            "-Id": "361000",
            "-Name": "抚州市",
            "district": [
              {
                "-Id": "361001",
                "-Name": "市辖区"
              },
              {
                "-Id": "361021",
                "-Name": "南城县"
              },
              {
                "-Id": "361022",
                "-Name": "黎川县"
              },
              {
                "-Id": "361023",
                "-Name": "南丰县"
              },
              {
                "-Id": "361024",
                "-Name": "崇仁县"
              },
              {
                "-Id": "361025",
                "-Name": "乐安县"
              },
              {
                "-Id": "361026",
                "-Name": "宜黄县"
              },
              {
                "-Id": "361027",
                "-Name": "金溪县"
              },
              {
                "-Id": "361028",
                "-Name": "资溪县"
              },
              {
                "-Id": "361029",
                "-Name": "东乡县"
              },
              {
                "-Id": "361030",
                "-Name": "广昌县"
              }
            ]
          },
          {
            "-Id": "361100",
            "-Name": "上饶市",
            "district": [
              {
                "-Id": "361101",
                "-Name": "市辖区"
              },
              {
                "-Id": "361121",
                "-Name": "上饶县"
              },
              {
                "-Id": "361122",
                "-Name": "广丰县"
              },
              {
                "-Id": "361123",
                "-Name": "玉山县"
              },
              {
                "-Id": "361124",
                "-Name": "铅山县"
              },
              {
                "-Id": "361125",
                "-Name": "横峰县"
              },
              {
                "-Id": "361126",
                "-Name": "弋阳县"
              },
              {
                "-Id": "361127",
                "-Name": "余干县"
              },
              {
                "-Id": "361128",
                "-Name": "鄱阳县"
              },
              {
                "-Id": "361129",
                "-Name": "万年县"
              },
              {
                "-Id": "361130",
                "-Name": "婺源县"
              },
              {
                "-Id": "361181",
                "-Name": "德兴市"
              }
            ]
          }
        ]
      },
      {
        "-Id": "370000",
        "-Name": "山东省",
        "city": [
          {
            "-Id": "370100",
            "-Name": "济南市",
            "district": [
              {
                "-Id": "370101",
                "-Name": "市辖区"
              },
              {
                "-Id": "370124",
                "-Name": "平阴县"
              },
              {
                "-Id": "370125",
                "-Name": "济阳县"
              },
              {
                "-Id": "370126",
                "-Name": "商河县"
              },
              {
                "-Id": "370181",
                "-Name": "章丘市"
              }
            ]
          },
          {
            "-Id": "370200",
            "-Name": "青岛市",
            "district": [
              {
                "-Id": "370201",
                "-Name": "市辖区"
              },
              {
                "-Id": "370281",
                "-Name": "胶州市"
              },
              {
                "-Id": "370282",
                "-Name": "即墨市"
              },
              {
                "-Id": "370283",
                "-Name": "平度市"
              },
              {
                "-Id": "370284",
                "-Name": "胶南市"
              },
              {
                "-Id": "370285",
                "-Name": "莱西市"
              }
            ]
          },
          {
            "-Id": "370300",
            "-Name": "淄博市",
            "district": [
              {
                "-Id": "370301",
                "-Name": "市辖区"
              },
              {
                "-Id": "370321",
                "-Name": "桓台县"
              },
              {
                "-Id": "370322",
                "-Name": "高青县"
              },
              {
                "-Id": "370323",
                "-Name": "沂源县"
              }
            ]
          },
          {
            "-Id": "370400",
            "-Name": "枣庄市",
            "district": [
              {
                "-Id": "370401",
                "-Name": "市辖区"
              },
              {
                "-Id": "370481",
                "-Name": "滕州市"
              }
            ]
          },
          {
            "-Id": "370500",
            "-Name": "东营市",
            "district": [
              {
                "-Id": "370501",
                "-Name": "市辖区"
              },
              {
                "-Id": "370521",
                "-Name": "垦利县"
              },
              {
                "-Id": "370522",
                "-Name": "利津县"
              },
              {
                "-Id": "370523",
                "-Name": "广饶县"
              }
            ]
          },
          {
            "-Id": "370600",
            "-Name": "烟台市",
            "district": [
              {
                "-Id": "370601",
                "-Name": "市辖区"
              },
              {
                "-Id": "370634",
                "-Name": "长岛县"
              },
              {
                "-Id": "370681",
                "-Name": "龙口市"
              },
              {
                "-Id": "370682",
                "-Name": "莱阳市"
              },
              {
                "-Id": "370683",
                "-Name": "莱州市"
              },
              {
                "-Id": "370684",
                "-Name": "蓬莱市"
              },
              {
                "-Id": "370685",
                "-Name": "招远市"
              },
              {
                "-Id": "370686",
                "-Name": "栖霞市"
              },
              {
                "-Id": "370687",
                "-Name": "海阳市"
              }
            ]
          },
          {
            "-Id": "370700",
            "-Name": "潍坊市",
            "district": [
              {
                "-Id": "370701",
                "-Name": "市辖区"
              },
              {
                "-Id": "370724",
                "-Name": "临朐县"
              },
              {
                "-Id": "370725",
                "-Name": "昌乐县"
              },
              {
                "-Id": "370781",
                "-Name": "青州市"
              },
              {
                "-Id": "370782",
                "-Name": "诸城市"
              },
              {
                "-Id": "370783",
                "-Name": "寿光市"
              },
              {
                "-Id": "370784",
                "-Name": "安丘市"
              },
              {
                "-Id": "370785",
                "-Name": "高密市"
              },
              {
                "-Id": "370786",
                "-Name": "昌邑市"
              }
            ]
          },
          {
            "-Id": "370800",
            "-Name": "济宁市",
            "district": [
              {
                "-Id": "370801",
                "-Name": "市辖区"
              },
              {
                "-Id": "370826",
                "-Name": "微山县"
              },
              {
                "-Id": "370827",
                "-Name": "鱼台县"
              },
              {
                "-Id": "370828",
                "-Name": "金乡县"
              },
              {
                "-Id": "370829",
                "-Name": "嘉祥县"
              },
              {
                "-Id": "370830",
                "-Name": "汶上县"
              },
              {
                "-Id": "370831",
                "-Name": "泗水县"
              },
              {
                "-Id": "370832",
                "-Name": "梁山县"
              },
              {
                "-Id": "370881",
                "-Name": "曲阜市"
              },
              {
                "-Id": "370882",
                "-Name": "兖州市"
              },
              {
                "-Id": "370883",
                "-Name": "邹城市"
              }
            ]
          },
          {
            "-Id": "370900",
            "-Name": "泰安市",
            "district": [
              {
                "-Id": "370901",
                "-Name": "岱岳区"
              },
              {
                "-Id": "370902",
                "-Name": "泰山区"
              },
              {
                "-Id": "370921",
                "-Name": "宁阳县"
              },
              {
                "-Id": "370923",
                "-Name": "东平县"
              },
              {
                "-Id": "370982",
                "-Name": "新泰市"
              },
              {
                "-Id": "370983",
                "-Name": "肥城市"
              }
            ]
          },
          {
            "-Id": "371000",
            "-Name": "威海市",
            "district": [
              {
                "-Id": "371001",
                "-Name": "市辖区"
              },
              {
                "-Id": "371081",
                "-Name": "文登市"
              },
              {
                "-Id": "371082",
                "-Name": "荣成市"
              },
              {
                "-Id": "371083",
                "-Name": "乳山市"
              }
            ]
          },
          {
            "-Id": "371100",
            "-Name": "日照市",
            "district": [
              {
                "-Id": "371101",
                "-Name": "市辖区"
              },
              {
                "-Id": "371121",
                "-Name": "五莲县"
              },
              {
                "-Id": "371122",
                "-Name": "莒县"
              }
            ]
          },
          {
            "-Id": "371200",
            "-Name": "莱芜市",
            "district": {
              "-Id": "371201",
              "-Name": "市辖区"
            }
          },
          {
            "-Id": "371300",
            "-Name": "临沂市",
            "district": [
              {
                "-Id": "371301",
                "-Name": "市辖区"
              },
              {
                "-Id": "371321",
                "-Name": "沂南县"
              },
              {
                "-Id": "371322",
                "-Name": "郯城县"
              },
              {
                "-Id": "371323",
                "-Name": "沂水县"
              },
              {
                "-Id": "371324",
                "-Name": "苍山县"
              },
              {
                "-Id": "371325",
                "-Name": "费县"
              },
              {
                "-Id": "371326",
                "-Name": "平邑县"
              },
              {
                "-Id": "371327",
                "-Name": "莒南县"
              },
              {
                "-Id": "371328",
                "-Name": "蒙阴县"
              },
              {
                "-Id": "371329",
                "-Name": "临沭县"
              }
            ]
          },
          {
            "-Id": "371400",
            "-Name": "德州市",
            "district": [
              {
                "-Id": "371401",
                "-Name": "市辖区"
              },
              {
                "-Id": "371421",
                "-Name": "陵县"
              },
              {
                "-Id": "371422",
                "-Name": "宁津县"
              },
              {
                "-Id": "371423",
                "-Name": "庆云县"
              },
              {
                "-Id": "371424",
                "-Name": "临邑县"
              },
              {
                "-Id": "371425",
                "-Name": "齐河县"
              },
              {
                "-Id": "371426",
                "-Name": "平原县"
              },
              {
                "-Id": "371427",
                "-Name": "夏津县"
              },
              {
                "-Id": "371428",
                "-Name": "武城县"
              },
              {
                "-Id": "371481",
                "-Name": "乐陵市"
              },
              {
                "-Id": "371482",
                "-Name": "禹城市"
              }
            ]
          },
          {
            "-Id": "371500",
            "-Name": "聊城市",
            "district": [
              {
                "-Id": "371501",
                "-Name": "市辖区"
              },
              {
                "-Id": "371521",
                "-Name": "阳谷县"
              },
              {
                "-Id": "371522",
                "-Name": "莘县"
              },
              {
                "-Id": "371523",
                "-Name": "茌平县"
              },
              {
                "-Id": "371524",
                "-Name": "东阿县"
              },
              {
                "-Id": "371525",
                "-Name": "冠县"
              },
              {
                "-Id": "371526",
                "-Name": "高唐县"
              },
              {
                "-Id": "371581",
                "-Name": "临清市"
              }
            ]
          },
          {
            "-Id": "371600",
            "-Name": "滨州市",
            "district": [
              {
                "-Id": "371601",
                "-Name": "市辖区"
              },
              {
                "-Id": "371621",
                "-Name": "惠民县"
              },
              {
                "-Id": "371622",
                "-Name": "阳信县"
              },
              {
                "-Id": "371623",
                "-Name": "无棣县"
              },
              {
                "-Id": "371624",
                "-Name": "沾化县"
              },
              {
                "-Id": "371625",
                "-Name": "博兴县"
              },
              {
                "-Id": "371626",
                "-Name": "邹平县"
              }
            ]
          },
          {
            "-Id": "371700",
            "-Name": "菏泽市",
            "district": [
              {
                "-Id": "371701",
                "-Name": "市辖区"
              },
              {
                "-Id": "371721",
                "-Name": "曹县"
              },
              {
                "-Id": "371722",
                "-Name": "单县"
              },
              {
                "-Id": "371723",
                "-Name": "成武县"
              },
              {
                "-Id": "371724",
                "-Name": "巨野县"
              },
              {
                "-Id": "371725",
                "-Name": "郓城县"
              },
              {
                "-Id": "371726",
                "-Name": "鄄城县"
              },
              {
                "-Id": "371727",
                "-Name": "定陶县"
              },
              {
                "-Id": "371728",
                "-Name": "东明县"
              }
            ]
          }
        ]
      },
      {
        "-Id": "410000",
        "-Name": "河南省",
        "city": [
          {
            "-Id": "410100",
            "-Name": "郑州市",
            "district": [
              {
                "-Id": "410101",
                "-Name": "金水区"
              },
              {
                "-Id": "410102",
                "-Name": "中原区"
              },
              {
                "-Id": "410103",
                "-Name": "二七区"
              },
              {
                "-Id": "410104",
                "-Name": "管城回族区"
              },
              {
                "-Id": "410106",
                "-Name": "上街区"
              },
              {
                "-Id": "410108",
                "-Name": "惠济区"
              },
              {
                "-Id": "410122",
                "-Name": "中牟县"
              },
              {
                "-Id": "410181",
                "-Name": "巩义市"
              },
              {
                "-Id": "410182",
                "-Name": "荥阳市"
              },
              {
                "-Id": "410183",
                "-Name": "新密市"
              },
              {
                "-Id": "410184",
                "-Name": "新郑市"
              },
              {
                "-Id": "410185",
                "-Name": "登封市"
              }
            ]
          },
          {
            "-Id": "410200",
            "-Name": "开封市",
            "district": [
              {
                "-Id": "410201",
                "-Name": "市辖区"
              },
              {
                "-Id": "410221",
                "-Name": "杞县"
              },
              {
                "-Id": "410222",
                "-Name": "通许县"
              },
              {
                "-Id": "410223",
                "-Name": "尉氏县"
              },
              {
                "-Id": "410224",
                "-Name": "开封县"
              },
              {
                "-Id": "410225",
                "-Name": "兰考县"
              }
            ]
          },
          {
            "-Id": "410300",
            "-Name": "洛阳市",
            "district": [
              {
                "-Id": "410301",
                "-Name": "市辖区"
              },
              {
                "-Id": "410322",
                "-Name": "孟津县"
              },
              {
                "-Id": "410323",
                "-Name": "新安县"
              },
              {
                "-Id": "410324",
                "-Name": "栾川县"
              },
              {
                "-Id": "410325",
                "-Name": "嵩县"
              },
              {
                "-Id": "410326",
                "-Name": "汝阳县"
              },
              {
                "-Id": "410327",
                "-Name": "宜阳县"
              },
              {
                "-Id": "410328",
                "-Name": "洛宁县"
              },
              {
                "-Id": "410329",
                "-Name": "伊川县"
              },
              {
                "-Id": "410381",
                "-Name": "偃师市"
              }
            ]
          },
          {
            "-Id": "410400",
            "-Name": "平顶山市",
            "district": [
              {
                "-Id": "410401",
                "-Name": "市辖区"
              },
              {
                "-Id": "410421",
                "-Name": "宝丰县"
              },
              {
                "-Id": "410422",
                "-Name": "叶县"
              },
              {
                "-Id": "410423",
                "-Name": "鲁山县"
              },
              {
                "-Id": "410425",
                "-Name": "郏县"
              },
              {
                "-Id": "410481",
                "-Name": "舞钢市"
              },
              {
                "-Id": "410482",
                "-Name": "汝州市"
              }
            ]
          },
          {
            "-Id": "410500",
            "-Name": "安阳市",
            "district": [
              {
                "-Id": "410501",
                "-Name": "市辖区"
              },
              {
                "-Id": "410522",
                "-Name": "安阳县"
              },
              {
                "-Id": "410523",
                "-Name": "汤阴县"
              },
              {
                "-Id": "410526",
                "-Name": "滑县"
              },
              {
                "-Id": "410527",
                "-Name": "内黄县"
              },
              {
                "-Id": "410581",
                "-Name": "林州市"
              }
            ]
          },
          {
            "-Id": "410600",
            "-Name": "鹤壁市",
            "district": [
              {
                "-Id": "410601",
                "-Name": "市辖区"
              },
              {
                "-Id": "410621",
                "-Name": "浚县"
              },
              {
                "-Id": "410622",
                "-Name": "淇县"
              }
            ]
          },
          {
            "-Id": "410700",
            "-Name": "新乡市",
            "district": [
              {
                "-Id": "410701",
                "-Name": "市辖区"
              },
              {
                "-Id": "410702",
                "-Name": "红旗区"
              },
              {
                "-Id": "410703",
                "-Name": "卫滨区"
              },
              {
                "-Id": "410704",
                "-Name": "凤泉区"
              },
              {
                "-Id": "410711",
                "-Name": "牧野区"
              },
              {
                "-Id": "410721",
                "-Name": "新乡县"
              },
              {
                "-Id": "410724",
                "-Name": "获嘉县"
              },
              {
                "-Id": "410725",
                "-Name": "原阳县"
              },
              {
                "-Id": "410726",
                "-Name": "延津县"
              },
              {
                "-Id": "410727",
                "-Name": "封丘县"
              },
              {
                "-Id": "410728",
                "-Name": "长垣县"
              },
              {
                "-Id": "410781",
                "-Name": "卫辉市"
              },
              {
                "-Id": "410782",
                "-Name": "辉县市"
              }
            ]
          },
          {
            "-Id": "410800",
            "-Name": "焦作市",
            "district": [
              {
                "-Id": "410801",
                "-Name": "市辖区"
              },
              {
                "-Id": "410821",
                "-Name": "修武县"
              },
              {
                "-Id": "410822",
                "-Name": "博爱县"
              },
              {
                "-Id": "410823",
                "-Name": "武陟县"
              },
              {
                "-Id": "410825",
                "-Name": "温县"
              },
              {
                "-Id": "410882",
                "-Name": "沁阳市"
              },
              {
                "-Id": "410883",
                "-Name": "孟州市"
              }
            ]
          },
          {
            "-Id": "410900",
            "-Name": "濮阳市",
            "district": [
              {
                "-Id": "410901",
                "-Name": "市辖区"
              },
              {
                "-Id": "410922",
                "-Name": "清丰县"
              },
              {
                "-Id": "410923",
                "-Name": "南乐县"
              },
              {
                "-Id": "410926",
                "-Name": "范县"
              },
              {
                "-Id": "410927",
                "-Name": "台前县"
              },
              {
                "-Id": "410928",
                "-Name": "濮阳县"
              }
            ]
          },
          {
            "-Id": "411000",
            "-Name": "许昌市",
            "district": [
              {
                "-Id": "411001",
                "-Name": "市辖区"
              },
              {
                "-Id": "411023",
                "-Name": "许昌县"
              },
              {
                "-Id": "411024",
                "-Name": "鄢陵县"
              },
              {
                "-Id": "411025",
                "-Name": "襄城县"
              },
              {
                "-Id": "411081",
                "-Name": "禹州市"
              },
              {
                "-Id": "411082",
                "-Name": "长葛市"
              }
            ]
          },
          {
            "-Id": "411100",
            "-Name": "漯河市",
            "district": [
              {
                "-Id": "411101",
                "-Name": "召陵区"
              },
              {
                "-Id": "411102",
                "-Name": "源汇区"
              },
              {
                "-Id": "411103",
                "-Name": "郾城区"
              },
              {
                "-Id": "411121",
                "-Name": "舞阳县"
              },
              {
                "-Id": "411122",
                "-Name": "临颍县"
              }
            ]
          },
          {
            "-Id": "411200",
            "-Name": "三门峡市",
            "district": [
              {
                "-Id": "411201",
                "-Name": "市辖区"
              },
              {
                "-Id": "411221",
                "-Name": "渑池县"
              },
              {
                "-Id": "411222",
                "-Name": "陕县"
              },
              {
                "-Id": "411224",
                "-Name": "卢氏县"
              },
              {
                "-Id": "411281",
                "-Name": "义马市"
              },
              {
                "-Id": "411282",
                "-Name": "灵宝市"
              }
            ]
          },
          {
            "-Id": "411300",
            "-Name": "南阳市",
            "district": [
              {
                "-Id": "411301",
                "-Name": "市辖区"
              },
              {
                "-Id": "411321",
                "-Name": "南召县"
              },
              {
                "-Id": "411322",
                "-Name": "方城县"
              },
              {
                "-Id": "411323",
                "-Name": "西峡县"
              },
              {
                "-Id": "411324",
                "-Name": "镇平县"
              },
              {
                "-Id": "411325",
                "-Name": "内乡县"
              },
              {
                "-Id": "411326",
                "-Name": "淅川县"
              },
              {
                "-Id": "411327",
                "-Name": "社旗县"
              },
              {
                "-Id": "411328",
                "-Name": "唐河县"
              },
              {
                "-Id": "411329",
                "-Name": "新野县"
              },
              {
                "-Id": "411330",
                "-Name": "桐柏县"
              },
              {
                "-Id": "411381",
                "-Name": "邓州市"
              }
            ]
          },
          {
            "-Id": "411400",
            "-Name": "商丘市",
            "district": [
              {
                "-Id": "411401",
                "-Name": "市辖区"
              },
              {
                "-Id": "411402",
                "-Name": "梁园区"
              },
              {
                "-Id": "411403",
                "-Name": "睢阳区"
              },
              {
                "-Id": "411421",
                "-Name": "民权县"
              },
              {
                "-Id": "411422",
                "-Name": "睢县"
              },
              {
                "-Id": "411423",
                "-Name": "宁陵县"
              },
              {
                "-Id": "411424",
                "-Name": "柘城县"
              },
              {
                "-Id": "411425",
                "-Name": "虞城县"
              },
              {
                "-Id": "411426",
                "-Name": "夏邑县"
              },
              {
                "-Id": "411481",
                "-Name": "永城市"
              },
              {
                "-Id": "411482",
                "-Name": "新区"
              }
            ]
          },
          {
            "-Id": "411500",
            "-Name": "信阳市",
            "district": [
              {
                "-Id": "411501",
                "-Name": "市辖区"
              },
              {
                "-Id": "411521",
                "-Name": "罗山县"
              },
              {
                "-Id": "411522",
                "-Name": "光山县"
              },
              {
                "-Id": "411523",
                "-Name": "新县"
              },
              {
                "-Id": "411524",
                "-Name": "商城县"
              },
              {
                "-Id": "411525",
                "-Name": "固始县"
              },
              {
                "-Id": "411526",
                "-Name": "潢川县"
              },
              {
                "-Id": "411527",
                "-Name": "淮滨县"
              },
              {
                "-Id": "411528",
                "-Name": "息县"
              }
            ]
          },
          {
            "-Id": "411600",
            "-Name": "周口市",
            "district": [
              {
                "-Id": "411601",
                "-Name": "市辖区"
              },
              {
                "-Id": "411621",
                "-Name": "扶沟县"
              },
              {
                "-Id": "411622",
                "-Name": "西华县"
              },
              {
                "-Id": "411623",
                "-Name": "商水县"
              },
              {
                "-Id": "411624",
                "-Name": "沈丘县"
              },
              {
                "-Id": "411625",
                "-Name": "郸城县"
              },
              {
                "-Id": "411626",
                "-Name": "淮阳县"
              },
              {
                "-Id": "411627",
                "-Name": "太康县"
              },
              {
                "-Id": "411628",
                "-Name": "鹿邑县"
              },
              {
                "-Id": "411681",
                "-Name": "项城市"
              }
            ]
          },
          {
            "-Id": "411700",
            "-Name": "驻马店市",
            "district": [
              {
                "-Id": "411701",
                "-Name": "市辖区"
              },
              {
                "-Id": "411721",
                "-Name": "西平县"
              },
              {
                "-Id": "411722",
                "-Name": "上蔡县"
              },
              {
                "-Id": "411723",
                "-Name": "平舆县"
              },
              {
                "-Id": "411724",
                "-Name": "正阳县"
              },
              {
                "-Id": "411725",
                "-Name": "确山县"
              },
              {
                "-Id": "411726",
                "-Name": "泌阳县"
              },
              {
                "-Id": "411727",
                "-Name": "汝南县"
              },
              {
                "-Id": "411728",
                "-Name": "遂平县"
              },
              {
                "-Id": "411729",
                "-Name": "新蔡县"
              }
            ]
          },
          {
            "-Id": "411800",
            "-Name": "济源市",
            "district": {
              "-Id": "411801",
              "-Name": "市辖区"
            }
          }
        ]
      },
      {
        "-Id": "420000",
        "-Name": "湖北省",
        "city": [
          {
            "-Id": "420100",
            "-Name": "武汉市",
            "district": [
              {
                "-Id": "420101",
                "-Name": "市辖区"
              },
              {
                "-Id": "420117",
                "-Name": "新洲区"
              }
            ]
          },
          {
            "-Id": "420200",
            "-Name": "黄石市",
            "district": [
              {
                "-Id": "420201",
                "-Name": "市辖区"
              },
              {
                "-Id": "420222",
                "-Name": "阳新县"
              },
              {
                "-Id": "420281",
                "-Name": "大冶市"
              }
            ]
          },
          {
            "-Id": "420300",
            "-Name": "十堰市",
            "district": [
              {
                "-Id": "420301",
                "-Name": "市辖区"
              },
              {
                "-Id": "420321",
                "-Name": "郧县"
              },
              {
                "-Id": "420322",
                "-Name": "郧西县"
              },
              {
                "-Id": "420323",
                "-Name": "竹山县"
              },
              {
                "-Id": "420324",
                "-Name": "竹溪县"
              },
              {
                "-Id": "420325",
                "-Name": "房县"
              },
              {
                "-Id": "420381",
                "-Name": "丹江口市"
              }
            ]
          },
          {
            "-Id": "420500",
            "-Name": "宜昌市",
            "district": [
              {
                "-Id": "420501",
                "-Name": "市辖区"
              },
              {
                "-Id": "420525",
                "-Name": "远安县"
              },
              {
                "-Id": "420526",
                "-Name": "兴山县"
              },
              {
                "-Id": "420527",
                "-Name": "秭归县"
              },
              {
                "-Id": "420528",
                "-Name": "长阳土家族自治县"
              },
              {
                "-Id": "420529",
                "-Name": "五峰土家族自治县"
              },
              {
                "-Id": "420581",
                "-Name": "宜都市"
              },
              {
                "-Id": "420582",
                "-Name": "当阳市"
              },
              {
                "-Id": "420583",
                "-Name": "枝江市"
              }
            ]
          },
          {
            "-Id": "420600",
            "-Name": "襄阳市",
            "district": [
              {
                "-Id": "420601",
                "-Name": "市辖区"
              },
              {
                "-Id": "420624",
                "-Name": "南漳县"
              },
              {
                "-Id": "420625",
                "-Name": "谷城县"
              },
              {
                "-Id": "420626",
                "-Name": "保康县"
              },
              {
                "-Id": "420682",
                "-Name": "老河口市"
              },
              {
                "-Id": "420683",
                "-Name": "枣阳市"
              },
              {
                "-Id": "420684",
                "-Name": "宜城市"
              }
            ]
          },
          {
            "-Id": "420700",
            "-Name": "鄂州市",
            "district": {
              "-Id": "420701",
              "-Name": "市辖区"
            }
          },
          {
            "-Id": "420800",
            "-Name": "荆门市",
            "district": [
              {
                "-Id": "420801",
                "-Name": "市辖区"
              },
              {
                "-Id": "420821",
                "-Name": "京山县"
              },
              {
                "-Id": "420822",
                "-Name": "沙洋县"
              },
              {
                "-Id": "420881",
                "-Name": "钟祥市"
              }
            ]
          },
          {
            "-Id": "420900",
            "-Name": "孝感市",
            "district": [
              {
                "-Id": "420901",
                "-Name": "市辖区"
              },
              {
                "-Id": "420921",
                "-Name": "孝昌县"
              },
              {
                "-Id": "420922",
                "-Name": "大悟县"
              },
              {
                "-Id": "420923",
                "-Name": "云梦县"
              },
              {
                "-Id": "420981",
                "-Name": "应城市"
              },
              {
                "-Id": "420982",
                "-Name": "安陆市"
              },
              {
                "-Id": "420984",
                "-Name": "汉川市"
              }
            ]
          },
          {
            "-Id": "421000",
            "-Name": "荆州市",
            "district": [
              {
                "-Id": "421001",
                "-Name": "市辖区"
              },
              {
                "-Id": "421022",
                "-Name": "公安县"
              },
              {
                "-Id": "421023",
                "-Name": "监利县"
              },
              {
                "-Id": "421024",
                "-Name": "江陵县"
              },
              {
                "-Id": "421081",
                "-Name": "石首市"
              },
              {
                "-Id": "421083",
                "-Name": "洪湖市"
              },
              {
                "-Id": "421087",
                "-Name": "松滋市"
              }
            ]
          },
          {
            "-Id": "421100",
            "-Name": "黄冈市",
            "district": [
              {
                "-Id": "421101",
                "-Name": "市辖区"
              },
              {
                "-Id": "421121",
                "-Name": "团风县"
              },
              {
                "-Id": "421122",
                "-Name": "红安县"
              },
              {
                "-Id": "421123",
                "-Name": "罗田县"
              },
              {
                "-Id": "421124",
                "-Name": "英山县"
              },
              {
                "-Id": "421125",
                "-Name": "浠水县"
              },
              {
                "-Id": "421126",
                "-Name": "蕲春县"
              },
              {
                "-Id": "421127",
                "-Name": "黄梅县"
              },
              {
                "-Id": "421181",
                "-Name": "麻城市"
              },
              {
                "-Id": "421182",
                "-Name": "武穴市"
              }
            ]
          },
          {
            "-Id": "421200",
            "-Name": "咸宁市",
            "district": [
              {
                "-Id": "421201",
                "-Name": "市辖区"
              },
              {
                "-Id": "421221",
                "-Name": "嘉鱼县"
              },
              {
                "-Id": "421222",
                "-Name": "通城县"
              },
              {
                "-Id": "421223",
                "-Name": "崇阳县"
              },
              {
                "-Id": "421224",
                "-Name": "通山县"
              },
              {
                "-Id": "421281",
                "-Name": "赤壁市"
              }
            ]
          },
          {
            "-Id": "421300",
            "-Name": "随州市",
            "district": [
              {
                "-Id": "421301",
                "-Name": "市辖区"
              },
              {
                "-Id": "421381",
                "-Name": "广水市"
              }
            ]
          },
          {
            "-Id": "422800",
            "-Name": "恩施土家族苗族自治州",
            "district": [
              {
                "-Id": "422801",
                "-Name": "恩施市"
              },
              {
                "-Id": "422802",
                "-Name": "利川市"
              },
              {
                "-Id": "422822",
                "-Name": "建始县"
              },
              {
                "-Id": "422823",
                "-Name": "巴东县"
              },
              {
                "-Id": "422825",
                "-Name": "宣恩县"
              },
              {
                "-Id": "422826",
                "-Name": "咸丰县"
              },
              {
                "-Id": "422827",
                "-Name": "来凤县"
              },
              {
                "-Id": "422828",
                "-Name": "鹤峰县"
              }
            ]
          },
          {
            "-Id": "429000",
            "-Name": "省直辖行政单位",
            "district": [
              {
                "-Id": "429004",
                "-Name": "仙桃市"
              },
              {
                "-Id": "429005",
                "-Name": "潜江市"
              },
              {
                "-Id": "429006",
                "-Name": "天门市"
              },
              {
                "-Id": "429021",
                "-Name": "神农架林区"
              }
            ]
          }
        ]
      },
      {
        "-Id": "430000",
        "-Name": "湖南省",
        "city": [
          {
            "-Id": "430100",
            "-Name": "长沙市",
            "district": [
              {
                "-Id": "430101",
                "-Name": "市辖区"
              },
              {
                "-Id": "430121",
                "-Name": "长沙县"
              },
              {
                "-Id": "430122",
                "-Name": "望城县"
              },
              {
                "-Id": "430124",
                "-Name": "宁乡县"
              },
              {
                "-Id": "430181",
                "-Name": "浏阳市"
              }
            ]
          },
          {
            "-Id": "430200",
            "-Name": "株洲市",
            "district": [
              {
                "-Id": "430201",
                "-Name": "市辖区"
              },
              {
                "-Id": "430221",
                "-Name": "株洲县"
              },
              {
                "-Id": "430223",
                "-Name": "攸县"
              },
              {
                "-Id": "430224",
                "-Name": "茶陵县"
              },
              {
                "-Id": "430225",
                "-Name": "炎陵县"
              },
              {
                "-Id": "430281",
                "-Name": "醴陵市"
              }
            ]
          },
          {
            "-Id": "430300",
            "-Name": "湘潭市",
            "district": [
              {
                "-Id": "430301",
                "-Name": "市辖区"
              },
              {
                "-Id": "430321",
                "-Name": "湘潭县"
              },
              {
                "-Id": "430381",
                "-Name": "湘乡市"
              },
              {
                "-Id": "430382",
                "-Name": "韶山市"
              }
            ]
          },
          {
            "-Id": "430400",
            "-Name": "衡阳市",
            "district": [
              {
                "-Id": "430401",
                "-Name": "市辖区"
              },
              {
                "-Id": "430421",
                "-Name": "衡阳县"
              },
              {
                "-Id": "430422",
                "-Name": "衡南县"
              },
              {
                "-Id": "430423",
                "-Name": "衡山县"
              },
              {
                "-Id": "430424",
                "-Name": "衡东县"
              },
              {
                "-Id": "430426",
                "-Name": "祁东县"
              },
              {
                "-Id": "430481",
                "-Name": "耒阳市"
              },
              {
                "-Id": "430482",
                "-Name": "常宁市"
              }
            ]
          },
          {
            "-Id": "430500",
            "-Name": "邵阳市",
            "district": [
              {
                "-Id": "430501",
                "-Name": "市辖区"
              },
              {
                "-Id": "430521",
                "-Name": "邵东县"
              },
              {
                "-Id": "430522",
                "-Name": "新邵县"
              },
              {
                "-Id": "430523",
                "-Name": "邵阳县"
              },
              {
                "-Id": "430524",
                "-Name": "隆回县"
              },
              {
                "-Id": "430525",
                "-Name": "洞口县"
              },
              {
                "-Id": "430527",
                "-Name": "绥宁县"
              },
              {
                "-Id": "430528",
                "-Name": "新宁县"
              },
              {
                "-Id": "430529",
                "-Name": "城步苗族自治县"
              },
              {
                "-Id": "430581",
                "-Name": "武冈市"
              }
            ]
          },
          {
            "-Id": "430600",
            "-Name": "岳阳市",
            "district": [
              {
                "-Id": "430601",
                "-Name": "市辖区"
              },
              {
                "-Id": "430621",
                "-Name": "岳阳县"
              },
              {
                "-Id": "430623",
                "-Name": "华容县"
              },
              {
                "-Id": "430624",
                "-Name": "湘阴县"
              },
              {
                "-Id": "430626",
                "-Name": "平江县"
              },
              {
                "-Id": "430681",
                "-Name": "汨罗市"
              },
              {
                "-Id": "430682",
                "-Name": "临湘市"
              }
            ]
          },
          {
            "-Id": "430700",
            "-Name": "常德市",
            "district": [
              {
                "-Id": "430701",
                "-Name": "市辖区"
              },
              {
                "-Id": "430721",
                "-Name": "安乡县"
              },
              {
                "-Id": "430722",
                "-Name": "汉寿县"
              },
              {
                "-Id": "430723",
                "-Name": "澧县"
              },
              {
                "-Id": "430724",
                "-Name": "临澧县"
              },
              {
                "-Id": "430725",
                "-Name": "桃源县"
              },
              {
                "-Id": "430726",
                "-Name": "石门县"
              },
              {
                "-Id": "430781",
                "-Name": "津市市"
              }
            ]
          },
          {
            "-Id": "430800",
            "-Name": "张家界市",
            "district": [
              {
                "-Id": "430801",
                "-Name": "市辖区"
              },
              {
                "-Id": "430821",
                "-Name": "慈利县"
              },
              {
                "-Id": "430822",
                "-Name": "桑植县"
              }
            ]
          },
          {
            "-Id": "430900",
            "-Name": "益阳市",
            "district": [
              {
                "-Id": "430901",
                "-Name": "市辖区"
              },
              {
                "-Id": "430921",
                "-Name": "南县"
              },
              {
                "-Id": "430922",
                "-Name": "桃江县"
              },
              {
                "-Id": "430923",
                "-Name": "安化县"
              },
              {
                "-Id": "430981",
                "-Name": "沅江市"
              }
            ]
          },
          {
            "-Id": "431000",
            "-Name": "郴州市",
            "district": [
              {
                "-Id": "431001",
                "-Name": "市辖区"
              },
              {
                "-Id": "431021",
                "-Name": "桂阳县"
              },
              {
                "-Id": "431022",
                "-Name": "宜章县"
              },
              {
                "-Id": "431023",
                "-Name": "永兴县"
              },
              {
                "-Id": "431024",
                "-Name": "嘉禾县"
              },
              {
                "-Id": "431025",
                "-Name": "临武县"
              },
              {
                "-Id": "431026",
                "-Name": "汝城县"
              },
              {
                "-Id": "431027",
                "-Name": "桂东县"
              },
              {
                "-Id": "431028",
                "-Name": "安仁县"
              },
              {
                "-Id": "431081",
                "-Name": "资兴市"
              }
            ]
          },
          {
            "-Id": "431100",
            "-Name": "永州市",
            "district": [
              {
                "-Id": "431101",
                "-Name": "市辖区"
              },
              {
                "-Id": "431121",
                "-Name": "祁阳县"
              },
              {
                "-Id": "431122",
                "-Name": "东安县"
              },
              {
                "-Id": "431123",
                "-Name": "双牌县"
              },
              {
                "-Id": "431124",
                "-Name": "道县"
              },
              {
                "-Id": "431125",
                "-Name": "江永县"
              },
              {
                "-Id": "431126",
                "-Name": "宁远县"
              },
              {
                "-Id": "431127",
                "-Name": "蓝山县"
              },
              {
                "-Id": "431128",
                "-Name": "新田县"
              },
              {
                "-Id": "431129",
                "-Name": "江华瑶族自治县"
              }
            ]
          },
          {
            "-Id": "431200",
            "-Name": "怀化市",
            "district": [
              {
                "-Id": "431201",
                "-Name": "市辖区"
              },
              {
                "-Id": "431221",
                "-Name": "中方县"
              },
              {
                "-Id": "431222",
                "-Name": "沅陵县"
              },
              {
                "-Id": "431223",
                "-Name": "辰溪县"
              },
              {
                "-Id": "431224",
                "-Name": "溆浦县"
              },
              {
                "-Id": "431225",
                "-Name": "会同县"
              },
              {
                "-Id": "431226",
                "-Name": "麻阳苗族自治县"
              },
              {
                "-Id": "431227",
                "-Name": "新晃侗族自治县"
              },
              {
                "-Id": "431228",
                "-Name": "芷江侗族自治县"
              },
              {
                "-Id": "431229",
                "-Name": "靖州苗族侗族自治县"
              },
              {
                "-Id": "431230",
                "-Name": "通道侗族自治县"
              },
              {
                "-Id": "431281",
                "-Name": "洪江市"
              }
            ]
          },
          {
            "-Id": "431300",
            "-Name": "娄底市",
            "district": [
              {
                "-Id": "431301",
                "-Name": "市辖区"
              },
              {
                "-Id": "431321",
                "-Name": "双峰县"
              },
              {
                "-Id": "431322",
                "-Name": "新化县"
              },
              {
                "-Id": "431381",
                "-Name": "冷水江市"
              },
              {
                "-Id": "431382",
                "-Name": "涟源市"
              }
            ]
          },
          {
            "-Id": "433100",
            "-Name": "湘西土家族苗族自治州",
            "district": [
              {
                "-Id": "433101",
                "-Name": "吉首市"
              },
              {
                "-Id": "433122",
                "-Name": "泸溪县"
              },
              {
                "-Id": "433123",
                "-Name": "凤凰县"
              },
              {
                "-Id": "433124",
                "-Name": "花垣县"
              },
              {
                "-Id": "433125",
                "-Name": "保靖县"
              },
              {
                "-Id": "433126",
                "-Name": "古丈县"
              },
              {
                "-Id": "433127",
                "-Name": "永顺县"
              },
              {
                "-Id": "433130",
                "-Name": "龙山县"
              }
            ]
          }
        ]
      },
      {
        "-Id": "440000",
        "-Name": "广东省",
        "city": [
          {
            "-Id": "440100",
            "-Name": "广州市",
            "district": [
              {
                "-Id": "440101",
                "-Name": "市辖区"
              },
              {
                "-Id": "440183",
                "-Name": "增城市"
              },
              {
                "-Id": "440184",
                "-Name": "从化市"
              }
            ]
          },
          {
            "-Id": "440200",
            "-Name": "韶关市",
            "district": [
              {
                "-Id": "440201",
                "-Name": "市辖区"
              },
              {
                "-Id": "440222",
                "-Name": "始兴县"
              },
              {
                "-Id": "440224",
                "-Name": "仁化县"
              },
              {
                "-Id": "440229",
                "-Name": "翁源县"
              },
              {
                "-Id": "440232",
                "-Name": "乳源瑶族自治县"
              },
              {
                "-Id": "440233",
                "-Name": "新丰县"
              },
              {
                "-Id": "440281",
                "-Name": "乐昌市"
              },
              {
                "-Id": "440282",
                "-Name": "南雄市"
              }
            ]
          },
          {
            "-Id": "440300",
            "-Name": "深圳市",
            "district": {
              "-Id": "440301",
              "-Name": "市辖区"
            }
          },
          {
            "-Id": "440400",
            "-Name": "珠海市",
            "district": {
              "-Id": "440401",
              "-Name": "市辖区"
            }
          },
          {
            "-Id": "440500",
            "-Name": "汕头市",
            "district": [
              {
                "-Id": "440501",
                "-Name": "市辖区"
              },
              {
                "-Id": "440523",
                "-Name": "南澳县"
              }
            ]
          },
          {
            "-Id": "440600",
            "-Name": "佛山市",
            "district": [
              {
                "-Id": "440601",
                "-Name": "市辖区"
              },
              {
                "-Id": "440604",
                "-Name": "禅城区"
              },
              {
                "-Id": "440605",
                "-Name": "南海区"
              },
              {
                "-Id": "440606",
                "-Name": "顺德区"
              },
              {
                "-Id": "440607",
                "-Name": "三水区"
              },
              {
                "-Id": "440608",
                "-Name": "高明区"
              }
            ]
          },
          {
            "-Id": "440700",
            "-Name": "江门市",
            "district": [
              {
                "-Id": "440701",
                "-Name": "市辖区"
              },
              {
                "-Id": "440781",
                "-Name": "台山市"
              },
              {
                "-Id": "440783",
                "-Name": "开平市"
              },
              {
                "-Id": "440784",
                "-Name": "鹤山市"
              },
              {
                "-Id": "440785",
                "-Name": "恩平市"
              }
            ]
          },
          {
            "-Id": "440800",
            "-Name": "湛江市",
            "district": [
              {
                "-Id": "440801",
                "-Name": "市辖区"
              },
              {
                "-Id": "440823",
                "-Name": "遂溪县"
              },
              {
                "-Id": "440825",
                "-Name": "徐闻县"
              },
              {
                "-Id": "440881",
                "-Name": "廉江市"
              },
              {
                "-Id": "440882",
                "-Name": "雷州市"
              },
              {
                "-Id": "440883",
                "-Name": "吴川市"
              }
            ]
          },
          {
            "-Id": "440900",
            "-Name": "茂名市",
            "district": [
              {
                "-Id": "440901",
                "-Name": "市辖区"
              },
              {
                "-Id": "440923",
                "-Name": "电白县"
              },
              {
                "-Id": "440981",
                "-Name": "高州市"
              },
              {
                "-Id": "440982",
                "-Name": "化州市"
              },
              {
                "-Id": "440983",
                "-Name": "信宜市"
              }
            ]
          },
          {
            "-Id": "441200",
            "-Name": "肇庆市",
            "district": [
              {
                "-Id": "441201",
                "-Name": "市辖区"
              },
              {
                "-Id": "441223",
                "-Name": "广宁县"
              },
              {
                "-Id": "441224",
                "-Name": "怀集县"
              },
              {
                "-Id": "441225",
                "-Name": "封开县"
              },
              {
                "-Id": "441226",
                "-Name": "德庆县"
              },
              {
                "-Id": "441283",
                "-Name": "高要市"
              },
              {
                "-Id": "441284",
                "-Name": "四会市"
              }
            ]
          },
          {
            "-Id": "441300",
            "-Name": "惠州市",
            "district": [
              {
                "-Id": "441301",
                "-Name": "市辖区"
              },
              {
                "-Id": "441322",
                "-Name": "博罗县"
              },
              {
                "-Id": "441323",
                "-Name": "惠东县"
              },
              {
                "-Id": "441324",
                "-Name": "龙门县"
              }
            ]
          },
          {
            "-Id": "441400",
            "-Name": "梅州市",
            "district": [
              {
                "-Id": "441401",
                "-Name": "市辖区"
              },
              {
                "-Id": "441421",
                "-Name": "梅县"
              },
              {
                "-Id": "441422",
                "-Name": "大埔县"
              },
              {
                "-Id": "441423",
                "-Name": "丰顺县"
              },
              {
                "-Id": "441424",
                "-Name": "五华县"
              },
              {
                "-Id": "441426",
                "-Name": "平远县"
              },
              {
                "-Id": "441427",
                "-Name": "蕉岭县"
              },
              {
                "-Id": "441481",
                "-Name": "兴宁市"
              }
            ]
          },
          {
            "-Id": "441500",
            "-Name": "汕尾市",
            "district": [
              {
                "-Id": "441501",
                "-Name": "市辖区"
              },
              {
                "-Id": "441521",
                "-Name": "海丰县"
              },
              {
                "-Id": "441523",
                "-Name": "陆河县"
              },
              {
                "-Id": "441581",
                "-Name": "陆丰市"
              }
            ]
          },
          {
            "-Id": "441600",
            "-Name": "河源市",
            "district": [
              {
                "-Id": "441601",
                "-Name": "市辖区"
              },
              {
                "-Id": "441621",
                "-Name": "紫金县"
              },
              {
                "-Id": "441622",
                "-Name": "龙川县"
              },
              {
                "-Id": "441623",
                "-Name": "连平县"
              },
              {
                "-Id": "441624",
                "-Name": "和平县"
              },
              {
                "-Id": "441625",
                "-Name": "东源县"
              }
            ]
          },
          {
            "-Id": "441700",
            "-Name": "阳江市",
            "district": [
              {
                "-Id": "441701",
                "-Name": "市辖区"
              },
              {
                "-Id": "441721",
                "-Name": "阳西县"
              },
              {
                "-Id": "441723",
                "-Name": "阳东县"
              },
              {
                "-Id": "441781",
                "-Name": "阳春市"
              }
            ]
          },
          {
            "-Id": "441800",
            "-Name": "清远市",
            "district": [
              {
                "-Id": "441801",
                "-Name": "市辖区"
              },
              {
                "-Id": "441821",
                "-Name": "佛冈县"
              },
              {
                "-Id": "441823",
                "-Name": "阳山县"
              },
              {
                "-Id": "441825",
                "-Name": "连山壮族瑶族自治县"
              },
              {
                "-Id": "441826",
                "-Name": "连南瑶族自治县"
              },
              {
                "-Id": "441827",
                "-Name": "清新县"
              },
              {
                "-Id": "441881",
                "-Name": "英德市"
              },
              {
                "-Id": "441882",
                "-Name": "连州市"
              }
            ]
          },
          {
            "-Id": "441900",
            "-Name": "东莞市"
          },
          {
            "-Id": "442000",
            "-Name": "中山市"
          },
          {
            "-Id": "445100",
            "-Name": "潮州市",
            "district": [
              {
                "-Id": "445101",
                "-Name": "市辖区"
              },
              {
                "-Id": "445121",
                "-Name": "潮安区"
              },
              {
                "-Id": "445122",
                "-Name": "饶平县"
              }
            ]
          },
          {
            "-Id": "445200",
            "-Name": "揭阳市",
            "district": [
              {
                "-Id": "445201",
                "-Name": "市辖区"
              },
              {
                "-Id": "445221",
                "-Name": "揭东县"
              },
              {
                "-Id": "445222",
                "-Name": "揭西县"
              },
              {
                "-Id": "445224",
                "-Name": "惠来县"
              },
              {
                "-Id": "445281",
                "-Name": "普宁市"
              }
            ]
          },
          {
            "-Id": "445300",
            "-Name": "云浮市",
            "district": [
              {
                "-Id": "445301",
                "-Name": "市辖区"
              },
              {
                "-Id": "445321",
                "-Name": "新兴县"
              },
              {
                "-Id": "445322",
                "-Name": "郁南县"
              },
              {
                "-Id": "445323",
                "-Name": "云安县"
              },
              {
                "-Id": "445381",
                "-Name": "罗定市"
              }
            ]
          }
        ]
      },
      {
        "-Id": "450000",
        "-Name": "广西壮族自治区",
        "city": [
          {
            "-Id": "450100",
            "-Name": "南宁市",
            "district": [
              {
                "-Id": "450101",
                "-Name": "市辖区"
              },
              {
                "-Id": "450122",
                "-Name": "武鸣县"
              },
              {
                "-Id": "450123",
                "-Name": "隆安县"
              },
              {
                "-Id": "450124",
                "-Name": "马山县"
              },
              {
                "-Id": "450125",
                "-Name": "上林县"
              },
              {
                "-Id": "450126",
                "-Name": "宾阳县"
              },
              {
                "-Id": "450127",
                "-Name": "横县"
              }
            ]
          },
          {
            "-Id": "450200",
            "-Name": "柳州市",
            "district": [
              {
                "-Id": "450201",
                "-Name": "市辖区"
              },
              {
                "-Id": "450221",
                "-Name": "柳江县"
              },
              {
                "-Id": "450222",
                "-Name": "柳城县"
              },
              {
                "-Id": "450223",
                "-Name": "鹿寨县"
              },
              {
                "-Id": "450224",
                "-Name": "融安县"
              },
              {
                "-Id": "450225",
                "-Name": "融水苗族自治县"
              },
              {
                "-Id": "450226",
                "-Name": "三江侗族自治县"
              }
            ]
          },
          {
            "-Id": "450300",
            "-Name": "桂林市",
            "district": [
              {
                "-Id": "450301",
                "-Name": "市辖区"
              },
              {
                "-Id": "450321",
                "-Name": "阳朔县"
              },
              {
                "-Id": "450322",
                "-Name": "临桂区"
              },
              {
                "-Id": "450323",
                "-Name": "灵川县"
              },
              {
                "-Id": "450324",
                "-Name": "全州县"
              },
              {
                "-Id": "450325",
                "-Name": "兴安县"
              },
              {
                "-Id": "450326",
                "-Name": "永福县"
              },
              {
                "-Id": "450327",
                "-Name": "灌阳县"
              },
              {
                "-Id": "450328",
                "-Name": "龙胜各族自治县"
              },
              {
                "-Id": "450329",
                "-Name": "资源县"
              },
              {
                "-Id": "450330",
                "-Name": "平乐县"
              },
              {
                "-Id": "450331",
                "-Name": "荔浦县"
              },
              {
                "-Id": "450332",
                "-Name": "恭城瑶族自治县"
              }
            ]
          },
          {
            "-Id": "450400",
            "-Name": "梧州市",
            "district": [
              {
                "-Id": "450401",
                "-Name": "市辖区"
              },
              {
                "-Id": "450421",
                "-Name": "苍梧县"
              },
              {
                "-Id": "450422",
                "-Name": "藤县"
              },
              {
                "-Id": "450423",
                "-Name": "蒙山县"
              },
              {
                "-Id": "450481",
                "-Name": "岑溪市"
              }
            ]
          },
          {
            "-Id": "450500",
            "-Name": "北海市",
            "district": [
              {
                "-Id": "450501",
                "-Name": "市辖区"
              },
              {
                "-Id": "450521",
                "-Name": "合浦县"
              }
            ]
          },
          {
            "-Id": "450600",
            "-Name": "防城港市",
            "district": [
              {
                "-Id": "450601",
                "-Name": "市辖区"
              },
              {
                "-Id": "450621",
                "-Name": "上思县"
              },
              {
                "-Id": "450681",
                "-Name": "东兴市"
              }
            ]
          },
          {
            "-Id": "450700",
            "-Name": "钦州市",
            "district": [
              {
                "-Id": "450701",
                "-Name": "市辖区"
              },
              {
                "-Id": "450702",
                "-Name": "钦南区"
              },
              {
                "-Id": "450703",
                "-Name": "钦北区"
              },
              {
                "-Id": "450721",
                "-Name": "灵山县"
              },
              {
                "-Id": "450722",
                "-Name": "浦北县"
              }
            ]
          },
          {
            "-Id": "450800",
            "-Name": "贵港市",
            "district": [
              {
                "-Id": "450801",
                "-Name": "市辖区"
              },
              {
                "-Id": "450821",
                "-Name": "平南县"
              },
              {
                "-Id": "450881",
                "-Name": "桂平市"
              }
            ]
          },
          {
            "-Id": "450900",
            "-Name": "玉林市",
            "district": [
              {
                "-Id": "450901",
                "-Name": "市辖区"
              },
              {
                "-Id": "450921",
                "-Name": "容县"
              },
              {
                "-Id": "450922",
                "-Name": "陆川县"
              },
              {
                "-Id": "450923",
                "-Name": "博白县"
              },
              {
                "-Id": "450924",
                "-Name": "兴业县"
              },
              {
                "-Id": "450981",
                "-Name": "北流市"
              }
            ]
          },
          {
            "-Id": "451000",
            "-Name": "百色市",
            "district": [
              {
                "-Id": "451001",
                "-Name": "市辖区"
              },
              {
                "-Id": "451021",
                "-Name": "田阳县"
              },
              {
                "-Id": "451022",
                "-Name": "田东县"
              },
              {
                "-Id": "451023",
                "-Name": "平果县"
              },
              {
                "-Id": "451024",
                "-Name": "德保县"
              },
              {
                "-Id": "451025",
                "-Name": "靖西县"
              },
              {
                "-Id": "451026",
                "-Name": "那坡县"
              },
              {
                "-Id": "451027",
                "-Name": "凌云县"
              },
              {
                "-Id": "451028",
                "-Name": "乐业县"
              },
              {
                "-Id": "451029",
                "-Name": "田林县"
              },
              {
                "-Id": "451030",
                "-Name": "西林县"
              },
              {
                "-Id": "451031",
                "-Name": "隆林各族自治县"
              }
            ]
          },
          {
            "-Id": "451100",
            "-Name": "贺州市",
            "district": [
              {
                "-Id": "451101",
                "-Name": "市辖区"
              },
              {
                "-Id": "451121",
                "-Name": "昭平县"
              },
              {
                "-Id": "451122",
                "-Name": "钟山县"
              },
              {
                "-Id": "451123",
                "-Name": "富川瑶族自治县"
              }
            ]
          },
          {
            "-Id": "451200",
            "-Name": "河池市",
            "district": [
              {
                "-Id": "451201",
                "-Name": "市辖区"
              },
              {
                "-Id": "451221",
                "-Name": "南丹县"
              },
              {
                "-Id": "451222",
                "-Name": "天峨县"
              },
              {
                "-Id": "451223",
                "-Name": "凤山县"
              },
              {
                "-Id": "451224",
                "-Name": "东兰县"
              },
              {
                "-Id": "451225",
                "-Name": "罗城仫佬族自治县"
              },
              {
                "-Id": "451226",
                "-Name": "环江毛南族自治县"
              },
              {
                "-Id": "451227",
                "-Name": "巴马瑶族自治县"
              },
              {
                "-Id": "451228",
                "-Name": "都安瑶族自治县"
              },
              {
                "-Id": "451229",
                "-Name": "大化瑶族自治县"
              },
              {
                "-Id": "451281",
                "-Name": "宜州市"
              }
            ]
          },
          {
            "-Id": "451300",
            "-Name": "来宾市",
            "district": [
              {
                "-Id": "451301",
                "-Name": "市辖区"
              },
              {
                "-Id": "451321",
                "-Name": "忻城县"
              },
              {
                "-Id": "451322",
                "-Name": "象州县"
              },
              {
                "-Id": "451323",
                "-Name": "武宣县"
              },
              {
                "-Id": "451324",
                "-Name": "金秀瑶族自治县"
              },
              {
                "-Id": "451381",
                "-Name": "合山市"
              }
            ]
          },
          {
            "-Id": "451400",
            "-Name": "崇左市",
            "district": [
              {
                "-Id": "451401",
                "-Name": "市辖区"
              },
              {
                "-Id": "451421",
                "-Name": "扶绥县"
              },
              {
                "-Id": "451422",
                "-Name": "宁明县"
              },
              {
                "-Id": "451423",
                "-Name": "龙州县"
              },
              {
                "-Id": "451424",
                "-Name": "大新县"
              },
              {
                "-Id": "451425",
                "-Name": "天等县"
              },
              {
                "-Id": "451481",
                "-Name": "凭祥市"
              }
            ]
          }
        ]
      },
      {
        "-Id": "460000",
        "-Name": "海南省",
        "city": [
          {
            "-Id": "460100",
            "-Name": "海口市",
            "district": {
              "-Id": "460101",
              "-Name": "市辖区"
            }
          },
          {
            "-Id": "460200",
            "-Name": "三亚市",
            "district": {
              "-Id": "460201",
              "-Name": "市辖区"
            }
          },
          {
            "-Id": "469000",
            "-Name": "省直辖县级行政单位",
            "district": [
              {
                "-Id": "469001",
                "-Name": "五指山市"
              },
              {
                "-Id": "469002",
                "-Name": "琼海市"
              },
              {
                "-Id": "469003",
                "-Name": "儋州市"
              },
              {
                "-Id": "469005",
                "-Name": "文昌市"
              },
              {
                "-Id": "469006",
                "-Name": "万宁市"
              },
              {
                "-Id": "469007",
                "-Name": "东方市"
              },
              {
                "-Id": "469025",
                "-Name": "定安县"
              },
              {
                "-Id": "469026",
                "-Name": "屯昌县"
              },
              {
                "-Id": "469027",
                "-Name": "澄迈县"
              },
              {
                "-Id": "469028",
                "-Name": "临高县"
              },
              {
                "-Id": "469030",
                "-Name": "白沙黎族自治县"
              },
              {
                "-Id": "469031",
                "-Name": "昌江黎族自治县"
              },
              {
                "-Id": "469033",
                "-Name": "乐东黎族自治县"
              },
              {
                "-Id": "469034",
                "-Name": "陵水黎族自治县"
              },
              {
                "-Id": "469035",
                "-Name": "保亭黎族苗族自治县"
              },
              {
                "-Id": "469036",
                "-Name": "琼中黎族苗族自治县"
              },
              {
                "-Id": "469037",
                "-Name": "西沙群岛"
              },
              {
                "-Id": "469038",
                "-Name": "南沙群岛"
              },
              {
                "-Id": "469039",
                "-Name": "中沙群岛的岛礁及其海域"
              }
            ]
          }
        ]
      },
      {
        "-Id": "500000",
        "-Name": "重庆市",
        "city": [{
          "-Id": "500000",
          "-Name": "重庆市",
          "district": [
            {
              "-Id": "500100",
              "-Name": "万州区"
            },
            {
              "-Id": "500200",
              "-Name": "涪陵区"
            },
            {
              "-Id": "500300",
              "-Name": "渝中区"
            },
            {
              "-Id": "500400",
              "-Name": "大渡口区"
            },
            {
              "-Id": "500500",
              "-Name": "江北区"
            },
            {
              "-Id": "500600",
              "-Name": "沙坪坝区"
            },
            {
              "-Id": "500700",
              "-Name": "九龙坡区"
            },
            {
              "-Id": "500800",
              "-Name": "南岸区"
            },
            {
              "-Id": "500900",
              "-Name": "北碚区"
            },
            {
              "-Id": "501000",
              "-Name": "万盛区"
            },
            {
              "-Id": "501100",
              "-Name": "双桥区"
            },
            {
              "-Id": "501200",
              "-Name": "渝北区"
            },
            {
              "-Id": "501300",
              "-Name": "巴南区"
            },
            {
              "-Id": "501400",
              "-Name": "黔江区"
            },
            {
              "-Id": "501500",
              "-Name": "长寿区"
            },
            {
              "-Id": "502200",
              "-Name": "綦江区"
            },
            {
              "-Id": "502300",
              "-Name": "潼南县"
            },
            {
              "-Id": "502400",
              "-Name": "铜梁县"
            },
            {
              "-Id": "502500",
              "-Name": "大足区"
            },
            {
              "-Id": "502600",
              "-Name": "荣昌县"
            },
            {
              "-Id": "502700",
              "-Name": "璧山县"
            },
            {
              "-Id": "502800",
              "-Name": "梁平县"
            },
            {
              "-Id": "502900",
              "-Name": "城口县"
            },
            {
              "-Id": "503000",
              "-Name": "丰都县"
            },
            {
              "-Id": "503100",
              "-Name": "垫江县"
            },
            {
              "-Id": "503200",
              "-Name": "武隆县"
            },
            {
              "-Id": "503300",
              "-Name": "忠县"
            },
            {
              "-Id": "503400",
              "-Name": "开县"
            },
            {
              "-Id": "503500",
              "-Name": "云阳县"
            },
            {
              "-Id": "503600",
              "-Name": "奉节县"
            },
            {
              "-Id": "503700",
              "-Name": "巫山县"
            },
            {
              "-Id": "503800",
              "-Name": "巫溪县"
            },
            {
              "-Id": "504000",
              "-Name": "石柱县"
            },
            {
              "-Id": "504100",
              "-Name": "秀山县"
            },
            {
              "-Id": "504200",
              "-Name": "酉阳县"
            },
            {
              "-Id": "504300",
              "-Name": "彭水县"
            },
            {
              "-Id": "508100",
              "-Name": "江津区"
            },
            {
              "-Id": "508200",
              "-Name": "合川区"
            },
            {
              "-Id": "508300",
              "-Name": "永川区"
            },
            {
              "-Id": "508400",
              "-Name": "南川区"
            }
          ]
        }]
      },
      {
        "-Id": "510000",
        "-Name": "四川省",
        "city": [
          {
            "-Id": "510100",
            "-Name": "成都市",
            "district": [
              {
                "-Id": "510101",
                "-Name": "市辖区"
              },
              {
                "-Id": "510112",
                "-Name": "龙泉驿区"
              },
              {
                "-Id": "510121",
                "-Name": "金堂县"
              },
              {
                "-Id": "510122",
                "-Name": "双流县"
              },
              {
                "-Id": "510124",
                "-Name": "郫县"
              },
              {
                "-Id": "510129",
                "-Name": "大邑县"
              },
              {
                "-Id": "510131",
                "-Name": "蒲江县"
              },
              {
                "-Id": "510132",
                "-Name": "新津县"
              },
              {
                "-Id": "510181",
                "-Name": "都江堰市"
              },
              {
                "-Id": "510182",
                "-Name": "彭州市"
              },
              {
                "-Id": "510183",
                "-Name": "邛崃市"
              },
              {
                "-Id": "510184",
                "-Name": "崇州市"
              }
            ]
          },
          {
            "-Id": "510300",
            "-Name": "自贡市",
            "district": [
              {
                "-Id": "510301",
                "-Name": "市辖区"
              },
              {
                "-Id": "510321",
                "-Name": "荣县"
              },
              {
                "-Id": "510322",
                "-Name": "富顺县"
              }
            ]
          },
          {
            "-Id": "510400",
            "-Name": "攀枝花市",
            "district": [
              {
                "-Id": "510401",
                "-Name": "市辖区"
              },
              {
                "-Id": "510421",
                "-Name": "米易县"
              },
              {
                "-Id": "510422",
                "-Name": "盐边县"
              }
            ]
          },
          {
            "-Id": "510500",
            "-Name": "泸州市",
            "district": [
              {
                "-Id": "510501",
                "-Name": "市辖区"
              },
              {
                "-Id": "510521",
                "-Name": "泸县"
              },
              {
                "-Id": "510522",
                "-Name": "合江县"
              },
              {
                "-Id": "510524",
                "-Name": "叙永县"
              },
              {
                "-Id": "510525",
                "-Name": "古蔺县"
              }
            ]
          },
          {
            "-Id": "510600",
            "-Name": "德阳市",
            "district": [
              {
                "-Id": "510601",
                "-Name": "市辖区"
              },
              {
                "-Id": "510623",
                "-Name": "中江县"
              },
              {
                "-Id": "510626",
                "-Name": "罗江县"
              },
              {
                "-Id": "510681",
                "-Name": "广汉市"
              },
              {
                "-Id": "510682",
                "-Name": "什邡市"
              },
              {
                "-Id": "510683",
                "-Name": "绵竹市"
              }
            ]
          },
          {
            "-Id": "510700",
            "-Name": "绵阳市",
            "district": [
              {
                "-Id": "510701",
                "-Name": "市辖区"
              },
              {
                "-Id": "510722",
                "-Name": "三台县"
              },
              {
                "-Id": "510723",
                "-Name": "盐亭县"
              },
              {
                "-Id": "510724",
                "-Name": "安县"
              },
              {
                "-Id": "510725",
                "-Name": "梓潼县"
              },
              {
                "-Id": "510726",
                "-Name": "北川羌族自治县"
              },
              {
                "-Id": "510727",
                "-Name": "平武县"
              },
              {
                "-Id": "510781",
                "-Name": "江油市"
              }
            ]
          },
          {
            "-Id": "510800",
            "-Name": "广元市",
            "district": [
              {
                "-Id": "510801",
                "-Name": "市辖区"
              },
              {
                "-Id": "510821",
                "-Name": "旺苍县"
              },
              {
                "-Id": "510822",
                "-Name": "青川县"
              },
              {
                "-Id": "510823",
                "-Name": "剑阁县"
              },
              {
                "-Id": "510824",
                "-Name": "苍溪县"
              }
            ]
          },
          {
            "-Id": "510900",
            "-Name": "遂宁市",
            "district": [
              {
                "-Id": "510901",
                "-Name": "市辖区"
              },
              {
                "-Id": "510921",
                "-Name": "蓬溪县"
              },
              {
                "-Id": "510922",
                "-Name": "射洪县"
              },
              {
                "-Id": "510923",
                "-Name": "大英县"
              }
            ]
          },
          {
            "-Id": "511000",
            "-Name": "内江市",
            "district": [
              {
                "-Id": "511001",
                "-Name": "市辖区"
              },
              {
                "-Id": "511024",
                "-Name": "威远县"
              },
              {
                "-Id": "511025",
                "-Name": "资中县"
              },
              {
                "-Id": "511028",
                "-Name": "隆昌县"
              }
            ]
          },
          {
            "-Id": "511100",
            "-Name": "乐山市",
            "district": [
              {
                "-Id": "511101",
                "-Name": "市辖区"
              },
              {
                "-Id": "511123",
                "-Name": "犍为县"
              },
              {
                "-Id": "511124",
                "-Name": "井研县"
              },
              {
                "-Id": "511126",
                "-Name": "夹江县"
              },
              {
                "-Id": "511129",
                "-Name": "沐川县"
              },
              {
                "-Id": "511132",
                "-Name": "峨边彝族自治县"
              },
              {
                "-Id": "511133",
                "-Name": "马边彝族自治县"
              },
              {
                "-Id": "511181",
                "-Name": "峨眉山市"
              }
            ]
          },
          {
            "-Id": "511300",
            "-Name": "南充市",
            "district": [
              {
                "-Id": "511301",
                "-Name": "市辖区"
              },
              {
                "-Id": "511321",
                "-Name": "南部县"
              },
              {
                "-Id": "511322",
                "-Name": "营山县"
              },
              {
                "-Id": "511323",
                "-Name": "蓬安县"
              },
              {
                "-Id": "511324",
                "-Name": "仪陇县"
              },
              {
                "-Id": "511325",
                "-Name": "西充县"
              },
              {
                "-Id": "511381",
                "-Name": "阆中市"
              }
            ]
          },
          {
            "-Id": "511400",
            "-Name": "眉山市",
            "district": [
              {
                "-Id": "511401",
                "-Name": "市辖区"
              },
              {
                "-Id": "511421",
                "-Name": "仁寿县"
              },
              {
                "-Id": "511422",
                "-Name": "彭山县"
              },
              {
                "-Id": "511423",
                "-Name": "洪雅县"
              },
              {
                "-Id": "511424",
                "-Name": "丹棱县"
              },
              {
                "-Id": "511425",
                "-Name": "青神县"
              }
            ]
          },
          {
            "-Id": "511500",
            "-Name": "宜宾市",
            "district": [
              {
                "-Id": "511501",
                "-Name": "市辖区"
              },
              {
                "-Id": "511502",
                "-Name": "翠屏区"
              },
              {
                "-Id": "511521",
                "-Name": "宜宾县"
              },
              {
                "-Id": "511522",
                "-Name": "南溪县"
              },
              {
                "-Id": "511523",
                "-Name": "江安县"
              },
              {
                "-Id": "511524",
                "-Name": "长宁县"
              },
              {
                "-Id": "511525",
                "-Name": "高县"
              },
              {
                "-Id": "511526",
                "-Name": "珙县"
              },
              {
                "-Id": "511527",
                "-Name": "筠连县"
              },
              {
                "-Id": "511528",
                "-Name": "兴文县"
              },
              {
                "-Id": "511529",
                "-Name": "屏山县"
              }
            ]
          },
          {
            "-Id": "511600",
            "-Name": "广安市",
            "district": [
              {
                "-Id": "511601",
                "-Name": "市辖区"
              },
              {
                "-Id": "511621",
                "-Name": "岳池县"
              },
              {
                "-Id": "511622",
                "-Name": "武胜县"
              },
              {
                "-Id": "511623",
                "-Name": "邻水县"
              },
              {
                "-Id": "511681",
                "-Name": "华蓥市"
              },
              {
                "-Id": "511682",
                "-Name": "广安区"
              }
            ]
          },
          {
            "-Id": "511700",
            "-Name": "达州市",
            "district": [
              {
                "-Id": "511701",
                "-Name": "市辖区"
              },
              {
                "-Id": "511721",
                "-Name": "达川区"
              },
              {
                "-Id": "511722",
                "-Name": "宣汉县"
              },
              {
                "-Id": "511723",
                "-Name": "开江县"
              },
              {
                "-Id": "511724",
                "-Name": "大竹县"
              },
              {
                "-Id": "511725",
                "-Name": "渠县"
              },
              {
                "-Id": "511781",
                "-Name": "万源市"
              }
            ]
          },
          {
            "-Id": "511800",
            "-Name": "雅安市",
            "district": [
              {
                "-Id": "511801",
                "-Name": "雨城区"
              },
              {
                "-Id": "511821",
                "-Name": "名山区"
              },
              {
                "-Id": "511822",
                "-Name": "荥经县"
              },
              {
                "-Id": "511823",
                "-Name": "汉源县"
              },
              {
                "-Id": "511824",
                "-Name": "石棉县"
              },
              {
                "-Id": "511825",
                "-Name": "天全县"
              },
              {
                "-Id": "511826",
                "-Name": "芦山县"
              },
              {
                "-Id": "511827",
                "-Name": "宝兴县"
              }
            ]
          },
          {
            "-Id": "511900",
            "-Name": "巴中市",
            "district": [
              {
                "-Id": "511901",
                "-Name": "市辖区"
              },
              {
                "-Id": "511921",
                "-Name": "通江县"
              },
              {
                "-Id": "511922",
                "-Name": "南江县"
              },
              {
                "-Id": "511923",
                "-Name": "平昌县"
              }
            ]
          },
          {
            "-Id": "512000",
            "-Name": "资阳市",
            "district": [
              {
                "-Id": "512001",
                "-Name": "市辖区"
              },
              {
                "-Id": "512021",
                "-Name": "安岳县"
              },
              {
                "-Id": "512022",
                "-Name": "乐至县"
              },
              {
                "-Id": "512081",
                "-Name": "简阳市"
              }
            ]
          },
          {
            "-Id": "513200",
            "-Name": "阿坝藏族羌族自治州",
            "district": [
              {
                "-Id": "513221",
                "-Name": "汶川县"
              },
              {
                "-Id": "513222",
                "-Name": "理县"
              },
              {
                "-Id": "513223",
                "-Name": "茂县"
              },
              {
                "-Id": "513224",
                "-Name": "松潘县"
              },
              {
                "-Id": "513225",
                "-Name": "九寨沟县"
              },
              {
                "-Id": "513226",
                "-Name": "金川县"
              },
              {
                "-Id": "513227",
                "-Name": "小金县"
              },
              {
                "-Id": "513228",
                "-Name": "黑水县"
              },
              {
                "-Id": "513229",
                "-Name": "马尔康县"
              },
              {
                "-Id": "513230",
                "-Name": "壤塘县"
              },
              {
                "-Id": "513231",
                "-Name": "阿坝县"
              },
              {
                "-Id": "513232",
                "-Name": "若尔盖县"
              },
              {
                "-Id": "513233",
                "-Name": "红原县"
              }
            ]
          },
          {
            "-Id": "513300",
            "-Name": "甘孜藏族自治州",
            "district": [
              {
                "-Id": "513321",
                "-Name": "康定县"
              },
              {
                "-Id": "513322",
                "-Name": "泸定县"
              },
              {
                "-Id": "513323",
                "-Name": "丹巴县"
              },
              {
                "-Id": "513324",
                "-Name": "九龙县"
              },
              {
                "-Id": "513325",
                "-Name": "雅江县"
              },
              {
                "-Id": "513326",
                "-Name": "道孚县"
              },
              {
                "-Id": "513327",
                "-Name": "炉霍县"
              },
              {
                "-Id": "513328",
                "-Name": "甘孜县"
              },
              {
                "-Id": "513329",
                "-Name": "新龙县"
              },
              {
                "-Id": "513330",
                "-Name": "德格县"
              },
              {
                "-Id": "513331",
                "-Name": "白玉县"
              },
              {
                "-Id": "513332",
                "-Name": "石渠县"
              },
              {
                "-Id": "513333",
                "-Name": "色达县"
              },
              {
                "-Id": "513334",
                "-Name": "理塘县"
              },
              {
                "-Id": "513335",
                "-Name": "巴塘县"
              },
              {
                "-Id": "513336",
                "-Name": "乡城县"
              },
              {
                "-Id": "513337",
                "-Name": "稻城县"
              },
              {
                "-Id": "513338",
                "-Name": "得荣县"
              }
            ]
          },
          {
            "-Id": "513400",
            "-Name": "凉山彝族自治州",
            "district": [
              {
                "-Id": "513401",
                "-Name": "西昌市"
              },
              {
                "-Id": "513422",
                "-Name": "木里藏族自治县"
              },
              {
                "-Id": "513423",
                "-Name": "盐源县"
              },
              {
                "-Id": "513424",
                "-Name": "德昌县"
              },
              {
                "-Id": "513425",
                "-Name": "会理县"
              },
              {
                "-Id": "513426",
                "-Name": "会东县"
              },
              {
                "-Id": "513427",
                "-Name": "宁南县"
              },
              {
                "-Id": "513428",
                "-Name": "普格县"
              },
              {
                "-Id": "513429",
                "-Name": "布拖县"
              },
              {
                "-Id": "513430",
                "-Name": "金阳县"
              },
              {
                "-Id": "513431",
                "-Name": "昭觉县"
              },
              {
                "-Id": "513432",
                "-Name": "喜德县"
              },
              {
                "-Id": "513433",
                "-Name": "冕宁县"
              },
              {
                "-Id": "513434",
                "-Name": "越西县"
              },
              {
                "-Id": "513435",
                "-Name": "甘洛县"
              },
              {
                "-Id": "513436",
                "-Name": "美姑县"
              },
              {
                "-Id": "513437",
                "-Name": "雷波县"
              }
            ]
          }
        ]
      },
      {
        "-Id": "520000",
        "-Name": "贵州省",
        "city": [
          {
            "-Id": "520100",
            "-Name": "贵阳市",
            "district": [
              {
                "-Id": "520101",
                "-Name": "市辖区"
              },
              {
                "-Id": "520112",
                "-Name": "乌当区"
              },
              {
                "-Id": "520121",
                "-Name": "开阳县"
              },
              {
                "-Id": "520122",
                "-Name": "息烽县"
              },
              {
                "-Id": "520123",
                "-Name": "修文县"
              },
              {
                "-Id": "520181",
                "-Name": "清镇市"
              }
            ]
          },
          {
            "-Id": "520200",
            "-Name": "六盘水市",
            "district": [
              {
                "-Id": "520201",
                "-Name": "钟山区"
              },
              {
                "-Id": "520203",
                "-Name": "六枝特区"
              },
              {
                "-Id": "520221",
                "-Name": "水城县"
              },
              {
                "-Id": "520222",
                "-Name": "盘县"
              }
            ]
          },
          {
            "-Id": "520300",
            "-Name": "遵义市",
            "district": [
              {
                "-Id": "520301",
                "-Name": "市辖区"
              },
              {
                "-Id": "520321",
                "-Name": "遵义县"
              },
              {
                "-Id": "520322",
                "-Name": "桐梓县"
              },
              {
                "-Id": "520323",
                "-Name": "绥阳县"
              },
              {
                "-Id": "520324",
                "-Name": "正安县"
              },
              {
                "-Id": "520325",
                "-Name": "道真仡佬族苗族自治县"
              },
              {
                "-Id": "520326",
                "-Name": "务川仡佬族苗族自治县"
              },
              {
                "-Id": "520327",
                "-Name": "凤冈县"
              },
              {
                "-Id": "520328",
                "-Name": "湄潭县"
              },
              {
                "-Id": "520329",
                "-Name": "余庆县"
              },
              {
                "-Id": "520330",
                "-Name": "习水县"
              },
              {
                "-Id": "520381",
                "-Name": "赤水市"
              },
              {
                "-Id": "520382",
                "-Name": "仁怀市"
              }
            ]
          },
          {
            "-Id": "520400",
            "-Name": "安顺市",
            "district": [
              {
                "-Id": "520401",
                "-Name": "市辖区"
              },
              {
                "-Id": "520421",
                "-Name": "平坝县"
              },
              {
                "-Id": "520422",
                "-Name": "普定县"
              },
              {
                "-Id": "520423",
                "-Name": "镇宁布依族苗族自治县"
              },
              {
                "-Id": "520424",
                "-Name": "关岭布依族苗族自治县"
              },
              {
                "-Id": "520425",
                "-Name": "紫云苗族布依族自治县"
              }
            ]
          },
          {
            "-Id": "522200",
            "-Name": "铜仁市",
            "district": [
              {
                "-Id": "522201",
                "-Name": "碧江区"
              },
              {
                "-Id": "522222",
                "-Name": "江口县"
              },
              {
                "-Id": "522223",
                "-Name": "玉屏侗族自治县"
              },
              {
                "-Id": "522224",
                "-Name": "石阡县"
              },
              {
                "-Id": "522225",
                "-Name": "思南县"
              },
              {
                "-Id": "522226",
                "-Name": "印江土家族苗族自治县"
              },
              {
                "-Id": "522227",
                "-Name": "德江县"
              },
              {
                "-Id": "522228",
                "-Name": "沿河土家族自治县"
              },
              {
                "-Id": "522229",
                "-Name": "松桃苗族自治县"
              },
              {
                "-Id": "522230",
                "-Name": "万山区"
              }
            ]
          },
          {
            "-Id": "522300",
            "-Name": "黔西南布依族苗族自治州",
            "district": [
              {
                "-Id": "522301",
                "-Name": "兴义市"
              },
              {
                "-Id": "522322",
                "-Name": "兴仁县"
              },
              {
                "-Id": "522323",
                "-Name": "普安县"
              },
              {
                "-Id": "522324",
                "-Name": "晴隆县"
              },
              {
                "-Id": "522325",
                "-Name": "贞丰县"
              },
              {
                "-Id": "522326",
                "-Name": "望谟县"
              },
              {
                "-Id": "522327",
                "-Name": "册亨县"
              },
              {
                "-Id": "522328",
                "-Name": "安龙县"
              }
            ]
          },
          {
            "-Id": "522400",
            "-Name": "毕节市",
            "district": [
              {
                "-Id": "522401",
                "-Name": "七星关区"
              },
              {
                "-Id": "522422",
                "-Name": "大方县"
              },
              {
                "-Id": "522423",
                "-Name": "黔西县"
              },
              {
                "-Id": "522424",
                "-Name": "金沙县"
              },
              {
                "-Id": "522425",
                "-Name": "织金县"
              },
              {
                "-Id": "522426",
                "-Name": "纳雍县"
              },
              {
                "-Id": "522427",
                "-Name": "威宁彝族回族苗族自治县"
              },
              {
                "-Id": "522428",
                "-Name": "赫章县"
              }
            ]
          },
          {
            "-Id": "522600",
            "-Name": "黔东南苗族侗族自治州",
            "district": [
              {
                "-Id": "522601",
                "-Name": "凯里市"
              },
              {
                "-Id": "522622",
                "-Name": "黄平县"
              },
              {
                "-Id": "522623",
                "-Name": "施秉县"
              },
              {
                "-Id": "522624",
                "-Name": "三穗县"
              },
              {
                "-Id": "522625",
                "-Name": "镇远县"
              },
              {
                "-Id": "522626",
                "-Name": "岑巩县"
              },
              {
                "-Id": "522627",
                "-Name": "天柱县"
              },
              {
                "-Id": "522628",
                "-Name": "锦屏县"
              },
              {
                "-Id": "522629",
                "-Name": "剑河县"
              },
              {
                "-Id": "522630",
                "-Name": "台江县"
              },
              {
                "-Id": "522631",
                "-Name": "黎平县"
              },
              {
                "-Id": "522632",
                "-Name": "榕江县"
              },
              {
                "-Id": "522633",
                "-Name": "从江县"
              },
              {
                "-Id": "522634",
                "-Name": "雷山县"
              },
              {
                "-Id": "522635",
                "-Name": "麻江县"
              },
              {
                "-Id": "522636",
                "-Name": "丹寨县"
              }
            ]
          },
          {
            "-Id": "522700",
            "-Name": "黔南布依族苗族自治州",
            "district": [
              {
                "-Id": "522701",
                "-Name": "都匀市"
              },
              {
                "-Id": "522702",
                "-Name": "福泉市"
              },
              {
                "-Id": "522722",
                "-Name": "荔波县"
              },
              {
                "-Id": "522723",
                "-Name": "贵定县"
              },
              {
                "-Id": "522725",
                "-Name": "瓮安县"
              },
              {
                "-Id": "522726",
                "-Name": "独山县"
              },
              {
                "-Id": "522727",
                "-Name": "平塘县"
              },
              {
                "-Id": "522728",
                "-Name": "罗甸县"
              },
              {
                "-Id": "522729",
                "-Name": "长顺县"
              },
              {
                "-Id": "522730",
                "-Name": "龙里县"
              },
              {
                "-Id": "522731",
                "-Name": "惠水县"
              },
              {
                "-Id": "522732",
                "-Name": "三都水族自治县"
              }
            ]
          }
        ]
      },
      {
        "-Id": "530000",
        "-Name": "云南省",
        "city": [
          {
            "-Id": "530100",
            "-Name": "昆明市",
            "district": [
              {
                "-Id": "530101",
                "-Name": "市辖区"
              },
              {
                "-Id": "530121",
                "-Name": "呈贡县"
              },
              {
                "-Id": "530122",
                "-Name": "晋宁县"
              },
              {
                "-Id": "530124",
                "-Name": "富民县"
              },
              {
                "-Id": "530125",
                "-Name": "宜良县"
              },
              {
                "-Id": "530126",
                "-Name": "石林彝族自治县"
              },
              {
                "-Id": "530127",
                "-Name": "嵩明县"
              },
              {
                "-Id": "530128",
                "-Name": "禄劝彝族苗族自治县"
              },
              {
                "-Id": "530129",
                "-Name": "寻甸回族彝族自治县"
              },
              {
                "-Id": "530181",
                "-Name": "安宁市"
              }
            ]
          },
          {
            "-Id": "530300",
            "-Name": "曲靖市",
            "district": [
              {
                "-Id": "530301",
                "-Name": "市辖区"
              },
              {
                "-Id": "530321",
                "-Name": "马龙县"
              },
              {
                "-Id": "530322",
                "-Name": "陆良县"
              },
              {
                "-Id": "530323",
                "-Name": "师宗县"
              },
              {
                "-Id": "530324",
                "-Name": "罗平县"
              },
              {
                "-Id": "530325",
                "-Name": "富源县"
              },
              {
                "-Id": "530326",
                "-Name": "会泽县"
              },
              {
                "-Id": "530328",
                "-Name": "沾益县"
              },
              {
                "-Id": "530381",
                "-Name": "宣威市"
              }
            ]
          },
          {
            "-Id": "530400",
            "-Name": "玉溪市",
            "district": [
              {
                "-Id": "530401",
                "-Name": "市辖区"
              },
              {
                "-Id": "530421",
                "-Name": "江川县"
              },
              {
                "-Id": "530422",
                "-Name": "澄江县"
              },
              {
                "-Id": "530423",
                "-Name": "通海县"
              },
              {
                "-Id": "530424",
                "-Name": "华宁县"
              },
              {
                "-Id": "530425",
                "-Name": "易门县"
              },
              {
                "-Id": "530426",
                "-Name": "峨山彝族自治县"
              },
              {
                "-Id": "530427",
                "-Name": "新平彝族傣族自治县"
              },
              {
                "-Id": "530428",
                "-Name": "元江哈尼族彝族傣族自治县"
              }
            ]
          },
          {
            "-Id": "530500",
            "-Name": "保山市",
            "district": [
              {
                "-Id": "530501",
                "-Name": "市辖区"
              },
              {
                "-Id": "530502",
                "-Name": "隆阳区"
              },
              {
                "-Id": "530521",
                "-Name": "施甸县"
              },
              {
                "-Id": "530522",
                "-Name": "腾冲县"
              },
              {
                "-Id": "530523",
                "-Name": "龙陵县"
              },
              {
                "-Id": "530524",
                "-Name": "昌宁县"
              }
            ]
          },
          {
            "-Id": "530600",
            "-Name": "昭通市",
            "district": [
              {
                "-Id": "530601",
                "-Name": "市辖区"
              },
              {
                "-Id": "530621",
                "-Name": "鲁甸县"
              },
              {
                "-Id": "530622",
                "-Name": "巧家县"
              },
              {
                "-Id": "530623",
                "-Name": "盐津县"
              },
              {
                "-Id": "530624",
                "-Name": "大关县"
              },
              {
                "-Id": "530625",
                "-Name": "永善县"
              },
              {
                "-Id": "530626",
                "-Name": "绥江县"
              },
              {
                "-Id": "530627",
                "-Name": "镇雄县"
              },
              {
                "-Id": "530628",
                "-Name": "彝良县"
              },
              {
                "-Id": "530629",
                "-Name": "威信县"
              },
              {
                "-Id": "530630",
                "-Name": "水富县"
              }
            ]
          },
          {
            "-Id": "530700",
            "-Name": "丽江市",
            "district": [
              {
                "-Id": "530701",
                "-Name": "市辖区"
              },
              {
                "-Id": "530721",
                "-Name": "玉龙纳西族自治县"
              },
              {
                "-Id": "530722",
                "-Name": "永胜县"
              },
              {
                "-Id": "530723",
                "-Name": "华坪县"
              },
              {
                "-Id": "530724",
                "-Name": "宁蒗彝族自治县"
              }
            ]
          },
          {
            "-Id": "530800",
            "-Name": "普洱市",
            "district": [
              {
                "-Id": "530801",
                "-Name": "市辖区"
              },
              {
                "-Id": "530821",
                "-Name": "宁洱哈尼族彝族自治县"
              },
              {
                "-Id": "530822",
                "-Name": "墨江哈尼族自治县"
              },
              {
                "-Id": "530823",
                "-Name": "景东彝族自治县"
              },
              {
                "-Id": "530824",
                "-Name": "景谷傣族彝族自治县"
              },
              {
                "-Id": "530825",
                "-Name": "镇沅彝族哈尼族拉祜族自治县"
              },
              {
                "-Id": "530826",
                "-Name": "江城哈尼族彝族自治县"
              },
              {
                "-Id": "530827",
                "-Name": "孟连傣族拉祜族佤族自治县"
              },
              {
                "-Id": "530828",
                "-Name": "澜沧拉祜族自治县"
              },
              {
                "-Id": "530829",
                "-Name": "西盟佤族自治县"
              }
            ]
          },
          {
            "-Id": "530900",
            "-Name": "临沧市",
            "district": [
              {
                "-Id": "530901",
                "-Name": "市辖区"
              },
              {
                "-Id": "530921",
                "-Name": "凤庆县"
              },
              {
                "-Id": "530922",
                "-Name": "云县"
              },
              {
                "-Id": "530923",
                "-Name": "永德县"
              },
              {
                "-Id": "530924",
                "-Name": "镇康县"
              },
              {
                "-Id": "530925",
                "-Name": "双江拉祜族佤族布朗族傣族自治县"
              },
              {
                "-Id": "530926",
                "-Name": "耿马傣族佤族自治县"
              },
              {
                "-Id": "530927",
                "-Name": "沧源佤族自治县"
              }
            ]
          },
          {
            "-Id": "532300",
            "-Name": "楚雄彝族自治州",
            "district": [
              {
                "-Id": "532301",
                "-Name": "楚雄市"
              },
              {
                "-Id": "532322",
                "-Name": "双柏县"
              },
              {
                "-Id": "532323",
                "-Name": "牟定县"
              },
              {
                "-Id": "532324",
                "-Name": "南华县"
              },
              {
                "-Id": "532325",
                "-Name": "姚安县"
              },
              {
                "-Id": "532326",
                "-Name": "大姚县"
              },
              {
                "-Id": "532327",
                "-Name": "永仁县"
              },
              {
                "-Id": "532328",
                "-Name": "元谋县"
              },
              {
                "-Id": "532329",
                "-Name": "武定县"
              },
              {
                "-Id": "532331",
                "-Name": "禄丰县"
              }
            ]
          },
          {
            "-Id": "532500",
            "-Name": "红河哈尼族彝族自治州",
            "district": [
              {
                "-Id": "532501",
                "-Name": "个旧市"
              },
              {
                "-Id": "532502",
                "-Name": "开远市"
              },
              {
                "-Id": "532522",
                "-Name": "蒙自市"
              },
              {
                "-Id": "532523",
                "-Name": "屏边苗族自治县"
              },
              {
                "-Id": "532524",
                "-Name": "建水县"
              },
              {
                "-Id": "532525",
                "-Name": "石屏县"
              },
              {
                "-Id": "532526",
                "-Name": "弥勒市"
              },
              {
                "-Id": "532527",
                "-Name": "泸西县"
              },
              {
                "-Id": "532528",
                "-Name": "元阳县"
              },
              {
                "-Id": "532529",
                "-Name": "红河县"
              },
              {
                "-Id": "532530",
                "-Name": "金平苗族瑶族傣族自治县"
              },
              {
                "-Id": "532531",
                "-Name": "绿春县"
              },
              {
                "-Id": "532532",
                "-Name": "河口瑶族自治县"
              }
            ]
          },
          {
            "-Id": "532600",
            "-Name": "文山壮族苗族自治州",
            "district": [
              {
                "-Id": "532621",
                "-Name": "文山市"
              },
              {
                "-Id": "532622",
                "-Name": "砚山县"
              },
              {
                "-Id": "532623",
                "-Name": "西畴县"
              },
              {
                "-Id": "532624",
                "-Name": "麻栗坡县"
              },
              {
                "-Id": "532625",
                "-Name": "马关县"
              },
              {
                "-Id": "532626",
                "-Name": "丘北县"
              },
              {
                "-Id": "532627",
                "-Name": "广南县"
              },
              {
                "-Id": "532628",
                "-Name": "富宁县"
              }
            ]
          },
          {
            "-Id": "532800",
            "-Name": "西双版纳傣族自治州",
            "district": [
              {
                "-Id": "532801",
                "-Name": "景洪市"
              },
              {
                "-Id": "532822",
                "-Name": "勐海县"
              },
              {
                "-Id": "532823",
                "-Name": "勐腊县"
              }
            ]
          },
          {
            "-Id": "532900",
            "-Name": "大理白族自治州",
            "district": [
              {
                "-Id": "532901",
                "-Name": "大理市"
              },
              {
                "-Id": "532922",
                "-Name": "漾濞彝族自治县"
              },
              {
                "-Id": "532923",
                "-Name": "祥云县"
              },
              {
                "-Id": "532924",
                "-Name": "宾川县"
              },
              {
                "-Id": "532925",
                "-Name": "弥渡县"
              },
              {
                "-Id": "532926",
                "-Name": "南涧彝族自治县"
              },
              {
                "-Id": "532927",
                "-Name": "巍山彝族回族自治县"
              },
              {
                "-Id": "532928",
                "-Name": "永平县"
              },
              {
                "-Id": "532929",
                "-Name": "云龙县"
              },
              {
                "-Id": "532930",
                "-Name": "洱源县"
              },
              {
                "-Id": "532931",
                "-Name": "剑川县"
              },
              {
                "-Id": "532932",
                "-Name": "鹤庆县"
              }
            ]
          },
          {
            "-Id": "533100",
            "-Name": "德宏傣族景颇族自治州",
            "district": [
              {
                "-Id": "533102",
                "-Name": "瑞丽市"
              },
              {
                "-Id": "533103",
                "-Name": "潞西市"
              },
              {
                "-Id": "533122",
                "-Name": "梁河县"
              },
              {
                "-Id": "533123",
                "-Name": "盈江县"
              },
              {
                "-Id": "533124",
                "-Name": "陇川县"
              }
            ]
          },
          {
            "-Id": "533300",
            "-Name": "怒江傈僳族自治州",
            "district": [
              {
                "-Id": "533321",
                "-Name": "泸水县"
              },
              {
                "-Id": "533323",
                "-Name": "福贡县"
              },
              {
                "-Id": "533324",
                "-Name": "贡山独龙族怒族自治县"
              },
              {
                "-Id": "533325",
                "-Name": "兰坪白族普米族自治县"
              }
            ]
          },
          {
            "-Id": "533400",
            "-Name": "迪庆藏族自治州",
            "district": [
              {
                "-Id": "533421",
                "-Name": "香格里拉县"
              },
              {
                "-Id": "533422",
                "-Name": "德钦县"
              },
              {
                "-Id": "533423",
                "-Name": "维西傈僳族自治县"
              }
            ]
          }
        ]
      },
      {
        "-Id": "540000",
        "-Name": "西藏自治区",
        "city": [
          {
            "-Id": "540100",
            "-Name": "拉萨市",
            "district": [
              {
                "-Id": "540101",
                "-Name": "市辖区"
              },
              {
                "-Id": "540121",
                "-Name": "林周县"
              },
              {
                "-Id": "540122",
                "-Name": "当雄县"
              },
              {
                "-Id": "540123",
                "-Name": "尼木县"
              },
              {
                "-Id": "540124",
                "-Name": "曲水县"
              },
              {
                "-Id": "540125",
                "-Name": "堆龙德庆县"
              },
              {
                "-Id": "540126",
                "-Name": "达孜县"
              },
              {
                "-Id": "540127",
                "-Name": "墨竹工卡县"
              }
            ]
          },
          {
            "-Id": "542100",
            "-Name": "昌都地区",
            "district": [
              {
                "-Id": "542121",
                "-Name": "昌都县"
              },
              {
                "-Id": "542122",
                "-Name": "江达县"
              },
              {
                "-Id": "542123",
                "-Name": "贡觉县"
              },
              {
                "-Id": "542124",
                "-Name": "类乌齐县"
              },
              {
                "-Id": "542125",
                "-Name": "丁青县"
              },
              {
                "-Id": "542126",
                "-Name": "察雅县"
              },
              {
                "-Id": "542127",
                "-Name": "八宿县"
              },
              {
                "-Id": "542128",
                "-Name": "左贡县"
              },
              {
                "-Id": "542129",
                "-Name": "芒康县"
              },
              {
                "-Id": "542132",
                "-Name": "洛隆县"
              },
              {
                "-Id": "542133",
                "-Name": "边坝县"
              }
            ]
          },
          {
            "-Id": "542200",
            "-Name": "山南地区",
            "district": [
              {
                "-Id": "542221",
                "-Name": "乃东县"
              },
              {
                "-Id": "542222",
                "-Name": "扎囊县"
              },
              {
                "-Id": "542223",
                "-Name": "贡嘎县"
              },
              {
                "-Id": "542224",
                "-Name": "桑日县"
              },
              {
                "-Id": "542225",
                "-Name": "琼结县"
              },
              {
                "-Id": "542226",
                "-Name": "曲松县"
              },
              {
                "-Id": "542227",
                "-Name": "措美县"
              },
              {
                "-Id": "542228",
                "-Name": "洛扎县"
              },
              {
                "-Id": "542229",
                "-Name": "加查县"
              },
              {
                "-Id": "542231",
                "-Name": "隆子县"
              },
              {
                "-Id": "542232",
                "-Name": "错那县"
              },
              {
                "-Id": "542233",
                "-Name": "浪卡子县"
              }
            ]
          },
          {
            "-Id": "542300",
            "-Name": "日喀则地区",
            "district": [
              {
                "-Id": "542301",
                "-Name": "日喀则市"
              },
              {
                "-Id": "542322",
                "-Name": "南木林县"
              },
              {
                "-Id": "542323",
                "-Name": "江孜县"
              },
              {
                "-Id": "542324",
                "-Name": "定日县"
              },
              {
                "-Id": "542325",
                "-Name": "萨迦县"
              },
              {
                "-Id": "542326",
                "-Name": "拉孜县"
              },
              {
                "-Id": "542327",
                "-Name": "昂仁县"
              },
              {
                "-Id": "542328",
                "-Name": "谢通门县"
              },
              {
                "-Id": "542329",
                "-Name": "白朗县"
              },
              {
                "-Id": "542330",
                "-Name": "仁布县"
              },
              {
                "-Id": "542331",
                "-Name": "康马县"
              },
              {
                "-Id": "542332",
                "-Name": "定结县"
              },
              {
                "-Id": "542333",
                "-Name": "仲巴县"
              },
              {
                "-Id": "542334",
                "-Name": "亚东县"
              },
              {
                "-Id": "542335",
                "-Name": "吉隆县"
              },
              {
                "-Id": "542336",
                "-Name": "聂拉木县"
              },
              {
                "-Id": "542337",
                "-Name": "萨嘎县"
              },
              {
                "-Id": "542338",
                "-Name": "岗巴县"
              }
            ]
          },
          {
            "-Id": "542400",
            "-Name": "那曲地区",
            "district": [
              {
                "-Id": "542421",
                "-Name": "那曲县"
              },
              {
                "-Id": "542422",
                "-Name": "嘉黎县"
              },
              {
                "-Id": "542423",
                "-Name": "比如县"
              },
              {
                "-Id": "542424",
                "-Name": "聂荣县"
              },
              {
                "-Id": "542425",
                "-Name": "安多县"
              },
              {
                "-Id": "542426",
                "-Name": "申扎县"
              },
              {
                "-Id": "542427",
                "-Name": "索县"
              },
              {
                "-Id": "542428",
                "-Name": "班戈县"
              },
              {
                "-Id": "542429",
                "-Name": "巴青县"
              },
              {
                "-Id": "542430",
                "-Name": "尼玛县"
              }
            ]
          },
          {
            "-Id": "542500",
            "-Name": "阿里地区",
            "district": [
              {
                "-Id": "542521",
                "-Name": "普兰县"
              },
              {
                "-Id": "542522",
                "-Name": "札达县"
              },
              {
                "-Id": "542523",
                "-Name": "噶尔县"
              },
              {
                "-Id": "542524",
                "-Name": "日土县"
              },
              {
                "-Id": "542525",
                "-Name": "革吉县"
              },
              {
                "-Id": "542526",
                "-Name": "改则县"
              },
              {
                "-Id": "542527",
                "-Name": "措勤县"
              }
            ]
          },
          {
            "-Id": "542600",
            "-Name": "林芝地区",
            "district": [
              {
                "-Id": "542621",
                "-Name": "林芝县"
              },
              {
                "-Id": "542622",
                "-Name": "工布江达县"
              },
              {
                "-Id": "542623",
                "-Name": "米林县"
              },
              {
                "-Id": "542624",
                "-Name": "墨脱县"
              },
              {
                "-Id": "542625",
                "-Name": "波密县"
              },
              {
                "-Id": "542626",
                "-Name": "察隅县"
              },
              {
                "-Id": "542627",
                "-Name": "朗县"
              }
            ]
          }
        ]
      },
      {
        "-Id": "610000",
        "-Name": "陕西省",
        "city": [
          {
            "-Id": "610100",
            "-Name": "西安市",
            "district": [
              {
                "-Id": "610101",
                "-Name": "长安区"
              },
              {
                "-Id": "610102",
                "-Name": "新城区"
              },
              {
                "-Id": "610103",
                "-Name": "碑林区"
              },
              {
                "-Id": "610104",
                "-Name": "莲湖区"
              },
              {
                "-Id": "610111",
                "-Name": "灞桥区"
              },
              {
                "-Id": "610112",
                "-Name": "未央区"
              },
              {
                "-Id": "610113",
                "-Name": "雁塔区"
              },
              {
                "-Id": "610114",
                "-Name": "阎良区"
              },
              {
                "-Id": "610115",
                "-Name": "临潼区"
              },
              {
                "-Id": "610122",
                "-Name": "蓝田县"
              },
              {
                "-Id": "610124",
                "-Name": "周至县"
              },
              {
                "-Id": "610125",
                "-Name": "户县"
              },
              {
                "-Id": "610126",
                "-Name": "高陵县"
              }
            ]
          },
          {
            "-Id": "610200",
            "-Name": "铜川市",
            "district": [
              {
                "-Id": "610201",
                "-Name": "市辖区"
              },
              {
                "-Id": "610222",
                "-Name": "宜君县"
              }
            ]
          },
          {
            "-Id": "610300",
            "-Name": "宝鸡市",
            "district": [
              {
                "-Id": "610301",
                "-Name": "市辖区"
              },
              {
                "-Id": "610322",
                "-Name": "凤翔县"
              },
              {
                "-Id": "610323",
                "-Name": "岐山县"
              },
              {
                "-Id": "610324",
                "-Name": "扶风县"
              },
              {
                "-Id": "610326",
                "-Name": "眉县"
              },
              {
                "-Id": "610327",
                "-Name": "陇县"
              },
              {
                "-Id": "610328",
                "-Name": "千阳县"
              },
              {
                "-Id": "610329",
                "-Name": "麟游县"
              },
              {
                "-Id": "610330",
                "-Name": "凤县"
              },
              {
                "-Id": "610331",
                "-Name": "太白县"
              }
            ]
          },
          {
            "-Id": "610400",
            "-Name": "咸阳市",
            "district": [
              {
                "-Id": "610401",
                "-Name": "市辖区"
              },
              {
                "-Id": "610422",
                "-Name": "三原县"
              },
              {
                "-Id": "610423",
                "-Name": "泾阳县"
              },
              {
                "-Id": "610424",
                "-Name": "乾县"
              },
              {
                "-Id": "610425",
                "-Name": "礼泉县"
              },
              {
                "-Id": "610426",
                "-Name": "永寿县"
              },
              {
                "-Id": "610427",
                "-Name": "彬县"
              },
              {
                "-Id": "610428",
                "-Name": "长武县"
              },
              {
                "-Id": "610429",
                "-Name": "旬邑县"
              },
              {
                "-Id": "610430",
                "-Name": "淳化县"
              },
              {
                "-Id": "610431",
                "-Name": "武功县"
              },
              {
                "-Id": "610481",
                "-Name": "兴平市"
              }
            ]
          },
          {
            "-Id": "610500",
            "-Name": "渭南市",
            "district": [
              {
                "-Id": "610501",
                "-Name": "市辖区"
              },
              {
                "-Id": "610521",
                "-Name": "华县"
              },
              {
                "-Id": "610522",
                "-Name": "潼关县"
              },
              {
                "-Id": "610523",
                "-Name": "大荔县"
              },
              {
                "-Id": "610524",
                "-Name": "合阳县"
              },
              {
                "-Id": "610525",
                "-Name": "澄城县"
              },
              {
                "-Id": "610526",
                "-Name": "蒲城县"
              },
              {
                "-Id": "610527",
                "-Name": "白水县"
              },
              {
                "-Id": "610528",
                "-Name": "富平县"
              },
              {
                "-Id": "610581",
                "-Name": "韩城市"
              },
              {
                "-Id": "610582",
                "-Name": "华阴市"
              }
            ]
          },
          {
            "-Id": "610600",
            "-Name": "延安市",
            "district": [
              {
                "-Id": "610601",
                "-Name": "市辖区"
              },
              {
                "-Id": "610621",
                "-Name": "延长县"
              },
              {
                "-Id": "610622",
                "-Name": "延川县"
              },
              {
                "-Id": "610623",
                "-Name": "子长县"
              },
              {
                "-Id": "610624",
                "-Name": "安塞县"
              },
              {
                "-Id": "610625",
                "-Name": "志丹县"
              },
              {
                "-Id": "610626",
                "-Name": "吴起县"
              },
              {
                "-Id": "610627",
                "-Name": "甘泉县"
              },
              {
                "-Id": "610628",
                "-Name": "富县"
              },
              {
                "-Id": "610629",
                "-Name": "洛川县"
              },
              {
                "-Id": "610630",
                "-Name": "宜川县"
              },
              {
                "-Id": "610631",
                "-Name": "黄龙县"
              },
              {
                "-Id": "610632",
                "-Name": "黄陵县"
              }
            ]
          },
          {
            "-Id": "610700",
            "-Name": "汉中市",
            "district": [
              {
                "-Id": "610701",
                "-Name": "市辖区"
              },
              {
                "-Id": "610721",
                "-Name": "南郑县"
              },
              {
                "-Id": "610722",
                "-Name": "城固县"
              },
              {
                "-Id": "610723",
                "-Name": "洋县"
              },
              {
                "-Id": "610724",
                "-Name": "西乡县"
              },
              {
                "-Id": "610725",
                "-Name": "勉县"
              },
              {
                "-Id": "610726",
                "-Name": "宁强县"
              },
              {
                "-Id": "610727",
                "-Name": "略阳县"
              },
              {
                "-Id": "610728",
                "-Name": "镇巴县"
              },
              {
                "-Id": "610729",
                "-Name": "留坝县"
              },
              {
                "-Id": "610730",
                "-Name": "佛坪县"
              }
            ]
          },
          {
            "-Id": "610800",
            "-Name": "榆林市",
            "district": [
              {
                "-Id": "610801",
                "-Name": "市辖区"
              },
              {
                "-Id": "610802",
                "-Name": "榆阳区"
              },
              {
                "-Id": "610821",
                "-Name": "神木县"
              },
              {
                "-Id": "610822",
                "-Name": "府谷县"
              },
              {
                "-Id": "610823",
                "-Name": "横山县"
              },
              {
                "-Id": "610824",
                "-Name": "靖边县"
              },
              {
                "-Id": "610825",
                "-Name": "定边县"
              },
              {
                "-Id": "610826",
                "-Name": "绥德县"
              },
              {
                "-Id": "610827",
                "-Name": "米脂县"
              },
              {
                "-Id": "610828",
                "-Name": "佳县"
              },
              {
                "-Id": "610829",
                "-Name": "吴堡县"
              },
              {
                "-Id": "610830",
                "-Name": "清涧县"
              },
              {
                "-Id": "610831",
                "-Name": "子洲县"
              }
            ]
          },
          {
            "-Id": "610900",
            "-Name": "安康市",
            "district": [
              {
                "-Id": "610901",
                "-Name": "市辖区"
              },
              {
                "-Id": "610921",
                "-Name": "汉阴县"
              },
              {
                "-Id": "610922",
                "-Name": "石泉县"
              },
              {
                "-Id": "610923",
                "-Name": "宁陕县"
              },
              {
                "-Id": "610924",
                "-Name": "紫阳县"
              },
              {
                "-Id": "610925",
                "-Name": "岚皋县"
              },
              {
                "-Id": "610926",
                "-Name": "平利县"
              },
              {
                "-Id": "610927",
                "-Name": "镇坪县"
              },
              {
                "-Id": "610928",
                "-Name": "旬阳县"
              },
              {
                "-Id": "610929",
                "-Name": "白河县"
              }
            ]
          },
          {
            "-Id": "611000",
            "-Name": "商洛市",
            "district": [
              {
                "-Id": "611001",
                "-Name": "市辖区"
              },
              {
                "-Id": "611021",
                "-Name": "洛南县"
              },
              {
                "-Id": "611022",
                "-Name": "丹凤县"
              },
              {
                "-Id": "611023",
                "-Name": "商南县"
              },
              {
                "-Id": "611024",
                "-Name": "山阳县"
              },
              {
                "-Id": "611025",
                "-Name": "镇安县"
              },
              {
                "-Id": "611026",
                "-Name": "柞水县"
              }
            ]
          },
          {
            "-Id": "611100",
            "-Name": "杨凌示范区",
            "district": {
              "-Id": "611103",
              "-Name": "杨凌区"
            }
          }
        ]
      },
      {
        "-Id": "620000",
        "-Name": "甘肃省",
        "city": [
          {
            "-Id": "620100",
            "-Name": "兰州市",
            "district": [
              {
                "-Id": "620101",
                "-Name": "市辖区"
              },
              {
                "-Id": "620121",
                "-Name": "永登县"
              },
              {
                "-Id": "620122",
                "-Name": "皋兰县"
              },
              {
                "-Id": "620123",
                "-Name": "榆中县"
              }
            ]
          },
          {
            "-Id": "620200",
            "-Name": "嘉峪关市",
            "district": {
              "-Id": "620201",
              "-Name": "市辖区"
            }
          },
          {
            "-Id": "620300",
            "-Name": "金昌市",
            "district": [
              {
                "-Id": "620301",
                "-Name": "金川区"
              },
              {
                "-Id": "620321",
                "-Name": "永昌县"
              }
            ]
          },
          {
            "-Id": "620400",
            "-Name": "白银市",
            "district": [
              {
                "-Id": "620401",
                "-Name": "市辖区"
              },
              {
                "-Id": "620421",
                "-Name": "靖远县"
              },
              {
                "-Id": "620422",
                "-Name": "会宁县"
              },
              {
                "-Id": "620423",
                "-Name": "景泰县"
              }
            ]
          },
          {
            "-Id": "620500",
            "-Name": "天水市",
            "district": [
              {
                "-Id": "620501",
                "-Name": "麦积区"
              },
              {
                "-Id": "620502",
                "-Name": "秦州区"
              },
              {
                "-Id": "620521",
                "-Name": "清水县"
              },
              {
                "-Id": "620522",
                "-Name": "秦安县"
              },
              {
                "-Id": "620523",
                "-Name": "甘谷县"
              },
              {
                "-Id": "620524",
                "-Name": "武山县"
              },
              {
                "-Id": "620525",
                "-Name": "张家川回族自治县"
              }
            ]
          },
          {
            "-Id": "620600",
            "-Name": "武威市",
            "district": [
              {
                "-Id": "620601",
                "-Name": "市辖区"
              },
              {
                "-Id": "620621",
                "-Name": "民勤县"
              },
              {
                "-Id": "620622",
                "-Name": "古浪县"
              },
              {
                "-Id": "620623",
                "-Name": "天祝藏族自治县"
              }
            ]
          },
          {
            "-Id": "620700",
            "-Name": "张掖市",
            "district": [
              {
                "-Id": "620701",
                "-Name": "市辖区"
              },
              {
                "-Id": "620721",
                "-Name": "肃南裕固族自治县"
              },
              {
                "-Id": "620722",
                "-Name": "民乐县"
              },
              {
                "-Id": "620723",
                "-Name": "临泽县"
              },
              {
                "-Id": "620724",
                "-Name": "高台县"
              },
              {
                "-Id": "620725",
                "-Name": "山丹县"
              }
            ]
          },
          {
            "-Id": "620800",
            "-Name": "平凉市",
            "district": [
              {
                "-Id": "620801",
                "-Name": "市辖区"
              },
              {
                "-Id": "620821",
                "-Name": "泾川县"
              },
              {
                "-Id": "620822",
                "-Name": "灵台县"
              },
              {
                "-Id": "620823",
                "-Name": "崇信县"
              },
              {
                "-Id": "620824",
                "-Name": "华亭县"
              },
              {
                "-Id": "620825",
                "-Name": "庄浪县"
              },
              {
                "-Id": "620826",
                "-Name": "静宁县"
              }
            ]
          },
          {
            "-Id": "620900",
            "-Name": "酒泉市",
            "district": [
              {
                "-Id": "620901",
                "-Name": "市辖区"
              },
              {
                "-Id": "620921",
                "-Name": "金塔县"
              },
              {
                "-Id": "620922",
                "-Name": "瓜洲县"
              },
              {
                "-Id": "620923",
                "-Name": "肃北蒙古族自治县"
              },
              {
                "-Id": "620924",
                "-Name": "阿克塞哈萨克族自治县"
              },
              {
                "-Id": "620981",
                "-Name": "玉门市"
              },
              {
                "-Id": "620982",
                "-Name": "敦煌市"
              }
            ]
          },
          {
            "-Id": "621000",
            "-Name": "庆阳市",
            "district": [
              {
                "-Id": "621001",
                "-Name": "市辖区"
              },
              {
                "-Id": "621021",
                "-Name": "庆城县"
              },
              {
                "-Id": "621022",
                "-Name": "环县"
              },
              {
                "-Id": "621023",
                "-Name": "华池县"
              },
              {
                "-Id": "621024",
                "-Name": "合水县"
              },
              {
                "-Id": "621025",
                "-Name": "正宁县"
              },
              {
                "-Id": "621026",
                "-Name": "宁县"
              },
              {
                "-Id": "621027",
                "-Name": "镇原县"
              }
            ]
          },
          {
            "-Id": "621100",
            "-Name": "定西市",
            "district": [
              {
                "-Id": "621101",
                "-Name": "市辖区"
              },
              {
                "-Id": "621121",
                "-Name": "通渭县"
              },
              {
                "-Id": "621122",
                "-Name": "陇西县"
              },
              {
                "-Id": "621123",
                "-Name": "渭源县"
              },
              {
                "-Id": "621124",
                "-Name": "临洮县"
              },
              {
                "-Id": "621125",
                "-Name": "漳县"
              },
              {
                "-Id": "621126",
                "-Name": "岷县"
              }
            ]
          },
          {
            "-Id": "621200",
            "-Name": "陇南市",
            "district": [
              {
                "-Id": "621201",
                "-Name": "武都区"
              },
              {
                "-Id": "621221",
                "-Name": "成县"
              },
              {
                "-Id": "621222",
                "-Name": "文县"
              },
              {
                "-Id": "621223",
                "-Name": "宕昌县"
              },
              {
                "-Id": "621224",
                "-Name": "康县"
              },
              {
                "-Id": "621225",
                "-Name": "西和县"
              },
              {
                "-Id": "621226",
                "-Name": "礼县"
              },
              {
                "-Id": "621227",
                "-Name": "徽县"
              },
              {
                "-Id": "621228",
                "-Name": "两当县"
              }
            ]
          },
          {
            "-Id": "622900",
            "-Name": "临夏回族自治州",
            "district": [
              {
                "-Id": "622901",
                "-Name": "临夏市"
              },
              {
                "-Id": "622921",
                "-Name": "临夏县"
              },
              {
                "-Id": "622922",
                "-Name": "康乐县"
              },
              {
                "-Id": "622923",
                "-Name": "永靖县"
              },
              {
                "-Id": "622924",
                "-Name": "广河县"
              },
              {
                "-Id": "622925",
                "-Name": "和政县"
              },
              {
                "-Id": "622926",
                "-Name": "东乡族自治县"
              },
              {
                "-Id": "622927",
                "-Name": "积石山保安族东乡族撒拉族自治县"
              }
            ]
          },
          {
            "-Id": "623000",
            "-Name": "甘南藏族自治州",
            "district": [
              {
                "-Id": "623001",
                "-Name": "合作市"
              },
              {
                "-Id": "623021",
                "-Name": "临潭县"
              },
              {
                "-Id": "623022",
                "-Name": "卓尼县"
              },
              {
                "-Id": "623023",
                "-Name": "舟曲县"
              },
              {
                "-Id": "623024",
                "-Name": "迭部县"
              },
              {
                "-Id": "623025",
                "-Name": "玛曲县"
              },
              {
                "-Id": "623026",
                "-Name": "碌曲县"
              },
              {
                "-Id": "623027",
                "-Name": "夏河县"
              }
            ]
          }
        ]
      },
      {
        "-Id": "630000",
        "-Name": "青海省",
        "city": [
          {
            "-Id": "630100",
            "-Name": "西宁市",
            "district": [
              {
                "-Id": "630101",
                "-Name": "市辖区"
              },
              {
                "-Id": "630121",
                "-Name": "大通回族土族自治县"
              },
              {
                "-Id": "630122",
                "-Name": "湟中县"
              },
              {
                "-Id": "630123",
                "-Name": "湟源县"
              }
            ]
          },
          {
            "-Id": "632100",
            "-Name": "海东市",
            "district": [
              {
                "-Id": "632121",
                "-Name": "平安县"
              },
              {
                "-Id": "632122",
                "-Name": "民和回族土族自治县"
              },
              {
                "-Id": "632123",
                "-Name": "乐都区"
              },
              {
                "-Id": "632126",
                "-Name": "互助土族自治县"
              },
              {
                "-Id": "632127",
                "-Name": "化隆回族自治县"
              },
              {
                "-Id": "632128",
                "-Name": "循化撒拉族自治县"
              }
            ]
          },
          {
            "-Id": "632200",
            "-Name": "海北藏族自治州",
            "district": [
              {
                "-Id": "632221",
                "-Name": "门源回族自治县"
              },
              {
                "-Id": "632222",
                "-Name": "祁连县"
              },
              {
                "-Id": "632223",
                "-Name": "海晏县"
              },
              {
                "-Id": "632224",
                "-Name": "刚察县"
              }
            ]
          },
          {
            "-Id": "632300",
            "-Name": "黄南藏族自治州",
            "district": [
              {
                "-Id": "632321",
                "-Name": "同仁县"
              },
              {
                "-Id": "632322",
                "-Name": "尖扎县"
              },
              {
                "-Id": "632323",
                "-Name": "泽库县"
              },
              {
                "-Id": "632324",
                "-Name": "河南蒙古族自治县"
              }
            ]
          },
          {
            "-Id": "632500",
            "-Name": "海南藏族自治州",
            "district": [
              {
                "-Id": "632521",
                "-Name": "共和县"
              },
              {
                "-Id": "632522",
                "-Name": "同德县"
              },
              {
                "-Id": "632523",
                "-Name": "贵德县"
              },
              {
                "-Id": "632524",
                "-Name": "兴海县"
              },
              {
                "-Id": "632525",
                "-Name": "贵南县"
              }
            ]
          },
          {
            "-Id": "632600",
            "-Name": "果洛藏族自治州",
            "district": [
              {
                "-Id": "632621",
                "-Name": "玛沁县"
              },
              {
                "-Id": "632622",
                "-Name": "班玛县"
              },
              {
                "-Id": "632623",
                "-Name": "甘德县"
              },
              {
                "-Id": "632624",
                "-Name": "达日县"
              },
              {
                "-Id": "632625",
                "-Name": "久治县"
              },
              {
                "-Id": "632626",
                "-Name": "玛多县"
              }
            ]
          },
          {
            "-Id": "632700",
            "-Name": "玉树藏族自治州",
            "district": [
              {
                "-Id": "632721",
                "-Name": "玉树县"
              },
              {
                "-Id": "632722",
                "-Name": "杂多县"
              },
              {
                "-Id": "632723",
                "-Name": "称多县"
              },
              {
                "-Id": "632724",
                "-Name": "治多县"
              },
              {
                "-Id": "632725",
                "-Name": "囊谦县"
              },
              {
                "-Id": "632726",
                "-Name": "曲麻莱县"
              }
            ]
          },
          {
            "-Id": "632800",
            "-Name": "海西蒙古族藏族自治州",
            "district": [
              {
                "-Id": "632801",
                "-Name": "格尔木市"
              },
              {
                "-Id": "632802",
                "-Name": "德令哈市"
              },
              {
                "-Id": "632821",
                "-Name": "乌兰县"
              },
              {
                "-Id": "632822",
                "-Name": "都兰县"
              },
              {
                "-Id": "632823",
                "-Name": "天峻县"
              }
            ]
          }
        ]
      },
      {
        "-Id": "640000",
        "-Name": "宁夏回族自治区",
        "city": [
          {
            "-Id": "640100",
            "-Name": "银川市",
            "district": [
              {
                "-Id": "640104",
                "-Name": "兴庆区"
              },
              {
                "-Id": "640105",
                "-Name": "西夏区"
              },
              {
                "-Id": "640106",
                "-Name": "金凤区"
              },
              {
                "-Id": "640121",
                "-Name": "永宁县"
              },
              {
                "-Id": "640122",
                "-Name": "贺兰县"
              },
              {
                "-Id": "640181",
                "-Name": "灵武市"
              }
            ]
          },
          {
            "-Id": "640200",
            "-Name": "石嘴山市",
            "district": [
              {
                "-Id": "640202",
                "-Name": "大武口区"
              },
              {
                "-Id": "640205",
                "-Name": "惠农县"
              },
              {
                "-Id": "640221",
                "-Name": "平罗县"
              }
            ]
          },
          {
            "-Id": "640300",
            "-Name": "吴忠市",
            "district": [
              {
                "-Id": "640301",
                "-Name": "红寺堡区"
              },
              {
                "-Id": "640302",
                "-Name": "利通区"
              },
              {
                "-Id": "640323",
                "-Name": "盐池县"
              },
              {
                "-Id": "640324",
                "-Name": "同心县"
              },
              {
                "-Id": "640381",
                "-Name": "青铜峡市"
              }
            ]
          },
          {
            "-Id": "640400",
            "-Name": "固原市",
            "district": [
              {
                "-Id": "640401",
                "-Name": "市辖区"
              },
              {
                "-Id": "640402",
                "-Name": "原州区"
              },
              {
                "-Id": "640422",
                "-Name": "西吉县"
              },
              {
                "-Id": "640423",
                "-Name": "隆德县"
              },
              {
                "-Id": "640424",
                "-Name": "泾源县"
              },
              {
                "-Id": "640425",
                "-Name": "彭阳县"
              }
            ]
          },
          {
            "-Id": "640500",
            "-Name": "中卫市",
            "district": [
              {
                "-Id": "640501",
                "-Name": "市辖区"
              },
              {
                "-Id": "640502",
                "-Name": "沙坡头区"
              },
              {
                "-Id": "640521",
                "-Name": "中宁县"
              },
              {
                "-Id": "640522",
                "-Name": "海原县"
              }
            ]
          }
        ]
      },
      {
        "-Id": "650000",
        "-Name": "新疆维吾尔自治区",
        "city": [
          {
            "-Id": "650100",
            "-Name": "乌鲁木齐市",
            "district": [
              {
                "-Id": "650101",
                "-Name": "市辖区"
              },
              {
                "-Id": "650121",
                "-Name": "乌鲁木齐县"
              }
            ]
          },
          {
            "-Id": "650200",
            "-Name": "克拉玛依市",
            "district": {
              "-Id": "650201",
              "-Name": "市辖区"
            }
          },
          {
            "-Id": "652100",
            "-Name": "吐鲁番地区",
            "district": [
              {
                "-Id": "652101",
                "-Name": "吐鲁番市"
              },
              {
                "-Id": "652122",
                "-Name": "鄯善县"
              },
              {
                "-Id": "652123",
                "-Name": "托克逊县"
              }
            ]
          },
          {
            "-Id": "652200",
            "-Name": "哈密地区",
            "district": [
              {
                "-Id": "652201",
                "-Name": "哈密市"
              },
              {
                "-Id": "652222",
                "-Name": "巴里坤哈萨克自治县"
              },
              {
                "-Id": "652223",
                "-Name": "伊吾县"
              }
            ]
          },
          {
            "-Id": "652300",
            "-Name": "昌吉回族自治州",
            "district": [
              {
                "-Id": "652301",
                "-Name": "昌吉市"
              },
              {
                "-Id": "652302",
                "-Name": "阜康市"
              },
              {
                "-Id": "652303",
                "-Name": "米泉市"
              },
              {
                "-Id": "652323",
                "-Name": "呼图壁县"
              },
              {
                "-Id": "652324",
                "-Name": "玛纳斯县"
              },
              {
                "-Id": "652325",
                "-Name": "奇台县"
              },
              {
                "-Id": "652327",
                "-Name": "吉木萨尔县"
              },
              {
                "-Id": "652328",
                "-Name": "木垒哈萨克自治县"
              }
            ]
          },
          {
            "-Id": "652700",
            "-Name": "博尔塔拉蒙古自治州",
            "district": [
              {
                "-Id": "652701",
                "-Name": "博乐市"
              },
              {
                "-Id": "652722",
                "-Name": "精河县"
              },
              {
                "-Id": "652723",
                "-Name": "温泉县"
              }
            ]
          },
          {
            "-Id": "652800",
            "-Name": "巴音郭楞蒙古自治州",
            "district": [
              {
                "-Id": "652801",
                "-Name": "库尔勒市"
              },
              {
                "-Id": "652822",
                "-Name": "轮台县"
              },
              {
                "-Id": "652823",
                "-Name": "尉犁县"
              },
              {
                "-Id": "652824",
                "-Name": "若羌县"
              },
              {
                "-Id": "652825",
                "-Name": "且末县"
              },
              {
                "-Id": "652826",
                "-Name": "焉耆回族自治县"
              },
              {
                "-Id": "652827",
                "-Name": "和静县"
              },
              {
                "-Id": "652828",
                "-Name": "和硕县"
              },
              {
                "-Id": "652829",
                "-Name": "博湖县"
              }
            ]
          },
          {
            "-Id": "652900",
            "-Name": "阿克苏地区",
            "district": [
              {
                "-Id": "652901",
                "-Name": "阿克苏市"
              },
              {
                "-Id": "652922",
                "-Name": "温宿县"
              },
              {
                "-Id": "652923",
                "-Name": "库车县"
              },
              {
                "-Id": "652924",
                "-Name": "沙雅县"
              },
              {
                "-Id": "652925",
                "-Name": "新和县"
              },
              {
                "-Id": "652926",
                "-Name": "拜城县"
              },
              {
                "-Id": "652927",
                "-Name": "乌什县"
              },
              {
                "-Id": "652928",
                "-Name": "阿瓦提县"
              },
              {
                "-Id": "652929",
                "-Name": "柯坪县"
              }
            ]
          },
          {
            "-Id": "653000",
            "-Name": "克孜勒苏柯尔克孜自治州",
            "district": [
              {
                "-Id": "653001",
                "-Name": "阿图什市"
              },
              {
                "-Id": "653022",
                "-Name": "阿克陶县"
              },
              {
                "-Id": "653023",
                "-Name": "阿合奇县"
              },
              {
                "-Id": "653024",
                "-Name": "乌恰县"
              }
            ]
          },
          {
            "-Id": "653100",
            "-Name": "喀什地区",
            "district": [
              {
                "-Id": "653101",
                "-Name": "喀什市"
              },
              {
                "-Id": "653121",
                "-Name": "疏附县"
              },
              {
                "-Id": "653122",
                "-Name": "疏勒县"
              },
              {
                "-Id": "653123",
                "-Name": "英吉沙县"
              },
              {
                "-Id": "653124",
                "-Name": "泽普县"
              },
              {
                "-Id": "653125",
                "-Name": "莎车县"
              },
              {
                "-Id": "653126",
                "-Name": "叶城县"
              },
              {
                "-Id": "653127",
                "-Name": "麦盖提县"
              },
              {
                "-Id": "653128",
                "-Name": "岳普湖县"
              },
              {
                "-Id": "653129",
                "-Name": "伽师县"
              },
              {
                "-Id": "653130",
                "-Name": "巴楚县"
              },
              {
                "-Id": "653131",
                "-Name": "塔什库尔干塔吉克自治县"
              }
            ]
          },
          {
            "-Id": "653200",
            "-Name": "和田地区",
            "district": [
              {
                "-Id": "653201",
                "-Name": "和田市"
              },
              {
                "-Id": "653221",
                "-Name": "和田县"
              },
              {
                "-Id": "653222",
                "-Name": "墨玉县"
              },
              {
                "-Id": "653223",
                "-Name": "皮山县"
              },
              {
                "-Id": "653224",
                "-Name": "洛浦县"
              },
              {
                "-Id": "653225",
                "-Name": "策勒县"
              },
              {
                "-Id": "653226",
                "-Name": "于田县"
              },
              {
                "-Id": "653227",
                "-Name": "民丰县"
              }
            ]
          },
          {
            "-Id": "654000",
            "-Name": "伊犁哈萨克自治州",
            "district": [
              {
                "-Id": "654002",
                "-Name": "伊宁市"
              },
              {
                "-Id": "654003",
                "-Name": "奎屯市"
              },
              {
                "-Id": "654021",
                "-Name": "伊宁县"
              },
              {
                "-Id": "654022",
                "-Name": "察布查尔锡伯自治县"
              },
              {
                "-Id": "654023",
                "-Name": "霍城县"
              },
              {
                "-Id": "654024",
                "-Name": "巩留县"
              },
              {
                "-Id": "654025",
                "-Name": "新源县"
              },
              {
                "-Id": "654026",
                "-Name": "昭苏县"
              },
              {
                "-Id": "654027",
                "-Name": "特克斯县"
              },
              {
                "-Id": "654028",
                "-Name": "尼勒克县"
              }
            ]
          },
          {
            "-Id": "654200",
            "-Name": "塔城地区",
            "district": [
              {
                "-Id": "654201",
                "-Name": "塔城市"
              },
              {
                "-Id": "654202",
                "-Name": "乌苏市"
              },
              {
                "-Id": "654221",
                "-Name": "额敏县"
              },
              {
                "-Id": "654223",
                "-Name": "沙湾县"
              },
              {
                "-Id": "654224",
                "-Name": "托里县"
              },
              {
                "-Id": "654225",
                "-Name": "裕民县"
              },
              {
                "-Id": "654226",
                "-Name": "和布克赛尔蒙古自治县"
              }
            ]
          },
          {
            "-Id": "654300",
            "-Name": "阿勒泰地区",
            "district": [
              {
                "-Id": "654301",
                "-Name": "阿勒泰市"
              },
              {
                "-Id": "654321",
                "-Name": "布尔津县"
              },
              {
                "-Id": "654322",
                "-Name": "富蕴县"
              },
              {
                "-Id": "654323",
                "-Name": "福海县"
              },
              {
                "-Id": "654324",
                "-Name": "哈巴河县"
              },
              {
                "-Id": "654325",
                "-Name": "青河县"
              },
              {
                "-Id": "654326",
                "-Name": "吉木乃县"
              }
            ]
          },
          {
            "-Id": "659000",
            "-Name": "省直辖行政单位",
            "district": [
              {
                "-Id": "659001",
                "-Name": "石河子市"
              },
              {
                "-Id": "659002",
                "-Name": "阿拉尔市"
              },
              {
                "-Id": "659003",
                "-Name": "图木舒克市"
              },
              {
                "-Id": "659004",
                "-Name": "五家渠市"
              }
            ]
          }
        ]
      },
      {
        "-Id": "990000",
        "-Name": "新疆建设兵团",
        "city": [
          {
            "-Id": "990100",
            "-Name": "第一师"
          },
          {
            "-Id": "990200",
            "-Name": "第二师"
          },
          {
            "-Id": "990300",
            "-Name": "第三师"
          },
          {
            "-Id": "990400",
            "-Name": "第四师"
          },
          {
            "-Id": "990500",
            "-Name": "第五师"
          },
          {
            "-Id": "990600",
            "-Name": "第六师"
          },
          {
            "-Id": "990700",
            "-Name": "第七师"
          },
          {
            "-Id": "990800",
            "-Name": "第八师"
          },
          {
            "-Id": "990900",
            "-Name": "第九师"
          },
          {
            "-Id": "991000",
            "-Name": "第十师"
          },
          {
            "-Id": "991100",
            "-Name": "建工师"
          },
          {
            "-Id": "991200",
            "-Name": "第十二师"
          },
          {
            "-Id": "991300",
            "-Name": "第十三师"
          },
          {
            "-Id": "991400",
            "-Name": "第十四师"
          }
        ]
      }
    ]
  }
},
    //自动生成供货商编号规则(总计12位)：(省市县各2位，后4位随机)
    //省：
    //市：
    //县：
    //
    createSupplierNumber:function(){
		
    },
    //生成省的编号
    createProNum:function(key){
		
		
    },
    //生成市的编号
    createCityNum:function(){

    },
    //生成县区编号
    createCounNum:function(){
		
    }
   
}


//!function(){
//	var pro=["北京市", "天津市", "上海市", "重庆市", "河北省", "山西省", "内蒙古", "辽宁省", "吉林省", "黑龙江省", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省", "河南省", "湖北省", "湖南省", "广东省", "广西", "海南省", "四川省", "贵州省", "云南省", "西藏", "陕西省", "甘肃省", "青海省", "宁夏", "新疆", "香港", "澳门", "台湾省"];
//  
//  for (var i=0;i<pro.length;i++) {
//  	var index=i<10?'0'+i:i;
//  	var obj={};
//  	obj[index]=pro[i];
//  	config.area_num.pro.push(obj);
//  }
//  
//  
//  for (var i=0;i<config.area_num.pro.length;i++) {
//  	for(var j in config.area_num.pro[i]){
//  		var obj={};
//  		
//  		config.area_num.city.push()
//  	}
//  }
//  
//  
//}()







