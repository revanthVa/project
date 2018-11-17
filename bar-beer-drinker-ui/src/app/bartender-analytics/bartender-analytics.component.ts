import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { SelectItem } from 'primeng/components/common/selectitem';
import { ActivatedRoute } from '@angular/router';
import { BarsService, Bar } from '../bars.service';
import { BartendersService, Bartender, BartendersHours, BartendersAnalytics } from '../bartenders.service';

declare const Highcharts: any;

@Component({
  selector: 'app-bartender-analytics',
  templateUrl: './bartender-analytics.component.html',
  styleUrls: ['./bartender-analytics.component.css']
})
export class BartenderAnalyticsComponent implements OnInit {

  bars: Bar[];
  bartendersfrombars: Bartender[];
  selectBars: SelectItem[];
  selectBartenders: SelectItem[];
  currBar: string;
  currBartender: string;
  BartenderHours: BartendersHours[];
  shiftHours: BartendersHours[];
  selectStart: SelectItem[];
  selectEnd: SelectItem[];
  BartenderAnalytics: BartendersAnalytics[];
  currStart: string;
  currEnd: string;
  constructor(
    private barService: BarsService,
    private bartenderService: BartendersService,
    private route: ActivatedRoute
  ) {
    barService.getBars().subscribe(
      data => {
        console.log(data);
        this.bars = data;
      }
    )
    barService.getBars().subscribe(
      data => {
        this.selectBars = data.map(Bar => {
          return {
          label: Bar.name,
          value: Bar.name,
          };
        });
      }
    );
    this.currBar = "Club No Minors";
    this.currStart = "12:00 PM";
    this.currEnd = "7:00 PM";
    bartenderService.getBartendersHours("Club No Minors").subscribe(
      data => {
        console.log(data);
        this.BartenderHours = data;
      }
    )
    bartenderService.getBartendersHours("Club No Minors").subscribe(
      data => {
        this.selectStart = data.map(Bar => {
          return {
          label: Bar.start,
          value: Bar.start,
          };
        });
      }
    );
    bartenderService.getBartendersHours("Club No Minors").subscribe(
      data => {
        this.selectEnd = data.map(Bar => {
          return {
          label: Bar.end,
          value: Bar.end,
          };
        });
      }
    );
  }

  sortBars(selectedOption: string){
    this.currBar = selectedOption;
    this.bartenderService.getBartendersHours(this.currBar).subscribe(
      data =>{
        this.shiftHours = data;
      }
    )
    this.currStart = this.shiftHours[0].start;
    this.currEnd = this.shiftHours[0].end;
    {
      this.bartenderService.getBartendersHours(this.currBar).subscribe(
        data => {
          this.selectStart = data.map(Bartender => {
            return{
              label: Bartender.start,
              value: Bartender.start,
            };
          });
        },
        );
        this.bartenderService.getBartendersHours(this.currBar).subscribe(
        dataa => {
          this.selectEnd = dataa.map(er => {
            return{
              label: er.end,
              value: er.end,
            };
          });
        }
        );
        this.bartenderService.getBartendersAnalytics(selectedOption, this.currStart, this.currEnd).subscribe(
          data => {
            console.log(data);
            const Bartendersname = [];
            const sold = [];
      
            data.forEach(bars => {
              Bartendersname.push(bars.Bartendersname);
              sold.push(bars.sold);
            });
            this.renderChart(Bartendersname, sold);
          }
          );
    }
  }
  sortStart(selectedOption: string){
    this.currStart = selectedOption;
    if(selectedOption === selectedOption){
        this.bartenderService.getBartendersAnalytics(this.currBar, selectedOption, this.currEnd).subscribe(
          data => {
            console.log(data);
            const Bartendersname = [];
            const sold = [];
      
            data.forEach(bars => {
              Bartendersname.push(bars.Bartendersname);
              sold.push(bars.sold);
            });
            this.renderChart(Bartendersname, sold);
          }
          );
    }
  }
  sortEnd(selectedOption: string){
    this.currEnd = selectedOption;
    if(selectedOption === selectedOption){
        this.bartenderService.getBartendersAnalytics(this.currBar, this.currStart, selectedOption).subscribe(
          data => {
            console.log(data);
            const Bartendersname = [];
            const sold = [];
      
            data.forEach(bars => {
              Bartendersname.push(bars.Bartendersname);
              sold.push(bars.sold);
            });
            this.renderChart(Bartendersname, sold);
          }
          );
    }
  }
  ngOnInit() {
  }
  renderChart(Bartendersname: string[], sold: any){
    Highcharts.chart('bargraph', {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Beers Sold by Different Bartenders'
      },
      xAxis: {
        categories: Bartendersname,
        title: {
          text: 'Bartenders'
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
        data: sold
      }]
    });
  }

}
