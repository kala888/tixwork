--tixwork formatted sql


-- ----------------------------
-- 1.初始化-菜单信息表数据
-- ----------------------------
--changeset tixwork:sys_menu_init

-- 菜单1，2
insert into sys_menu values('1',    '工作台',   '0', 1, '/',  null,   null, '', null, 'FOLDER', 'SHOW', '0', '', 'iconfont-dashboard',  103, 1, now(), null, null, '工作台');

--7.系统管理'#',  103, 1, now(), null, null
insert into sys_menu values('7',    '系统管理', '0', '7', '/system',  null, null, '', 1, 'FOLDER', 'SHOW', '0', '', 'iconfont-system',  103, 1, now(), null, null, '系统管理目录');

-- 三级级菜单
insert into sys_menu values('700',  '默认跳转', '7',   0, '/',                     null,                            '/system/user', '',1, 'MENU', 'HIDE', '0', '',              'iconfont-user',           103, 1, now(), null, null, '默认跳转');
insert into sys_menu values('701',  '用户管理', '7',   1, '/system/user',          './system/user',                 null, '',1, 'MENU', 'SHOW', '0', 'system:user:list',        'iconfont-user',           103, 1, now(), null, null, '用户管理菜单');
insert into sys_menu values('702',  '部门管理', '7',   2, '/system/department',    './system/department',           null, '',1, 'MENU', 'SHOW', '0', 'system:dept:list',        'iconfont-department',     103, 1, now(), null, null, '部门管理菜单');
insert into sys_menu values('703',  '岗位管理', '7',   3, '/system/post',          './system/post',                 null, '',1, 'MENU', 'SHOW', '0', 'system:post:list',        'iconfont-post',           103, 1, now(), null, null, '岗位管理菜单');
insert into sys_menu values('704',  '角色管理', '7',   4, '/system/role',          './system/role',                 null, '',1, 'MENU', 'SHOW', '0', 'system:role:list',        'iconfont-role',           103, 1, now(), null, null, '角色管理菜单');
insert into sys_menu values('705',  '菜单管理', '7',   5, '/system/menu',          './system/menu',                 null, '',1, 'MENU', 'SHOW', '0', 'system:menu:list',        'iconfont-menu',           103, 1, now(), null, null, '菜单管理菜单');
insert into sys_menu values('706',  '参数设置', '7',   6, '/system/setting',       './system/setting',              null, '',1, 'MENU', 'SHOW', '0', 'system:setting:list',     'iconfont-dict',           103, 1, now(), null, null, '参数设置菜单');
insert into sys_menu values('707',  '通知公告', '7',   7, '/system/notice',        './system/notice',               null, '',1, 'MENU', 'SHOW', '0', 'system:notice:list',      'iconfont-notice',         103, 1, now(), null, null, '通知公告菜单');
insert into sys_menu values('708',  '文件管理', '7',   8, '/system/oss-object',    './system/oss-object',           null, '',1, 'MENU', 'SHOW', '0', 'system:oss-object:list',  'iconfont-cloud-file',      103, 1, now(), null, null, '上传文件管理');
insert into sys_menu values('709',  '客户端管理','7',  9, '/system/client',        './system/client',               null, '',1, 'MENU', 'SHOW', '0', 'system:client:list',      'iconfont-app',            103, 1, now(), null, null, '客户端管理');


-- 用户管理按钮
insert into sys_menu values('7101', '用户查询', '701',  1,  null, null, null, '',1, 'FUNC', 'SHOW', '0', 'system:user:query',          '#',  103, 1, now(), null, null, '');
insert into sys_menu values('7102', '用户新增', '701',  2,  null, null, null, '',1, 'FUNC', 'SHOW', '0', 'system:user:add',            '#',  103, 1, now(), null, null, '');
insert into sys_menu values('7103', '用户修改', '701',  3,  null, null, null, '',1, 'FUNC', 'SHOW', '0', 'system:user:edit',           '#',  103, 1, now(), null, null, '');
insert into sys_menu values('7104', '用户删除', '701',  4,  null, null, null, '',1, 'FUNC', 'SHOW', '0', 'system:user:remove',         '#',  103, 1, now(), null, null, '');
insert into sys_menu values('7105', '用户导出', '701',  5,  null, null, null, '',1, 'FUNC', 'SHOW', '0', 'system:user:export',         '#',  103, 1, now(), null, null, '');
insert into sys_menu values('7106', '用户导入', '701',  6,  null, null, null, '',1, 'FUNC', 'SHOW', '0', 'system:user:import',         '#',  103, 1, now(), null, null, '');
insert into sys_menu values('7107', '重置密码', '701',  7,  null, null, null, '',1, 'FUNC', 'SHOW', '0', 'system:user:resetPwd',       '#',  103, 1, now(), null, null, '');

-- 部门管理按钮
insert into sys_menu values('7201', '部门查询', '702',   1,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:dept:query',          '#',  103, 1, now(), null, null, '');
insert into sys_menu values('7202', '部门新增', '702',   2,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:dept:add',            '#',  103, 1, now(), null, null, '');
insert into sys_menu values('7203', '部门修改', '702',   3,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:dept:edit',           '#',  103, 1, now(), null, null, '');
insert into sys_menu values('7204', '部门删除', '702',   4,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:dept:remove',         '#',  103, 1, now(), null, null, '');
-- 岗位管理按钮
insert into sys_menu values('7301', '岗位查询', '703',   1,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:post:query',          '#',  103, 1, now(), null, null, '');
insert into sys_menu values('7302', '岗位新增', '703',   2,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:post:add',            '#',  103, 1, now(), null, null, '');
insert into sys_menu values('7303', '岗位修改', '703',   3,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:post:edit',           '#',  103, 1, now(), null, null, '');
insert into sys_menu values('7304', '岗位删除', '703',   4,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:post:remove',         '#',  103, 1, now(), null, null, '');
insert into sys_menu values('7305', '岗位导出', '703',   5,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:post:export',         '#',  103, 1, now(), null, null, '');


-- 角色管理按钮
insert into sys_menu values('7401', '角色查询', '704',   1,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:role:query',          '#',  103, 1, now(), null, null, '');
insert into sys_menu values('7402', '角色新增', '704',   2,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:role:add',            '#',  103, 1, now(), null, null, '');
insert into sys_menu values('7403', '角色修改', '704',   3,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:role:edit',           '#',  103, 1, now(), null, null, '');
insert into sys_menu values('7404', '角色删除', '704',   4,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:role:remove',         '#',  103, 1, now(), null, null, '');
insert into sys_menu values('7405', '角色导出', '704',   5,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:role:export',         '#',  103, 1, now(), null, null, '');
-- 菜单管理按钮
insert into sys_menu values('7501', '菜单查询', '705',   1,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:menu:query',          '#',  103, 1, now(), null, null, '');
insert into sys_menu values('7502', '菜单新增', '705',   2,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:menu:add',            '#',  103, 1, now(), null, null, '');
insert into sys_menu values('7503', '菜单修改', '705',   3,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:menu:edit',           '#',  103, 1, now(), null, null, '');
insert into sys_menu values('7504', '菜单删除', '705',   4,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:menu:remove',         '#',  103, 1, now(), null, null, '');
-- 参数设置按钮
insert into sys_menu values('7601', '字典查询',     '706',  1,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:dict:query',        '#',  103, 1, now(), null, null, '');
insert into sys_menu values('7602', '字典新增',     '706',  2,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:dict:add',          '#',  103, 1, now(), null, null, '');
insert into sys_menu values('7603', '字典修改',     '706',  3,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:dict:edit',         '#',  103, 1, now(), null, null, '');
insert into sys_menu values('7604', '字典删除',     '706',  4,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:dict:remove',       '#',  103, 1, now(), null, null, '');
insert into sys_menu values('7605', '字典导出',     '706',  5,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:dict:export',       '#',  103, 1, now(), null, null, '');
insert into sys_menu values('7606', 'OSS配置查询',  '706',  6,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:oss-config:query',   '#',  103, 1, now(), null, null, '');
insert into sys_menu values('7607', 'OSS配置新增',  '706',  7,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:oss-config:add',     '#',  103, 1, now(), null, null, '');
insert into sys_menu values('7608', 'OSS配置修改',  '706',  8,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:oss-config:edit',    '#',  103, 1, now(), null, null, '');
-- insert into sys_menu values('7904', 'OSS配置删除', '709',  4,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:oss-config:remove',       '#',  103, 1, now(), null, null, '');



-- 通知公告按钮
insert into sys_menu values('7701', '公告查询', '707',   1,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:notice:query',        '#',  103, 1, now(), null, null, '');
insert into sys_menu values('7702', '公告新增', '707',   2,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:notice:add',          '#',  103, 1, now(), null, null, '');
insert into sys_menu values('7703', '公告修改', '707',   3,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:notice:edit',         '#',  103, 1, now(), null, null, '');
insert into sys_menu values('7704', '公告删除', '707',   4,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:notice:remove',       '#',  103, 1, now(), null, null, '');


-- OSS按钮
insert into sys_menu values('7801', '文件查询',    '708',  1,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:oss-object:query',     '#',  103, 1, now(), null, null, '');
insert into sys_menu values('7802', '删除文件',    '708',  2,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:oss-object:remove',    '#',  103, 1, now(), null, null, '');
insert into sys_menu values('7803', '上传文件',    '708',  3,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:oss-object:upload',    '#',  103, 1, now(), null, null, '');
insert into sys_menu values('7804', '下载文件',    '708',  4,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:oss-object:download',  '#',  103, 1, now(), null, null, '');

-- Client按钮
insert into sys_menu values('7901', '客户端查询', '709',   1,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:client:query',        '#',  103, 1, now(), null, null, '');
insert into sys_menu values('7902', '客户端新增', '709',   2,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:client:add',          '#',  103, 1, now(), null, null, '');
insert into sys_menu values('7903', '客户端修改', '709',   3,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:client:edit',         '#',  103, 1, now(), null, null, '');
insert into sys_menu values('7904', '客户端删除', '709',   4,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:client:remove',       '#',  103, 1, now(), null, null, '');
insert into sys_menu values('7905', '客户端导出', '709',   5,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:client:export',        '#', 103, 1, now(), null, null, '');
---------------------------------------------------------------------------------------------

--8.系统监控
insert into sys_menu values('8',    '系统监控', '0',   '8', '/monitor', null, null, '',1, 'FOLDER', 'SHOW', '0', '', 'iconfont-monitor',   103, 1, now(), null, null, '系统监控目录');

-- 二级菜单
insert into sys_menu values('800',  '默认跳转',  '8',  1, '/',             null,    '/monitor/online', '', 1, 'MENU', 'HIDE', '0', 'monitor:online:list',     '',           103, 1, now(), null, null, '默认跳转');
insert into sys_menu values('801',  '在线用户',  '8',  1, '/monitor/online',        './monitor/online',          null, '', 1, 'MENU', 'SHOW', '0', 'monitor:online:list',       'iconfont-online',         103, 1, now(), null, null, '在线用户菜单');
insert into sys_menu values('802',  '登录日志',  '8',  3, '/monitor/login-record',   './monitor/login-record',   null, '', 1, 'MENU', 'SHOW', '0', 'monitor:login-record:list', 'iconfont-notice',         103, 1, now(), null, null, '操作日志');
insert into sys_menu values('803',  '操作日志',  '8',  4, '/monitor/operation-log',  './monitor/operation-log',  null, '', 1, 'MENU', 'SHOW', '0', 'monitor:operation-log:list','iconfont-notice',         103, 1, now(), null, null, '登录日志菜单');
insert into sys_menu values('804',  '导入导出日志','8', 5, '/monitor/import-export-record', './monitor/import-export-record', null, '', 1, 'MENU', 'SHOW', '0', 'monitor:import-export:list','iconfont-cloud-file',     103, 1, now(), null, null, '导入日志菜单');

-- 在线用户按钮
insert into sys_menu values('8101', '在线查询', '801', 1, null, null, null, '',1, 'FUNC', 'SHOW', '0', 'monitor:online:query',             '#',  103, 1, now(), null, null, '');
insert into sys_menu values('8102', '批量强退', '801', 2, null, null, null, '',1, 'FUNC', 'SHOW', '0', 'monitor:online:batchLogout',       '#',  103, 1, now(), null, null, '');
insert into sys_menu values('8103', '单条强退', '801', 3, null, null, null, '',1, 'FUNC', 'SHOW', '0', 'monitor:online:forceLogout',       '#',  103, 1, now(), null, null, '');

---------------------------------------------------------------------------------------------

--8.系统监控
insert into sys_menu values('9',    '租户管理', '0',   '9', '/tenant', null, null, '',1, 'FOLDER', 'SHOW', '0', '', 'iconfont-tenant',   103, 1, now(), null, null, '系统监控目录');

-- 二级菜单
insert into sys_menu values('900',  '默认跳转',  '9',  1, '/',                  null,               '/tenant/account', '', 1, 'MENU', 'HIDE', '0', 'system:tenant:list',        '',                   103, 1, now(), null, null, '默认跳转');
insert into sys_menu values('901',  '租户账户',  '9',  1, '/tenant/account',   './tenant/account',   null,             '', 1, 'MENU', 'SHOW', '0', 'system:tenant:list',        'iconfont-tenant',      103, 1, now(), null, null, '在线用户菜单');
insert into sys_menu values('902',  '租户套餐',  '9',  3, '/tenant/package',   './tenant/package',   null,             '', 1, 'MENU', 'SHOW', '0', 'system:tenant-package:list','iconfont-tenant-package',    103, 1, now(), null, null, '操作日志');

-- 租户账户按钮
insert into sys_menu values('9101', '租户查询', '901',   1,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:tenant:query',          '#',  103, 1, now(), null, null, '');
insert into sys_menu values('9102', '租户新增', '901',   2,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:tenant:add',            '#',  103, 1, now(), null, null, '');
insert into sys_menu values('9103', '租户修改', '901',   3,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:tenant:edit',           '#',  103, 1, now(), null, null, '');
insert into sys_menu values('9104', '租户删除', '901',   4,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:tenant:remove',         '#',  103, 1, now(), null, null, '');
insert into sys_menu values('9105', '租户导出', '901',   5,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:tenant:export',         '#',  103, 1, now(), null, null, '');

-- 租户套餐按钮
insert into sys_menu values('9201', '套餐查询', '902',   1,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:tenant-package:query',          '#',  103, 1, now(), null, null, '');
insert into sys_menu values('9202', '套餐新增', '902',   2,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:tenant-package:add',            '#',  103, 1, now(), null, null, '');
insert into sys_menu values('9203', '套餐修改', '902',   3,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:tenant-package:edit',           '#',  103, 1, now(), null, null, '');
insert into sys_menu values('9204', '套餐删除', '902',   4,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:tenant-package:remove',         '#',  103, 1, now(), null, null, '');
insert into sys_menu values('9205', '套餐导出', '902',   5,  null, null, null, '', 1, 'FUNC', 'SHOW', '0', 'system:tenant-package:export',         '#',  103, 1, now(), null, null, '');


SELECT pg_catalog.setval('sys_menu_id_seq', 10000, false);

--rollback delete from sys_menu where id < 10000;


-- ----------------------------
-- 2、初始化-租户表数据
-- ----------------------------
--changeset tixwork:sys_tenant_init
insert into sys_tenant values(1, '100000', '管理组', '13880964614', '平台', null, null, 'tixwork管理系统', null, null, null, null, -1, '0', '0', 103, 1, now(), null, null);

SELECT pg_catalog.setval('sys_tenant_id_seq', 1000, false);

--rollback delete from sys_tenant;


-- ----------------------------
-- 3、初始化dept
-- ----------------------------
--changeset tixwork:sys_dept_init
insert into sys_dept values(100, '100000', 0,   '0',          '钛安集团',      0,  'tixwork', '13880964614', '', 'GROUP',      '0', '0',  103, 1, now(), null, null);
insert into sys_dept values(101, '100000', 100, '0,100',      '钛安科技',      1,  'tixwork', '13880964614', '', 'COMPANY',    '0', '0',  103, 1, now(), null, null);
insert into sys_dept values(102, '100000', 101, '0,100,101',  '人力资源',      1,  'tixwork', '13880964614', '', 'DEPARTMENT', '0', '0',  103, 1, now(), null, null);
insert into sys_dept values(103, '100000', 101, '0,100,101',  '开发部门',      1,  'tixwork', '13880964614', '', 'DEPARTMENT', '0', '0',  103, 1, now(), null, null);

SELECT pg_catalog.setval('sys_dept_dept_id_seq', 1000, false);

--rollback delete from sys_dept where id<1000;


-- ----------------------------
-- 4.初始化-用户信息表数据
-- ----------------------------
--changeset tixwork:sys_user_init
insert into sys_user values(1, '100000', 103, 'tixwork', '管理员', 'SYS_USER', 'tixwork@aliyun.com', '', 'FEMALE', '', '$2a$10$2DoCQzb4NbWxLZ8f3Va2De5nXBApVxYJQZEoWHTLBeIUPIvpg4iQa', '0', null, null, '0', '127.0.0.1', now(), 103, 1, now(), null, null, '管理员');
insert into sys_user values(2, '100000', 103, 'kala888', '刘利',   'SYS_USER', 'kalaliu@aliyun.com', '', 'MALE',   '', '$2a$10$2DoCQzb4NbWxLZ8f3Va2De5nXBApVxYJQZEoWHTLBeIUPIvpg4iQa', '0', null, null, '0', '127.0.0.1', now(), 103, 1, now(), null, null, '管理员');

SELECT pg_catalog.setval('sys_user_user_id_seq', 1000, false);

--rollback delete from sys_user where id<1000;


-- ----------------------------
-- 5.初始化-岗位信息表数据
-- ----------------------------
--changeset tixwork:sys_post_init
insert into sys_post values(1, '100000', 'manger','后台管理',  1, '0',103, 1, now(), null, null, '');
insert into sys_post values(2, '100000','ceo',   '董事长',    2, '0',103, 1, now(), null, null, '');
insert into sys_post values(3, '100000','pm',    '项目经理',  3, '0', 103,1, now(), null, null, '');
insert into sys_post values(4, '100000','hr',    '人力资源',  4, '0',103, 1, now(), null, null, '');
insert into sys_post values(5, '100000','user',  '普通员工',  5, '0',103, 1, now(), null, null, '');

SELECT pg_catalog.setval('sys_post_id_seq', 1000, false);

--rollback delete from sys_user where id<1000;

-- ----------------------------
-- 6.初始化-角色信息表数据
-- ----------------------------
--changeset tixwork:sys_role_init
insert into sys_role values('1', '100000', '超级管理员',  'tixwork',1, '1',' t', 't', '0', '0', 103, 1, now(), null, null, '超级管理员');
insert into sys_role values('2', '100000', '普通角色',    'common', 2, '2', 't', 't', '0', '0', 103, 1, now(), null, null, '普通角色');

SELECT pg_catalog.setval('sys_role_id_seq', 1000, false);

--rollback delete from sys_role where id<1000;

-- ----------------------------
-- 7.初始化-用户和角色关联表数据
-- ----------------------------
--changeset tixwork:sys_user_role_init
insert into sys_user_role values ('1', '1');
insert into sys_user_role values ('2', '2');

--rollback truncate table sys_user_role;


-- ----------------------------
-- 8.初始化-角色和菜单关联表数据
-- ----------------------------
--changeset tixwork:sys_role_menu_init
insert into sys_role_menu values ('2', '1');
insert into sys_role_menu values ('2', '7');
insert into sys_role_menu values ('2', '700');
insert into sys_role_menu values ('2', '701');
insert into sys_role_menu values ('2', '702');
insert into sys_role_menu values ('2', '703');
insert into sys_role_menu values ('2', '704');
insert into sys_role_menu values ('2', '705');
insert into sys_role_menu values ('2', '706');
insert into sys_role_menu values ('2', '707');
insert into sys_role_menu values ('2', '708');
insert into sys_role_menu values ('2', '709');
insert into sys_role_menu values ('2', '7101');
insert into sys_role_menu values ('2', '7102');
insert into sys_role_menu values ('2', '7104');
insert into sys_role_menu values ('2', '7105');
insert into sys_role_menu values ('2', '7106');
insert into sys_role_menu values ('2', '7107');
insert into sys_role_menu values ('2', '7201');
insert into sys_role_menu values ('2', '7202');
insert into sys_role_menu values ('2', '7203');
insert into sys_role_menu values ('2', '7204');
insert into sys_role_menu values ('2', '7301');
insert into sys_role_menu values ('2', '7302');
insert into sys_role_menu values ('2', '7303');
insert into sys_role_menu values ('2', '7304');
insert into sys_role_menu values ('2', '7305');
insert into sys_role_menu values ('2', '7401');
insert into sys_role_menu values ('2', '7402');
insert into sys_role_menu values ('2', '7403');
insert into sys_role_menu values ('2', '7404');
insert into sys_role_menu values ('2', '7405');
insert into sys_role_menu values ('2', '7501');
insert into sys_role_menu values ('2', '7502');
insert into sys_role_menu values ('2', '7503');
insert into sys_role_menu values ('2', '7504');
insert into sys_role_menu values ('2', '7601');
insert into sys_role_menu values ('2', '7602');
insert into sys_role_menu values ('2', '7603');
insert into sys_role_menu values ('2', '7604');
insert into sys_role_menu values ('2', '7605');
insert into sys_role_menu values ('2', '7606');
insert into sys_role_menu values ('2', '7607');
insert into sys_role_menu values ('2', '7608');
insert into sys_role_menu values ('2', '7609');
insert into sys_role_menu values ('2', '7701');
insert into sys_role_menu values ('2', '7702');
insert into sys_role_menu values ('2', '7703');
insert into sys_role_menu values ('2', '7704');
insert into sys_role_menu values ('2', '7801');
insert into sys_role_menu values ('2', '7802');
insert into sys_role_menu values ('2', '7803');
insert into sys_role_menu values ('2', '7804');
insert into sys_role_menu values ('2', '7902');
insert into sys_role_menu values ('2', '7903');
insert into sys_role_menu values ('2', '7904');
insert into sys_role_menu values ('2', '7905');
insert into sys_role_menu values ('2', '8  ');
insert into sys_role_menu values ('2', '800');
insert into sys_role_menu values ('2', '801');
insert into sys_role_menu values ('2', '802');
insert into sys_role_menu values ('2', '803');
insert into sys_role_menu values ('2', '804');
insert into sys_role_menu values ('2', '8101');
insert into sys_role_menu values ('2', '8102');


--rollback truncate table sys_role_menu;


-- ----------------------------
-- 9.初始化-角色和部门关联表数据
-- ----------------------------
--changeset tixwork:sys_role_dept_init
insert into sys_role_dept values ('2', '100');
insert into sys_role_dept values ('2', '101');
insert into sys_role_dept values ('2', '102');

--rollback truncate table sys_role_dept;


-- ----------------------------
-- 10.初始化-用户与岗位关联表数据
-- ----------------------------
--changeset tixwork:sys_user_post_init
insert into sys_user_post values ('1', '1');
insert into sys_user_post values ('2', '2');

--rollback truncate table sys_user_post;


-- ----------------------------
-- 11.初始化-系统字典
-- ----------------------------
--changeset tixwork:sys_config_init
insert into sys_config values(1, '100000', '账号初始密码',    'sys.user.initPassword',        'CONFIG',   'tixwork888',   null,  'SYSTEM',  10, 'Y','0', 103,1, now(), null, null,  '初始化密码 tixwork888' );
insert into sys_config values(3, '100000','是否开启注册接口',  'sys.account.registerUser',     'CONFIG',   'false',        null,   'SYSTEM', 10, 'Y', '0', 103,1, now(), null, null, '是否开启注册用户功能（true开启，false关闭）');
insert into sys_config values(5, '100000', '数据缓存检测',    'app.expire.date',              'CONFIG',  '2033-11-01',   null,   'SYSTEM',  10, 'Y','0', 103,1, now(), null, null, '缓存');

insert into sys_config values(8, '100000', '系统是否',        'sys.yes-no',    'DICT',    null,          null,    'PUBLIC', 10, 'N', '0', 103,1,now(), null,null,'系统级的yes和no的枚举');
insert into sys_config values(9, '100000', '是',             'yes',           'VALUE',   'yes',         8,       'PUBLIC', 10, 'Y', '0', 103,1,now(), null,null,'系统级的yes和no的枚举');
insert into sys_config values(10,'100000', '否',             'no',            'VALUE',   'no',          8,       'PUBLIC', 10, 'N', '0', 103,1,now(), null,null,'系统级的yes和no的枚举');

insert into sys_config values(11, '100000', '通知类型',       'sys.notice',     'DICT',    null,          null,    'PUBLIC', 10, 'N', '0', 103,1,now(), null,null,'通知的类型');
insert into sys_config values(12, '100000', '通知',           'notification',   'VALUE',  '1',            11,      'PUBLIC', 10, 'Y', '0', 103,1,now(), null,null,'通知的类型-通知');
insert into sys_config values(13, '100000', '公告',           'announcement',  'VALUE',  '2',            11,      'PUBLIC', 10, 'N', '0', 103,1,now(), null,null,'通知的类型-公告');

insert into sys_config values(14, '100000', '状态',           'sys.status',     'DICT',    null,          null,   'PUBLIC', 10, 'N', '0', 103,1,now(), null,null,'状态');
insert into sys_config values(15, '100000', '正常',           '0',              'VALUE',  '1',            14,     'PUBLIC', 10, 'Y', '0', 103,1,now(), null,null,'状态-0正常');
insert into sys_config values(16, '100000', '停用',           '1',              'VALUE',  '2',            14,     'PUBLIC', 10, 'N', '0', 103,1,now(), null,null,'状态-1停用');

insert into sys_config values(17, '100000', '状态',           'sys.result',     'DICT',    null,          null,   'PUBLIC', 10, 'N', '0', 103,1,now(), null,null,'状态');
insert into sys_config values(18, '100000', '成功',           '0',              'VALUE',  '1',            17,     'PUBLIC', 10, 'Y', '0', 103,1,now(), null,null,'状态-0正常');
insert into sys_config values(19, '100000', '失败',           '1',              'VALUE',  '2',            17,     'PUBLIC', 10, 'N', '0', 103,1,now(), null,null,'状态-1停用');


insert into sys_config values(20, '100000', '授权类型',        'sys.grant_type', 'DICT',    null,          null,   'PUBLIC', 10, 'N', '0', 103,1,now(), null,null,'授权类型');
insert into sys_config values(21, '100000', '密码认证',        'password',       'VALUE',  'password',     20,     'PUBLIC', 10, 'N', '0', 103,1,now(), null,null,'密码认证');
insert into sys_config values(22, '100000', '短信认证',        'sms',            'VALUE',  'sms',          20,     'PUBLIC', 10, 'N', '0', 103,1,now(), null,null,'短信认证');
insert into sys_config values(23, '100000', '邮件认证',        'email',          'VALUE',  'email',        20,     'PUBLIC', 10, 'N', '0', 103,1,now(), null,null,'邮件认证');
insert into sys_config values(24, '100000', '小程序认证',       'mp',             'VALUE',  'mp',           20,     'PUBLIC', 10, 'N', '0', 103,1,now(), null,null,'小程序认证');



insert into sys_config values(30, '100000', '设备类型',        'sys.device_type', 'DICT',   null,          null,   'PUBLIC', 10, 'N', '0', 103,1,now(), null,null,'设备类型');
insert into sys_config values(31, '100000', 'PC端',           'pc',              'VALUE',  'PC端',         30,     'PUBLIC', 10, 'N', '0', 103,1,now(), null,null,'PC网页');
insert into sys_config values(32, '100000', '小程序端',        'mp',              'VALUE',  '小程序端',      30,     'PUBLIC', 10, 'N', '0', 103,1,now(), null,null,'小程序');
insert into sys_config values(33, '100000', 'App端',          'app',             'VALUE',  'App端',        30,     'PUBLIC', 10, 'N', '0', 103,1,now(), null,null,'App');



SELECT pg_catalog.setval('sys_config_id_seq', 1000, false);

--rollback delete from sys_config where id<1000;


-- ----------------------------
-- 12.初始化-公告信息表数据
-- ----------------------------
--changeset tixwork:sys_notice_init
insert into sys_notice values('1', '100000', '温馨提醒：2023-12-01 新版本发布啦', 'NOTIFICATION', '新版本内容', '0', 103,1, now(), null, null, '管理员');
insert into sys_notice values('2', '100000','维护通知：202-01-01 系统凌晨维护', 'ANNOUNCEMENT', '维护内容',   '0', 103,1, now(), null, null, '管理员');

SELECT pg_catalog.setval('sys_notice_id_seq', 3, false);

--rollback delete from sys_notice where id<1000;


-- ----------------------------
-- 13、初始化-公告信息表数据
-- ----------------------------
--changeset tixwork:sys_oss_config_init
insert into sys_oss_config(id, config_key, access_key, secret_key, bucket_name, prefix, endpoint)
values (1, 'minio', 'tixwork', 'xxxxxx', 'tixwork', '', '127.0.0.1:9000');
insert into sys_oss_config (id, config_key, access_key, secret_key, bucket_name, prefix, endpoint,status)
values (2, 'aliyun', 'xxxx', 'xxxx', 'tixwork', '', 'oss-cn-chengdu.aliyuncs.com',0);
insert into sys_oss_config(id, config_key, access_key, secret_key, bucket_name, prefix, endpoint, domain, is_https, region)
values (3, 'qcloud', 'XX', 'xxxxxx', 'tixwork', '', 'cos.ap-beijing.myqcloud.com', '', 'N', 'ap-beijing');
insert into sys_oss_config(id, config_key, access_key, secret_key, bucket_name, prefix, endpoint)
values (4, 'qiniu', 'XX', 'xxxxxx', 'tixwork', '', 's3-cn-north-1.qiniucs.com');
insert into sys_oss_config (id, config_key, access_key, secret_key, bucket_name, prefix, endpoint)
values (5, 'image', 'tixwork', 'xxxxxx', 'tixwork', 'image', '127.0.0.1:9000');

SELECT pg_catalog.setval('sys_oss_config_id_seq', 1000, false);

--rollback delete from sys_oss_config where id<1000;


-- ----------------------------
-- 14、初始化-客户端信息表数据
-- ----------------------------
--changeset tixwork:sys_client_init
insert into sys_client values (1, 'abd6143de793ceff8485c5c4b2cd9c7e', 'pc',  'XTQ84AMZHMPE', 'password',        'pc', 1800,   604800,   0, 0, 103, 1, now(), 1, now());
insert into sys_client values (2, '412d009409c0dc93434c466dd8365ab1', 'mp',  '412J13W73KZQ', 'password,sms,mp', 'mp',  2592000, 2592000, 0, 0, 103, 1, now(), 1, now());
insert into sys_client values (3, '3a0ea13537ea9e314b4048407f79d127', 'app', 'PGQD4BEM7ECP', 'password,sms',    'app', 2592000, 2592000, 0, 0, 103, 1, now(), 1, now());

SELECT pg_catalog.setval('sys_client_id_seq', 10000, false);

--rollback delete from sys_client where id<10000;
