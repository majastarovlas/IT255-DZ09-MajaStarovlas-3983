import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  private API_KEY: string = 'AIzaSyACghHxqNR6XofS9MymGeA6XUm74zXiZH0';

  // Url za odredjeni video
  private url: string =
    'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics';

  constructor(private http: HttpClient) {}

  getVideoData(videoId: string): Observable<any> {
    const modUrl = this.url + '&id=' + videoId + '&key=' + this.API_KEY;

    return this.http.get<any>(modUrl);
  }
}
