<?php
namespace app\admin\model;

use think\Controller;
use think\Db;

class AaLogic extends Controller {
    public $table = 'wd_shop_store';
    public $goodsTable= 'wd_good';//商品表
    public $goodsField = ['id,retails'];//商品字段
    public $data  = '';
    public $code  = 200;
    public $msg   = '成功';
    /**
     * 同步库存商品到店铺
     */
    public function add($shopId) {
        //1.先找出店铺的商品ID
        $this->searchGoodsId($shopId);
//        echo '<pre>';
        //print_r($this->data);
        //2.找出库存中店铺没有的商品ID
        $this->searchDifferent($shopId,$this->data);
//        print_r($this->data);
//        die;
        //3.数据为空,已经同步过
        if (empty($this->data)) {

        }else{
            //4.入库
            $res = Db::table($this->table)->insertAll($this->data);
            if ($res == 0) {
                $this->code = 400;
                $this->msg  = '添加失败';
            }
        }

    }
    /**
     *找出店铺的商品ID
     */
    public function searchGoodsId($shopId) {
        $where['shop_id'] = ['=',$shopId];

        $this->data = Db::table($this->table)->where($where)->field('good_id')->select();
        $this->data = $this->translateTwoArray($this->data);

    }
    /**
     * 找出库存中,店铺没有的商品
     */
    public function searchDifferent($shopId,$data) {
        $where['id'] = ['not in',$data];
        $this->data = Db::table($this->goodsTable)->where($where)->field($this->goodsField)->select();
        //判断二维数组是否为空
        if (empty($this->data[0])) {
            $this->code = 300;
            $this->msg  = '商品已经全部同步';
        }else{
            //改变原始数据直接存数据库
            $this->data = $this->translateDifferArray($shopId,$this->data);
        }
    }
    /**
     * 二维数组转化
     */
    public function translateTwoArray($data) {
        $newArr = array();
        foreach ($data as $k=>$v) {
            $newArr[] = $v['good_id'];
        }
        return $newArr;
    }
    /**
     *
     */
    public function translateDifferArray($shopId,$data) {

        $newArr = array();
        foreach ($data as $k=>$v) {
            $newArr[$k]['shop_id'] = $shopId;
            $newArr[$k]['good_id'] = $v['id'];
            $newArr[$k]['price']   = $v['retails'];
        }
        return $newArr;
    }
}
?>