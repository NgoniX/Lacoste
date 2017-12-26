import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { NewsdetailPage } from '../pages/newsdetail/newsdetail';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NewsDataProvider } from '../providers/news-data/news-data';

import { HttpClientModule } from '@angular/common/http';
import { MomentModule } from 'angular2-moment';
import { ParallaxHeaderDirective } from '../directives/parallax-header/parallax-header';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AdMobFree } from '@ionic-native/admob-free';
import { Badge } from '@ionic-native/badge';
import { Network } from '@ionic-native/network';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AboutPage,
    NewsdetailPage,
    ContactPage,
    TabsPage,
    ParallaxHeaderDirective
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    MomentModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    AboutPage,
    NewsdetailPage,
    ContactPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Network,
    SocialSharing,
    AdMobFree,
    Badge,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NewsDataProvider
  ]
})
export class AppModule {}
