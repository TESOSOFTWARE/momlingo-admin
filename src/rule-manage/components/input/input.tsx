import React, { useEffect, useState } from 'react';
import { ContentState, EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// Định nghĩa kiểu props
interface InputComponentProps {
  data: string; // Dữ liệu từ cha
  onUpdateData: (updatedData: string) => void; // Hàm callback gửi dữ liệu lên cha
}

const InputComponent: React.FC<InputComponentProps> = ({ data, onUpdateData }) => {
  // Khởi tạo trạng thái editorState với nội dung từ `data` cha truyền xuống
  const [editorState, setEditorState] = useState<EditorState>(() => {
    if (data) {
      const contentBlock = htmlToDraft(data);
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      return EditorState.createWithContent(contentState);
    }
    return EditorState.createEmpty();
  });

  useEffect(() => {
    if (data) {
      try {
        const contentBlock = htmlToDraft(data);
        if (contentBlock) {
          const contentState = ContentState.createFromBlockArray(
            contentBlock.contentBlocks
          );
          setEditorState(EditorState.createWithContent(contentState));
        }
      } catch (error) {
        console.error('Error updating editorState from new data:', error);
      }
    }
  }, [data]);
  const handleEditorStateChange = (state: EditorState) => {
    setEditorState(state);
    const htmlContent = draftToHtml(convertToRaw(state.getCurrentContent()));

    onUpdateData(htmlContent);
  };

  return (
    <div>
      <h2>Child Data</h2>
      <div>
        <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={handleEditorStateChange}
        />
        {/* <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
          rows={10}
          cols={50}
        /> */}
      </div>
    </div>
  );
};

export default InputComponent;
