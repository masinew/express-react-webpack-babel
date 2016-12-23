import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.css";

export default class Demo extends Component {
  render() {
    return (
      <div>
        <div className="container" style={{marginTop: 18}}>
          <div className="row">
            <div className="col-sm-8"></div>
            <div className="col-sm-4">
              <div className="form-group row">
                <label className="col-xs-4 col-form-label">ภาษา</label>
                <div className="col-xs-8">
                  <select className="form-control" style={{height: 40}}>
                    <option>ไทย</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container" style={{marginTop: 100}}>
          <div className="row">
            <div className="col-sm-2"></div>
            <div className="col-sm-8">
              <form name="login-form">
                <div className="radio">
                  <label>
                    <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked />
                    { " " }ชำระค่าบริการโดยหักจากบัญชีออมทรัพย์
                  </label>
                </div>
                <div className="radio">
                  <label>
                    <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2" />
                    { " " }ชำระค่าบริการผ่านบัตรเครดิต
                  </label>
                </div>
                <div className="form-group row">
                  <span className="col-xs-3"></span>
                  <div className="col-xs-9">
                  <input type="submit" className="btn btn-primary" style={{float: 'right', marginLeft: 5}} value="ถัดไป" />
                    <input type="submit" className="btn btn-default" style={{float: 'right'}} value="ย้อนกลับ" />
                  </div>
                </div>
              </form>
            </div>
            <div className="col-sm-2"></div>
          </div>
        </div>

        <p>&nbsp;&nbsp;&nbsp;Email: sample@gmail.com</p><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" className="btn btn-primary">พิมพ์ E-Ticket</button>

        <br/><br/><br/><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" className="btn btn-default">เสร็จสิ้น</button>

        <br/><br/><br/><br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" className="btn btn-info">เสร็จสิ้น</button>

        <br/><br/><br/><br/>
        <ol className="breadcrumb">
          <li><a href="#">อนุรักษ์ พิเศษชูสิน</a></li>
          <li className="active"><a href="#">คนที่ 2</a></li>
          <li>คนที่ 3</li>
        </ol>
      </div>
    );
  }
}
