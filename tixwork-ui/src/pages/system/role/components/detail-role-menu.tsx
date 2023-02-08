import ProTree from '@/components/pro-tree';
import ApiConfig from '@/http/api-config';
import Q from '@/http/http-request/q';
import { useLoading } from '@/services/use-service';
import { ProCard } from '@ant-design/pro-components';
import { useAsyncEffect } from 'ahooks';
import { Button, message } from 'antd';
import _ from 'lodash';
import React, { useState } from 'react';
import styles from './styles.less';

type RootMenuType = {
  id: React.Key;
  menu: API.Menu;
  checkedList: React.Key[];
};

export default function DetailRoleMenu(props) {
  const { hideLoading, showLoading, loading } = useLoading();
  const [menuState, setMenuState] = useState<Record<React.Key, RootMenuType>>({});

  const { role } = props;

  useAsyncEffect(
    async function* () {
      if (!role.roleId) {
        return;
      }

      const resp = await Q.get(ApiConfig.getMenuByRoleId, { roleId: role.roleId });
      yield;
      const menus = _.get(resp, 'data.menus', []);
      const checkedList = _.get(resp, 'data.checkedKeys', []);
      const state = {};
      menus.forEach((it) => {
        state[it.id] = {
          id: it.id,
          menu: it,
          checkedList,
        };
      });
      setMenuState(state);
    },
    [role],
  );

  const handleSubmit = async () => {
    const menuIds = _.uniq(_.flatten(_.values(menuState).map((it) => it.checkedList)));
    console.log('update role-menu', role, menuIds);
    showLoading();
    try {
      await Q.put(ApiConfig.changeRoleMenu, { roleId: role.roleId, menuIds });
      message.success('更新成功');
    } catch (e) {
      message.success('更新失败');
    }
    hideLoading();
  };

  const extra = (
    <Button type="primary" onClick={handleSubmit} loading={loading}>
      保存
    </Button>
  );

  const handleChange = (menuId, checkedKeys) => {
    console.log('menuId,ch', menuId, checkedKeys);
    setMenuState((pre) => ({
      ...pre,
      [menuId]: {
        ...pre[menuId],
        checkedList: checkedKeys,
      },
    }));
  };

  const menuCardStyle = {
    width: 230,
    height: 400,
    overflow: 'scroll',
    marginRight: 5,
    marginBottom: 5,
  };
  const list = _.values(menuState) || [];
  return (
    <ProCard title="角色-菜单权限" extra={role.roleId && extra} ghost>
      <div className={styles.detailRoleMenuTree}>
        {list.map((it) => {
          const { checkedList, menu } = it;
          const key = role.roleId + '_' + it.id;
          return (
            <ProCard key={key} bordered title={menu.title} style={menuCardStyle}>
              <ProTree root={menu} checkedList={checkedList} onChange={handleChange} />
            </ProCard>
          );
        })}
      </div>
    </ProCard>
  );
}
