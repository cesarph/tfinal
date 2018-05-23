import { Component, OnInit } from '@angular/core';
import { AppobservableService } from '../../services/appobservable.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-posters',
  templateUrl: './posters.component.html',
  styleUrls: ['./posters.component.scss']
})
export class PostersComponent implements OnInit {
  public showindex = 0;
  public number_success=null;
  public people = null;
  public objects = null;
  public numbermodal=0;
  constructor(private observableService: AppobservableService) { 

  }
 

  ngOnInit(
    
  ) {
  }
  updateShow(index): void {
    if (this.showindex == index) {
      this.showindex = -1;
    }
    else {
      this.showindex = index;
    }
  }
  submitimage(number: number) {
      const url = '/api/vr-poster/'+number;
      this.numbermodal=number;
      console.log(this.numbermodal);
			this.observableService.createService(url, {})
				.subscribe(result => {
          this.number_success = result;
          this.people = result.people;
          this.objects = result.objects; 
				},
					error => { }
				);
		} 
}
