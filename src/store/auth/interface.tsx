import { number } from "yup";

export interface IFeedback {
  id: number;
  title: string;
  category: string;
  dody: string;
}

export interface IComment {
  feedback_id: number;
  parent_id: number;
  body: string;
}

export interface IReply {
  body: string;
  created_at: string;
  feedback_id: number;
  id: number;
  parent_id: number;
  updated_at: string;
  user_id: number;
}

export interface ICommentShow {
  body: string;
  feedback_id: number;
  id: number;
  parent_id: number;
  replies: IReply[];
  user_id: number;
  isReply: boolean;
}

export interface IFeedbackState {
  feedbacks: IFeedback[]
  count: number;
  comments: ICommentShow[];
}

