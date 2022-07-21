import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostsService } from '../posts.service';
import { Post } from './../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  id: string;
  post: Post;
  isLoading = false;

  constructor(public postService: PostsService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.isLoading = true;
        this.id = paramMap.get('id');
        this.postService.getPostDetails(this.id).subscribe({
          next: (data: any) => {
            this.post = data.data;
          },
          error: (err: any) => {
            console.log(err);
          },
          complete: () => {this.isLoading=false},
        });
      }
    });
  }

  onSavePost(form: NgForm) {
    if (form.valid) {
      const post: Post = {
        id: null,
        title: form.value.title,
        content: form.value.content,
      };

      if (this.id != null || this.id != undefined) {
        this.postService.updatePost(this.id, post);
      } else {
        this.postService.addPost(post);
      }

      form.resetForm();
    }
  }
}
