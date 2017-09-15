import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Services} from '../shared/services.service';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        const results = [
                {
                    'gender': 'female',
                    'email': 'arlinda.rodrigues@example.com',
                    'dob': '1993-08-16 06:24:50'
                },
                {
                    'gender': 'male',
                    'email': 'bbbbbb.rodrigues@example.com',
                    'dob': '1991-08-16 06:24:50'
                },
                {
                    'gender': 'female',
                    'email': 'vvvcc.rodrigues@example.com',
                    'dob': '1983-08-16 06:24:50'
                },
                {
                    'gender': 'female',
                    'email': 'arlinda.rodrigues@example.com',
                    'dob': '1993-08-16 06:24:50'
                },
                {
                    'gender': 'male',
                    'email': 'bbbbbb.rodrigues@example.com',
                    'dob': '1991-08-16 06:24:50'
                }
            ];
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
        const serviceInstances = [
            {
                'serviceName': 'Mysql001',
                'name': 'Mysql',
                'resouceType': '2C/8G/1TB',
                'createTime': '1999-08-16 06:24:50',
                'updateTime': '1983-08-16 06:24:50',
                'status': true
            },
            {
                'serviceName': 'Mysql002',
                'name': 'Mysql',
                'resouceType': '2C/8G/1TB',
                'createTime': '2199-08-16 06:24:50',
                'updateTime': '1583-08-16 06:24:50',
                'status': false
            },
            {
                'serviceName': 'Tomcat001',
                'name': 'Tomcat',
                'resouceType': '3C/8G/1TB',
                'createTime': '2016-08-16 06:24:50',
                'updateTime': '2017-08-16 06:24:50',
                'status': true
            },
            {
                'serviceName': 'Tomcat002',
                'name': 'Tomcat',
                'resouceType': '6C/8G/1TB',
                'createTime': '2014-08-16 06:24:50',
                'updateTime': '2015-08-16 06:24:50',
                'status': false
            },
            {
                'serviceName': 'Nginx002',
                'name': 'Nginx',
                'resouceType': '1C/8G/1TB',
                'createTime': '2014-07-16 06:24:50',
                'updateTime': '2015-07-16 06:24:50',
                'status': true
            }
        ];
        return {services, results, serviceInstances};
    }
}
