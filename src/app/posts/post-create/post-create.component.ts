import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
import { Post } from './../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {

  constructor(public postService: PostsService) {}

  ngOnInit(): void {}

  onSavePost(form: NgForm) {
    if (form.valid) {
      const post: Post = {
        id: null,
        title: form.value.title,
        content: form.value.content,
      };

      this.postService.addPost(post)

      form.resetForm()
    }
  }
}
