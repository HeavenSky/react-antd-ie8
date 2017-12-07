import React from 'react';
import { Input, InputNumber, Select } from 'antd';

import test from './img/test.png';

export default props => <div>
	<img src={test} alt='test' />
	<Input />
	<Select />
	<InputNumber />
</div>