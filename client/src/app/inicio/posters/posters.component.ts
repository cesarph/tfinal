import { Component, OnInit } from '@angular/core';
import { AppobservableService } from '../../services/appobservable.service';

@Component({
  selector: 'app-posters',
  templateUrl: './posters.component.html',
  styleUrls: ['./posters.component.scss']
})
export class PostersComponent implements OnInit {
  public showindex = 0;
  public number_success;
  constructor(private observableService: AppobservableService) { 

  }
 

  ngOnInit() {
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
	
			console.log('valid');
      const url = '/api/vr-poster/:id';
			this.observableService.createService(url, number)
				.subscribe(result => {
          this.number_success = result;
          
				},
					error => { }
				);
		} 
}
