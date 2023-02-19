import { Button } from 'antd';

export default function ViewButton(props) {
  const { title, ...rest } = props;

  return (
    <Button {...rest} type="dashed">
      {title}
    </Button>
  );
}
