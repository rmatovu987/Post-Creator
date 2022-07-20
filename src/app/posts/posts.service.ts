import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private posts: Post[] = []
  private updatedPosts = new Subject<Post[]>();

  constructor() { }

  getPosts(){
    return [...this.posts];
  }

  getUpdatedPosts(){
    return this.updatedPosts.asObservable();
  }

  addPost(post: Post){
    this.posts.push(post)
    this.updatedPosts.next([...this.posts])
  }
}
