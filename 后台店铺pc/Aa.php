<?php
namespace app\admin\controller;
use app\admin\model\AaLogic;
use think\Controller;
use think\Request;
class Aa extends Controller{

   /**
    * 同步仓库商品信息到店铺
    */
   public function storeToShop() {
       $shopId = 2;//Request::instance()->post('shopId');
       if (empty($shopId)) {
           return json([
               'code'    => 400,
               'message' => '店铺ID不能为空',
           ]);
       }
       $aaObj = new AaLogic();
       $aaObj->add($shopId);
       return json([
           'code'    => $aaObj->code,
           'message' => $aaObj->msg,
       ]);

   }
}
?>