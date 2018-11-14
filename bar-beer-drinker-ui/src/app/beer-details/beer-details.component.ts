import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { BeersService, Beer, top10Bars, top10Drinkers, timeDistribution } from '../beers.service';

declare const Highcharts: any;

@Component({
  selector: 'app-beer-details',
  templateUrl: './beer-details.component.html',
  styleUrls: ['./beer-details.component.css']
})
export class BeerDetailsComponent implements OnInit {

  beerName: string;
  beerDetails: Beer;
  topBars: top10Bars[];
  topDrinkers: top10Drinkers[];
  timeDist: timeDistribution[];

  constructor(
    private beerService: BeersService,
    private route: ActivatedRoute
  ) {
    route.paramMap.subscribe((paramMap) => {
      this.beerName = paramMap.get('beer');

      beerService.getBeer(this.beerName).subscribe(
        data => {
          this.beerDetails = data;
        },
        (error: HttpResponse<any>) => {
          if (error.status === 404) {
            alert('Beer not found')
          } else {
            console.error(error.status + ' - ' + error.body);
            alert('An error occured on the server. Please check the browser console.');
          }
        }
      );
      this.beerName = paramMap.get('beer');
      beerService.getTop10Bars(this.beerName).subscribe(
        data => {
          this.topBars = data;
        },
      )
    });
    beerService.getTimeDistribution(this.beerName).subscribe(
      data => {
        this.timeDist = data;
      }
    )
    this.beerService.getTop10Bars(this.beerName).subscribe(
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
    this.beerService.getTimeDistribution(this.beerName).subscribe(
      data => {
        console.log(data);
        const Hour = [];
        const Quantity = [];
    
        data.forEach(beer => {
          Hour.push(beer.Hour);
          Quantity.push(beer.Quantity);
        });
        this.renderChart3(Hour, Quantity);
      }
      );
    this.beerService.getTop10Drinkers(this.beerName).subscribe(
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
  renderChart3(Hour: string[], Quantity: number[]) {
    Highcharts.chart('bargraph3', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Time Distribution of Sales'
      },
      xAxis: {
        categories: ['1:00 AM', '2:00 AM', '3:00 AM', '11:00 AM', '12:00 AM', '1:00 PM','2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM', '12:00 PM' ],
        title: {
          text: 'Time'
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
        data: Quantity
      }]
    });
  }

}


