import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  panelOpenState = false;

  // posts = [
  //   {
  //     title: 'First Post',
  //     description: 'First Post',
  //     content: 'This is the first post'
  //   },
  //   {
  //     title: 'Second Post',
  //     description: 'Second Post',
  //     content: 'This is the second post'
  //   },
  //   {
  //     title: 'Third Post',
  //     description: 'Third Post',
  //     content: 'This is the third post'
  //   }
  // ]

  @Input() posts = []

  constructor() { }

  ngOnInit(): void {
  }

}
