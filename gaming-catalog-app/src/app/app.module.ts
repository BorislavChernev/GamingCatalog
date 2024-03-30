//Angular Imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//FireBase imports
import {AngularFireModule} from '@angular/fire/compat'
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/compat/firestore'
import { environment } from 'src/environments/environment';
//Internal Imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
  
export class AppModule { }
