import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css'],
})
export class VideoComponent implements OnInit {
  videos: any[] = [];
  // video: any;

  // za pristup inputima title i description
  @ViewChild('title') title: ElementRef;
  @ViewChild('description') description: ElementRef;

  constructor(private youtubeService: YoutubeService) {}

  ngOnInit(): void {}

  getId(url: string): string {
    let regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    let match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : '';
  }

  getTitleAndDescription(youtubeUrl: HTMLInputElement) {
    // uzmi id iz tog linka
    const videoId = this.getId(youtubeUrl.value);

    // pozovi metod getvideodata
    this.youtubeService.getVideoData(videoId).subscribe((video) => {
      this.title.nativeElement.value = video.items[0].snippet.title;
      this.description.nativeElement.value = video.items[0].snippet.description;
    });
  }

  onAdd(youtubeUrl: HTMLInputElement) {
    // uzmi id iz tog linka
    const videoId = this.getId(youtubeUrl.value);

    this.youtubeService.getVideoData(videoId).subscribe((video) => {
      console.log(video);
      // stavi na pocetak niza
      this.videos.unshift({
        img: (this.title.nativeElement.value =
          video.items[0].snippet.thumbnails.medium.url),
        title: (this.title.nativeElement.value = video.items[0].snippet.title),
        description: (this.description.nativeElement.value =
          video.items[0].snippet.description),
      });
    });
  }
}
