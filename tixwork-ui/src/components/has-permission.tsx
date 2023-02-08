import { isNotEmpty } from '@/utils/object-utils';
import { useModel } from '@umijs/max';
import type React from 'react';

export type HasPermissionProps = {
  permissions: string[];
  children: React.ReactNode | (() => React.ReactNode) | any;
};

const HasPermission: React.FC<HasPermissionProps> = (props) => {
  const { permissions, children } = props;
  const { initialState } = useModel('@@initialState') as any;

  const allPermission = '*:*:*';
  const userPermissions = initialState?.profile?.permissions; //TODO 没测试

  if (isNotEmpty(permissions)) {
    const hasPermissions = userPermissions.some((p) => {
      return allPermission === p || permissions?.includes(p);
    });

    if (!hasPermissions) {
      return null;
    } else {
      return children;
    }
  }
};

export default HasPermission;
