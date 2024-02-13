import { FaPaperPlane } from "react-icons/fa";
function PostForm({ sendMessage, handleFileChange, handleChange, handleKeyDown, formValue, file, fileInputRef, textAreaRef }) {
  
    return (
    <form className="">
        <div className="">
          <label htmlFor="file-input" className="">
            <div className="">
              <span className="">+</span>
            </div>
          </label>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            disabled={file !== null}
            id="file-input"
            hidden
          />
        </div>
        <div className="textarea-section">
          <textarea
            value={formValue}
            ref={textAreaRef}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder='Upload'
            className="flex-grow"
          />
        
        </div>
        <button onClick={(e) => sendMessage(e)}><FaPaperPlane/></button>
    </form>
    );
  }
  
  export default PostForm;