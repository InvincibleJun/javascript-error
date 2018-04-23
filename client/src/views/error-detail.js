import React, { Component } from 'react';

export default class ErrorDetail extends Component {
    state = {}
    render(){
        const { data } = this.props;
        return (
            <div>
                <div>
                    <h4>源文件</h4>
                    <div style={{ color: 'red'}}>{data.origin}</div>
                </div>
                <div>
                    <h4>错误堆栈</h4>
                    <div style={{ color: 'red'}}>{data.stack}</div>
                </div>
                <div>
                    <h4>用户代理</h4>
                    <div>{data.userAgent}</div>
                </div>
            </div>
        )
    }
}