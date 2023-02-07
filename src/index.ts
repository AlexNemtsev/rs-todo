import i18next from 'i18next';
import App from './components/app/app';
import './global.scss';

App.start().catch((err) => console.log(err));

console.log(i18next.t('key'));
