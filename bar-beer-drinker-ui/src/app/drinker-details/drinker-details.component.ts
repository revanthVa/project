import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DrinkersService, Beer, Drinker, top10Bars, top10Drinkers } from '../drinkers.service';

declare const Highcharts: any;

@Component({
  selector: 'app-drinker-details',
  templateUrl: './drinker-details.component.html',
  styleUrls: ['./drinker-details.component.css']
})
export class DrinkerDetailsComponent implements OnInit {

  drinkerName: string;
  drinkerDetails: Drinker;
  topBars: top10Bars[];
  topDrinkers: top10Drinkers[];

  constructor(
    private drinkerService: DrinkersService,
    private route: ActivatedRoute
  ) {
    route.paramMap.subscribe((paramMap) => {
      this.drinkerName = paramMap.get('drinker');

      drinkerService.getDrinker(this.drinkerName).subscribe(
        data => {
          console.log(data);
          this.drinkerDetails = data;
          //this.drinkerDetails.phone = data.phone;
          console.log(this.drinkerDetails);
          console.log(this.drinkerDetails.phone);
        },
        (error: HttpResponse<any>) => {
          if (error.status === 404) {
            alert('Drinker not found')
          } else {
            console.error(error.status + ' - ' + error.body);
            alert('An error occured on the server. Please check the browser console.');
          }
        }
      );
      this.drinkerName = paramMap.get('drinker');
      drinkerService.getTop10Bars(this.drinkerName).subscribe(
        data => {
          this.topBars = data;
        },
      )
    });
    
    this.drinkerService.getTop10Bars(this.drinkerName).subscribe(
    data => {
      console.log(data);
      const Barsname = [];
      const BeersSold = [];
  
      data.forEach(beer => {
        Barsname.push(beer.Barsname);
        BeersSold.push(beer.BeersSold);
      });
      this.renderChart(Barsname, BeersSold);
    }
    );

    this.drinkerService.getTop10Drinkers(this.drinkerName).subscribe(
      data => {
        console.log(data);
        const DrinkersName = [];
        const amountBought = [];
    
        data.forEach(beer => {
          DrinkersName.push(beer.Drinkersname);
          amountBought.push(beer.amountBought);
        });
        this.renderChart2(DrinkersName, amountBought);
      }
      );
  }

  

  ngOnInit() {
  }

  renderChart(Barsname: string[], BeersSold: number[]) {
    Highcharts.chart('bargraph', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Top Selling Bars'
      },
      xAxis: {
        categories: Barsname,
        title: {
          text: 'Bar Name'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Beers Sold'
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
        data: BeersSold
      }]
    });
  }
  renderChart2(DrinkersName: string[], amountBought: number[]) {
    Highcharts.chart('bargraph2', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Top Buying Drinkers'
      },
      xAxis: {
        categories: DrinkersName,
        title: {
          text: 'Drinker Name'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Amount Bought'
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
        data: amountBought
      }]
    });
  }
}