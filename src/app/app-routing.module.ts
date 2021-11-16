import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateObraComponent } from './components/create-obra/create-obra.component';
import { ListObraComponent } from './components/list-obra/list-obra.component';
import { ListaGaleriaComponent } from './components/lista-galeria/lista-galeria.component';
import { HttpClientModule } from '@angular/common/http'; 

const routes: Routes = [
  {path: '', redirectTo: 'list-galeria', pathMatch: 'full'},
  {path: 'list-galeria', component: ListaGaleriaComponent},
  {path: 'list-obras', component: ListObraComponent},
  {path: 'create-obra', component: CreateObraComponent},
  {path: 'edit-obra/:id', component: CreateObraComponent},  
  {path: '**', redirectTo: 'list-galeria', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
