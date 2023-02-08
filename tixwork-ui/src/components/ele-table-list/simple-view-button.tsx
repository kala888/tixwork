import { Button } from 'antd';

export default function SimpleViewButton(props) {
  const { title, ...rest } = props;

  return (
    <Button {...rest} type="dashed">
      {title}
    </Button>
  );
}
