import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostsService } from '../posts.service';
import { Post } from './../post.model';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  id: string;
  post: Post;
  imagePreview: string | ArrayBuffer;
  isLoading = false;

  form: FormGroup;

  constructor(
    public postService: PostsService,
    public route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      content: new FormControl('', { validators: [Validators.required] }),
      image: new FormControl('', {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.isLoading = true;
        this.id = paramMap.get('id');
        this.postService.getPostDetails(this.id).subscribe({
          next: (data: any) => {
            this.post = data.data;
            this.form.setValue({
              title: this.post.title,
              content: this.post.content,
            });
          },
          error: (err: any) => {
            console.log(err);
          },
          complete: () => {
            this.isLoading = false;
          },
        });
      }
    });
  }

  onSavePost() {
    if (this.form.valid) {
      const post: Post = {
        id: null,
        title: this.form.value.title,
        content: this.form.value.content,
        imageUrl: null,
      };

      if (this.id != null || this.id != undefined) {
        this.postService.updatePost(this.id, post, this.form.value.image);
      } else {
        this.postService.addPost(post, this.form.value.image);
      }

      this.form.reset();
    }
  }

  onImagePick(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
