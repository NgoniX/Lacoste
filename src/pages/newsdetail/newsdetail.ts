import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SocialSharing } from '@ionic-native/social-sharing';
/**
 * Generated class for the NewsdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-newsdetail',
  templateUrl: 'newsdetail.html',
})
export class NewsdetailPage {
  news: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private socialSharing: SocialSharing) {
  	this.news = navParams.data.news;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsdetailPage');
  }

  //social sharing
  socialShare(title:any, summary:any, image:any) {
    this.socialSharing.share(summary, title, image, null).then(() => {
      console.log("shareSheetShare: Success");
    }).catch((err) => {
      console.error("shareSheetShare: "+err);
    });
  }

}
