create table if not exists tixwork_db_changelog
(
    id           bigserial constraint tixwork_db_changelog_id primary key,
    name         varchar(255),
    author       varchar(255),
    file_name    varchar(255),
    md5          varchar(100),
    create_time  timestamp,
    execute_type char(1),
    brief        text
);

comment on table tixwork_db_changelog is 'tixwork数据库变更记录表';

comment on column tixwork_db_changelog.id is 'changeset的流水id';
comment on column tixwork_db_changelog.name is 'changeset的标示';
comment on column tixwork_db_changelog.file_name is 'changeset所在文件';
comment on column tixwork_db_changelog.md5 is 'changeset md5';
comment on column tixwork_db_changelog.create_time is 'changeset 执行时间';
comment on column tixwork_db_changelog.execute_type is 'changeset 执行类型，1代表首次执行，2代表patch';
comment on column tixwork_db_changelog.brief is 'changeset的内容摘要';


create table tixwork_db_changelog_lock
(
    id bigserial,
    locked boolean,
    lock_time timestamp,
    locked_by varchar(255)
);
