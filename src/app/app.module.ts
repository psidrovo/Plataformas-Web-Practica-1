import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//MODULOS
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {TableModule} from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';

//COMPONENTES
import { AppComponent } from './app.component';
import { CreateObraComponent } from './components/create-obra/create-obra.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListObraComponent } from './components/list-obra/list-obra.component';
import { environment } from 'src/environments/environment';
import { ListaGaleriaComponent } from './components/lista-galeria/lista-galeria.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateObraComponent,
    NavbarComponent,
    ListObraComponent,
    ListaGaleriaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    TableModule,
    FormsModule,
    HttpClientModule,
    ButtonModule,
    InputTextModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
