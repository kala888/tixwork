import type { EleTreeNodeType } from '@/components/tree/ele-tree';
import styles from '@/components/tree/styles.less';
import ApiConfig from '@/http/api-config';
import Q from '@/http/http-request/q';
import { CaretDownOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import { useAsyncEffect } from 'ahooks';
import { Button, message, Select, Tree } from 'antd';
import React, { useState } from 'react';

export default function DetailRoleDataScope(props) {
  const [saving, setSaving] = useState(false);
  const [dataSource, setDataSource] = useState<EleTreeNodeType[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const { role = {} } = props;
  const [dataScope, setDataScope] = useState(role.dataScope);

  useAsyncEffect(
    async function* () {
      const resp = await Q.get<API.Dept>(ApiConfig.roleDeptTreeselect, { roleId: role.roleId });
      const { data = {} as any } = resp;
      yield;
      setCheckedKeys(data.checkedKeys);
      setDataSource(data.depts);
      setDataScope(role.dataScope);
    },
    [role.roleId],
  );

  if (dataSource.length === 0) {
    return null;
  }
  const handleSave = async () => {
    setSaving(true);
    try {
      await Q.put(ApiConfig.changeRoleDataScope, {
        roleId: role.roleId,
        deptIds: checkedKeys,
        dataScope,
      });
      message.success('更新成功');
    } catch (e) {
      message.success('更新失败');
    }
    setSaving(false);
  };
  const handleCheck = (checked) => {
    setCheckedKeys(checked);
  };

  const handleSelectChange = (value) => {
    setDataScope(value);
  };

  const extra = (
    <Button type="primary" onClick={handleSave} loading={saving}>
      保存
    </Button>
  );
  return (
    <ProCard title="角色-数据权限" extra={role.roleId && extra} ghost>
      <Select value={dataScope} style={{ width: 250 }} onChange={handleSelectChange}>
        <Select.Option value="1">全部数据权限</Select.Option>
        <Select.Option value="2">自定义数据权限</Select.Option>
        <Select.Option value="3">本部门数据权限</Select.Option>
        <Select.Option value="4">本部门及以下数据权限</Select.Option>
        <Select.Option value="5">仅本人数据权限</Select.Option>
      </Select>
      {dataScope === '2' && (
        <Tree
          checkable
          checkedKeys={checkedKeys}
          switcherIcon={<CaretDownOutlined className={styles.switchIcon} />}
          defaultExpandAll={true}
          fieldNames={{ title: 'title', key: 'id' }}
          className={styles.tree}
          treeData={dataSource as any}
          onCheck={handleCheck}
        />
      )}
    </ProCard>
  );
}
