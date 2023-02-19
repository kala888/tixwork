import { DefaultFooter } from '@ant-design/pro-components';

export default function LoginFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} 四川省成都市人民政府驻深圳办事处`}
      links={[
        {
          key: 'beian',
          title: '粤ICP备2022135551号',
          href: 'https://beian.miit.gov.cn/',
          blankTarget: true,
        },
      ]}
    />
  );
}
