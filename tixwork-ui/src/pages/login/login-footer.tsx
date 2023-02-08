import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';

export default function LoginFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} 钛安科技`}
      links={[
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/kala888',
          blankTarget: true,
        },
      ]}
    />
  );
}
