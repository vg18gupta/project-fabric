import React from 'react';
import ReactDom from 'react-dom';
import i18next from 'i18next';
import { AppContainer } from 'react-hot-loader';
import { LocaleProvider } from 'antd';
import koKR from 'antd/lib/locale-provider/ko_KR';
import enUS from 'antd/lib/locale-provider/en_US';
import App from './App';
import { register } from './serviceWorker';


const antResources = {
	ko: koKR,
	'ko-KR': koKR,
	en: enUS,
	'en-US': enUS,
};

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

const render = Component => {
	const rootElement = document.getElementById('root');
	ReactDom.render(
		<AppContainer>
			<LocaleProvider locale={antResources[i18next.language]}>
				<Component />
			</LocaleProvider>
		</AppContainer>,
		rootElement,
	);
};


render(App);

register();

if (module.hot) {
	module.hot.accept('./App', () => {
		render(App);
	});
}
