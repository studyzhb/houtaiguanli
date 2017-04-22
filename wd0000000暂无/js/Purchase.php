<?php
namespace app\admin\controller;
use think\Controller;
use think\Db;
use think\Request;
use think\Config;
use think\Session;
use app\admin\controller\Base;
/**
 * 关于采购单的操作类
 */
class Purchase extends Controller {
	/**
	 * 入库成功订单的查看
	 */
    public function inputSuccess(){
        $p=input('p')?input('p'):1; //默认第一页
        $pageCount = Config::get('pageCount');
        //显示成功的列表       
            $lst = Db::table('wd_good_buyer')->alias('a')->field('a.*,b.name deptName,c.name supplierName,d.name adminName,e.name adminName')
                        ->join('wd_dept b', 'a.dept_id=b.id','left')->join('wd_supplier c','a.supplier=c.id','left')->join('wd_admin d','a.admin=d.id','left')
                        ->join('wd_admin e','a.admin=e.id','left')->where('a.status', 2)->order('a.id desc')->page($p,$pageCount)->select();
            foreach ($lst as $k=>&$v){
                $v['create_time']=date('Y-m-d H:i:s',$v['create_time']);
                if (!empty($v['otime'])){
                    $v['otime']=date('Y-m-d H:i:s',$v['otime']);
                }
                if (!empty($v['ttime'])){
                    $v['ttime']=date('Y-m-d H:i:s',$v['ttime']);
                }
            }
            $num=Db::table('wd_good_buyer')->where('status', 2)->count('id');//得出商品总条数
            $count=ceil($num/$pageCount);
            return json(['lst'=>$lst,'num'=>$num,'count'=>$count]);
    }
	/*public function inputSuccess(){
		$p=input('p')?input('p'):1; //默认第一页
		$pageCount = Config::get('pageCount');
		//显示成功的列表		
			$lst=Db::table('wd_good_buyer')->alias('a')->field('a.*,b.name deptName,c.name supplierName,d.name adminName,e.name firstName,f.name secondName')
			->join('wd_dept b','a.dept_id=b.id')->join('wd_supplier c','a.supplier=c.id')->join('wd_admin d','a.admin=d.id','left')
			->join('wd_admin e','a.reviewedpo=e.id','left')->join('wd_admin f','a.reviewdpt=e.id','left')
			->where('a.status',2)->order('a.id desc')->page($p,$pageCount)->select();
			foreach ($lst as $k=>&$v){
				$v['create_time']=date('Y-m-d H:i:s',$v['create_time']);
				if (!empty($v['otime'])){
					$v['otime']=date('Y-m-d H:i:s',$v['otime']);
				}
				if (!empty($v['ttime'])){
					$v['ttime']=date('Y-m-d H:i:s',$v['ttime']);
				}
			}
			$num=Db::table('wd_good_buyer')->where('status', 2)->count('id');//得出商品总条数
			$count=ceil($num/$pageCount);
			return json(['lst'=>$lst,'num'=>$num,'count'=>$count]);
	}*/

    /**
     * 采购单审核
     */
	public function shenhe(){

    }
	/**
	 * 采购单审核时添加商品
	 */
	public function purchaseAdd(){
		if (request()->isPost()){
			$data=json_decode(input('goods'),true);
			$buyerId=input('buyer_id');
			//声明一个空数组,存放查询的商品信息
			$data1=array();
			$dposit='';			
			foreach ($data as $k=>$v){
				$data1[]=Db::table('wd_good')->alias('a')->field('a.coding,a.barcode,a.name,b.gg,a.buyprice price')
											->join('wd_good_gg b','a.gg_id=b.id','left')->where('a.id',$v['good_id'])->find();
				 $data1[$k]['buyer_id']=$buyerId;
				$data1[$k]['good_id']=$v['good_id'];
				$data1[$k]['unm']=$v['unm']; 
				//计算要增加的金额
				$price=$data1[$k]['price'];
				$dposit+=$v['unm']*$price;
			}
			$statu = false;
			//启动事务
			 Db::startTrans();
			try { 
			//插入采购详情表			
			Db::table('wd_good_buyer_det')->insertAll($data1);
			//更新采购的单的总金额
			Db::table('wd_good_buyer')->where('id',$buyerId)->setInc('dposit',$dposit);
			$statu = true;			
			Db::commit();
			 } catch (\Exception $e) {
				// 回滚事务
				Db::rollback();
			} 
		}
		if (!empty(input('id'))){
			$data = Db::table('wd_good_buyer_det')->field('buyer_id,coding,barcode,name,unm,price,gg')->where('buyer_id', input('id'))->select();
			$info=Db::table('wd_good_buyer')->alias('a')->field('a.dposit,a.oddnum,b.name supplierName,b.id supplierId,c.name deptName')->join('wd_supplier b','a.supplier=b.id')
											->join('wd_dept c','a.dept_id=c.id')->where('a.id', input('id'))->select();
			return json(['data'=>$data,'info'=>$info]);
		}
	}
	/**
	 * 商品库存列表
	 */
	public function storeLst(){
		$p=input('p')?input('p'):1; //默认第一页
		$pageCount = Config::get('pageCount');
		//第一个供货商
		$first=Db::name('supplier')->limit('0,1')->value('id');
		//第一个仓库
		$cfirst=Db::table('wd_dept')->limit('0,1')->where('type_id',2)->value('id');
		if (!empty(input('supplierId')&&empty(input('cangkuId')))){
			$supplierId=input('supplierId');
			$lst=Db::table('wd_good_stock')->alias('a')->field('b.id deptId,b.name deptName,c.id goodId,c.barcode,c.name goodName,c.eachsale,c.buyprice,c.wholesale,d.id supplierId,d.name supplierName,a.stock,e.id brandId,e.brand brandName')
			->join('wd_dept b','a.dept_id=b.id','left')->join('wd_good c','a.good_id=c.id','left')
			->join('wd_supplier d','c.supplier_id=d.id')->join('wd_good_brand e','c.good_brand_id=e.id')
			->where('d.id',$supplierId)->page($p,$pageCount)->select();
			//算总数量页数
			$num=Db::table('wd_good_stock')->alias('a')->join('wd_dept b','a.dept_id=b.id','left')->join('wd_good c','a.good_id=c.id','left')->join('wd_supplier d','c.supplier_id=d.id')
											->where('d.id',$supplierId)->count('a.id');//得出商品总条数
    		$count=ceil($num/$pageCount);
			return json(['lst'=>$lst,'num'=>$num,'count'=>$count]);
			//return json(['lst'=>$lst]);
		}	
		if (!empty(input('supplierId')&&!empty(input('cangkuId')))){
			$supplierId=input('supplierId');
			$deptId=input('cangkuId');
			$lst=Db::table('wd_good_stock')->alias('a')->field('b.id deptId,b.name deptName,c.id goodId,c.barcode,c.name goodName,c.eachsale,c.buyprice,c.wholesale,d.id supplierId,d.name supplierName,a.stock,e.id brandId,e.brand brandName')
			->join('wd_dept b','a.dept_id=b.id','left')->join('wd_good c','a.good_id=c.id','left')
			->join('wd_supplier d','c.supplier_id=d.id')->join('wd_good_brand e','c.good_brand_id=e.id')
			->where('d.id',$supplierId)->where('a.dept_id',$deptId)->page($p,$pageCount)->select();
			//算总数量页数
			 $num=Db::table('wd_good_stock')->alias('a')->join('wd_dept b','a.dept_id=b.id','left')->join('wd_good c','a.good_id=c.id','left')->join('wd_supplier d','c.supplier_id=d.id')
											->where('d.id',$supplierId)->where('a.dept_id',$deptId)->count('a.id');//得出商品总条数
    		$count=ceil($num/$pageCount);
			return json(['lst'=>$lst,'num'=>$num,'count'=>$count]);
    		//return json(['lst'=>$lst]);
		}
		 $lst=Db::table('wd_good_stock')->alias('a')->field('b.id deptId,b.name deptName,c.id goodId,c.barcode,c.name goodName,c.eachsale,c.buyprice,c.wholesale,d.id supplierId,d.name supplierName,a.stock,e.id brandId,e.brand brandName')
										->join('wd_dept b','a.dept_id=b.id','left')->join('wd_good c','a.good_id=c.id','left') 
										->join('wd_supplier d','c.supplier_id=d.id')->join('wd_good_brand e','c.good_brand_id=e.id')
		 								->where('d.id',$first)->where('a.dept_id',$cfirst)->page($p,$pageCount)->select();
		 //算总数量页数
		 $num=Db::table('wd_good_stock')->alias('a')->join('wd_dept b','a.dept_id=b.id','left')->join('wd_good c','a.good_id=c.id','left')
										->join('wd_supplier d','c.supplier_id=d.id')->count('a.id');//得出商品总条数
    		$count=ceil($num/$pageCount);
			//return json(['lst'=>$lst,'num'=>$num,'count'=>$count]);
    		//return json(['lst'=>$lst]);
		 //获取供应商的信息
		 $supplier = Db::name('supplier')->field('name,id supplierId')->select();
		 //获取所有的仓库
		 $cangKu= Db::table('wd_dept')->field('id,name,type_id,pid')->where('type_id',2)->select();
		 return json(['lst'=>$lst,'supplier'=>$supplier,'cangku'=>$cangKu,'lst'=>$lst,'num'=>$num,'count'=>$count]);
	}								
    /**
     * 采购单修改的数据更新
     */
    public function edit() {
        if (request()->isPost()) {           
                $data = input('');  
                $buyerId='';
                $adminId=Session::get('adminId');
                // return json($data);    
                $info1=json_decode($data['goods'],true); 
                //更新商品的数量		
                $prices = '';
                $price='';
                $statu = false;
                Db::startTrans();
                try {
                	$del = json_decode($data['dele'],true);
                    //删除的商品ID在￥del里面
                	  if (!empty($del)){
                		Db::table('wd_good_buyer_det')->where(['id'=>['in',$del]])->delete();                			
                	}  
                    //商品的数量
               if (!empty($info1)){   
               	$buyerId = $info1[0]['buyer_id'];
                foreach ($info1 as $k => $v) {
                    //$price = Db::table('wd_good_buyer_det')->where('id', $v['id'])->value('price');
                    $price = Db::table('wd_good')->where('id', $v['id'])->value('buyprice');
                    Db::name('GoodBuyerDet')->where(['id' => ['=', $v['id']]])->update(['unm' => $v['unm']]);
                    $prices += $price * $v['unm'];
                }
                //更新总价格 和总价
                Db::table('wd_good_buyer')->where(['id'=>['=',$buyerId],'status'=>['in','0,10']])->update(['dposit' => $prices,'status'=>1,'reviewedpo'=>$adminId,'otime'=>time()]);
               } else{
               	//如果为空直接将订单总价变为0
               	$id=input('orderlistId');
               	Db::table('wd_good_buyer')->where('id',$id)->update(['dposit'=>0,'status'=>1,'reviewedpo'=>$adminId,'otime'=>time()]);               	
               }             
               
                $statu = true;
                // 提交事务
                Db::commit();
            } catch (Exception $e) {
                // 回滚事务
                Db::rollback();
            }
            if ($statu) {
            	
                return json(['code' => 200]);
            } else {
                return json(['code' => 400]);
            }
        }
        //根据ID取出采购单
        $id = input('id');
        if (!empty($id)) {
            $lst = Db::table('wd_good_buyer')->alias('a')->field('a.dposit,b.buyer_id,b.id ,b.barcode,b.good_id,b.name goods,b.unm,b.price,b.gg,c.name supplier,c.coding,d.id DeptId,d.name DeptName,f.eachsale')
                            ->join('wd_good_buyer_det b', 'a.id=b.buyer_id','left')
                            ->join('wd_supplier c', 'a.supplier=c.id','left')
                            ->join('wd_dept d', 'a.dept_id=d.id','left')
                            ->join('wd_good f','b.good_id=f.id','left')
                            ->where('a.id', $id)->select();
            $id=Db::table('wd_good_buyer')->where('id',$id)->value('id');
            $oddnum=Db::table('wd_good_buyer')->where('id',$id)->value('oddnum');
            $dposit=Db::table('wd_good_buyer')->where('id',$id)->value('dposit');
            //$gg=Db::table('wd_good_gg')->field('id,gg')->select();
            return json(['lst' => $lst,'id'=>$id,'oddnum'=>$oddnum,'dposit'=>$dposit]);
        }
        //商品规格
    }

    /**
     * 采购单的查看确认
     * @return \think\response\Json
     */
   /*  public function check() {
        //采购单的确认
        if (request()->isPost()) {
            //采购1审通过
            $buyerId = input('buyer_id');
            if (!empty($buyerId)) {
            	//取出审核人
            	$adminId=Session::get('adminId');
                $res = Db::table('wd_good_buyer')->where('id',$buyerId)->fetchSql(true)->update(['status'=>1,'reviewedpo'=>$adminId,'otime'=>time()]);
                 var_dump($res);
                 exit();
                if ($res) {
                    return json(['code' => 200]);
                }
                //确认失败
                return json(['code' => 400]);
            }
        }
        $id = input('buyer_id');
        if (!empty($id)) {
            $data = Db::table('wd_good_buyer')->alias('a')->field('b.buyer_id,b.barcode,b.name,b.unm,b.price,b.gg')
                            ->join('wd_good_buyer_det b', 'a.id=b.buyer_id')
                            ->where('a.id', $id)->select();
            return json(['data' => $data]);
        }
    } */

    /**
     * 
     * @return 显示采购单的列表
     */
    public function lst() {
        /* $lst=Db::table('wd_good_buyer')->alias('a')->field('a.*,b.name,c.currency')
          ->join('wd_dept b','a.dept_id=b.id')->join('wd_currency c','a.currency_id=c.id')->select(); */
    	$p=input('p')?input('p'):1; //默认第一页
    	$pageCount = Config::get('pageCount');
    	$status=input('status');    	
    	//显示一审通过的采购单
    	if ($status==1){
    		$lst = Db::table('wd_good_buyer')->alias('a')->field('a.*,b.name deptName,c.name supplierName,d.name adminName,e.name adminName')
    				->join('wd_dept b', 'a.dept_id=b.id')->join('wd_supplier c','a.supplier=c.id')->join('wd_admin d','a.admin=d.id')
    				->join('wd_admin e','a.admin=e.id')->where('a.status', 1)->order('a.id desc')->page($p,$pageCount)->select();
    		foreach ($lst as $k=>&$v){
    			$v['create_time']=date('Y-m-d H:i:s',$v['create_time']);
    		}
    		$num=Db::table('wd_good_buyer')->where('status', 1)->count('id');//得出商品总条数
    		$count=ceil($num/$pageCount);
    		return json(['lst'=>$lst,'num'=>$num,'count'=>$count]);
    		//return json($lst);
    	}
		//未审核的采购单
		if ($status==0){
			 $lst = Db::table('wd_good_buyer')->alias('a')->field('a.*,b.name deptName,c.name supplierName,d.name adminName,e.name adminName')
                        ->join('wd_dept b', 'a.dept_id=b.id','left')->join('wd_supplier c','a.supplier=c.id','left')->join('wd_admin d','a.admin=d.id','left')
			 			->join('wd_admin e','a.admin=e.id','left')->where('a.status', 0)->order('a.id desc')->page($p,$pageCount)->select();
			 foreach ($lst as $k=>&$v){
			 	$v['create_time']=date('Y-m-d H:i:s',$v['create_time']);
			 }
			 $num=Db::table('wd_good_buyer')->where('status', 0)->count('id');//得出商品总条数
			 $count=ceil($num/$pageCount);
			 return json(['lst'=>$lst,'num'=>$num,'count'=>$count]);
			// return json($lst);
		}
		//被拒绝的采购单
       if ($status==10){
      	 	$lst = Db::table('wd_good_buyer')->alias('a')->field('a.*,b.name deptName,c.name supplierName,d.name adminName,e.name adminName')
       				->join('wd_dept b', 'a.dept_id=b.id')->join('wd_supplier c','a.supplier=c.id')->join('wd_admin d','a.admin=d.id')
      	 			->join('wd_admin e','a.admin=e.id')->where('a.status', 10)->order('a.id desc')->page($p,$pageCount)->select();
      	 	$num=Db::table('wd_good_buyer')->where('status', 10)->count('id');//得出商品总条数
      	 	foreach ($lst as $k=>&$v){
      	 		$v['create_time']=date('Y-m-d H:i:s',$v['create_time']);
      	 	}
      	 	$count=ceil($num/$pageCount);
      	 	return json(['lst'=>$lst,'num'=>$num,'count'=>$count]);
      	 	//return json($lst);
       }
        
    }

    /**
     * 采购单的生成
     */
    public function add() {
    	//如果是Post提交就提交信息入库
    	if (request()->isPost()) {
    		//查询当前操作员的身份信息
    		/* $token=input('token');
    		$id=Cache::get($token); */
    		$id=Session::get('adminId');
    		$statu = false;
    		//生成订单,启动事务
    		   Db::startTrans();
    		try {   
    			$data = input('');
    			$info1 = json_decode($data['goods'], true);
    			/*                 * ******************计算出订单的总价钱******************************************************  */
    			$prices='';
    			foreach ($info1 as $k => $v) {
    				$price = Db::table('wd_good')->where('id', $info1[$k]['good_id'])->value('buyprice');
    				$prices += $price*$v['unm'];
    			}
    			/*   $len = count($totle);
    			 $totlePrice = '';
    			 for ($i = 1; $i < $len; $i++) {
    			 $totlePrice += $totle[$i];
    			 } */
    			/*                 * ***   以上是算出商品的总价钱****************** */
    			$data['create_time'] = time();
    			$data['dposit'] = $prices;
    			$data['admin']=$id;
    			$data['uadmin']=$id;
    			model('Buyer')->allowField(true)->save($data);
    			//获取自增ID
    			$buyerId = Db::name('user')->getLastInsID();
    			foreach ($info1 as $k => $v) {
    			    //查询商品单价存入订单详情
    				$info2 = Db::table('wd_good')->alias('a')->field('a.id good_id,a.coding,a.name,a.barcode,b.gg,a.buyprice price')
    				->join('wd_good_gg b', 'a.gg_id=b.id','left')
    				->where('a.id', $info1[$k]['good_id'])->find();
    			 if (!empty($info2['gg'])){    					
    					$arr[]=['buyer_id'=>$buyerId,'good_id'=>$info2['good_id'],'coding'=>$info2['coding'],'barcode'=>$info2['barcode'],'name'=>$info2['name'],'gg'=>$info2['gg'],'price'=>$info2['price'],'unm'=>$v['unm']];
    				}else{
    					$arr[]=['buyer_id'=>$buyerId,'good_id'=>$info2['good_id'],'coding'=>$info2['coding'],'barcode'=>$info2['barcode'],'name'=>$info2['name'],'gg'=>' ','price'=>$info2['price'],'unm'=>$v['unm']];
    				}       				
    	 	}
    			 Db::table('wd_good_buyer_det')->insertAll($arr);
    			$statu = true;
    
    		 	Db::commit();
    		  } catch (\Exception $e) {
    			// 回滚事务
    			Db::rollback();
    		}    
    		if ($statu) {
    			return json(['code' => 200]);
    		} else {
    			return json(['code' => 400]);
    		}
    	} else {
    		//获取供应商的名字
    		$supplier = Db::name('supplier')->field('name,id')->select();
    		//获取仓库的名字
    		//$stock=Db::name('good_stock')->alias('a')->field('b.name')->join('wd_dept b','a.dept_id=b.id')->select();
    		$deptId = Db::name('dept')->field('name,id')->where('type_id', '2')->select(); //类型ID为2的是仓库
    		//商品规格
    		$gg = Db::table('wd_good_gg')->field('id,gg')->select();
    		return json(['supplier' => $supplier, 'dept_id' => $deptId, 'gg' => $gg]);
    	}
    }

    /**
     * Ajax获取采购商品的信息
     */
    public function getInfo() {
    	//$supplier_id=input('supplier_id');
    	if (!empty(input('supplier_id'))){
    		$where['a.supplier_id']=['=',input('supplier_id')];
    	}else{
            $where['a.supplier_id']=['=',54];
        }
    	//
         //根据商品编码进行搜索
        if (input('coding')) {
           $where['a.coding']=['like','%' . input('coding') . '%'];
            $coding = Db::table('wd_good')->alias('a')->field('a.*,b.brand,c.gg')->join('wd_good_brand b', 'a.good_brand_id=b.id','left')
                            ->join('wd_good_gg c', 'a.gg_id=c.id','left')->where($where)->select();
            return json($coding);
        }
        //根据商品条码进行搜索
        if (input('barcode')) {
           $where['a.barcode']=['like','%' . input('barcode'). '%'];
            $barcode = Db::table('wd_good')->alias('a')->field('a.*,b.brand,c.gg')->join('wd_good_brand b', 'a.good_brand_id=b.id','left')
                            ->join('wd_good_gg c', 'a.gg_id=c.id','left')->where($where)->select();
            return json($barcode);
        }
        //根据商品名字进行搜索
        if (input('name')) {
             $where['a.name']=['like','%' . input('name') . '%'];
            $name = Db::table('wd_good')->alias('a')->field('a.*,b.brand,c.gg')->join('wd_good_brand b', 'a.good_brand_id=b.id','left')
                            ->join('wd_good_gg c', 'a.gg_id=c.id','left')->where($where)->select();
            return json($name);
        }
        //根据供应商ID查询商品
        $data= Db::table('wd_good')->alias('a')->field('a.*,b.brand,c.gg,d.name supplierName')->join('wd_good_brand b', 'a.good_brand_id=b.id','left')
            ->join('wd_good_gg c', 'a.gg_id=c.id','left')->join('wd_supplier d','a.supplier_id=d.id')->where($where)->select();
    	    return json($data);
        //根据供应商ID取出所有
       /*  if (input('id')) {
            $id = input('id');
            $data = Db::table('wd_good')->field('coding,name,barcode,jname,zname,buyprice,wholesale')->where('id', $id)->select();
            return json($data);
        } */
    }

}
