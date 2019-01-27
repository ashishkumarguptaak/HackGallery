import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './routes';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ProfileComponent } from './profile/profile.component';
import { DescriptionComponent } from './description/description.component';
import { VerifyComponent } from './verify/verify.component';

import { AuthService } from './services/auth.service';
import { ContactService } from './services/contact.service';
import { LoginService } from './services/login.service';
import { RegisterService } from './services/register.service';
import { VerifyService } from './services/verify.service';
import { UploadsComponent } from './uploads/uploads.component';
import { UploadimageComponent } from './uploadimage/uploadimage.component';
import { UploadService } from './services/upload.service';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { ImageCompressService,ResizeOptions } from 'ng2-image-compress';
import { FileSelectDirective } from 'ng2-file-upload';
import { PDFService } from './services/pdf.service';

@NgModule({
  declarations: [
    AppComponent,
    FileSelectDirective,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    ContactComponent,
    AboutComponent,
    ProfileComponent,
    DescriptionComponent,
    VerifyComponent,
    UploadsComponent,
    UploadimageComponent
    ],
  imports: [
    PdfViewerModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [AuthService, ContactService, PDFService, LoginService, RegisterService, UploadService, VerifyService, ImageCompressService,ResizeOptions],
  bootstrap: [AppComponent]
})
export class AppModule { }
