--tixwork formatted sql

-- ----------------------------
-- 1. 租户表
-- ----------------------------
--changeset tixwork:sys_tenant
drop table if exists sys_tenant;
create table if not exists sys_tenant (
    id                bigserial constraint pk_sys_tenant_id primary key,
    tenant_id         varchar(20)   not null,
    contact_user_name varchar(20)   default null::varchar,
    contact_mobile    varchar(20)   default null::varchar,
    company_name      varchar(50)   default null::varchar,
    credit_code       varchar(30)   default null::varchar,
    address           varchar(200)  default null::varchar,
    intro             varchar(200)  default null::varchar,
    domain            varchar(200)  default null::varchar,
    remark            varchar(200)  default null::varchar,
    package_id        int8,
    expire_time       timestamp,
    account_count     int4          default -1,
    status            char          default '0'::bpchar,
    del_flag           char          default '0'::bpchar,
    create_dept       int8,
    create_by         int8,
    create_time       timestamp,
    update_by         int8,
    update_time       timestamp
);


comment on table   sys_tenant                    is '租户表';
comment on column  sys_tenant.tenant_id          is '租户编号';
comment on column  sys_tenant.contact_mobile     is '联系电话';
comment on column  sys_tenant.company_name       is '企业名称';
comment on column  sys_tenant.company_name       is '联系人';
comment on column  sys_tenant.credit_code        is '统一社会信用代码';
comment on column  sys_tenant.address            is '地址';
comment on column  sys_tenant.intro              is '企业简介';
comment on column  sys_tenant.domain             is '域名';
comment on column  sys_tenant.remark             is '备注';
comment on column  sys_tenant.package_id         is '租户套餐编号';
comment on column  sys_tenant.expire_time        is '过期时间';
comment on column  sys_tenant.account_count      is '用户数量（-1不限制）';
comment on column  sys_tenant.status             is '租户状态（0正常 1停用）';
comment on column  sys_tenant.del_flag            is '删除标志（0代表存在 2代表删除）';
comment on column  sys_tenant.create_dept        is '创建部门';
comment on column  sys_tenant.create_by          is '创建者';
comment on column  sys_tenant.create_time        is '创建时间';
comment on column  sys_tenant.update_by          is '更新者';
comment on column  sys_tenant.update_time        is '更新时间';

--rollback DROP TABLE sys_tenant;


-- ----------------------------
-- 2. 租户套餐表
-- ----------------------------
--changeset tixwork:sys_tenant_package
drop table if exists sys_tenant_package;
create table if not exists sys_tenant_package (
    id                  bigserial constraint pk_sys_tenant_package_id primary key,
    package_name        varchar(20)     default ''::varchar,
    menu_ids            varchar(3000)   default ''::varchar,
    remark              varchar(200)    default ''::varchar,
    menu_check_strictly bool            default true,
    status              char            default '0'::bpchar,
    del_flag             char            default '0'::bpchar,
    create_dept         int8,
    create_by           int8,
    create_time         timestamp,
    update_by           int8,
    update_time         timestamp
);

comment on table   sys_tenant_package                    is '租户套餐表';
comment on column  sys_tenant_package.id                 is '租户套餐id';
comment on column  sys_tenant_package.package_name       is '套餐名称';
comment on column  sys_tenant_package.menu_ids           is '关联菜单id';
comment on column  sys_tenant_package.remark             is '备注';
comment on column  sys_tenant_package.status             is '状态（0正常 1停用）';
comment on column  sys_tenant_package.del_flag            is '删除标志（0代表存在 2代表删除）';
comment on column  sys_tenant_package.create_dept        is '创建部门';
comment on column  sys_tenant_package.create_by          is '创建者';
comment on column  sys_tenant_package.create_time        is '创建时间';
comment on column  sys_tenant_package.update_by          is '更新者';
comment on column  sys_tenant_package.update_time        is '更新时间';

--rollback DROP TABLE sys_tenant_package;


-- ----------------------------
-- 3、部门表
-- ----------------------------
--changeset tixwork:sys_dept
drop table if exists sys_dept;
create table if not exists sys_dept (
    dept_id     bigserial constraint pk_sys_dept_id primary key,
    tenant_id   varchar(20) default '100000'::varchar,
    parent_id   int8        default 0,
    ancestors   varchar(500)default ''::varchar,
    dept_name   varchar(30) default ''::varchar,
    sort_order  numeric     default 10,
    leader      varchar(20) default null::varchar,
    mobile      varchar(11) default null::varchar,
    email       varchar(50) default null::varchar,
    dept_type   varchar(50) default 'DEPARTMENT'::character varying,
    status      char        default '0'::bpchar,
    del_flag     char        default '0'::bpchar,
    create_dept int8,
    create_by   int8,
    create_time timestamp,
    update_by   int8,
    update_time timestamp
);

comment on table sys_dept               is '部门表';
comment on column sys_dept.dept_id      is '部门ID';
comment on column sys_dept.tenant_id    is '租户编号';
comment on column sys_dept.parent_id    is '父部门ID';
comment on column sys_dept.ancestors    is '祖级列表';
comment on column sys_dept.dept_name    is '部门名称';
comment on column sys_dept.sort_order   is '显示顺序';
comment on column sys_dept.leader       is '负责人';
comment on column sys_dept.mobile        is '联系电话';
comment on column sys_dept.email        is '邮箱';
comment on column sys_dept.dept_type is '组织类型，GROUP|COMPANY|DEPARTMENT';
comment on column sys_dept.status       is '部门状态（0正常 1停用）';
comment on column sys_dept.del_flag     is '删除标志（0代表存在 2代表删除）';
comment on column sys_dept.create_dept  is '创建部门';
comment on column sys_dept.create_by    is '创建者';
comment on column sys_dept.create_time  is '创建时间';
comment on column sys_dept.update_by    is '更新者';
comment on column sys_dept.update_time  is '更新时间';

--rollback DROP TABLE sys_dept;


-- ----------------------------
-- 4、用户信息表
-- ----------------------------
--changeset tixwork:sys_user
drop table if exists sys_user;
create table if not exists sys_user (
    user_id     bigserial    constraint pk_sys_user_id primary key,
    tenant_id   varchar(20),
    dept_id     int8,
    user_name   varchar(30)  not null,
    nick_name   varchar(30)  not null,
    user_type   varchar(30)  default 'SYS_USER'::varchar,
    email       varchar(50)  default ''::varchar,
    mobile      varchar(50)  default ''::varchar,
    gender      varchar(10)  default ''::varchar,
    avatar      varchar(400) default ''::varchar,
    password    varchar(100) default ''::varchar,
    status      char         default '0'::bpchar,
    open_id     varchar(100) default null,
    union_id    varchar(100) default null,
    del_flag     char         default '0'::bpchar,
    login_ip    varchar(128) default ''::varchar,
    login_date  timestamp,
    create_dept int8,
    create_by   int8,
    create_time timestamp,
    update_by   int8,
    update_time timestamp,
    remark      varchar(500) default null::varchar
);

comment on table sys_user               is '用户信息表';
comment on column sys_user.user_id      is '用户ID';
comment on column sys_user.tenant_id    is '租户编号';
comment on column sys_user.dept_id      is '部门ID';
comment on column sys_user.user_name    is '用户账号';
comment on column sys_user.nick_name    is '用户昵称';
comment on column sys_user.user_type    is '用户类型（sys_user系统用户）';
comment on column sys_user.email        is '用户邮箱';
comment on column sys_user.mobile       is '手机号码';
comment on column sys_user.gender       is '用户性别（0男 1女 2未知）';
comment on column sys_user.avatar       is '头像地址';
comment on column sys_user.password     is '密码';
comment on column sys_user.status       is '帐号状态（0正常 1停用）';
comment on column sys_user.open_id      is   'wechat OpenId';
comment on column sys_user.union_id     is  'wechat UnionId';
comment on column sys_user.del_flag      is '删除标志（0代表存在 2代表删除）';
comment on column sys_user.login_ip     is '最后登陆IP';
comment on column sys_user.login_date   is '最后登陆时间';
comment on column sys_user.create_dept  is '创建部门';
comment on column sys_user.create_by    is '创建者';
comment on column sys_user.create_time  is '创建时间';
comment on column sys_user.update_by    is '更新者';
comment on column sys_user.update_time  is '更新时间';
comment on column sys_user.remark       is '备注';

--rollback DROP TABLE sys_user;


-- ----------------------------
-- 5、岗位信息表
-- ----------------------------
--changeset tixwork:sys_post
drop table if exists sys_post;
create table if not exists sys_post (
    id          bigserial   constraint pk_sys_post primary key,
    tenant_id   varchar(20) default '100000'::varchar,
    post_code   varchar(64) not null,
    post_name   varchar(50) not null,
    sort_order  numeric     default 10,
    status      char        not null,
    create_dept int8,
    create_by   int8,
    create_time timestamp,
    update_by   int8,
    update_time timestamp,
    remark      varchar(500) default null::varchar
);

comment on table sys_post               is '岗位信息表';
comment on column sys_post.id           is '岗位ID';
comment on column sys_post.tenant_id    is '租户编号';
comment on column sys_post.post_code    is '岗位编码';
comment on column sys_post.post_name    is '岗位名称';
comment on column sys_post.sort_order   is '显示顺序';
comment on column sys_post.status       is '状态（0正常 1停用）';
comment on column sys_post.create_dept  is '创建部门';
comment on column sys_post.create_by    is '创建者';
comment on column sys_post.create_time  is '创建时间';
comment on column sys_post.update_by    is '更新者';
comment on column sys_post.update_time  is '更新时间';
comment on column sys_post.remark       is '备注';

--rollback DROP TABLE sys_post;


-- ----------------------------
-- 6、角色信息表
-- ----------------------------
--changeset tixwork:sys_role
drop table if exists sys_role;
create table if not exists sys_role (
    id                  bigserial    constraint pk_sys_role primary key,
    tenant_id           varchar(20)  default '100000'::varchar,
    role_name           varchar(30)  not null,
    role_key            varchar(100) not null,
    sort_order          numeric      default 10,
    data_scope          char         default '1'::bpchar,
    menu_check_strictly bool         default true,
    dept_check_strictly bool         default true,
    status              char         default '0'::bpchar,
    del_flag             char         default '0'::bpchar,
    create_dept         int8,
    create_by           int8,
    create_time         timestamp,
    update_by           int8,
    update_time         timestamp,
    remark              varchar(500) default null::varchar
);

comment on table sys_role                       is '角色信息表';
comment on column sys_role.id                   is '角色ID';
comment on column sys_role.tenant_id            is '租户编号';
comment on column sys_role.role_name            is '角色名称';
comment on column sys_role.role_key             is '角色权限字符串';
comment on column sys_role.sort_order           is '显示顺序';
comment on column sys_role.data_scope           is '数据范围（1：全部数据权限 2：自定数据权限 3：本部门数据权限 4：本部门及以下数据权限）';
comment on column sys_role.menu_check_strictly  is '菜单树选择项是否关联显示';
comment on column sys_role.dept_check_strictly  is '部门树选择项是否关联显示';
comment on column sys_role.status               is '角色状态（0正常 1停用）';
comment on column sys_role.del_flag              is '删除标志（0代表存在 2代表删除）';
comment on column sys_role.create_dept          is '创建部门';
comment on column sys_role.create_by            is '创建者';
comment on column sys_role.create_time          is '创建时间';
comment on column sys_role.update_by            is '更新者';
comment on column sys_role.update_time          is '更新时间';
comment on column sys_role.remark               is '备注';

--rollback DROP TABLE sys_role;


-- ----------------------------
-- 7、菜单权限表
-- ----------------------------
--changeset tixwork:sys_menu
drop table if exists sys_menu;
create table if not exists sys_menu (
    id          bigserial    constraint pk_sys_menu_id primary key,
    name        varchar(50)  not null,
    parent_id   int8         default 0,
    sort_order  numeric      default 10,
    path        varchar(200) default ''::varchar,
    component   varchar(255) default null::varchar,
    redirect    varchar(255) default NULL::character varying,

    query_param varchar(255) default null::varchar,
    is_frame    char         default '1'::bpchar,

    menu_type   varchar(10)  default 'MENU'::bpchar,
    visible     varchar(10)  default 'SHOW'::bpchar,
    status      char         default '0'::bpchar,
    perms       varchar(100) default null::varchar,
    icon        varchar(100) default '#'::varchar,
    create_dept int8,
    create_by   int8,
    create_time timestamp,
    update_by   int8,
    update_time timestamp,
    remark      varchar(500) default ''::varchar
);

comment on table sys_menu               is '菜单权限表';
comment on column sys_menu.id           is '菜单ID';
comment on column sys_menu.name         is '菜单名称';
comment on column sys_menu.icon         is '菜单图标';
comment on column sys_menu.parent_id    is '父菜单ID';
comment on column sys_menu.sort_order   is '显示顺序';
comment on column sys_menu.path         is '路由地址';
comment on column sys_menu.redirect     is '跳转路径';
comment on column sys_menu.component    is '组件路径';
comment on column sys_menu.query_param  is '路由参数';
comment on column sys_menu.is_frame     is '是否为外链（0是 1否）';
comment on column sys_menu.menu_type    is '菜单类型（FOLDER目录 MENU菜单 FUNC按钮）';
comment on column sys_menu.visible      is '显示状态（SHOW显示 HIDE隐藏）';
comment on column sys_menu.status       is '菜单状态（0正常 1停用）';
comment on column sys_menu.perms        is '权限标识';
comment on column sys_menu.create_dept  is '创建部门';
comment on column sys_menu.create_by    is '创建者';
comment on column sys_menu.create_time  is '创建时间';
comment on column sys_menu.update_by    is '更新者';
comment on column sys_menu.update_time  is '更新时间';
comment on column sys_menu.remark       is '备注';

--rollback DROP TABLE sys_menu;


-- ----------------------------
-- 8、用户和角色关联表  用户N-1角色
-- ----------------------------
--changeset tixwork:sys_user_role
drop table if exists sys_user_role;
create table if not exists sys_user_role (
    user_id int8 not null,
    role_id int8 not null,
    constraint pk_sys_user_role primary key (user_id, role_id)
);

comment on table sys_user_role              is '用户和角色关联表';
comment on column sys_user_role.user_id     is '用户ID';
comment on column sys_user_role.role_id     is '角色ID';

--rollback DROP TABLE sys_user_role;


-- ----------------------------
-- 9、角色和菜单关联表  角色1-N菜单
-- ----------------------------
--changeset tixwork:sys_role_menu
drop table if exists sys_role_menu;
create table if not exists sys_role_menu (
    role_id int8 not null,
    menu_id int8 not null,
    constraint pk_sys_role_menu primary key (role_id, menu_id)
);

comment on table sys_role_menu              is '角色和菜单关联表';
comment on column sys_role_menu.role_id     is '角色ID';
comment on column sys_role_menu.menu_id     is '菜单ID';

--rollback DROP TABLE sys_role_menu;


-- ----------------------------
-- 10、角色和部门关联表  角色1-N部门
-- ----------------------------
--changeset tixwork:sys_role_dept
drop table if exists sys_role_dept;
create table if not exists sys_role_dept (
    role_id int8 not null,
    dept_id int8 not null,
    constraint pk_sys_role_dept primary key (role_id, dept_id)
);

comment on table sys_role_dept              is '角色和部门关联表';
comment on column sys_role_dept.role_id     is '角色ID';
comment on column sys_role_dept.dept_id     is '部门ID';

--rollback DROP TABLE sys_role_dept;


-- ----------------------------
-- 11、用户与岗位关联表  用户1-N岗位
-- ----------------------------
--changeset tixwork:sys_user_post
drop table if exists sys_user_post;
create table if not exists sys_user_post (
    user_id int8 not null,
    post_id int8 not null,
    constraint pk_sys_user_post primary key (user_id, post_id)
);

comment on table sys_user_post              is '用户与岗位关联表';
comment on column sys_user_post.user_id     is '用户ID';
comment on column sys_user_post.post_id     is '岗位ID';

--rollback DROP TABLE sys_user_post;


-- ----------------------------
-- 12、操作日志记录
-- ----------------------------
--changeset tixwork:sys_operation_log
drop table if exists sys_operation_log;
create table if not exists sys_operation_log (
    id             bigserial     constraint  pk_sys_operation_log primary key,
    tenant_id      varchar(20)   default '100000'::varchar,
    title          varchar(50)   default ''::varchar,
    business_type  int4          default 0,
    method         varchar(100)  default ''::varchar,
    request_method varchar(10)   default ''::varchar,
    operator_type  int4          default 0,
    user_name      varchar(50)   default ''::varchar,
    dept_name      varchar(50)   default ''::varchar,
    url            varchar(400)  default ''::varchar,
    ip             varchar(128)  default ''::varchar,
    location       varchar(255)  default ''::varchar,
    param          varchar(4000) default ''::varchar,
    json_result    varchar(4000) default ''::varchar,
    status         int4          default 0,
    error_msg      varchar(2000) default ''::varchar,
    cost_time      int8          default 0,
    create_by      int8,
    create_time    timestamp,
    update_by      int8,
    update_time    timestamp
);

create index idx_sys_operation_log_business_type ON sys_operation_log (business_type);
create index idx_sys_operation_log_status  ON sys_operation_log (status);
create index idx_sys_operation_log_create_time ON sys_operation_log (create_time);

comment on table sys_operation_log                   is '操作日志记录';
comment on column sys_operation_log.id               is '日志主键';
comment on column sys_operation_log.tenant_id        is '租户编号';
comment on column sys_operation_log.title            is '模块标题';
comment on column sys_operation_log.business_type    is '业务类型（0其它 1新增 2修改 3删除）';
comment on column sys_operation_log.method           is '方法名称';
comment on column sys_operation_log.request_method   is '请求方式';
comment on column sys_operation_log.operator_type    is '操作类别（0其它 1后台用户 2手机端用户）';
comment on column sys_operation_log.user_name        is '操作人员';
comment on column sys_operation_log.dept_name        is '部门名称';
comment on column sys_operation_log.url              is '请求URL';
comment on column sys_operation_log.ip               is '主机地址';
comment on column sys_operation_log.location         is '操作地点';
comment on column sys_operation_log.param            is '请求参数';
comment on column sys_operation_log.json_result      is '返回参数';
comment on column sys_operation_log.status           is '操作状态（0正常 1异常）';
comment on column sys_operation_log.error_msg        is '错误消息';
comment on column sys_operation_log.cost_time        is '消耗时间';
comment on column sys_operation_log.create_by        is '创建者';
comment on column sys_operation_log.create_time      is '创建时间';
comment on column sys_operation_log.update_by        is '更新者';
comment on column sys_operation_log.update_time      is '更新时间';

--rollback DROP TABLE sys_operation_log;


-- ----------------------------
-- 15、参数配置表
-- ----------------------------
--changeset tixwork:sys_config
drop table if exists sys_config;
create table if not exists sys_config (
    id           bigserial      constraint pk_sys_config primary key,
    tenant_id    varchar(20)    default '100000'::varchar,
    title        varchar(100)   default ''::varchar,
    key          varchar(100)   not null default ''::varchar,
    type         varchar(20)    default 'VALUE'::bpchar,
    value        varchar(500)   default ''::varchar,
    parent       bigint         null,
    data_scope   varchar(20)    default 'PUBLIC',
    sort_order   numeric        default 10,
    is_default   char           default 'N'::bpchar,
    status       char           default '0'::bpchar,
    create_dept  int8,
    create_by    int8,
    create_time  timestamp,
    update_by    int8,
    update_time  timestamp,
    remark       varchar(500) default null::varchar
);

comment on table sys_config                is '参数配置表';
comment on column sys_config.id            is '参数主键';
comment on column sys_config.tenant_id     is '租户编号';
comment on column sys_config.title         is '参数名称';
comment on column sys_config.key           is '参数键名';
comment on column sys_config.value         is '参数键值';
comment on column sys_config.type          is '类型，CONFIG|DICT|VALUE';
comment on column sys_config.parent        is '分组值引用';
comment on column sys_config.data_scope    is '权限范围，PRIVATE|PUBLIC|SYSTEM';
comment on column sys_config.sort_order    is '字典排序';
comment on column sys_config.is_default    is '是否默认（Y是 N否）';
comment on column sys_config.status        is '状态（0正常 1停用）';
comment on column sys_config.create_dept   is '创建部门';
comment on column sys_config.create_by     is '创建者';
comment on column sys_config.create_time   is '创建时间';
comment on column sys_config.update_by     is '更新者';
comment on column sys_config.update_time   is '更新时间';
comment on column sys_config.remark        is '备注';

--rollback DROP TABLE sys_config;


-- ----------------------------
-- 16、系统访问记录
-- ----------------------------
--changeset tixwork:sys_login_record
drop table if exists sys_login_record;
create table if not exists sys_login_record (
    id             bigserial    constraint pk_sys_login_record primary key,
    tenant_id      varchar(20)  default '100000'::varchar,
    user_name      varchar(50)  default ''::varchar,
    ipaddr         varchar(128) default ''::varchar,
    login_location varchar(255) default ''::varchar,
    browser        varchar(50)  default ''::varchar,
    os             varchar(50)  default ''::varchar,
    status         char         default '0'::bpchar,
    msg            varchar(255) default ''::varchar,
    login_time     timestamp,
    create_dept    int8,
    create_by      int8,
    create_time    timestamp,
    update_by      int8,
    update_time    timestamp
);

create index idx_sys_login_record_status ON sys_login_record (status);
create index idx_sys_login_record_login_time ON sys_login_record (login_time);

comment on table sys_login_record                 is '系统访问记录';
comment on column sys_login_record.id             is '访问ID';
comment on column sys_login_record.tenant_id      is '租户编号';
comment on column sys_login_record.user_name      is '用户账号';
comment on column sys_login_record.ipaddr         is '登录IP地址';
comment on column sys_login_record.login_location is '登录地点';
comment on column sys_login_record.browser        is '浏览器类型';
comment on column sys_login_record.os             is '操作系统';
comment on column sys_login_record.status         is '登录状态（0成功 1失败）';
comment on column sys_login_record.msg            is '提示消息';
comment on column sys_login_record.login_time     is '访问时间';
comment on column sys_login_record.create_by      is '创建者';
comment on column sys_login_record.create_time    is '创建时间';
comment on column sys_login_record.update_by      is '更新者';
comment on column sys_login_record.update_time    is '更新时间';

--rollback DROP TABLE sys_login_record;


-- ----------------------------
-- 17、通知公告表
-- ----------------------------
--changeset tixwork:sys_notice
drop table if exists sys_notice;
create table if not exists sys_notice (
    id             bigserial constraint pk_sys_notice_id primary key,
    tenant_id      varchar(20)  default '100000'::varchar,
    notice_title   varchar(50)  not null,
    notice_type    varchar(20)  not null,
    notice_content text,
    status         char         default '0'::bpchar,
    create_dept    int8,
    create_by      int8,
    create_time    timestamp,
    update_by      int8,
    update_time    timestamp,
    remark         varchar(255) default null::varchar
);

comment on table sys_notice                 is '通知公告表';
comment on column sys_notice.id             is '公告ID';
comment on column sys_notice.tenant_id      is '租户编号';
comment on column sys_notice.notice_title   is '公告标题';
comment on column sys_notice.notice_type    is '公告类型（NOTIFICATION 通知, ANNOUNCEMENT公告）';
comment on column sys_notice.notice_content is '公告内容';
comment on column sys_notice.status         is '公告状态（0正常 1关闭）';
comment on column sys_notice.create_dept    is '创建部门';
comment on column sys_notice.create_by      is '创建者';
comment on column sys_notice.create_time    is '创建时间';
comment on column sys_notice.update_by      is '更新者';
comment on column sys_notice.update_time    is '更新时间';
comment on column sys_notice.remark         is '备注';

--rollback DROP TABLE sys_notice;


-- ----------------------------
-- 18、OSS对象存储表
-- ----------------------------
--changeset tixwork:sys_oss_object
drop table if exists sys_oss_object;
create table if not exists sys_oss_object (
    id            bigserial constraint pk_oss_object_id primary key,
    tenant_id     varchar(20)  default '100000'::varchar,
    file_name      varchar(255) default ''::varchar not null,
    original_name varchar(255) default ''::varchar not null,
    file_suffix     varchar(10)  default ''::varchar not null,
    url           varchar(500) default ''::varchar not null,
    user_id       bigserial,
    create_dept   int8,
    create_by     int8,
    create_time   timestamp,
    update_by     int8,
    update_time   timestamp,
    service       varchar(20)  default 'minio'::varchar
);

comment on table sys_oss_object                    is 'OSS对象存储表';
comment on column sys_oss_object.id                is '对象存储主键';
comment on column sys_oss_object.tenant_id         is '租户编码';
comment on column sys_oss_object.file_name          is '文件名';
comment on column sys_oss_object.original_name     is '原名';
comment on column sys_oss_object.file_suffix         is '文件后缀名';
comment on column sys_oss_object.url               is 'URL地址';
comment on column sys_oss_object.user_id           is '上传用户ID';
comment on column sys_oss_object.create_dept       is '创建部门';
comment on column sys_oss_object.create_by         is '上传人';
comment on column sys_oss_object.create_time       is '创建时间';
comment on column sys_oss_object.update_by         is '更新者';
comment on column sys_oss_object.update_time       is '更新时间';
comment on column sys_oss_object.service           is '服务商';

CREATE INDEX idx_sys_oss_object_create_by ON sys_oss_object (create_by);

--rollback DROP TABLE sys_oss_object;


-- ----------------------------
-- 19、OSS对象存储动态配置表
-- ----------------------------
--changeset tixwork:sys_oss_config
drop table if exists sys_oss_config;
create table if not exists sys_oss_config (
    id            bigserial constraint pk_oss_config_id primary key,
    tenant_id     varchar(20)  default '100000'::varchar,
    config_key     varchar(20)  default ''::varchar not null,
    access_key    varchar(255) default ''::varchar,
    secret_key    varchar(255) default ''::varchar,
    bucket_name   varchar(255) default ''::varchar,
    prefix         varchar(255) default ''::varchar,
    endpoint      varchar(255) default ''::varchar,
    domain        varchar(255) default ''::varchar,
    is_https      char         default 'N'::bpchar,
    region        varchar(255) default ''::varchar,
    access_policy char(1)      default '1'::bpchar not null,
    status        char         default '1'::bpchar,
    ext1          varchar(255) default ''::varchar,
    create_dept   int8,
    create_by     int8,
    create_time   timestamp,
    update_by     int8,
    update_time   timestamp,
    remark        varchar(500) default ''::varchar
);

comment on table sys_oss_config                 is '对象存储配置表';
comment on column sys_oss_config.id             is '主建';
comment on column sys_oss_config.tenant_id      is '租户编码';
comment on column sys_oss_config.config_key      is '配置key';
comment on column sys_oss_config.access_key     is 'accessKey';
comment on column sys_oss_config.secret_key     is '秘钥';
comment on column sys_oss_config.bucket_name    is '桶名称';
comment on column sys_oss_config.prefix          is '前缀';
comment on column sys_oss_config.endpoint       is '访问站点';
comment on column sys_oss_config.domain         is '自定义域名';
comment on column sys_oss_config.is_https       is '是否https（Y=是,N=否）';
comment on column sys_oss_config.region         is '域';
comment on column sys_oss_config.access_policy  is '桶权限类型(0=private 1=public 2=custom)';
comment on column sys_oss_config.status         is '是否默认（0=是,1=否）';
comment on column sys_oss_config.ext1           is '扩展字段';
comment on column sys_oss_config.create_dept    is '创建部门';
comment on column sys_oss_config.create_by      is '创建者';
comment on column sys_oss_config.create_time    is '创建时间';
comment on column sys_oss_config.update_by      is '更新者';
comment on column sys_oss_config.update_time    is '更新时间';
comment on column sys_oss_config.remark         is '备注';

--rollback DROP TABLE sys_oss_config;


-- ----------------------------
-- 20、导入导出文件记录 的详细信息
-- ----------------------------
--changeset tixwork:sys_import_export_record
drop table if exists sys_import_export_record;
create table sys_import_export_record (
    id                  bigserial constraint pk_sys_import_export_record_id primary key,
    tenant_id           varchar(20)  default '100000'::varchar,
    type                varchar(50)       not null,
    file_name            varchar(100)      not null,
    file_md5             varchar(100)      ,
    operation_user      varchar(100)      not null,
    operation_user_id   bigserial         not null,
    result              varchar(4000)     null,
    create_dept         int8,
    create_by           int8,
    create_time         timestamp,
    update_by           int8,
    update_time         timestamp
);


comment on table  sys_import_export_record is '对象存储配置表';
comment on column sys_import_export_record.tenant_id is '租户编码';
comment on column sys_import_export_record.file_name is '文件名称';
comment on column sys_import_export_record.file_md5 is 'md5';
comment on column sys_import_export_record.operation_user is '操作者';
comment on column sys_import_export_record.operation_user_id is '操作者ID';
comment on column sys_import_export_record.result is '操作者';
comment on column sys_import_export_record.create_dept    is '创建部门';
comment on column sys_import_export_record.create_time is '创建时间';
comment on column sys_import_export_record.create_by is '创建者';
comment on column sys_import_export_record.update_time is '更新时间';
comment on column sys_import_export_record.update_by is '更新着';

CREATE INDEX idx_sys_ie_record_md5_type ON sys_import_export_record (file_md5,type);
CREATE INDEX idx_sys_ie_record_user_id ON sys_import_export_record (operation_user_id);

--rollback DROP TABLE sys_import_export_record;


-- ----------------------------
-- 21 系统授权表
-- ----------------------------
--changeset tixwork:sys_client
create table sys_client (
    id                  bigserial constraint pk_sys_client_id primary key,
    client_id           varchar(64)   default ''::varchar,
    client_key          varchar(32)   default ''::varchar,
    client_secret       varchar(255)  default ''::varchar,
    grant_type          varchar(255)  default ''::varchar,
    device_type         varchar(32)   default ''::varchar,
    active_timeout      int4          default 1800,
    timeout             int4          default 604800,
    status              char(1)       default '0'::bpchar,
    del_flag             char(1)       default '0'::bpchar,
    create_dept         int8,
    create_by           int8,
    create_time         timestamp,
    update_by           int8,
    update_time         timestamp
);

comment on table sys_client                         is '系统授权表';
comment on column sys_client.id                     is '主建';
comment on column sys_client.client_id              is '客户端id';
comment on column sys_client.client_key             is '客户端key';
comment on column sys_client.client_secret          is '客户端秘钥';
comment on column sys_client.grant_type             is '授权类型';
comment on column sys_client.device_type            is '设备类型';
comment on column sys_client.active_timeout         is 'token活跃超时时间';
comment on column sys_client.timeout                is 'token固定超时';
comment on column sys_client.status                 is '状态（0正常 1停用）';
comment on column sys_client.del_flag               is '删除标志（0代表存在 2代表删除）';
comment on column sys_client.create_dept            is '创建部门';
comment on column sys_client.create_by              is '创建者';
comment on column sys_client.create_time            is '创建时间';
comment on column sys_client.update_by              is '更新者';
comment on column sys_client.update_time            is '更新时间';

CREATE INDEX idx_sys_client_client_id ON sys_client (client_id);

--rollback DROP TABLE sys_client;
