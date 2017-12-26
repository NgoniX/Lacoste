import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class NewsDataProvider {

  data: any;

  constructor(public http: HttpClient) {}

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


  load(): any {

   // get url of api for news
   let url = 'http://teamlacoste.com/api/news';

  if (this.data) {
      // already loaded data
      return Observable.of(this.data);
    }

    else {

     return this.http.get(url)
        .map(this.processData, this);

  }

}

  processData(data: any) {
    // just some good 'ol JS fun with objects and arrays
    // build up the data by linking speakers to books
    this.data = data;
    // loop through each day in the book
    this.data.news.forEach((article: any) => {
      // loop through each timeline group in the day
      article.groups.forEach((group: any) => {
        // loop through each book in the timeline group
        group.articles.forEach((cover: any) => {
        });
      });
    });

    return this.data;
  }

getArticles(articleIndex: number, queryText = '', segment = 'all') {

    return this.load().map((data: any) => {
      let article = data.news[articleIndex];
      article.shownArticle = 0;

      queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
      let queryWords = queryText.split(' ').filter(w => !!w.trim().length);

      article.groups.forEach((group: any) => {
        group.hide = true;

        group.articles.forEach((article: any) => {
          // check if this article should show or not
          this.filterNews(article, queryWords, segment);

          if (!article.hide) {
            // if this article is not hidden then this group should show
            group.hide = false;
            article.shownBooks++;
          }
        });

      });

      return article;

    })

  }

  filterNews(news: any, queryWords: string[], segment: string) {

    let matchesQueryText = false;
    if (queryWords.length) {
      // of any query word is in the news name than it passes the query test
      queryWords.forEach((queryWord: string) => {
        if (news.title.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
      });
    } else {
      // if there are no query words then this news passes the query test
      matchesQueryText = true;
    }

  }



}
