import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { VideosComponent } from './videos/videos.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumpComponent } from './breadcrump/breadcrump.component';
import { GroupComponent } from './aboutus/group/group.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HistoryComponent } from './aboutus/history/history.component';
import { ContactusComponent } from './aboutus/contactus/contactus.component';
import { DownloadComponent } from './download/download.component';
import { FaqsComponent } from './faqs/faqs.component';
import { BlogComponent } from './blog/blog.component';
import { DataStore } from 'src/Services/dataStore';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
import { ProductdescComponent } from './productdesc/productdesc.component';
import { VideodescComponent } from './videodesc/videodesc.component';
import { ProductPopupComponent } from './product-popup/product-popup.component';
import { ProductCategoryPopupService } from 'src/Services/productCategoryPopup.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    VideosComponent,
    FooterComponent,
    BreadcrumpComponent,
    GroupComponent,
    AboutusComponent,
    HistoryComponent,
    ContactusComponent,
    DownloadComponent,
    FaqsComponent,
    BlogComponent,
    SearchComponent,
    ProductdescComponent,
    VideodescComponent,
    ProductPopupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [DataStore,ProductCategoryPopupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
