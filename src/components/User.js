import React from 'react';
import { Input, InputNumber, Select } from 'antd';
import signature from './img/signature.png';

const User = props => <div>
	<img src={signature} alt='signature' />
	<Input />
	<Select />
	<InputNumber />
</div>;
export default User;