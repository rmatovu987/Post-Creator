import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: Post[] = [];
  private updatedPosts = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{ message: string; data: any }>('http://localhost:3000/api/posts')
      .pipe(
        map((data) => {
          return data.data.map(post => {
            return {
              id: post._id,
              title: post.title,
              content: post.content
            }
          });
        })
      )
      .subscribe({
        next: (data: any) => {
          this.posts = data;
          this.updatedPosts.next([...this.posts]);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  getUpdatedPosts() {
    return this.updatedPosts.asObservable();
  }

  addPost(post: Post) {
    this.http
      .post<{ message: string }>('http://localhost:3000/api/posts', post)
      .subscribe({
        next: (data: any) => {
          console.log(data);
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          this.getPosts();
        },
      });
  }

  deletePost(id: number){
    this.http
      .delete<{ message: string }>('http://localhost:3000/api/posts/'+id)
      .subscribe({
        next: (data: any) => {
          console.log(data);
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          this.getPosts();
        },
      });
  }
}
