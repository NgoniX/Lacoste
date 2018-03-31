import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CacheService } from 'ionic-cache';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class NewsDataProvider {

  data: any;
  news: Observable<any>;
  newsKey = 'news';

  url: string = 'http://teamlacoste.com/api/news';

  constructor(public http: HttpClient, private cache: CacheService) {}


  load(): any {

    // Specify custom TTL if you want
   let ttl: number = 5;

  if (this.data) {
      // already loaded data
      return Observable.of(this.data);
    }

    else {

      let delayType = 'all';

     let req = this.http.get(this.url)
        .map(this.processData, this);

     return this.cache.loadFromDelayedObservable(this.url, req, this.newsKey, ttl, delayType);

  }

}

  processData(data: any) {
    // just some good 'ol JS fun with objects and arrays
    // build up the data by linking speakers to events
    this.data = data;
    // loop through each day in the event
    this.data.news.forEach((article: any) => {
      // loop through each timeline group in the day
      article.groups.forEach((group: any) => {
        // loop through each event in the timeline group
        group.articles.forEach((cover: any) => {
        });
      });
    });

    return this.data;
  }

getArticles(articleIndex: number, queryText = '') {

    return this.load().map((data: any) => {
      let article = data.news[articleIndex];
      article.shownArticles = 0;

      queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
      let queryWords = queryText.split(' ').filter(w => !!w.trim().length);

      article.groups.forEach((group: any) => {
        group.hide = true;

        group.articles.forEach((event: any) => {
          // check if this article should show or not
          this.filterNews(event, queryWords);

          if (!event.hide) {
            // if this article is not hidden then this group should show
            group.hide = false;
            article.shownArticles++;
          }
        });

      });

      return article;

    })

  }

  filterNews(news_item: any, queryWords: string[]) {

    let matchesQueryText = false;
    if (queryWords.length) {
      // of any query word is in the news name than it passes the query test
      queryWords.forEach((queryWord: string) => {
        if (news_item.title.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
      });
    } else {
      // if there are no query words then this news passes the query test
      matchesQueryText = true;
    }

    let matchesSegment = false;
      matchesSegment = true;
    

    // all tests must be true if it should not be hidden
    news_item.hide = !(matchesQueryText && matchesSegment);

  }



}
