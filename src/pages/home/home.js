var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { NewsDataProvider } from '../../providers/news-data/news-data';
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, newsData, loadingController) {
        this.navCtrl = navCtrl;
        this.newsData = newsData;
        this.loadingController = loadingController;
        this.articleIndex = 0;
        this.queryText = '';
        this.segment = 'all';
        this.groups = [];
    }
    // load news data from api on home page
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.presentLoading();
        this.loader.present().then(function () {
            _this.updateNews();
            _this.loader.dismiss();
        });
    };
    HomePage.prototype.updateNews = function () {
        var _this = this;
        this.newsData.getArticles(this.articleIndex, this.queryText, this.segment)
            .subscribe(function (data) {
            _this.groups = data.groups;
            /////////////////////////
        });
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController,
            NewsDataProvider,
            LoadingController])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map