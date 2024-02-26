import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import TextEditor from "./text-editor";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";
import { GetAllFeedback, GetComments, PostComment } from "../../store/feedback/feedback.action";
import { RootState } from "../../store/store";
import { ICommentShow, IReply } from "../../store/feedback/interface";
import style from "./../../css/add-comment.module.css"
import { FeedbackActions } from "../../store/feedback/feedback.reducer";

function AddComment() {
  const dispatch = useAppDispatch();
  const comments$: ICommentShow[] = useAppSelector(
    (store: RootState) => store.feedback.comments
  );

  const [formData, setFormData] = useState({});
  const location = useLocation();
  const { id, title, category, body } = location.state;
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);


  useEffect(() => {
    dispatch(GetComments(id))
  }, [])

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };

  const handleClose = () => { };

  function postComment(commentID: number, body: string): void {
    dispatch(PostComment({
      feedback_id: id,
      parent_id: commentID,
      body,
    })).then((resp : any) => {
      dispatch(GetComments(resp.payload?.records?.comment?.feedback_id))
    });

  }

  function doReply(commentId: number): void {
    console.log("Comment id > ", commentId)
    dispatch(FeedbackActions.doReplyOnComment(commentId))
  }

  function createMarkup(description: string) {
    return { __html: description };
  }
  function create_description(description: string) {
    return <div dangerouslySetInnerHTML={createMarkup(description)} />;
  }

  return (
    <>
      <div className="container-fluid bg-white p-5">
        <div className="mb-5">
          <div className="row mb-3">
            <div className="col">
              <h6>Title</h6>
            </div>
            <div className="col">{title}</div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <h6>Category</h6>
            </div>
            <div className="col">{category}</div>
          </div>
          <div className="row">
            <div className="col">
              <h6>Description</h6>
            </div>
            <div className="col">{body}</div>
          </div>
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formComment">
            <Form.Label>Comment</Form.Label>
            <TextEditor commentId={0} postComment={postComment} />
          </Form.Group>
          {
            comments$ && Array.isArray(comments$) && comments$.length ?
            comments$.map((comment: ICommentShow) => {
              return <>
                <div>
                  <div className={style.showMainComment}>
                    {/* <h6>Comment</h6> */}
                    <p>{create_description(comment.body)}</p>
                  </div>
                  {comment.replies && Array.isArray(comment.replies) && comment.replies.length ? <ul className={style.replies}>
                    {
                      comment.replies.map((reply: IReply) => {
                        return <>
                          <p>{create_description(reply.body)}</p>
                        </>
                      })
                    }
                  </ul> : ""}
                  <div>
                    {!comment.isReply && <button className="btn btn-light" onClick={() => doReply(comment.id)}>Reply</button>}
                    {comment.isReply && <TextEditor commentId={comment.id} postComment={postComment} />}
                  </div>
                </div>
              </>
            }) : ''
          }
        </Form>
      </div>
    </>
  );
};

export default AddComment;
