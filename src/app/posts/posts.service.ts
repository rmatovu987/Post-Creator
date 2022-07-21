import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subject } from 'rxjs';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: Post[] = [];
  private updatedPosts = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}

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

  updatePost(id: string, post: Post) {
    this.http
      .put<{ message: string }>('http://localhost:3000/api/posts/'+id, post)
      .subscribe({
        next: () => {
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          this.getPosts();
          this.router.navigate(['/']);
        },
      });
  }

  getUpdatedPosts() {
    return this.updatedPosts.asObservable();
  }

  getPostDetails(id: string): Observable<{message: string, data:Post}> {
    return this.http.get<{ message: string; data: Post }>('http://localhost:3000/api/posts/'+id);
  }

  addPost(post: Post) {
    this.http
      .post<{ message: string }>('http://localhost:3000/api/posts', post)
      .subscribe({
        next: () => {
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          this.getPosts();
          this.router.navigate(['/']);
        },
      });
  }

  deletePost(id: string){
    this.http
      .delete<{ message: string }>('http://localhost:3000/api/posts/'+id)
      .subscribe({
        next: () => {
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          this.getPosts();
          this.router.navigate(['/']);
        },
      });
  }
}
