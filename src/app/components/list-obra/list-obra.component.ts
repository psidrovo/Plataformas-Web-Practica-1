import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ObraService } from 'src/app/services/obra.service';

@Component({
  selector: 'app-list-obra',
  templateUrl: './list-obra.component.html',
  styleUrls: ['./list-obra.component.css']
})
export class ListObraComponent implements OnInit {

  obras: any[] = [];

  constructor(private _obraService: ObraService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.getObras()
  }

  getObras() {
    this._obraService.getObras().subscribe(data => {
      this.obras = [];
      data.forEach((element: any) => {
        this.obras.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    });
  }

  eliminarObra(id: string) {
    this._obraService.eliminarObra(id).then(() => {
      console.log('obra eliminada')
      this.toastr.error('La obra fue eliminada con exito','Obra Eliminada',{positionClass: 'toast-bottom-right'});
    }).catch(error => {
      console.log(error);
    });
  }

}
