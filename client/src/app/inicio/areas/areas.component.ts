import { Component, OnInit } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { AppobservableService } from '../../services/appobservable.service';
import { ImageUploadModule } from "angular2-image-upload";

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent implements OnInit {
  filesToUpload: Array<File>;


  constructor(private observableService: AppobservableService) { }


  ngOnInit() {
  }

  upload() {
    this.makeFileRequest("/api/visual-recognition/food", [], this.filesToUpload).then((result) => {
        console.log(result);
    }, (error) => {
        console.error(error);
    });
}

fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>> fileInput.target.files;
}

makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
        var formData: any = new FormData();
        var xhr = new XMLHttpRequest();
        for(var i = 0; i < files.length; i++) {
            formData.append("uploads[]", files[i], files[i].name);
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    resolve(JSON.parse(xhr.response));
                } else {
                    reject(xhr.response);
                }
            }
        }
        xhr.open("POST", url, true);
        xhr.send(formData);
    });
}

 
}
