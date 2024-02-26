import "quill/dist/quill.snow.css";
import { useState } from "react";
import { Button } from "react-bootstrap";
import ReactQuill from "react-quill";

const TextEditor = ({commentId, postComment}: any) => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState<any>();

  let modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] },
      ],
      [
        {
          color: [
            "#000000",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#ffffff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
            "custom-color",
          ],
        },
      ],
    ],
  };

  let formats = [
    "header",
    "height",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "color",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "size",
  ];

  const handleProcedureContentChange = (content: any) => {
    setText(content);
  };

  const handleClose = () => {};

  return (
    <div>
      <div className="mb-5">
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          placeholder="Type here"
          onChange={handleProcedureContentChange}
          style={{ height: "150px" }}
        />
      </div>
      <Button className="m-2" variant="primary" type="submit" disabled={loading} onClick={() => postComment(commentId, text)}>
        {loading ? "Saving..." : "Save Changes"}
      </Button>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </div>
  );
};

export default TextEditor;
