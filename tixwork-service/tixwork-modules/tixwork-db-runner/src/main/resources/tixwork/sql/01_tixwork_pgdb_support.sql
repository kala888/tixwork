--tixwork formatted sql

-- ----------------------------
-- 初始化-字符串自动转时间 避免框架时间查询报错问题
-- ----------------------------
--changeset tixwork:db-support-cast
create or replace function cast_varchar_to_timestamp(varchar) returns timestamptz as '
select to_timestamp($1, ''yyyy-mm-dd hh24:mi:ss'');
' language sql strict ;

--changeset tixwork:db-support-timestamptz-drop
drop cast if exists (varchar as timestamptz);

--changeset tixwork:db-support-timestamptz
create cast (varchar as timestamptz) with function cast_varchar_to_timestamp as IMPLICIT;
