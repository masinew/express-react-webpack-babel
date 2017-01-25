import React, { Component } from 'react';
import { polyfill } from 'es6-promise'; polyfill();
import 'isomorphic-fetch';
import Content from './Content';

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.getChartData = this.getChartData.bind(this);
    this.updateChart = this.updateChart.bind(this);
    this.getChartData(this.updateChart)
  }

  getChartData(cb) {
    fetch('http://localhost:3000/testChart').then((response) => {
      response.json().then((json) => {
        cb(json)
      })
    })
  }

  updateChart(json) {
    this.myChart1.data.datasets[0].data[0] = json.a1;
    this.myChart1.data.datasets[0].data[1] = json.a2;
    this.myChart1.data.datasets[0].data[2] = json.a3;
    this.myChart1.update();
  }

  componentDidMount() {
    setInterval(() => {
      this.getChartData(this.updateChart)
    }, 3000);
    var ctx1 = document.getElementById("myChart");
    this.myChart1 = new Chart(ctx1, {
        type: 'doughnut',
        data: {
            labels: ["Quota remaining", "Walk-in", "Online booking"],
            datasets: [{
                data: [0, 0, 0],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
      options: {
        tooltips: {
          enabled: true,
          mode: 'dataset',
          intersect: false
        },
        hover: {
          mode: 'dataset',
          intersect: false
        },
        title: {
          display: true,
          text: 'Daily Summary Rounds',
          fontSize: 20
        },
        legend: {
          position: 'bottom'
        }
      }
    });

  }

  render() {
    const userProfileForm = [
      <div className="container" key='1'>
        <form>
          <div className="row">
          <div className="col-md-3" style={{marginTop: 80}}>
            <canvas id="myChart" width="500" height="380"></canvas>
          </div>
          </div>
        </form>
      </div>
    ]
    return (
      <Content rootName="Home" rootPath="/" info={userProfileForm} />
    );
  }
}
