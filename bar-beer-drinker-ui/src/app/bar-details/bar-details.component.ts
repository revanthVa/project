import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarsService, Bar, topSpenderGraph, topBeers } from '../bars.service';
import { HttpResponse } from '@angular/common/http';
import { SelectItem } from 'primeng/components/common/selectitem';
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
  filterOptions: SelectItem[];
  day : string;
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
    this.filterOptions = [
      {
        'label': 'Monday',
        'value': 'Monday'
      },
      {
        'label' : 'Tuesday',
        'value' : 'Tuesday'
      },
      {
        'label': 'Wednesday',
        'value': 'Wednesday'
      },
      {
        'label' : 'Thursday',
        'value' : 'Thursday'
      },
      {
        'label' : 'Friday',
        'value' : 'Friday'
      },
      {
        'label': 'Saturday',
        'value': 'Saturday'
      },
      {
        'label' : 'Sunday',
        'value' : 'Sunday'
      }
    ];   
    this.barService.getTopBeers(this.barName, "Monday").subscribe(
      data => {
        console.log(data);
        const beername = [];
        const Quantity = [];
  
        data.forEach(topBeers => {
          beername.push(topBeers.beername);
          Quantity.push(topBeers.Quantity);
        });
        this.renderChart2(beername, Quantity);
      }
      );
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
  
  sortBy(selectedOption: string) {
    if (selectedOption === selectedOption){
      this.barService.getTopBeers(this.barName, selectedOption).subscribe(
        data => {
          console.log(data);
          const beername = [];
          const Quantity = [];
    
          data.forEach(topBeers => {
            beername.push(topBeers.beername);
            Quantity.push(topBeers.Quantity);
          });
          this.renderChart2(beername, Quantity);
        }
        );

    }
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
  renderChart2(beername: string[], Quantity: number[]){
    Highcharts.chart('bargraph2', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Most Popular Beers'
      },
      xAxis: {
        categories: beername,
        title: {
          text: 'Beer Name'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Amount Sold'
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
        data: Quantity
      }]
    });
  }
}
