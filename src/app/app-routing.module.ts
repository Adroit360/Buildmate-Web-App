import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VideosComponent } from './videos/videos.component';
import { GroupComponent } from './aboutus/group/group.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HistoryComponent } from './aboutus/history/history.component';
import { ContactusComponent } from './aboutus/contactus/contactus.component';
import { DownloadComponent } from './download/download.component';
import { FaqsComponent } from './faqs/faqs.component';
import { BlogComponent } from './blog/blog.component';
import { SearchComponent } from './search/search.component';
import { ProductdescComponent } from './productdesc/productdesc.component';
import { VideodescComponent } from './videodesc/videodesc.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  {path: "aboutus", component: AboutusComponent},
  { path: "aboutus/group", component: GroupComponent },
  { path: "aboutus/history", component: HistoryComponent },
  { path: "aboutus/contactus", component: ContactusComponent },
  { path: "videos", component: VideosComponent },
  { path: "downloads", component: DownloadComponent },
  { path: "faqs", component: FaqsComponent },
  { path: "blog", component: BlogComponent },
  {path:"search",component:SearchComponent},
  {path:"search/word/:word",component:SearchComponent},
  {path:"search/:company",component:SearchComponent},
  {path:"search/:company/:category",component:SearchComponent},
  {path:"search/:company/:category/:subCategory",component:SearchComponent},
  {path:"productdesc/:productId",component:ProductdescComponent},
  {path:"videodesc/:videoId",component:VideodescComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
