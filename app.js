var post = {
    template: `
    <div class="row border-bottom border-secondary">
      <th scope="col" class="w-25">
      {{ name }}
      <input v-model="newTitle" :placeholder="name" v-show="showField" class="field-value form-control">
      </th>
      <th scope="col" class="w-25">
      {{ content }}
      <input v-model="newContent" :placeholder="content" v-show="showField" class="field-value form-control">
      </th>
      <th scope="col" class="w-50">
      <button v-if="name!=='Title'" class="btn btn-danger float-right ml-2" @click="deletePost(name, content)"> Delete </button>
      <button v-if="name!=='Title'" class="btn btn-danger float-right ml-2" @click="editPost()"> Edit </button>
      <button v-if="showSaveBtn" :disabled="(newTitle === name && newContent === content)" class="btn btn-info float-right ml-2" @click="updatePost()"> Save </button>
      </th>
    </div>
  `,
    data() {
        return {
            count: 0,
            oldTitle: "",
            oldContent: "",
            newTitle: "",
            newContent: "",
            showSaveBtn: false,
            showField: false,
            showField: false,
        };
    },
    props: {
        name: {
            type: String,
            default: "Default Title",
            required: true,
        },
        content: {
            type: String,
            default: "Default Content",
            required: true,
        },
        posts: {
            type: Array,
        },
    },
    methods: {
        deletePost(name, content) {
            alert("Deleted Post!");
            this.posts = this.posts.filter(
                (item) => item.title !== name && item.content !== content
            );
            this.$emit("delete-post", {
                posts: this.posts,
            });
        },
        editPost() {
            this.showField = this.showSaveBtn = true;
            this.newTitle = this.oldTitle = this.name;
            this.newContent = this.oldContent = this.content;
        },
        updatePost() {
            alert("Updated Post!");
            let index = this.posts.findIndex(
                (e) =>
                    e.title === this.oldTitle &&
                    e.content === this.oldContent
            );
            this.$emit("update-post", {
                index: index,
                newTitle: this.newTitle,
                newContent: this.newContent,
            });
            this.showField = this.showSaveBtn = false;
        },
    },
};

var createPost = {
    template: `
  <div class="container">
    <div class="input-group input-group-sm mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-sm">Title</span>
      </div>
      <input class="form-control" v-model="title" placeholder='Enter Post title'/>
    </div>
    <div class="input-group input-group-sm mb-3">
      <div class="input-group-prepend">
        <span class="input-group-text">Content</span>
      </div>
      <textarea class="form-control" v-model="content" placeholder='Enter Post content'></textarea>
    </div>
    <button class="btn btn-info" @click="createPost">Create</button>
  </div>
  `,
    data() {
        return {
            title: "",
            content: "",
        };
    },
    methods: {
        createPost() {
            this.$emit("create-post", {
                title: this.title,
                content: this.content,
            });
            this.title = "";
            this.content = "";
        },
    },
};

new Vue({
    el: "#app",
    // components
    components: {
        "create-post": createPost,
        post: post,
    },
    // data
    data: {
        posts: [
            { title: "Title", content: "Content" },
            { title: "Post 1", content: "Content 1" },
            { title: "Post 2", content: "Content 2" },
        ],
    },
    // methods
    methods: {
        insertPost(post) {
            if (post.title && post.content) {
                this.posts.push(post);
            }
        },
        deletePost(post) {
            // arr.splice(0, 1);
            this.posts = [] = post.posts;
        },
        updatePost(post) {
            let index = post.index;
            this.posts[index].title = post.newTitle;
            this.posts[index].content = post.newContent;
        },
    },
    // created
});
