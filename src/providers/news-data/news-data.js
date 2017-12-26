var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
var NewsDataProvider = /** @class */ (function () {
    function NewsDataProvider(http) {
        this.http = http;
    }
    // getNews(){
    // 	let apiURL = 'http://localhost/Lacoste/api/';
    //   return new Promise(resolve => {
    //   this.http.get(apiURL + 'news').subscribe(data => {
    //     resolve(data);
    //   }, err => {
    //     console.log(err);
    //   });
    // });
    // }
    NewsDataProvider.prototype.load = function () {
        // get url of api for news
        var url = 'http://localhost/Lacoste/api/news';
        if (this.data) {
            // already loaded data
            return Observable.of(this.data);
        }
        else {
            return this.http.get(url)
                .map(this.processData, this);
        }
    };
    NewsDataProvider.prototype.processData = function (data) {
        // just some good 'ol JS fun with objects and arrays
        // build up the data by linking speakers to books
        this.data = data.json();
        this.data.tracks = [];
        // loop through each day in the book
        this.data.news.forEach(function (article) {
            // loop through each timeline group in the day
            article.groups.forEach(function (group) {
                // loop through each book in the timeline group
                group.articles.forEach(function (cover) {
                });
            });
        });
        return this.data;
    };
    NewsDataProvider.prototype.getArticles = function (articleIndex, queryText, segment) {
        var _this = this;
        if (queryText === void 0) { queryText = ''; }
        if (segment === void 0) { segment = 'all'; }
        return this.load().map(function (data) {
            var article = data.books[articleIndex];
            article.shownArticle = 0;
            queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
            var queryWords = queryText.split(' ').filter(function (w) { return !!w.trim().length; });
            article.groups.forEach(function (group) {
                group.hide = true;
                group.covers.forEach(function (cover) {
                    // check if this book should show or not
                    _this.filterBook(cover, queryWords, segment);
                    if (!cover.hide) {
                        // if this book is not hidden then this group should show
                        group.hide = false;
                        article.shownBooks++;
                    }
                });
            });
            return article;
        });
    };
    NewsDataProvider.prototype.filterBook = function (book, queryWords, segment) {
        var matchesQueryText = false;
        if (queryWords.length) {
            // of any query word is in the book name than it passes the query test
            queryWords.forEach(function (queryWord) {
                if (book.title.toLowerCase().indexOf(queryWord) > -1 ||
                    book.author.toLowerCase().indexOf(queryWord) > -1 ||
                    book.genre.toLowerCase().indexOf(queryWord) > -1) {
                    matchesQueryText = true;
                }
            });
        }
        else {
            // if there are no query words then this book passes the query test
            matchesQueryText = true;
        }
    };
    NewsDataProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], NewsDataProvider);
    return NewsDataProvider;
}());
export { NewsDataProvider };
//# sourceMappingURL=news-data.js.map