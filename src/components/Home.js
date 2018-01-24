import React from "react";
import { Timeline, Icon, InputNumber, DatePicker } from "antd";

const Home = props => <div>
	<Timeline>
		<Timeline.Item>创建服务现场 2015-09-01</Timeline.Item>
		<Timeline.Item>初步排除网络异常 2015-09-01</Timeline.Item>
		<Timeline.Item
			className="danger"
			dot={<Icon type="clock-circle-o" />}
		>技术测试异常 2015-09-01</Timeline.Item>
		<Timeline.Item>网络异常正在修复 2015-09-01</Timeline.Item>
	</Timeline>
	<DatePicker.RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
	<br />
	<DatePicker.RangePicker />
	<br />
	<DatePicker />
	<br />
	<InputNumber />
</div>;
export default Home;