
import './post-detail.css'
import PostDetailComments from "./PostDetailComments"
import PostDetailRichText from "./PostDetailRichText"
import PostDetailTags from "./PostDetailTags"

function PostDetailContent({ data }) {


  const { thumb, detailContent, id, author } = data

  return (
    <div className="post-detail__content">
      <div className="thumbnail">
        <img src={thumb} alt="blog-title" />
      </div>
      <div className="content-padding">
        <PostDetailRichText detailContent={detailContent} />

        <PostDetailTags />

        <PostDetailComments id={id} author={author} />
      </div>
    </div>
  )
}

export default PostDetailContent