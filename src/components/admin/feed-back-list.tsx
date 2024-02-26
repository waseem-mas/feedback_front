import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import AddComment from "./add-comment";
import TextEditor from "./text-editor";
import { useNavigate } from "react-router-dom";
import { GetAllFeedback } from "../../store/feedback/feedback.action";
import { useAppDispatch, useAppSelector } from "../../store/redux-hooks";
import { RootState } from "../../store/store";
import { IFeedback } from "../../store/feedback/interface";

function FeedbackList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const [feedbacks, setFeedbacks] = useState<IFeedback[]>([
  //   {
  //     id: "abc1",
  //     title: "form not submited",
  //     description: "When create user",
  //     category: "bug",
  //   },
  //   {
  //     id: "abc2",
  //     title: "form not submited",
  //     description: "When create user",
  //     category: "bug",
  //   },
  //   {
  //     id: "abc3",
  //     title: "form not submited",
  //     description: "When create user",
  //     category: "bug",
  //   },
  //   {
  //     id: "abc4",
  //     title: "form not submited",
  //     description: "When create user",
  //     category: "bug",
  //   },
  // ]);

  const feedbacks: IFeedback[] = useAppSelector(
    (store: RootState) => store.feedback.feedbacks
  );

  console.log("feedbacks$ > ", feedbacks)

  useEffect(() => {
    dispatch(GetAllFeedback(null));
  }, []);

  function addComment(feedback: IFeedback): void {
    navigate("/dashboard/comments", { state: feedback });
  }

  function addFeedback(): void {
    navigate("/dashboard/feedback");
  }

  return (
    <div className="container-fluid bg-white mt-3">
      <div className="d-flex justify-content-end">
        <button className="btn btn-primary" onClick={addFeedback}>
          Add Feedback
        </button>
      </div><p>Click on any feedback to add comments</p>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.map((feedback: IFeedback) => {
            return (
              <tr key={feedback.id} onClick={() => addComment(feedback)}>
                <td>{feedback.title}</td>
                <td>{feedback.category}</td>
                <td>{feedback.dody}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackList;
