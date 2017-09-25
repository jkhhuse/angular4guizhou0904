// import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Services} from '../shared/services.service';

export class InMemoryDataService {
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
            {
                'id': 'ace4cf29-f588-49a6-9957-4bfd2b20f31a',
                'createTime': '2017-09-14 11:21:25.0',
                'createUserId': 1,
                'groupId': 1,
                'repositoryName': 'justtest',
                'version': '1',
                'repositorySrvId': 1,
                'registryId': 'a54da5dc-8124-4bd7-832c-d9245548aea0',
                'updateTime': '2017-09-14 11:21:51.0',
                'updateUserId': 1,
                'isEnable': true,
                'deleted': false
            },
            {
                'id': 'ace4cf29-f588-49a6-9957-4bfd2b20f31a',
                'createTime': '2017-09-14 11:21:25.0',
                'createUserId': 1,
                'groupId': 1,
                'repositoryName': 'justtest',
                'version': '1',
                'repositorySrvId': 1,
                'registryId': 'a54da5dc-8124-4bd7-832c-d9245548aea0',
                'updateTime': '2017-09-14 11:21:51.0',
                'updateUserId': 1,
                'isEnable': false,
                'deleted': false
            }
        ];
        const servicesDetail = [{
            'images': {
                'name': 'justtest',
                'createTime': '2017-09-14 11:21:25.0',
                'updateTime': '2017-09-14 12:56:56.0',
                'status': true,
                'id': null,
                'description': null,
                'opRepository': [
                    {
                        'id': '6ab3a908-fe51-44b4-b11c-da07080a8892',
                        'createTime': '2017-09-14 12:56:14.0',
                        'createUserId': 1,
                        'groupId': 1,
                        'repositoryName': 'justtest',
                        'version': '2',
                        'repositorySrvId': 1,
                        'registryId': 'a54da5dc-8124-4bd7-832c-d9245548aea0',
                        'updateTime': '2017-09-14 12:56:56.0',
                        'updateUserId': 1,
                        'isEnable': true,
                        'deleted': false
                    },
                    {
                        'id': 'ace4cf29-f588-49a6-9957-4bfd2b20f31a',
                        'createTime': '2017-09-14 11:21:25.0',
                        'createUserId': 1,
                        'groupId': 1,
                        'repositoryName': 'justtest',
                        'version': '1',
                        'repositorySrvId': 1,
                        'registryId': 'a54da5dc-8124-4bd7-832c-d9245548aea0',
                        'updateTime': '2017-09-14 11:21:51.0',
                        'updateUserId': 1,
                        'isEnable': true,
                        'deleted': false
                    }
                ]
            },
            'repositoryName': 'justtest',
            'groupId': 1
        }];
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
