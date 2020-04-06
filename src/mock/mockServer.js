/*
使用mockjs提供mock数据接口
 */
import Mock from 'mockjs'
// 返回goods的接口
Mock.mock('http://localhost:8080/mock', {code: 200, data: {username:'mockname',userid:'mockid'}})