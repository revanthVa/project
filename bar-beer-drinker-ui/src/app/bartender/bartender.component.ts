import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { SelectItem } from 'primeng/components/common/selectitem';
import { ActivatedRoute } from '@angular/router';
import { BarsService, Bar } from '../bars.service';
import { BartendersService, Bartender } from '../bartenders.service';

@Component({
  selector: 'app-bartender',
  templateUrl: './bartender.component.html',
  styleUrls: ['./bartender.component.css']
})
export class BartenderComponent implements OnInit {

  bars: Bar[];
  bartendersfrombars: Bartender[];
  selectBars: SelectItem[];
  selectBartenders: SelectItem[];
  currBar: string;
  currBartender: string;

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
    this.currBar = 'Club No Minors';
    bartenderService.getBartendersFromBars(this.currBar).subscribe(
      data => {
        this.selectBartenders = data.map(Bartender => {
          return {
          label: Bartender.Bartendersname,
          value: Bartender.Bartendersname,
          };
        });
      }
      );
    
  }
  sortBars(selectedOption: string){
    this.currBar = selectedOption;
    if(selectedOption === selectedOption){
      this.bartenderService.getBartendersFromBars(this.currBar).subscribe(
        data => {
          this.selectBartenders = data.map(Bartender => {
            return{
              label: Bartender.Bartendersname,
              value: Bartender.Bartendersname,
            };
          });
        }
        );
    }
  }

  ngOnInit() {
  }

}