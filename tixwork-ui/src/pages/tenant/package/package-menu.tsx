import ProTree from '@/components/pro-tree';
import ApiConfig from '@/http/api-config';
import type { API } from '@/http/api-types';
import Q from '@/http/http-request/q';
import { useLoading } from '@/services/use-service';
import { ProCard } from '@ant-design/pro-components';
import { useAsyncEffect } from 'ahooks';
import { App, Button } from 'antd';
import _ from 'lodash';
import React, { useState } from 'react';

type RootMenuType = {
  id: React.Key;
  menu: API.Menu;
  checkedList: React.Key[];
};

const getCheckedList = (menu: API.Menu, checkedList: React.Key[]) => {
  const list: any[] = [];
  if (checkedList.includes(menu.id)) {
    list.push(menu.id);
  }
  if (menu.children) {
    menu.children.forEach((it) => {
      list.push(...getCheckedList(it, checkedList));
    });
  }
  return list;
};

export default (props: API.TenantPackage) => {
  const { message } = App.useApp();
  const { hideLoading, showLoading, loading } = useLoading();
  const [menuState, setMenuState] = useState<Record<React.Key, RootMenuType>>({});

  const { id, menuIds } = props;

  useAsyncEffect(
    async function* () {
      if (!id) {
        return;
      }

      const resp = await Q.get(ApiConfig.getMenuTree);
      yield;
      const menus = resp.data;
      const checkedList = menuIds || [];
      const state = {};
      menus.forEach((it) => {
        state[it.id] = {
          id: it.id,
          menu: it,
          checkedList: getCheckedList(it, checkedList),
        };
      });
      setMenuState(state);
    },
    [id],
  );

  const handleSubmit = async () => {
    const menuIds = _.uniq(_.flatten(_.values(menuState).map((it) => it.checkedList)));
    showLoading();
    try {
      await Q.put(ApiConfig.updatePackageMenus, { id, menuIds });
      message.success('保存成功');
    } catch (e) {
      message.error('更新失败');
    }
    hideLoading();
  };

  const extra = (
    <Button type="primary" onClick={handleSubmit} loading={loading}>
      更新
    </Button>
  );

  const handleChange = (menuId, checkedKeys) => {
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
    <ProCard title="套餐-菜单权限" extra={extra}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: '100%',
          minHeight: 100,
        }}
      >
        {list.map((it) => {
          const { checkedList, menu } = it;
          const key = id + '_' + it.id;
          return (
            <ProCard key={key} bordered title={menu.title} style={menuCardStyle}>
              <ProTree root={menu} checkedList={checkedList} onChange={handleChange} />
            </ProCard>
          );
        })}
      </div>
    </ProCard>
  );
};
