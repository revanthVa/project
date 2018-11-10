import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarsService, Bar, topSpenderGraph } from '../bars.service';
import { HttpResponse } from '@angular/common/http';

declare const Highcharts: any;

@Component({
  selector: 'app-bar-details',
  templateUrl: './bar-details.component.html',
  styleUrls: ['./bar-details.component.css']
})
export class BarDetailsComponent implements OnInit {

  barName: string;
  barDetails: Bar;
  topSpenders: topSpenderGraph[];

  constructor(
    private barService: BarsService,
    private route: ActivatedRoute
  ) {
    route.paramMap.subscribe((paramMap) => {
      this.barName = paramMap.get('bar');

      barService.getBar(this.barName).subscribe(
        data => {
          this.barDetails = data;
        },
        (error: HttpResponse<any>) => {
          if (error.status === 404) {
            alert('Bar not found')
          } else {
            console.error(error.status + ' - ' + error.body);
            alert('An error occured on the server. Please check the browser console.');
            }
        }
      );
      this.barName = paramMap.get('bar');
      barService.getTopSpenderGraph(this.barName).subscribe(
        data => {
          this.topSpenders = data;
        },
        (error: HttpResponse<any>) =>{
          if (error.status === 404) {
            alert('Bar not found')
          } else {
            console.error(error.status + ' - ' + error.body);
            alert('An error occured on the server. Please check the browser console.');
          }
        }
      );
    });

    this.barService.getTopSpenderGraph(this.barName).subscribe(
    data => {
      console.log(data);
      const Drinkersname = [];
      const totalprice = [];

      data.forEach(topSpenders => {
        Drinkersname.push(topSpenders.Drinkersname);
        totalprice.push(topSpenders.totalprice);
      });
      this.renderChart(Drinkersname, totalprice);
    }
    );
  }

  ngOnInit() {
  }
  
  renderChart(Drinkersname: string[], totalprice: number[]){
    Highcharts.chart('bargraph', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Top Spenders'
      },
      xAxis: {
        categories: Drinkersname,
        title: {
          text: 'Name'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Money Spent'
        },
        overflow: 'justify'
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      legend: {
        enabled: false
      },
      credits: {
        enabled: false
      },
      series: [{
        data: totalprice
      }]
    });
  }
}
