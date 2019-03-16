import { Component, OnInit } from '@angular/core';
//import { UploadImageService } from '../shared/upload-image.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  imageUrl: string = "/assets/img/default-image.png";
  fileToUpload: File = null;
  show: boolean = false;
  elem : any;

  constructor(private http: Http) { }

  ngOnInit() {
  }

  handleFileInput(file: FileList) {
    this.fileToUpload = file.item(0);
    this.elem = event.target;

    //Show image preview
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);
    this.show = true;
    
  }

  OnSubmit() {
    let formData = new FormData();
    formData.append('file', this.elem.files[0]);
    //console.log(formData);
    this.http.post('http://localhost:8000/uploadbackend/backend.php', formData)
      .subscribe((data) => {
        //let jsonRes = data.json();
        alert('subio');

      }, (error) => console.log(error.message));

  }
}
