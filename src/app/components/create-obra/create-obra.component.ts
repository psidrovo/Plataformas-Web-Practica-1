import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ObraService } from 'src/app/services/obra.service';


@Component({
  selector: 'app-create-obra',
  templateUrl: './create-obra.component.html',
  styleUrls: ['./create-obra.component.css']
})
export class CreateObraComponent implements OnInit {

  createObra: FormGroup;
  submitted = false;
  imagenes: any[] = [];
  id: string | null;
  tituloVentana = 'AGREGAR OBRA';
  urlImagenObra: any;

  constructor(private fb: FormBuilder,
    private _obraService: ObraService,
    private router: Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute) {
    this.createObra = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      year: ['', Validators.required],
      descripcion: ['', Validators.required],
      img: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
    console.log(this.id);
  }

  ngOnInit(): void {
    this.editarObra();
  }


  cargarImagen(event: any) {

    let archivos = event.target.files;
    let reader = new FileReader();
    let nombre = "PracticaPW"

    reader.readAsDataURL(archivos[0]);
    reader.onloadend = () => {
      console.log(reader.result);
      this.imagenes.push(reader.result);
      this._obraService.subirImagen(nombre + "_" + Date.now(), reader.result).then(urlImagen => {``       
        this.urlImagenObra=urlImagen;
        console.log("URL" ,urlImagen);
      });
    }
  }

  agregarObra() {
    this.submitted = true;

    if (this.createObra.invalid) {
      return;
    }
    const obra: any = {
      titulo: this.createObra.value.titulo,
      autor: this.createObra.value.autor,
      year: this.createObra.value.year,
      descripcion: this.createObra.value.descripcion,
      img: this.urlImagenObra
    }
    console.log("URL" ,obra);
    this._obraService.agregarObra(obra).then(() => {
      this.toastr.success('La obra fue registrada con exito', 'Obra Registrada', { positionClass: 'toast-bottom-right' });
      this.router.navigate(['./list-galeria']);
    }).catch(error => {
      console.log(error);
    })

  }

  agregarEditarObra() {
    this.submitted = true;

    if (this.createObra.invalid) {
      return;
    }
    if (this.id == null) {
      this.agregarObra();
    } else {
      this.guardarEditarEmpleado(this.id);
    }
  }

  guardarEditarEmpleado(id: string) {
    const obra: any = {
      titulo: this.createObra.value.titulo,
      autor: this.createObra.value.autor,
      year: this.createObra.value.year,
      descripcion: this.createObra.value.descripcion,
      img: this.urlImagenObra
    };
    this._obraService.actualizarObra(id, obra).then(() => {
      this.toastr.info('La obra fue modificada con exito', 'OBRA MODIFICADA', { positionClass: 'toast-bottom-right' });
      this.router.navigate(['./list-galeria']);
    })
  }



  editarObra() {
    this.tituloVentana = 'EDITAR OBRA';
    if (this.id !== null) {
      this._obraService.getObra(this.id).subscribe(data => {
        console.log(data.payload.data()['titulo']);
        this.createObra.setValue({
          titulo: data.payload.data()['titulo'],
          autor: data.payload.data()['autor'],
          year: data.payload.data()['year'],
          descripcion: data.payload.data()['descripcion'],
          img: data.payload.data()['img']
        })
      })
    }
  }

}







