import React from 'react';
import { Timeline, Icon, InputNumber, DatePicker } from 'antd';

export default props => <div>
	<Timeline>
		<Timeline.Item>创建服务现场 2015-09-01</Timeline.Item>
		<Timeline.Item>初步排除网络异常 2015-09-01</Timeline.Item>
		<Timeline.Item
			dot={<Icon type='clock-circle-o' />}
			className='danger' color='0'>
			<span>技术测试异常 2015-09-01</span>
		</Timeline.Item>
		<Timeline.Item>网络异常正在修复 2015-09-01</Timeline.Item>
	</Timeline>
	<DatePicker.RangePicker showTime format='yyyy-MM-dd HH:mm:ss' />
	<br />
	<DatePicker.RangePicker />
	<br />
	<DatePicker />
	<br />
	<InputNumber />
</div>