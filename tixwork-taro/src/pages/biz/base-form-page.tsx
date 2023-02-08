import React from 'react';
import FormItem from '@/components/form/form-item';
import FormUtil from '@/components/form/form-util';
import { View } from '@tarojs/components';
import EleButton from '@/components/elements/ele-button';
import EleInput from '@/components/form/field/ele-input';

export default class BaseFormPage extends React.PureComponent {
  //以name为key
  state = {
    fieldValues: {},
  };

  handleChange = (name, value, event) => {
    console.log('item event maybe you needed', event);
    const fieldValue = FormUtil.getValue(value);
    this.setState((preState) => ({
      fieldValues: {
        // @ts-ignore
        ...preState.fieldValues,
        [name]: fieldValue,
      },
    }));
  };
  handleSubmit = () => {
    console.log('submit to remote', this.state.fieldValues);
  };

  render() {
    return (
      <View style='padding:20px'>
        <FormItem label='姓名' rules={[{ required: true }]}>
          <EleInput
            name='name'
            placeholder='大名。。。。'
            bordered={false}
            onChange={this.handleChange.bind(this, 'name')}
          />
        </FormItem>

        <FormItem label='小名'>
          <EleInput
            name='nickname'
            placeholder='你的小名是啥'
            bordered={false}
            onChange={this.handleChange.bind(this, 'nickname')}
          />
        </FormItem>

        <EleButton onClick={this.handleSubmit}>提交</EleButton>
      </View>
    );
  }
}
