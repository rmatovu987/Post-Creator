import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from './../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Array<Post> = [];
  postsSubscription: Subscription;

  constructor(public postService: PostsService) {}

  ngOnInit(): void {
    this.postService.getPosts();
    this.postsSubscription = this.postService.getUpdatedPosts().subscribe({
      next: (posts: Post[]) => {
        this.posts = posts
      },
      error: ()=>{},
      complete: ()=>{}
    });
  }

  onDelete(id: number){
    this.postService.deletePost(id);
  }

  ngOnDestroy(): void {
    this.postsSubscription.unsubscribe()
  }
}
