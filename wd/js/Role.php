<?php
namespace app\admin\controller;
use think\Controller;
use think\Db;
use think\Config;
use app\admin\controller\Base;
use phpDocumentor\Reflection\Type;
use think\Request;

class Role extends Base {

    /**
     * 角色的展示
     */
    public function lst() {
        $data =Db::table('wd_role')->select();
        return json(['data'=>$data]);
    }
    public function add() {
        if (Request::instance()->isPost()) {
            //获取角色提交参数
            $data = input('');
            var_dump($data);
            die;
            $params['name'] = $data['name'];
            $params['createtime'] = time();
            //获取角色ID
            $role_id = Db::table('wd_role')->insertGetId($params);
            //获得权限的父类ID并去重
            $privilegeObj = Db::table('wd_privilege');
            $arrP = array();//父类ID数组
            foreach ($data['pri_id'] as $k => $v) {
                $arrP = $privilegeObj->where('id', $v)->value('pid');
            }
            $status = true;
            $arrP = array_unique($arrP);
            //获得子类ID并去重
            $arrC = model('Privilege')->getChildren($data['pri_id'], $role_id);
            //合并成所有的权限
            $newArr = array_merge($arrC, $arrP);
            $arrRole = array();
            foreach ($newArr as $k => $v) {
                $arrRole[] = ['role_id' => $role_id, 'pri_id' => $v];
            }
            Db::name('role_pri')->insertAll($arrRole);
            $status = true;
            if ($status == true) {
                return json([
                    'code' => 200,
                    'msg' => '添加成功'
                ]);
            }
            return json([
                'code' => 400,
                'msg' => '添加失败'
            ]);
        }
        $priData = Db::table('wd_privilege')->select();
        $priData = model('Privilege')->getTree($priData);
        return json($priData);

    }
/*    public function add() {
        if (request()->isPost()) {
            $data = input('');
            if (!empty($data['token'])){
                unset($data['token']);
            }
            // return json($data);
            $data['createtime'] = time();
            $status = false;
            //启动事务
            Db::startTrans();
            try {
                model('Role')->allowField(true)->save($data);
                $role_id = Db::name('role')->getLastInsID();
                //先取出父类ID

                //存入role_pri
                foreach ($data['pri_id'] as $k => $v) {
                    //取出父类id
                    $pid=Db::table('wd_privilege')->where('id',$v)->value('pid');
                    //$arr4[] = ['role_id' => $role_id, 'pri_id' => $pid];
                    $arr4[]=$pid;
                    $arr2[] = array(['role_id' => $role_id, 'pri_id' => $v]);
                }
                foreach ($arr2 as $k1 => $v2) {
                    $arr3[] = $v2[0];
                }
                // $arr4=model('Role')->arrayUnique($arr4);
                //父类ID去重开始
                $arr5=array_unique($arr4);
                foreach ($arr5 as $k2=>&$v2){
                    $arr6[]=['role_id'=>$role_id,'pri_id'=>$v2];
                }
                //找出父类ID并去重结束
                $childrenId=model('Privilege')->getChildren($data['pri_id'],$role_id);
                $arr7=array_merge($arr3,$arr6);
                $arr8=array_merge($arr7,$childrenId);
                Db::name('role_pri')->insertAll($arr8);
                // 提交事务
                $status = true;
                Db::commit();
            } catch (\Exception $e) {
                // 回滚事务
                Db::rollback();
            }
            if ($status) {
                return json(['code' => 200]);
            }
            return json(['code' => 400]);
        }
        //展示所有的权限以供选择
        $priData = Db::table('wd_privilege')->select();
        $priData = model('Privilege')->getTree($priData);
        return json($priData);
    }*/

    /**
     * 角色权限的修改
     */
    public function edit() {
        if (request()->isPost()) {
            $data = input('');
            $id = $data['id'];
            $status = false;
            foreach ($data['pri_id'] as $k => $v) {
                //取出父类id
                $pid=Db::table('wd_privilege')->where('id',$v)->value('pid');
                //$arr4[] = ['role_id' => $role_id, 'pri_id' => $pid];
                $arr4[]=$pid;
                $arr2[] = array(['role_id' =>$id, 'pri_id' => $v]);

            }
            foreach ($arr2 as $k1 => $v2) {
                $arr3[] = $v2[0];
            }
            // $arr4=model('Role')->arrayUnique($arr4);
            /*********父类ID去重开始********************************************************  */
            $arr5=array_unique($arr4);
            foreach ($arr5 as $k2=>&$v2){
                $arr6[]=['role_id'=>$id,'pri_id'=>$v2];
            }
            /*********找出父类ID并去重结束**************************************************  */
            $childrenId=model('Privilege')->getChildren($data['pri_id'],$id);
            $arr7=array_merge($arr3,$arr6);
            $arr8=array_merge($arr7,$childrenId);
            //启动事务
            Db::startTrans();
            try {
                //先删除
                Db::table('wd_role_pri')->where('role_id', $id)->delete();
                Db::name('Role')->where(['id'=>['=',$id]])->update(['note'=>$data['note']]);
                Db::table('wd_role_pri')->insertAll($arr8);
                // 提交事务
                $status = true;
                Db::commit();
            } catch (\Exception $e) {
                // 回滚事务        		 
                Db::rollback();
            }
            if ($status) {
                return json(['code' => 200]);
            }
            return json(['code' => 400]);
        }
        $id = input('id');
        //输出角色的名称
        $roleInfo = Db::table('wd_role')->where('id', $id)->select();
        //先输出本来有的权限id
        $priId = Db::table('wd_role_pri')->where('role_id', $id)->column('pri_id'); //		
        //$priId=explode(',', $priId['0']['pri_id']);
        //再输储所有的权限
        $priData = Db::table('wd_privilege')->field('id,name,pid,module_name,controller_name,action_name,path')->select();
        foreach ($priData as $k => &$v) {
            foreach ($priId as $k1 => $v1) {
                if($v['id'] == $v1){
                    $v['status'] = 'true';
                }
            }
        }

        //取出的权限数据分类
        $priData = model('Privilege')->getTree($priData);
        return json(['priData' => $priData, 'roleInfo' => $roleInfo,'priId'=>$priId]);
    }

    /**
     * 角色的删除
     */
    public function delete() {
        $id = input('id');
        if (!empty($id)) {
            $res1 = Db::table('wd_role')->where('id', $id)->delete();
            $res2 = Db::table('wd_role_pri')->where('role_id', $id)->delete();
            if ($res1 || $res2) {
                return json(['code' => 200]);
            }
            return json(['code' => 400]);
        }
    }

}
