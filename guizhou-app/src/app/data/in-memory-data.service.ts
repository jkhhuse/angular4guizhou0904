import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Services} from '../shared/services.service';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const services = [
            // new Services('1', '2', '3', true, '5'),
            // new Services('1', '2', '3', true, '5')
            {
                name: 'mysql1',
                createTime: '2017-08-23 14:19:09',
                updateTime: '2017-08-23 14:19:09',
                status: true,
                id: '1'
            },
            {
                name: 'mysql2',
                createTime: '2017-08-23 14:19:09',
                updateTime: '2017-08-23 14:19:09',
                status: false,
                id: '2'
            },
            {
                name: 'mysql3',
                createTime: '2017-08-23 14:19:09',
                updateTime: '2017-08-23 14:19:09',
                status: false,
                id: '3'
            },
            {
                name: 'mysql4',
                createTime: '2017-08-23 14:19:09',
                updateTime: '2017-08-23 14:19:09',
                status: true,
                id: '4'
            }
        ];
        return {services};
    }
}
