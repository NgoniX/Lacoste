import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, Platform } from 'ionic-angular';
import { NewsdetailPage } from '../newsdetail/newsdetail';
import { NewsDataProvider } from '../../providers/news-data/news-data';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';
import { Network } from '@ionic-native/network';
import { Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  connected: Subscription;
  disconnected: Subscription;

 // The items array to populate with data is created
  articles: any;
  articleIndex = 0;
  queryText = '';
  segment = 'all';

  groups: any = [];

  constructor(
  	public navCtrl: NavController, 
  	private newsData: NewsDataProvider,
  	public loadingController: LoadingController,
    private adMobFree: AdMobFree,
    public platform: Platform,
    private toast: ToastController, 
    private network: Network
  	) {

  }

  // load news data from api on home page
  ionViewDidLoad() {

    this.updateNews();

    //show ads
    this.showBannerAd();
  }

  updateNews(){

    let loader = this.loadingController.create({
      content: "Getting articles..."
    });
    loader.present();

    this.newsData.getArticles(this.articleIndex, this.queryText)
    .subscribe((data:any) => {
        loader.dismiss();
        this.groups = data.groups;
        //print out articles
        console.log(this.groups);
    });

  }


  //display network status
  ionViewDidEnter() {

    this.connected = this.network.onConnect().subscribe(data => {
    console.log(data)
    this.displayNetworkUpdate(data.type);
  }, error => console.error(error));
 
    this.disconnected = this.network.onDisconnect().subscribe(data => {
    console.log(data)
    this.displayNetworkUpdate(data.type);
  }, error => console.error(error));

  }

  ionViewWillLeave(){
  this.connected.unsubscribe();
  this.disconnected.unsubscribe();
  }



  // go to news detail
  newsDetail(newsData: any) {
    // go to the book detail page
    // and pass in the book data
    this.navCtrl.push(NewsdetailPage, {
      title: newsData.title,
      news: newsData
    });
  }

  // function to show ads
  async showBannerAd() {

    if(this.platform.is('cordova')) {

        try {
          const bannerConfig: AdMobFreeBannerConfig = {
            id: 'ca-app-pub-4322995895522806/8619065162',
            autoShow: true
          }

          this.adMobFree.banner.config(bannerConfig);

          const result = await this.adMobFree.banner.prepare();
          console.log(result);
        }
        catch (e) {
          console.error(e);
        }
   
     }

   }

   //network status
   displayNetworkUpdate(connectionState: string){
    let networkType = this.network.type;
    this.toast.create({
    message: `You are now ${connectionState} via ${networkType}`,
    duration: 5000
  }).present();
  }


  

}
