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
  public id = 1;
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
  refresh(): void {
    window.location.reload();
}
  submitimage(number: number) {
      const url = '/api/visual-recognition/poster/'+number;
      this.numbermodal=number;
      console.log(this.numbermodal);
			this.observableService.createService(url, {})
				.subscribe(result => {
          console.log(result);
          this.number_success = result;
          this.people = result.people;
          this.objects = result.objects; 
          this.id = result.id;
				},
					error => { }
				);
    } 
   
}
