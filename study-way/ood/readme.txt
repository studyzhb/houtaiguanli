一个记录佣人情况的表格。
1.正式工，每天都来华山干活，每个月最后一天发工资。
2.有些佣人市钟点工，他们每天提交工作时间卡，其中记录了日期以及工作时辰数，如果每天工作超过6时辰，按1.5倍进行支付。每周五发工资。每个时辰报酬自定义
3.还有一些带薪的佣人，和正式工类似，会帮助销售咱们华山的土特产，根据销售情况，支付一定数量的佣金，他们会提交销售凭条，其中记录了销售的日期和数量，对这种佣人，每隔一周的周五发工资。

这些佣人可以选择支付方式，可以把银票邮寄到他们指定的邮政地址，也可以保存在某个地方随时支取，或者要求直接存入他们指定的票号。
//commission //n:佣金 vt:委任
方式一、
创建4个类
1.HourlyEmployee//钟点工-hourlyRate  2.TimeCard//时间卡（钟点工可以有多个此对象）-date -hours
3.SalaryEmployee//正式工和佣人综合体
	-isSales//区分类别
	-monthSalary//每月的固定薪水
	-commissionRate//每销售一个土特产的报酬
4.SalesReceipt//销售凭条(记录了销售的日期和数量)
-date -amount
方式二、（在方式一基础上进行整合，1,3两个类拥有共同的属性，抽离出来成为它们共同的父类）
1.Employee//parent//
-id,-name,-address
2.HourlyEmployee -------》TimeCard
3.SalaryEmployee------》SalesReceipt
方式三、（方式二中的SalaryEmployee对象里有混合，其中正式工用不到某些属性,所以进行拆分）
1.Employee//parent//
-id,-name,-address
2.HourlyEmployee -------》TimeCard
3.SalaryEmployee//-salary
4.CommissionEmployee------》SalesReceipt


支付方式
风清扬说： “现在考虑下支付的方式吧。 一种是邮寄，一种是直接取， 一种是存入票号。”
令狐冲说：“这个简单， 用三个类就可以了”
pay1.png
“那这几个类怎么和刚才的类关联呢？”
令狐冲说：“这个支付方式似乎和佣人的类型没有关系， 因为任何人都可以和选择三种方式之一， 所以不能和HourlyEmployee, SalaryEmployee, ComissionEmployee绑定。 此外肯定不能成为Employee的子类，因为支付方式和佣人之间不存在父子类关系。 ”
令狐冲想了一会， 突然眼前一亮： “应该和Employee绑定啊”
pay2.png
风清扬说： ”孺子可教也， 现在重点的部分来了， 你师傅有一天突然决定， 佣人的类型可以来回改变， 一个钟点工可以改成正式工， 正式工可以改成卖土特产的佣人， 卖土特产的也能改成其他两类“
　　“这...... , 我设计的这个类体系不支持这样的改动啊，我师傅不会这么变态吧” ， 令狐冲头上开始冒汗了。
　　“仔细想想，做一个 抽象的时候到了， 一些佣人按时辰获得工钱，一些佣人按月获得工钱，还有一些按销售获得酬金， 这其实暗含着： 所有佣人都被支付，只是支付的策略不同”
　　说着风清扬画了一张图：
pay3.png
“看着和刚才的挺像” 风清扬解释道 “其实这里提取出了一个概念： 支付策略， 有了这个概念， 就可以和Employee关联， 这样就可以随意的改变佣人的类型了， 你看看这个图， 和刚才你画的那个有啥区别：”
pay4.jpg
令狐冲道： “我明白了， 这是加了一个中间层嘛”
　　"好了， 你再想想怎么处理发工钱的日期吧。 你师傅说过：有些佣人是钟点工...每周五发工钱 ； 对于月薪的佣人....每个月的最后一天发工钱； 对于佣金的佣人.... 每隔一周的周五发工钱 ， 这怎么处理啊？ "
　　令狐冲道： 不就是发钱的日期吗， 可以把他们分别放到SalariedClassifcation, HourlyClassfication, ComissionClassfication中去啊
　　“那不就和支付策略绑定了吗？ 万一你师傅岳不群说， 这些支付的日期对于不用类型的佣人也可以随意改动怎么办？” 风清扬有点恼怒了。
　　看到前辈生气， 令狐冲立刻紧张起来， 心里一动， 立刻明白了 ： 这是前辈指点我抽象出一个新的概念了， 叫PaymentDay ？ 不好， 还是叫PaymentSchedule吧， 它有三个子类WeeklySchedule, BiWeeklySchdule,
　　MonthlySchedule , 分别对应每周发工钱， 隔周发工钱， 每月发工钱。
　　这个新的概念和PaymentMethod， PaymentClassification一样， 都应该和Employee关联， 这样就有了最大的灵活性。
　　令狐冲把PaymentSchedule 及其子类放入到了原来的图中， 结果如下：
pay5.jpg




