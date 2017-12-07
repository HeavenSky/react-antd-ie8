import React from 'react';
import { InputNumber } from 'antd';
import test from './img/test.png';

export default props => <div>
	<img src={test} alt='test' />
	<InputNumber />
</div>