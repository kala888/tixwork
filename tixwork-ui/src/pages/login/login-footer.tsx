import BizSchema from '@/biz-model/biz-schema';
import { DefaultFooter } from '@ant-design/pro-components';

export default function LoginFooter() {
  const currentYear = new Date().getFullYear();
  const owner = BizSchema.Root?.owner || '钛安科技';
  const copyright = `${currentYear} ${owner}`;
  const links = [
    {
      key: 'beian',
      title: '粤ICP备2022135551号',
      href: 'https://beian.miit.gov.cn/',
      blankTarget: true,
    },
  ];
  return <DefaultFooter copyright={copyright} links={links} />;
}
