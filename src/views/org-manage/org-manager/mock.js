/**
 * mock.js 提供应用截获ajax请求，为脱离后台测试使用
 * 模拟查询更改内存中mockData,并返回数据
 */

import Mock from 'mockjs'
const Random = Mock.Random
// Random.cname()

Mock.mock(
    '/gateway/org/back/institutionService/query', 
    'post',
    (options2) =>{
        
        let ret = Mock.mock({
            "array|1-20": [
                {
                    'id': '@id()',
                    'organizationCode': '@integer(10000)',   
                    'insName': '@cname()',
                    'typeId': '@string(5)',
                    'contact': '@name()',
                    'phone': '@email()',
                    'insManager': '@clast()',
                    'insManagerPhone': '@cword("1234567890", 11, 11)',
                    'isValid|1-2': true,
                }
            ]
        })
        console.log(options2.body,ret)
        return ret
    }
 );
