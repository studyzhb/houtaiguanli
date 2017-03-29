<?php
namespace app\admin\controller;
use app\admin\model\SpecialShop;
use think\console\command\make\Controller;
use think\Db;
use think\Config;
use think\Session;
use think\Request;
use Workerman\Events\Select;
use app\admin\controller\Base;
/**
 * 和仓库有关的类
 * @author Administrator
 *
 */
class Store extends Controller {
	protected $beforeActionList  = [
			'recordInput'  => ['only'=>'storeInput'],
			'recordOutput'  => ['only'=>'peisong'],
	];
	/**
	 * 进库流水跟踪
	 */
	protected function recordInput(){
		if ('true'==input('enter')){
			$id=input('id');
			$specialShop=new SpecialShop;
			$specialShop->setShopSpecial($id);
			/* $token=input('token');
			$adminId=Cache::get($token); */
			$adminId=Session::get('adminId');
			//防止重复提交
			$number=Db::table('wd_good_buyer')->where('id',$id)->value('status');
			if ($number==2){				
			}else{
				$data=Db::table('wd_good_buyer')->alias('a')->field('c.name deptname,d.name goodname,b.unm num,b.gg')//去个别名叫num,不用动之前的代码了
											->join('wd_good_buyer_det b','a.id=b.buyer_id')->join('wd_dept c','a.dept_id=c.id')
											->join('wd_good d','b.good_id=d.id')->where('a.id',$id)->select();
			foreach ($data as $k=>&$v){
				$v['time']=time();
				$v['store']=1;
				$v['admin_id']=$adminId;
			}
			Db::table('wd_record')->insertAll($data);
			}
		}
	}
	/**
	 * 出库流水跟踪
	 */
	protected function recordoutput(){
		$id=input('good_outgoing_id');
		$adminId=Session::get('adminId');
		$num=Db::table('wd_good_outgoing')->where('id',$id)->value('status');
		if ($num==5){
			
		}else{
			$data=Db::table('wd_good_outgoing')->alias('a')->field('c.name deptname,d.name goodname,b.num,b.gg,e.name shopname')//去个别名叫num,不用动之前的代码了
											->join('wd_good_outgoing_det b','a.id=b.good_outgoing_id')->join('wd_dept c','a.dept_id=c.id')
											->join('wd_good d','b.good_id=d.id')->join('wd_b_shop e','a.shop_id=e.id')
											->where('a.id',$id)->select();
			foreach ($data as $k=>&$v){
				$v['time']=time();
				$v['store']='-1';
			}
			$res=Db::table('wd_record')->insertAll($data);
		}
	}
	
	/**
	 * 入库单详情的查看
	 */
	public function check(){
		$id=input('id');
		if (!empty($id)){
		    $status=input('status');
		    if (empty($status)){
                $data=Db::table('wd_good_buyer')->alias('a')->field('a.id,a.dposit,a.checkdposit,b.id buyerDetId,b.buyer_id,b.barcode,b.good_id,b.name,b.unm,b.price,b.gg,b.checknum,b.checkprice,c.id deptId,c.name deptName,d.id supplierId,d.name supplierName')
                    ->join('wd_good_buyer_det b','a.id=b.buyer_id')->join('wd_dept c','a.dept_id=c.id')->join('wd_supplier d','a.supplier=d.id')
                    ->where('a.id',$id)->where('a.status',1)->select();
                return json(['data'=>$data]);
            }else{
                $data=Db::table('wd_good_buyer')->alias('a')->field('a.id,a.dposit,a.checkdposit,b.id buyerDetId,b.buyer_id,b.barcode,b.good_id,b.name,b.unm,b.price,b.gg,b.checknum,b.checkprice,c.id deptId,c.name deptName,d.id supplierId,d.name supplierName')
                    ->join('wd_good_buyer_det b','a.id=b.buyer_id')->join('wd_dept c','a.dept_id=c.id')->join('wd_supplier d','a.supplier=d.id')
                    ->where('a.id',$id)->where('a.status',$status)->select();
                return json(['data'=>$data]);
            }

		}
	}
	/**
	 * 商品入库单的数量的校量
	 */
	public function editInput(){
		if (request()->isPost()){
			//return json(input());
			$data=input('goods');
			$data=json_decode($data,true);
			$prices='';
			$checkdposit='';
			//生成订单,启动事务
			   /* Db::startTrans();
			try {   */
			$statu=false; 
			foreach ($data as $k=>$v){	
				$price = Db::table('wd_good')->where('id', $v['good_id'])->value('buyprice');
				$prices=$price*$v['unm'];//采购单详情的价钱
				$checkdposit+=$price*$v['unm'];//采购单的总价
				/* Db::table('wd_good_buyer_det')->where('id',$v['buyerDetId'])->update(['checknum' =>$v['unm'],'checkprice'=>$prices]);
				Db::table('wd_good_buyer')->where('id',$v['buyerDetId'])->update(['checknum' =>$v['unm'],'checkprice'=>$prices]); */
				//根据buyerDetId查出unm和提交的checknum作比较,不相等加标记
				$num=Db::table('wd_good_buyer_det')->where('id',$v['buyerDetId'])->value('unm');
				//查出的数量和提交的数量相等
				if ($num==$v['unm']){
					//更新采购单详情核实数量和检测状态
					Db::table('wd_good_buyer_det')->where('id',$v['buyerDetId'])->update(['checknum'=>$v['unm'],'checkprice'=>$prices,'checktime'=>time()]);
					//更新采购单状态
					Db::table('wd_good_buyer')->where('id',$v['id'])->update(['checkstatus'=>1]);
				}else{
					//更新采购单详情核实数量和检测状态
					Db::table('wd_good_buyer_det')->where('id',$v['buyerDetId'])->update(['checknum'=>$v['unm'],'checkprice'=>$prices,'checktime'=>time()]);
					//更新采购单状态
					Db::table('wd_good_buyer')->where('id',$v['id'])->update(['checkstatus'=>0]);
				}				
			}
			Db::table('wd_good_buyer')->where('id',$data[0]['id'])->update(['checkdposit'=>$checkdposit]);
			  $statu = true;
             /*    Db::commit();
            } catch (\Exception $e) {
                // 回滚事务		        	 
                Db::rollback(); 
            }    */
            if ($statu) {
                return json(['code' => 200]);
            }else {
                return json(['code' => 400]);
            }
		}
	}
	/**
	 * 入库单校量后入库
	 */
	/* public function rStoreInput(){
		if (request()->isPost()){
			$data=input('');
			$status = false;
			//启动事务
			Db::startTrans();
			try{
			//根据订单号查出商品ID和店铺ID
			$info=Db::table('wd_good_buyer')->alias('a')->field('a.dept_id,b.good_id')
												->join('wd_good_buyer_det b','a.oddnum=b.buyer_id')->where('a.id',$data['id'])->find();
			foreach($data as $k=>$v){
				$num=Db::table('wd_good_stock')->where('good_id',$info['good_id'])->where('dept_id',$info['dept_id'])->find();
			if (!empty($num)){
				Db::table('wd_good_stock')->where('good_id',$v['good_id'])->where('dept_id',$v['dept_id'])->setInc('stock',$v['unm']);
				}else {
			 		$arr=['dept_id'=>$v['dept_id'],'good_id'=>$v['good_id'],'stock'=>$v['unm'],'updatetime'=>time()];
					Db::table('wd_good_stock')->insert($arr);
						}
					}
			// 提交事务
			$status = true;
			Db::commit();
			} catch (\Exception $e) {
				// 回滚事务
				Db::rollback();
			}
			if ($status){
				return json(['code'=>200]);
			}
			return json(['code'=>400]);
		}		
	} */
	/**
	 * 
	 * @return 商品入库的方法
	 */
	public function storeinput(){
		//post提交判断是拒绝订单还是确认入库
		if (request()->isPost()){
			//审核状态不通过,状态改为0
			//return json(input())
			//二审人和时间
			 /* $token=input('token');
			$adminId=Cache::get($token);  */
			$adminId=Session::get('adminId');
			if ('false'==input('enter')){
				$id=input('id');
				//获取未通过的原因
				$note=input('note')?input('note'):'未知';
				$res=Db::table('wd_good_buyer')->where('id',$id)->update(['status'=>10,'note'=>$note,'reviewdpt'=>$adminId]);
				if ($res){
					return json(['code'=>200]);					
				}
				return json(['code'=>400]);
			}
			//二审确认入库
			if ('true'==input('enter')){
				$status = false;
				$id=input('id');
				//防止重复提交
				$number=Db::table('wd_good_buyer')->where('id',$id)->value('status');
				if ($number==2){
					return json(['code'=>400,'mess'=>'请不要重复提交']);
				}				
				
				//启动事务
				  Db::startTrans();
				try{  
					//二审人和时间
				Db::table('wd_good_buyer')->where('id',$id)->update(['status'=>2,'reviewdpt'=>$adminId,'ttime'=>time()]);
	/*  **********************************************************************************************************************/				 
				//$res=Db::table('wd_good_buyer')->where('id',$id)->setField('status', '2'); 
			/******* 	入库后库存量要改变 **************************/
				 $data=Db::table('wd_good_buyer')->alias('a')->field('a.dept_id,b.good_id,b.checknum unm')//去个别名叫num,不用动之前的代码了
												->join('wd_good_buyer_det b','a.id=b.buyer_id')->where('a.id',$id)->select();
				
				//$data  有仓库ID,商品Id,商品数量		
				foreach ($data as $k=>&$v){
					//判断$v的unm是否为空,空的就是没审核就入库打回去
						if (empty($v['unm'])){
							return json(['code'=>400,'mess'=>'请先审核']);
						}
					//查看库存表里面是否有					
					$num=Db::table('wd_good_stock')->where('good_id',$v['good_id'])->where('dept_id',$v['dept_id'])->find();
					if (!empty($num)){
						Db::table('wd_good_stock')->where('good_id',$v['good_id'])->where('dept_id',$v['dept_id'])->setInc('stock',$v['unm']);
						}else {
							$arr=['dept_id'=>$v['dept_id'],'good_id'=>$v['good_id'],'stock'=>$v['unm'],'updatetime'=>time()];
							Db::table('wd_good_stock')->insert($arr);
						}	
					} 
				// 提交事务
        	$status = true;
        	  Db::commit();
        	} catch (\Exception $e) {
        		// 回滚事务        		 
        		Db::rollback();
        	}  
			if ($status){
				return json(['code'=>200]);
			}
			return json(['code'=>400]);
			}
		}
		$p=input('p')?input('p'):1; //默认第一页
		$pageCount = Config::get('pageCount');
		//显示被拒绝的入库单列表
		$status=input('status');
		//显示被拒绝的列表
		if ($status==10){
			$lst=Db::table('wd_good_buyer')->alias('a')->field('a.*,b.name deptName,c.name supplierName,d.name adminName')
				->join('wd_dept b','a.dept_id=b.id')->join('wd_supplier c','a.supplier=c.id')->join('wd_admin d','a.admin=d.id')
				->where('a.status',10)->order('a.id desc')->page($p,$pageCount)->select();
			foreach ($lst as $k=>&$v){
				$v['create_time']=date('Y-m-d H:i:s',$v['create_time']);
			}
			$num=Db::table('wd_good_buyer')->where('status', 10)->count('id');//得出商品总条数
    		$count=ceil($num/$pageCount);
    		return json(['lst'=>$lst,'num'=>$num,'count'=>$count]);
    		//return json($lst);
		}
		//显示成功的列表
		if ($status==2){
			$lst=Db::table('wd_good_buyer')->alias('a')->field('a.*,b.name deptName,c.name supplierName,d.name adminName')
				->join('wd_dept b','a.dept_id=b.id')->join('wd_supplier c','a.supplier=c.id')->join('wd_admin d','a.admin=d.id')
				->where('a.status',2)->order('a.id desc')->page($p,$pageCount)->select();
			foreach ($lst as $k=>&$v){
				$v['create_time']=date('Y-m-d H:i:s',$v['create_time']);
			}
			$num=Db::table('wd_good_buyer')->where('status', 2)->count('id');//得出商品总条数
    		$count=ceil($num/$pageCount);
    		return json(['lst'=>$lst,'num'=>$num,'count'=>$count]);
    		//return json($lst);
		}
		if ($status==1){
			$lst=Db::table('wd_good_buyer')->alias('a')->field('a.*,b.name deptName,c.name supplierName,d.name adminName')
			->join('wd_dept b','a.dept_id=b.id')->join('wd_supplier c','a.supplier=c.id')->join('wd_admin d','a.admin=d.id')
			->where('a.status',1)->order('a.id desc')->page($p,$pageCount)->select();
			foreach ($lst as $k=>&$v){
				$v['create_time']=date('Y-m-d H:i:s',$v['create_time']);
			}
			$num=Db::table('wd_good_buyer')->where('status', 1)->count('id');//得出商品总条数
    		$count=ceil($num/$pageCount);
    		return json(['lst'=>$lst,'num'=>$num,'count'=>$count]);
    		//return json($lst);
		}		
	}
	/**
	 * 商品出库单的显示和状态
	 */
	public function lst(){
		
		$status=input('status');		
		if (!empty($status)){
			//如果有仓库Id;
			if (!empty(input('cangkuId'))){
				$deptId=input('cangkuId');
				$p=input('p')?input('p'):1;//默认第一页
				$pageCount = Config::get('pageCount');
				$data=Db::table('wd_good_outgoing')->order('id desc')->page($p,$pageCount)->where('status',$status)->where('dept_id',$deptId)->select();
				$num=Db::table('wd_good_outgoing')->where('status',$status)->where('dept_id',$deptId)->count('id');//得出商品总条数
				$count=ceil($num/$pageCount);
				foreach ($data as $k=>&$v){
					$v['createtime']=date("Y-m-d H:i:s",$v['createtime']);
			}
			}
		//如果没有仓库Id,默认第一个
			if (empty(input('cangkuId'))){
				//第一个仓库
				$cfirst=Db::table('wd_dept')->limit('0,1')->where('type_id',2)->value('id');
				$p=input('p')?input('p'):1;//默认第一页
				$pageCount = Config::get('pageCount');
				$data=Db::table('wd_good_outgoing')->order('id desc')->page($p,$pageCount)->where('status',$status)->where('dept_id',$cfirst)
													->select();
				$num=Db::table('wd_good_outgoing')->where('status',$status)->where('dept_id',$cfirst)->count('id');//得出商品总条数
				$count=ceil($num/$pageCount);
				foreach ($data as $k=>&$v){
					$v['createtime']=date("Y-m-d H:i:s",$v['createtime']);
				}
			}
			return json(['data'=>$data,'count'=>$count,'num'=>$num]);		
			//return json($data);
		}
		//显示
		
	}
	/**
	 * 状态的改变
	 */
	/*public function status(){
		if (request()->isPost())
		$status=input('status');
		$id=input('good_outgoing_id');
		$reviewed=Session::get('adminId');
		if(!empty($status)&&!empty($id)){
			$res=Db::table('wd_good_outgoing')->where('id',$id)->update(['status'=>$status,'reviewed'=>$reviewed,'createtime'=>time()]);
			if ($res){
				return json(['code'=>200]);
			}
			return json(['code'=>400]);
		}
		
	}*/
    public function status(){
        if (request()->isPost()){
            $status=input('status');
            $id=input('good_outgoing_id');
            $reviewed=Session::get('adminId');
            if ($status == 11 ) {
                $num=Db::table('wd_good_outgoing')->where('id',$id)->value('status');
                if ($num == 11){
                    return json(['code'=>302,'mess'=>'请不要重复提交']);
                }
                $statu=false;
                Db::startTrans();
                try{
                    Db::table('wd_good_outgoing')->where('id',$id)->update(['status'=>11]);	//开始配送
                    //取出商品ID,数量.店铺id,仓库 id
                    $data=Db::table('wd_good_outgoing_det')->alias('a')->join('wd_good_outgoing b','a.good_outgoing_id=b.id')
                        ->where('a.good_outgoing_id',$id)->field('a.good_id,a.name,a.num,b.shop_id,b.dept_id')->select();
                    //减大库存,加小库存
                    $arr1=array();
                    foreach ($data as $k=>&$v){
                        //1.先判断商店库存是否大于退货量
                        $stock=Db::table('wd_shop_stock')->where('dept_id',$v['shop_id'])->where('good_id',$v['good_id'])->value('stock');
                          if ($stock<$v['num']){
                              return json(['code'=>400,'mess'=>'库存不足','good_id'=>$v['good_id'],'name'=>$v['name']]);
                          }
                        /********************************************************************************************************/
                        //减商店库存
                        Db::table('wd_shop_stoe')->where('dept_id',$v['dept_id'])->where('good_id',$v['good_id'])->setDec('stor', $v['num']);
                        $num=Db::table('wd_shop_stor')->where('dept_id',$v['dept_id'])->where('good_id',$v['good_id'])->value('stor');
                        //2.再判断库存是否小于0
                         if ($num<0){
                            return json(['code'=>400,'mess'=>'库存不足','good_id'=>$v['good_id'],'name'=>$v['name']]);
                        }
                        //加仓库库存
                        Db::table('wd_good_stock')->where('dept_id',$v['shop_id'])->where('good_id',$v['good_id'])->setInc('stock', $v['num']);
                    }
                    //将钱退回店铺
                    $total = Db::table('wd_good_outgoing')->where('id',$id)->value('zprice');
                    $balance=Db::table('wd_b_shop_balace')->where('user_id',input('shop_id'))->value('balance');
                    $hbalance=$balance+$total;
                    $data[]=['shop_id'=>input('shop_id'),'total'=>$total,'createtime'=>time(),'type'=>'5','order'=>time(),'balance'=>$balance,'hbalance'=>$hbalance];
                    //给店铺退款
                    Db::table('wd_b_shop_balace')->where('user_id',$data[0]['shop_id'])->setInc('balance',$data[0]['total']);
                    //插入流水
                    Db::table('wd_b_purse')->insertAll($data);
                    $statu=true;
                    // 提交事务
                    Db::commit();
                } catch (Exception $e) {
                    // 回滚事务
                    Db::rollback();
                }
                if ($statu){
                    return json(['code'=>200]);
                }else{
                    return json(['code'=>400]);
                }
            }
            if(!empty($status)&&!empty($id)){
                $res=Db::table('wd_good_outgoing')->where('id',$id)->update(['status'=>$status,'reviewed'=>$reviewed,'createtime'=>time()]);
                if ($res){
                    return json(['code'=>200]);
                }
                return json(['code'=>400]);
            }
        }


    }
	/**
	 * 出库单各个状态的查看
	 */
	public function chakan(){
		$id=input('id');
		//$p=input('p')?input('p'):1;
		//$pageCount = Config::get('pageCount');
		if (!empty($id)){
				$lst=Db::table('wd_good_outgoing_det')->alias('a')->join('wd_good_outgoing b','a.good_outgoing_id=b.id')
							->join('wd_good c','a.good_id=c.id','left')->join('wd_b_shop d','a.shop_id=d.id','left')
							->field('a.*,b.dept,b.shop,b.dept,c.barcode')->where('good_outgoing_id',$id)->select();
				$dposit=Db::table('wd_good_outgoing')->where('id',$id)->value('zprice');
				$oddnum=Db::table('wd_good_outgoing')->where('id',$id)->value('oddnum');
				return json(['lst'=>$lst,'dposit'=>$dposit,'oddnum'=>$oddnum]);
		}
	
	}
	/**
	 * 配送开始
	 */
	public function peisong(){
		if (request()->isPost()){
			$id=input('good_outgoing_id');
			$num=Db::table('wd_good_outgoing')->where('id',$id)->value('status');
			if ($num==5){
				return json(['code'=>302,'mess'=>'请不要重复提交']);
			}
			$statu=false;
			Db::startTrans();
			try{
				Db::table('wd_good_outgoing')->where('id',$id)->update(['status'=>5,'note'=>input('note'),'distime'=>time()]);	//开始配送			
				//取出商品ID,数量.店铺id,仓库 id
				$data=Db::table('wd_good_outgoing_det')->alias('a')->join('wd_good_outgoing b','a.good_outgoing_id=b.id')
														->where('a.good_outgoing_id',$id)->field('a.good_id,a.name,a.num,b.shop_id,b.dept_id')->select();
				//减大库存,加小库存
				$arr1=array();
				foreach ($data as $k=>&$v){
				    //1.先判断当前库存是否大于出库量
                    $stock=Db::table('wd_good_stock')->where('dept_id',$v['dept_id'])->where('good_id',$v['good_id'])->value('stock');
                  /*  if ($stock<$v['num']){
                        return json(['code'=>400,'mess'=>'库存不足','good_id'=>$v['good_id'],'name'=>$v['name']]);
                    }*/
                    /********************************************************************************************************/
					Db::table('wd_good_stock')->where('dept_id',$v['dept_id'])->where('good_id',$v['good_id'])->setDec('stock', $v['num']);
					$num=Db::table('wd_good_stock')->where('dept_id',$v['dept_id'])->where('good_id',$v['good_id'])->value('stock');
					//2.再判断库存是否小于0
					/* if ($num<0){
						return json(['code'=>400,'mess'=>'库存不足','good_id'=>$v['good_id'],'name'=>$v['name']]);
					}*/
					//商店有库存就自增,没有就创建
					$res=Db::table('wd_shop_store')->where('shop_id',$v['shop_id'])->where('good_id',$v['good_id'])->find();
					if (!empty($res)){
						Db::table('wd_shop_store')->where('shop_id',$v['shop_id'])->where('good_id',$v['good_id'])->setInc('num', $v['num']);
					}else{
					//创建
					$price=Db::table('wd_good')->where('id',$v['good_id'])->value('retails');
					$arr1[]=['shop_id'=>$v['shop_id'],'good_id'=>$v['good_id'],'num'=>$v['num'],'price'=>$price,'status'=>0];
					
					}
				}
				Db::table('wd_shop_store')->insertAll($arr1);
				$statu=true;
				// 提交事务
				Db::commit();
			} catch (Exception $e) {
				// 回滚事务
				Db::rollback();
			}
			if ($statu){
				return json(['code'=>200]);
			}else{
				return json(['code'=>400]);
			}
		}		
		
	}
	/**
	 * 拒绝接受
	 */
	public function jujue(){
		if (request()->isPost()){
		$statu=false;
		$id=input('good_outgoing_id');
		$num=Db::table('wd_good_outgoing')->where('id',$id)->value('status');
		if ($num==10){
			return json(['code'=>302,'mess'=>'请不要重复提交']);
		}
		Db::startTrans();
		try{			
			Db::table('wd_good_outgoing')->where('id',$id)->update(['status'=>10,'note'=>input('note'),'jutime'=>time()]);//拒绝时间和状态
			//取出商品ID,数量.店铺id,仓库 id
			$data=Db::table('wd_good_outgoing_det')->alias('a')->join('wd_good_outgoing b','a.good_outgoing_id=b.id')
												->where('a.good_outgoing_id',$id)->field('a.good_id,a.num,b.shop_id,b.dept_id')->select();
			//加大库存,减小库存
			foreach ($data as $k=>&$v){
				Db::table('wd_good_stock')->where('dept_id',$v['dept_id'])->where('good_id',$v['good_id'])->setInc('stock', $v['num']);
				//商店有库存就自增,没有就创建				
					Db::table('wd_shop_store')->where('shop_id',$v['shop_id'])->where('good_id',$v['good_id'])->setDec('num', $v['num']);
			}
			$statu=true;
			// 提交事务
			Db::commit();
		} catch (Exception $e) {
			// 回滚事务
			Db::rollback();
		}
		if ($statu){
			return json(['code'=>200]);
		}else{
			return json(['code'=>400]);
		}
		}
	}
	
	/**
	 * Ajax获取出库商品的信息
	 */
	public function getInfo(){
		//根据商品编码进行搜索
		if (input('coding')){
			$coding=input('coding');
			$coding=Db::table('wd_good')->alias('a')->field('a.*,b.brand')->join('wd_good_brand b' ,'a.good_brand_id=b.id')->where('coding','like','%'.$coding.'%')->select();
			return json($coding);
		}
		//根据商品条码进行搜索
		if(input('barcode')){
			$barcode=input('barcode');
			$barcode=Db::table('wd_good')->alias('a')->field('a.*,b.brand')->where('barcode','like','%'.$barcode.'%')->select();
			return json($barcode);
		}
		//根据商品名字进行搜索
		if(input('name')){
			$name=input('name');
			$name=Db::table('wd_good')->alias('a')->field('a.*,b.brand')->where('name','like','%'.$name.'%')->select();
			return json($name);
		}
		//根据店铺ID取出所有
		if (input('id')){
			$id=input('id');
			$data=Db::table('wd_b_shop')->where('id',$id)->select();
			return json($data);
		}
	}
	/**
     * 退货
     */
	public function returnGoods() {
        if (Request::instance()->isPost()){
            $adminId=Session::get('adminId');
            $id=input('id');
            //防止重复提交
            $number=Db::table('wd_good_return')->where('id',$id)->value('status');
            if ($number==2){
                return json(['code'=>400,'mess'=>'请不要重复提交']);
            }

            //启动事务
           /* Db::startTrans();
            try{*/
                $status = false;
                //二审人和时间
                Db::table('wd_good_return')->where('id',$id)->update(['status'=>2,'reviewdpt'=>$adminId,'ttime'=>time()]);
                /*  **********************************************************************************************************************/
                //$res=Db::table('wd_good_buyer')->where('id',$id)->setField('status', '2');
                /******* 	入库后库存量要改变 **************************/
                $data=Db::table('wd_good_return')->alias('a')->field('a.dept_id,b.good_id,b.checknum unm')//去个别名叫num,不用动之前的代码了
                ->join('wd_good_return_det b','a.id=b.return_id')->where('a.id',$id)->select();

                //$data  有仓库ID,商品Id,商品数量
                foreach ($data as $k=>&$v){
                    //判断$v的unm是否为空,空的就是没审核就入库打回去
                    if (empty($v['unm'])){
                        return json(['code'=>400,'mess'=>'请先审核']);
                    }
                    //1.先判断当前库存是否大于出库量
                    $stock=Db::table('wd_good_stock')->where('dept_id',$v['dept_id'])->where('good_id',$v['good_id'])->value('stock');
                      if ($stock < $v['unm']){
                          return json(['code'=>400,'mess'=>'库存不足','good_id'=>$v['good_id'],'name'=>$v['name']]);
                      }
                    //直接减少库存
                        Db::table('wd_good_stock')->where('good_id',$v['good_id'])->where('dept_id',$v['dept_id'])->setDec('stock',$v['unm']);
                      //减完库存判断是否小于0
                    $num=Db::table('wd_good_stock')->where('dept_id',$v['dept_id'])->where('good_id',$v['good_id'])->value('stock');
                    //2.再判断库存是否小于0
                     if ($num<0){
                        return json(['code'=>400,'mess'=>'库存不足','good_id'=>$v['good_id'],'name'=>$v['name']]);
                    }

                }
                // 提交事务
                $status = true;
              /*  Db::commit();
            } catch (\Exception $e) {
                // 回滚事务
                Db::rollback();
            }*/
            if ($status){
                return json(['code'=>200]);
            }
            return json(['code'=>400]);
        }

        $p=input('p')?input('p'):1; //默认第一页
        $pageCount = Config::get('pageCount');
        //显示被拒绝的入库单列表
        $status=input('status');
        //显示被拒绝的列表
        if ($status==10){
            $lst=Db::table('wd_good_return')->alias('a')->field('a.*,b.name deptName,c.name supplierName,d.name adminName')
                ->join('wd_dept b','a.dept_id=b.id')->join('wd_supplier c','a.supplier=c.id')->join('wd_admin d','a.admin=d.id')
                ->where('a.status',10)->order('a.id desc')->page($p,$pageCount)->select();
            foreach ($lst as $k=>&$v){
                $v['create_time']=date('Y-m-d H:i:s',$v['create_time']);
            }
            $num=Db::table('wd_good_return')->where('status', 10)->count('id');//得出商品总条数
            $count=ceil($num/$pageCount);
            return json(['lst'=>$lst,'num'=>$num,'count'=>$count]);
            //return json($lst);
        }
        //显示成功的列表
        if ($status==2){
            $lst=Db::table('wd_good_return')->alias('a')->field('a.*,b.name deptName,c.name supplierName,d.name adminName')
                ->join('wd_dept b','a.dept_id=b.id')->join('wd_supplier c','a.supplier=c.id')->join('wd_admin d','a.admin=d.id')
                ->where('a.status',2)->order('a.id desc')->page($p,$pageCount)->select();
            foreach ($lst as $k=>&$v){
                $v['create_time']=date('Y-m-d H:i:s',$v['create_time']);
            }
            $num=Db::table('wd_good_return')->where('status', 2)->count('id');//得出商品总条数
            $count=ceil($num/$pageCount);
            return json(['lst'=>$lst,'num'=>$num,'count'=>$count]);
            //return json($lst);
        }
        if ($status==1){
            $lst=Db::table('wd_good_return')->alias('a')->field('a.*,b.name deptName,c.name supplierName,d.name adminName')
                ->join('wd_dept b','a.dept_id=b.id')->join('wd_supplier c','a.supplier=c.id')->join('wd_admin d','a.admin=d.id')
                ->where('a.status',1)->order('a.id desc')->page($p,$pageCount)->select();
            foreach ($lst as $k=>&$v){
                $v['create_time']=date('Y-m-d H:i:s',$v['create_time']);
            }
            $num=Db::table('wd_good_return')->where('status', 1)->count('id');//得出商品总条数
            $count=ceil($num/$pageCount);
            return json(['lst'=>$lst,'num'=>$num,'count'=>$count]);
            //return json($lst);
        }
    }
    /**
     * 退货单详情的查看
     */
    public function checkreturn(){
        $id=input('id');
        if (!empty($id)){
            $status=input('status');
            if (empty($status)){
                $data=Db::table('wd_good_return')->alias('a')->field('a.id,a.dposit,a.checkdposit,b.id buyerDetId,b.return_id,b.barcode,b.good_id,b.name,b.unm,b.price,b.gg,b.checknum,b.checkprice,c.id deptId,c.name deptName,d.id supplierId,d.name supplierName')
                    ->join('wd_good_return_det b','a.id=b.return_id')->join('wd_dept c','a.dept_id=c.id')->join('wd_supplier d','a.supplier=d.id')
                    ->where('a.id',$id)->where('a.status',1)->select();
                return json(['data'=>$data]);
            }else{
                $data=Db::table('wd_good_return')->alias('a')->field('a.id,a.dposit,a.checkdposit,b.id buyerDetId,b.buyer_id,b.barcode,b.good_id,b.name,b.unm,b.price,b.gg,b.checknum,b.checkprice,c.id deptId,c.name deptName,d.id supplierId,d.name supplierName')
                    ->join('wd_good_return_det b','a.id=b.buyer_id')->join('wd_dept c','a.dept_id=c.id')->join('wd_supplier d','a.supplier=d.id')
                    ->where('a.id',$id)->where('a.status',$status)->select();
                return json(['data'=>$data]);
            }

        }
    }
    /**
     * 商品退货数量的校量
     */
    public function editreturn(){
        if (request()->isPost()){
            //return json(input());
            $data=input('goods');
            $data=json_decode($data,true);
            $prices='';
            $checkdposit='';
            //生成订单,启动事务
            /* Db::startTrans();
         try {   */
            $statu=false;
            foreach ($data as $k=>$v){
                $price = Db::table('wd_good')->where('id', $v['good_id'])->value('buyprice');
                $prices=$price*$v['unm'];//采购单详情的价钱
                $checkdposit+=$price*$v['unm'];//采购单的总价
                /* Db::table('wd_good_buyer_det')->where('id',$v['buyerDetId'])->update(['checknum' =>$v['unm'],'checkprice'=>$prices]);
                Db::table('wd_good_buyer')->where('id',$v['buyerDetId'])->update(['checknum' =>$v['unm'],'checkprice'=>$prices]); */
                //根据buyerDetId查出unm和提交的checknum作比较,不相等加标记
                $num=Db::table('wd_good_return_det')->where('id',$v['buyerDetId'])->value('unm');
                //查出的数量和提交的数量相等
                if ($num==$v['unm']){
                    //更新采购单详情核实数量和检测状态
                    Db::table('wd_good_return_det')->where('id',$v['buyerDetId'])->update(['checknum'=>$v['unm'],'checkprice'=>$prices,'checktime'=>time()]);
                    //更新采购单状态
                    Db::table('wd_good_return')->where('id',$v['id'])->update(['checkstatus'=>1]);
                }else{
                    //更新采购单详情核实数量和检测状态
                    Db::table('wd_good_return_det')->where('id',$v['buyerDetId'])->update(['checknum'=>$v['unm'],'checkprice'=>$prices,'checktime'=>time()]);
                    //更新采购单状态
                    Db::table('wd_good_return')->where('id',$v['id'])->update(['checkstatus'=>0]);
                }
            }
            Db::table('wd_good_return')->where('id',$data[0]['id'])->update(['checkdposit'=>$checkdposit]);
            $statu = true;
            /*    Db::commit();
           } catch (\Exception $e) {
               // 回滚事务
               Db::rollback();
           }    */
            if ($statu) {
                return json(['code' => 200]);
            }else {
                return json(['code' => 400]);
            }
        }
    }
}