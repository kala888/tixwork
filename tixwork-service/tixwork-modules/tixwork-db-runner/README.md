### Liquibase基本规范

###### 1. ChangeSet id使用[任务]-[日期]-[序号]，如 xxx-20230101-001.
###### 2. ChangeSet必须填写author.
###### 3. Liquibase禁止对业务数据进行sql操作.
###### 4. 使用<sql>时，禁止包含schema名称.
###### 5. Liquibase禁止使用存储过程.
###### 6. 所有表，列要加remarks进行注释.
###### 7. 已经执行过的ChangeSet严禁修改。
###### 8. 不要随便升级项目liquibase版本，特别是大版本升级。不同版本ChangeSet MD5SUM的算法不一样。