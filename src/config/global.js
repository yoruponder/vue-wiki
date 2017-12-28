import { Api, requestUrl} from './api';
import store from '../store'

global.Api = Api;
global.requestUrl = requestUrl;
global.store = store;
