import * as yup from "yup";

export const postSchema = yup.object().shape({
  title: yup.string().min(3).max(15).required(),
  content: yup.string().min(4).required(),
});
