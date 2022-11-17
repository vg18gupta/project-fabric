import { Button, Menu, Modal, Tooltip } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import i18next from 'i18next';
import React, { Component } from 'react';
import { Flex } from '../flex';
import { ShortcutHelp } from '../help';
import Icon from '../icon/Icon';

interface IProps {
	onChangeEditor: (param: ClickParam) => void;
	currentEditor: string;
}

class Title extends Component<IProps> {
	state = {
		visible: false,
	};

	componentDidMount() {
		if (globalThis) {
			(globalThis.adsbygoogle = globalThis.adsbygoogle || []).push({});
		}
	}

	handlers = {
		goGithub: () => {
			window.open('https://github.com/salgum1114/react-design-editor');
		},
		goDocs: () => {
			window.open('https://salgum1114.github.io/react-design-editor/docs');
		},
		showHelp: () => {
			this.setState({
				visible: true,
			});
		},
	};

	render() {
		const { visible } = this.state;
		return (
			<Flex
				style={{ background: 'linear-gradient(141deg,#23303e,#404040 51%,#23303e 75%)' }}
				flexWrap="wrap"
				flex="1"
				alignItems="center"
			>
				<Flex style={{ marginLeft: 8 }} flex="0 1 auto">
					<span style={{ color: '#fff', fontSize: 24, fontWeight: 500 }}>Project Fabric</span>
				</Flex>
				<Flex style={{ marginLeft: 88 }}>
					<Menu
						mode="horizontal"
						theme="dark"
						style={{ background: 'transparent', fontSize: '16px' }}
						onClick={this.props.onChangeEditor}
						selectedKeys={[this.props.currentEditor]}
					>
					</Menu>
				</Flex>
				<Flex flex="1" justifyContent="flex-end">
					<ins
						className="adsbygoogle"
						style={{ display: 'inline-block', width: 600, height: 60 }}
						data-ad-client="ca-pub-8569372752842198"
						data-ad-slot="5790685139"
					/>
				</Flex>
				<Modal
					visible={visible}
					onCancel={() => this.setState({ visible: false })}
					closable={true}
					footer={null}
					width="50%"
				>
					<ShortcutHelp />
				</Modal>
			</Flex>
		);
	}
}

export default Title;
